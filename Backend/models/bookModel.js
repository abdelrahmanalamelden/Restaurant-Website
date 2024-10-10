const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  date: Date,
  time: String,
  name: String,
  phone: String,
  count: String,
  bookedAt: { type: Date, default: Date.now() },
});

const bookModel = mongoose.model("books", bookSchema);

module.exports = bookModel;
