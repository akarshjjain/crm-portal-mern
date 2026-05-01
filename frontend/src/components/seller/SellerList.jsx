// // import React, { useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import DataTable from 'react-data-table-component';
// // import { columns, SellerButtons } from "../../utils/SellerHelper.jsx"; 
// // import axios from 'axios';


// // const SellerList = () => {
// //   const [sellers, setSellers] = useState([]);
// //   const [deploading, setDepLoading] = useState(false);
// //   const [filteredSellers, setFilteredSellers] = useState([])

// //   const onSellerDelete = async (id)=> {
// //       const data = sellers.filter(seller=> seller._id !== id)
// //       setSellers(data)
// //   }

// //   useEffect(() => {
// //     const fetchSellers = async () => {
// //       setDepLoading(true);
// //       try {
// //         const response = await axios.get("http://localhost:3000/api/seller", {
// //           headers: {
// //             "Authorization": `Bearer ${localStorage.getItem('token')}`
// //           }
// //         });

// //         if (response.data.success) {
// //          let sno = 1;
// //         const data = response.data.sellers.map(seller => ({
// //           _id: seller._id,
// //           sno: sno++,
// //           name: seller.name,
// //           company: seller.company,
// //           email: seller.email,  
// //           phone: seller.phone,
// //           description: seller.description,
// //           action: (<SellerButtons Id={seller._id} onSellerDelete={onSellerDelete} />),
// //         }));

// //           setSellers(data);
// //           setFilteredSellers(data);
// //         }
// //       } catch (error) {
// //         if (error.response && !error.response.data.success) {
// //           alert(error.response.data.error);
// //         }
// //       } finally {
// //         setDepLoading(false);
// //       }
// //     };

// //     fetchSellers();
// //   }, []);


// //   const filterSellers =(e) =>{
// //     const records= sellers.filter((seller)=>
// //     seller.name.toLowerCase().includes(e.target.value.toLowerCase()))
// //     setFilteredSellers(records)
// //   }

// //   return (
// //     <>
// //       {deploading ? (
// //         <div>Loading...</div>
// //       ) : (
// //         <div className="p-5">
// //           <div className="text-center">
// //             <h3 className="text-2xl font-bold">Manage Sellers</h3>
// //           </div>
// //           <div className="flex justify-between items-center">
// //             <input
// //               type="text"
// //               placeholder="Search By seller Name"
// //               className="px-4 py-0.5 bg-white border"
// //               onChange= {filterSellers}
// //             />
// //             <Link
// //               to="/admin-dashboard/add-seller"
// //               className="px-4 py-1 bg-[#1520A6] rounded text-white"
// //             >
// //               Add New seller
// //             </Link>
// //           </div>
// //           <div className='mt-5' >
// //             <DataTable columns={columns} data={filteredSellers} pagination />
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default SellerList;

// // import React, { useEffect, useState } from 'react'; 
// // import { Link } from 'react-router-dom';
// // import DataTable from 'react-data-table-component';
// // import { columns, SellerButtons } from "../../utils/SellerHelper.jsx"; 
// // import axios from 'axios';

// // const SellerList = () => {
// //   const [sellers, setSellers] = useState([]);
// //   const [deploading, setDepLoading] = useState(false);
// //   const [filteredSellers, setFilteredSellers] = useState([]);

// //   const onSellerDelete = async (id) => {
// //     const data = sellers.filter(seller => seller._id !== id);
// //     setSellers(data);
// //   };

// //   useEffect(() => {
// //     const fetchSellers = async () => {
// //       setDepLoading(true);
// //       try {
// //         const response = await axios.get("http://localhost:3000/api/seller", {
// //           headers: {
// //             "Authorization": `Bearer ${localStorage.getItem('token')}`
// //           }
// //         });

// //         if (response.data.success) {
// //           let sno = 1;
// //           const data = response.data.sellers.map(seller => ({
// //             _id: seller._id,
// //             sno: sno++,
// //             name: seller.name,
// //             company: seller.company,
// //             email: seller.email,  
// //             phone: seller.phone,
// //             description: seller.description,
// //             action: (<SellerButtons Id={seller._id} onSellerDelete={onSellerDelete} />),
// //           }));

// //           setSellers(data);
// //           setFilteredSellers(data);
// //         }
// //       } catch (error) {
// //         if (error.response && !error.response.data.success) {
// //           alert(error.response.data.error);
// //         }
// //       } finally {
// //         setDepLoading(false);
// //       }
// //     };

// //     fetchSellers();
// //   }, []);

// //   const filterSellers = (e) => {
// //     const records = sellers.filter((seller) =>
// //       seller.name.toLowerCase().includes(e.target.value.toLowerCase())
// //     );
// //     setFilteredSellers(records);
// //   };

// //   return (
// //     <>
// //       {deploading ? (
// //         <div className="text-center text-gray-600 mt-10">Loading...</div>
// //       ) : (
// //         <div className="p-6 bg-gray-50 min-h-screen">
// //           <div className="text-center mb-6">
// //             <h3 className="text-3xl font-semibold text-gray-800">Manage Sellers</h3>
// //           </div>
// //           <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
// //             <input
// //               type="text"
// //               placeholder="Search by seller name"
// //               className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
// //               onChange={filterSellers}
// //             />
// //             <Link
// //               to="/admin-dashboard/add-seller"
// //               className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md shadow-sm transition duration-200"
// //             >
// //               Add New Seller
// //             </Link>
// //           </div>
// //           <div className="bg-white p-4 rounded-md shadow">
// //             <DataTable
// //               columns={columns}
// //               data={filteredSellers}
// //               pagination
// //               highlightOnHover
// //               striped
// //               responsive
// //             />
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default SellerList;

// // import React, { useState } from 'react';
// // import { Plus, Filter } from 'lucide-react';

// // // Sample dummy sellers data (replace with your actual data source)
// // const dummySellers = [
// //   {
// //     id: 1,
// //     contactName: 'Akarsh Jain',
// //     accountName: 'OpenAI Inc.',
// //     email: 'akarsh@example.com',
// //     phone: '9876543210',
// //     contactOwner: 'James Smith',
// //   },
// //   {
// //     id: 2,
// //     contactName: 'Neha Verma',
// //     accountName: 'Google LLC',
// //     email: 'neha.verma@gmail.com',
// //     phone: '9123456780',
// //     contactOwner: 'Riya Patel',
// //   },
// //   // Add more sample sellers as needed
// // ];

// // const SellerList = () => {
// //   const [sellers, setSellers] = useState(dummySellers);
// //   const [selectedSellers, setSelectedSellers] = useState([]);
// //   const [showFilters, setShowFilters] = useState(false);
// //   const [showCreateForm, setShowCreateForm] = useState(false);

// //   const toggleSellerSelection = (sellerId) => {
// //     setSelectedSellers((prev) =>
// //       prev.includes(sellerId) ? prev.filter((id) => id !== sellerId) : [...prev, sellerId]
// //     );
// //   };

// //   const selectAllSellers = () => {
// //     if (selectedSellers.length === sellers.length) {
// //       setSelectedSellers([]);
// //     } else {
// //       setSelectedSellers(sellers.map((seller) => seller.id));
// //     }
// //   };

// //   // Placeholder components
// //   const FilterPanel = () => (
// //     <div className="bg-gray-100 p-4 rounded mb-4">
// //       <p className="text-sm text-gray-700">Filter options will appear here.</p>
// //     </div>
// //   );

// //   const CreateSellerModal = () => (
// //     <div className="bg-white border border-gray-200 p-6 rounded shadow mb-4">
// //       <p className="text-sm text-gray-700">Create seller form goes here.</p>
// //     </div>
// //   );

// //   return (
// //     <div className="p-6">
// //       {/* Header Section */}
// //       <div className="flex items-center justify-between mb-6">
// //         <h1 className="text-2xl font-bold text-gray-800">Sellers</h1>
// //         <div className="flex gap-2">
// //           <button
// //             onClick={() => setShowCreateForm(!showCreateForm)}
// //             className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
// //           >
// //             <Plus size={16} />
// //             Create
// //           </button>
// //           <button
// //             onClick={() => setShowFilters(!showFilters)}
// //             className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm"
// //           >
// //             <Filter size={16} />
// //             Filter
// //           </button>
// //         </div>
// //       </div>

// //       {/* Filters and Create Form */}
// //       {showFilters && <FilterPanel />}
// //       {showCreateForm && <CreateSellerModal />}

// //       {/* Sellers Table */}
// //       <div className="bg-white rounded shadow p-4 overflow-auto">
// //         <table className="min-w-full text-sm text-left">
// //           <thead>
// //             <tr className="bg-gray-100 text-gray-700">
// //               <th className="p-2">
// //                 <input
// //                   type="checkbox"
// //                   checked={selectedSellers.length === sellers.length}
// //                   onChange={selectAllSellers}
// //                 />
// //               </th>
// //               <th className="p-2">Contact Name</th>
// //               <th className="p-2">Account Name</th>
// //               <th className="p-2">Email</th>
// //               <th className="p-2">Phone</th>
// //               <th className="p-2">Contact Owner</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {sellers.map((seller) => (
// //               <tr key={seller.id} className="hover:bg-gray-50 border-b">
// //                 <td className="p-2">
// //                   <input
// //                     type="checkbox"
// //                     checked={selectedSellers.includes(seller.id)}
// //                     onChange={() => toggleSellerSelection(seller.id)}
// //                   />
// //                 </td>
// //                 <td className="p-2 font-medium text-gray-900">{seller.contactName}</td>
// //                 <td className="p-2 text-gray-700">{seller.accountName}</td>
// //                 <td className="p-2 text-gray-700">{seller.email}</td>
// //                 <td className="p-2 text-gray-700">{seller.phone}</td>
// //                 <td className="p-2 text-gray-700">{seller.contactOwner}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SellerList;

