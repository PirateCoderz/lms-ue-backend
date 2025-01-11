const mongoose = require("mongoose");
const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const meritListRoutes = require("./routes/meritListRoutes");
const feeStructureRoutes = require("./routes/feeStructureRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const timeRoutes = require("./routes/timeRoutes")
const userRoutes = require("./routes/userRoutes")
const attendanceRoutes = require("./routes/attendenceRoutes")

const app = express();
app.use(express.json());

require("dotenv").config();
const cors = require("cors");
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// Enable pre-flight requests
app.options("*", cors());
app.get("/", (req, res) => {
  res.send("welcome");
});
app.use("/api/students", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/meritList", meritListRoutes);
app.use("/api/timeTable", timeRoutes);
app.use("/api/feeStructure", feeStructureRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/user", userRoutes);
app.use("/api", attendanceRoutes);



const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;

app.listen(port, console.log(`sever running on port ${port}`));

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb Connection sucessfully...."))
  .catch((error) => console.log("MongoDb connection failed", error.message));
