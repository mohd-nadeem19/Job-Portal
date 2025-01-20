// import React, { useEffect, useState } from 'react';
// import Navbar from '../shared/Navbar';
// import { Label } from '../ui/label';
// import { Input } from '../ui/input';
// import { RadioGroup } from '../ui/radio-group';
// import { Button } from '../ui/button';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { USER_API_AND_POINT } from '@/utils/constant';
// import { toast } from 'sonner';
// import { useDispatch, useSelector } from 'react-redux';
// import { setLoading } from '@/redux/authSlice';
// import { Loader2 } from 'lucide-react';

// const Signup = () => {
//   const [input, setInput] = useState({
//     fullname: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     role: "",
//     file: ""
//   });

//   const { loading, user } = useSelector(store => store.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch()

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]:e.target.value });
//   };

//   const changeFileHandler = (e) => {
//     setInput({ ...input, file:e.target.files?.[0] });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("fullname", input.fullname)
//     formData.append("email", input.email)
//     formData.append("phoneNumber", input.phoneNumber)
//     formData.append("password", input.password)
//     formData.append("role", input.role)

//     if (input.file) {
//       formData.append("file", input.file)
//     };

//     try {
//       dispatch(setLoading(true))
//       const res = await axios.post(`${USER_API_AND_POINT}/register`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         },
//         withCredentials: true
//       });
//       if (res.data.success) {
//         navigate("/login");
//         toast.success(res.data.message)
//       }

//     } catch (error) {
//       console.log(error);
//       const errorMessage = error.response?.data?.message || "Something went wrong";
//       toast.error(errorMessage);
//     } finally {
//       dispatch(setLoading(false))
//     }
//   };

//   useEffect(() => {
//    if(user) {
//     navigate("/")
//    }
//   }
//   )

//   return (
//     <div>
//       <Navbar />

//       <div className='flex items-center justify-center max-w-7xl mx-auto'>
//         <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10' enctype="multipart/form-data">
//           <h1 className='font-bold text-xl mb-5'>Sign Up</h1>

//           {/* Personal Information Section */}
//           <div className='mb-4'>
//             <div className='my-2'>
//               <Label>Full Name</Label>
//               <Input
//                 type="text"
//                 value={input.fullname}
//                 name="fullname"
//                 onChange={changeEventHandler}
//                 placeholder="Enter your full name"
//               />
//             </div>
//             <div className='my-2'>
//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 value={input.email}
//                 name="email"
//                 onChange={changeEventHandler}
//                 placeholder="Enter your email address"
//               />
//             </div>
//             <div className='my-2'>
//               <Label>Phone Number</Label>
//               <Input
//                 type="tel"
//                 value={input.phoneNumber}
//                 name="phoneNumber"
//                 onChange={changeEventHandler}
//                 placeholder="Enter your phone number"
//               />
//             </div>
//           </div>

//           {/* Account Details Section */}
//           <div className='mb-4'>
//             <div className='my-2'>
//               <Label>Password</Label>
//               <Input
//                 type="password"
//                 value={input.password}
//                 name="password"
//                 onChange={changeEventHandler}
//                 placeholder="Create a password"
//               />
//             </div>
//             <div className='flex items-center justify-between my-4'>
//               <RadioGroup className='flex items-center gap-4'>
//                 <div className="flex items-center space-x-2">
//                   <Input
//                     type="radio"
//                     id="r1"
//                     name="role"
//                     value="student"
//                     checked={input.role === "student"}
//                     onChange={changeEventHandler}
//                     className="cursor-pointer"
//                   />
//                   <Label htmlFor="r1" className="cursor-pointer">Student</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Input
//                     type="radio"
//                     id="r2"
//                     name="role"
//                     value="recruiter"
//                     checked={input.role === "recruiter"}
//                     onChange={changeEventHandler}
//                     className="cursor-pointer"
//                   />
//                   <Label htmlFor="r2" className="cursor-pointer">Recruiter</Label>
//                 </div>
//               </RadioGroup>
//               <div className='flex items-center gap-2'>
//                 <Label>Profile</Label>
//                 <Input
//                   accept="image/*"
//                   type="file"
//                   //  यह नाम बैकएंड के multer मिडलवेयर के साथ मेल खाना चाहिए
//                   name="file"
//                   onChange={changeFileHandler}
//                   className="cursor-pointer"
//                 />

//               </div>
//             </div>
//           </div>

//           {
//             loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 animate-spin' />Signup</Button> : <Button type="submit" className="w-full my-4">Please wait</Button>

//           }
//           <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_AND_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2, Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });
  const [showPassword, setShowPassword] = useState(false); //

  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_AND_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10' enctype="multipart/form-data">
          <h1 className='font-bold text-xl mb-5'>Sign Up</h1>

          <div className='mb-4'>
            <div className='my-2'>
              <Label>Full Name</Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="Enter your full name"
              />
            </div>
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
            <div className='my-2'>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className='mb-4'>
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
            <div className='flex items-center justify-between my-4'>
              <RadioGroup className='flex items-center gap-4'>
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
              <div className='flex items-center gap-2'>
                <Label>Profile</Label>
                <Input
                  accept="image/*"
                  type="file"
                  name="file"
                  onChange={changeFileHandler}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className='mr-2 h-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
              Signup
            </Button>
          )}
          <span className='text-sm'>
            Already have an account? <Link to="/login" className='text-blue-600'>Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;

