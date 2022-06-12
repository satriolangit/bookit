const Room = require("../models/room");
const mongoose = require("mongoose");
const rooms = require("../data/rooms");

mongoose.connect("mongodb://localhost:27017/bookit", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedRooms = async () => {
  try {
    await Room.deleteMany();
    console.log("Room are deleted");

    await Room.insertMany(rooms);
    console.log("All room imported");

    process.exit;
  } catch (error) {
    console.log(error.message);
    process.exit;
  }
};

seedRooms();
