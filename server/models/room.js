const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the room name"],
    trim: true,
    maxlength: [100, "Room name cannot exceed 100 characters"],
  },
  pricePerNight: {
    type: Number,
    required: [true, "Please enter the room price"],
    trim: true,
    maxlength: [4, "Room price cannot exceed 4 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter the room description"],
  },
  address: {
    type: String,
    required: [true, "Please enter the room address"],
  },
  guestCapacity: {
    type: Number,
    required: [true, "Please enter the room guest capacity"],
  },
  numOfBeds: {
    type: Number,
    required: [true, "Please enter the number of beds in room"],
  },
  internet: {
    type: Boolean,
    default: false,
  },
  breakfast: {
    type: Boolean,
    default: false,
  },
  airConditioned: {
    type: Boolean,
    default: false,
  },
  petsAllowed: {
    type: Boolean,
    default: false,
  },
  roomCleaning: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter room category"],
    enum: {
      values: ["King", "Single", "Twins"],
      message: "Please select correct category for room",
    },
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        required: false,
        ref: "User",
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Room || mongoose.model("Room", roomSchema);
