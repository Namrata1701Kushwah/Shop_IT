import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension'
import {productsReducer,productDetailsReducer ,newReviewReducer,productReviewsReducer,newProductReducer,productReducer} from './reducers/productReducers'
import { authReducer, userReducers,forgotPasswordReducer} from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import {newOrderReducer, myOrdersReducer, orderDetailsReducer,allOrdersReducer ,orderReducer} from './reducers/orderReducers'
import Shipping from './components/cart/Shipping';

const reducer = combineReducers({
 products : productsReducer,
 productDetails : productDetailsReducer,
 product : productReducer,
 auth : authReducer,
 user : userReducers,
 forgotPassword : forgotPasswordReducer,
 cart : cartReducer,
 newOrder : newOrderReducer,
 myOrders : myOrdersReducer,
 orderDetails : orderDetailsReducer,
 newReview : newReviewReducer,
 productReviews : productReviewsReducer,
 newProduct : newProductReducer,
 allOrders : allOrdersReducer,
 order : orderReducer

})


let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store; 


// fragment
// useEffect
// thunk
// export vs default export
// package-lock.json // 
// formatting
// git