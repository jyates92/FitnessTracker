const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
// const router = require("./routes/router");
const path = require("path");
const Data = require("./models");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/workout-routines";
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connected...");
  })
  .catch((error) => console.log(error));

// require("./routes/router.js")(app);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.post("/api/add-exercise", function (req, res) {
  console.log("posting to workouts", req);
  Data.Exercise.update(
    { _id: req.body.id },
    { $push: { exercises: req.body.exercises } },
    (err) => {
      if (err) return res.status(500).json(err);
      res.json("Exercise added to workout");
    }
  );
});

app.post("/api/add-workout", function (req, res) {
  const newExercise = new Data.Exercise(req.body);
  newExercise.save(function (err) {
    if (err) return res.status(500).json(err);
    res.json("New workout created");
  });
});

app.post("/api/workouts/bulk", function (req, res) {
  console.log("posting to workouts/bulk");
  res.json("its lit");
});

app.get("/api/workouts", function (req, res) {
  Data.Exercise.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
  Data.Exercise.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
