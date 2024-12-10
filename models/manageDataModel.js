const mongoose = require("mongoose");

const ManageDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    reason:{
        type:String,
        required:false
    },
    comment:{
        type:String,
        required:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("manageData", ManageDataSchema);
