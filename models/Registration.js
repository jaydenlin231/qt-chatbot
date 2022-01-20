const mongoose = require("mongoose");
const { Schema } = mongoose;

const registrationSchema = new Schema({
  user: String,
  userIdentification: String,
});

mongoose.model("registration", registrationSchema);
