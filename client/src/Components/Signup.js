import React, { useState } from "react";
import "../CSS/Signup.css";
import {
  OutlinedInput,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormGroup,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff, Close } from "@material-ui/icons";
import MenuBar from "./Menu";
import { Link } from "react-router-dom";
import { signUpApi } from "../Helpers/Auth";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function Signup() {
  const classes = useStyles();

  // ALL REQUIRED STATES

  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const [userDetailsState, setuserDetailsState] = useState({
    fullName: "",
    email: "",
    hobbies: [],
    gender: "",
    profilePicture: "",
    password: "",
    phoneNumber: "",
    formData: new FormData(),
  });

  const {
    formData,
    fullName,
    email,
    hobbies,
    gender,
    profilePicture,
    password,
    phoneNumber,
  } = userDetailsState;

  const [msg, setmsg] = useState({
    usermsg: "",
    success: false,
    error: false,
  });

  const [confirmPassword, setconfirmPassword] = useState();

  // ALL REQUIRED HANDLERS

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (field) => (event) => {
    setmsg({ ...msg, usermsg: "" });
    setuserDetailsState({ ...userDetailsState, [field]: event.target.value });
  };

  const handleHobbies = () => {
    setmsg({ ...msg, usermsg: "" });

    var checkedValues = [];
    document
      .querySelectorAll(".PrivateSwitchBase-input-9")
      .forEach((checkbox) => {
        if (checkbox.type == "checkbox" && checkbox.checked) {
          checkedValues.push(checkbox.value);
        }
      });
    setuserDetailsState({ ...userDetailsState, hobbies: checkedValues });
  };

  const handleConfirmPassword = (event) => {
    setconfirmPassword(event.target.value);
  };

  const handleProfilePic = (event) => {
    setmsg({ ...msg, usermsg: "" });

    setuserDetailsState({
      ...userDetailsState,
      profilePicture: event.target.files[0],
    });
  };

  const setFormData = () => {
    formData.set("fullName", fullName);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("gender", gender);
    formData.set("hobbies", hobbies);
    formData.set("profilePicture", profilePicture);
    formData.set("phoneNumber", phoneNumber);
  };

  const handleSubmit = async (event) => {
    if (
      fullName &&
      email &&
      hobbies &&
      profilePicture &&
      password &&
      gender &&
      phoneNumber
    ) {
      setuserDetailsState({ ...userDetailsState, formData: new FormData() });
      event.preventDefault();
      if (userDetailsState.password !== confirmPassword) {
        setmsg({
          ...msg,
          usermsg: "Confirm Password is not same as Password",
          error: true,
          success: false,
        });
      } else {
        setFormData();
        signUpApi(formData).then((data) => {
          if (data.error) {
            setmsg({
              ...msg,
              usermsg: data.error,
              error: true,
              success: false,
            });
          } else if (data.success) {
            setmsg({
              ...msg,
              usermsg: data.success,
              error: false,
              success: true,
            });
          }
        });
      }
    }
  };

  return (
    <>
      <MenuBar />
      <form className="signup_container">
        <fieldset
          style={{
            borderColor: "magenta",
            borderWidth: "0.5px",
            fontSize: "30px",
            boxSizing: "border-box",
            margin: "auto",
          }}
        >
          <legend>Sign up</legend>
          {msg.usermsg && (
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
          <div className="signup_row">
            <div className="signup_column">
              <TextField
                label="Full Name"
                variant="outlined"
                type="text"
                required={true}
                onChange={handleChange("fullName")}
              />
              <FormControl className={clsx(classes.margin)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  required={true}
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
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
              <FormLabel required={true} component="legend">
                Gender
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                onChange={handleChange("gender")}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
              <FormControl style={{ marginTop: "20px" }}>
                <FormLabel>Upload Profile Pic</FormLabel>
                <input
                  style={{ marginTop: "20px" }}
                  type="file"
                  required={true}
                  onChange={handleProfilePic}
                />
              </FormControl>
            </div>
            <div className="signup_column">
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                required={true}
                onChange={handleChange("email")}
              />
              <FormControl className={clsx(classes.margin)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  required={true}
                  type={values.showPassword ? "text" : "password"}
                  onChange={handleConfirmPassword}
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
                  labelWidth={130}
                />
              </FormControl>
              <FormLabel>Hobbies</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      className="hobbie_check_box"
                      onChange={handleHobbies}
                      value="Coding"
                    />
                  }
                  label="Coding"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      className="hobbie_check_box"
                      value="Singing"
                      onChange={handleHobbies}
                    />
                  }
                  label="Singing"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      className="hobbie_check_box"
                      onChange={handleHobbies}
                      name="Workout"
                      value="Workout"
                    />
                  }
                  label="Workout"
                />
              </FormGroup>
              <TextField
                style={{ marginTop: "20px" }}
                variant="outlined"
                label="Phone Number"
                type="number"
                required={true}
                onChange={handleChange("phoneNumber")}
              />
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
            type="submit"
            style={{ marginTop: "50px", width: "100%" }}
          >
            Submit
          </Button>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p style={{ fontSize: "15px" }}>
              Already have an account ? <Link to="/signin">Log in</Link>
            </p>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default Signup;
