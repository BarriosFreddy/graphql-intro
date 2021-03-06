const { MongoClient, ObjectId } = require("mongodb");
const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD, AUTH_MECHANISM } = process.env;

const username = encodeURIComponent(DB_USER);
const password = encodeURIComponent(DB_PASSWORD);

const MONGO_URI = `mongodb+srv://${username}:${password}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&authMechanism=${AUTH_MECHANISM}`;

class MongodbService {
  constructor() {}

  async connect() {
    console.log(MONGO_URI);
    const mongoClient = new MongoClient(MONGO_URI, {
      useUnifiedTopology: true,
    });
    try {
      await mongoClient.connect();
      this.database = await mongoClient.db(DB_NAME);
      this.database.command({ ping: 1 });
      console.log("Mongo Database connected successfully!");
    } catch (error) {
      await mongoClient.close();
      console.error(error);
    }
  }

  async getAll(collection, query) {
    return await this.database.collection(collection).find(query).toArray();
  }

  async get(collection, id) {
    return await this.database
      .collection(collection)
      .findOne({ _id: ObjectId(id) });
  }

  async save(collection, data) {
    const { insertedId } = await this.database
      .collection(collection)
      .insertOne(data);
    return { insertedId };
  }

  async update(collection, id, data) {
    const { modifiedCount } = await this.database
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: data });
    return { modifiedCount };
  }

  async delete(collection, id) {
    const { deletedCount } = await this.database
      .collection(collection)
      .deleteOne({ _id: ObjectId(id) });
    return { deletedCount };
  }
}

module.exports = new MongodbService();
