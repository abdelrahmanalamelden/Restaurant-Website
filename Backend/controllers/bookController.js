const Book = require("../models/bookModel");

const addBook = async (req, res) => {
  try {
    let newBookData = Object.assign({}, req.body);
    console.log(req.body);

    const newBook = await Book.create({
      ...newBookData,
    });

    return res.status(201).json({
      msg: "Book created successfully.",
      book: newBook,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "An error occurred while adding the book.",
      error: error.message,
    });
  }
};

module.exports = { addBook };
