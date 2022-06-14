import{BrowserRouter as Router, Route} from 'react-router-dom'

import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import ProductDetails from './components/product/productDetails';
import Login from './components/user/Login';
import Profile from './components/user/Profile'
import ProtectedRoute from './components/route/ProtectedRoute';
import Register from './components/user/Register';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import  {loadUser} from './actions/userActions'
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'
import ListOrders from './components/order/ListOrders';
import store from './store'
import axios from 'axios'
import { useEffect ,useState} from 'react';



//Payments
import {Elements}  from '@stripe/react-stripe-js'
import {loadStripe}  from '@stripe/stripe-js'
import OrderDetails from './components/order/OrderDetails';

function App() {

  const [stripeApiKey, setStripeApiKey] = useState()



  useEffect(()=>{
        store.dispatch(loadUser())

        async function getStripApiKey() {
          const { data } = await axios.get('/api/v1/stripeapi');
          console.log(data.stripeApiKey)
    
          setStripeApiKey(data.stripeApiKey)
        }
    
        getStripApiKey();
  },[])
  return (
    <Router>
       <div className="App">
      <Header/>
        <div className='container container-fluid'>
      <Route path="/" component={Home} exact/>
      <Route path="/search/:keyword" component={Home}/>
      <Route path="/product/:id" component={ProductDetails} exact/>
      <Route path="/cart" component={Cart} exact/>
      <ProtectedRoute path="/ship" component={Shipping} />
      <ProtectedRoute path="/order/confirm" component={ConfirmOrder} />
      <ProtectedRoute path="/success" component={OrderSuccess}/>
      {stripeApiKey &&
           <Elements stripe={loadStripe(stripeApiKey)}>
             <ProtectedRoute path = "/payment" component={Payment} />
           </Elements>
           }

      <Route path ="/login" component={Login} />
      <Route path ="/register" component={Register} />
      <Route path ="/password/forgot" component={ForgotPassword} exact />
      <Route path ="/password/reset/:token" component={NewPassword} exact />
      <ProtectedRoute path ="/me" component={Profile} exact/>
      <ProtectedRoute path ="/me/update" component={UpdateProfile} exact/>
      <ProtectedRoute path ="/password/update" component={UpdatePassword} exact/>
      <ProtectedRoute path ="/orders/me" component={ListOrders} exact/>
      <ProtectedRoute path ="/order/:id" component={OrderDetails} exact/>`
   
      </div>
     
      <Footer/>
    </div>
    </Router>
   
  );
}

export default App;
