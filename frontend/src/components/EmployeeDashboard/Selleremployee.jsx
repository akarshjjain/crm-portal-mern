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
//   Users, // For empty state icon
//   Edit, // For edit icon
//   Trash2 // For delete icon
// } from 'lucide-react';

// // Import your custom useAuth hook
// // Path is relative from src/components/EmployeeDashboard/Selleremployee.jsx to src/context/AuthContext.jsx
// import { useAuth } from '../../context/authContext'; 

// // Define sample sellers outside the component for initial state/fallback
// const initialSampleSellers = [
//   { _id: 'sample1', firstName: 'Amit', lastName: 'Seth', company: 'Tech Corp', email: 'amitseth@team1consulting.com', mobile: '+919971556634', sellerOwner: 'Danish Bindra', title: 'Mr.', description: '' },
//   { _id: 'sample2', firstName: 'Amit', lastName: 'Seth', company: 'Innovation Inc', email: 'amitseth@team1consulting.com', mobile: '+919971556634', sellerOwner: 'Tanushree Das', title: 'Mr.', description: '' },
//   { _id: 'sample3', firstName: 'Danish', lastName: 'Bindra', company: 'Global Solutions', email: 'danishbindra@team1consulting.com', mobile: '+917209805497', sellerOwner: 'Tanmay Singh', title: 'Mr.', description: '' },
//   { _id: 'sample4', firstName: 'Danish', lastName: 'Bindra', company: 'StartupXYZ', email: 'danishbindra@team1consulting.com', mobile: '+917209805497', sellerOwner: 'Prabhat Mohant', title: 'Mr.', description: '' },
//   { _id: 'sample5', firstName: 'Vishal', lastName: 'Seth', company: 'Enterprise Ltd', email: 'vishalseth@team1consulting.com', mobile: '+919945684354', sellerOwner: 'Tanushree Das', title: 'Mr.', description: '' }
// ];

// // Base URL for your backend API (ensure this matches your server's port)
// const API_BASE_URL = 'http://localhost:3000/api';

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
//   editingSeller, // This prop determines if it's create or edit mode
//   currentUser // Pass currentUser to the modal for owner field logic
// }) => {
//   // Determine if seller owner field should be disabled
//   const isSellerOwnerDisabled = currentUser?.isLoggedIn && currentUser?.role === 'employee';

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6 border-b pb-4">
//             <h2 className="text-2xl font-bold text-gray-900">{editingSeller ? 'Edit Lead' : 'Create Lead'}</h2>
//             <div className="flex space-x-3">
//               <button
//                 onClick={handleCloseModal}
//                 className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
//               >
//                 Cancel
//               </button>
//               {/* Only show "Save and new" for create mode */}
//               {!editingSeller && (
//                 <button
//                   onClick={handleSaveAndNew}
//                   className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm text-sm font-medium"
//                 >
//                   Save and new
//                 </button>
//               )}
//               <button
//                 onClick={editingSeller ? handleUpdateSeller : handleCreateSeller}
//                 className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
//               >
//                 {editingSeller ? 'Update' : 'Save'}
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Seller Information Section */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-gray-900">Lead Information</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="sellerOwner" className="block text-sm font-medium text-gray-700 mb-1">Lead Owner</label>
//                   <div className="relative">
//                     <select
//                       id="sellerOwner"
//                       value={formData.sellerOwner}
//                       onChange={handleFormChange}
//                       className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10 ${isSellerOwnerDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
//                       disabled={isSellerOwnerDisabled} // Disable if a regular user is logged in
//                     >
//                       {isSellerOwnerDisabled ? (
//                         // If disabled, only show the current user's name
//                         <option value={currentUser.name}>{currentUser.name}</option>
//                       ) : (
//                         // Otherwise, show all options
//                         <>
//                           <option value="None">-None-</option>
//                           <option value="Amit Seth">Amit Seth</option>
//                           <option value="Danish Bindra">Danish Bindra</option>
//                           <option value="Tanushree Das">Tanushree Das</option>
//                           <option value="Tanmay Singh">Tanmay Singh</option>
//                           <option value="Prabhat Mohant">Prabhat Mohant</option>
//                         </>
//                       )}
//                     </select>
//                     <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                       <ChevronDown className="w-5 h-5 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4">
//                   <div>
//                     <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
//                     <div className="flex">
//                       <select
//                         id="title"
//                         value={formData.title}
//                         onChange={handleFormChange}
//                         className="w-24 p-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-6"
//                       >
//                         <option value="Mr.">Mr.</option>
//                         <option value="Mrs.">Mrs.</option>
//                         <option value="Ms.">Ms.</option>
//                         <option value="Dr.">Dr.</option>
//                         <option value="Prof.">Prof.</option>
//                       </select>
//                       <input
//                         id="firstName"
//                         type="text"
//                         value={formData.firstName}
//                         onChange={handleFormChange}
//                         className="flex-1 p-3 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                         placeholder="First Name"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
//                     <input
//                       id="lastName"
//                       type="text"
//                       value={formData.lastName}
//                       onChange={handleFormChange}
//                       className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       placeholder="Last Name"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
//                   <input
//                     id="mobile"
//                     type="text"
//                     value={formData.mobile}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Mobile Number"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Additional Seller Information Section */}
//             <div>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
//                   <input
//                     id="company"
//                     type="text"
//                     value={formData.company}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Company Name"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Id <span className="text-red-500">*</span></label>
//                   <input
//                     id="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Email Address"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-8">
//             <h3 className="text-lg font-semibold mb-4 text-gray-900">Seller Description</h3>
//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//               <textarea
//                 id="description"
//                 value={formData.description}
//                 onChange={handleFormChange}
//                 rows={4}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Enter lead description..."
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

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


