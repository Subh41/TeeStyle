require('dotenv').config();
const { MongoClient } = require('mongodb');

// Connection URI from environment variables
const uri = process.env.MONGO_URI;

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
});

async function run() {
  try {
    // Connect the client to the server
    console.log('Attempting to connect to MongoDB Atlas...');
    await client.connect();
    
    // Confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB Atlas!");
    
    // List all databases
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    
    return true;
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
    return false;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run()
  .then(success => {
    if (success) {
      console.log("Connection test completed successfully");
      process.exit(0);
    } else {
      console.log("Connection test failed");
      process.exit(1);
    }
  })
  .catch(err => {
    console.error("Unexpected error:", err);
    process.exit(1);
  });
