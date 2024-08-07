const express = require("express");
const { Login, Register } = require("../controller/userController");
const {
  UpdateTestimonial1,
  ViewTestimonial,
  UpdateTestimonial2,
  UpdateTestimonial3,
} = require("../controller/testimonialController");
const upload = require("../middleware/multerMiddleware");
const { verifyToken, verifyTokenNew } = require("../middleware/authMiddleware");
const {
  CreateMessage,
  ViewMessages,
} = require("../controller/messageController");
const { FeatureUpdate, ViewFeatures } = require("../controller/featuresController");


const Router = express.Router();

Router.post("/login", Login);
Router.post("/register", Register);
Router.post(
  "/update-testimonial-1",
  upload.single("profileImage"),
  UpdateTestimonial1
);
Router.post(
  "/update-testimonial-2",
  upload.single("profileImage"),
  UpdateTestimonial2
);
Router.post(
  "/update-testimonial-3",
  upload.single("profileImage"),
  UpdateTestimonial3
);
Router.post("/view-testimonial", ViewTestimonial);
Router.post("/send-message-db", CreateMessage);
Router.post("/view-messages", verifyToken, ViewMessages);

Router.post('/update-feature',verifyTokenNew,FeatureUpdate)
Router.post('/view-features',verifyToken,ViewFeatures)

module.exports = Router;
