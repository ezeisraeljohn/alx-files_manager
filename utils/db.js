// MongoDB connection

const { MongoClient } = require("mongodb");
class DBClient {
  constructor() {
    this.client = null;
    this.db = null;
    this.host = process.env.DB_HOST || "localhost";
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || "files_manager";
    this.url = `mongodb://${this.host}:${this.port}`;
    MongoClient.connect(
      this.url,
      { useUnifiedTopology: true },
      (err, client) => {
        if (err) {
          console.log(err);
          this.db = null;
        } else {
          this.client = client;
          this.db = client.db(this.database);
        }
      }
    );
  }

  isAlive() {
    if (this.db) return true;
    return false;
  }

  async nbUsers() {
    return this.db.collection("users").countDocuments();
  }

  async nbFiles() {
    return this.db.collection("files").countDocuments();
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
