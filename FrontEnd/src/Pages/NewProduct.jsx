import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewProduct() {
    const [name,setName]=useState('abc');
    const [price,setPrice]=useState('20');
    const [image,setImage]=useState('');
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.post(`${import.meta.env.VITE_API_URL}/product/newProduct`,{name,price,image},{withCredentials:true})
            .then(()=>{
                swal("Success", "Product updated successfully!", "success");
                navigate("/manage")})
            .catch(error=>{
                console.log(error);
                alert("error")
            })
        
        
    }
    catch(error)
    {
        console.log("error in new product")
    }
}
  return (
    <div> 
        <form className="flex flex-col  justify-center items-center gap-3 bg-green-300 p-5" onSubmit={handleSubmit}>  
            <h1 className='text-xl font-semibold'>Add New Product</h1>
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1 text-lg font-semibold">Name</legend>
      <input
        type="text"
        className="border p-2 rounded-md"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </fieldset>

    <fieldset className="flex flex-col">
      <legend className="mb-1 font-semibold text-lg">Price</legend>
      <input
        type="number"
        className="border p-2 rounded-md"
        placeholder="Enter Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
    </fieldset>

    <fieldset className="flex flex-col">
      <legend className="mb-1 font-semibold">Image URL</legend>
      <input
        type="text"
        className="border p-2 rounded-md"
        placeholder="Enter Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
    </fieldset>

    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-5">
      Submit
    </button>
  </form>
       </div>
  )
}

export default NewProduct