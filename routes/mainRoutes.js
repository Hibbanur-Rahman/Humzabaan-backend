const express = require("express");
const { Login, Register } = require("../controller/userController");
const { UpdateTestimonial1, ViewTestimonial } = require("../controller/testimonialController");
const upload = require("../middleware/multerMiddleware");
const { verifyToken } = require("../middleware/authMiddleware");
const Router = express.Router();

Router.post('/login',Login);
Router.post('/register',Register);
Router.post('/update-testimonial-1',upload.single("profileImage"),UpdateTestimonial1);
Router.post('/view-testimonial',verifyToken,ViewTestimonial);

module.exports = Router;