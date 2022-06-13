const Product = require("../models/product");

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures');
const { query } = require("express");

exports.newProduct = catchAsyncErrors(async (req, res, next) => {

  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

exports.getProducts = catchAsyncErrors(async (req, res, next) => {


  const resPerPage = 4;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    // .pagination(resPerPage)

    let products = await apiFeatures.query
    let filteredProductsCount = products.length


    apiFeatures.pagination(resPerPage)



  res.status(200).json({
    success: true,
    // count:products.length,
    productsCount,
    resPerPage,
    products,
    filteredProductsCount
  });


});
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404))

  }
  res.status(200).json({
    success: true,
    product
  })
})


exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    })
  }
  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product is deleted."
  })
})

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  }
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    r => r.user.toString() === req.user._id.toString()
  )
  if (isReviewed) {
    product.reviews.forEach(review => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    })

  }
  else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length
  }
  product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true
  })
})

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    })
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.query, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });


  res.status(200).json({
    success: true,
    product
  })

})
// &price[lte]=1&price[gte]=0
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  res.status(200).json({
    success: true,
    reviews: product.reviews
  })
})
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(review => review.id.toString() !== req.query.id.toString())

  const numOfReviews = reviews.length;
  const rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.
    reviews.length

  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    rating,
    numOfReviews
  }, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })
  res.status(200).json({
    success: true,
    reviews: product.reviews
  })
})