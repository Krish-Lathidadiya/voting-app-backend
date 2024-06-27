const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError");
const User = require("../models/user.model");

exports.signUp = async (req, res, next) => {
  try {
    const data = req.body;

    const adminUser = await User.findOne({ role: "admin" });
    if (data.role === "admin" && adminUser) {
      throw new ApiError(400, "Admin user already exists");
    }

    // Validate Aadhar Card Number must have exactly 12 digits
    if (!/^\d{12}$/.test(data.aadharCardNumber)) {
      throw new ApiError(400, "Aadhar Card Number must be exactly 12 digits");
    }

    // Check if a user with the same Aadhar Card Number already exists
    const existingUser = await User.findOne({
      aadharCardNumber: data.aadharCardNumber,
    });
    if (existingUser) {
      throw new ApiError(
        400,
        "User with the same Aadhar Card Number already exists"
      );
    }

    const newUser = new User(data);

    // Save the new user to the database
    const response = await newUser.save();
    console.log("Data saved");

    // const token = generateAccessToken(); // Uncomment if needed
    res.status(200).json(new ApiResponse(200, response, "Signup successfully"));
  } catch (err) {
    next(err);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { aadharCardNumber, password } = req.body;

    if (!aadharCardNumber || !password) {
      throw new ApiError(400, "Aadhar Card Number and password are required");
    }

    const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

    if (!user) {
      throw new ApiError(400, "Invalid Aadhar Card Number");
    }
    if (!(await user.comparePassword(password))) {
      throw new ApiError(400, "Invalid password");
    }

    // const token = generateToken();
    res.status(200).json(new ApiResponse(200, user, "signIn successfully"));
  } catch (err) {
    next(err);
  }
};

