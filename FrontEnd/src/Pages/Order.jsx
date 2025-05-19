import axios from 'axios';
import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../Store/CartSlice';
import { useNavigate } from 'react-router-dom';

function Order() {
    const [address, setAddress] = useState('');
    const items=useSelector((state)=>state.cart.items);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const totalPrice = items
    .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);
    const user=useSelector((store)=>store.user);
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/order/place`, {
          buyer: user._id,
          buyerName: user.name,
          price: parseFloat(totalPrice), // Fixed type
          number: user.number,
          address: address
         
        });
        navigate("/")
        console.log("Order placed successfully", response.data);
        dispatch(clearCart())
        
      } catch (error) {
        console.error("Error placing order:", error.response?.data || error.message);
      }
    };
    
  return (
    <div>
        
        <form className='flex flex-col justify-center items-center gap-3 p-5' onSubmit={handleSubmit}>
          {
          console.log(user)
          }
            <h1 className='text-2xl font-semibold'>Enter Your Details</h1>
            <fieldset className="fieldset">
  <legend className='fieldset-legend text-xl font-serif gap-2'>Name:</legend>
  <input type="text" className="input mt-2 p-2 border-1 black rounded-md" placeholder={user.name} />
</fieldset>
<fieldset className="fieldset">
  <legend className='text-xl font-serif gap-2'>Email</legend>
  <input type="text" className="input mt-2 p-2 border-1 black rounded-md" placeholder={user.emailId} />
</fieldset>
<fieldset className="fieldset">
  <legend className='text-xl font-serif gap-2'>Number</legend>
  <input type="text" className="input mt-2 p-2 border-1 black rounded-md" placeholder={user.number} />
</fieldset>

<fieldset className="fieldset">
<textarea
  className="input mt-2 p-2 border-1 black rounded-md"
  cols={30}
  rows={5}
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  placeholder="Enter your address"
/></fieldset>

           
<h1 className='text-xl font-bold'>Total Price: ${totalPrice}</h1>
           
<h1 className='text-xl font-bold'>Cash on delivery</h1>
<button type="submit" className='bg-green-500 border-2 black shadow-emerald-900 px-40 py-3 rounded-md text-bold'>Confirm Order</button>
 
        </form>
    </div>
  )
}

export default Order