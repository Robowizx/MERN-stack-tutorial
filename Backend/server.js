const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
let student = require("./models/students.model");

require("dotenv").config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useCreateIndex: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connected to mongoDB database successfully");
});

app.get("/read", (req, res) => {
  student
    .find()
    .then(students => res.json(students))
    .catch(err => res.status(400).send("Error: " + err));
});

app.get("/read/:uid", (req, res) => {
  student
    .find({usn: req.params.uid})
    .then(student => res.json(student))
    .catch(err => res.status(400).send("Error: " + err));
});

app.post("/create", (req, res) => {
  const newStudent = new student({
    usn: req.body.usn,
    name: req.body.name,
    branch: req.body.branch,
    sem: req.body.sem,
    phno: req.body.phno
  });
  newStudent
    .save()
    .then(() => res.send("New student added"))
    .catch(err => {
      console.log("request body: " + req.body + "\n" + err);
      res.status(400).send("Request Unsuccessful");
    });
});

app.delete("/delete/:uid", (req, res) => {
  student
    .deleteOne({usn: req.params.uid})
    .then(() => res.send("Deleted student successfully"))
    .catch(err => res.status(400).send("Error: " + err));
});

app.post("/update/:uid", (req, res) => {
  student
    .findOne({usn: req.params.uid})
    .then(stud => {
      stud.name = req.body.name ? req.body.name : stud.name;
      stud.branch = req.body.branch ? req.body.branch : stud.branch;
      stud.sem = req.body.sem ? Number(req.body.sem) : stud.sem;
      stud.phno = req.body.phno ? req.body.phno : stud.phno;

      stud
        .save()
        .then(() => res.json("student updated successfully"))
        .catch(err => res.status(400).json("Error2: " + err));
    })
    .catch(err => res.status(400).json("Error1: " + err));
});

app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});
