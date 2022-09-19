// @ts-check

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
module.exports = client;

// client.connect((err) => {
//   const collection = client.db('node1').collection('users');
//   // perform actions on the collection object
//   client.close();
// });

// async function main() {
//   await client.connect();

//   const users = client.db('node1').collection('users');

//   await users.deleteMany({});
//   await users.insertMany([
//     {
//       name: 'pororo',
//       age: 5,
//     },
//     {
//       name: 'loopy',
//       age: 6,
//     },
//     {
//       name: 'crong',
//       age: 4,
//     },
//   ]);

//   // mongoDB module안에 있는 forEach(js랑 다른거임)
//   // const data = users.find({});
//   // const arr = await data.toArray();
//   const data = users.find({
//     name: 'loopy',
//   });
//   console.log(data);
//   const arr = data.toArray();
//   console.log(arr);
//   // await data.forEach(console.log);

//   await client.close();
// }
// main();
