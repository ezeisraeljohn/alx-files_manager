import dbClient from "../utils/db";
import redisClient from "../utils/redis";

export const getStatus = (req, res) => {
  const dbStatus = dbClient.isAlive();
  const redisStatus = redisClient.isAlive();
  res.status(200).json({ redis: redisStatus, db: dbStatus });
};

export const getStats = async (req, res) => {
  const numUsers = await dbClient.nbUsers();
  const numFiles = await dbClient.nbFiles();
  res.status(200).json({ users: numUsers, files: numFiles });
};
