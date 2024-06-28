const User = require("../models/user.model");
const Candidate = require("../models/candidate.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

const checkAdminRole = async (userID) => {
  try {
    const user = await User.findById(userID);
    if (user.role === "admin") {
      return true;
    }
  } catch (err) {
    return false;
  }
};

exports.addCandidate = async (req, res, next) => {
  try {
    const create = await Candidate.create(req.body);
    if (!create) {
      throw new ApiError(400, "candidate create failed");
    }
    res
      .status(200)
      .json(new ApiResponse(200, create, "candidate add successfully"));
  } catch (error) {
    next(error);
  }
};

exports.verifyCandidate = async (req, res, next) => {
  try {
    const { candidateId } = req.params;

    // Find the candidate by ID
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      throw new ApiError(404, "Candidate not found");
    }

    candidate.isVerified = !candidate.isVerified;

    // Save the updated candidate
    const updatedCandidate = await candidate.save();

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { candidate: updatedCandidate },
          "Candidate verification status updated"
        )
      );
  } catch (error) {
    next(error);
  }
};
