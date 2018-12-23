const { MongoClient } = require('mongodb');
const { config } = require('../config');

console.log(config);

const DB_USER = encodeURIComponent(config.dbUser);
const DB_PASS = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;


const MONGO_URI = `mongodb://${DB_USER}:${DB_PASS}@${config.dbHost}:${config.dbPort}/?authSource=${DB_NAME}`; // prettier
console.log(MONGO_URI);

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect(err => {
        if (err) {
          reject(err);
        }
        console.log('Connected succesfully to mongo');
        resolve(this.client.db(this.dbName));
      })
    })
  }

  getAll(collection, query) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)
        .toArray();
    })
  }
}

module.exports = MongoLib;