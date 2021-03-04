import {
  AppBar,
  makeStyles,
  IconButton,
  Container,
} from "@material-ui/core";
import React from "react";
import { Home } from "@material-ui/icons";
import { removeUserSession, getUserData } from "../Utils/OverAll";
import { useHistory } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MenuItem from "@material-ui/core/MenuItem";


const useStyles = makeStyles({
  headersection: {
    backgroundImage: "linear-gradient(90deg, #231469, #791b35)",
  },

  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
});

export default function Header() {
  const classes = useStyles();
  const user = getUserData();
  const userName = user.name;
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    removeUserSession();
    history.push("/");
  };

  return (
    <AppBar position="static" className={classes.headersection}>
        <Container className={classes.navbarDisplayFlex}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            onClick={handleLogout}
          >
            <Home fontSize="small" />
          </IconButton>
         <p onClick={handleClick}>
            Welcome! {userName}
            <ArrowDropDownIcon size="large" />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className="logoutMenu"
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </p>
        </Container>
    </AppBar>
  );
}
