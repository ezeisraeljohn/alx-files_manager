const sha1 = require("sha1");
const { uuid } = require("uuidv4");
const auth = require("basic-auth");
import dbClient from "../utils/db";
import redisClient from "../utils/redis";

export const getConnect = async (req, res) => {
  const credentials = auth(req);
  if (!credentials) return res.status(401).json({ error: "Unauthorized" });
  const { name, pass } = credentials;
  const user = await dbClient.db.collection("users").findOne({ email: name });
  if (!user || user.password !== sha1(pass)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = uuid();
  const key = `auth_${token}`;
  await redisClient.set(key, user._id.toString(), 86400);
  return res.status(200).json({ token });
};

export const getDisconnect = async (req, res) => {
  const token = req.header("X-Token");
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  const key = `auth_${token}`;
  const userId = await redisClient.get(key);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  await redisClient.del(key);
  return res.status(204).end();
};
