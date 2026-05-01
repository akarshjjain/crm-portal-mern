
// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
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

// const initialSampleContacts = [
//   { _id: 'contact1', contactOwner: 'Amit Seth', title: 'Mr.', firstName: 'Parth', lastName: 'Sarthi', company: 'Acme Corp', mobile: '+917050768909', email: 'parthsarthi@acemcorp.com', description: 'Interested in new software solutions.', accountName: 'Acme Corp' },
//   { _id: 'contact2', contactOwner: 'Danish Bindra', title: 'Ms.', firstName: 'Nitin', lastName: 'Gaurav', company: 'Globex Inc.', mobile: '+919263965404', email: 'nitingaurav@globexinc.com', description: 'Follow up on partnership inquiry.', accountName: 'Globex Inc.' },
//   { _id: 'contact3', contactOwner: 'Amit Seth', title: 'Dr.', firstName: 'Subhash', lastName: 'Kumar', company: 'Stark Industries', mobile: '+918789057711', email: 'subhashkumar@starkindustries.com', description: 'Meeting scheduled for product demo.', accountName: 'Stark Industries' },
// ];

// const API_BASE_URL = 'http://localhost:3000/api';

// const CreateContactModal = ({
//   formData,
//   handleFormChange,
//   handleCloseModal,
//   handleSaveAndNew,
//   handleCreateContact,
//   handleUpdateContact,
//   editingContact,
//   accountNames,
// }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-lg w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-6 border-b pb-4">
//           <h2 className="text-2xl font-bold text-gray-900">{editingContact ? 'Edit Contact' : 'Create Contact'}</h2>
//           <div className="flex space-x-3">
//             <button
//               onClick={handleCloseModal}
//               className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
//             >
//               Cancel
//             </button>
//             {!editingContact && (
//               <button
//                 onClick={handleSaveAndNew}
//                 className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm text-sm font-medium"
//               >
//                 Save and new
//               </button>
//             )}
//             <button
//               onClick={editingContact ? handleUpdateContact : handleCreateContact}
//               className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
//             >
//               {editingContact ? 'Update' : 'Save'}
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact Information</h3>
//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="contactOwner" className="block text-sm font-medium text-gray-700 mb-1">Contact Owner</label>
//                 <div className="relative">
//                   <select
//                     id="contactOwner"
//                     value={formData.contactOwner}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                   >
//                     <option value="None">-None-</option>
//                     <option value="Amit Seth">Amit Seth</option>
//                     <option value="Danish Bindra">Danish Bindra</option>
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

//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-gray-900">Other Information</h3>
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
//                <div>
//                     <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">
//                       Account Name <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <select
//                         id="accountName"
//                         name="accountName"
//                         value={formData.accountName}
//                         onChange={handleFormChange}
//                         required
//                         className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                       >
//                         <option value="">-None-</option>
//                         {accountNames.map((name) => (
//                           <option key={name} value={name}>{name}</option>
//                         ))}
//                       </select>
//                       <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                         <ChevronDown className="w-5 h-5 text-gray-400" />
//                       </div>
//                     </div>
//                   </div>

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
//               <div>
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   id="description"
//                   value={formData.description}
//                   onChange={handleFormChange}
//                   rows={3}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Enter contact description..."
//                 />
//               </div>
//             </div>
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


// const Contactmain = () => {
//   const navigate = useNavigate();
//   const [contacts, setContacts] = useState([]);
//   const [selectedContacts, setSelectedContacts] = useState([]);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [recordsPerPage, setRecordsPerPage] = useState(100);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [editingContact, setEditingContact] = useState(null);
//   const [accountNames, setAccountNames] = useState([]);

//   const API_BASE_URL = 'http://localhost:3000/api';

//   const fetchContacts = useCallback(async () => {
//     try {
//       setLoading(true);
//       console.log('Attempting to fetch contacts from:', `${API_BASE_URL}/contact`);
//       const response = await fetch(`${API_BASE_URL}/contact`);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         throw new Error(`Failed to fetch contacts: ${response.statusText}`);
//       }

//       const data = await response.json();
//       setContacts(data);
//       console.log('Contacts fetched successfully:', data);
//     } catch (error) {
//       console.error('Error fetching contacts from backend:', error);
//       setContacts(initialSampleContacts);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const fetchAccountNames = useCallback(async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/account`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch account names');
//       }
//       const data = await response.json();
//       const names = [...new Set(data.map(acc => acc.accountName).filter(Boolean))];
//       setAccountNames(names);
//       console.log('Account names fetched for dropdown:', names);
//     } catch (error) {
//       console.error('Error fetching account names for dropdown:', error);
//       setAccountNames(['Sample Account 1', 'Sample Account 2']);
//     }
//   }, []);

