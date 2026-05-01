// import React, { useState, useEffect, useCallback, useContext } from 'react';
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
// // Path is relative from src/components/EmployeeDashboard/Contactemployee.jsx to src/context/AuthContext.jsx
// import { useAuth } from '../../context/authContext'; 

// // Define sample contacts (used as initial state and fallback, but real data comes from API)
// const initialSampleContacts = [
//   { _id: 'contact1', contactOwner: 'Amit Seth', title: 'Mr.', firstName: 'Parth', lastName: 'Sarthi', company: 'Acme Corp', mobile: '+917050768909', email: 'parthsarthi@acemcorp.com', description: 'Interested in new software solutions.' },
//   { _id: 'contact2', contactOwner: 'Danish Bindra', title: 'Ms.', firstName: 'Nitin', lastName: 'Gaurav', company: 'Globex Inc.', mobile: '+919263965404', email: 'nitingaurav@globexinc.com', description: 'Follow up on partnership inquiry.' },
//   { _id: 'contact3', contactOwner: 'Amit Seth', title: 'Dr.', firstName: 'Subhash', lastName: 'Kumar', company: 'Stark Industries', mobile: '+918789057711', email: 'subhashkumar@starkindustries.com', description: 'Meeting scheduled for product demo.' },
//   { _id: 'contact4', contactOwner: 'Danish Bindra', title: 'Mrs.', firstName: 'Danish', lastName: 'Khan', company: 'Wayne Enterprises', mobile: '+7209805497', email: 'danishkhan@wayneenterprises.com', description: 'Follow up on billing issue.' },
//   { _id: 'contact5', contactOwner: 'Prabhat Mohant', title: 'Mr.', firstName: 'Vishal', lastName: 'Kaushal', company: 'Cyberdyne Systems', mobile: '+916233455644', email: 'vishalkaushal@cyberdynesystems.com', description: 'Exploring AI integration possibilities.' }
// ];

// // Base URL for your backend API (ensure this matches your server's port)
// const API_BASE_URL = 'http://localhost:3000/api';

// // --- CreateContactModal Component (Integrated with useAuth for owner logic) ---
// const CreateContactModal = ({
//   formData,
//   handleFormChange,
//   handleCloseModal,
//   handleSaveAndNew,
//   handleCreateContact,
//   handleUpdateContact,
//   editingContact, // Determines if we are editing or creating
// }) => {
//   const { user: currentUser } = useAuth(); // Get current user from AuthContext

//   // Determine if contact owner field should be disabled
//   const isContactOwnerDisabled = currentUser?.isLoggedIn && currentUser?.role === 'employee';

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6 border-b pb-4">
//             <h2 className="text-2xl font-bold text-gray-900">{editingContact ? 'Edit Contact' : 'Create Contact'}</h2>
//             <div className="flex space-x-3">
//               <button
//                 onClick={handleCloseModal}
//                 className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
//               >
//                 Cancel
//               </button>
//               {/* Only show "Save and new" for create mode */}
//               {!editingContact && (
//                 <button
//                   onClick={handleSaveAndNew}
//                   className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm text-sm font-medium"
//                 >
//                   Save and new
//                 </button>
//               )}
//               <button
//                 onClick={editingContact ? handleUpdateContact : handleCreateContact}
//                 className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
//               >
//                 {editingContact ? 'Update' : 'Save'}
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Contact Information Section */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact Information</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="contactOwner" className="block text-sm font-medium text-gray-700 mb-1">Contact Owner</label>
//                   <div className="relative">
//                     <select
//                       id="contactOwner"
//                       value={formData.contactOwner}
//                       onChange={handleFormChange}
//                       className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10 ${isContactOwnerDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
//                       disabled={isContactOwnerDisabled} // Disable if a regular user is logged in
//                     >
//                       {isContactOwnerDisabled ? (
//                         // If disabled, only show the current user's name
//                         <option value={currentUser.name}>{currentUser.name}</option>
//                       ) : (
//                         // Otherwise, show all options
//                         <>
//                           <option value="None">-None-</option>
//                           <option value="Amit Seth">Amit Seth</option>
//                           <option value="Danish Bindra">Danish Bindra</option>
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

//             {/* Other Information Section */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-gray-900">Other Information</h3>
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
//                 <div>
//                   <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                   <textarea
//                     id="description"
//                     value={formData.description}
//                     onChange={handleFormChange}
//                     rows={6}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter contact description..."
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- FilterPanel Component (No changes from Contactmain.jsx) ---
// const FilterPanel = ({ setShowFilters }) => (
//   <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 font-sans">
//     <div className="p-4">
//       <div className="flex items-center justify-between mb-3">
//         <h3 className="font-semibold text-gray-900">Filter Contacts by</h3>
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


// // --- Main Contactemployee Component ---
// const Contactemployee = () => { 
//   // Use your custom useAuth hook to get user and loading state
//   const { user: currentUser, loading: authLoading } = useAuth(); 

