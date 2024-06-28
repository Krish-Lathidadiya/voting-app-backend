const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError");
const User = require("../models/user.model");
const Election = require("../models/election.model");

exports.addElections = async (req, res, next) => {
  try {
    const create = await Election.create(req.body);
    if (!create) {
      throw new ApiError(400, "error creating election");
    }
    res.status(200).json(new ApiResponse(200, create, "election add success"));
  } catch (error) {
    next(error);
  }
};