//   useEffect(() => {
//     fetchContacts();
//     fetchAccountNames();
//   }, [fetchContacts, fetchAccountNames]);

//   const [formData, setFormData] = useState({
//     contactOwner: 'None',
//     title: 'Mr.',
//     firstName: '',
//     lastName: '',
//     company: '',
//     accountName: '',
//     mobile: '',
//     email: '',
//     description: ''
//   });

//   useEffect(() => {
//     if (editingContact) {
//       setFormData({
//         contactOwner: editingContact.contactOwner || 'None',
//         title: editingContact.title || 'Mr.',
//         firstName: editingContact.firstName || '',
//         lastName: editingContact.lastName || '',
//         company: editingContact.company || '',
//         accountName: editingContact.accountName || '',
//         mobile: editingContact.mobile || '',
//         email: editingContact.email || '',
//         description: editingContact.description || ''
//       });
//     } else {
//       setFormData({
//         contactOwner: 'None',
//         title: 'Mr.',
//         firstName: '',
//         lastName: '',
//         company: '',
//         accountName: '',
//         mobile: '',
//         email: '',
//         description: ''
//       });
//     }
//   }, [editingContact]);

//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleCloseModal = () => {
//     setShowCreateForm(false);
//     setEditingContact(null);
//   };

//   const handleCreateContact = async () => {
//     if (!formData.firstName || !formData.lastName || !formData.email) {
//       console.warn('First Name, Last Name, and Email are required to create a contact.');
//       return;
//     }

//     try {
//       console.log('Attempting to create contact with data:', formData);
//       const response = await fetch(`${API_BASE_URL}/contact`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
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

//       const createdContact = JSON.parse(responseText);
//       console.log('Contact created successfully on backend:', createdContact);
//       await fetchContacts();
//       handleCloseModal();
//     } catch (error) {
//       console.error('Error creating contact:', error);
//       alert(`Failed to create contact: ${error.message}`);
//     }
//   };

//   const handleSaveAndNew = async () => {
//     if (!formData.firstName || !formData.lastName || !formData.email) {
//       console.warn('First Name, Last Name, and Email are required to save and create a new contact.');
//       return;
//     }

//     try {
//       console.log('Attempting to save and create new contact with data:', formData);
//       const response = await fetch(`${API_BASE_URL}/contact`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
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
//       await fetchContacts();
//       setFormData({
//         contactOwner: 'None',
//         title: 'Mr.',
//         firstName: '',
//         lastName: '',
//         company: '',
//         accountName: '',
//         mobile: '',
//         email: '',
//         description: ''
//       });
//       setEditingContact(null);
//     } catch (error) {
//       console.error('Error saving and creating new contact:', error);
//       alert(`Failed to save and create new contact: ${error.message}`);
//     }
//   };

//   const handleUpdateContact = async () => {
//     if (!editingContact || !formData.firstName || !formData.lastName || !formData.email) {
//       console.warn('First Name, Last Name, Email, and a contact to edit are required for update.');
//       return;
//     }

//     try {
//       console.log(`Sending update data for contact ${editingContact._id}:`, formData);
//       const response = await fetch(`${API_BASE_URL}/contact/${editingContact._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
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
//       await fetchContacts();
//       handleCloseModal();
//     } catch (error) {
//       console.error('Error updating contact:', error);
//       alert(`Failed to update contact: ${error.message}`);
//     }
//   };

//   const handleDeleteContact = async (contactId) => {
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
//         await fetchContacts();
//       } catch (error) {
//         console.error('Error deleting contact:', error);
//         alert(`Failed to delete contact: ${error.message}`);
//       }
//     }
//   };


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


