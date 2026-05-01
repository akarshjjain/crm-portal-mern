// import React, { useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';


// const AddSeller = () => {
//    const [seller, setSeller] = useState({
//   name: '',
//   company: '',
//   email: '',
//   phone: '',
//   description: '',
// });
      

//     const navigate = useNavigate();

// const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSeller({
//         ...seller,
//         [name]: value })
//     }

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await axios.post(
//       "http://localhost:3000/api/seller/add",
//       seller,
//       {
//         headers: {
//           "Authorization": `Bearer ${localStorage.getItem('token')}`
//         }
//       }
//     );
//     if (response.data.success) {
//       navigate('/admin-dashboard/sellers');
//     }

//   } catch (error) {
//     if (error.response && !error.response.data.success) {
//       alert(error.response.data.message);
//     }
//   }
// };

    

//   return (
//     <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96" >
//         <h2 className="text-2xl font-bold mb-6" >Add Sellers</h2>
//         <form onSubmit={handleSubmit} >
//             <div>
//                 <label htmlFor="name" className="text-sm font-medium text-gray-700" >seller Name</label>
//                 <input 
//                 type ="text" 
//                 name= "name" 
//                 onChange={handleChange}
//                 placeholder="seller Name"     
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md" 
//                 required
                
//                  />
//             </div>
//             <div>
//                 <label htmlFor="company" className="text-sm font-medium text-gray-700" >Company</label>
//                 <input 
//                 type ="text" 
//                 name= "company" 
//                 onChange={handleChange}
//                 placeholder="Comapny Name" 
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md" 
//                 required
                
//                  />
//             </div>
//             <div>
//                 <label htmlFor="email" className="text-sm font-medium text-gray-700" >Email</label>
//                 <input 
//                 type ="email" 
//                 name= "email" 
//                 onChange={handleChange}
//                 placeholder="Email" 
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md" 
//                 required
                
//                  />
//             </div>
//             <div>
//                 <label htmlFor="phone" className="text-sm font-medium text-gray-700" >Phone</label>
//                 <input 
//                 type ="tel" 
//                 name= "phone" 
//                 onChange={handleChange}
//                 placeholder="Phone" 
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md" 
//                 required
                
//                  />
//             </div>
//             <div className="mt-3" > 
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-700" >Description</label>
//                 <textarea 
//                 name= "description" 
//                 placeholder="Description" 
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
//                 rows="4" >    
//                 </textarea>
//             </div>
//             <button type="submit" className="w-full mt-6 bg-[#1520A6] hover:bg-[#051094] text-white font-bold py-2 px-4 rounded" >Add seller</button>
//         </form>
//       </div>
//   )
// }

// export default AddSeller

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSeller = () => {
  const [seller, setSeller] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeller({
      ...seller,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/seller/add",
        seller,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (response.data.success) {
        navigate('/admin-dashboard/sellers');
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Add New Seller</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Seller Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Seller Name"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
          <input
            type="text"
            name="company"
            onChange={handleChange}
            placeholder="Company Name"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            onChange={handleChange}
            placeholder="Phone"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5 px-4 rounded-md transition duration-200"
        >
          Add Seller
        </button>
      </form>
    </div>
  );
};

export default AddSeller;
