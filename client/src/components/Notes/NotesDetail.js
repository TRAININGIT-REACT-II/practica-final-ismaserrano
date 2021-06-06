import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useForm, Controller } from "react-hook-form";

import useApi from "../../hooks/useApi";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

/* Styles */
import { useStyles } from "./styles";
import { Loader } from "../Loader";

const NotesDetail = () => {
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { user } = useSelector((state) => state.user);
  const urlParams = useParams();
  const history = useHistory();
  const detailReq = useApi(`/api/notes/${urlParams.id}`, user.token, {}, true);

  const addNote = (data) => {
    detailReq.updateParams({
      method: "PUT",
      body: JSON.stringify({
        title: data.title,
        content: data.description,
      }),
    });
    detailReq.perform();
  };

  const onSubmit = (data) => {
    addNote(data);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {!detailReq.loading ? (
          <>
            <Typography component="h1" variant="h5">
              Editar nota
              <span style={{ float: "right" }}>{detailReq.data.date}</span>
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
                        defaultValue={detailReq.data.title}
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
                        defaultValue={detailReq.data.content}
                      />
                    )}
                    control={control}
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
                Enviar
              </Button>
            </form>
          </>
        ) : (
          <Loader />
        )}
      </Paper>
      <Button onClick={() => history.goBack()}>Volver a notas</Button>
    </div>
  );
};

export default NotesDetail;