//   const [contacts, setContacts] = useState([]); // Will be populated from API
//   const [selectedContacts, setSelectedContacts] = useState([]);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [recordsPerPage, setRecordsPerPage] = useState(100);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [editingContact, setEditingContact] = useState(null); // State for editing existing contacts

//   // --- Form Data State for Create/Edit ---
//   const [formData, setFormData] = useState({
//     contactOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None', // Pre-fill with current user if employee
//     title: 'Mr.',
//     firstName: '',
//     lastName: '',
//     company: '',
//     mobile: '',
//     email: '',
//     description: ''
//   });

//   // Effect to populate form data when editingContact changes (for edit mode)
//   useEffect(() => {
//     if (editingContact) {
//       setFormData({
//         contactOwner: editingContact.contactOwner || 'None',
//         title: editingContact.title || 'Mr.',
//         firstName: editingContact.firstName || '',
//         lastName: editingContact.lastName || '',
//         company: editingContact.company || '',
//         mobile: editingContact.mobile || '',
//         email: editingContact.email || '',
//         description: editingContact.description || ''
//       });
//     } else {
//       // Reset form data for a new contact (when opening Create form), pre-filling owner if employee
//       setFormData({
//         contactOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
//         title: 'Mr.',
//         firstName: '',
//         lastName: '',
//         company: '',
//         mobile: '',
//         email: '',
//         description: ''
//       });
//     }
//   }, [editingContact, currentUser]); // Dependency on currentUser to reset owner on login/logout


//   // --- Form Change Handler ---
//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   // Helper to determine the actual contact owner for API payload
//   const getActualContactOwner = () => {
//     if (currentUser?.isLoggedIn && currentUser?.role === 'employee') {
//       return currentUser.name; // Employee can only be their own owner
//     }
//     // For admin or if no user is logged in (though typically modal would be disabled)
//     // use selected value, defaulting if 'None' is chosen.
//     return formData.contactOwner === 'None' ? 'Amit Seth' : formData.contactOwner; // Default to Amit Seth if "None" selected by admin
//   };

//   // --- Modal Close Handler ---
//   const handleCloseModal = () => {
//     setShowCreateForm(false);
//     setEditingContact(null); // Clear editing contact when modal closes
//   };

//   // --- Create Contact Handler ---
//   const handleCreateContact = async () => {
//     // Basic frontend validation before sending to backend
//     if (!formData.firstName || !formData.lastName || !formData.email) {
//       alert('First Name, Last Name, and Email are required to create a contact.');
//       return;
//     }

//     try {
//       const newContactData = {
//         ...formData,
//         contactOwner: getActualContactOwner(), // Use the helper to set the owner
//       };
      
//       console.log('Attempting to create contact with data:', newContactData);
//       const response = await fetch(`${API_BASE_URL}/contact`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newContactData),
//       });

//       console.log('Response status for create:', response.status);
//       const responseText = await response.text();
//       console.log('Raw response text for create:', responseText);

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

//       // If response is OK, parse it as JSON
//       const createdContact = JSON.parse(responseText);
//       console.log('Contact created successfully on backend:', createdContact);
//       await fetchContacts(); // Re-fetch all contacts to update the table
//       handleCloseModal(); // Close the modal and reset form
//     } catch (error) {
//       console.error('Error creating contact:', error);
//       alert(`Failed to create contact: ${error.message}`);
//     }
//   };

//   // --- Save and New Contact Handler ---
//   const handleSaveAndNew = async () => {
//     if (!formData.firstName || !formData.lastName || !formData.email) {
//       alert('First Name, Last Name, and Email are required to save and create a new contact.');
//       return;
//     }

//     try {
//       const newContactData = {
//         ...formData,
//         contactOwner: getActualContactOwner(), // Use the helper to set the owner
//       };

//       console.log('Attempting to save and create new contact with data:', newContactData);
//       const response = await fetch(`${API_BASE_URL}/contact`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newContactData),
//       });

//       console.log('Response status for save and new:', response.status);
//       const responseText = await response.text();
//       console.log('Raw response text for save and new:', responseText);

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

//       const createdContact = JSON.parse(responseText);
//       console.log('Contact saved and ready for new entry:', createdContact);
//       await fetchContacts(); // Re-fetch all contacts to update the table
//       // Reset form but keep modal open, pre-filling owner if employee
//       setFormData({
//         contactOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
//         title: 'Mr.',
//         firstName: '',
//         lastName: '',
//         company: '',
//         mobile: '',
//         email: '',
//         description: ''
//       });
//       setEditingContact(null); // Ensure not in edit mode for the new entry
//     } catch (error) {
//       console.error('Error saving and creating new contact:', error);
//       alert(`Failed to save and create new contact: ${error.message}`);
//     }
//   };