// import React, { useState } from 'react';
// import { 
//   Filter, 
//   ChevronDown, 
//   ChevronLeft, 
//   ChevronRight,
//   BarChart3,
//   X,
//   Search,
//   Plus
// } from 'lucide-react';

// const SellerList = () => {
//   const [sellers, setSellers] = useState([
//     { id: 1, contactName: 'Amit Seth', accountName: 'Tech Corp', email: 'amitseth@team1consulting.com', phone: '+919971556634', contactOwner: 'Danish Bindra' },
//     { id: 2, contactName: 'Amit Seth', accountName: 'Innovation Inc', email: 'amitseth@team1consulting.com', phone: '+919971556634', contactOwner: 'Tanushree Das' },
//     { id: 3, contactName: 'Danish Bindra', accountName: 'Global Solutions', email: 'danishbindra@team1consulting.com', phone: '+917209805497', contactOwner: 'Tanmay Singh' },
//     { id: 4, contactName: 'Danish Binbra', accountName: 'StartupXYZ', email: 'danishbindra@team1consulting.com', phone: '+917209805497', contactOwner: 'Prabhat Mohant' },
//     { id: 5, contactName: 'Vishal seth', accountName: 'Enterprise Ltd', email: 'vishalseth@team1consulting.com', phone: '+919945684354', contactOwner: 'Tanushree Das' }
//   ]);
  
//   const [selectedSellers, setSelectedSellers] = useState([]);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [recordsPerPage, setRecordsPerPage] = useState(100);
//   const [currentPage, setCurrentPage] = useState(1);
  
//   const [formData, setFormData] = useState({
//     sellerOwner: 'None',
//     title: 'Mr.',
//     firstName: '',
//     lastName: '',
//     company: '',
//     mobile: '',
//     email: '',
//     description: ''
//   });

//   const handleCreateSeller = () => {
//     if (formData.firstName && formData.lastName && formData.email) {
//       const newSeller = {
//         id: sellers.length + 1,
//         contactName: `${formData.firstName} ${formData.lastName}`,
//         accountName: formData.company,
//         email: formData.email,
//         phone: formData.mobile,
//         contactOwner: formData.sellerOwner === 'None' ? 'Danish Bindra' : formData.sellerOwner
//       };
//       setSellers([...sellers, newSeller]);
//       setFormData({
//         sellerOwner: 'None',
//         title: 'Mr.',
//         firstName: '',
//         lastName: '',
//         company: '',
//         mobile: '',
//         email: '',
//         description: ''
//       });
//       setShowCreateForm(false);
//     }
//   };

//   const handleSaveAndNew = () => {
//     if (formData.firstName && formData.lastName && formData.email) {
//       const newSeller = {
//         id: sellers.length + 1,
//         contactName: `${formData.firstName} ${formData.lastName}`,
//         accountName: formData.company,
//         email: formData.email,
//         phone: formData.mobile,
//         contactOwner: formData.sellerOwner === 'None' ? 'Danish Bindra' : formData.sellerOwner
//       };
//       setSellers([...sellers, newSeller]);
//       setFormData({
//         sellerOwner: 'None',
//         title: 'Mr.',
//         firstName: '',
//         lastName: '',
//         company: '',
//         mobile: '',
//         email: '',
//         description: ''
//       });
//       // Keep form open for new entry
//     }
//   };

//   const toggleSellerSelection = (sellerId) => {
//     setSelectedSellers(prev => 
//       prev.includes(sellerId) 
//         ? prev.filter(id => id !== sellerId)
//         : [...prev, sellerId]
//     );
//   };

//   const selectAllSellers = () => {
//     setSelectedSellers(selectedSellers.length === sellers.length ? [] : sellers.map(seller => seller.id));
//   };

