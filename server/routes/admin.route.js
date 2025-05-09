const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { Router } = express;

const adminRouter = Router();
const { AdminModel, CourseModel } = require("../db.js");
const { adminAuth } = require("../middleware/auth.middleware.js");

// Zod schema for signup
const signupSchema = z.object({
  email: z.string().min(3).max(100).email(),
  password: z.string().min(3).max(30),
  firstname: z.string().min(1).max(50),
  lastname: z.string().min(1).max(50),
});

// Zod schema for course creation & update
const courseSchema = z.object({
  title: z.string().min(1),
  desc: z.string().min(1),
  price: z.number().positive(),
  imageURL: z.string().url(),
});

const updateCourseSchema = courseSchema.extend({
  courseId: z.string().min(1),
});

// Signup Route
adminRouter.post("/signup", async function (req, res) {
  try {
    const parsed = signupSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        error: parsed.error.errors,
      });
    }

    const { email, password, firstname, lastname } = parsed.data;

    const existing = await AdminModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    await AdminModel.create({
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

// Signin Route
adminRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await AdminModel.findOne({ email });

    if (!response) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, response.password);

    if (!passwordMatch) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    const token = jwt.sign(
      { id: response._id.toString() },
      process.env.JWT_SECRET_ADMIN
    );

    res.json({ token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Create Course Route
adminRouter.post("/course", adminAuth, async (req, res) => {
  try {
    const parsed = courseSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid course data",
        error: parsed.error.errors,
      });
    }

    const { title, desc, price, imageURL } = parsed.data;

    await CourseModel.create({
      title,
      desc,
      price,
      imageURL,
      creatorId: req.adminId,
    });

    res.json({ message: "Course created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Update Course Route
adminRouter.put("/course", adminAuth, async (req, res) => {
  try {
    const parsed = updateCourseSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid update data",
        error: parsed.error.errors,
      });
    }

    const { title, desc, price, imageURL, courseId } = parsed.data;

    const updatedCourse = await CourseModel.updateOne(
      { _id: courseId, creatorId: req.adminId },
      {
        title,
        desc,
        price,
        imageURL,
      },
      { new: true }
    );

    res.json({ message: "Course updated successfully", course: updatedCourse });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Get All Admin Courses Route
adminRouter.get("/course/bulk", adminAuth, async (req, res) => {
  try {
    const course = await CourseModel.find({ creatorId: req.adminId });
    res.json(course);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

module.exports = adminRouter;
