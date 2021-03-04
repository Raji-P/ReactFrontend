import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLazyQuery } from "react-apollo";
import { setUserSession } from "../Utils/OverAll";
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import gql from "graphql-tag";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import LoginHeader from "./LoginHeader";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

const GET_USER = gql`
  query user($email: String!) {
    userByEmail(email: $email) {
      email
      id
      name
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submitbtn: {
    margin: theme.spacing(3, 0, 2),
    backgroundImage: "linear-gradient(90deg, #231469, #791b35)",
  },
}));

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [loginerror, setLoginerror] = useState("");
  const history = useHistory();
  const [openErr, setOpenErr] = React.useState(false);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [checkUser] = useLazyQuery(GET_USER, {
    onCompleted: (data) => {
      if (data && data.userByEmail === null) {
        setLoginerror("OOPS! Your Email Id is wrong!");
        setOpenErr(true);
      } else {
        setLoginerror("");
        setUserSession(data.userByEmail.id, data.userByEmail);
        setOpenErr(false);
        history.push("/vieworders");
      }
    },
  });

  const onSubmit = () => {
    checkUser({ variables: { email } });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErr(false);
  };

  const showError = () => {
    if (loginerror) {
      return (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={openErr}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {loginerror}
          </Alert>
        </Snackbar>
      );
    } else {
      return null;
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <LoginHeader />
      <div className={classes.paper}>
        {showError()}
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            placeholder="Enter your email address"
            id="input-with-icon-textfield"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register}
            error={errors.email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submitbtn}
          >
            <Typography
              variant="h6"
              className="header-title"
              style={{ color: "#fff" }}
            >
              SIGN IN
            </Typography>
          </Button>
        </form>
      </div>
    </Container>
  );
}
