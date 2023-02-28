const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.set('strictQuery', false);

const { HOST_URI, API_PORT } = process.env;

async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log('Database connection successful');

    app.listen(API_PORT, () => {
      console.log('Server running. Use our API on port: 3000');
    });
  } catch (error) {
    console.error('main failed', error.message);
  }
}

main();
