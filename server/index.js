const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const userRouter = require("./routes/user.route.js");
const courseRouter = require("./routes/course.route.js");
const adminRouter = require("./routes/admin.route.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

const PORT = process.env.PORT;

async function main() {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("Mongodb connected!");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

main();
