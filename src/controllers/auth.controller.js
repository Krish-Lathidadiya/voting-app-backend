const User = require("../models/user.model");
const Otp = require("../models/otp.model");
const bcrypt = require('bcrypt');
const { sendMail, getOtpEmailTemplate } = require("../utils/sendMail");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

exports.sendOtpEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new ApiError(404, "Email not found");
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "Invalid Email");
    }

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    // Calculate expiration time (1 hour from now)
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    // Send OTP email
    await sendMail(email, "Your Email OTP", getOtpEmailTemplate(otp));

    //remove existing otp
    await Otp.findOneAndDelete({userId:user._id})

    const newOtp = new Otp({
      userId: user._id,
      otp,
      expiresAt,
    });
    await newOtp.save();

    res
      .status(200)
      .json(new ApiResponse(200, {}, "OTP email sent successfully"));
  } catch (error) {
    next(error);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { userId, otp } = req.body;

    if (!otp) {
      throw new ApiError(404, "OTP not found");
    }

    if (!userId) {
      throw new ApiError(404, "User ID not found");
    }

    // Find the OTP record for the user
    const otpRecord = await Otp.findOne({ userId });

    if (!otpRecord) {
      throw new ApiError(400, "Invalid OTP or OTP has expired");
    }

    // Check if OTP has expired
    if (otpRecord.expiresAt < new Date()) {
      throw new ApiError(400, "OTP has expired");
    }

    // Verify the OTP
    const isValid = await otpRecord.isOtpValid(otp);

    if (!isValid) {
      throw new ApiError(400, "Invalid OTP");
    }

    res.status(200).json(new ApiResponse(200, {}, "OTP verified successfully"));
  } catch (error) {
    next(error);
  }
};

exports.forgotPasswords = async (req, res, next) => {
  try {
    const { confirmPassword, newPassword, userId } = req.body;

    if (!confirmPassword || !newPassword) {
      throw new ApiError(400, "Please enter your password");
    }


    if (confirmPassword !== newPassword) {
      throw new ApiError(400, "Passwords do not match");
    }

    // Validate password strength (modify the regex as per your requirements)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      throw new ApiError(400, "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updated = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!updated) {
      throw new ApiError(400, "Password update failed");
    }

    res.status(200).json(new ApiResponse(200, {}, "Password updated successfully"));
  } catch (error) {
    next(error);
  }
};
