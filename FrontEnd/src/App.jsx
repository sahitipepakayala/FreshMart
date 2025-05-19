import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Body from './Pages/Body';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { Provider } from 'react-redux';
import userStore from './Store/userStore';
import AdminLogin from './Pages/AdminLogin';
import MainBody from './Pages/MainBody';
import Manage from './Pages/Manage';
import Edit from './Pages/Edit';
import NewProduct from './Pages/NewProduct';
import Cart from './Pages/Cart';
import Order from './Pages/Order';
import MyOrders from './Pages/MyOrders';
import ManageOrders from './Pages/ManageOrders';
function App() {


  return (
    <>
    <Provider store={userStore}>
   <BrowserRouter basename="/">
    <Routes>

      <Route path="/" element={<Body/>}>
      <Route path="/" element={<MainBody/>}/>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/adminLogin" element={<AdminLogin/>}/>
      <Route path="/manage" element={<Manage/>}/>
      <Route path="/edit/:id" element={<Edit/>}/>
      <Route path="/newProduct" element={<NewProduct/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/order" element={<Order/>}/>
      <Route path="/myOrders/:id" element={<MyOrders/>}/>
      <Route path="/manageOrders" element={<ManageOrders/>}/>
      </Route>

   
  
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
