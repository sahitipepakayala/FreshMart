import React from 'react'
import { useDispatch } from 'react-redux'
import { removeItem } from '../Store/CartSlice';


function Cartcard({item}) {
    const dispatch=useDispatch();
    function handleRemove(item)
    {
        dispatch(removeItem(item))
    }
    
  return (
    <div className='mt-5 flex flex-wrap justify-between items-center'>
        <div className='flex flex-wrap w-1/2 gap-0 items-center'>
            <div className='  w-1/2'>
            <img
          src={item.image}
        className=" w-1/2 h-49 object-fill rounded-md ml-10"
        />
            </div>
            <div className='mt-1 mr-10'>
                <h1 className='text-lg font-medium'>{item.name}</h1>
                <h1 className='text-lg'>Price: {item.price}</h1>
                <h1 className='text-md mt-5'>Quantity:{item.quantity}</h1>
            </div>
        </div>
        <div> <p className='text-lg font-medium'>{item.quantity}*{item.price}</p> <p className='text-lg font-medium'>${item.quantity*item.price}</p>
        <button className='mt-5 bg-gray-200 rounded p-3 hover:bg-red-600 hover:text-white' onClick={()=>handleRemove(item)}>Remove</button></div>
    </div>
  )
}

export default Cartcard