//   // --- Update Contact Handler ---
//   const handleUpdateContact = async () => {
//     if (!editingContact || !formData.firstName || !formData.lastName || !formData.email) {
//       alert('First Name, Last Name, Email, and a contact to edit are required for update.');
//       return;
//     }

//     try {
//       const updatedContactData = {
//         ...formData,
//         contactOwner: getActualContactOwner(), // Use the helper to set the owner
//       };
//       console.log(`Sending update data for contact ${editingContact._id}:`, updatedContactData);
//       const response = await fetch(`${API_BASE_URL}/contact/${editingContact._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedContactData),
//       });

//       console.log('Response status for update:', response.status);
//       const responseText = await response.text();
//       console.log('Raw response text for update:', responseText);

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

//       const updatedContact = JSON.parse(responseText);
//       console.log('Contact updated successfully on backend:', updatedContact);
//       await fetchContacts(); // Re-fetch all contacts to update the table
//       handleCloseModal(); // Close the modal and reset form
//     } catch (error) {
//       console.error('Error updating contact:', error);
//       alert(`Failed to update contact: ${error.message}`);
//     }
//   };

//   // --- Delete Contact Handler ---
//   const handleDeleteContact = async (contactId, contactOwner) => {
//     // Permission check for delete
//     const canDelete = currentUser?.isLoggedIn && 
//                       (currentUser?.role === 'admin' || (currentUser?.role === 'employee' && currentUser.name === contactOwner));

//     if (!canDelete) {
//       alert("You do not have permission to delete this contact.");
//       return;
//     }

//     if (window.confirm('Are you sure you want to delete this contact?')) {
//       try {
//         console.log('Attempting to delete contact with ID:', contactId);
//         const response = await fetch(`${API_BASE_URL}/contact/${contactId}`, {
//           method: 'DELETE',
//         });

//         console.log('Response status for delete:', response.status);
//         const responseText = await response.text();
//         console.log('Raw response text for delete:', responseText);

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

//         console.log('Contact deleted successfully on backend:', contactId);
//         await fetchContacts(); // Re-fetch contacts to update the table
//       } catch (error) {
//         console.error('Error deleting contact:', error);
//         alert(`Failed to delete contact: ${error.message}`);
//       }
//     }
//   };

//   // Handle click on edit icon
//   const handleEditClick = (contact) => {
//     // Permission check for edit
//     const canEdit = currentUser?.isLoggedIn && 
//                     (currentUser?.role === 'admin' || (currentUser?.role === 'employee' && currentUser.name === contact.contactOwner));
    
//     if (!canEdit) {
//       alert("You do not have permission to edit this contact.");
//       return;
//     }
//     setEditingContact(contact); // Set the contact to be edited
//     setShowCreateForm(true); // Open the modal
//   };

//   // --- Fetch Contacts from Backend API ---
//   const fetchContacts = useCallback(async () => {
//     // Only attempt to fetch if authentication state has been resolved and user data is available
//     if (authLoading || !currentUser) {
//       // If still loading auth or no user, do not fetch contacts yet.
//       return; 
//     }

//     try {
//       setLoading(true);
//       console.log('Attempting to fetch all contacts from:', `${API_BASE_URL}/contact`);
//       const response = await fetch(`${API_BASE_URL}/contact`);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         throw new Error(`Failed to fetch contacts: ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log('Contacts fetched successfully:', data);

//       // Apply client-side filtering based on logged-in user role
//       if (currentUser.isLoggedIn && currentUser.role === 'employee') {
//         const filteredData = data.filter(contact => contact.contactOwner === currentUser.name);
//         setContacts(filteredData);
//         console.log(`Filtered contacts for employee ${currentUser.name}:`, filteredData);
//       } else {
//         // If admin, or not logged in, show all contacts (or a message for non-logged-in)
//         setContacts(data);
//         console.log('Displaying all contacts (Admin view or no user logged in).');
//       }
//     } catch (error) {
//       console.error('Error fetching contacts from backend:', error);
//       // Fallback to initial sample contacts if fetching fails or no data, applying user filter
//       const fallbackData = (currentUser?.isLoggedIn && currentUser?.role === 'employee')
//         ? initialSampleContacts.filter(contact => contact.contactOwner === currentUser.name)
//         : initialSampleContacts;
//       setContacts(fallbackData); 
//       console.log('Falling back to sample contacts due to fetch error or empty data, with user filter applied.');
//     } finally {
//       setLoading(false);
//     }
//   }, [currentUser, authLoading]); // Re-fetch when currentUser or authLoading changes

//   // Fetch contacts on component mount or when currentUser/authLoading changes
//   useEffect(() => {
//     fetchContacts();
//   }, [fetchContacts]);


//   const toggleContactSelection = (contactId) => {
//     setSelectedContacts(prev =>
//       prev.includes(contactId)
//         ? prev.filter(id => id !== contactId)
//         : [...prev, contactId]
//     );
//   };

