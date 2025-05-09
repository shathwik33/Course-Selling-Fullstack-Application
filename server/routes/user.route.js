const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const dotenv = require("dotenv");
dotenv.config();

const { Router } = express;
const userRouter = Router();

const { UserModel, PurchaseModel } = require("../db.js");
const { userAuth } = require("../middleware/auth.middleware.js");

// Zod schemas
const userSignupSchema = z.object({
  email: z.string().min(3).max(100).email(),
  password: z.string().min(3).max(30),
  firstname: z.string().min(1).max(50),
  lastname: z.string().min(1).max(50),
});

const userSigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

// Signup route
userRouter.post("/signup", async (req, res) => {
  try {
    const parsed = userSignupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        error: parsed.error.errors,
      });
    }

    const { email, password, firstname, lastname } = parsed.data;

    const hashedPassword = await bcrypt.hash(password, 5);
    await UserModel.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
    });

    res.status(201).json({ message: "You are signed up!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Signin route
userRouter.post("/signin", async (req, res) => {
  try {
    const parsed = userSigninSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        error: parsed.error.errors,
      });
    }

    const { email, password } = parsed.data;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET_USER // fixed: always use JWT_SECRET_USER for users
    );
    res.json({ token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Purchases route
userRouter.get("/purchases", userAuth, async (req, res) => {
  try {
    const courses = await PurchaseModel.find({ userId: req.userId });
    res.json({ courses });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

module.exports = userRouter;
