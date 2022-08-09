const {Client} = require('pg');

// async function getConnection() {
//     const client = new Client({
//         host: 'localhost',
//         port: 5432,
//         user: 'postgres',
//         password: '1234',
//         database: 'universalmusic',
//     })
//     await Client.connect();
//     return client;
// }
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
  client.connect();

module.exports = client;