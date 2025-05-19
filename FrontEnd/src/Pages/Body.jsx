import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

function Body(){
    return (
        < div className="bg-green-300">
        <Navbar/>
        <Outlet />
       
        <Footer/>
        </div >
    )
}


export default Body;