import { json } from "express";
import dbClient from "../utils/db";
import redisClient from "../utils/redis";
const sha1 = require("sha1");
import { ObjectId } from "mongodb";

export const postNew = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ error: "Missing email" });
  if (!password) return res.status(400).json({ error: "Missing password" });

  const user = await dbClient.db.collection("users").findOne({ email });
  if (user) return res.status(400).json({ error: "Already exists" });

  const hashedPassword = sha1(password);

  const { password: _password, ...userData } = req.body;

  let result = await dbClient.db
    .collection("users")
    .insertOne({ ...userData, password: hashedPassword });

  if (!result) return res.status(500).json({ error: "Error inserting" });

  delete result.ops[0].password;
  result.ops[0].id = result.ops[0]._id;
  delete result.ops[0]._id;
  return res.status(201).json(result.ops[0]);
};

export const getMe = async (req, res) => {
  const token = req.header("X-Token");
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const key = `auth_${token}`;
  const userId = await redisClient.get(key);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const user = await dbClient.db
    .collection("users")
    .findOne({ _id: ObjectId(userId) });

  if (!user) return res.status(401).json({ error: "Unauthorized" });

  delete user.password;
  user.id = user._id;
  delete user._id;
  return res.status(200).json(user);
};