//   const CreateSellerModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-gray-900">Create Seller</h2>
//             <div className="flex space-x-2">
//               <button 
//                 onClick={() => setShowCreateForm(false)}
//                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleSaveAndNew}
//                 className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
//               >
//                 Save and new
//               </button>
//               <button 
//                 onClick={handleCreateSeller}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
//               >
//                 Save
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-gray-900">Seller Information</h3>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Seller Owner</label>
//                   <div className="relative">
//                     <select 
//                       value={formData.sellerOwner}
//                       onChange={(e) => setFormData({...formData, sellerOwner: e.target.value})}
//                       className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
//                     >
//                       <option value="None">-None-</option>
//                       <option value="Amit Seth">Amit Seth</option>
//                       <option value="Danish Bindra">Danish Bindra</option>
//                     </select>
//                     <div className="absolute right-3 top-3 pointer-events-none">
//                       <ChevronDown className="w-5 h-5 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
//                     <div className="flex">
//                       <select 
//                         value={formData.title}
//                         onChange={(e) => setFormData({...formData, title: e.target.value})}
//                         className="w-24 p-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
//                       >
//                         <option value="Mr.">Mr.</option>
//                         <option value="Mrs.">Mrs.</option>
//                         <option value="Ms.">Ms.</option>
//                         <option value="Dr.">Dr.</option>
//                         <option value="Prof.">Prof.</option>
//                       </select>
//                       <input
//                         type="text"
//                         value={formData.firstName}
//                         onChange={(e) => setFormData({...formData, firstName: e.target.value})}
//                         className="flex-1 p-3 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                         placeholder="First Name"
//                       />
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
//                     <input
//                       type="text"
//                       value={formData.lastName}
//                       onChange={(e) => setFormData({...formData, lastName: e.target.value})}
//                       className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       placeholder="Last Name"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
//                   <input
//                     type="text"
//                     value={formData.mobile}
//                     onChange={(e) => setFormData({...formData, mobile: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Mobile Number"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
//                   <input
//                     type="text"
//                     value={formData.company}
//                     onChange={(e) => setFormData({...formData, company: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Company Name"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email Id</label>
//                   <input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({...formData, email: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Email Address"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-8">
//             <h3 className="text-lg font-semibold mb-4 text-gray-900">Seller Description</h3>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//               <textarea
//                 value={formData.description}
//                 onChange={(e) => setFormData({...formData, description: e.target.value})}
//                 rows={4}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Enter seller description..."
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const FilterPanel = () => (
//     <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
//       <div className="p-4">
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="font-semibold text-gray-900">Filter Sellers by</h3>
//           <button 
//             onClick={() => setShowFilters(false)}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>
//         <div className="space-y-3">
//           <div className="relative">
//             <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>
//           <div className="pt-2">
//             <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
//               <ChevronRight className="w-4 h-4 text-gray-600" />
//               <span className="text-sm text-gray-700">System Defined Filters</span>
//             </div>
//             <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
//               <ChevronRight className="w-4 h-4 text-gray-600" />
//               <span className="text-sm text-gray-700">Filters by Filters</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const totalPages = Math.ceil(sellers.length / recordsPerPage);
//   const startRecord = (currentPage - 1) * recordsPerPage + 1;
//   const endRecord = Math.min(currentPage * recordsPerPage, sellers.length);

  

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header Controls */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
//               >
//                 <Filter className="w-4 h-4 mr-2" />
//                 All Sellers
//                 <ChevronDown className="w-4 h-4 ml-2" />
//               </button>
//               {showFilters && <FilterPanel />}
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-3">
//               {/* <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
//                 <BarChart3 className="w-4 h-4 mr-2" />
//                 <ChevronDown className="w-4 h-4" />
//               </button> */}
//             <button
//               onClick={() => setShowCreateForm(true)}
//               className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Create Seller
//             </button>
//             {/* <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
//               <ChevronDown className="w-4 h-4 mr-2" />
//             </button> */}
//             <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
//               Actions
//               <ChevronDown className="w-4 h-4 ml-2" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           {/* Table Header */}
//           <div className="flex items-center justify-between px-6 py-4 bg-indigo-700 text-white rounded-t-lg">
//             <span className="text-sm font-medium">Total Records {sellers.length}</span>
//             <div className="flex items-center space-x-4">
//               <select 
//                 value={recordsPerPage}
//                 onChange={(e) => setRecordsPerPage(Number(e.target.value))}
//                 className="bg-orange-500 text-white px-3 py-1 rounded border-none text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
//               >
//                 <option value={25}>25 Records per page</option>
//                 <option value={50}>50 Records per page</option>
//                 <option value={100}>100 Records per page</option>
//               </select>
//               <div className="flex items-center space-x-2 text-sm">
//                 <span>{startRecord}-{endRecord}</span>
//                 <button 
//                   onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="hover:bg-indigo-600 p-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
//                 <button 
//                   onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className="hover:bg-indigo-600 p-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left">
//                     <input
//                       type="checkbox"
//                       checked={selectedSellers.length === sellers.length}
//                       onChange={selectAllSellers}
//                       className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                     />
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700">
//                     <div className="flex items-center space-x-2">
//                       <span>Contact Name</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700">
//                     <div className="flex items-center space-x-2">
//                       <span>Account Name</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700">
//                     <div className="flex items-center space-x-2">
//                       <span>Email</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700">
//                     <div className="flex items-center space-x-2">
//                       <span>Phone</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700">
//                     <div className="flex items-center space-x-2">
//                       <span>Contact Owner</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {sellers.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((seller) => (
//                   <tr key={seller.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4">
//                       <input
//                         type="checkbox"
//                         checked={selectedSellers.includes(seller.id)}
//                         onChange={() => toggleSellerSelection(seller.id)}
//                         className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                       />
//                     </td>
//                     <td className="px-6 py-4 text-sm">
//                       <span className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium">
//                         {seller.contactName}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">{seller.accountName}</td>
//                     <td className="px-6 py-4 text-sm text-gray-900">{seller.email}</td>
//                     <td className="px-6 py-4 text-sm text-gray-900">{seller.phone}</td>
//                     <td className="px-6 py-4 text-sm text-gray-900">{seller.contactOwner}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Empty State */}
//           {sellers.length === 0 && (
//             <div className="text-center py-12">
//               <div className="text-gray-500">
//                 <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                 <p className="text-lg font-medium">No sellers found</p>
//                 <p className="text-sm">Create your first seller to get started</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Create Seller Modal */}
//       {showCreateForm && <CreateSellerModal />}
//     </div>
//   );
// };

// export default SellerList;




















































































































// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Filter,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   BarChart3,
//   X,
//   Search,
//   Plus,
//   Users, // For empty state icon
//   Edit, // For edit icon
//   Trash2 // For delete icon
// } from 'lucide-react';

// // Define sample sellers outside the component for initial state/fallback
// const initialSampleSellers = [
//   { _id: 'sample1', firstName: 'Amit', lastName: 'Seth', company: 'Tech Corp', email: 'amitseth@team1consulting.com', mobile: '+919971556634', sellerOwner: 'Danish Bindra', title: 'Mr.', description: '' },
//   { _id: 'sample2', firstName: 'Amit', lastName: 'Seth', company: 'Innovation Inc', email: 'amitseth@team1consulting.com', mobile: '+919971556634', sellerOwner: 'Tanushree Das', title: 'Mr.', description: '' },
//   { _id: 'sample3', firstName: 'Danish', lastName: 'Bindra', company: 'Global Solutions', email: 'danishbindra@team1consulting.com', mobile: '+917209805497', sellerOwner: 'Tanmay Singh', title: 'Mr.', description: '' },
//   { _id: 'sample4', firstName: 'Danish', lastName: 'Bindra', company: 'StartupXYZ', email: 'danishbindra@team1consulting.com', mobile: '+917209805497', sellerOwner: 'Prabhat Mohant', title: 'Mr.', description: '' },
//   { _id: 'sample5', firstName: 'Vishal', lastName: 'Seth', company: 'Enterprise Ltd', email: 'vishalseth@team1consulting.com', mobile: '+919945684354', sellerOwner: 'Tanushree Das', title: 'Mr.', description: '' }
// ];


// // Define CreateSellerModal outside the main component for better separation and reusability
// const CreateSellerModal = ({
//   formData,
//   handleFormChange,
//   handleCloseModal,
//   handleSaveAndNew,
//   handleCreateSeller,
//   handleUpdateSeller,
//   editingSeller // This prop determines if it's create or edit mode
// }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-lg w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-6 border-b pb-4">
//           <h2 className="text-2xl font-bold text-gray-900">{editingSeller ? 'Edit Seller' : 'Create Seller'}</h2>
//           <div className="flex space-x-3">
//             <button
//               onClick={handleCloseModal}
//               className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
//             >
//               Cancel
//             </button>
//             {/* Only show "Save and new" for create mode */}
//             {!editingSeller && (
//               <button
//                 onClick={handleSaveAndNew}
//                 className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm text-sm font-medium"
//               >
//                 Save and new
//               </button>
//             )}
//             <button
//               onClick={editingSeller ? handleUpdateSeller : handleCreateSeller}
//               className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
//             >
//               {editingSeller ? 'Update' : 'Save'}
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Seller Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-gray-900">Seller Information</h3>
//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="sellerOwner" className="block text-sm font-medium text-gray-700 mb-1">Seller Owner</label>
//                 <div className="relative">
//                   <select
//                     id="sellerOwner"
//                     value={formData.sellerOwner}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                   >
//                     <option value="None">-None-</option>
//                     <option value="Amit Seth">Amit Seth</option>
//                     <option value="Danish Bindra">Danish Bindra</option>
//                     <option value="Tanushree Das">Tanushree Das</option>
//                     <option value="Tanmay Singh">Tanmay Singh</option>
//                     <option value="Prabhat Mohant">Prabhat Mohant</option>
//                   </select>
//                   <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                     <ChevronDown className="w-5 h-5 text-gray-400" />
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 gap-4">
//                 <div>
//                   <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
//                   <div className="flex">
//                     <select
//                       id="title"
//                       value={formData.title}
//                       onChange={handleFormChange}
//                       className="w-24 p-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-6"
//                     >
//                       <option value="Mr.">Mr.</option>
//                       <option value="Mrs.">Mrs.</option>
//                       <option value="Ms.">Ms.</option>
//                       <option value="Dr.">Dr.</option>
//                       <option value="Prof.">Prof.</option>
//                     </select>
//                     <input
//                       id="firstName"
//                       type="text"
//                       value={formData.firstName}
//                       onChange={handleFormChange}
//                       className="flex-1 p-3 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       placeholder="First Name"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
//                   <input
//                     id="lastName"
//                     type="text"
//                     value={formData.lastName}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Last Name"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
//                 <input
//                   id="mobile"
//                   type="text"
//                   value={formData.mobile}
//                   onChange={handleFormChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Mobile Number"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Additional Seller Information Section */}
//           <div>
//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
//                 <input
//                   id="company"
//                   type="text"
//                   value={formData.company}
//                   onChange={handleFormChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Company Name"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Id <span className="text-red-500">*</span></label>
//                 <input
//                   id="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleFormChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Email Address"
//                   required
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8">
//           <h3 className="text-lg font-semibold mb-4 text-gray-900">Seller Description</h3>
//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <textarea
//               id="description"
//               value={formData.description}
//               onChange={handleFormChange}
//               rows={4}
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Enter seller description..."
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const FilterPanel = ({ setShowFilters }) => (
//   <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 font-sans">
//     <div className="p-4">
//       <div className="flex items-center justify-between mb-3">
//         <h3 className="font-semibold text-gray-900">Filter Sellers by</h3>
//         <button
//           onClick={() => setShowFilters(false)}
//           className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
//           aria-label="Close filters"
//         >
//           <X className="w-5 h-5" />
//         </button>
//       </div>
//       <div className="space-y-3">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//           />
//         </div>
//         <div className="pt-2">
//           <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
//             <ChevronRight className="w-4 h-4 text-gray-600" />
//             <span className="text-sm text-gray-700">System Defined Filters</span>
//           </div>
//           <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
//             <ChevronRight className="w-4 h-4 text-gray-600" />
//             <span className="text-sm text-gray-700">Filters by Fields</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );


// const SellerList = () => {
//   const [sellers, setSellers] = useState([]); // Initialize as empty, data will come from API
//   const [selectedSellers, setSelectedSellers] = useState([]);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [recordsPerPage, setRecordsPerPage] = useState(100);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true); // Add loading state
//   const [editingSeller, setEditingSeller] = useState(null); // State to hold seller being edited

//   // Base URL for your backend API (ensure this matches your server's port)
//   const API_BASE_URL = 'http://localhost:3000/api';

//   // Memoized function to fetch sellers from the backend
//   const fetchSellers = useCallback(async () => {
//     try {
//       setLoading(true); // Start loading
//       console.log('Attempting to fetch sellers from:', `${API_BASE_URL}/seller`);
//       const response = await fetch(`${API_BASE_URL}/seller`);
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         throw new Error(`Failed to fetch sellers: ${response.statusText}`);
//       }
//       const data = await response.json();
//       setSellers(data);
//       console.log('Sellers fetched successfully:', data);
//     } catch (error) {
//       console.error('Error fetching sellers from backend:', error);
//       setSellers(initialSampleSellers); // Fallback to sample data on error
//     } finally {
//       setLoading(false); // End loading in all cases
//     }
//   }, []);

//   // Fetch sellers on component mount
//   useEffect(() => {
//     fetchSellers();
//   }, [fetchSellers]); // Runs once when fetchSellers is created

//   const [formData, setFormData] = useState({
//     sellerOwner: 'None',
//     title: 'Mr.',
//     firstName: '',
//     lastName: '',
//     company: '',
//     mobile: '',
//     email: '',
//     description: ''
//   });

//   // Effect to populate form data when editingSeller changes
//   useEffect(() => {
//     if (editingSeller) {
//       setFormData({
//         sellerOwner: editingSeller.sellerOwner || 'None',
//         title: editingSeller.title || 'Mr.',
//         firstName: editingSeller.firstName || '',
//         lastName: editingSeller.lastName || '',
//         company: editingSeller.company || '',
//         mobile: editingSeller.mobile || '',
//         email: editingSeller.email || '',
//         description: editingSeller.description || ''
//       });
//     } else {
//       // Reset form data for a new seller
//       setFormData({
//         sellerOwner: 'None',
//         title: 'Mr.',
//         firstName: '',
//         lastName: '',
//         company: '',
//         mobile: '',
//         email: '',
//         description: ''
//       });
//     }
//   }, [editingSeller]);


//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleCloseModal = () => {
//     setShowCreateForm(false);
//     setEditingSeller(null); // Clear editing seller when modal closes
//   };

//   const handleCreateSeller = async () => {
//     if (!formData.firstName || !formData.lastName || !formData.email) {
//       console.warn('First Name, Last Name, and Email are required to create a seller.');
//       return;
//     }

//     try {
//       console.log('Attempting to create seller with data:', formData);
//       const response = await fetch(`${API_BASE_URL}/seller`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       console.log('Response status:', response.status); // Log the response status
//       const responseText = await response.text(); // Get raw response text
//       console.log('Raw response text:', responseText); // Log raw response text

//       if (!response.ok) {
//         // Try to parse JSON error if available, otherwise use raw text
//         let errorMessage = responseText;
//         try {
//           const errorData = JSON.parse(responseText);
//           if (errorData.message) {
//             errorMessage = errorData.message;
//           }
//         } catch (parseError) {
//           console.error("Failed to parse error response as JSON:", parseError);
//         }
//         throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
//       }

//       const createdSeller = JSON.parse(responseText); // Parse the text as JSON
//       console.log('Seller created successfully on backend:', createdSeller);
//       await fetchSellers(); // Re-fetch all sellers to update the table
//       handleCloseModal(); // Close the modal and reset form
//     } catch (error) {
//       console.error('Error creating seller:', error);
//       // alert(`Failed to create seller: ${error.message}. Check console for details.`); // Example user feedback
//     }
//   };

//   const handleSaveAndNew = async () => {
//     if (!formData.firstName || !formData.lastName || !formData.email) {
//       console.warn('First Name, Last Name, and Email are required to save and create a new seller.');
//       return;
//     }

//     try {
//       console.log('Attempting to save and create new seller with data:', formData);
//       const response = await fetch(`${API_BASE_URL}/seller`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       console.log('Response status:', response.status); // Log the response status
//       const responseText = await response.text(); // Get raw response text
//       console.log('Raw response text:', responseText); // Log raw response text

//       if (!response.ok) {
//         // Try to parse JSON error if available, otherwise use raw text
//         let errorMessage = responseText;
//         try {
//           const errorData = JSON.parse(responseText);
//           if (errorData.message) {
//             errorMessage = errorData.message;
//           }
//         } catch (parseError) {
//           console.error("Failed to parse error response as JSON:", parseError);
//         }
//         throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
//       }

//       const createdSeller = JSON.parse(responseText); // Parse the text as JSON
//       console.log('Seller saved and ready for new entry:', createdSeller);
//       await fetchSellers(); // Re-fetch all sellers to update the table
//       setFormData({ // Reset form for new entry
//         sellerOwner: 'None',
//         title: 'Mr.',
//         firstName: '',
//         lastName: '',
//         company: '',
//         mobile: '',
//         email: '',
//         description: ''
//       });
//       setEditingSeller(null); // Ensure not in edit mode for the new entry
//       // Keep form open for new entry
//     } catch (error) {
//       console.error('Error saving and creating new seller:', error);
//       // alert(`Failed to save and create new seller: ${error.message}. Check console for details.`); // Example user feedback
//     }
//   };

//   const handleUpdateSeller = async () => {
//     if (!editingSeller || !formData.firstName || !formData.lastName || !formData.email) {
//       console.warn('First Name, Last Name, Email, and a seller to edit are required for update.');
//       return;
//     }

//     try {
//       console.log(`Sending update data for seller ${editingSeller._id}:`, formData);
//       const response = await fetch(`${API_BASE_URL}/seller/${editingSeller._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       console.log('Response status:', response.status); // Log the response status
//       const responseText = await response.text(); // Get raw response text
//       console.log('Raw response text:', responseText); // Log raw response text

//       if (!response.ok) {
//         let errorMessage = responseText;
//         try {
//           const errorData = JSON.parse(responseText);
//           if (errorData.message) {
//             errorMessage = errorData.message;
//           }
//         } catch (parseError) {
//           console.error("Failed to parse error response as JSON:", parseError);
//         }
//         throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
//       }

//       const updatedSeller = JSON.parse(responseText); // Parse the text as JSON
//       console.log('Seller updated successfully on backend:', updatedSeller);
//       await fetchSellers(); // Re-fetch all sellers to update the table
//       handleCloseModal(); // Close the modal and reset form
//     } catch (error) {
//       console.error('Error updating seller:', error);
//       // alert(`Failed to update seller: ${error.message}. Check console for details.`); // Example user feedback
//     }
//   };

//   const handleDeleteSeller = async (sellerId) => {
//     if (window.confirm('Are you sure you want to delete this seller?')) {
//       try {
//         console.log('Attempting to delete seller with ID:', sellerId);
//         const response = await fetch(`${API_BASE_URL}/seller/${sellerId}`, {
//           method: 'DELETE',
//         });

//         console.log('Response status:', response.status); // Log the response status
//         const responseText = await response.text(); // Get raw response text
//         console.log('Raw response text:', responseText); // Log raw response text


//         if (!response.ok) {
//           let errorMessage = responseText;
//           try {
//             const errorData = JSON.parse(responseText);
//             if (errorData.message) {
//               errorMessage = errorData.message;
//             }
//           } catch (parseError) {
//             console.error("Failed to parse error response as JSON:", parseError);
//           }
//           throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
//         }

//         console.log('Seller deleted successfully on backend:', sellerId);
//         await fetchSellers(); // Re-fetch sellers to update the table
//       } catch (error) {
//         console.error('Error deleting seller:', error);
//         // alert(`Failed to delete seller: ${error.message}. Check console for details.`); // Example user feedback
//       }
//     }
//   };


//   const toggleSellerSelection = (sellerId) => {
//     setSelectedSellers(prev =>
//       prev.includes(sellerId)
//         ? prev.filter(id => id !== sellerId)
//         : [...prev, sellerId]
//     );
//   };

//   const selectAllSellers = () => {
//     setSelectedSellers(selectedSellers.length > 0 && selectedSellers.length === sellers.length ? [] : sellers.map(seller => seller._id));
//   };

//   const totalPages = Math.ceil(sellers.length / recordsPerPage);
//   const startRecord = (currentPage - 1) * recordsPerPage + 1;
//   const endRecord = Math.min(currentPage * recordsPerPage, sellers.length);


//   // Conditional rendering for the table rows
//   const renderSellersTableRows = () => {
//     if (sellers.length === 0 && !loading) {
//       return (
//         <tr>
//           <td colSpan="7" className="text-center py-12"> {/* Updated colspan for 7 columns */}
//             <div className="text-gray-500">
//               <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//               <p className="text-lg font-medium">No sellers found</p>
//               <p className="text-sm">Create your first seller to get started</p>
//             </div>
//           </td>
//         </tr>
//       );
//     }

//     return sellers.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((seller) => (
//       <tr key={seller._id} className="hover:bg-gray-50 transition-colors">
//         <td className="px-6 py-4 w-12">
//           <input
//             type="checkbox"
//             checked={selectedSellers.includes(seller._id)}
//             onChange={() => toggleSellerSelection(seller._id)}
//             className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//           />
//         </td>
//         {/* Display combined firstName and lastName as Contact Name */}
//         <td className="px-6 py-4 text-sm whitespace-nowrap">
//           <span className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium">
//             {seller.firstName} {seller.lastName}
//           </span>
//         </td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{seller.company || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{seller.email || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{seller.mobile || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{seller.sellerOwner || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm whitespace-nowrap">
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => {
//                 setEditingSeller(seller);
//                 setShowCreateForm(true);
//               }}
//               className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
//               title="Edit Seller"
//             >
//               <Edit className="w-4 h-4" />
//             </button>
//             <button
//               onClick={() => handleDeleteSeller(seller._id)}
//               className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
//               title="Delete Seller"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         </td>
//       </tr>
//     ));
//   };


//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
//       {/* Header Controls */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
//         <div className="flex items-center justify-between flex-wrap gap-3">
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
//               >
//                 <Filter className="w-4 h-4 mr-2" />
//                 All Sellers
//                 <ChevronDown className="w-4 h-4 ml-2" />
//               </button>
//               {showFilters && <FilterPanel setShowFilters={setShowFilters} />}
//             </div>
//           </div>

//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => {
//                 setEditingSeller(null); // Ensure no seller is being edited when creating new
//                 setShowCreateForm(true);
//               }}
//               className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Create Seller
//             </button>
//             {/* <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium">
//               Actions
//               <ChevronDown className="w-4 h-4 ml-2" />
//             </button> */}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           {/* Table Header */}
//           <div className="flex items-center justify-between px-6 py-4 bg-indigo-700 text-white rounded-t-lg">
//             <span className="text-sm font-medium">Total Records {sellers.length}</span>
//             <div className="flex items-center space-x-4">
//               <select
//                 value={recordsPerPage}
//                 onChange={(e) => setRecordsPerPage(Number(e.target.value))}
//                 className="bg-orange-500 text-white px-3 py-1 rounded-md border-none text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 appearance-none pr-8"
//               >
//                 <option value={25}>25 Records per page</option>
//                 <option value={50}>50 Records per page</option>
//                 <option value={100}>100 Records per page</option>
//               </select>
//               <div className="flex items-center space-x-2 text-sm">
//                 <span>{startRecord}-{endRecord}</span>
//                 <button
//                   onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="hover:bg-indigo-600 p-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   aria-label="Previous page"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className="hover:bg-indigo-600 p-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   aria-label="Next page"
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full table-auto">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left w-12">
//                     <input
//                       type="checkbox"
//                       checked={selectedSellers.length > 0 && selectedSellers.length === sellers.length}
//                       onChange={selectAllSellers}
//                       className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                     />
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Contact Name</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Company</span> {/* Changed from Account Name */}
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Email</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Mobile</span> {/* Changed from Phone */}
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Seller Owner</span> {/* Changed from Contact Owner */}
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="7" className="text-center py-12">
//                       <div className="text-gray-600 text-lg">Loading Sellers...</div>
//                     </td>
//                   </tr>
//                 ) : (
//                   renderSellersTableRows()
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Create/Edit Seller Modal */}
//       {showCreateForm && (
//         <CreateSellerModal
//           formData={formData}
//           handleFormChange={handleFormChange}
//           handleCloseModal={handleCloseModal}
//           handleSaveAndNew={handleSaveAndNew}
//           handleCreateSeller={handleCreateSeller}
//           handleUpdateSeller={handleUpdateSeller}
//           editingSeller={editingSeller}
//         />
//       )}
//     </div>
//   );
// };

// export default SellerList;




// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
// import {
//   Filter,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   X,
//   Search,
//   Plus,
//   Users,
//   Edit,
//   Trash2
// } from 'lucide-react';

// // Define sample sellers outside the component for initial state/fallback
// const initialSampleSellers = [
//   { _id: 'sample1', firstName: 'Amit', lastName: 'Seth', company: 'Tech Corp', email: 'amitseth@team1consulting.com', mobile: '+919971556634', sellerOwner: 'Danish Bindra', title: 'Mr.', description: '' },
//   { _id: 'sample2', firstName: 'Amit', lastName: 'Seth', company: 'Innovation Inc', email: 'amitseth@team1consulting.com', mobile: '+919971556634', sellerOwner: 'Tanushree Das', title: 'Mr.', description: '' },
//   { _id: 'sample3', firstName: 'Danish', lastName: 'Bindra', company: 'Global Solutions', email: 'danishbindra@team1consulting.com', mobile: '+917209805497', sellerOwner: 'Tanmay Singh', title: 'Mr.', description: '' },
//   { _id: 'sample4', firstName: 'Danish', lastName: 'Bindra', company: 'StartupXYZ', email: 'danishbindra@team1consulting.com', mobile: '+917209805497', sellerOwner: 'Prabhat Mohant', title: 'Mr.', description: '' },
//   { _id: 'sample5', firstName: 'Vishal', lastName: 'Seth', company: 'Enterprise Ltd', email: 'vishalseth@team1consulting.com', mobile: '+919945684354', sellerOwner: 'Tanushree Das', title: 'Mr.', description: '' }
// ];

// // Custom Confirmation Modal Component
// const ConfirmationModal = ({ message, onConfirm, onCancel }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full">
//       <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Action</h3>
//       <p className="text-gray-700 mb-6">{message}</p>
//       <div className="flex justify-end space-x-3">
//         <button
//           onClick={onCancel}
//           className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors text-sm font-medium"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={onConfirm}
//           className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
//         >
//           Confirm
//         </button>
//       </div>
//     </div>
//   </div>
// );


// // Define CreateSellerModal outside the main component for better separation and reusability
// const CreateSellerModal = ({
//   formData,
//   handleFormChange,
//   handleCloseModal,
//   handleSaveAndNew,
//   handleCreateSeller,
//   handleUpdateSeller,
//   editingSeller // This prop determines if it's create or edit mode
// }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-lg w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-6 border-b pb-4">
//           <h2 className="text-2xl font-bold text-gray-900">{editingSeller ? 'Edit Seller' : 'Create Seller'}</h2>
//           <div className="flex space-x-3">
//             <button
//               onClick={handleCloseModal}
//               className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
//             >
//               Cancel
//             </button>
//             {/* Only show "Save and new" for create mode */}
//             {!editingSeller && (
//               <button
//                 onClick={handleSaveAndNew}
//                 className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm text-sm font-medium"
//               >
//                 Save and new
//               </button>
//             )}
//             <button
//               onClick={editingSeller ? handleUpdateSeller : handleCreateSeller}
//               className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
//             >
//               {editingSeller ? 'Update' : 'Save'}
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Seller Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-gray-900">Seller Information</h3>
//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="sellerOwner" className="block text-sm font-medium text-gray-700 mb-1">Seller</label>
//                 <div className="relative">
//                   <select
//                     id="sellerOwner"
//                     value={formData.sellerOwner}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                   >
//                     <option value="None">-None-</option>
//                     <option value="Amit Seth">Amit Seth</option>
//                     <option value="Danish Bindra">Danish Bindra</option>
//                     {/* <option value="Tanushree Das">Tanushree Das</option> */}
//                     <option value="Tanmay Singh">Tanmay Singh</option>
//                     <option value="Prabhat Mohant">Prabhat Mohant</option>
//                   </select>
//                   <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                     <ChevronDown className="w-5 h-5 text-gray-400" />
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 gap-4">
//                 <div>
//                   <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
//                   <div className="flex">
//                     <select
//                       id="title"
//                       value={formData.title}
//                       onChange={handleFormChange}
//                       className="w-24 p-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-6"
//                     >
//                       <option value="Mr.">Mr.</option>
//                       <option value="Mrs.">Mrs.</option>
//                       <option value="Ms.">Ms.</option>
//                       <option value="Dr.">Dr.</option>
//                       <option value="Prof.">Prof.</option>
//                     </select>
//                     <input
//                       id="firstName"
//                       type="text"
//                       value={formData.firstName}
//                       onChange={handleFormChange}
//                       className="flex-1 p-3 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       placeholder="First Name"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
//                   <input
//                     id="lastName"
//                     type="text"
//                     value={formData.lastName}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Last Name"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
//                 <input
//                   id="mobile"
//                   type="text"
//                   value={formData.mobile}
//                   onChange={handleFormChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Mobile Number"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Additional Seller Information Section */}
//           <div>
//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
//                 <input
//                   id="company"
//                   type="text"
//                   value={formData.company}
//                   onChange={handleFormChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Company Name"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Id <span className="text-red-500">*</span></label>
//                 <input
//                   id="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleFormChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Email Address"
//                   required
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8">
//           <h3 className="text-lg font-semibold mb-4 text-gray-900">Seller Description</h3>
//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <textarea
//               id="description"
//               value={formData.description}
//               onChange={handleFormChange}
//               rows={4}
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Enter seller description..."
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const FilterPanel = ({ setShowFilters }) => (
//   <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 font-sans">
//     <div className="p-4">
//       <div className="flex items-center justify-between mb-3">
//         <h3 className="font-semibold text-gray-900">Filter Sellers by</h3>
//         <button
//           onClick={() => setShowFilters(false)}
//           className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
//           aria-label="Close filters"
//         >
//           <X className="w-5 h-5" />
//         </button>
//       </div>
//       <div className="space-y-3">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//           />
//         </div>
//         <div className="pt-2">
//           <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
//             <ChevronRight className="w-4 h-4 text-gray-600" />
//             <span className="text-sm text-gray-700">System Defined Filters</span>
//           </div>
//           <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
//             <ChevronRight className="w-4 h-4 text-gray-600" />
//             <span className="text-sm text-gray-700">Filters by Fields</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );


// const SellerList = () => {
//   const [sellers, setSellers] = useState([]); // Initialize as empty, data will come from API
//   const [selectedSellers, setSelectedSellers] = useState([]);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [recordsPerPage, setRecordsPerPage] = useState(100);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true); // Add loading state
//   const [editingSeller, setEditingSeller] = useState(null); // State to hold seller being edited
//   const [showConfirmModal, setShowConfirmModal] = useState(false); // State for confirmation modal
//   const [sellerToDelete, setSellerToDelete] = useState(null); // State to hold seller ID to delete

//   const navigate = useNavigate(); // Initialize useNavigate hook

//   // Base URL for your backend API (ensure this matches your server's port)
//   const API_BASE_URL = 'http://localhost:3000/api';

//   // Memoized function to fetch sellers from the backend
//   const fetchSellers = useCallback(async () => {
//     try {
//       setLoading(true); // Start loading
//       console.log('Attempting to fetch sellers from:', `${API_BASE_URL}/seller`);
//       const response = await fetch(`${API_BASE_URL}/seller`);
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         throw new Error(`Failed to fetch sellers: ${response.statusText}`);
//       }
//       const data = await response.json();
//       setSellers(data);
//       console.log('Sellers fetched successfully:', data);
//     } catch (error) {
//       console.error('Error fetching sellers from backend:', error);
//       setSellers(initialSampleSellers); // Fallback to sample data on error
//     } finally {
//       setLoading(false); // End loading in all cases
//     }
//   }, []);

//   // Fetch sellers on component mount
//   useEffect(() => {
//     fetchSellers();
//   }, [fetchSellers]); // Runs once when fetchSellers is created

//   const [formData, setFormData] = useState({
//     sellerOwner: 'None',
//     title: 'Mr.',
//     firstName: '',
//     lastName: '',
//     company: '',
//     mobile: '',
//     email: '',
//     description: ''
//   });

//   // Effect to populate form data when editingSeller changes
//   useEffect(() => {
//     if (editingSeller) {
//       setFormData({
//         sellerOwner: editingSeller.sellerOwner || 'None',
//         title: editingSeller.title || 'Mr.',
//         firstName: editingSeller.firstName || '',
//         lastName: editingSeller.lastName || '',
//         company: editingSeller.company || '',
//         mobile: editingSeller.mobile || '',
//         email: editingSeller.email || '',
//         description: editingSeller.description || ''
//       });
//     } else {
//       // Reset form data for a new seller
//       setFormData({
//         sellerOwner: 'None',
//         title: 'Mr.',
//         firstName: '',
//         lastName: '',
//         company: '',
//         mobile: '',
//         email: '',
//         description: ''
//       });
//     }
//   }, [editingSeller]);


//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleCloseModal = () => {
//     setShowCreateForm(false);
//     setEditingSeller(null); // Clear editing seller when modal closes
//   };

//   const handleCreateSeller = async () => {
//     if (!formData.firstName || !formData.lastName || !formData.email) {
//       console.warn('First Name, Last Name, and Email are required to create a seller.');
//       // You might want to show a user-friendly error message here (e.g., a toast)
//       return;
//     }

//     try {
//       console.log('Attempting to create seller with data:', formData);
//       const response = await fetch(`${API_BASE_URL}/seller`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       console.log('Response status:', response.status); // Log the response status
//       const responseText = await response.text(); // Get raw response text
//       console.log('Raw response text:', responseText); // Log raw response text

//       if (!response.ok) {
//         // Try to parse JSON error if available, otherwise use raw text
//         let errorMessage = responseText;
//         try {
//           const errorData = JSON.parse(responseText);
//           if (errorData.message) {
//             errorMessage = errorData.message;
//           }
//         } catch (parseError) {
//           console.error("Failed to parse error response as JSON:", parseError);
//         }
//         throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
//       }

//       const createdSeller = JSON.parse(responseText); // Parse the text as JSON
//       console.log('Seller created successfully on backend:', createdSeller);
//       await fetchSellers(); // Re-fetch all sellers to update the table
//       handleCloseModal(); // Close the modal and reset form
//     } catch (error) {
//       console.error('Error creating seller:', error);
//       // alert(`Failed to create seller: ${error.message}. Check console for details.`); // Example user feedback
//     }
//   };

//   const handleSaveAndNew = async () => {
//     if (!formData.firstName || !formData.lastName || !formData.email) {
//       console.warn('First Name, Last Name, and Email are required to save and create a new seller.');
//       return;
//     }

//     try {
//       console.log('Attempting to save and create new seller with data:', formData);
//       const response = await fetch(`${API_BASE_URL}/seller`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       console.log('Response status:', response.status); // Log the response status
//       const responseText = await response.text(); // Get raw response text
//       console.log('Raw response text:', responseText); // Log raw response text

//       if (!response.ok) {
//         // Try to parse JSON error if available, otherwise use raw text
//         let errorMessage = responseText;
//         try {
//           const errorData = JSON.parse(responseText);
//           if (errorData.message) {
//             errorMessage = errorData.message;
//           }
//         } catch (parseError) {
//           console.error("Failed to parse error response as JSON:", parseError);
//         }
//         throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
//       }

//       const createdSeller = JSON.parse(responseText); // Parse the text as JSON
//       console.log('Seller saved and ready for new entry:', createdSeller);
//       await fetchSellers(); // Re-fetch all sellers to update the table
//       setFormData({ // Reset form for new entry
//         sellerOwner: 'None',
//         title: 'Mr.',
//         firstName: '',
//         lastName: '',
//         company: '',
//         mobile: '',
//         email: '',
//         description: ''
//       });
//       setEditingSeller(null); // Ensure not in edit mode for the new entry
//       // Keep form open for new entry
//     } catch (error) {
//       console.error('Error saving and creating new seller:', error);
//       // alert(`Failed to save and create new seller: ${error.message}. Check console for details.`); // Example user feedback
//     }
//   };

//   const handleUpdateSeller = async () => {
//     if (!editingSeller || !formData.firstName || !formData.lastName || !formData.email) {
//       console.warn('First Name, Last Name, Email, and a seller to edit are required for update.');
//       return;
//     }

//     try {
//       console.log(`Sending update data for seller ${editingSeller._id}:`, formData);
//       const response = await fetch(`${API_BASE_URL}/seller/${editingSeller._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       console.log('Response status:', response.status); // Log the response status
//       const responseText = await response.text(); // Get raw response text
//       console.log('Raw response text:', responseText); // Log raw response text

//       if (!response.ok) {
//         let errorMessage = responseText;
//         try {
//           const errorData = JSON.parse(responseText);
//           if (errorData.message) {
//             errorMessage = errorData.message;
//           }
//         } catch (parseError) {
//           console.error("Failed to parse error response as JSON:", parseError);
//         }
//         throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
//       }

//       const updatedSeller = JSON.parse(responseText); // Parse the text as JSON
//       console.log('Seller updated successfully on backend:', updatedSeller);
//       await fetchSellers(); // Re-fetch all sellers to update the table
//       handleCloseModal(); // Close the modal and reset form
//     } catch (error) {
//       console.error('Error updating seller:', error);
//       // alert(`Failed to update seller: ${error.message}. Check console for details.`); // Example user feedback
//     }
//   };

//   // Function to show the confirmation modal for deletion
//   const confirmDeleteSeller = (sellerId) => {
//     setSellerToDelete(sellerId);
//     setShowConfirmModal(true);
//   };

//   // Function to proceed with deletion after confirmation
//   const executeDeleteSeller = async () => {
//     if (!sellerToDelete) return; // Should not happen if modal is shown correctly
//     setShowConfirmModal(false); // Close the confirmation modal

//     try {
//       console.log('Attempting to delete seller with ID:', sellerToDelete);
//       const response = await fetch(`${API_BASE_URL}/seller/${sellerToDelete}`, {
//         method: 'DELETE',
//       });

//       console.log('Response status:', response.status); // Log the response status
//       const responseText = await response.text(); // Get raw response text
//       console.log('Raw response text:', responseText); // Log raw response text


//       if (!response.ok) {
//         let errorMessage = responseText;
//         try {
//           const errorData = JSON.parse(responseText);
//           if (errorData.message) {
//             errorMessage = errorData.message;
//           }
//         } catch (parseError) {
//           console.error("Failed to parse error response as JSON:", parseError);
//         }
//         throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
//       }

//       console.log('Seller deleted successfully on backend:', sellerToDelete);
//       await fetchSellers(); // Re-fetch sellers to update the table
//       setSellerToDelete(null); // Clear the seller to delete state
//     } catch (error) {
//       console.error('Error deleting seller:', error);
//       // alert(`Failed to delete seller: ${error.message}. Check console for details.`); // Example user feedback
//     }
//   };

//   // Function to cancel deletion
//   const cancelDeleteSeller = () => {
//     setShowConfirmModal(false);
//     setSellerToDelete(null);
//   };


//   const toggleSellerSelection = (sellerId) => {
//     setSelectedSellers(prev =>
//       prev.includes(sellerId)
//         ? prev.filter(id => id !== sellerId)
//         : [...prev, sellerId]
//     );
//   };

//   const selectAllSellers = () => {
//     setSelectedSellers(selectedSellers.length > 0 && selectedSellers.length === sellers.length ? [] : sellers.map(seller => seller._id));
//   };

//   const totalPages = Math.ceil(sellers.length / recordsPerPage);
//   const startRecord = (currentPage - 1) * recordsPerPage + 1;
//   const endRecord = Math.min(currentPage * recordsPerPage, sellers.length);

//   // Function to handle clicking on a seller name to view details
//   // *** THIS IS THE CRITICAL LINE THAT NEEDS TO BE CORRECTED ***
//   const handleSellerClick = (sellerId) => {
//     navigate(`/admin-dashboard/sellers/${sellerId}`); // Corrected path
//   };


//   // Conditional rendering for the table rows
//   const renderSellersTableRows = () => {
//     if (sellers.length === 0 && !loading) {
//       return (
//         <tr>
//           <td colSpan="7" className="text-center py-12"> {/* Updated colspan for 7 columns */}
//             <div className="text-gray-500">
//               <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//               <p className="text-lg font-medium">No sellers found</p>
//               <p className="text-sm">Create your first seller to get started</p>
//             </div>
//           </td>
//         </tr>
//       );
//     }

//     return sellers.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((seller) => (
//       <tr key={seller._id} className="hover:bg-gray-50 transition-colors">
//         <td className="px-6 py-4 w-12">
//           <input
//             type="checkbox"
//             checked={selectedSellers.includes(seller._id)}
//             onChange={() => toggleSellerSelection(seller._id)}
//             className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//           />
//         </td>
//         {/* Make the Contact Name clickable to view details */}
//         <td className="px-6 py-4 text-sm whitespace-nowrap">
//           <span
//             onClick={() => handleSellerClick(seller._id)} // Call handleSellerClick on click
//             className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
//           >
//             {seller.firstName} {seller.lastName}
//           </span>
//         </td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{seller.company || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{seller.email || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{seller.mobile || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{seller.sellerOwner || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm whitespace-nowrap">
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => {
//                 setEditingSeller(seller);
//                 setShowCreateForm(true);
//               }}
//               className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
//               title="Edit Seller"
//             >
//               <Edit className="w-4 h-4" />
//             </button>
//             <button
//               onClick={() => confirmDeleteSeller(seller._id)} // Use custom confirmation
//               className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
//               title="Delete Seller"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         </td>
//       </tr>
//     ));
//   };


//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
//       {/* Header Controls */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
//         <div className="flex items-center justify-between flex-wrap gap-3">
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
//               >
//                 <Filter className="w-4 h-4 mr-2" />
//                 All Sellers
//                 <ChevronDown className="w-4 h-4 ml-2" />
//               </button>
//               {showFilters && <FilterPanel setShowFilters={setShowFilters} />}
//             </div>
//           </div>

//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => {
//                 setEditingSeller(null); // Ensure no seller is being edited when creating new
//                 setShowCreateForm(true);
//               }}
//               className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Create Seller
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           {/* Table Header */}
//           <div className="flex items-center justify-between px-6 py-4 bg-indigo-700 text-white rounded-t-lg">
//             <span className="text-sm font-medium">Total Records {sellers.length}</span>
//             <div className="flex items-center space-x-4">
//               <select
//                 value={recordsPerPage}
//                 onChange={(e) => setRecordsPerPage(Number(e.target.value))}
//                 className="bg-orange-500 text-white px-3 py-1 rounded-md border-none text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 appearance-none pr-8"
//               >
//                 <option value={25}>25 Records per page</option>
//                 <option value={50}>50 Records per page</option>
//                 <option value={100}>100 Records per page</option>
//               </select>
//               <div className="flex items-center space-x-2 text-sm">
//                 <span>{startRecord}-{endRecord}</span>
//                 <button
//                   onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="hover:bg-indigo-600 p-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   aria-label="Previous page"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className="hover:bg-indigo-600 p-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   aria-label="Next page"
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full table-auto">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left w-12">
//                     <input
//                       type="checkbox"
//                       checked={selectedSellers.length > 0 && selectedSellers.length === sellers.length}
//                       onChange={selectAllSellers}
//                       className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                     />
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Contact Name</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Company</span> {/* Changed from Account Name */}
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Email</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Mobile</span> {/* Changed from Phone */}
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Seller Owner</span> {/* Changed from Contact Owner */}
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="7" className="text-center py-12">
//                       <div className="text-gray-600 text-lg">Loading Sellers...</div>
//                     </td>
//                   </tr>
//                 ) : (
//                   renderSellersTableRows()
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Create/Edit Seller Modal */}
//       {showCreateForm && (
//         <CreateSellerModal
//           formData={formData}
//           handleFormChange={handleFormChange}
//           handleCloseModal={handleCloseModal}
//           handleSaveAndNew={handleSaveAndNew}
//           handleCreateSeller={handleCreateSeller}
//           handleUpdateSeller={handleUpdateSeller}
//           editingSeller={editingSeller}
//         />
//       )}

//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <ConfirmationModal
//           message="Are you sure you want to delete this seller?"
//           onConfirm={executeDeleteSeller}
//           onCancel={cancelDeleteSeller}
//         />
//       )}
//     </div>
//   );
// };

// export default SellerList;


import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import {
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  Plus,
  Users,
  Edit,
  Trash2
} from 'lucide-react';

// Define sample sellers outside the component for initial state/fallback
const initialSampleSellers = [
  { _id: 'sample1', firstName: 'Amit', lastName: 'Seth', company: 'Tech Corp', email: 'amitseth@team1consulting.com', mobile: '+919971556634', sellerOwner: 'Danish Bindra', title: 'Mr.', description: '' },
  { _id: 'sample2', firstName: 'Amit', lastName: 'Seth', company: 'Innovation Inc', email: 'amitseth@team1consulting.com', mobile: '+919971556634', sellerOwner: 'Tanushree Das', title: 'Mr.', description: '' },
  { _id: 'sample3', firstName: 'Danish', lastName: 'Bindra', company: 'Global Solutions', email: 'danishbindra@team1consulting.com', mobile: '+917209805497', sellerOwner: 'Tanmay Singh', title: 'Mr.', description: '' },
  { _id: 'sample4', firstName: 'Danish', lastName: 'Bindra', company: 'StartupXYZ', email: 'danishbindra@team1consulting.com', mobile: '+917209805497', sellerOwner: 'Prabhat Mohant', title: 'Mr.', description: '' },
  { _id: 'sample5', firstName: 'Vishal', lastName: 'Seth', company: 'Enterprise Ltd', email: 'vishalseth@team1consulting.com', mobile: '+919945684354', sellerOwner: 'Tanushree Das', title: 'Mr.', description: '' }
];

// Custom Confirmation Modal Component
const ConfirmationModal = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Action</h3>
      <p className="text-gray-700 mb-6">{message}</p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors text-sm font-medium"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);


// Define CreateSellerModal outside the main component for better separation and reusability
const CreateSellerModal = ({
  formData,
  handleFormChange,
  handleCloseModal,
  handleSaveAndNew,
  handleCreateSeller,
  handleUpdateSeller,
  editingSeller, // This prop determines if it's create or edit mode
  accounts // Pass accounts data to the modal
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-900">{editingSeller ? 'Edit Seller' : 'Create Seller'}</h2>
          <div className="flex space-x-3">
            <button
              onClick={handleCloseModal}
              className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
            >
              Cancel
            </button>
            {/* Only show "Save and new" for create mode */}
            {!editingSeller && (
              <button
                onClick={handleSaveAndNew}
                className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm text-sm font-medium"
              >
                Save and new
              </button>
            )}
            <button
              onClick={editingSeller ? handleUpdateSeller : handleCreateSeller}
              className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
            >
              {editingSeller ? 'Update' : 'Save'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Seller Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Seller Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="sellerOwner" className="block text-sm font-medium text-gray-700 mb-1">Seller Owner</label> {/* Changed label to be more specific */}
                <div className="relative">
                  <select
                    id="sellerOwner"
                    value={formData.sellerOwner}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
                  >
                    <option value="None">-None-</option>
                    <option value="Amit Seth">Amit Seth</option>
                    <option value="Danish Bindra">Danish Bindra</option>
                    <option value="Aveek Nayan">Aveek Nayan</option> {/* Uncommented if these are valid owners */}
                    <option value="Tanmay Singh">Tanmay Singh</option>
                    <option value="Prabhat Mohant">Prabhat Mohant</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
                  <div className="flex">
                    <select
                      id="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      className="w-24 p-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-6"
                    >
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Prof.">Prof.</option>
                    </select>
                    <input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleFormChange}
                      className="flex-1 p-3 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="First Name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                <input
                  id="mobile"
                  type="text"
                  value={formData.mobile}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Mobile Number"
                />
              </div>
            </div>
          </div>

          {/* Additional Seller Information Section */}
          <div>
            <div className="space-y-4">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Company Name"
                />
              </div>

              {/* Account Name Field - using a dropdown for better data consistency */}
              <div>
                <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">Account Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select
                    id="accountName"
                    value={formData.accountName}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
                    required
                  >
                    <option value="">Select an Account</option>
                    {accounts.map((account) => (
                      <option key={account._id} value={account.accountName}>
                        {account.accountName}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Id</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Email Address"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Seller Description</h3>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleFormChange}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter seller description..."
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FilterPanel = ({ setShowFilters }) => (
  <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 font-sans">
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Filter Sellers by</h3>
        <button
          onClick={() => setShowFilters(false)}
          className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close filters"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>
        <div className="pt-2">
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">System Defined Filters</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Filters by Fields</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);


const SellerList = () => {
  const [sellers, setSellers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedSellers, setSelectedSellers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editingSeller, setEditingSeller] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [sellerToDelete, setSellerToDelete] = useState(null);

  const navigate = useNavigate();

  const API_BASE_URL = 'http://localhost:3000/api';

  const fetchSellers = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Attempting to fetch sellers from:', `${API_BASE_URL}/seller`);
      const response = await fetch(`${API_BASE_URL}/seller`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        throw new Error(`Failed to fetch sellers: ${response.statusText}`);
      }
      const data = await response.json();
      setSellers(data);
      console.log('Sellers fetched successfully:', data);
    } catch (error) {
      console.error('Error fetching sellers from backend:', error);
      setSellers(initialSampleSellers);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAccounts = useCallback(async () => {
    try {
      console.log('Attempting to fetch accounts from:', `${API_BASE_URL}/account`);
      const response = await fetch(`${API_BASE_URL}/account`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        throw new Error(`Failed to fetch accounts: ${response.statusText}`);
      }
      const data = await response.json();
      setAccounts(data);
      console.log('Accounts fetched successfully:', data);
    } catch (error) {
      console.error('Error fetching accounts for dropdown:', error);
      setAccounts([]);
    }
  }, []);


  useEffect(() => {
    fetchSellers();
    fetchAccounts();
  }, [fetchSellers, fetchAccounts]);

  const [formData, setFormData] = useState({
    sellerOwner: 'None',
    title: 'Mr.',
    firstName: '',
    lastName: '',
    company: '',
    mobile: '',
    email: '',
    description: '',
    accountName: ''
  });

  useEffect(() => {
    if (editingSeller) {
      setFormData({
        sellerOwner: editingSeller.sellerOwner || 'None',
        title: editingSeller.title || 'Mr.',
        firstName: editingSeller.firstName || '',
        lastName: editingSeller.lastName || '',
        company: editingSeller.company || '',
        mobile: editingSeller.mobile || '',
        email: editingSeller.email || '',
        description: editingSeller.description || '',
        accountName: editingSeller.accountName || ''
      });
    } else {
      setFormData({
        sellerOwner: 'None',
        title: 'Mr.',
        firstName: '',
        lastName: '',
        company: '',
        mobile: '',
        email: '',
        description: '',
        accountName: ''
      });
    }
  }, [editingSeller]);


  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCloseModal = () => {
    setShowCreateForm(false);
    setEditingSeller(null);
  };

  const handleCreateSeller = async () => {
    if (!formData.firstName || !formData.lastName || !formData.accountName) {
      console.warn('First Name, Last Name, and Account Name are required to create a seller.');
      alert('First Name, Last Name, and Account Name are required.');
      return;
    }

    try {
      console.log('Attempting to create seller with data:', formData);
      const response = await fetch(`${API_BASE_URL}/seller`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response text:', responseText);

      if (!response.ok) {
        let errorMessage = responseText;
        try {
          const errorData = JSON.parse(responseText);
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          console.error("Failed to parse error response as JSON:", parseError);
        }
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }

      const createdSeller = JSON.parse(responseText);
      console.log('Seller created successfully on backend:', createdSeller);
      await fetchSellers();
      handleCloseModal();
    } catch (error) {
      console.error('Error creating seller:', error);
      alert(`Failed to create seller: ${error.message}. Check console for details.`);
    }
  };

  const handleSaveAndNew = async () => {
    if (!formData.firstName || !formData.lastName || !formData.accountName) {
      console.warn('First Name, Last Name, and Account Name are required to save and create a new seller.');
      alert('First Name, Last Name, and Account Name are required.');
      return;
    }

    try {
      console.log('Attempting to save and create new seller with data:', formData);
      const response = await fetch(`${API_BASE_URL}/seller`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response text:', responseText);

      if (!response.ok) {
        let errorMessage = responseText;
        try {
          const errorData = JSON.parse(responseText);
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          console.error("Failed to parse error response as JSON:", parseError);
        }
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }

      const createdSeller = JSON.parse(responseText);
      console.log('Seller saved and ready for new entry:', createdSeller);
      await fetchSellers();
      setFormData({
        sellerOwner: 'None',
        title: 'Mr.',
        firstName: '',
        lastName: '',
        company: '',
        mobile: '',
        email: '',
        description: '',
        accountName: ''
      });
      setEditingSeller(null);
    } catch (error) {
      console.error('Error saving and creating new seller:', error);
      alert(`Failed to save and create new seller: ${error.message}. Check console for details.`);
    }
  };

  const handleUpdateSeller = async () => {
    if (!editingSeller || !formData.firstName || !formData.lastName || !formData.accountName) {
      console.warn('First Name, Last Name, Account Name, and a seller to edit are required for update.');
      alert('First Name, Last Name, and Account Name are required for update.');
      return;
    }

    try {
      console.log(`Sending update data for seller ${editingSeller._id}:`, formData);
      const response = await fetch(`${API_BASE_URL}/seller/${editingSeller._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response text:', responseText);

      if (!response.ok) {
        let errorMessage = responseText;
        try {
          const errorData = JSON.parse(responseText);
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          console.error("Failed to parse error response as JSON:", parseError);
        }
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }

      const updatedSeller = JSON.parse(responseText);
      console.log('Seller updated successfully on backend:', updatedSeller);
      await fetchSellers();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating seller:', error);
      alert(`Failed to update seller: ${error.message}. Check console for details.`);
    }
  };

  const confirmDeleteSeller = (sellerId) => {
    setSellerToDelete(sellerId);
    setShowConfirmModal(true);
  };

  const executeDeleteSeller = async () => {
    if (!sellerToDelete) return;
    setShowConfirmModal(false);

    try {
      console.log('Attempting to delete seller with ID:', sellerToDelete);
      const response = await fetch(`${API_BASE_URL}/seller/${sellerToDelete}`, {
        method: 'DELETE',
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response text:', responseText);


      if (!response.ok) {
        let errorMessage = responseText;
        try {
          const errorData = JSON.parse(responseText);
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          console.error("Failed to parse error response as JSON:", parseError);
        }
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }

      console.log('Seller deleted successfully on backend:', sellerToDelete);
      await fetchSellers();
      setSellerToDelete(null);
    } catch (error) {
      console.error('Error deleting seller:', error);
      alert(`Failed to delete seller: ${error.message}. Check console for details.`);
    }
  };

  const cancelDeleteSeller = () => {
    setShowConfirmModal(false);
    setSellerToDelete(null);
  };


  const toggleSellerSelection = (sellerId) => {
    setSelectedSellers(prev =>
      prev.includes(sellerId)
        ? prev.filter(id => id !== sellerId)
        : [...prev, sellerId]
    );
  };

  const selectAllSellers = () => {
    setSelectedSellers(selectedSellers.length > 0 && selectedSellers.length === sellers.length ? [] : sellers.map(seller => seller._id));
  };

  const totalPages = Math.ceil(sellers.length / recordsPerPage);
  const startRecord = (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, sellers.length);

  const handleSellerClick = (sellerId) => {
    navigate(`/admin-dashboard/sellers/${sellerId}`);
  };


  const renderSellersTableRows = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="7" className="text-center py-12">
            <div className="text-gray-500">
              <span className="animate-spin inline-block w-8 h-8 border-4 border-t-4 border-indigo-200 rounded-full"></span>
              <p className="mt-2">Loading sellers...</p>
            </div>
          </td>
        </tr>
      );
    }

    if (sellers.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="text-center py-12">
            <div className="text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No sellers found</p>
              <p className="text-sm">Create your first seller to get started</p>
            </div>
          </td>
        </tr>
      );
    }

    return sellers.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((seller) => (
      <tr key={seller._id} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 w-12">
          <input
            type="checkbox"
            checked={selectedSellers.includes(seller._id)}
            onChange={() => toggleSellerSelection(seller._id)}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </td>
        <td className="px-6 py-4 text-sm whitespace-nowrap">
          <span
            onClick={() => handleSellerClick(seller._id)}
            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
          >
            {seller.firstName} {seller.lastName}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{seller.company || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{seller.email || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{seller.mobile || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{seller.sellerOwner || 'N/A'}</td>
        <td className="px-6 py-4 text-sm whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setEditingSeller(seller);
                setShowCreateForm(true);
              }}
              className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
              title="Edit Seller"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => confirmDeleteSeller(seller._id)}
              className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
              title="Delete Seller"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    ));
  };


  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header Controls */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
              >
                <Filter className="w-4 h-4 mr-2" />
                All Sellers
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              {showFilters && <FilterPanel setShowFilters={setShowFilters} />}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setEditingSeller(null);
                setShowCreateForm(true);
              }}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Seller
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Table Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-indigo-700 text-white rounded-t-lg">
            <span className="text-sm font-medium">Total Records {sellers.length}</span>
            <div className="flex items-center space-x-4">
              <select
                value={recordsPerPage}
                onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                className="bg-orange-500 text-white px-3 py-1 rounded-md border-none text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 appearance-none pr-8"
              >
                <option value={25}>25 Records per page</option>
                <option value={50}>50 Records per page</option>
                <option value={100}>100 Records per page</option>
              </select>
              <div className="flex items-center space-x-2 text-sm">
                <span>{startRecord}-{endRecord}</span>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="hover:bg-indigo-600 p-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="hover:bg-indigo-600 p-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left w-12">
                    <input
                      type="checkbox"
                      checked={selectedSellers.length > 0 && selectedSellers.length === sellers.length}
                      onChange={selectAllSellers}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>Contact Name</span>
                      <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>Company</span>
                      <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>Email</span>
                      <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>Mobile</span>
                      <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>Seller Owner</span>
                      <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {renderSellersTableRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create/Edit Seller Modal */}
      {showCreateForm && (
        <CreateSellerModal
          formData={formData}
          handleFormChange={handleFormChange}
          handleCloseModal={handleCloseModal}
          handleSaveAndNew={handleSaveAndNew}
          handleCreateSeller={handleCreateSeller}
          handleUpdateSeller={handleUpdateSeller}
          editingSeller={editingSeller}
          // Corrected line: Moved comment to its own line
          accounts={accounts} 
        />
      )}

      {/* Confirmation Modal for Delete */}
      {showConfirmModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this seller? This action cannot be undone."
          onConfirm={executeDeleteSeller}
          onCancel={cancelDeleteSeller}
        />
      )}
    </div>
  );
};

export default SellerList;
