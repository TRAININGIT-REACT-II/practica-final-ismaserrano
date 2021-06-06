import PropTypes from "prop-types";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";

/* Styles */
import { useToolbarStyles } from "./styles";

const NotesToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} {numSelected === 1 ? "seleccionada" : "seleccionadas"}
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Notas
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Eliminar">
          <IconButton aria-label="eliminar" onClick={() => props.deleteCb()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

NotesToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default NotesToolbar;
