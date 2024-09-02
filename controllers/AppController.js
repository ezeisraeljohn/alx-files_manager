import dbClient from "../utils/db";
import redisClient from "../utils/redis";

export const status = (req, res) => {
  const db_db = dbClient.isAlive();
  const redis_db = redisClient.isAlive();
  res.status(200).json({ redis: redis_db, db: db_db });
};

export const stats = async (req, res) => {
  const users_db = await dbClient.nbUsers();
  const files_db = await dbClient.nbFiles();
  res.status(200).json({ users: users_db, files: files_db });
};
