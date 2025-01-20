import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'  // useNavigate hook import karein
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_AND_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

const Login = () => {

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false); //

  const { loading, user } = useSelector(store => store.auth)
  const navigate = useNavigate();
  // useNavigate hook ka istemal karein
  const dispatch = useDispatch();  // Correct usage

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {// password ko show karna k liye
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_AND_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/");  // useNavigate ke through programmatically navigation karein
        toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false))
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  })

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>

          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email address"
            />
          </div>

          <div className='my-2 relative'>
            <Label>Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />
            <span onClick={togglePasswordVisibility} className="absolute right-3 top-8 cursor-pointer">
              {showPassword ? <Eye /> : <EyeOff />}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="r1"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1" className="cursor-pointer">Student</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="r2"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2" className="cursor-pointer">Recruiter</Label>
              </div>
            </RadioGroup>

          </div>
          <Button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-4 animate-spin" /> : 'Login'}
          </Button>
          <span className='text-sm '>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login