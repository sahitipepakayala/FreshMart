import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Edit() {
    const {id}=useParams();
    const [product,setProduct]=useState({});
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/product/${id}`)
        .then(res=>{setProduct(res.data);
            setName(res.data.name);
            setPrice(res.data.price);
            setImage(res.data.image)
        })
        .catch(error=>console.log(error));
    },[])
   
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.put(`${import.meta.env.VITE_API_URL}/product/${id}/edit`,{name,price,image},{withCredentials:true})
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
            console.log(error);
        }
    }
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [image,setImage]=useState('');
  return (
    <div> <form className="flex flex-col  justify-center items-center gap-3 bg-green-300 p-5" onSubmit={handleSubmit}>  
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

export default Edit