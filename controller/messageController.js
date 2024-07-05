const { validationResult } = require("express-validator");
const httpStatusCode = require("../constants/httpStatusCode");
const MessageModel = require("../models/messageModa]el");

const CreateMessage =async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatusCode.BAD_REQUEST).json({ 
        success:false,
        errors: errors.array()
     });
    }

    const {name,email,message}=req.body;
    if( !name || !email || !message){
        return res.status(httpStatusCode.BAD_REQUEST).json({
            success:false,
            message:"fill the all field"
        })
    }

    const messageSend=await MessageModel.create({
        name,
        email,
        message
    })

    if(!messageSend){
        return res.status(httpStatusCode.BAD_REQUEST).json({
            success:false,
            message:"something went wrong in messageModel"
        });
    }

    return res.status(httpStatusCode.CREATED).json({
        success:true,
        message:"Message send successfully",
        data:messageSend
    })
  } catch (error) {
    console.log("error in message", error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong !!",
      error: error.message,
    });
  }
};


module.exports={
    CreateMessage
}
