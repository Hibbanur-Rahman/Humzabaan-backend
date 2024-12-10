const { validationResult } = require("express-validator");
const SubscribeModel = require("../models/subscribeModel");
const httpStatusCode = require("../constants/httpStatusCode");
const ManageDataModel = require("../models/manageDataModel");
const { SendManageDataEmail } = require("../services/emailServices");
const AddManageData = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        errors: errors.array(),
      });
    }
    let { email, name, reason, comment } = req.body;
    if (!email || !name) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        errors: ["Email and name are required"],
      });
    }
    const manageData = await ManageDataModel.create({
      email: email,
      name: name,
      reason: reason,
      comment: comment,
    });
    if (!manageData) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to add manage data",
      });
    }
    await SendManageDataEmail(email,name);
    return res.status(httpStatusCode.CREATED).json({
      success: true,
      message: "Manage data added successfully",
      data: manageData,
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
  AddManageData,
};