//   const renderContactsTableRows = () => {
//     if (contacts.length === 0 && !loading) {
//       return (
//         <tr>
//           <td colSpan="7" className="text-center py-12">
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
//       <tr key={contact._id} className="hover:bg-gray-50 transition-colors">
//         <td className="px-6 py-4 w-12">
//           <input
//             type="checkbox"
//             checked={selectedContacts.includes(contact._id)}
//             onChange={() => toggleContactSelection(contact._id)}
//             className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//           />
//         </td>
//         <td className="px-6 py-4 text-sm whitespace-nowrap">
//           <span
//             onClick={() => navigate(`/admin-dashboard/contacts/${contact._id}`)} // This needs to match App.jsx's nested path
//             className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
//           >
//             {contact.title} {contact.firstName} {contact.lastName}
//           </span>
//         </td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{contact.company || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{contact.email || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{contact.mobile || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{contact.contactOwner || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm whitespace-nowrap">
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => {
//                 setEditingContact(contact);
//                 setShowCreateForm(true);
//               }}
//               className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
//               title="Edit Contact"
//             >
//               <Edit className="w-4 h-4" />
//             </button>
//             <button
//               onClick={() => handleDeleteContact(contact._id)}
//               className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
//               title="Delete Contact"
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
//           </div>

//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => {
//                 setEditingContact(null);
//                 setShowCreateForm(true);
//               }}
//               className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Create Contact
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th>
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

//       {showCreateForm && (
//         <CreateContactModal
//           formData={formData}
//           handleFormChange={handleFormChange}
//           handleCloseModal={handleCloseModal}
//           handleSaveAndNew={handleSaveAndNew}
//           handleCreateContact={handleCreateContact}
//           handleUpdateContact={handleUpdateContact}
//           editingContact={editingContact}
//           accountNames={accountNames}
//         />
//       )}
//     </div>
//   );
// };

// export default Contactmain;


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
  Users,
  Edit,
  Trash2
} from 'lucide-react';

const initialSampleContacts = [
  { _id: 'contact1', contactOwner: 'Amit Seth', title: 'Mr.', firstName: 'Parth', lastName: 'Sarthi', company: 'Acme Corp', mobile: '+917050768909', email: 'parthsarthi@acemcorp.com', description: 'Interested in new software solutions.', accountName: 'Acme Corp' },
  { _id: 'contact2', contactOwner: 'Danish Bindra', title: 'Ms.', firstName: 'Nitin', lastName: 'Gaurav', company: 'Globex Inc.', mobile: '+919263965404', email: 'nitingaurav@globexinc.com', description: 'Follow up on partnership inquiry.', accountName: 'Globex Inc.' },
  { _id: 'contact3', contactOwner: 'Amit Seth', title: 'Dr.', firstName: 'Subhash', lastName: 'Kumar', company: 'Stark Industries', mobile: '+918789057711', email: 'subhashkumar@starkindustries.com', description: 'Meeting scheduled for product demo.', accountName: 'Stark Industries' },
];

const API_BASE_URL = 'http://localhost:3000/api';

