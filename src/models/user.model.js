const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    match: [/^[a-zA-Z\s]+$/, "Not a valid name! Only letters are allowed"],
  },
  age: {
    type: Number,
    required: [true, "age is required"],
    minlength: [2, "age must be at least 2 characters"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  mobile: {
    type: String,
    match: [/^\d{10}$/, "Please provide a valid mobile number"],
  },
  address: {
    type: String,
    // required: true,
  },
  aadharCardNumber: {
    type: Number,
    required: true,
    unqiue: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()]).{8,}$/.test(
          v
        );
      },
      message: (props) =>
        `Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.`,
    },
  },
  role: {
    type: String,
    enum: ["voter", "admin"],
    default: "voter",
  },
  isVoted: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  // Hash the password only if it has been modified (or is new)
  if (!this.isModified("password")) return next();
  try {
    // hash password generation
    const salt = await bcrypt.genSalt(10);

    // hash password
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Override the plain password with the hashed one
    this.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // Use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model("User", userSchema);
module.exports = User;