// const Selleremployee = () => {
//   // Use your custom useAuth hook to get user and loading state
//   const { user: currentUser, loading: authLoading } = useAuth();

//   const [sellers, setSellers] = useState([]); // Will be populated from API
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

//   // Memoized function to fetch sellers from the backend
//   const fetchSellers = useCallback(async () => {
//     // Only attempt to fetch if authentication state has been resolved and user data is available
//     if (authLoading || !currentUser) {
//       // If still loading auth or no user, do not fetch sellers yet.
//       return;
//     }

//     try {
//       setLoading(true); // Start loading
//       console.log('Attempting to fetch sellers from:', `${API_BASE_URL}/seller`);
//       const response = await fetch(`${API_BASE_URL}/seller`);
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         // Fallback to initial sample data on API error
//         const fallbackData = (currentUser?.isLoggedIn && currentUser?.role === 'employee')
//           ? initialSampleSellers.filter(seller => seller.sellerOwner === currentUser.name)
//           : initialSampleSellers;
//         setSellers(fallbackData);
//         throw new Error(`Failed to fetch sellers: ${response.statusText}`);
//       }
//       const data = await response.json();
//       console.log('Sellers fetched successfully:', data);

//       // Apply client-side filtering based on logged-in user role
//       if (currentUser.isLoggedIn && currentUser.role === 'employee') {
//         const filteredData = data.filter(seller => seller.sellerOwner === currentUser.name);
//         setSellers(filteredData);
//         console.log(`Filtered sellers for employee ${currentUser.name}:`, filteredData);
//       } else {
//         // If admin, or not logged in, show all sellers
//         setSellers(data);
//         console.log('Displaying all sellers (Admin view or no user logged in).');
//       }
//     } catch (error) {
//       console.error('Error fetching sellers from backend:', error);
//       const fallbackData = (currentUser?.isLoggedIn && currentUser?.role === 'employee')
//         ? initialSampleSellers.filter(seller => seller.sellerOwner === currentUser.name)
//         : initialSampleSellers;
//       setSellers(fallbackData); // Fallback to sample data on error, with filter
//     } finally {
//       setLoading(false); // End loading in all cases
//     }
//   }, [currentUser, authLoading]); // Re-fetch when currentUser or authLoading changes

//   // Fetch sellers on component mount or when currentUser/authLoading changes
//   useEffect(() => {
//     fetchSellers();
//   }, [fetchSellers]);

//   const [formData, setFormData] = useState({
//     sellerOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None', // Pre-fill with current user if employee
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
//       // Reset form data for a new seller, pre-filling owner if employee
//       setFormData({
//         sellerOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
//         title: 'Mr.',
//         firstName: '',
//         lastName: '',
//         company: '',
//         mobile: '',
//         email: '',
//         description: ''
//       });
//     }
//   }, [editingSeller, currentUser]);


//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleCloseModal = () => {
//     setShowCreateForm(false);
//     setEditingSeller(null); // Clear editing seller when modal closes
//   };

//   // Helper to determine the actual seller owner for API payload
//   const getActualSellerOwner = () => {
//     if (currentUser?.isLoggedIn && currentUser?.role === 'employee') {
//       return currentUser.name; // Employee can only be their own owner
//     }
//     // For admin or if no user is logged in
//     return formData.sellerOwner === 'None' ? 'Amit Seth' : formData.sellerOwner; // Default to Amit Seth if "None" selected by admin
//   };

