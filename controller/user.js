const { User } = require("../model/user");
const ErrorResponse = require("../utils/error");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUSer = await User.create({
      name,
      email,
      password,
    });

    return res.json({
      success: true,
      message: "New USer registered",
    });
  } catch (err) {
    next(new ErrorResponse(err, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({
      email: email,
      password: password,
    });
    if (!foundUser) {
      return res.json({
        success: false,
        message: "Email or password is Incorrect",
      });
    }
    const token = jwt.sign(
      { id: foundUser.id, name: foundUser.name, email: foundUser.email },
      "1234567",
      {
        expiresIn: "24hr",
      }
    );
    return res.json({
      success: true,
      data: foundUser,
      token: token,
    });
  } catch (err) {
    return next(new ErrorResponse(err, 500));
  }
};

const getUserDetail = async (req, res, next) => {
  try {
    const id = req.params.id;

    const found = await User.findById({
      _id: id,
    });
    return res.json({
      success: true,
      data: found,
    });
  } catch (err) {
    next(new ErrorResponse(err, 500));
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const all = await User.find();
    return res.json({
      success: true,
      data: all,
    });
  } catch (err) {
    next(new ErrorResponse(err, 500));
  }
};

const getAllProtectedUser = async (req, res, next) => {
  try {
    const { name } = req.query;
    let query = {};
    if (name) {
      query = {
        name: { $regex: name, $options: "i" },
      };
    }
    const found = await User.find(query);
    return res.json({
      success: true,
      data: found,
    });
  } catch (err) {
    next(new ErrorResponse(err, 500));
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        name: name,
        email: email,
        password: password,
      }
    );
    return res.json({
      success: true,
      data: updateUser,
    });
  } catch (err) {
    next(new ErrorResponse(err, 500));
  }
};

module.exports = {
  createUser,
  login,
  getAllUser,
  getAllProtectedUser,
  getUserDetail,
  updateUser,
};