//   const selectAllContacts = () => {
//     setSelectedContacts(selectedContacts.length > 0 && selectedContacts.length === contacts.length ? [] : contacts.map(contact => contact._id));
//   };

//   const totalPages = Math.ceil(contacts.length / recordsPerPage);
//   const startRecord = (currentPage - 1) * recordsPerPage + 1;
//   const endRecord = Math.min(currentPage * recordsPerPage, contacts.length);

//   // Show loading state if authentication is still in progress
//   if (authLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-gray-600 text-lg">Loading authentication state...</div>
//       </div>
//     );
//   }


//   // Conditional rendering for the table rows
//   const renderContactsTableRows = () => {
//     if (contacts.length === 0 && !loading) {
//       return (
//         <tr>
//           <td colSpan="7" className="text-center py-12"> {/* Updated colspan for 7 columns */}
//             <div className="text-gray-500">
//               <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//               <p className="text-lg font-medium">No contacts found</p>
//               <p className="text-sm">Create your first contact to get started</p>
//             </div>
//           </td>
//         </tr>
//       );
//     }

//     return contacts.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((contact) => (
//       // Use contact._id for key as it comes from MongoDB
//       <tr key={contact._id} className="hover:bg-gray-50 transition-colors">
//         <td className="px-6 py-4 w-12">
//           <input
//             type="checkbox"
//             checked={selectedContacts.includes(contact._id)}
//             onChange={() => toggleContactSelection(contact._id)}
//             className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//           />
//         </td>
//         {/* Display combined title, firstName, lastName as Contact Name */}
//         <td className="px-6 py-4 text-sm whitespace-nowrap">
//           <span className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium">
//             {contact.title} {contact.firstName} {contact.lastName}
//           </span>
//         </td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{contact.company || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{contact.email || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{contact.mobile || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{contact.contactOwner || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm whitespace-nowrap">
//           {/* <div className="flex items-center space-x-2"> */}
//             {/* <button
//               onClick={() => handleEditClick(contact)}
//               // Disable edit button if not admin AND not the owner of the contact
//               disabled={!(currentUser?.isLoggedIn && (currentUser?.role === 'admin' || (currentUser?.role === 'employee' && currentUser.name === contact.contactOwner)))}
//               className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Edit Contact"
//             >
//               <Edit className="w-4 h-4" />
//             </button> */}
//             {/* <button
//               onClick={() => handleDeleteContact(contact._id, contact.contactOwner)}
//               // Disable delete button if not admin AND not the owner of the contact
//               disabled={!(currentUser?.isLoggedIn && (currentUser?.role === 'admin' || (currentUser?.role === 'employee' && currentUser.name === contact.contactOwner)))}
//               className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Delete Contact"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button> */}
//           {/* </div> */}
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
//                 All Contacts
//                 <ChevronDown className="w-4 h-4 ml-2" />
//               </button>
//               {showFilters && <FilterPanel setShowFilters={setShowFilters} />}
//             </div>
//             {/* Display logged-in user info */}
//             {currentUser?.isLoggedIn && (
//               <div className="text-gray-700 text-sm">
//                 <span className="font-medium"></span>
//               </div>
//             )}
//             {!currentUser?.isLoggedIn && (
//               <div className="text-gray-500 text-sm">Not logged in.</div>
//             )}
//           </div>

//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => {
//                 setEditingContact(null); // Ensure no contact is being edited when clicking Create
//                 setShowCreateForm(true);
//               }}
//               // Disable create button if not logged in
//               disabled={!currentUser?.isLoggedIn}
//               className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Create Contact
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           {/* Table Header */}
//           <div className="flex items-center justify-between px-6 py-4 bg-indigo-700 text-white rounded-t-lg">
//             <span className="text-sm font-medium">Total Records {contacts.length}</span>
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
//                       checked={selectedContacts.length > 0 && selectedContacts.length === contacts.length}
//                       onChange={selectAllContacts}
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
//                       <span>Phone</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Contact Owner</span>
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
//                       <div className="text-gray-600 text-lg">Loading Contacts...</div>
//                     </td>
//                   </tr>
//                 ) : (
//                   renderContactsTableRows()
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Empty State */}
//           {contacts.length === 0 && !loading && (
//             <div className="text-center py-12">
//               <div className="text-gray-500">
//                 <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                 <p className="text-lg font-medium">No contacts found</p>
//                 <p className="text-sm">Create your first contact to get started</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Create/Edit Contact Modal */}
//       {showCreateForm && (
//         <CreateContactModal
//           formData={formData}
//           handleFormChange={handleFormChange}
//           handleCloseModal={handleCloseModal}
//           handleSaveAndNew={handleSaveAndNew}
//           handleCreateContact={handleCreateContact}
//           handleUpdateContact={handleUpdateContact}
//           editingContact={editingContact}
//         />
//       )}
//     </div>
//   );
// };

// export default Contactemployee;








