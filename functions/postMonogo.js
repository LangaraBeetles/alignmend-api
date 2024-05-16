
// functions/postData.js

const { MongoClient } = require('mongodb');

exports.handler = async function(event, context) {
  const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  
  try {
    await client.connect();
    const db = client.db('mydatabase');
    const collection = db.collection('mycollection');

    const data = JSON.parse(event.body);
    await collection.insertOne(data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data inserted successfully' })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error inserting data' })
    };
  } finally {
    await client.close();
  }
};
