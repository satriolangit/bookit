import nc from "next-connect";
import { allRooms, newRoom } from "../../../server/controllers/roomController";
import dbConnect from "../../../server/config/dbConnect";
import onError from "../../../server/middlewares/errors";

const handler = nc({ onError });

dbConnect();

handler.get(allRooms);
handler.post(newRoom);

export default handler;
