import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useStyles from "./styles";
import useApi from "../../hooks/useApi";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

/* Acciones */
import { setUser } from "../../actions/user";

const SignUp = () => {
  const classes = useStyles();
  const registerReq = useApi("/api/register", "", {}, false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  let token;
  if (registerReq.data) {
    token = registerReq.data.token;
    if (token.length > 0) {
      sessionStorage.setItem("userObj", JSON.stringify(registerReq.data));
      dispatch(setUser(registerReq.data));
      history.push("/");
    }
  }

  const apiRegister = (data) => {
    registerReq.updateParams({
      method: "POST",
      body: JSON.stringify({
        username: data.email,
        password: data.password,
      }),
    });
    registerReq.perform();
  };

  const onSubmit = (data) => {
    apiRegister(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <form
          className={classes.form}
          noValidate
          autoComplete="no"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="email"
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email"
                    error={errors.email ? true : false}
                    helperText={errors.email ? errors.email.message : null}
                  />
                )}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Correo electrónico obligatorio",
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Correo electrónico inválido",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    required
                    fullWidth
                    label="Contraseña"
                    type="password"
                    id="password"
                    error={errors.password ? true : false}
                    helperText={
                      errors.password ? errors.password.message : null
                    }
                  />
                )}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "La contaseña es obligatoria",
                  },
                  minLength: {
                    value: 8,
                    message:
                      "La contraseña debe tener una longitud mínima de 8 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message:
                      "La contraseña debe tener una longitud máxima de 20 caracteres",
                  },
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrarme
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                ¿Ya tienes cuenta? Accede
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
