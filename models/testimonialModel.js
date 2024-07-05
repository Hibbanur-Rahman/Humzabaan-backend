const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema(
  {
    testimonialNumber:{
        type:Number,
        required:true
    },
    name: {
      type: String,
      required: true,
    },
    description:{
        type: String,
        required: true
    },
    rating:{
        type:String,
        required:true
    },
    image:{
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

const testimonialModel=mongoose.model('testimonial',TestimonialSchema);

module.exports={
    testimonialModel
}
