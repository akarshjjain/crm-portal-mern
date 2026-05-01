// import React, { useEffect, useState } from 'react';
// import { Navigate, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// const EditSeller = () => {
//   const { id } = useParams();
//   const [seller, setSeller] = useState({});
//   const [depLoading, setDepLoading] = useState(false);
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchSellers = async () => {
//       setDepLoading(true);
//       try {
//         const response = await axios.get(`http://localhost:3000/api/seller/${id}`, {
//           headers: {
//             "Authorization": `Bearer ${localStorage.getItem('token')}`
//           }
//         });

//         if (response.data.success) {
//           setSeller(response.data.seller);
//         }
//       } catch (error) {
//         if (error.response && !error.response.data.success) {
//           alert(error.response.data.error);
//         }
//       } finally {
//         setDepLoading(false);
//       }
//     };

//     fetchSellers();
//   }, [id]);

//   const handleChange = (e) => {
//     setSeller({ ...seller, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`http://localhost:3000/api/seller/${id}`, seller, {
//         headers: {
//           "Authorization": `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       if (response.data.success) {
//         navigate("/admin-dashboard/sellers");
//       }
//     } catch (error) {
//       if(error.response && !error.response.data.success ){
//         alert(error.response.data.error)
//       }
      
//     }
//   };

  

//   return (
//     <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
//       {depLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           <h2 className="text-2xl font-bold mb-6">Edit seller</h2>
//           <form onSubmit={handleSubmit} >
//             <div>
//               <label htmlFor="name" className="text-sm font-medium text-gray-700">seller Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 onChange={handleChange}
//                 value={seller.name}
//                 placeholder="seller Name"
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//             <div className="mt-3">
//               <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
//               <input
//                 name="company"
//                 placeholder="Company"
//                 onChange={handleChange}
//                 value={seller.company}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                 rows="4"
//               /> </div>
//                <div className="mt-3">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Description</label>
//               <input
//               type='email'
//                 name="email"
//                 placeholder="Email"
//                 onChange={handleChange}
//                 value={seller.email}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                 rows="4"
//               /> </div>
//                <div className="mt-3">
//               <label htmlFor="company" className="block text-sm font-medium text-gray-700">Description</label>
//               <input
//                 name="phone"
//                 type='tel'
//                 placeholder="Phone"
//                 onChange={handleChange}
//                 value={seller.phone}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                 rows="4"
//               /> </div>
//                <div className="mt-3">
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 onChange={handleChange}
//                 value={seller.description}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                 rows="4"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full mt-6 bg-[#1520A6] hover:bg-[#051094] text-white font-bold py-2 px-4 rounded"
//             >
//               Edit seller
//             </button>
//           </form>
//         </>
//       )}
//     </div>
//   );
// };

// export default EditSeller;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditSeller = () => {
  const { id } = useParams();
  const [seller, setSeller] = useState({});
  const [depLoading, setDepLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellers = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/seller/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          setSeller(response.data.seller);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchSellers();
  }, [id]);

  const handleChange = (e) => {
    setSeller({ ...seller, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/seller/${id}`, seller, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        navigate('/admin-dashboard/sellers');
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 px-6 py-8 bg-white rounded-2xl shadow-xl transition-all duration-300 ease-in-out">
      {depLoading ? (
        <div className="text-center text-lg font-semibold">Loading...</div>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Edit Seller</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Seller Name
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={seller.name || ''}
                placeholder="Seller Name"
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                required
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                name="company"
                placeholder="Company"
                onChange={handleChange}
                value={seller.company || ''}
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={seller.email || ''}
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="Phone"
                onChange={handleChange}
                value={seller.phone || ''}
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Description"
                onChange={handleChange}
                value={seller.description || ''}
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition resize-none"
                rows="4"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1520A6] hover:bg-[#051094] text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Update Seller
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditSeller;