//   const handleCreateSeller = async () => {
//     if (!formData.firstName || !formData.lastName || !formData.email) {
//       alert('First Name, Last Name, and Email are required to create a seller.');
//       return;
//     }

//     try {
//       const newSellerData = {
//         ...formData,
//         sellerOwner: getActualSellerOwner(), // Use the helper to set the owner
//       };

//       console.log('Attempting to create seller with data:', newSellerData);
//       const response = await fetch(`${API_BASE_URL}/seller`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newSellerData),
//       });

//       console.log('Response status:', response.status);
//       const responseText = await response.text();
//       console.log('Raw response text:', responseText);

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

//       const createdSeller = JSON.parse(responseText);
//       console.log('Seller created successfully on backend:', createdSeller);
//       await fetchSellers(); // Re-fetch all sellers to update the table
//       handleCloseModal(); // Close the modal and reset form
//     } catch (error) {
//       console.error('Error creating seller:', error);
//       alert(`Failed to create seller: ${error.message}. Check console for details.`);
//     }
//   };

//   const handleSaveAndNew = async () => {
//     if (!formData.firstName || !formData.lastName || !formData.email) {
//       alert('First Name, Last Name, and Email are required to save and create a new seller.');
//       return;
//     }

//     try {
//       const newSellerData = {
//         ...formData,
//         sellerOwner: getActualSellerOwner(), // Use the helper to set the owner
//       };

//       console.log('Attempting to save and create new seller with data:', newSellerData);
//       const response = await fetch(`${API_BASE_URL}/seller`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newSellerData),
//       });

//       console.log('Response status:', response.status);
//       const responseText = await response.text();
//       console.log('Raw response text:', responseText);

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

//       const createdSeller = JSON.parse(responseText);
//       console.log('Seller saved and ready for new entry:', createdSeller);
//       await fetchSellers(); // Re-fetch all sellers to update the table
//       setFormData({ // Reset form for new entry, pre-filling owner if employee
//         sellerOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
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
//       alert(`Failed to save and create new seller: ${error.message}. Check console for details.`);
//     }
//   };

//   const handleUpdateSeller = async () => {
//     if (!editingSeller || !formData.firstName || !formData.lastName || !formData.email) {
//       alert('First Name, Last Name, Email, and a seller to edit are required for update.');
//       return;
//     }

//     try {
//       const updatedSellerData = {
//         ...formData,
//         sellerOwner: getActualSellerOwner(), // Ensure owner is correctly set for update payload
//       };
//       console.log(`Sending update data for seller ${editingSeller._id}:`, updatedSellerData);
//       const response = await fetch(`${API_BASE_URL}/seller/${editingSeller._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedSellerData),
//       });

//       console.log('Response status:', response.status);
//       const responseText = await response.text();
//       console.log('Raw response text:', responseText);

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

//       const updatedSeller = JSON.parse(responseText);
//       console.log('Seller updated successfully on backend:', updatedSeller);
//       await fetchSellers(); // Re-fetch all sellers to update the table
//       handleCloseModal(); // Close the modal and reset form
//     } catch (error) {
//       console.error('Error updating seller:', error);
//       alert(`Failed to update seller: ${error.message}. Check console for details.`);
//     }
//   };

//   // Function to show the confirmation modal for deletion
//   const confirmDeleteSeller = (sellerId, sellerOwner) => { // Pass sellerOwner for permission check
//     // Permission check for delete
//     const canDelete = currentUser?.isLoggedIn &&
//                       (currentUser?.role === 'admin' || (currentUser?.role === 'employee' && currentUser.name === sellerOwner));

//     if (!canDelete) {
//       alert("You do not have permission to delete this seller.");
//       return;
//     }

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

//       console.log('Response status:', response.status);
//       const responseText = await response.text();
//       console.log('Raw response text:', responseText);


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
//       alert(`Failed to delete seller: ${error.message}. Check console for details.`);
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

//   // Function to handle clicking on a seller name to view details (Employee path)
//   const handleSellerClick = (sellerId) => {
//     // For employee dashboard, perhaps navigate to a read-only view or simply do nothing
//     console.log(`Navigating to seller details for ID: ${sellerId} (Employee view - functionality not fully defined)`);
//     // Example: navigate(`/employee-dashboard/sellers/${sellerId}`); if you create a specific view
//   };


