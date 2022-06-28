
const product = require("../models/product");
const products = require('../data/products.json');
  
// const Product = require('../models/product');
// // const dotenv = require('dotenv');
// const connectDatabase = require('../config/database');

// const products = require('../data/products.json');


// // Setting dotenv file
// // dotenv.config({ path: '../config/config.env' })

// connectDatabase();

// const seedProducts = async () => {


//     try {

//       await Product.deleteMany();
//       console.log('Products are deleted');

//         await Product.insertMany(products)
//         console.log('All Products are added.')

//         process.exit();

//     } catch (error) {
//         console.log(error.message);
//         process.exit();
//     }
// }

// module.exports = seedProducts




const  seedProducts = async() =>{
  console.log("dummy is working ");



  try {

    await product.deleteMany();
    console.log('Products are deleted');

      await product.insertMany(products)
      console.log('All Products are added.')

      process.exit();

  } catch (error) {
      console.log(error.message);
      process.exit();
  }
}



module.exports = { seedProducts}