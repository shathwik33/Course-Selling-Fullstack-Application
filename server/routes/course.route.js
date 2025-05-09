const express = require("express");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { Router } = express;
const dotenv = require("dotenv");
dotenv.config();

const courseRouter = Router();
const { PurchaseModel, CourseModel } = require("../db.js");
const { userAuth } = require("../middleware/auth.middleware.js");

// Schema to validate purchase body
const purchaseSchema = z.object({
  courseId: z.string().min(1),
});

// Route to purchase a course
courseRouter.post("/purchase", userAuth, async (req, res) => {
  try {
    const parsed = purchaseSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid course data",
        error: parsed.error.errors,
      });
    }

    const { courseId } = parsed.data;

    await PurchaseModel.create({
      userId: req.userId,
      courseId,
    });

    res.json({ message: "Purchased successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Public route to preview courses
courseRouter.get("/preview", async (req, res) => {
  try {
    const course = await CourseModel.find();
    res.json(course);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

module.exports = courseRouter;
