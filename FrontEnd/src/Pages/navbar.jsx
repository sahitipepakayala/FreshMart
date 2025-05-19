import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { removeUser } from "../Store/userSlice";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./Cart";



function Navbar() {
  const navigate=useNavigate();
  const cartItems=useSelector((store)=>store.cart.items);
  const dispatch=useDispatch()
  const user=useSelector((store)=>store.user);
  const handleLogout=async(e)=>{
    e.preventDefault();
    try{
      await axios.get(`https://freshmart-frontend-mxo4.onrender.com/admin/logout`)
      dispatch(removeUser())
      swal("Success", "Logged Out Successfully!", "success");
    navigate("/login");}
    catch(error){
      console.log(error);
      alert("error");
    }

    
  }
  return (
    <div className=" flex flex-row justify-between navbar bg-green-600 text-white shadow-sm p-5 ">
      
      {/* Left: Logo */}
      <div className="navbar-start flex flex-row">
        <img src="https://cdn5.vectorstock.com/i/1000x1000/71/74/fresh-market-logo-design-vector-33337174.jpg"  className="h-[50px] w-[50px] rounded-md object-cover rounded-md" ></img>
        <Link to="/" className="btn btn-ghost normal-case text-xl text-white mt-4 ml-2 font-bold">FreshMart</Link>
      </div>

      {/* Center: Links (Use flex, not menu) */}
      <div className="navbar-center flex gap-6 font-semibold mt-4">
        <Link to="/" className="text-xl">Home</Link>
        {user?<div><Link to="/cart" className="text-xl">Cart</Link> <Link to={`/myOrders/${user._id}`} className="text-xl ml-3">My Orders</Link></div>:
        <Link to="/login" className="text-xl">Cart</Link>}
        {user && user.admin && 
       <div> <Link to="/manage"className="text-xl ">Manage Products</Link>
        <Link to="/manageOrders"className="text-xl ml-3">Manage Orders</Link></div>
        }
      </div>

      {/* Right: Login Dropdown */}{user ?  (<div className="flex flex-row gap-4"> <div className="flex flex-row mt-4 text-bold border-2 py-1 rounded-md px-3"><FaShoppingCart className="w-5 h-5"/>
<p className="ml-5 text-xl font-semibold">{cartItems.length}</p></div>
            <button onClick={handleLogout} className="text-lg font-semibold text-white hover:cursor-pointer">LogOut</button>
      </div> ) :
      <div className="navbar-end flex flex-row gap-3 hover:cursor-pointer">
        <details className="dropdown dropdown-end">
          <summary className="btn btn-ghost text-xl font-bold mt-2">Login</summary>
          <ul className="menu dropdown-content z-[1] p-2 border border-white shadow-[0_4px_6px_-1px_rgba(255,255,255,0.5)] bg-green-600 text-black rounded-box w-32">
  <li><Link to="/login" className="text-white font-semibold">User</Link></li>
  <li><Link to="/adminLogin" className="text-white font-semibold=.">Admin</Link></li>
</ul>

        </details>
        <FaUserCircle className="mt-2 h-[28px] w-[28px] "/>

      </div>}
    </div>
  );
}

export default Navbar;
