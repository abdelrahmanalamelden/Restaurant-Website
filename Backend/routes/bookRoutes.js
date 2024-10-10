const express = require("express");
const router = express.Router();
const book = require("./../controllers/bookController");

router.route("/").post(book.addBook);

module.exports = router;
