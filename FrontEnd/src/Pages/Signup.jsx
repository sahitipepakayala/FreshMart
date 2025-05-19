import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../Store/userSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Signup() {
  const [emailId, setemail] = useState("abc123@gmail.com");
  const [password, setpassword] = useState("abc@123");
  const [name,setName]=useState("abcd");
  const [number,setNumber]=useState("9999999999");
  const dispatch = useDispatch();
  const navigate=useNavigate();
  async function handleLogin(e) {
    e.preventDefault(); // prevent form default reload
    try {
      const res = await axios.post(`https://freshmart-backend-l2vk.onrender.com/user/signup`, {name,emailId, password,number}, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate("/")
    } catch (error) {
     
      swal("Signup Failed", "userExists" || "Something went wrong", "error");
    }
  }

  return (
    <div className="flex flex-row m-8 gap-10 items-center justify-center">
      {/* Image Section */}
      
      <div className=" flex-1justify-end items-center">
        <img
          src="https://c8.alamy.com/comp/WW2JEW/fruits-collection-food-background-portrait-format-apples-oranges-lemons-fresh-fruit-backgrounds-WW2JEW.jpg"
          alt="Fruits"
          className="h-[700px] w-[500px] rounded-md object-cover"
        />
      </div>

      {/* Form Section */} 
      <div className="flex-2/3 max-w-md justify-items-start mr-30">
      <div> <h1 className='text-4xl'>Please SignUp here !</h1></div>
     
        <form onSubmit={handleLogin} className="flex flex-col  justify-items-start gap-4 p-6 rounded shadow">
        <fieldset>
            <legend className="text-xl font-semibold mb-2">Name</legend>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full p-3"
            />
          </fieldset>

       
          <fieldset>
            <legend className="text-xl font-semibold mb-2">Email ID</legend>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setemail(e.target.value)}
              className="input input-bordered w-full p-3"
            />
          </fieldset>

          <fieldset>
            <legend className="text-xl font-semibold mb-2">Password</legend>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="input input-bordered w-full p-3"
            />
          </fieldset>
          <fieldset>
            <legend className="text-xl font-semibold mb-2">Number</legend>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="input input-bordered w-full p-3"
            />
          </fieldset>
          <button type="submit" className="bg-green-500 p-3 m-2 rounded-md text-xl font-semibold">Submit</button>
          <h1 className='text-lg'> Have an Account? <u><Link to="/login">Log In</Link></u></h1>
          <h1 className='text-lg'>Are you an Admin? <u><Link to="/adminLogin">Log In</Link></u></h1>

        </form>
      </div>
    </div>
  );
}

export default Signup;
