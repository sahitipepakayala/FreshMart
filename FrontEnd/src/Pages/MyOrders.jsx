import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MyOrders() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, [id]); // run only when `id` changes
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`https://freshmart-frontend-mxo4.onrender.com/order/myOrders/${id}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };
  const handleCancel=async(id,status)=>{
    try{
      await axios.put(`https://freshmart-frontend-mxo4.onrender.com/order/${id}/status`,{status},{withCredentials:true});
        fetchOrders();

    }
    catch(error)
    {
      console.log(error);
    }

  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length > 0 ? (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="flex flex-row justify-center  items-center border p-4 rounded shadow-md w-1/2 ml-10">
              <div>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Price:</strong> ${order.price}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Contact Number:</strong> {order.number}</p>
              <button className='bg-red-400 rounded-md p-3 mt-3 border-2 red font-semibold hover:cursor-pointer' onClick={()=>handleCancel(order._id,"Cancelled")}>Cancel The Order</button>
              </div>
              <div><button className='bg-green-400 border-2 black p-3 rounded-md ml-10'>{order.status}</button></div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default MyOrders;
