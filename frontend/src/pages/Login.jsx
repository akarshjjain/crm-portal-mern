// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/authContext'; // Import the useAuth hook



// const Login = () => {
//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [error, setError] = React.useState(null);
//   const navigate = useNavigate();
//   const {login}= useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });

//       if (response.data.success) {
//         login(response.data.user); // Store user data in context
//         localStorage.setItem("token", response.data.token); // Store token
//         alert("Successfully Logged In");


//         if(response.data.user.role === "admin") {
//           navigate("/admin-dashboard"); // Redirect to admin dashboard
//         } else {
//           navigate("/employee-dashboard"); // Redirect to user dashboard
//         }

//       }
//     } catch (error) {
//       if (error.response && error.response.data && !error.response.data.success) {
//         setError(error.response.data.error);
//       } else {
//         setError("Server Error");
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-[#2832C2] from-50% to-gray-100 to-50% space-y-6">
//       <h2 className="font-bold text-3xl text-white">CRM PORTAL</h2>
//       <div className="border shadow p-6 w-80 bg-white rounded-lg">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//        {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-gray-700">Email</label>
//             <input
//               id="email"
//               type="email"
//               className="w-full px-3 py-2 border rounded"
//               required
//               placeholder="Enter Email"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-gray-700">Password</label>
//             <input
//               id="password"
//               type="password"
//               required
//               className="w-full px-3 py-2 border rounded"
//               placeholder="Enter Password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="flex items-center justify-between text-sm">
//             <label className="inline-flex items-center">
//               <input type="checkbox" className="form-checkbox" />
//               <span className="ml-2 text-gray-700">Remember me</span>
//             </label>
//             <a href="#" className="text-[#2832C2]">Forgot Password?</a>
//           </div>
//           <button type="submit" className="w-full bg-[#2832C2] text-white py-2 rounded">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/authContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });

//       if (response.data.success) {
//         login(response.data.user);
//         localStorage.setItem("token", response.data.token);
//         alert("Successfully Logged In");

//         if (response.data.user.role === "admin") {
//           navigate("/admin-dashboard");
//         } else {
//           navigate("/employee-dashboard");
//         }
//       }
//     } catch (error) {
//       if (error.response && error.response.data && !error.response.data.success) {
//         setError(error.response.data.error);
//       } else {
//         setError("Server Error");
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-cyan-500 to-white px-4">
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md transition-all duration-300 hover:shadow-2xl">
//         <h2 className="text-center text-4xl font-extrabold text-blue-700 mb-6 tracking-wide">CRM PORTAL</h2>
//         <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Login to your account</h3>

//         {error && <p className="text-red-600 bg-red-100 px-4 py-2 rounded mb-4 text-sm">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
//             <input
//               id="email"
//               type="email"
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
//               placeholder="Enter your email"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
//             <input
//               id="password"
//               type="password"
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
//               placeholder="Enter your password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <label className="flex items-center space-x-2 text-gray-600">
//               <input type="checkbox" className="form-checkbox accent-cyan-600" />
//               <span>Remember me</span>
//             </label>
//             <a href="#" className="text-cyan-700 hover:underline">Forgot Password?</a>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2.5 rounded-lg font-semibold transition-colors"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });

      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        // alert("Successfully Logged In");

        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-100">
      
      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-center items-center bg-blue-900 text-white px-10">
        <h1 className="text-5xl font-extrabold tracking-widest mb-4">CRM PORTAL</h1>
        <p className="text-lg font-medium text-center max-w-sm">
          Streamline your customer management with ease and efficiency.
        </p>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-2 tracking-wide">Welcome</h2>
          <p className="text-sm text-gray-500 text-center mb-6">Please login to your account</p>

          {error && (
            <p className="text-red-600 bg-red-100 px-4 py-2 rounded mb-4 text-sm text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-600">
                <input type="checkbox" className="form-checkbox accent-blue-700" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-blue-700 hover:underline font-medium">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2.5 rounded-lg font-bold tracking-wide transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
