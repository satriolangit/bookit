import nc from "next-connect";
import dbConnect from "../../../server/config/dbConnect";

import {
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from "../../../server/controllers/roomController";

import onError from "../../../server/middlewares/errors";

const handler = nc({ onError });

dbConnect();

handler.get(getSingleRoom);
handler.put(updateRoom);
handler.delete(deleteRoom);

export default handler;
