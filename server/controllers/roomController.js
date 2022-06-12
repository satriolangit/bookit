import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import handleAsync from "../middlewares/asyncHandlerError";
import APIFeatures from "../utils/apiFeatures";

const allRooms = handleAsync(async (req, res) => {
  const resPerPage = 4;

  const roomsCount = await Room.countDocuments();

  const apiFeatures = new APIFeatures(Room.find(), req.query).search().filter();

  let rooms = await apiFeatures.query;
  let filteredRoomsCount = rooms.length;

  apiFeatures.pagination(resPerPage);
  rooms = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    roomsCount,
    resPerPage,
    filteredRoomsCount,
    rooms,
  });
});

const newRoom = handleAsync(async (req, res) => {
  const room = await Room.create(req.body);
  res.status(200).json({
    success: true,
    room,
  });
});

const getSingleRoom = handleAsync(async (req, res, next) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room with this ID is not found", 404));
  }

  res.status(200).json({
    success: true,
    room,
  });
});

const updateRoom = handleAsync(async (req, res, next) => {
  let room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room with this ID is not found", 404));
  }

  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    room,
  });
});

const deleteRoom = handleAsync(async (req, res, next) => {
  if (!room) {
    return next(new ErrorHandler("Room with this ID is not found", 404));
  }

  await room.remove();

  res.status(200).json({
    success: true,
    message: "Room is deleted",
  });
});

export { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
