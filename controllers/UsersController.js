import dbClient from "../utils/db";
const sha1 = require("sha1");

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

  return res.status(201).json(result.ops[0]);
};
