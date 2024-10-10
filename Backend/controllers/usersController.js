const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('./../models/usersModel');
const responseMsgs = require('./../utilities/responseMsgs');
const errorHandler = require('./../utilities/errorHandler');
const { request } = require('express');

const register = async (req, res) => {
  console.log(req.body);
  try {
    let newUserData = req.body;
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw validationErrors;
    }

    let hashedPassword = await bcrypt.hash(newUserData.userPassword, 6);
    let addUser = await User.create({
      ...newUserData,
      userPassword: hashedPassword,
    });
    res.status(201).json({
      status: responseMsgs.SUCCESS,
      data: addUser,
    });
  } catch (er) {
    errorHandler(res, er);
  }
};

// er.errors[0] -> express validator
// er.message -> Database

const login = async (req, res) => {
  try {
    let credentials = req.body;
    console.log(req.body);
    let getUser = await User.findOne({ userEmail: credentials.userEmail });
    if (!getUser) {
      throw 'User Not Found';
    }
    let checkPassword = await bcrypt.compare(
      credentials.userPassword,
      getUser.userPassword
    );
    if (!checkPassword) {
      throw 'Wrong Password';
    }
    let token = jwt.sign(
      {
        name: getUser.userName,
        role: getUser.role,
      },
      process.env.JWTKEY,
      { expiresIn: '1h' } // Set token expiration if needed
    );

    // Set the cookie with appropriate options
    res
      .cookie('jwt', token, {
        httpOnly: false, // Helps mitigate XSS
      })
      .json({
        status: responseMsgs.SUCCESS,
        data: 'Logged In Successfully',
        role: getUser.role,
      });
  } catch (er) {
    console.log(er);
    res.json({
      status: responseMsgs.FAIL,
      data: er,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
  } catch (er) {}
};

const getSingleUser = async (req, res) => {
  try {
  } catch (er) {}
};

const updateUserData = async (req, res) => {
  try {
  } catch (er) {}
};

const updateUserPassword = async (req, res) => {
  try {
  } catch (er) {}
};

module.exports = {
  register,
  login,
  getAllUsers,
  getSingleUser,
  updateUserData,
  updateUserPassword,
};