const CreateContactModal = ({
  formData,
  handleFormChange,
  handleCloseModal,
  handleSaveAndNew,
  handleCreateContact,
  handleUpdateContact,
  editingContact,
  accountNames, // Prop to receive unique account names
}) => (
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
                  >
                    <option value="None">-None-</option>
                    <option value="Amit Seth">Amit Seth</option>
                    <option value="Danish Bindra">Danish Bindra</option>
                    <option value="Tanmay Singh">Tanmay Singh</option>
                    <option value="Prabhat Mohant">Prabhat Mohant</option>
                    <option value="Aveek Nayan">Aveek Nayan</option>
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
                        <option value="">-None-</option>
                        {[...accountNames].sort().map((name) => (
                          <option key={name} value={name}>{name}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
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
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={3}
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


const Contactmain = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editingContact, setEditingContact] = useState(null);
  const [accountNames, setAccountNames] = useState([]);

  const API_BASE_URL = 'http://localhost:3000/api';

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Attempting to fetch contacts from:', `${API_BASE_URL}/contact`);
      const response = await fetch(`${API_BASE_URL}/contact`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        throw new Error(`Failed to fetch contacts: ${response.statusText}`);
      }

      const data = await response.json();
      setContacts(data);
      console.log('Contacts fetched successfully:', data);
    } catch (error) {
      console.error('Error fetching contacts from backend:', error);
      setContacts(initialSampleContacts);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAccountNames = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/account`);
      if (!response.ok) {
        throw new Error('Failed to fetch account names');
      }
      const data = await response.json();
      // Extract unique account names and filter out any empty/null ones
      const names = [...new Set(data.map(acc => acc.accountName).filter(Boolean))];
      setAccountNames(names); // Store unsorted names, sorting happens in CreateContactModal render
      console.log('Account names fetched for dropdown:', names);
    } catch (error) {
      console.error('Error fetching account names for dropdown:', error);
      setAccountNames(['Sample Account 1', 'Sample Account 2']);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
    fetchAccountNames();
  }, [fetchContacts, fetchAccountNames]);

  const [formData, setFormData] = useState({
    contactOwner: 'None',
    title: 'Mr.',
    firstName: '',
    lastName: '',
    company: '',
    accountName: '',
    mobile: '',
    email: '',
    description: ''
  });

  useEffect(() => {
    if (editingContact) {
      setFormData({
        contactOwner: editingContact.contactOwner || 'None',
        title: editingContact.title || 'Mr.',
        firstName: editingContact.firstName || '',
        lastName: editingContact.lastName || '',
        company: editingContact.company || '',
        accountName: editingContact.accountName || '',
        mobile: editingContact.mobile || '',
        email: editingContact.email || '',
        description: editingContact.description || ''
      });
    } else {
      setFormData({
        contactOwner: 'None',
        title: 'Mr.',
        firstName: '',
        lastName: '',
        company: '',
        accountName: '',
        mobile: '',
        email: '',
        description: ''
      });
    }
  }, [editingContact]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCloseModal = () => {
    setShowCreateForm(false);
    setEditingContact(null);
  };

  const handleCreateContact = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      console.warn('First Name, Last Name, and Email are required to create a contact.');
      return;
    }

    try {
      console.log('Attempting to create contact with data:', formData);
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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

      const createdContact = JSON.parse(responseText);
      console.log('Contact created successfully on backend:', createdContact);
      await fetchContacts();
      handleCloseModal();
    } catch (error) {
      console.error('Error creating contact:', error);
      alert(`Failed to create contact: ${error.message}`);
    }
  };

  const handleSaveAndNew = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      console.warn('First Name, Last Name, and Email are required to save and create a new contact.');
      return;
    }

    try {
      console.log('Attempting to save and create new contact with data:', formData);
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
      await fetchContacts();
      setFormData({
        contactOwner: 'None',
        title: 'Mr.',
        firstName: '',
        lastName: '',
        company: '',
        accountName: '',
        mobile: '',
        email: '',
        description: ''
      });
      setEditingContact(null);
    } catch (error) {
      console.error('Error saving and creating new contact:', error);
      alert(`Failed to save and create new contact: ${error.message}`);
    }
  };

  const handleUpdateContact = async () => {
    if (!editingContact || !formData.firstName || !formData.lastName || !formData.email) {
      console.warn('First Name, Last Name, Email, and a contact to edit are required for update.');
      return;
    }

    try {
      console.log(`Sending update data for contact ${editingContact._id}:`, formData);
      const response = await fetch(`${API_BASE_URL}/contact/${editingContact._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
      await fetchContacts();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating contact:', error);
      alert(`Failed to update contact: ${error.message}`);
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        console.log('Attempting to delete contact with ID:', contactId);
        const response = await fetch(`${API_BASE_URL}/contact/${contactId}`, {
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

        console.log('Contact deleted successfully on backend:', contactId);
        await fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert(`Failed to delete contact: ${error.message}`);
      }
    }
  };


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


  const renderContactsTableRows = () => {
    if (contacts.length === 0 && !loading) {
      return (
        <tr>
          <td colSpan="7" className="text-center py-12">
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
      <tr key={contact._id} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 w-12">
          <input
            type="checkbox"
            checked={selectedContacts.includes(contact._id)}
            onChange={() => toggleContactSelection(contact._id)}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </td>
        <td className="px-6 py-4 text-sm whitespace-nowrap">
          <span
            onClick={() => navigate(`/admin-dashboard/contacts/${contact._id}`)}
            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
          >
            {contact.title} {contact.firstName} {contact.lastName}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{contact.company || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{contact.email || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{contact.mobile || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{contact.contactOwner || 'N/A'}</td>
        <td className="px-6 py-4 text-sm whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setEditingContact(contact);
                setShowCreateForm(true);
              }}
              className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
              title="Edit Contact"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDeleteContact(contact._id)}
              className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
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
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
              >
                <Filter className="w-4 h-4 mr-2" />
                All Contacts
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              {showFilters && <FilterPanel setShowFilters={setShowFilters} />}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setEditingContact(null);
                setShowCreateForm(true);
              }}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Contact
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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
                    <td colSpan="7" className="text-center py-12">
                      <div className="text-gray-600 text-lg">Loading Contacts...</div>
                    </td>
                  </tr>
                ) : (
                  renderContactsTableRows()
                )}
              </tbody>
            </table>
          </div>

          {contacts.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No contacts found</p>
                <p className="text-sm">Create your first contact to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showCreateForm && (
        <CreateContactModal
          formData={formData}
          handleFormChange={handleFormChange}
          handleCloseModal={handleCloseModal}
          handleSaveAndNew={handleSaveAndNew}
          handleCreateContact={handleCreateContact}
          handleUpdateContact={handleUpdateContact}
          editingContact={editingContact}
          accountNames={accountNames}
        />
      )}
    </div>
  );
};

export default Contactmain;
