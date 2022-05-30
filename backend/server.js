const app = require("./app");

const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

process.on('uncaughtException',err=>{
  console.log(`Error: ${err.stack}`)
  console.log('Shuting down server due to uncaught exception')
  process.exit(1)
})


connectDatabase();

const server=app.listen(process.env.PORT, () => {
  console.log(`Server is started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

process.on('unhandledRejection',err=>{
  console.log(`Error: ${err.message}`);
  console.log('shuting down the server due to unhandled Promise rejection')
  server.close(()=>{
    process.exit(1)
  })
});