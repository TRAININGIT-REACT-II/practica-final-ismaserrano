import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useStyles from "./styles";

import { Modal } from "../Modal";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../selectors/user";
import { useHistory } from "react-router-dom";
import { getNotification } from "../../selectors/notification";
import { setNotification } from "../../actions/notification";

const AppContainer = ({ children }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector((state) => getUser(state));
  const { notification } = useSelector((state) => getNotification(state));
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(BASE_URL);

  const closeModal = () => {
    dispatch(setNotification(null));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    sessionStorage.removeItem("userObj");
    history.push("/signin");
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Notas ACME, Ltd.
          </Typography>
          {typeof user !== "undefined" && user !== null ? (
            <>
              <Button
                color="primary"
                variant="outlined"
                className={classes.link}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                {user.username}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={logout}>Salir</MenuItem>
              </Menu>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {/* Renderizado del contenido */}
          {children}
        </Grid>
      </Container>
      <Modal
        open={notification !== null ? true : false}
        title={notification !== null ? notification.title : ""}
        handleClose={closeModal}
      >
        {notification !== null ? notification.content : ""}
      </Modal>
    </>
  );
};

export default AppContainer;
