const Product = require('./../models/productsModel');
const { validationResult } = require('express-validator');

categoryMapper = {
  breakfast: 'Breakfast',
  maindishes: 'Main Dish',
  drinks: 'Drinks',
  desserts: 'Dessert',
};
const addProduct = async (req, res) => {
  try {
    let newProductData = Object.assign({}, req.body);
    console.log(newProductData);

    // Access the uploaded file via req.file
    let productMainImg = req.files.productImage;

    // Validate if the image was uploaded
    if (!productMainImg) {
      return res.status(400).json({ msg: 'Main image is required.' });
    }

    // Validate incoming data
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    // Create new product entry in the database
    const newProduct = await Product.create({
      ...newProductData,
      productImage: ['http://localhost:8000/' + productMainImg[0].path], // Save the file path
    });

    // Return success response
    return res.status(201).json({
      msg: 'Product created successfully.',
      product: newProduct,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      msg: 'An error occurred while adding the product.',
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    let category = req.query.category;

    // Map category using the categoryMapper if applicable
    category = categoryMapper[category] || category;

    // Dynamically construct the query object
    let query = {};
    if (category) {
      query.productCategory = category;
    }

    // Use the query object directly in the find method
    let products = await Product.find(query);

    // Send the products as the response
    res.json(products);
  } catch (error) {
    // Error handling
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

const getSingleProduct = async (req, res) => {
  let id = req.params.id;
  let intendeProduct = await Product.findOne({ _id: id });
  res.json(intendeProduct || { msg: 'Not Found' });
};

const updateProduct = async (req, res) => {
  console.log(req.body);
  let id = req.params.id;
  let newProductData = req.body;
  if (req.files.productImage) {
    newProductData.productImage = [
      'http://localhost:8000/' + req.files.productImage[0].path,
    ];
  }
  let updated = await Product.updateOne(
    { _id: id },
    { ...newProductData, $inc: { __v: 1 } }
  );
  res.json(updated);
};

const deleteProduct = async (req, res) => {
  let id = req.params.id;

  let deleted = await Product.deleteOne({ _id: id });
  console.log(deleted);
  res.json(deleted);
};

const aggregations = async (req, res) => {
  let page = req.query.page || 1;
  let limit = 2;
  let skip = (page - 1) * limit;

  let agg = await Product.find({}).limit(limit).skip(skip);

  res.json(agg);
};

module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  aggregations,
};