//   if (authLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
//         <div className="text-gray-600 text-lg">Loading authentication state...</div>
//       </div>
//     );
//   }

//   // Conditional rendering for the table rows
//   const renderSellersTableRows = () => {
//     if (sellers.length === 0 && !loading) {
//       return (
//         <tr>
//           <td colSpan="7" className="text-center py-12">
//             <div className="text-gray-500">
//               <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//               <p className="text-lg font-medium">No Lead found</p>
//               <p className="text-sm">Create your first Lead to get started</p>
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
//             {/* <button
//               onClick={() => {
//                 // Permission check for edit
//                 const canEdit = currentUser?.isLoggedIn &&
//                                 (currentUser?.role === 'admin' || (currentUser?.role === 'employee' && currentUser.name === seller.sellerOwner));
//                 if (!canEdit) {
//                   alert("You do not have permission to edit this seller.");
//                   return;
//                 }
//                 setEditingSeller(seller);
//                 setShowCreateForm(true);
//               }}
//               disabled={!(currentUser?.isLoggedIn && (currentUser?.role === 'admin' || (currentUser?.role === 'employee' && currentUser.name === seller.sellerOwner)))}
//               className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Edit Seller"
//             >
//               <Edit className="w-4 h-4" />
//             </button> */}
//             {/* <button
//               onClick={() => confirmDeleteSeller(seller._id, seller.sellerOwner)} // Pass sellerOwner for permission check
//               disabled={!(currentUser?.isLoggedIn && (currentUser?.role === 'admin' || (currentUser?.role === 'employee' && currentUser.name === seller.sellerOwner)))}
//               className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Delete Seller"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button> */}
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
//                 All Leads
//                 <ChevronDown className="w-4 h-4 ml-2" />
//               </button>
//               {showFilters && <FilterPanel setShowFilters={setShowFilters} />}
//             </div>
//             {/* Display logged-in user info */}
//             {currentUser?.isLoggedIn && (
//               <div className="text-gray-700 text-sm">
//                 <span className="font-medium">  </span>
//               </div>
//             )}
//             {!currentUser?.isLoggedIn && (
//               <div className="text-gray-500 text-sm">Not logged in.</div>
//             )}
//           </div>

//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => {
//                 setEditingSeller(null); // Ensure no seller is being edited when creating new
//                 setShowCreateForm(true);
//               }}
//               // Disable create button if not logged in
//               disabled={!currentUser?.isLoggedIn}
//               className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Create Lead
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
//                       <span>Company</span>
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
//                       <span>Mobile</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Lead Owner</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap"></th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="7" className="text-center py-12">
//                       <div className="text-gray-600 text-lg">Loading Leads...</div>
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
//           currentUser={currentUser} // Pass currentUser to modal
//         />
//       )}

//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <ConfirmationModal
//           message="Are you sure you want to delete this lead?"
//           onConfirm={executeDeleteSeller}
//           onCancel={cancelDeleteSeller}
//         />
//       )}
//     </div>
//   );
// };

// export default Selleremployee;



import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  Users, // For empty state icon
  Plus,
  Edit,   // Retained for Edit button
  Trash2, // Retained for Delete button
  // CheckCircle, // Removed for text buttons
  // XCircle // Removed for text buttons
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';

const initialSampleSellers = [
  { _id: 'sample1', firstName: 'Amit', lastName: 'Seth', company: 'Tech Corp', email: 'amitseth@team1consulting.com', mobile: '+919971556634', sellerOwner: 'Danish Bindra', title: 'Mr.', description: '', accountName: 'Tech Corp Account', leadStatus: 'Open' },
  { _id: 'sample2', firstName: 'Jane', lastName: 'Doe', company: 'Innovation Inc', email: 'jane.doe@example.com', mobile: '+919876543210', sellerOwner: 'Tanushree Das', title: 'Ms.', description: 'New potential client', accountName: 'Innovation Inc Account', leadStatus: 'Open' },
  { _id: 'sample3', firstName: 'Danish', lastName: 'Bindra', company: 'Global Solutions', email: 'danishbindra@team1consulting.com', mobile: '+917209805497', sellerOwner: 'Tanmay Singh', title: 'Mr.', description: 'Referred by partner', accountName: 'Global Solutions Account', leadStatus: 'Open' },
  { _id: 'sample4', firstName: 'Emily', lastName: 'White', company: 'StartupXYZ', email: 'emily.w@example.com', mobile: '+918765432109', sellerOwner: 'Prabhat Mohant', title: 'Mrs.', description: 'Interested in product demo', accountName: 'StartupXYZ Account', leadStatus: 'Open' },
  { _id: 'sample5', firstName: 'Michael', lastName: 'Brown', company: 'Enterprise Ltd', email: 'michael.b@example.com', mobile: '+916233455644', sellerOwner: 'Danish Bindra', title: 'Mr.', description: 'Existing client looking for upgrade', accountName: 'Enterprise Ltd Account', leadStatus: 'Open' }
];

