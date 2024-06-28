const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
  name: {
    type: String,
    required: [true,"name is required"],
  },
  partyId: {
    type:  mongoose.SchemaTypes.ObjectId,
    ref: "Election",
    required: [true,"partyName is required"],
  },
  age: {
    type: Number,
    required: [true,"age is required"],
  },
  votes: [
    {
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
      },
      votedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  voteCount: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;
