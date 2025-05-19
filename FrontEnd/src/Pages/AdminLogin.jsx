import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { addUser } from '../Store/userSlice';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate, Link }  from 'react-router-dom';

function AdminLogin() {
  const [emailId, setemail] = useState("sahitipeakayala90@gmail.com");
  const [password, setpassword] = useState("sahitI@149");
  const dispatch = useDispatch();
  const navigate=useNavigate();

  async function handleLogin(e) {
    e.preventDefault(); // prevent form default reload
    try {
      const res = await axios.post(`https://freshmart-backend-l2vk.onrender.com/admin/login`, { emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data));
        navigate("/")
    } catch (error) {
      swal("Login Failed", "Invalid Credentials" || "Something went wrong", "error");
    }
  }

  return (
    <div className="flex flex-row m-8 gap-10 items-center justify-center">
      {/* Image Section */}
      
      <div className=" items-center">
        <img
          src="https://c8.alamy.com/comp/WW2JEW/fruits-collection-food-background-portrait-format-apples-oranges-lemons-fresh-fruit-backgrounds-WW2JEW.jpg"
          alt="Fruits"
          className="h-[500px] w-[400px] rounded-md object-cover"
        />
      </div>

      {/* Form Section */} 
      <div className="flex-2/3 max-w-md justify-items-start mr-30">
      <div> <h1 className='text-4xl'>Admin Login</h1></div>
     
        <form onSubmit={handleLogin} className="flex flex-col  justify-items-start gap-4 p-6 rounded shadow">
       
          <fieldset>
            <legend className="text-xl font-semibold mb-2">Email ID</legend>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setemail(e.target.value)}
              className="input input-bordered w-full p-3 text-lg"
            />
          </fieldset>

          <fieldset>
            <legend className="text-xl font-semibold mb-2">Password</legend>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="input input-bordered w-full p-3 text-md"
            />
          </fieldset>

          <button type="submit" className="bg-green-500 p-3 m-2 rounded-md text-xl font-semibold">Submit</button>
         
         

        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
