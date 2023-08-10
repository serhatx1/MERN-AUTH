import User from "../model/user.js";
import asyncHandler from "express-async-handler";
import { hashPaswword, comparePassword } from "../helpers/bcrypt.js";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

export const test = (req, res) => {
  console.log("test");
  res.json("test is working");
};
export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error:
          "password is required and password should be at least 6 characters long",
      });
    }
    if (!email) {
      return res.json({
        error: "email is required",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "e-mail already exists",
      });
    }
    const hashedPassword = await hashPaswword(password);
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    newUser.save();
    return res.json({
      message: "user has registered",
    });
  } catch (error) {
    console.error(error);
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        error: "no user with this email",
      });
    }

    const match = await comparePassword(password, user.password);

    if (match) {
      console.log("sa");
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_KEY,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.cookie("token", token).json(user);
        }
      );
    } else {
      return res.json({
        error: "password is incorrect",
      });
    }
  } catch (error) {}
});
export const getProfile = asyncHandler(async (req, res) => {
  console.log("it entered");
  console.log(req.cookies);
  const { token } = req.cookies;

  try {
    if (token) {
      const decodedUser = jwt.verify(token, process.env.JWT_KEY);
      res.json(decodedUser);
    } else {
      res.json(null);
    }
  } catch (error) {
    console.error("JWT verification error:", error);
    res.json(null);
  }
});

export const getLogOut = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error while logging out:", error);
    res.json(null);
  }
})