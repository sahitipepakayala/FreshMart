import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

function Manage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get(`https://freshmart-backend-l2vk.onrender.com/product/allProducts`)
      .then(res => setProducts(res.data))
      .catch(error => console.error(error));
  };

  const handleDelete = (productId) => {
    swal({
      title: "Are you sure?",
      text: "Product will be deleted permanently!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`https://freshmart-backend-l2vk.onrender.com/product/${productId}/delete`)
          .then(() => {
            swal("Product deleted!", { icon: "success" });
            fetchProducts(); // Refresh the list
          })
          .catch(() => swal("Error deleting product", { icon: "error" }));
      }
    });
  };

 
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <div>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Edit</th>
            <th className="border px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
  {products.length !== 0 ? (
    products.map((prod) => (
      <tr key={prod._id} className="text-center border hover:bg-gray-100">
        <td className="border px-4 py-2">{prod.name}</td>
        <td className="border px-4 py-2">₹{prod.price}</td>
        <td className="border px-4 py-2">
          <Link className="flex justify-center text-blue-500 hover:text-blue-700" to={`/edit/${prod._id}`}>
            <FaEdit />
          </Link>
        </td>
        <td className="border px-4 py-2">
          <button onClick={() => handleDelete(prod._id)} className="text-red-500 hover:text-red-700">
            <FaTrash />
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td className="border px-4 py-2 text-center text-xl font-semibold" colSpan="4">
        No products available
      </td>
    </tr>
  )}
</tbody>


      </table></div>
      <Link to="/newProduct" className='mt-30 border-2 black shadow-2xl p-2 text-lg font-semibold'>Add New Product</Link>
    </div>
  );
}

export default Manage;
