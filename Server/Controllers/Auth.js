import dotenv from "dotenv";
dotenv.config();
import User from "../Models/User.js";
import formidable from "formidable";
import fs from "fs";
import jwt from "jsonwebtoken";

// SIGN UP CONTROLLER
export const signup = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, file) => {
    if (err) {
      res.status(500).json({
        error: JSON.stringify(err),
      });
    }
    const newUser = new User(fields);
    const { email, phoneNumber } = fields;
    newUser.profilePicture.data = fs.readFileSync(file.profilePicture.path);
    newUser.profilePicture.contentType = file.profilePicture.type;

    // CHECK IF EMAIL IS ALREADY EXIST
    User.findOne({ email: email }).exec((err, user) => {
      if (err) {
        res.status(500).json({
          error: JSON.stringify(err),
        });
      }

      // CHECK IF MOBILE NUMBER IS ALREADY EXIST
      if (!user) {
        User.findOne({ phoneNumber: phoneNumber }).exec((err, user) => {
          if (err) {
            res.status(500).json({
              error: JSON.stringify(err),
            });
          }
          // IF NO EMAIL AND MOBILE NUMBER EXIST THEN SAVE USER
          if (!user) {
            newUser.save((err, user) => {
              if (err || !User) {
                res.status(500).json({
                  error: JSON.stringify(err),
                });
              } else if (user) {
                res.status(201).json({
                  success: "NEW ACCOUNT CREATED SUCCESSFULLY",
                });
              }
            });
          } else if (user) {
            res.status(400).json({
              error: "PHONE NUMBER ALREADY EXIST",
            });
          }
        });
      } else {
        res.status(400).json({
          error: "EMAIL ALREADY EXIST",
        });
      }
    });
  });
};

// SIGN IN CONTROLLER
export const signin = (req, res) => {
  const { value, password } = req.body;

  // LOGIC FOR CHECKING ENTERED VALUE IS EMAIL OR A NUMBER
  var userInput = Number(value);

  if (isNaN(userInput)) {
    // ENTERED VALUE IS NAN... MEANS THERE MAY BE EMAIL
    User.findOne({ email: value }).exec((err, user) => {
      if (err) {
        res.status(500).json({
          error: JSON.stringify(err),
        });
      } else if (!user) {
        res.status(400).json({
          error: "ENTERED EMAIL DOES NOT EXIST",
        });
      } else if (user) {
        if (user.password == password) {
          const token = jwt.sign({ _id: user._id }, process.env.SECRET);
          res.cookie("token", token, { expires: new Date(Date.now() + 90000) });
          res.status(200).json({
            success: {
              userId: user._id,
              token: token,
            },
          });
        } else {
          res.status(400).json({
            error: "PASSWORD DO NOT MATCH",
          });
        }
      }
    });
  }
  // ENTERED VALUE IS NOT A NAN... THAT MEANS IT MAY BE A NUMBER
  else if (!isNaN(userInput)) {
    User.findOne({ phoneNumber: userInput }).exec((err, user) => {
      if (err) {
        res.status(500).json({
          error: JSON.stringify(err),
        });
      } else if (!user) {
        res.status(400).json({
          error: "ENTERED PHONE NUMBER DOES NOT EXIST",
        });
      } else if (user) {
        if (user.password == password) {
          const token = jwt.sign({ _id: user._id }, process.env.SECRET);
          res.cookie("token", token, { expires: new Date(Date.now() + 90000) });
          res.status(200).json({
            success: {
              userId: user._id,
              token: token,
            },
          });
        } else {
          res.status(400).json({
            error: "PASSWORD DO NOT MATCH",
          });
        }
      }
    });
  }
};
