const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  console.log('connecting mongoDB ...')
  await mongoose.connect('mongodb://127.0.0.1:27017/finance');
  console.log('MongoDB is connected')

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}