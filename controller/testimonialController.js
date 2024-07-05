const httpStatusCode = require("../constants/httpStatusCode");
const { testimonialModel } = require("../models/testimonialModal");
const { validationResult } = require("express-validator");

const UpdateTestimonial1 = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { name, description, image, rating } = req.body;
    if (!name || !description || !image || !rating) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const isExistingTestimonial = await testimonialModel.findOne({
      testimonialNumber: 1,
    });
    let testimonial;
    if (isExistingTestimonial) {
      testimonial = await testimonialModel.findByIdAndUpdate(
        isExistingTestimonial._id,
        {
          name,
          description,
          image,
          rating,
        }
      );
    }
    testimonial = await testimonialModel.create({
      testimonialNumber: 1,
      name,
      description,
      image,
      rating,
    });

    if (!testimonial) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "Testimonial not found",
      });
    }
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Testimonial Updated",
      data: testimonial,
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
const UpdateTestimonial2 = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { name, description, image, rating } = req.body;
    if (!name || !description || !image || !rating) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const isExistingTestimonial = await testimonialModel.findOne({
      testimonialNumber: 2,
    });
    let testimonial;
    if (isExistingTestimonial) {
      testimonial = await testimonialModel.findByIdAndUpdate(
        isExistingTestimonial._id,
        {
          name,
          description,
          image,
          rating,
        }
      );
    }
    testimonial = await testimonialModel.create({
      testimonialNumber: 2,
      name,
      description,
      image,
      rating,
    });

    if (!testimonial) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "Testimonial not found",
      });
    }
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Testimonial Updated",
      data: testimonial,
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
const UpdateTestimonial3 = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { name, description, image, rating } = req.body;
    if (!name || !description || !image || !rating) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const isExistingTestimonial = await testimonialModel.findOne({
      testimonialNumber: 3,
    });
    let testimonial;
    if (isExistingTestimonial) {
      testimonial = await testimonialModel.findByIdAndUpdate(
        isExistingTestimonial._id,
        {
          name,
          description,
          image,
          rating,
        }
      );
    }
    testimonial = await testimonialModel.create({
      testimonialNumber: 3,
      name,
      description,
      image,
      rating,
    });

    if (!testimonial) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "Testimonial not found",
      });
    }
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Testimonial Updated",
      data: testimonial,
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

const ViewTestimonial = async (req, res) => {
  try {
    const testimonial = await testimonialModel.find();
    if (!testimonial) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "Testimonial not found",
      });
    }
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Testimoal founded",
      data: testimonial,
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
  UpdateTestimonial1,
  UpdateTestimonial2,
  UpdateTestimonial3,
  ViewTestimonial,
};
