// import React from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import axios from 'axios';

// export const columns = [
//   { name: 'S.No', selector: row => row.sno, sortable: true, width: '80px' },
//   { name: 'Name', selector: row => row.name, sortable: true },
//   { name: 'Company', selector: row => row.company, sortable: true },
//   { name: 'Email', selector: row => row.email },
//   { name: 'Phone', selector: row => row.phone },
//   { name: 'Description', selector: row => row.description },
//   { name: 'Actions', cell: row => row.action },
// ];  

// export const SellerButtons = ({ Id, onSellerDelete}) => {
//   const navigate = useNavigate();

//   const handleDelete = async (id) => {
//     const confirm = window.confirm("Are you confirm?"); 
//     if (confirm) {
//       try {
//         const response = await axios.delete(`http://localhost:3000/api/seller/${id}`, {
//           headers: {
//             "Authorization": `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         if (response.data.success) {
//           onSellerDelete(id);
//         }
//       } catch (error) {
//         if (error.response && !error.response.data.success) {
//           alert(error.response.data.error);
//         }
//       }
//     }
//   };

//   return (
//     <div className="flex space-x-3">
//       <button
//         className="px-3 py-1 bg-teal-600 text-white"
//         onClick={() => navigate(`/admin-dashboard/seller/${Id}`)}
//       >
//         Edit
//       </button>
//       <button
//         className="px-3 py-1 bg-red-600 text-white"
//         onClick={() => handleDelete(Id)}
//       >
//         Delete
//       </button>
//     </div>
//   );
// };

import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

// Enhanced table columns (unchanged structure)
export const columns = [
  { name: 'S.No', selector: row => row.sno, sortable: true, width: '80px' },
  { name: 'Name', selector: row => row.name, sortable: true },
  { name: 'Company', selector: row => row.company, sortable: true },
  { name: 'Email', selector: row => row.email },
  { name: 'Phone', selector: row => row.phone },
  { name: 'Description', selector: row => row.description },
  { name: 'Actions', cell: row => row.action },
];  

// Enhanced CSS styles only
export const SellerButtons = ({ Id, onSellerDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you confirm?"); 
    if (confirm) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/seller/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          onSellerDelete(id);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        className="px-4 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow transition duration-200"
        onClick={() => navigate(`/admin-dashboard/seller/${Id}`)}
      >
        Edit
      </button>
      <button
        className="px-4 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-medium shadow transition duration-200"
        onClick={() => handleDelete(Id)}
      >
        Delete
      </button>
    </div>
  );
};
