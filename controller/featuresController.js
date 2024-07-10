const { validationResult } = require("express-validator");
const httpStatusCode = require("../constants/httpStatusCode");
const featuresModel = require("../models/featuresModel");

const FeatureUpdate = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: errors.array(),
      });
    }

    let { number, heading, description } = req.body;
    if (!number || !heading || !description) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Please enter all the fields",
      });
    }
    const isExisting = await featuresModel.findOne({ number });
    let Features;
    if (isExisting) {
      Features = await featuresModel.findOneAndUpdate(
        { number },
        {
          heading,
          description,
        }
      );
    } else {
      Features = await featuresModel.create({
        number,
        heading,
        description,
      });
    }

    if (!Features) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "Failed to find the model",
      });
    }

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Feature updated successfully",
      data: Features,
    });
  } catch (error) {
    console.log("error to update features:", error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "error to update features",
      error: error.message,
    });
  }
};

const ViewFeatures = async (req, res) => {
  try {
    const features = await featuresModel.find();
    if (!features) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "Failed to find the model",
      });
    }
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Features found successfully",
      data: features,
    });
  } catch (error) {
    console.log("error to view features:", error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "error to view features",
      error: error.message,
    });
  }
};

module.exports = {
  FeatureUpdate,
  ViewFeatures
};
