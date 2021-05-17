import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/Menu.css";
import { AppBar, Toolbar, Button, IconButton } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { signOutApi } from "../Helpers/Auth";

function MenuBar() {
  const [loggedIn, setloggedIn] = useState({
    isLoggedIn: false,
  });

  const checkIsLoggedIn = () => {
    if (localStorage.getItem("auth")) {
      setloggedIn({ ...loggedIn, isLoggedIn: true });
    } else {
      setloggedIn({ ...loggedIn, isLoggedIn: false });
    }
  };

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit">
          <Link style={{ color: "white", textDecoration: "none" }} to="/">
            <Home />
          </Link>
        </IconButton>
        {loggedIn.isLoggedIn ? (
          <Button color="inherit">
            <Link
              onClick={() => {
                signOutApi();
                checkIsLoggedIn();
              }}
              style={{ color: "white", textDecoration: "none" }}
              to="/"
            >
              Log out
            </Link>
          </Button>
        ) : (
          <Toolbar>
            <Button color="inherit">
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/signup"
              >
                Signup
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/signin"
              >
                Login
              </Link>
            </Button>
          </Toolbar>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default MenuBar;
