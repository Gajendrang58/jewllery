const mongoose = require("mongoose");

const formSubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      validate: {
        validator: function (v) {
          return /^\+?[1-9]\d{9,14}$/.test(v); // E.164 compliant
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      trim: true,
      set: (v) => v.replace(/\D/g, ""), // Store only digits
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Add text index for search functionality
formSubmissionSchema.index({
  name: "text",
  email: "text",
  message: "text",
  date: "text"
});

module.exports = mongoose.model("FormSubmission", formSubmissionSchema);
