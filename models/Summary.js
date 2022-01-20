const mongoose = require("mongoose");
const { Schema } = mongoose;

const summarySchema = new Schema({
  lesson: String,
  topic: String,
  text: String,
});

mongoose.model("summary", summarySchema);
