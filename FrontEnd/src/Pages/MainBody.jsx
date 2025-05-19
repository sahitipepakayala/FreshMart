import { useEffect, useState } from "react";
import axios from "axios";
import SingleCard from "./SingleCard";

function MainBody(){
    const [products,setProducts]=useState([]);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/product/allProducts`)
          .then(res => setProducts(res.data))
          .catch(error => console.log(error));
      }, []);
      
    return (
      <div>
        <h1 className="text-2xl text-green-950 mt-5 mx-9">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 mx-9 ">
          {products.length>=1?products.map(product1 => (
            <SingleCard  key={product1._id} product={product1}/>
          )):<h1>No products try after some time</h1>}
        </div>
        </div>
      );
}

export default MainBody;