const API_BASE_URL = 'http://localhost:3000/api';

// --- Custom Confirmation Modal Component ---
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

// --- CreateSellerModal Component (Integrated with useAuth for owner logic and new fields) ---
const CreateSellerModal = ({
  formData,
  handleFormChange,
  handleCloseModal,
  handleSaveAndNew,
  handleCreateSeller,
  handleUpdateSeller,
  editingSeller,
  currentUser,
  accountNames // Passed from parent for dropdown
}) => {
  const isSellerOwnerDisabled = currentUser?.isLoggedIn && currentUser?.role === 'employee';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-900">{editingSeller ? 'Edit Lead' : 'Create Lead'}</h2>
            <div className="flex space-x-3">
              <button
                onClick={handleCloseModal}
                className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
              >
                Cancel
              </button>
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
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Lead Information</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="sellerOwner" className="block text-sm font-medium text-gray-700 mb-1">Lead Owner</label>
                  <div className="relative">
                    <select
                      id="sellerOwner"
                      value={formData.sellerOwner}
                      onChange={handleFormChange}
                      className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10 ${isSellerOwnerDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                      disabled={isSellerOwnerDisabled}
                    >
                      {isSellerOwnerDisabled ? (
                        <option value={currentUser.name}>{currentUser.name}</option>
                      ) : (
                        <>
                          <option value="None">-None-</option>
                          <option value="Amit Seth">Amit Seth</option>
                          <option value="Danish Bindra">Danish Bindra</option>
                          <option value="Aveek Nayan">Aveek Nayan</option>
                          <option value="Tanmay Singh">Tanmay Singh</option>
                          <option value="Prabhat Mohant">Prabhat Mohant</option>
                        </>
                      )}
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

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Id</label> {/* REMOVED *: no longer mandatory */}
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Email Address"
                    // removed 'required' attribute
                  />
                </div>

                {/* Account Name dropdown (mandatory) */}
                <div>
                  <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">Account Name <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      id="accountName"
                      value={formData.accountName}
                      onChange={handleFormChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
                      required // Still mandatory
                    >
                      <option value="">- Select Account -</option>
                      {accountNames.map((account) => (
                        <option key={account._id} value={account.accountName}>{account.accountName}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Lead Description</h3>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleFormChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter lead description..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterPanel = ({ setShowFilters }) => (
  <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 font-sans">
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Filter Leads by</h3>
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


const Selleremployee = () => {
  const { user: currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [sellers, setSellers] = useState([]);
  const [selectedSellers, setSelectedSellers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editingSeller, setEditingSeller] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [sellerToDelete, setSellerToDelete] = useState(null);
  const [accountNames, setAccountNames] = useState([]); // State to store account names for dropdown

  // NEW: State for status dropdown visibility
  const [showStatusDropdownForId, setShowStatusDropdownForId] = useState(null);


  const [formData, setFormData] = useState({
    sellerOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
    title: 'Mr.',
    firstName: '',
    lastName: '',
    company: '',
    accountName: '', // Add accountName to formData
    mobile: '',
    email: '',
    description: '',
    leadStatus: 'Open' // Default lead status
  });

  // Effect to populate form data when editingSeller changes
  useEffect(() => {
    if (editingSeller) {
      setFormData({
        sellerOwner: editingSeller.sellerOwner || 'None',
        title: editingSeller.title || 'Mr.',
        firstName: editingSeller.firstName || '',
        lastName: editingSeller.lastName || '',
        company: editingSeller.company || '',
        accountName: editingSeller.accountName || '', // Populate accountName for editing
        mobile: editingSeller.mobile || '',
        email: editingSeller.email || '',
        description: editingSeller.description || '',
        leadStatus: editingSeller.leadStatus || 'Open' // Populate leadStatus for editing
      });
    } else {
      // Reset form data for a new seller, pre-filling owner if employee
      setFormData({
        sellerOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
        title: 'Mr.',
        firstName: '',
        lastName: '',
        company: '',
        accountName: '', // Reset accountName for new creation
        mobile: '',
        email: '',
        description: '',
        leadStatus: 'Open' // Reset to default for new creation
      });
    }
  }, [editingSeller, currentUser]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCloseModal = () => {
    setShowCreateForm(false);
    setEditingSeller(null);
  };

  const getActualSellerOwner = () => {
    if (currentUser?.isLoggedIn && currentUser?.role === 'employee') {
      return currentUser.name;
    }
    return formData.sellerOwner === 'None' ? 'Amit Seth' : formData.sellerOwner;
  };

  const handleCreateSeller = async () => {
    // UPDATED: Email is no longer mandatory here
    if (!formData.firstName || !formData.lastName || !formData.accountName) {
      alert('First Name, Last Name, and Account Name are required to create a lead.');
      return;
    }

    try {
      const newSellerData = {
        ...formData,
        sellerOwner: getActualSellerOwner(),
        email: formData.email === '' ? null : formData.email // Store empty string as null for sparse index
      };

      console.log('Attempting to create seller with data:', newSellerData);
      const response = await fetch(`${API_BASE_URL}/seller`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSellerData),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response text:', responseText);

      if (!response.ok) {
        let errorMessage = "Failed to create lead."; // Default generic message
        try {
          const errorData = JSON.parse(responseText);
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          console.error("Failed to parse error response as JSON:", parseError);
        }

        if (response.status === 409 && errorMessage.includes('email already exists')) {
            alert(`Failed to create lead: A lead with this email already exists. Please use a unique email address.`);
        } else {
            alert(`Failed to create lead: ${errorMessage}. Check console for details.`);
        }
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }

      const createdSeller = JSON.parse(responseText);
      console.log('Seller created successfully on backend:', createdSeller);
      await fetchSellers();
      handleCloseModal();
    } catch (error) {
      console.error('Error creating seller:', error);
    }
  };

  const handleSaveAndNew = async () => {
    // UPDATED: Email is no longer mandatory here
    if (!formData.firstName || !formData.lastName || !formData.accountName) {
      alert('First Name, Last Name, and Account Name are required to save and create a new lead.');
      return;
    }

    try {
      const newSellerData = {
        ...formData,
        sellerOwner: getActualSellerOwner(),
        email: formData.email === '' ? null : formData.email // Store empty string as null for sparse index
      };

      console.log('Attempting to save and create new seller with data:', newSellerData);
      const response = await fetch(`${API_BASE_URL}/seller`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSellerData),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response text:', responseText);

      if (!response.ok) {
        let errorMessage = "Failed to save and create new lead."; // Default generic message
        try {
          const errorData = JSON.parse(responseText);
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          console.error("Failed to parse error response as JSON:", parseError);
        }

        if (response.status === 409 && errorMessage.includes('email already exists')) {
            alert(`Failed to save and create new lead: A lead with this email already exists. Please use a unique email address.`);
        } else {
            alert(`Failed to save and create new lead: ${errorMessage}. Check console for details.`);
        }
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }

      const createdSeller = JSON.parse(responseText);
      console.log('Seller saved and ready for new entry:', createdSeller);
      await fetchSellers();
      setFormData({
        sellerOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
        title: 'Mr.',
        firstName: '',
        lastName: '',
        company: '',
        accountName: '',
        mobile: '',
        email: '',
        description: '',
        leadStatus: 'Open'
      });
      setEditingSeller(null);
    } catch (error) {
      console.error('Error saving and creating new seller:', error);
    }
  };

  const handleUpdateSeller = async () => {
    // UPDATED: Email is no longer mandatory here
    if (!editingSeller || !formData.firstName || !formData.lastName || !formData.accountName) {
      alert('First Name, Last Name, Account Name, and a lead to edit are required for update.');
      return;
    }

    try {
      const updatedSellerData = {
        ...formData,
        sellerOwner: getActualSellerOwner(),
        email: formData.email === '' ? null : formData.email // Store empty string as null for sparse index
      };
      console.log(`Sending update data for seller ${editingSeller._id}:`, updatedSellerData);
      const response = await fetch(`${API_BASE_URL}/seller/${editingSeller._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSellerData),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response text:', responseText);

      if (!response.ok) {
        let errorMessage = "Failed to update lead."; // Default generic message
        try {
          const errorData = JSON.parse(responseText);
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          console.error("Failed to parse error response as JSON:", parseError);
        }

        if (response.status === 409 && errorMessage.includes('email already exists')) {
            alert(`Failed to update lead: A lead with this email already exists. Please use a unique email address.`);
        } else {
            alert(`Failed to update lead: ${errorMessage}. Check console for details.`);
        }
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }

      const updatedSeller = JSON.parse(responseText);
      console.log('Seller updated successfully on backend:', updatedSeller);
      await fetchSellers();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating seller:', error);
    }
  };

  // Function to update leadStatus (Success/Failure)
  const handleUpdateLeadStatus = async (sellerId, newStatus) => {
    if (!currentUser?.isLoggedIn) {
      alert("You must be logged in to update lead status.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/seller/${sellerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leadStatus: newStatus }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update lead status: ${response.status} - ${errorText}`);
      }
      console.log(`Seller ${sellerId} status updated to ${newStatus}.`);
      await fetchSellers(); // Re-fetch to update UI
      setShowStatusDropdownForId(null); // Close dropdown after selection
    } catch (error) {
      console.error('Error updating lead status:', error);
      alert(`Failed to update lead status: ${error.message}`);
    }
  };

  // Function to show the confirmation modal for deletion
  const confirmDeleteSeller = (sellerId) => {
    if (!currentUser?.isLoggedIn) {
      alert("You must be logged in to delete this lead.");
      return;
    }
    setSellerToDelete(sellerId);
    setShowConfirmModal(true);
  };

  // Function to proceed with deletion after confirmation
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

  // Function to cancel deletion
  const cancelDeleteSeller = () => {
    setShowConfirmModal(false);
    setSellerToDelete(null);
  };

  // Handle click on edit icon
  const handleEditClick = (seller) => {
    if (!currentUser?.isLoggedIn) {
      alert("You must be logged in to edit this lead.");
      return;
    }
    if (seller.leadStatus === 'Failure') {
      alert("This lead has failed and cannot be edited.");
      return;
    }
    setEditingSeller(seller);
    setShowCreateForm(true);
  };

  // Function to toggle status dropdown
  const toggleStatusDropdown = (sellerId) => {
    if (!currentUser?.isLoggedIn) {
      alert("You must be logged in to change lead status.");
      return;
    }
    // If clicking the same button, close it. Otherwise, open for the clicked seller.
    setShowStatusDropdownForId(showStatusDropdownForId === sellerId ? null : sellerId);
  };


  // --- Fetch Sellers from Backend API ---
  const fetchSellers = useCallback(async () => {
    if (authLoading || !currentUser) {
      setLoading(false);
      setSellers([]);
      return;
    }

    try {
      setLoading(true);
      let url = `${API_BASE_URL}/seller`;

      if (currentUser.isLoggedIn && currentUser.role === 'employee') {
        url += `?sellerOwner=${encodeURIComponent(currentUser.name)}`;
        console.log(`Fetching sellers for employee: ${currentUser.name} from: ${url}`);
      } else {
        console.log('Fetching all sellers (Admin view or no specific user filter).');
      }

      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        throw new Error(`Failed to fetch sellers: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Sellers fetched successfully:', data);
      setSellers(data);

    } catch (error) {
      console.error('Error fetching sellers from backend:', error);
      const fallbackData = (currentUser?.isLoggedIn && currentUser?.role === 'employee')
        ? initialSampleSellers.filter(seller => seller.sellerOwner === currentUser.name)
        : initialSampleSellers;
      setSellers(fallbackData);
      console.log('Falling back to sample sellers due to fetch error, with user filter applied.');
    } finally {
      setLoading(false);
    }
  }, [currentUser, authLoading]);

  // Fetch Account Names for the dropdown
  const fetchAccountNames = useCallback(async () => {
    if (authLoading || !currentUser) {
      setAccountNames([]);
      return;
    }

    try {
      let url = `${API_BASE_URL}/account?status=approved`; // Only fetch approved accounts

      if (currentUser.isLoggedIn && currentUser.role === 'employee') {
        url += `&accountOwner=${encodeURIComponent(currentUser.name)}`;
        console.log(`Fetching approved accounts for dropdown, employee: ${currentUser.name}`);
      } else if (currentUser.isLoggedIn && currentUser.role === 'admin') {
        console.log('Fetching all approved accounts for dropdown (Admin view).');
      } else {
        setAccountNames([]);
        return;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch account names for dropdown');
      }
      let accountsData = await response.json();

      // Sort accounts alphabetically by accountName
      accountsData.sort((a, b) => a.accountName.localeCompare(b.accountName));
      setAccountNames(accountsData);

    } catch (error) {
      console.error('Error fetching account names for dropdown:', error);
      setAccountNames([]);
    }
  }, [currentUser, authLoading]);

  // Fetch sellers and account names on component mount or when currentUser/authLoading changes
  useEffect(() => {
    fetchSellers();
    fetchAccountNames();
  }, [fetchSellers, fetchAccountNames]);

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

  // If auth is still loading, show a general loading message
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
        <div className="text-gray-600 text-lg">Loading authentication state...</div>
      </div>
    );
  }

  // Show loading state for data fetching after auth is resolved
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
        <div className="text-gray-600 text-lg">Loading Leads...</div>
      </div>
    );
  }

  // Conditional rendering for the table rows
  const renderSellersTableRows = () => {
    if (sellers.length === 0 && !loading) {
      return (
        <tr>
          <td colSpan="7" className="text-center py-12"> {/* Updated colspan for 7 columns */}
            <div className="text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No Lead found</p>
              <p className="text-sm">Create your first Lead to get started</p>
            </div>
          </td>
        </tr>
      );
    }

    return sellers.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((seller) => (
      <tr key={seller._id} className={`hover:bg-gray-50 transition-colors ${seller.leadStatus === 'Failure' ? 'opacity-50 line-through text-gray-500' : ''}`}>
        <td className="px-6 py-4 w-12">
          <input
            type="checkbox"
            checked={selectedSellers.includes(seller._id)}
            onChange={() => toggleSellerSelection(seller._id)}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            disabled={seller.leadStatus === 'Failure'} // Disable selection for failed leads
          />
        </td>
        <td className="px-6 py-4 text-sm whitespace-nowrap">
          <span
            onClick={() => navigate(`/employee-dashboard/sellers/${seller._id}`)} // Navigate to seller detail page
            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
          >
            {seller.title} {seller.firstName} {seller.lastName}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{seller.company || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{seller.email || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{seller.mobile || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{seller.accountName || 'N/A'}</td> {/* Display Account Name */}
        <td className="px-6 py-4 text-sm whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleEditClick(seller)}
              disabled={!currentUser?.isLoggedIn || seller.leadStatus === 'Failure'}
              className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Edit Lead"
            >
              <Edit className="w-4 h-4" /> {/* Icon for Edit */}
            </button>
            <button
              onClick={() => confirmDeleteSeller(seller._id)}
              disabled={!currentUser?.isLoggedIn}
              className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Delete Lead"
            >
              <Trash2 className="w-4 h-4" /> {/* Icon for Delete */}
            </button>

            {/* Status Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => toggleStatusDropdown(seller._id)}
                disabled={!currentUser?.isLoggedIn || seller.leadStatus === 'Success' || seller.leadStatus === 'Failure'}
                className="flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Update Status"
              >
                Update Status <ChevronDown className="w-3 h-3 ml-1" />
              </button>
              {showStatusDropdownForId === seller._id && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-20">
                  <button
                    onClick={() => handleUpdateLeadStatus(seller._id, 'Success')}
                    className="block w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-100"
                    disabled={seller.leadStatus === 'Success' || seller.leadStatus === 'Failure'}
                  >
                    Success
                  </button>
                  <button
                    onClick={() => handleUpdateLeadStatus(seller._id, 'Failure')}
                    className="block w-full text-left px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-100"
                    disabled={seller.leadStatus === 'Success' || seller.leadStatus === 'Failure'}
                  >
                    Failure
                  </button>
                </div>
              )}
            </div>
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
                All Leads
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              {showFilters && <FilterPanel setShowFilters={setShowFilters} />}
            </div>
            {/* Display logged-in user info */}
            {currentUser?.isLoggedIn && (
              <div className="text-gray-700 text-sm">
                <span className="font-medium"></span>
              </div>
            )}
            {!currentUser?.isLoggedIn && (
              <div className="text-gray-500 text-sm">Not logged in.</div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setEditingSeller(null);
                setShowCreateForm(true);
              }}
              disabled={!currentUser?.isLoggedIn}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Lead
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
                <span>{startRecord}-{endRecord} of {sellers.length}</span>
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
                      <span>Account Name</span>
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
          currentUser={currentUser}
          accountNames={accountNames}
        />
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this lead? This action cannot be undone."
          onConfirm={executeDeleteSeller}
          onCancel={cancelDeleteSeller}
        />
      )}
    </div>
  );
};

export default Selleremployee;