import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  Plus,
  Users, // For empty state icon
  Edit, // For edit icon
  Trash2 // For delete icon
} from 'lucide-react';

// Import your custom useAuth hook
import { useAuth } from '../../context/AuthContext';

// Define sample contacts (used as initial state and fallback, but real data comes from API)
const initialSampleContacts = [
  { _id: 'contact1', contactOwner: 'Amit Seth', title: 'Mr.', firstName: 'Parth', lastName: 'Sarthi', company: 'Acme Corp', mobile: '+917050768909', email: 'parthsarthi@acemcorp.com', description: 'Interested in new software solutions.', accountName: 'Acme Corp' },
  { _id: 'contact2', contactOwner: 'Danish Bindra', title: 'Ms.', firstName: 'Nitin', lastName: 'Gaurav', company: 'Globex Inc.', mobile: '+919263965404', email: 'nitingaurav@globexinc.com', description: 'Follow up on partnership inquiry.', accountName: 'Globex Inc.' },
  { _id: 'contact3', contactOwner: 'Amit Seth', title: 'Dr.', firstName: 'Subhash', lastName: 'Kumar', company: 'Stark Industries', mobile: '+918789057711', email: 'subhashkumar@starkindustries.com', description: 'Meeting scheduled for product demo.', accountName: 'Stark Industries' },
  { _id: 'contact4', contactOwner: 'Danish Bindra', title: 'Mrs.', firstName: 'Danish', lastName: 'Khan', company: 'Wayne Enterprises', mobile: '+7209805497', email: 'danishkhan@wayneenterprises.com', description: 'Follow up on billing issue.', accountName: 'Wayne Enterprises' },
  { _id: 'contact5', contactOwner: 'Prabhat Mohant', title: 'Mr.', firstName: 'Vishal', lastName: 'Kaushal', company: 'Cyberdyne Systems', mobile: '+916233455644', email: 'vishalkaushal@cyberdynesystems.com', description: 'Exploring AI integration possibilities.', accountName: 'Cyberdyne Systems' }
];

// Base URL for your backend API (ensure this matches your server's port)
const API_BASE_URL = 'http://localhost:3000/api';

// --- Custom Confirmation Modal Component (Reused) ---
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

