import { createSlice } from "@reduxjs/toolkit";


const CartSlice=createSlice({
    name:"cart",
    initialState:{
        items:[]
    },
    reducers:{
        addItem:(state,action)=>{
            const newItem=action.payload;
            const existing=state.items.find((item)=>item._id===newItem._id);
            if(existing)
            {
                existing.quantity+=newItem.quantity;
            }
            else{
            state.items.push(action.payload);
            }
        },
        removeItem:(state,action)=>{
            state.items=state.items.filter((item)=>item._id!==action.payload._id);
        },
        clearCart:(state,action)=>{
            state.items=[]
        }
    }
})


export const {addItem,removeItem,clearCart}=CartSlice.actions;
export default CartSlice.reducer