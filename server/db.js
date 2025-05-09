const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = new schema(
  {
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);

const Admin = new schema(
  {
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);

const Course = new schema({
  title: String,
  desc: String,
  price: Number,
  imageURL: String,
  creatorId: ObjectId,
});

const Purchase = new schema({
  userId: ObjectId,
  courseId: ObjectId,
});

const UserModel = mongoose.model("users", User);
const AdminModel = mongoose.model("admins", Admin);
const CourseModel = mongoose.model("courses", Course);
const PurchaseModel = mongoose.model("purchases", Purchase);

module.exports = {
  UserModel,
  AdminModel,
  CourseModel,
  PurchaseModel,
};
