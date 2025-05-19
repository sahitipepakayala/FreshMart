import React from 'react'
import { Link } from 'react-router-dom'
import { FaLongArrowAltRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import Cartcard from './Cartcard';
import { clearCart } from '../Store/CartSlice';
import { useDispatch } from 'react-redux';

function Cart() {
   const items=useSelector((state)=>state.cart.items);
   const dispatch=useDispatch();
   const totalPrice = items
  .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
  .toFixed(2);
  const handleClear=async(e)=>{
    e.preventDefault();
    try{
        dispatch(clearCart())
    }
    catch(error)
    {
        console.log(error);
        console.log("error in clearing cart")
    }
  }

  return (
    <div className='mx-10 my-20 border-2 border-green-400 p-8 shadow-xl rounded'>
        <div className='flex flex-wrap justify-between items-center'>
            <div className='text-xl font-semibold'>Shopping Cart</div>
            <button className='bg-red-600 px-3 py-1 rounded-md text-white text-xl cursor-pointer' onClick={handleClear}>Clear Cart</button>
        </div>
        <div className='my-9 '>{
            items.length>0?items.map((item)=><Cartcard key={item._id} item={item}/>)
        :<p className='font-serif text-gray-900 text-lg'>No Products In The Cart !</p>
}
        </div> 
        <hr className="border-t border-green-500 my-4" />
    <div className='flex flex-wrap justify-between items-center'>
        <div>
            <p className='text-xl font-normal'>SubTotal</p>
            <p className='text-md font-normal text-gray-700 mt-2'>Shipping and taxes calculated at checkout.</p>
        </div>
        <div className='text-xl font-medium'>
            ${totalPrice}
        </div>
    </div>
   <Link to="/order"> <button className='bg-green-700 w-full text-white p-2 mt-4 rounded-xl text-xl'>Place Order</button></Link>
    <div className="text-center mt-5"><span>or </span>
  <Link to="/" className="text-green-700 font-semibold hover:underline inline-flex">
     Continue Shopping  <FaLongArrowAltRight className='mt-1/2 text-xl'/>
  </Link>
</div>

 </div>
  )
}

export default Cart