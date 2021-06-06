import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useForm, Controller } from "react-hook-form";

import useApi from "../../hooks/useApi";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

/* Styles */
import { useStyles } from "./styles";

const NotesAdd = () => {
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { user } = useSelector((state) => state.user);
  const addReq = useApi("/api/notes", user.token, {}, false);
  const history = useHistory();

  const addNote = (data) => {
    const dateObj = new Date(Date.now());
    addReq.updateParams({
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        content: data.description,
        date: new Intl.DateTimeFormat("es-ES").format(dateObj),
      }),
    });
    addReq.perform();
  };

  const onSubmit = (data) => {
    addNote(data);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Añadir nota
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="title"
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    required
                    id="title"
                    label="Título"
                    error={errors.title ? true : false}
                    helperText={errors.title ? errors.title.message : null}
                  />
                )}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "El título es obligatorio",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    label="Descripción"
                    multiline
                    rows={6}
                    id="description"
                  />
                )}
                control={control}
              />
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={6}>
              <Button
                onClick={() => history.goBack()}
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default NotesAdd;
