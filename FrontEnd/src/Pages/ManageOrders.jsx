import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
   fetchOrders();
  }, []);

  const fetchOrders= ()=>{axios.get(`https://freshmart-backend-l2vk.onrender.com/order/allOrders`)
  .then(res => setOrders(res.data))
  .catch(err => console.log("Error fetching orders:", err));}
  const handleStatus=async(id,status)=>{
    try{
        await axios.put(`https://freshmart-backend-l2vk.onrender.com/order/${id}/status`,{status},{withCredentials:true});
        fetchOrders();

    }
    catch(error)
    {
        console.log(error);
    }
  }

  return (
    <div className="p-4">
      {orders.length > 0 ? (
        <table className="w-full table-auto border-collapse border border-black">
          <thead>
            <tr className="bg-green-400 text-white">
              <th className="p-4 border">Order details</th>
              <th className="p-4 border">Status</th>
              <th className="p-4 border">Next Step</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center hover:bg-gray-100">
                <td className="border py-4">
                  <div className="space-y-1">
                    <h1>{order.buyerName}</h1>
                    <h1>Price: ${order.price}</h1>
                    <h1>{order.number}</h1>
                    <h1>{order.address}</h1>
                  </div>
                </td>
                <td className="border py-4">{order.status}</td>
                <td className="border py-4 space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={()=>handleStatus(order._id,"Shipped")}>Shipped</button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={()=>handleStatus(order._id,"Delivered")}>Delivered</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={()=>handleStatus(order._id,"Cancelled")}>Cancelled</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="text-xl text-center">No Orders</h1>
      )}
    </div>
  );
}

export default ManageOrders;
