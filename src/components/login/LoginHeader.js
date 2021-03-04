import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  headersection: {
   // backgroundImage: "linear-gradient(90deg, #231469, #791b35)",
    backgroundColor: "#791b35"
  },
}));
export default function App() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.headersection}>
        <Toolbar>
          <Typography variant="h4" className="header-title">
            Welcome
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