// --- CreateContactModal Component (Integrated with useAuth for owner logic) ---
const CreateContactModal = ({
  formData,
  handleFormChange,
  handleCloseModal,
  handleSaveAndNew,
  handleCreateContact,
  handleUpdateContact,
  editingContact, // Determines if we are editing or creating
  accountNames // NEW PROP: List of filtered account names
}) => {
  const { user: currentUser } = useAuth(); // Get current user from AuthContext

  // Determine if contact owner field should be disabled
  // It should be disabled for employees, but editable for admins
  const isContactOwnerDisabled = currentUser?.isLoggedIn && currentUser?.role === 'employee';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-900">{editingContact ? 'Edit Contact' : 'Create Contact'}</h2>
            <div className="flex space-x-3">
              <button
                onClick={handleCloseModal}
                className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
              >
                Cancel
              </button>
              {/* Only show "Save and new" for create mode */}
              {!editingContact && (
                <button
                  onClick={handleSaveAndNew}
                  className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm text-sm font-medium"
                >
                  Save and new
                </button>
              )}
              <button
                onClick={editingContact ? handleUpdateContact : handleCreateContact}
                className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
              >
                {editingContact ? 'Update' : 'Save'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="contactOwner" className="block text-sm font-medium text-gray-700 mb-1">Contact Owner</label>
                  <div className="relative">
                    <select
                      id="contactOwner"
                      value={formData.contactOwner}
                      onChange={handleFormChange}
                      className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10 ${isContactOwnerDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                      disabled={isContactOwnerDisabled} // Disable if a regular user is logged in
                    >
                      {isContactOwnerDisabled ? (
                        // If disabled (employee), only show the current user's name
                        <option value={currentUser.name}>{currentUser.name}</option>
                      ) : (
                        // Otherwise (admin), show all options
                        <>
                          <option value="None">-None-</option>
                          <option value="Amit Seth">Amit Seth</option>
                          <option value="Danish Bindra">Danish Bindra</option>
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

            {/* Other Information Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Other Information</h3>
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Id <span className="text-red-500">*</span></label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Email Address"
                    required
                  />
                </div>
                {/* NEW: Account Name dropdown */}
               <div>
                    <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">
                      Account Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="accountName"
                        name="accountName"
                        value={formData.accountName}
                        onChange={handleFormChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
                      >
                        <option value="">- Select Account -</option>
                        {accountNames.map((account) => (
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
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter contact description..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- FilterPanel Component (No changes from Contactmain.jsx) ---
const FilterPanel = ({ setShowFilters }) => (
  <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 font-sans">
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Filter Contacts by</h3>
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


// --- Main Contactemployee Component ---
const Contactemployee = () => {
  const { user: currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const [contacts, setContacts] = useState([]); // Will be populated from API
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editingContact, setEditingContact] = useState(null); // State for editing existing contacts
  const [accountNames, setAccountNames] = useState([]); // NEW STATE: To store account names for the dropdown

  // States for delete confirmation modal
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [contactToDeleteId, setContactToDeleteId] = useState(null);
  const [contactToDeleteOwner, setContactToDeleteOwner] = useState(null);


  // --- Form Data State for Create/Edit ---
  const [formData, setFormData] = useState({
    contactOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None', // Pre-fill with current user if employee
    title: 'Mr.',
    firstName: '',
    lastName: '',
    company: '',
    accountName: '', // NEW: Added accountName to form data
    mobile: '',
    email: '',
    description: ''
  });

  // Effect to populate form data when editingContact changes (for edit mode)
  useEffect(() => {
    if (editingContact) {
      setFormData({
        contactOwner: editingContact.contactOwner || 'None',
        title: editingContact.title || 'Mr.',
        firstName: editingContact.firstName || '',
        lastName: editingContact.lastName || '',
        company: editingContact.company || '',
        accountName: editingContact.accountName || '', // Populate accountName for editing
        mobile: editingContact.mobile || '',
        email: editingContact.email || '',
        description: editingContact.description || ''
      });
    } else {
      // Reset form data for a new contact (when opening Create form), pre-filling owner if employee
      setFormData({
        contactOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
        title: 'Mr.',
        firstName: '',
        lastName: '',
        company: '',
        accountName: '', // Reset accountName for new creation
        mobile: '',
        email: '',
        description: ''
      });
    }
  }, [editingContact, currentUser]); // Dependency on currentUser to reset owner on login/logout


  // --- Form Change Handler ---
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Helper to determine the actual contact owner for API payload
  const getActualContactOwner = () => {
    if (currentUser?.isLoggedIn && currentUser?.role === 'employee') {
      return currentUser.name; // Employee can only be their own owner
    }
    // For admin or if no user is logged in (though typically modal would be disabled)
    // use selected value, defaulting if 'None' is chosen.
    return formData.contactOwner === 'None' ? 'Amit Seth' : formData.contactOwner; // Default to Amit Seth if "None" selected by admin
  };

  // --- Modal Close Handler ---
  const handleCloseModal = () => {
    setShowCreateForm(false);
    setEditingContact(null); // Clear editing contact when modal closes
  };

  // --- Create Contact Handler ---
  const handleCreateContact = async () => {
    // Basic frontend validation before sending to backend
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('First Name, Last Name, and Email are required to create a contact.');
      return;
    }

    try {
      const newContactData = {
        ...formData,
        contactOwner: getActualContactOwner(), // Use the helper to set the owner
      };

      console.log('Attempting to create contact with data:', newContactData);
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContactData),
      });

      console.log('Response status for create:', response.status);
      const responseText = await response.text();
      console.log('Raw response text for create:', responseText);

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

      // If response is OK, parse it as JSON
      const createdContact = JSON.parse(responseText);
      console.log('Contact created successfully on backend:', createdContact);
      await fetchContacts(); // Re-fetch all contacts to update the table
      handleCloseModal(); // Close the modal and reset form
    } catch (error) {
      console.error('Error creating contact:', error);
      alert(`Failed to create contact: ${error.message}`);
    }
  };

  // --- Save and New Contact Handler ---
  const handleSaveAndNew = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('First Name, Last Name, and Email are required to save and create a new contact.');
      return;
    }

    try {
      const newContactData = {
        ...formData,
        contactOwner: getActualContactOwner(), // Use the helper to set the owner
      };

      console.log('Attempting to save and create new contact with data:', newContactData);
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContactData),
      });

      console.log('Response status for save and new:', response.status);
      const responseText = await response.text();
      console.log('Raw response text for save and new:', responseText);

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

      const createdContact = JSON.parse(responseText);
      console.log('Contact saved and ready for new entry:', createdContact);
      await fetchContacts(); // Re-fetch all contacts to update the table
      // Reset form but keep modal open, pre-filling owner if employee
      setFormData({
        contactOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
        title: 'Mr.',
        firstName: '',
        lastName: '',
        company: '',
        accountName: '', // Reset accountName for new creation
        mobile: '',
        email: '',
        description: ''
      });
      setEditingContact(null); // Ensure not in edit mode for the new entry
    } catch (error) {
      console.error('Error saving and creating new contact:', error);
      alert(`Failed to save and create new contact: ${error.message}`);
    }
  };

  // --- Update Contact Handler ---
  const handleUpdateContact = async () => {
    if (!editingContact || !formData.firstName || !formData.lastName || !formData.email) {
      alert('First Name, Last Name, Email, and a contact to edit are required for update.');
      return;
    }

    try {
      const updatedContactData = {
        ...formData,
        contactOwner: getActualContactOwner(), // Use the helper to set the owner
      };
      console.log(`Sending update data for contact ${editingContact._id}:`, updatedContactData);
      const response = await fetch(`${API_BASE_URL}/contact/${editingContact._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContactData),
      });

      console.log('Response status for update:', response.status);
      const responseText = await response.text();
      console.log('Raw response text for update:', responseText);

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

      const updatedContact = JSON.parse(responseText);
      console.log('Contact updated successfully on backend:', updatedContact);
      await fetchContacts(); // Re-fetch all contacts to update the table
      handleCloseModal(); // Close the modal and reset form
    } catch (error) {
      console.error('Error updating contact:', error);
      alert(`Failed to update contact: ${error.message}`);
    }
  };

  // --- Delete Contact Confirmation Trigger ---
  const confirmDeleteContact = (contactId, contactOwner) => {
    // Current permission check for delete
    // To enable for ALL logged-in users, we simplify this.
    if (!currentUser?.isLoggedIn) { // Only check if user is logged in
        alert("You must be logged in to delete this contact.");
        return;
    }

    setContactToDeleteId(contactId);
    setContactToDeleteOwner(contactOwner); // Store owner for the confirmation message
    setShowDeleteConfirmModal(true);
  };

  // --- Execute Delete Contact Handler (after confirmation) ---
  const executeDeleteContact = async () => {
    if (!contactToDeleteId) return; // Should not happen if modal is properly managed

    setShowDeleteConfirmModal(false); // Close the confirmation modal

    try {
      console.log('Attempting to delete contact with ID:', contactToDeleteId);
      const response = await fetch(`${API_BASE_URL}/contact/${contactToDeleteId}`, {
        method: 'DELETE',
      });

      console.log('Response status for delete:', response.status);
      const responseText = await response.text();
      console.log('Raw response text for delete:', responseText);

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

      console.log('Contact deleted successfully on backend:', contactToDeleteId);
      await fetchContacts(); // Re-fetch contacts to update the table
      setContactToDeleteId(null); // Clear the stored ID
      setContactToDeleteOwner(null); // Clear the stored owner
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert(`Failed to delete contact: ${error.message}`);
    }
  };

  // --- Cancel Delete Contact Handler ---
  const cancelDeleteContact = () => {
    setShowDeleteConfirmModal(false);
    setContactToDeleteId(null);
    setContactToDeleteOwner(null);
  };

  // Handle click on edit icon
  const handleEditClick = (contact) => {
    // Current permission check for edit
    // To enable for ALL logged-in users, we simplify this.
    if (!currentUser?.isLoggedIn) { // Only check if user is logged in
        alert("You must be logged in to edit this contact.");
        return;
    }
    setEditingContact(contact); // Set the contact to be edited
    setShowCreateForm(true); // Open the modal
  };

  // --- Fetch Contacts from Backend API ---
  const fetchContacts = useCallback(async () => {
    // Only attempt to fetch if authentication state has been resolved and user data is available
    if (authLoading || !currentUser) {
      setLoading(false); // Stop loading if auth is not ready
      setContacts([]); // Clear contacts
      return;
    }

    try {
      setLoading(true);
      let url = `${API_BASE_URL}/contact`; // Base URL for contacts

      // If employee, filter contacts by their ownership
      if (currentUser.isLoggedIn && currentUser.role === 'employee') {
        url += `?contactOwner=${encodeURIComponent(currentUser.name)}`;
        console.log(`Fetching contacts for employee: ${currentUser.name} from: ${url}`);
      } else if (currentUser.isLoggedIn && currentUser.role === 'admin') {
        // If admin, fetch all contacts (no specific owner filter)
        console.log('Fetching all contacts (Admin view).');
      } else {
        // If not logged in, no contacts to show
        setContacts([]);
        setLoading(false);
        return;
      }

      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        throw new Error(`Failed to fetch contacts: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Contacts fetched successfully:', data);
      setContacts(data); // Set contacts regardless of role, as filtering is done by backend now

    } catch (error) {
      console.error('Error fetching contacts from backend:', error);
      // Fallback to initial sample contacts if fetching fails, applying user filter
      const fallbackData = (currentUser?.isLoggedIn && currentUser?.role === 'employee')
        ? initialSampleContacts.filter(contact => contact.contactOwner === currentUser.name)
        : initialSampleContacts; // For admin, show all sample data if backend fails
      setContacts(fallbackData);
      console.log('Falling back to sample contacts due to fetch error, with user filter applied.');
    } finally {
      setLoading(false);
    }
  }, [currentUser, authLoading]); // Re-fetch when currentUser or authLoading changes

  // NEW: Fetch Account Names for the dropdown
  const fetchAccountNames = useCallback(async () => {
    if (authLoading || !currentUser) {
      setAccountNames([]); // Clear accounts if user not ready or not logged in
      return;
    }

    try {
      let url = `${API_BASE_URL}/account?status=approved`; // Only fetch approved accounts

      // If employee, filter by their owned accounts (assuming accountOwner in Account model)
      if (currentUser.isLoggedIn && currentUser.role === 'employee') {
        url += `&accountOwner=${encodeURIComponent(currentUser.name)}`;
        console.log(`Fetching approved accounts for dropdown, employee: ${currentUser.name}`);
      } else if (currentUser.isLoggedIn && currentUser.role === 'admin') {
        // Admins can see all approved accounts for contact creation
        console.log('Fetching all approved accounts for dropdown (Admin view).');
      } else {
        setAccountNames([]); // If not logged in, no accounts to show in dropdown
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
      setAccountNames([]); // Fallback to empty array on error
    }
  }, [currentUser, authLoading]);

  // Fetch contacts and account names on component mount or when currentUser/authLoading changes
  useEffect(() => {
    fetchContacts();
    fetchAccountNames(); // Fetch account names here
  }, [fetchContacts, fetchAccountNames]);


  const toggleContactSelection = (contactId) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const selectAllContacts = () => {
    setSelectedContacts(selectedContacts.length > 0 && selectedContacts.length === contacts.length ? [] : contacts.map(contact => contact._id));
  };

  const totalPages = Math.ceil(contacts.length / recordsPerPage);
  const startRecord = (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, contacts.length);

  // Show loading state if authentication is still in progress
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600 text-lg">Loading authentication state...</div>
      </div>
    );
  }

  // Show loading state for data fetching after auth is resolved
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
        <div className="text-gray-600 text-lg">Loading Contacts...</div>
      </div>
    );
  }

  // Conditional rendering for the table rows
  const renderContactsTableRows = () => {
    if (contacts.length === 0 && !loading) {
      return (
        <tr>
          <td colSpan="8" className="text-center py-12"> {/* Updated colspan for 8 columns now */}
            <div className="text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No contacts found</p>
              <p className="text-sm">Create your first contact to get started</p>
            </div>
          </td>
        </tr>
      );
    }

    return contacts.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((contact) => (
      // Use contact._id for key as it comes from MongoDB
      <tr key={contact._id} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 w-12">
          <input
            type="checkbox"
            checked={selectedContacts.includes(contact._id)}
            onChange={() => toggleContactSelection(contact._id)}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </td>
        {/* Display combined title, firstName, lastName as Contact Name */}
        <td className="px-6 py-4 text-sm whitespace-nowrap">
          <span
            onClick={() => navigate(`/employee-dashboard/contacts/${contact._id}`)} // Navigate to the new detail page
            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
          >
            {contact.title} {contact.firstName} {contact.lastName}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{contact.company || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{contact.email || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{contact.mobile || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{contact.accountName || 'N/A'}</td> {/* Display Account Name */}
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{contact.contactOwner || 'N/A'}</td>
        <td className="px-6 py-4 text-sm whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleEditClick(contact)}
              // Enabled if logged in
              disabled={!currentUser?.isLoggedIn}
              className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Edit Contact"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => confirmDeleteContact(contact._id, contact.contactOwner)} // Use the new confirmation trigger
              // Enabled if logged in
              disabled={!currentUser?.isLoggedIn}
              className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Delete Contact"
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
                My Contacts {/* Changed from All Contacts */}
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
                setEditingContact(null); // Ensure no contact is being edited when clicking Create
                setShowCreateForm(true);
              }}
              // Disable create button if not logged in
              disabled={!currentUser?.isLoggedIn}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Contact
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Table Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-indigo-700 text-white rounded-t-lg">
            <span className="text-sm font-medium">Total Records {contacts.length}</span>
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
                <span>{startRecord}-{endRecord} of {contacts.length}</span>
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
                      checked={selectedContacts.length > 0 && selectedContacts.length === contacts.length}
                      onChange={selectAllContacts}
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
                      <span>Phone</span>
                      <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>Account Name</span> {/* NEW Column Header */}
                      <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>Contact Owner</span>
                      <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-12">
                      <div className="text-gray-600 text-lg">Loading Contacts...</div>
                    </td>
                  </tr>
                ) : (
                  renderContactsTableRows()
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create/Edit Contact Modal */}
      {showCreateForm && (
        <CreateContactModal
          formData={formData}
          handleFormChange={handleFormChange}
          handleCloseModal={handleCloseModal}
          handleSaveAndNew={handleSaveAndNew}
          handleCreateContact={handleCreateContact}
          handleUpdateContact={handleUpdateContact}
          editingContact={editingContact}
          accountNames={accountNames} // Pass account names to modal
        />
      )}

      {/* Confirmation Modal for Delete */}
      {showDeleteConfirmModal && (
        <ConfirmationModal
          message={`Are you sure you want to delete this contact? This action cannot be undone.`}
          onConfirm={executeDeleteContact}
          onCancel={cancelDeleteContact}
        />
      )}
    </div>
  );
};

export default Contactemployee;
