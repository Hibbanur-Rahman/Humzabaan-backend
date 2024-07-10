const mongoose = require("mongoose");

const FeaturesSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const featuresModel=mongoose.model('features',FeaturesSchema);

module.exports=featuresModel;