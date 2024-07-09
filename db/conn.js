const { MongoClient } = require('mongodb');
const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

(async () => {
    try {
        const database = client.db(process.env.DB_NAME);
        console.log('Connected to database');
        module.exports = database;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
})();