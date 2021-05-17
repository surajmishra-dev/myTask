import React, { useState } from "react";
import MenuBar from "./Menu";
import "../CSS/Signin.css";
import { signInApi } from "../Helpers/Auth";
import { Redirect } from "react-router-dom";
import {
  OutlinedInput,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import { Visibility, VisibilityOff, Close } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function Signin() {
  const classes = useStyles();

  // ALL REQUIRED STATES

  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const [user, setuser] = useState({
    value: "",
    password: "",
  });

  const [msg, setmsg] = useState({
    usermsg: "",
    success: false,
    error: false,
  });

  const [redirect, setredirect] = useState({
    didRedirected: false,
  });

  // ALL EVENT HANDLERS

  const handleChange = (props) => (event) => {
    setuser({ ...user, [props]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    if (user.value && user.password) {
      event.preventDefault();
      signInApi(user)
        .then((data) => {
          if (data.error) {
            setmsg({
              ...msg,
              usermsg: data.error,
              error: true,
              success: false,
            });
          } else {
            window.localStorage.setItem("auth", JSON.stringify(data));
            setredirect({ ...redirect, didRedirected: true });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  // REDIRECT TO HOME IF SIGN IN SUCCESS

  if (redirect.didRedirected) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <MenuBar />
      <form className="signin_form_container">
        <fieldset
          style={{
            borderColor: "magenta",
            borderWidth: "0.5px",
            fontSize: "30px",
            padding: "40px",
          }}
        >
          <legend>Log in</legend>
          {msg.usermsg && msg.error && (
            <p
              className="msg"
              style={{
                backgroundColor: "#3f51b5",
                color: "white",
                textAlign: "center",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: "15px",
                fontSize: "15px",
                width: "50%",
                margin: "0 auto 30px",
                padding: "10px 0",
              }}
            >
              {msg.usermsg}{" "}
              {
                <span
                  className="msg_close_icon"
                  onClick={() => setmsg({ ...msg, usermsg: "" })}
                >
                  <Close />
                </span>
              }
            </p>
          )}
          <div className="signin_row">
            <div className="signin_column">
              <TextField
                variant="outlined"
                label="Email or Phone Number"
                required={true}
                onChange={handleChange("value")}
              />
              <FormControl className={clsx(classes.margin)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  required={true}
                  type={values.showPassword ? "text" : "password"}
                  // value={user.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>

              <Button
                onClick={handleSubmit}
                variant="contained"
                color="secondary"
                type="submit"
              >
                Submit
              </Button>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <p style={{ fontSize: "15px" }}>
                  Don't have Account ? Create Here{" "}
                  <Link to="/signup">Sign up</Link>
                </p>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default Signin;
