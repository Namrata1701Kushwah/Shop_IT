const app = require("./app");

const connectDatabase = require("./config/database");

const cloudinary = require ('cloudinary')
const dotenv = require("dotenv");
const { seedProducts } = require("./utils/seeder");

dotenv.config({ path: "./config/config.env" });

process.on('uncaughtException', err => {
  console.log(`Error: ${err.stack}`)
  console.log('Shuting down server due to uncaught exception')
  process.exit(1)
})


connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


// console.log(process.env)

// seedProducts()

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`);
  console.log('shuting down the server due to unhandled Promise rejection')
  server.close(() => {
    process.exit(1)
  })
});





