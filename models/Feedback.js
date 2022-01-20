const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  feedback: String,
});

mongoose.model("feedback", feedbackSchema);
