import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import cartReducer from './CartSlice'

const userStore=configureStore({
    reducer:{
        user:userReducer,
        cart:cartReducer
    }
})
export default userStore;