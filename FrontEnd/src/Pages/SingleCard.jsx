import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../Store/CartSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function SingleCard({ product }) {
  const user=useSelector((state)=>state.user);
  const navigate=useNavigate();
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const increaseCount = () => setCount(prev => prev + 1);
  const decreaseCount = () => {
    if (count > 1) setCount(prev => prev - 1);
  };

  const handleCart = async (e) => {
    e.preventDefault();
    try {
      if(user) {
      dispatch(addItem({
        _id: product._id,
        image: product.image,
        name: product.name,
        price: product.price,
        quantity: count
      }));

      Swal.fire({
        title: "Added to Cart!",
        text: `${product.name} has been added to your cart.`,
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
      else{
        navigate("/login")
      };
    } catch (error) {
      console.log("Error adding item to cart:", error);
    }
  };

  return (
    <div className="card w-80 shadow-sm bg-white p-4 rounded-2xl">
      <figure>
        <img src={product.image} alt={product.name} className='h-47 w-2xl rounded-xl' />
      </figure>
      <div className="card-body">
        <h2 className="flex card-title text-xl font-semibold mt-4 justify-center items-center">{product.name.toUpperCase()}</h2>
        <p className="flex justify-center text-black text-xl font-semibold">₹{product.price} per item</p>

        <div className="flex flex-row gap-4 card-actions justify-center mt-4">
          <div className="flex items-center mt-4 border-2">
            <button onClick={decreaseCount} className="px-3 py-1 rounded text-lg">−</button>
            <span className="px-4 py-1 border rounded text-lg">{count}</span>
            <button onClick={increaseCount} className="px-3 py-1 rounded text-lg">+</button>
          </div>

          <button className="bg-green-500 text-white px-2 rounded" onClick={handleCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleCard;
