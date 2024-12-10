const { validationResult } = require("express-validator");
const SubscribeModel = require("../models/subscribeModel");
const httpStatusCode = require("../constants/httpStatusCode");
const { SendSubscribeEmail } = require("../services/emailServices");

const AddSubscribe = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        errors: errors.array(),
      });
    }

    let { email, name } = req.body;
    if (!email || !name) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        errors: ["Email and name are required"],
      });
    }
    let subscribe = new SubscribeModel({
      email,
      name,
    });
    if (!subscribe) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to create subscribe",
      });
    }
    await SendSubscribeEmail(email,name);
    return res.status(httpStatusCode.CREATED).json({
      success: true,
      message: "Subscribe created successfully",
      data: subscribe,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  AddSubscribe,
};
