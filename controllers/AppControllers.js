import dbClient from '../utils/db';
import redisClient from '../utils/redis';

export const status = (req, res) => {
  const db = dbClient.isAlive();
  const redis = redisClient.isAlive();
  res.status(200).json({ redis, db });
};

export const stats = async (req, res) => {
  const users = await dbClient.nbUsers();
  const files = await dbClient.nbFiles();
  res.status(200).json({ users, files });
};
