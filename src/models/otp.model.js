const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const otpSchema = new mongoose.Schema({
  userId: String,
  otp: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: {
    type: Date,
    default: () => new Date(+new Date() + 60 * 60 * 1000),
  },
});

otpSchema.pre("save", async function (next) {
  if (!this.isModified("otp")) return next();

  this.otp = await bcrypt.hash(this.otp, 10);
  next();
});

// Custom method to check if OTP is correct and not expired
otpSchema.methods.isOtpValid = async function (plainOtp) {
  const isCorrect = await bcrypt.compare(plainOtp, this.otp);
  if (!isCorrect) return false;

  // Check if OTP has expired
  if (this.expiresAt && this.expiresAt < new Date()) {
    return false;
  }

  return true;
};

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
