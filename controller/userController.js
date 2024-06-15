const httpStatusCode = require("../constants/httpStatusCode");
const { getToken } = require("../middleware/authMiddleware");
const UserModel=require('../models/userModel');
const bcrypt=require('bcrypt');
const Login = async(req, res) => {
  try {
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(httpStatusCode.BAD_REQUEST).json({
            sucess:false,
            message:"Email or Pasword is empty"
        })
    }
    const User=await UserModel.findOne({email});
    if(!User){
        return res.status(httpStatusCode.BAD_REQUEST).json({
            success:false,
            message:"User is not found with this email"
        })
    }

    const isPasswordCorrect=await bcrypt.compare(password,User.password);
    if(!isPasswordCorrect){
        return res.status(httpStatusCode.BAD_REQUEST).json({
            success:false,
            message:"Password is incorrect"
        })
    }

    const token=await getToken(User);

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Login Successfully",
      data: {User,token},
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong!!",
      error: error.message,
    });
  }
};
const Register = async(req, res) => {
  try {

    const {email,password,username}=req.body;
    if(!email || !password || !username){
        return res.status(httpStatusCode.BAD_REQUEST).json({
            success:false,
            message:"email or password or username is empty"
        })
    }
    const isExistingUser=await UserModel.findOne({email});
    if(isExistingUser){
        return res.status(httpStatusCode.CONFLICT).json({
            success:false,
            message:"User already registered"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const User=await UserModel.create({
        username,
        email,
        password:hashedPassword
    })
    if(!User){
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:"Failed to create user"
        })
    }
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Login Successfully",
      data: User,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong!!",
      error: error.message,
    });
  }
};

module.exports = {
  Login,
  Register,
};
