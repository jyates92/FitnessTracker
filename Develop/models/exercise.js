const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const excercise = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    trim: true,
    required: "Strength Training or Cardio?",
  },
  name: {
    type: String,
    trim: true,
    required: "What exercise?",
  },
  duration: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
});

const Excercise = mongoose.model("Exercise", excercise);

module.exports = Excercise;
