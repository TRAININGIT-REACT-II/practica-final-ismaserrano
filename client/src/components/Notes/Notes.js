import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import NotesToolbar from "./NotesToolbar";
import NotesTableHead from "./NotesTableHead";

import { getComparator, stableSort } from "./utils";

import useApi from "../../hooks/useApi";
import useConstructor from "../../hooks/useConstructor";
import usePrevious from "../../hooks/usePrevious";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

/* Styles */
import { useStyles } from "./styles";
import { Button, Typography } from "@material-ui/core";
import { Loader } from "../Loader";

const headCells = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Título",
  },
  { id: "date", numeric: true, disablePadding: false, label: "Fecha" },
];

const Notes = () => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [selected, setSelected] = useState([]);
  const selectedPrevious = usePrevious(selected);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { user } = useSelector((state) => state.user);
  const notesReq = useApi("/api/notes", user.token, {}, false);
  const deleteNotesReq = useApi("/api/notes", user.token, {}, false);
  const history = useHistory();
  const [deleteAction, setDeleteAction] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = notesReq.data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      notesReq.data ? notesReq.data.length : 0 - page * rowsPerPage
    );

  const removeSelected = () => {
    setDeleteAction(true);
  };

  useEffect(() => {
    if (selected.length > 0 && deleteAction) {
      if (!deleteNotesReq.loading && deleteNotesReq.error === "") {
        let selectedTemp = [];
        selectedTemp.push(...selected);
        selectedTemp.shift();
        setSelected(selectedTemp);
      }
    }
  }, [deleteNotesReq, selected, deleteAction]);

  useEffect(() => {
    if (deleteAction && selected.length > 0 && !deleteNotesReq.loading) {
      deleteNotesReq.updateParams({
        url: `/api/notes/${selected[0]}`,
        token: user.token,
        method: "DELETE",
      });
      deleteNotesReq.perform();
    }
    /* Si hemos acabado de borrar, actualizamos listado de notas */
    if (
      selected.length === 0 &&
      typeof selectedPrevious !== "undefined" &&
      selectedPrevious.length === 1 &&
      deleteAction
    ) {
      setDeleteAction(false);
      notesReq.updateParams({
        method: "GET",
      });
      notesReq.perform();
    }
  }, [selected, deleteAction]);

  useConstructor(() => {
    notesReq.perform();
  });

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {notesReq.data && notesReq.data.length ? (
          <>
            <NotesToolbar
              numSelected={selected.length}
              deleteCb={() => removeSelected()}
            />
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                aria-label="enhanced table"
              >
                <NotesTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={notesReq.data.length}
                  headCells={headCells}
                />
                <TableBody>
                  {stableSort(notesReq.data, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                              onClick={(event) => handleClick(event, row.id)}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            onClick={() => history.push(`/${row.id}`)}
                            style={{ cursor: "pointer" }}
                          >
                            {row.title}
                          </TableCell>
                          <TableCell
                            align="right"
                            onClick={() => history.push(`/${row.id}`)}
                            style={{ cursor: "pointer" }}
                          >
                            {row.date}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={notesReq.data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <>
            {notesReq.loading ? (
              <Loader style={{ display: "flex", padding: "40px 20px" }} />
            ) : (
              <Typography
                variant="body2"
                gutterBottom
                display="block"
                style={{ padding: "40px 20px" }}
              >
                No se han encontrado registros
              </Typography>
            )}
          </>
        )}
      </Paper>
      <Button onClick={() => history.push("/add")}>Añadir nota</Button>
    </div>
  );
};

export default Notes;
