const catchAsyncError = require('../middlewares/catchAsyncErrors')

const stripe = require ('stripe')("sk_test_51LA700SAcQ5McZX3CP5Nmw3LA7ICLSHiafENlENOtJkkni6ZvU6uKkTF4vXHrNHqvogWueJd0gdwZvI1b9oHMHSU00yyfcwFl6")


//PROCESS STRIPE PAYMENT => /api/v1/payment/process
console.log('KEY',stripe)
exports.processPayment = catchAsyncError(async(req, res, next)=>{
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency : 'inr',
        metadata : {integration_check : 'accept_a_payment'}
    });

    res.status(200).json({
        success : true,
        client_secret : paymentIntent.client_secret
    })
})



//SEND STRIPE API KEY => /api/v1/stripeapi
exports.sendStripeApi = catchAsyncError(async(req, res, next)=>{
    
    res.status(200).json({
       stripeApiKey : "pk_test_51LA700SAcQ5McZX3YuUdZUeDgGSLBAiwoDXXlxoP1nLw1X0A1XJcrWzoxu9ppLKxK9kwInllEvE1Rof6VcHfVUym00yEAcDYxU"
    })
})