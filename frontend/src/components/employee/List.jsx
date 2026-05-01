// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Filter,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   X,
//   Search,
//   Plus,
//   Users // For empty state icon
// } from 'lucide-react';

// // Define sample accounts OUTSIDE the component to ensure its reference is stable.
// const initialSampleAccounts = [
//   { _id: 'sample1', accountName: 'Havells India', accountType: 'Partner', industry: 'Technology', phone: '+919269462745', email: 'contact@havellsindia.com', accountOwner: 'Amit Seth', billingAddress: '123 Tech Lane', billingState: 'CA', billingCountry: 'India' },
//   { _id: 'sample2', accountName: 'CMS Infotech', accountType: 'Customer', industry: 'Manufacturing', phone: '+918869464342', email: 'info@cmsinfotech.net', accountOwner: 'Danish Bindra', billingAddress: '456 Industrial Blvd', billingState: 'NY', billingCountry: 'India' },
//   { _id: 'sample3', accountName: 'NHPC', accountType: 'Reseller', industry: 'Aerospace', phone: '+972269462747', email: 'sales@nhpc.com', accountOwner: 'Amit Seth', billingAddress: '789 Iron Street', billingState: 'CA', billingCountry: 'India' },
//   { _id: 'sample4', accountName: 'Radiansys', accountType: 'Prospect', industry: 'Conglomerate', phone: '+919969462745', email: 'support@radiansys.org', accountOwner: 'Danish Bindra', billingAddress: '1000 Gotham Ave', billingState: 'NY', billingCountry: 'India' },
//   { _id: 'sample5', accountName: 'Jaypee Hospital', accountType: 'Customer', industry: 'Health', phone: '+919769462742', email: 'sales@jaypeehospital.in', accountOwner: 'Prabhat Mohant', billingAddress: '900 Skynet Rd', billingState: 'TX', billingCountry: 'India' }
// ];

// const List = () => {
//   const [accounts, setAccounts] = useState([]);
//   const [selectedAccounts, setSelectedAccounts] = useState([]);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [recordsPerPage, setRecordsPerPage] = useState(100);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState(''); // Retained for display in UI

//   // Base URL for your backend API
//   const API_BASE_URL = 'http://localhost:3000/api'; // Ensure this matches your backend server URL

//   // Memoized function to fetch accounts from the backend
//   const fetchAccounts = useCallback(async () => {
//     try {
//       setLoading(true); // Set loading to true at the start of fetch
//       console.log('Attempting to fetch accounts from:', `${API_BASE_URL}/account`);
//       const response = await fetch(`${API_BASE_URL}/account`);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         throw new Error(`Failed to fetch accounts: ${response.statusText}`);
//       }

//       const data = await response.json();
//       setAccounts(data);
//       console.log('Accounts fetched successfully:', data);
//     } catch (error) {
//       console.error('Error fetching accounts from backend:', error);
//       // Fallback to sample data if backend fetch fails
//       setAccounts(initialSampleAccounts);
//     } finally {
//       // Ensure loading is set to false in all cases (success or failure)
//       setLoading(false);
//     }
//   }, [initialSampleAccounts]); // Added initialSampleAccounts to dependencies for useCallback for thoroughness, though it's stable.

//   // Fetch accounts on component mount
//   useEffect(() => {
//     fetchAccounts();
//   }, [fetchAccounts]);

//   const [formData, setFormData] = useState({
//     accountOwner: 'None',
//     accountName: '',
//     accountType: '',
//     industry: '',
//     billingAddress: '',
//     billingState: '',
//     billingCountry: '',
//     phone: '',
//     email: ''
//   });

//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleCreateAccount = async () => {
//     if (!formData.accountName) {
//       console.warn('Account Name is required to create an account.');
//       return;
//     }

//     try {
//       const newAccountData = {
//         accountName: formData.accountName,
//         accountOwner: formData.accountOwner === 'None' ? 'Danish Bindra' : formData.accountOwner,
//         accountType: formData.accountType,
//         industry: formData.industry,
//         billingAddress: formData.billingAddress,
//         billingState: formData.billingState,
//         billingCountry: formData.billingCountry,
//         phone: formData.phone,
//         email: formData.email,
//       };

//       console.log('Sending new account data:', newAccountData);
//       const response = await fetch(`${API_BASE_URL}/account`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newAccountData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       const createdAccount = await response.json();
//       console.log('Account created successfully on backend:', createdAccount);
//       await fetchAccounts(); // Re-fetch all accounts to update the table
//       setFormData({ // Reset form
//         accountOwner: 'None',
//         accountName: '',
//         accountType: '',
//         industry: '',
//         billingAddress: '',
//         billingState: '',
//         billingCountry: '',
//         phone: '',
//         email: ''
//       });
//       setShowCreateForm(false); // Close the modal
//     } catch (error) {
//       console.error('Error creating account:', error);
//       // Display a user-friendly error message if needed
//     }
//   };

//   const handleSaveAndNew = async () => {
//     if (!formData.accountName) {
//       console.warn('Account Name is required to save and create a new account.');
//       return;
//     }

//     try {
//       const newAccountData = {
//         accountName: formData.accountName,
//         accountOwner: formData.accountOwner === 'None' ? 'Danish Bindra' : formData.accountOwner,
//         accountType: formData.accountType,
//         industry: formData.industry,
//         billingAddress: formData.billingAddress,
//         billingState: formData.billingState,
//         billingCountry: formData.billingCountry,
//         phone: formData.phone,
//         email: formData.email,
//       };

//       console.log('Saving and creating new account with data:', newAccountData);
//       const response = await fetch(`${API_BASE_URL}/account`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newAccountData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       const createdAccount = await response.json();
//       console.log('Account saved and ready for new entry:', createdAccount);
//       await fetchAccounts(); // Re-fetch all accounts to update the table
//       setFormData({ // Reset form for new entry
//         accountOwner: 'None',
//         accountName: '',
//         accountType: '',
//         industry: '',
//         billingAddress: '',
//         billingState: '',
//         billingCountry: '',
//         phone: '',
//         email: ''
//       });
//       // Keep form open for new entry
//     } catch (error) {
//       console.error('Error saving and creating new account:', error);
//       // Display a user-friendly error message if needed
//     }
//   };

//   const toggleAccountSelection = (accountId) => {
//     setSelectedAccounts(prev =>
//       prev.includes(accountId)
//         ? prev.filter(id => id !== accountId)
//         : [...prev, accountId]
//     );
//   };

//   const selectAllAccounts = () => {
//     setSelectedAccounts(selectedAccounts.length > 0 && selectedAccounts.length === accounts.length ? [] : accounts.map(account => account._id));
//   };

//   const CreateAccountModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6 border-b pb-4">
//             <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
//             <div className="flex space-x-3">
//               <button
//                 onClick={() => setShowCreateForm(false)}
//                 className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveAndNew}
//                 className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm text-sm font-medium"
//               >
//                 Save and new
//               </button>
//               <button
//                 onClick={handleCreateAccount}
//                 className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
//               >
//                 Save
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Account Information Section */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-gray-900">Account Information</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="accountOwner" className="block text-sm font-medium text-gray-700 mb-1">Account Owner</label>
//                   <div className="relative">
//                     <select
//                       id="accountOwner"
//                       value={formData.accountOwner}
//                       onChange={handleFormChange}
//                       className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                     >
//                       <option value="None">-None-</option>
//                       <option value="Amit Seth">Amit Seth</option>
//                       <option value="Danish Bindra">Danish Bindra</option>
//                     </select>
//                     <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                       <ChevronDown className="w-5 h-5 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">Account Name <span className="text-red-500">*</span></label>
//                   <input
//                     id="accountName"
//                     type="text"
//                     value={formData.accountName}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Account Name"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
//                   <div className="relative">
//                     <select
//                       id="accountType"
//                       value={formData.accountType}
//                       onChange={handleFormChange}
//                       className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                     >
//                       <option value="">-None-</option>
//                       <option value="Analyst">Analyst</option>
//                       <option value="Competitor">Competitor</option>
//                       <option value="Customer">Customer</option>
//                       <option value="Distributor">Distributor</option>
//                       <option value="Integrator">Integrator</option>
//                       <option value="Investor">Investor</option>
//                       <option value="Other">Other</option>
//                       <option value="Partner">Partner</option>
//                       <option value="Prospect">Prospect</option>
//                       <option value="Reseller">Reseller</option>
//                       <option value="Supplier">Supplier</option>
//                       <option value="Vendor">Vendor</option>
//                     </select>
//                     <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                       <ChevronDown className="w-5 h-5 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
//                   <input
//                     id="industry"
//                     type="text"
//                     value={formData.industry}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Industry"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                   <input
//                     id="phone"
//                     type="text"
//                     value={formData.phone}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Phone Number"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Id</label>
//                   <input
//                     id="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Email Address"
//                   />
//                 </div>

//               </div>
//             </div>

//             {/* Address Information Section */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-gray-900">Address Information</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
//                   <textarea
//                     id="billingAddress"
//                     value={formData.billingAddress}
//                     onChange={handleFormChange}
//                     rows={3}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Billing Address"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="billingState" className="block text-sm font-medium text-gray-700 mb-1">Billing State</label>
//                   <input
//                     id="billingState"
//                     type="text"
//                     value={formData.billingState}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Billing State"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="billingCountry" className="block text-sm font-medium text-gray-700 mb-1">Billing Country</label>
//                   <input
//                     id="billingCountry"
//                     type="text"
//                     value={formData.billingCountry}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Billing Country"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const FilterPanel = () => (
//     <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 font-sans">
//       <div className="p-4">
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="font-semibold text-gray-900">Filter Accounts by</h3>
//           <button
//             onClick={() => setShowFilters(false)}
//             className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
//             aria-label="Close filters"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//         <div className="space-y-3">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//             />
//           </div>
//           <div className="pt-2">
//             <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
//               <ChevronRight className="w-4 h-4 text-gray-600" />
//               <span className="text-sm text-gray-700">System Defined Filters</span>
//             </div>
//             <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
//               <ChevronRight className="w-4 h-4 text-gray-600" />
//               <span className="text-sm text-gray-700">Filters by Fields</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const totalPages = Math.ceil(accounts.length / recordsPerPage);
//   const startRecord = (currentPage - 1) * recordsPerPage + 1;
//   const endRecord = Math.min(currentPage * recordsPerPage, accounts.length);

//   // Conditional rendering for the table
//   const renderAccountsTable = () => {
//     if (accounts.length === 0 && !loading) {
//       return (
//         <tr>
//           <td colSpan="7" className="text-center py-12">
//             <div className="text-gray-500">
//               <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//               <p className="text-lg font-medium">No accounts found</p>
//               <p className="text-sm">Create your first account to get started</p>
//             </div>
//           </td>
//         </tr>
//       );
//     }

//     return accounts.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((account) => (
//       <tr key={account._id} className="hover:bg-gray-50 transition-colors">
//         <td className="px-6 py-4 w-12">
//           <input
//             type="checkbox"
//             checked={selectedAccounts.includes(account._id)}
//             onChange={() => toggleAccountSelection(account._id)}
//             className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//           />
//         </td>
//         <td className="px-6 py-4 text-sm whitespace-nowrap">
//           <span className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium">
//             {account.accountName}
//           </span>
//         </td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.accountType || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.industry || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.phone || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.email || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.accountOwner || 'N/A'}</td>
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
//                 All Accounts
//                 <ChevronDown className="w-4 h-4 ml-2" />
//               </button>
//               {showFilters && <FilterPanel />}
//             </div>
//             {userId && (
//               <div className="text-gray-700 text-sm"> <span className="font-medium">{userId}</span></div>
//             )}
//           </div>

//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => setShowCreateForm(true)}
//               className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Create Account
//             </button>
//             <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium">
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
//             <span className="text-sm font-medium">Total Records {accounts.length}</span>
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
//                       checked={selectedAccounts.length > 0 && selectedAccounts.length === accounts.length}
//                       onChange={selectAllAccounts}
//                       className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                     />
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Account Name</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Account Type</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Industry</span>
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
//                       <span>Email</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Account Owner</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {renderAccountsTable()} {/* Use the new helper function here */}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Create Account Modal */}
//       {showCreateForm && <CreateAccountModal />}
//     </div>
//   );
// };

// export default List;









// import React, { useState, useEffect, useCallback } from 'react';
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

// // Define sample accounts OUTSIDE the component to ensure its reference is stable.
// const initialSampleAccounts = [
//   { _id: 'sample1', accountName: 'Havells India', accountType: 'Partner', industry: 'Technology', phone: '+919269462745', email: 'contact@havellsindia.com', accountOwner: 'Amit Seth', billingAddress: '123 Tech Lane', billingState: 'CA', billingCountry: 'India' },
//   { _id: 'sample2', accountName: 'CMS Infotech', accountType: 'Customer', industry: 'Manufacturing', phone: '+918869464342', email: 'info@cmsinfotech.net', accountOwner: 'Danish Bindra', billingAddress: '456 Industrial Blvd', billingState: 'NY', billingCountry: 'India' },
//   { _id: 'sample3', accountName: 'NHPC', accountType: 'Reseller', industry: 'Aerospace', phone: '+972269462747', email: 'sales@nhpc.com', accountOwner: 'Amit Seth', billingAddress: '789 Iron Street', billingState: 'CA', billingCountry: 'India' },
//   { _id: 'sample4', accountName: 'Radiansys', accountType: 'Prospect', industry: 'Conglomerate', phone: '+919969462745', email: 'support@radiansys.org', accountOwner: 'Danish Bindra', billingAddress: '1000 Gotham Ave', billingState: 'NY', billingCountry: 'India' },
//   { _id: 'sample5', accountName: 'Jaypee Hospital', accountType: 'Customer', industry: 'Health', phone: '+919769462742', email: 'sales@jaypeehospital.in', accountOwner: 'Prabhat Mohant', billingAddress: '900 Skynet Rd', billingState: 'TX', billingCountry: 'India' }
// ];

// const List = () => {
//   const [accounts, setAccounts] = useState([]);
//   const [selectedAccounts, setSelectedAccounts] = useState([]);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [recordsPerPage, setRecordsPerPage] = useState(100);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState('example-user-id');
//   const [editingAccount, setEditingAccount] = useState(null); // State to hold account being edited

//   // Base URL for your backend API
//   const API_BASE_URL = 'http://localhost:3000/api';

//   // Memoized function to fetch accounts from the backend
//   const fetchAccounts = useCallback(async () => {
//     try {
//       setLoading(true);
//       console.log('Attempting to fetch accounts from:', `${API_BASE_URL}/account`);
//       const response = await fetch(`${API_BASE_URL}/account`);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         throw new Error(`Failed to fetch accounts: ${response.statusText}`);
//       }

//       const data = await response.json();
//       setAccounts(data);
//       console.log('Accounts fetched successfully:', data);
//     } catch (error) {
//       console.error('Error fetching accounts from backend:', error);
//       setAccounts(initialSampleAccounts); // Fallback to sample data
//     } finally {
//       setLoading(false);
//     }
//   }, []); // Dependencies empty, as initialSampleAccounts is now stable outside.

//   useEffect(() => {
//     fetchAccounts();
//   }, [fetchAccounts]);

//   // FormData state for create/edit operations
//   const [formData, setFormData] = useState({
//     accountOwner: 'None',
//     accountName: '',
//     accountType: '',
//     industry: '',
//     billingAddress: '',
//     billingState: '',
//     billingCountry: '',
//     phone: '',
//     email: ''
//   });

//   // Effect to populate form data when editingAccount changes
//   useEffect(() => {
//     if (editingAccount) {
//       setFormData({
//         accountOwner: editingAccount.accountOwner || 'None',
//         accountName: editingAccount.accountName || '',
//         accountType: editingAccount.accountType || '',
//         industry: editingAccount.industry || '',
//         billingAddress: editingAccount.billingAddress || '',
//         billingState: editingAccount.billingState || '',
//         billingCountry: editingAccount.billingCountry || '',
//         phone: editingAccount.phone || '',
//         email: editingAccount.email || ''
//       });
//     } else {
//       // Reset form when not editing (e.g., closing modal or starting new create)
//       setFormData({
//         accountOwner: 'None',
//         accountName: '',
//         accountType: '',
//         industry: '',
//         billingAddress: '',
//         billingState: '',
//         billingCountry: '',
//         phone: '',
//         email: ''
//       });
//     }
//   }, [editingAccount]);

//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleCloseModal = () => {
//     setShowCreateForm(false);
//     setEditingAccount(null); // Clear editing account when modal is closed
//   };

//   const handleCreateAccount = async () => {
//     if (!formData.accountName) {
//       console.warn('Account Name is required to create an account.');
//       return;
//     }

//     try {
//       const newAccountData = {
//         accountName: formData.accountName,
//         accountOwner: formData.accountOwner === 'None' ? 'Danish Bindra' : formData.accountOwner,
//         accountType: formData.accountType,
//         industry: formData.industry,
//         billingAddress: formData.billingAddress,
//         billingState: formData.billingState,
//         billingCountry: formData.billingCountry,
//         phone: formData.phone,
//         email: formData.email,
//       };

//       console.log('Sending new account data:', newAccountData);
//       const response = await fetch(`${API_BASE_URL}/account`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newAccountData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       const createdAccount = await response.json();
//       console.log('Account created successfully on backend:', createdAccount);
//       await fetchAccounts();
//       handleCloseModal(); // Close the modal and reset form
//     } catch (error) {
//       console.error('Error creating account:', error);
//       // Display a user-friendly error message if needed
//     }
//   };

//   const handleUpdateAccount = async () => {
//     if (!editingAccount || !formData.accountName) {
//       console.warn('Account Name and an account to edit are required for update.');
//       return;
//     }

//     try {
//       const updatedAccountData = {
//         accountOwner: formData.accountOwner === 'None' ? 'Danish Bindra' : formData.accountOwner,
//         accountName: formData.accountName,
//         accountType: formData.accountType,
//         industry: formData.industry,
//         billingAddress: formData.billingAddress,
//         billingState: formData.billingState,
//         billingCountry: formData.billingCountry,
//         phone: formData.phone,
//         email: formData.email,
//       };

//       console.log(`Sending update data for account ${editingAccount._id}:`, updatedAccountData);
//       const response = await fetch(`${API_BASE_URL}/account/${editingAccount._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedAccountData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       const updatedAccount = await response.json();
//       console.log('Account updated successfully on backend:', updatedAccount);
//       await fetchAccounts(); // Re-fetch all accounts to update the table
//       handleCloseModal(); // Close the modal and reset form
//     } catch (error) {
//       console.error('Error updating account:', error);
//       // Display a user-friendly error message if needed
//     }
//   };

//   const handleDeleteAccount = async (accountId) => {
//     if (window.confirm('Are you sure you want to delete this account?')) { // Simple confirmation
//       try {
//         console.log('Attempting to delete account with ID:', accountId);
//         const response = await fetch(`${API_BASE_URL}/account/${accountId}`, {
//           method: 'DELETE',
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//         }

//         console.log('Account deleted successfully on backend:', accountId);
//         await fetchAccounts(); // Re-fetch accounts to update the table
//       } catch (error) {
//         console.error('Error deleting account:', error);
//         // Display a user-friendly error message
//       }
//     }
//   };

//   const toggleAccountSelection = (accountId) => {
//     setSelectedAccounts(prev =>
//       prev.includes(accountId)
//         ? prev.filter(id => id !== accountId)
//         : [...prev, accountId]
//     );
//   };

//   const selectAllAccounts = () => {
//     setSelectedAccounts(selectedAccounts.length > 0 && selectedAccounts.length === accounts.length ? [] : accounts.map(account => account._id));
//   };

//   const CreateAccountModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6 border-b pb-4">
//             <h2 className="text-2xl font-bold text-gray-900">{editingAccount ? 'Edit Account' : 'Create Account'}</h2>
//             <div className="flex space-x-3">
//               <button
//                 onClick={handleCloseModal}
//                 className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
//               >
//                 Cancel
//               </button>
//               {/* Only show "Save and new" for create mode */}
//               {!editingAccount && (
//                 <button
//                   onClick={handleSaveAndNew}
//                   className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm text-sm font-medium"
//                 >
//                   Save and new
//                 </button>
//               )}
//               <button
//                 onClick={editingAccount ? handleUpdateAccount : handleCreateAccount}
//                 className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
//               >
//                 {editingAccount ? 'Update' : 'Save'}
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Account Information Section */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-gray-900">Account Information</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="accountOwner" className="block text-sm font-medium text-gray-700 mb-1">Account Owner</label>
//                   <div className="relative">
//                     <select
//                       id="accountOwner"
//                       value={formData.accountOwner}
//                       onChange={handleFormChange}
//                       className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                     >
//                       <option value="None">-None-</option>
//                       <option value="Amit Seth">Amit Seth</option>
//                       <option value="Danish Bindra">Danish Bindra</option>
//                     </select>
//                     <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                       <ChevronDown className="w-5 h-5 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">Account Name <span className="text-red-500">*</span></label>
//                   <input
//                     id="accountName"
//                     type="text"
//                     value={formData.accountName}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Account Name"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
//                   <div className="relative">
//                     <select
//                       id="accountType"
//                       value={formData.accountType}
//                       onChange={handleFormChange}
//                       className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                     >
//                       <option value="">-None-</option>
//                       <option value="Analyst">Analyst</option>
//                       <option value="Competitor">Competitor</option>
//                       <option value="Customer">Customer</option>
//                       <option value="Distributor">Distributor</option>
//                       <option value="Integrator">Integrator</option>
//                       <option value="Investor">Investor</option>
//                       <option value="Other">Other</option>
//                       <option value="Partner">Partner</option>
//                       <option value="Prospect">Prospect</option>
//                       <option value="Reseller">Reseller</option>
//                       <option value="Supplier">Supplier</option>
//                       <option value="Vendor">Vendor</option>
//                     </select>
//                     <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                       <ChevronDown className="w-5 h-5 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
//                   <input
//                     id="industry"
//                     type="text"
//                     value={formData.industry}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Industry"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                   <input
//                     id="phone"
//                     type="text"
//                     value={formData.phone}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Phone Number"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Id</label>
//                   <input
//                     id="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Email Address"
//                   />
//                 </div>

//               </div>
//             </div>

//             {/* Address Information Section */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-gray-900">Address Information</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
//                   <textarea
//                     id="billingAddress"
//                     value={formData.billingAddress}
//                     onChange={handleFormChange}
//                     rows={3}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Billing Address"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="billingState" className="block text-sm font-medium text-gray-700 mb-1">Billing State</label>
//                   <input
//                     id="billingState"
//                     type="text"
//                     value={formData.billingState}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Billing State"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="billingCountry" className="block text-sm font-medium text-gray-700 mb-1">Billing Country</label>
//                   <input
//                     id="billingCountry"
//                     type="text"
//                     value={formData.billingCountry}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Billing Country"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const FilterPanel = () => (
//     <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 font-sans">
//       <div className="p-4">
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="font-semibold text-gray-900">Filter Accounts by</h3>
//           <button
//             onClick={() => setShowFilters(false)}
//             className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
//             aria-label="Close filters"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//         <div className="space-y-3">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//             />
//           </div>
//           <div className="pt-2">
//             <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
//               <ChevronRight className="w-4 h-4 text-gray-600" />
//               <span className="text-sm text-gray-700">System Defined Filters</span>
//             </div>
//             <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
//               <ChevronRight className="w-4 h-4 text-gray-600" />
//               <span className="text-sm text-gray-700">Filters by Fields</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const totalPages = Math.ceil(accounts.length / recordsPerPage);
//   const startRecord = (currentPage - 1) * recordsPerPage + 1;
//   const endRecord = Math.min(currentPage * recordsPerPage, accounts.length);

//   // Conditional rendering for the table rows
//   const renderAccountsTableRows = () => {
//     if (accounts.length === 0 && !loading) {
//       return (
//         <tr>
//           <td colSpan="8" className="text-center py-12"> {/* Updated colspan */}
//             <div className="text-gray-500">
//               <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//               <p className="text-lg font-medium">No accounts found</p>
//               <p className="text-sm">Create your first account to get started</p>
//             </div>
//           </td>
//         </tr>
//       );
//     }

//     return accounts.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((account) => (
//       <tr key={account._id} className="hover:bg-gray-50 transition-colors">
//         <td className="px-6 py-4 w-12">
//           <input
//             type="checkbox"
//             checked={selectedAccounts.includes(account._id)}
//             onChange={() => toggleAccountSelection(account._id)}
//             className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//           />
//         </td>
//         <td className="px-6 py-4 text-sm whitespace-nowrap">
//           <span className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium">
//             {account.accountName}
//           </span>
//         </td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.accountType || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.industry || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.phone || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.email || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.accountOwner || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm whitespace-nowrap">
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => {
//                 setEditingAccount(account);
//                 setShowCreateForm(true);
//               }}
//               className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
//               title="Edit Account"
//             >
//               <Edit className="w-4 h-4" />
//             </button>
//             <button
//               onClick={() => handleDeleteAccount(account._id)}
//               className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
//               title="Delete Account"
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
//                 All Accounts
//                 <ChevronDown className="w-4 h-4 ml-2" />
//               </button>
//               {showFilters && <FilterPanel />}
//             </div>
//             {userId && (
//               <div className="text-gray-700 text-sm">User ID: <span className="font-medium">{userId}</span></div>
//             )}
//           </div>

//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => {
//                 setEditingAccount(null); // Ensure no account is being edited when creating new
//                 setShowCreateForm(true);
//               }}
//               className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Create Account
//             </button>
//             <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium">
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
//             <span className="text-sm font-medium">Total Records {accounts.length}</span>
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
//                       checked={selectedAccounts.length > 0 && selectedAccounts.length === accounts.length}
//                       onChange={selectAllAccounts}
//                       className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                     />
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Account Name</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Account Type</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Industry</span>
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
//                       <span>Email</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Account Owner</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th> {/* New Actions header */}
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="8" className="text-center py-12">
//                       <div className="text-gray-600 text-lg">Loading Accounts...</div>
//                     </td>
//                   </tr>
//                 ) : (
//                   renderAccountsTableRows()
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Create/Edit Account Modal */}
//       {showCreateForm && <CreateAccountModal />}
//     </div>
//   );
// };

// export default List;































// import React, { useState, useEffect, useCallback } from 'react';
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

// // Define sample accounts OUTSIDE the component to ensure its reference is stable.
// const initialSampleAccounts = [
//   { _id: 'sample1', accountName: 'Havells India', accountType: 'Partner', industry: 'Technology', phone: '+919269462745', email: 'contact@havellsindia.com', accountOwner: 'Amit Seth', billingAddress: '123 Tech Lane', billingState: 'CA', billingCountry: 'India' },
//   { _id: 'sample2', accountName: 'CMS Infotech', accountType: 'Customer', industry: 'Manufacturing', phone: '+918869464342', email: 'info@cmsinfotech.net', accountOwner: 'Danish Bindra', billingAddress: '456 Industrial Blvd', billingState: 'NY', billingCountry: 'India' },
//   { _id: 'sample3', accountName: 'NHPC', accountType: 'Reseller', industry: 'Aerospace', phone: '+972269462747', email: 'sales@nhpc.com', accountOwner: 'Amit Seth', billingAddress: '789 Iron Street', billingState: 'CA', billingCountry: 'India' },
//   { _id: 'sample4', accountName: 'Radiansys', accountType: 'Prospect', industry: 'Conglomerate', phone: '+919969462745', email: 'support@radiansys.org', accountOwner: 'Danish Bindra', billingAddress: '1000 Gotham Ave', billingState: 'NY', billingCountry: 'India' },
//   { _id: 'sample5', accountName: 'Jaypee Hospital', accountType: 'Customer', industry: 'Health', phone: '+919769462742', email: 'sales@jaypeehospital.in', accountOwner: 'Prabhat Mohant', billingAddress: '900 Skynet Rd', billingState: 'TX', billingCountry: 'India' }
// ];

// // Base URL for your backend API (defined outside to avoid re-creation on re-renders)
// const API_BASE_URL = 'http://localhost:3000/api';

// // CreateAccountModal component - now a standalone component to manage its own state
// const CreateAccountModal = ({ onClose, editingAccount, fetchAccounts }) => {
//   const [formData, setFormData] = useState({
//     accountOwner: 'None',
//     accountName: '',
//     accountType: '',
//     industry: '',
//     billingAddress: '',
//     billingState: '',
//     billingCountry: '',
//     phone: '',
//     email: ''
//   });

//   // Effect to populate form data when editingAccount changes
//   useEffect(() => {
//     if (editingAccount) {
//       setFormData({
//         accountOwner: editingAccount.accountOwner || 'None',
//         accountName: editingAccount.accountName || '',
//         accountType: editingAccount.accountType || '',
//         industry: editingAccount.industry || '',
//         billingAddress: editingAccount.billingAddress || '',
//         billingState: editingAccount.billingState || '',
//         billingCountry: editingAccount.billingCountry || '',
//         phone: editingAccount.phone || '',
//         email: editingAccount.email || ''
//       });
//     } else {
//       // Reset form when not editing (e.g., opening for new creation)
//       setFormData({
//         accountOwner: 'None',
//         accountName: '',
//         accountType: '',
//         industry: '',
//         billingAddress: '',
//         billingState: '',
//         billingCountry: '',
//         phone: '',
//         email: ''
//       });
//     }
//   }, [editingAccount]);

//   // Handle form input changes
//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   // Handle account creation
//   const handleCreateAccount = async () => {
//     if (!formData.accountName) {
//       console.warn('Account Name is required to create an account.');
//       return;
//     }

//     try {
//       const newAccountData = {
//         accountName: formData.accountName,
//         accountOwner: formData.accountOwner === 'None' ? 'Danish Bindra' : formData.accountOwner,
//         accountType: formData.accountType,
//         industry: formData.industry,
//         billingAddress: formData.billingAddress,
//         billingState: formData.billingState,
//         billingCountry: formData.billingCountry,
//         phone: formData.phone,
//         email: formData.email,
//       };

//       console.log('Sending new account data:', newAccountData);
//       const response = await fetch(`${API_BASE_URL}/account`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newAccountData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       const createdAccount = await response.json();
//       console.log('Account created successfully on backend:', createdAccount);
//       fetchAccounts(); // Re-fetch accounts to update the table in parent
//       onClose(); // Close the modal
//     } catch (error) {
//       console.error('Error creating account:', error);
//       // You might want to show a user-friendly error message here
//     }
//   };

//   // Handle account update
//   const handleUpdateAccount = async () => {
//     if (!editingAccount || !formData.accountName) {
//       console.warn('Account Name and an account to edit are required for update.');
//       return;
//     }

//     try {
//       const updatedAccountData = {
//         accountOwner: formData.accountOwner === 'None' ? 'Danish Bindra' : formData.accountOwner,
//         accountName: formData.accountName,
//         accountType: formData.accountType,
//         industry: formData.industry,
//         billingAddress: formData.billingAddress,
//         billingState: formData.billingState,
//         billingCountry: formData.billingCountry,
//         phone: formData.phone,
//         email: formData.email,
//       };

//       console.log(`Sending update data for account ${editingAccount._id}:`, updatedAccountData);
//       const response = await fetch(`${API_BASE_URL}/account/${editingAccount._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedAccountData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       const updatedAccount = await response.json();
//       console.log('Account updated successfully on backend:', updatedAccount);
//       fetchAccounts(); // Re-fetch all accounts to update the table in parent
//       onClose(); // Close the modal
//     } catch (error) {
//       console.error('Error updating account:', error);
//       // You might want to show a user-friendly error message here
//     }
//   };

//   // Handle save and create new
//   const handleSaveAndNew = async () => {
//     if (!formData.accountName) {
//       console.warn('Account Name is required to create a new account.');
//       return;
//     }

//     try {
//       const newAccountData = {
//         accountName: formData.accountName,
//         accountOwner: formData.accountOwner === 'None' ? 'Danish Bindra' : formData.accountOwner,
//         accountType: formData.accountType,
//         industry: formData.industry,
//         billingAddress: formData.billingAddress,
//         billingState: formData.billingState,
//         billingCountry: formData.billingCountry,
//         phone: formData.phone,
//         email: formData.email,
//       };

//       console.log('Sending new account data for Save and New:', newAccountData);
//       const response = await fetch(`${API_BASE_URL}/account`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newAccountData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       const createdAccount = await response.json();
//       console.log('Account created successfully for Save and New:', createdAccount);
//       fetchAccounts(); // Re-fetch accounts to update the table

//       // Reset form data for the next entry, keep modal open
//       setFormData({
//         accountOwner: 'None',
//         accountName: '',
//         accountType: '',
//         industry: '',
//         billingAddress: '',
//         billingState: '',
//         billingCountry: '',
//         phone: '',
//         email: ''
//       });

//     } catch (error) {
//       console.error('Error creating account (Save and New):', error);
//       // You might want to show a user-friendly error message here
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6 border-b pb-4">
//             <h2 className="text-2xl font-bold text-gray-900">{editingAccount ? 'Edit Account' : 'Create Account'}</h2>
//             <div className="flex space-x-3">
//               <button
//                 onClick={onClose}
//                 className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
//               >
//                 Cancel
//               </button>
//               {/* Only show "Save and new" for create mode */}
//               {!editingAccount && (
//                 <button
//                   onClick={handleSaveAndNew}
//                   className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm text-sm font-medium"
//                 >
//                   Save and new
//                 </button>
//               )}
//               <button
//                 onClick={editingAccount ? handleUpdateAccount : handleCreateAccount}
//                 className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
//               >
//                 {editingAccount ? 'Update' : 'Save'}
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Account Information Section */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-gray-900">Account Information</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="accountOwner" className="block text-sm font-medium text-gray-700 mb-1">Account Owner</label>
//                   <div className="relative">
//                     <select
//                       id="accountOwner"
//                       value={formData.accountOwner}
//                       onChange={handleFormChange}
//                       className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                     >
//                       <option value="None">-None-</option>
//                       <option value="Amit Seth">Amit Seth</option>
//                       <option value="Danish Bindra">Danish Bindra</option>
//                       {/* <option value="Tanushree Das">Tanushree Das</option> */}
//                       <option value="Tanmay Singh">Tanmay Singh</option>
//                       <option value="Prabhat Mohant">Prabhat Mohant</option>
//                     </select>
//                     <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                       <ChevronDown className="w-5 h-5 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">Account Name <span className="text-red-500">*</span></label>
//                   <input
//                     id="accountName"
//                     type="text"
//                     value={formData.accountName}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Account Name"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
//                   <div className="relative">
//                     <select
//                       id="accountType"
//                       value={formData.accountType}
//                       onChange={handleFormChange}
//                       className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                     >
//                       <option value="">-None-</option>
//                       <option value="Analyst">Analyst</option>
//                       <option value="Competitor">Competitor</option>
//                       <option value="Customer">Customer</option>
//                       <option value="Distributor">Distributor</option>
//                       <option value="Integrator">Integrator</option>
//                       <option value="Investor">Investor</option>
//                       <option value="Other">Other</option>
//                       <option value="Partner">Partner</option>
//                       <option value="Prospect">Prospect</option>
//                       <option value="Reseller">Reseller</option>
//                       <option value="Supplier">Supplier</option>
//                       <option value="Vendor">Vendor</option>
//                     </select>
//                     <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                       <ChevronDown className="w-5 h-5 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
//                   <input
//                     id="industry"
//                     type="text"
//                     value={formData.industry}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Industry"
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                   <input
//                     id="phone"
//                     type="text"
//                     value={formData.phone}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Phone Number"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Id</label>
//                   <input
//                     id="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Email Address"
//                   />
//                 </div>

//               </div>
//             </div>

//             {/* Address Information Section */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-gray-900">Address Information</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
//                   <textarea
//                     id="billingAddress"
//                     value={formData.billingAddress}
//                     onChange={handleFormChange}
//                     rows={3}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Billing Address"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="billingState" className="block text-sm font-medium text-gray-700 mb-1">Billing State</label>
//                   <input
//                     id="billingState"
//                     type="text"
//                     value={formData.billingState}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Billing State"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="billingCountry" className="block text-sm font-medium text-gray-700 mb-1">Billing Country</label>
//                   <input
//                     id="billingCountry"
//                     type="text"
//                     value={formData.billingCountry}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Billing Country"
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


// const List = () => {
//   const [accounts, setAccounts] = useState([]);
//   const [selectedAccounts, setSelectedAccounts] = useState([]);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [recordsPerPage, setRecordsPerPage] = useState(100);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   // Removed userId state as it's not directly used for backend API calls here,
//   // and Firebase authentication is not part of this specific component anymore.
//   const [editingAccount, setEditingAccount] = useState(null); // State to hold account being edited

//   // Memoized function to fetch accounts from the backend
//   const fetchAccounts = useCallback(async () => {
//     try {
//       setLoading(true);
//       console.log('Attempting to fetch accounts from:', `${API_BASE_URL}/account`);
//       const response = await fetch(`${API_BASE_URL}/account`);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         throw new Error(`Failed to fetch accounts: ${response.statusText}`);
//       }

//       const data = await response.json();
//       setAccounts(data);
//       console.log('Accounts fetched successfully:', data);
//     } catch (error) {
//       console.error('Error fetching accounts from backend:', error);
//       setAccounts(initialSampleAccounts); // Fallback to sample data
//     } finally {
//       setLoading(false);
//     }
//   }, []); // Dependencies empty, as initialSampleAccounts is now stable outside.

//   // Initial fetch of accounts when component mounts
//   useEffect(() => {
//     fetchAccounts();
//   }, [fetchAccounts]);

//   // Handler to close the modal and reset editing state
//   const handleCloseModal = () => {
//     setShowCreateForm(false);
//     setEditingAccount(null); // Clear editing account when modal is closed
//   };

//   // Toggle selection for individual account checkboxes
//   const toggleAccountSelection = (accountId) => {
//     setSelectedAccounts(prev =>
//       prev.includes(accountId)
//         ? prev.filter(id => id !== accountId)
//         : [...prev, accountId]
//     );
//   };

//   // Select/Deselect all accounts
//   const selectAllAccounts = () => {
//     setSelectedAccounts(selectedAccounts.length > 0 && selectedAccounts.length === accounts.length ? [] : accounts.map(account => account._id));
//   };

//   // Handle account deletion
//   const handleDeleteAccount = async (accountId) => {
//     if (window.confirm('Are you sure you want to delete this account?')) { // Simple confirmation
//       try {
//         console.log('Attempting to delete account with ID:', accountId);
//         const response = await fetch(`${API_BASE_URL}/account/${accountId}`, {
//           method: 'DELETE',
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//         }

//         console.log('Account deleted successfully on backend:', accountId);
//         await fetchAccounts(); // Re-fetch accounts to update the table
//       } catch (error) {
//         console.error('Error deleting account:', error);
//         // You might want to show a user-friendly error message here
//       }
//     }
//   };

//   // Handle click on edit icon
//   const handleEditClick = (account) => {
//     setEditingAccount(account); // Set the account to be edited
//     setShowCreateForm(true); // Open the modal
//   };

//   // Calculate pagination details
//   const totalPages = Math.ceil(accounts.length / recordsPerPage);
//   const startRecord = (currentPage - 1) * recordsPerPage + 1;
//   const endRecord = Math.min(currentPage * recordsPerPage, accounts.length);

//   // Conditional rendering for the table rows (extracted for clarity)
//   const renderAccountsTableRows = () => {
//     if (accounts.length === 0 && !loading) {
//       return (
//         <tr>
//           <td colSpan="8" className="text-center py-12"> {/* Updated colspan */}
//             <div className="text-gray-500">
//               <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//               <p className="text-lg font-medium">No accounts found</p>
//               <p className="text-sm">Create your first account to get started</p>
//             </div>
//           </td>
//         </tr>
//       );
//     }

//     return accounts.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((account) => (
//       <tr key={account._id} className="hover:bg-gray-50 transition-colors">
//         <td className="px-6 py-4 w-12">
//           <input
//             type="checkbox"
//             checked={selectedAccounts.includes(account._id)}
//             onChange={() => toggleAccountSelection(account._id)}
//             className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//           />
//         </td>
//         <td className="px-6 py-4 text-sm whitespace-nowrap">
//           <span className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium">
//             {account.accountName}
//           </span>
//         </td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.accountType || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.industry || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.phone || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.email || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.accountOwner || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm whitespace-nowrap">
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => handleEditClick(account)} // Pass the account object to edit
//               className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
//               title="Edit Account"
//             >
//               <Edit className="w-4 h-4" />
//             </button>
//             <button
//               onClick={() => handleDeleteAccount(account._id)}
//               className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
//               title="Delete Account"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         </td>
//       </tr>
//     ));
//   };


//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
//         <div className="text-gray-600 text-lg">Loading Accounts...</div>
//       </div>
//     );
//   }

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
//                 All Accounts
//                 <ChevronDown className="w-4 h-4 ml-2" />
//               </button>
//               {showFilters && (
//                 <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 font-sans">
//                   <div className="p-4">
//                     <div className="flex items-center justify-between mb-3">
//                       <h3 className="font-semibold text-gray-900">Filter Accounts by</h3>
//                       <button 
//                         onClick={() => setShowFilters(false)}
//                         className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
//                         aria-label="Close filters"
//                       >
//                         <X className="w-5 h-5" />
//                       </button>
//                     </div>
//                     <div className="space-y-3">
//                       <div className="relative">
//                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <input
//                           type="text"
//                           placeholder="Search..."
//                           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//                         />
//                       </div>
//                       <div className="pt-2">
//                         <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
//                           <ChevronRight className="w-4 h-4 text-gray-600" />
//                           <span className="text-sm text-gray-700">System Defined Filters</span>
//                         </div>
//                         <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
//                           <ChevronRight className="w-4 h-4 text-gray-600" />
//                           <span className="text-sm text-gray-700">Filters by Fields</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//             {/* Removed userId display as it's not being actively managed by this component via Firebase */}
//             {/* {userId && ( // Only show userId if authenticated
//               <div className="text-gray-700 text-sm"> <span className="font-medium">{userId}</span></div>
//             )} */}
//           </div>

//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => {
//                 setEditingAccount(null); // Ensure no account is being edited when creating new
//                 setShowCreateForm(true); // Open the modal for creation
//                 console.log("Create Account button clicked, showCreateForm set to true"); // Debugging log
//               }}
//               className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Create Account
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
//             <span className="text-sm font-medium">Total Records {accounts.length}</span>
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
//                       checked={selectedAccounts.length > 0 && selectedAccounts.length === accounts.length}
//                       onChange={selectAllAccounts}
//                       className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                     />
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Account Name</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Account Type</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Industry</span>
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
//                       <span>Email</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Account Owner</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th> {/* New Actions header */}
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="8" className="text-center py-12">
//                       <div className="text-gray-600 text-lg">Loading Accounts...</div>
//                     </td>
//                   </tr>
//                 ) : (
//                   renderAccountsTableRows()
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Create/Edit Account Modal */}
//       {showCreateForm && (
//         <CreateAccountModal
//           onClose={handleCloseModal}
//           editingAccount={editingAccount}
//           fetchAccounts={fetchAccounts} // Pass fetchAccounts to the modal
//         />
//       )}
//     </div>
//   );
// };

// export default List;



































































// import React, { useState, useEffect, useCallback } from 'react';
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

// // Define sample accounts OUTSIDE the component to ensure its reference is stable.
// const initialSampleAccounts = [
//   { _id: 'sample1', accountName: 'Havells India', accountType: 'Partner', industry: 'Technology', phone: '+919269462745', email: 'contact@havellsindia.com', accountOwner: 'Amit Seth', billingAddress: '123 Tech Lane', billingState: 'CA', billingCountry: 'India' },
//   { _id: 'sample2', accountName: 'CMS Infotech', accountType: 'Customer', industry: 'Manufacturing', phone: '+918869464342', email: 'info@cmsinfotech.net', accountOwner: 'Danish Bindra', billingAddress: '456 Industrial Blvd', billingState: 'NY', billingCountry: 'India' },
//   { _id: 'sample3', accountName: 'NHPC', accountType: 'Reseller', industry: 'Aerospace', phone: '+972269462747', email: 'sales@nhpc.com', accountOwner: 'Amit Seth', billingAddress: '789 Iron Street', billingState: 'CA', billingCountry: 'India' },
//   { _id: 'sample4', accountName: 'Radiansys', accountType: 'Prospect', industry: 'Conglomerate', phone: '+919969462745', email: 'support@radiansys.org', accountOwner: 'Danish Bindra', billingAddress: '1000 Gotham Ave', billingState: 'NY', billingCountry: 'India' },
//   { _id: 'sample5', accountName: 'Jaypee Hospital', accountType: 'Customer', industry: 'Health', phone: '+919769462742', email: 'sales@jaypeehospital.in', accountOwner: 'Prabhat Mohant', billingAddress: '900 Skynet Rd', billingState: 'TX', billingCountry: 'India' }
// ];

// const List = () => {
//   const [accounts, setAccounts] = useState([]);
//   const [selectedAccounts, setSelectedAccounts] = useState([]);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [recordsPerPage, setRecordsPerPage] = useState(100);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState('');
//   const [editingAccount, setEditingAccount] = useState(null); // State to hold account being edited

//   // Base URL for your backend API
//   const API_BASE_URL = 'http://localhost:3000/api';

//   // Memoized function to fetch accounts from the backend
//   const fetchAccounts = useCallback(async () => {
//     try {
//       setLoading(true);
//       console.log('Attempting to fetch accounts from:', `${API_BASE_URL}/account`);
//       const response = await fetch(`${API_BASE_URL}/account`);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         throw new Error(`Failed to fetch accounts: ${response.statusText}`);
//       }

//       const data = await response.json();
//       setAccounts(data);
//       console.log('Accounts fetched successfully:', data);
//     } catch (error) {
//       console.error('Error fetching accounts from backend:', error);
//       setAccounts(initialSampleAccounts); // Fallback to sample data
//     } finally {
//       setLoading(false);
//     }
//   }, []); // Dependencies empty, as initialSampleAccounts is now stable outside.

//   useEffect(() => {
//     fetchAccounts();
//   }, [fetchAccounts]);

//   // FormData state for create/edit operations
//   const [formData, setFormData] = useState({
//     accountOwner: 'None',
//     accountName: '',
//     accountType: '',
//     industry: '',
//     billingAddress: '',
//     billingState: '',
//     billingCountry: '',
//     phone: '',
//     email: ''
//   });

//   // Effect to populate form data when editingAccount changes
//   useEffect(() => {
//     if (editingAccount) {
//       setFormData({
//         accountOwner: editingAccount.accountOwner || 'None',
//         accountName: editingAccount.accountName || '',
//         accountType: editingAccount.accountType || '',
//         industry: editingAccount.industry || '',
//         billingAddress: editingAccount.billingAddress || '',
//         billingState: editingAccount.billingState || '',
//         billingCountry: editingAccount.billingCountry || '',
//         phone: editingAccount.phone || '',
//         email: editingAccount.email || ''
//       });
//     } else {
//       // Reset form when not editing (e.g., closing modal or starting new create)
//       setFormData({
//         accountOwner: 'None',
//         accountName: '',
//         accountType: '',
//         industry: '',
//         billingAddress: '',
//         billingState: '',
//         billingCountry: '',
//         phone: '',
//         email: ''
//       });
//     }
//   }, [editingAccount]);

//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleCloseModal = () => {
//     setShowCreateForm(false);
//     setEditingAccount(null); // Clear editing account when modal is closed
//   };

//   // Inside your List component, near other handlers
// const handleSaveAndNew = async () => {
//   if (!formData.accountName) {
//     console.warn('Account Name is required to create a new account.');
//     return;
//   }

//   try {
//     const newAccountData = {
//       accountName: formData.accountName,
//       accountOwner: formData.accountOwner === 'None' ? 'Danish Bindra' : formData.accountOwner,
//       accountType: formData.accountType,
//       industry: formData.industry,
//       billingAddress: formData.billingAddress,
//       billingState: formData.billingState,
//       billingCountry: formData.billingCountry,
//       phone: formData.phone,
//       email: formData.email,
//     };

//     console.log('Sending new account data for Save and New:', newAccountData);
//     const response = await fetch(`${API_BASE_URL}/account`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newAccountData),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//     }

//     const createdAccount = await response.json();
//     console.log('Account created successfully for Save and New:', createdAccount);
//     await fetchAccounts(); // Re-fetch accounts to update the table

//     // Reset form data for the next entry, keep modal open
//     setFormData({
//       accountOwner: 'None',
//       accountName: '',
//       accountType: '',
//       industry: '',
//       billingAddress: '',
//       billingState: '',
//       billingCountry: '',
//       phone: '',
//       email: ''
//     });
//     // Do not close the modal: setShowCreateForm(true) is already implicit if the button is visible
//     // Also, clear any editing account state if it was set (though for "Save and new" it shouldn't be)
//     setEditingAccount(null);

//   } catch (error) {
//     console.error('Error creating account (Save and New):', error);
//     // Display a user-friendly error message if needed
//   }
// };

//   const handleCreateAccount = async () => {
//     if (!formData.accountName) {
//       console.warn('Account Name is required to create an account.');
//       return;
//     }

//     try {
//       const newAccountData = {
//         accountName: formData.accountName,
//         accountOwner: formData.accountOwner === 'None' ? 'Danish Bindra' : formData.accountOwner,
//         accountType: formData.accountType,
//         industry: formData.industry,
//         billingAddress: formData.billingAddress,
//         billingState: formData.billingState,
//         billingCountry: formData.billingCountry,
//         phone: formData.phone,
//         email: formData.email,
//       };

//       console.log('Sending new account data:', newAccountData);
//       const response = await fetch(`${API_BASE_URL}/account`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newAccountData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       const createdAccount = await response.json();
//       console.log('Account created successfully on backend:', createdAccount);
//       await fetchAccounts();
//       handleCloseModal(); // Close the modal and reset form
//     } catch (error) {
//       console.error('Error creating account:', error);
//       // Display a user-friendly error message if needed
//     }
//   };

//   const handleUpdateAccount = async () => {
//     if (!editingAccount || !formData.accountName) {
//       console.warn('Account Name and an account to edit are required for update.');
//       return;
//     }

//     try {
//       const updatedAccountData = {
//         accountOwner: formData.accountOwner === 'None' ? 'Danish Bindra' : formData.accountOwner,
//         accountName: formData.accountName,
//         accountType: formData.accountType,
//         industry: formData.industry,
//         billingAddress: formData.billingAddress,
//         billingState: formData.billingState,
//         billingCountry: formData.billingCountry,
//         phone: formData.phone,
//         email: formData.email,
//       };

//       console.log(`Sending update data for account ${editingAccount._id}:`, updatedAccountData);
//       const response = await fetch(`${API_BASE_URL}/account/${editingAccount._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedAccountData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       const updatedAccount = await response.json();
//       console.log('Account updated successfully on backend:', updatedAccount);
//       await fetchAccounts(); // Re-fetch all accounts to update the table
//       handleCloseModal(); // Close the modal and reset form
//     } catch (error) {
//       console.error('Error updating account:', error);
//       // Display a user-friendly error message if needed
//     }
//   };

//   const handleDeleteAccount = async (accountId) => {
//     if (window.confirm('Are you sure you want to delete this account?')) { // Simple confirmation
//       try {
//         console.log('Attempting to delete account with ID:', accountId);
//         const response = await fetch(`${API_BASE_URL}/account/${accountId}`, {
//           method: 'DELETE',
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//         }

//         console.log('Account deleted successfully on backend:', accountId);
//         await fetchAccounts(); // Re-fetch accounts to update the table
//       } catch (error) {
//         console.error('Error deleting account:', error);
//         // Display a user-friendly error message
//       }
//     }
//   };

//   const toggleAccountSelection = (accountId) => {
//     setSelectedAccounts(prev =>
//       prev.includes(accountId)
//         ? prev.filter(id => id !== accountId)
//         : [...prev, accountId]
//     );
//   };

//   const selectAllAccounts = () => {
//     setSelectedAccounts(selectedAccounts.length > 0 && selectedAccounts.length === accounts.length ? [] : accounts.map(account => account._id));
//   };

//   const CreateAccountModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6 border-b pb-4">
//             <h2 className="text-2xl font-bold text-gray-900">{editingAccount ? 'Edit Account' : 'Create Account'}</h2>
//             <div className="flex space-x-3">
//               <button
//                 onClick={handleCloseModal}
//                 className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
//               >
//                 Cancel
//               </button>
//               {/* Only show "Save and new" for create mode */}
//               {!editingAccount && (
//                 <button
//                   onClick={handleSaveAndNew}
//                   className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm text-sm font-medium"
//                 >
//                   Save and new
//                 </button>
//               )}
//               <button
//                 onClick={editingAccount ? handleUpdateAccount : handleCreateAccount}
//                 className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
//               >
//                 {editingAccount ? 'Update' : 'Save'}
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Account Information Section */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-gray-900">Account Information</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="accountOwner" className="block text-sm font-medium text-gray-700 mb-1">Account Owner</label>
//                   <div className="relative">
//                     <select
//                       id="accountOwner"
//                       value={formData.accountOwner}
//                       onChange={handleFormChange}
//                       className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                     >
//                       <option value="None">-None-</option>
//                       <option value="Amit Seth">Amit Seth</option>
//                       <option value="Danish Bindra">Danish Bindra</option>
//                     </select>
//                     <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                       <ChevronDown className="w-5 h-5 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">Account Name <span className="text-red-500">*</span></label>
//                   <input
//                     id="accountName"
//                     type="text"
//                     value={formData.accountName}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Account Name"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
//                   <div className="relative">
//                     <select
//                       id="accountType"
//                       value={formData.accountType}
//                       onChange={handleFormChange}
//                       className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                     >
//                       <option value="">-None-</option>
//                       <option value="Analyst">Analyst</option>
//                       <option value="Competitor">Competitor</option>
//                       <option value="Customer">Customer</option>
//                       <option value="Distributor">Distributor</option>
//                       <option value="Integrator">Integrator</option>
//                       <option value="Investor">Investor</option>
//                       <option value="Other">Other</option>
//                       <option value="Partner">Partner</option>
//                       {/* CORRECTED TYPO HERE: was </soption>, now </option> */}
//                       <option value="Prospect">Prospect</option>
//                       <option value="Reseller">Reseller</option>
//                       <option value="Supplier">Supplier</option>
//                       <option value="Vendor">Vendor</option>
//                     </select>
//                     <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                       <ChevronDown className="w-5 h-5 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
//                   <input
//                     id="industry"
//                     type="text"
//                     value={formData.industry}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Industry"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                   <input
//                     id="phone"
//                     type="text"
//                     value={formData.phone}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Phone Number"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Id</label>
//                   <input
//                     id="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Email Address"
//                   />
//                 </div>

//               </div>
//             </div>

//             {/* Address Information Section */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-gray-900">Address Information</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
//                   <textarea
//                     id="billingAddress"
//                     value={formData.billingAddress}
//                     onChange={handleFormChange}
//                     rows={3}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Billing Address"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="billingState" className="block text-sm font-medium text-gray-700 mb-1">Billing State</label>
//                   <input
//                     id="billingState"
//                     type="text"
//                     value={formData.billingState}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Billing State"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="billingCountry" className="block text-sm font-medium text-gray-700 mb-1">Billing Country</label>
//                   <input
//                     id="billingCountry"
//                     type="text"
//                     value={formData.billingCountry}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Billing Country"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const FilterPanel = () => (
//     <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 font-sans">
//       <div className="p-4">
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="font-semibold text-gray-900">Filter Accounts by</h3>
//           <button
//             onClick={() => setShowFilters(false)}
//             className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
//             aria-label="Close filters"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//         <div className="space-y-3">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//             />
//           </div>
//           <div className="pt-2">
//             <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
//               <ChevronRight className="w-4 h-4 text-gray-600" />
//               <span className="text-sm text-gray-700">System Defined Filters</span>
//             </div>
//             <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
//               <ChevronRight className="w-4 h-4 text-gray-600" />
//               <span className="text-sm text-gray-700">Filters by Fields</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const totalPages = Math.ceil(accounts.length / recordsPerPage);
//   const startRecord = (currentPage - 1) * recordsPerPage + 1;
//   const endRecord = Math.min(currentPage * recordsPerPage, accounts.length);

//   // Conditional rendering for the table rows
//   const renderAccountsTableRows = () => {
//     if (accounts.length === 0 && !loading) {
//       return (
//         <tr>
//           <td colSpan="8" className="text-center py-12"> {/* Updated colspan */}
//             <div className="text-gray-500">
//               <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//               <p className="text-lg font-medium">No accounts found</p>
//               <p className="text-sm">Create your first account to get started</p>
//             </div>
//           </td>
//         </tr>
//       );
//     }

//     return accounts.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((account) => (
//       <tr key={account._id} className="hover:bg-gray-50 transition-colors">
//         <td className="px-6 py-4 w-12">
//           <input
//             type="checkbox"
//             checked={selectedAccounts.includes(account._id)}
//             onChange={() => toggleAccountSelection(account._id)}
//             className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//           />
//         </td>
//         <td className="px-6 py-4 text-sm whitespace-nowrap">
//           <span className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium">
//             {account.accountName}
//           </span>
//         </td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.accountType || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.industry || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.phone || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.email || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.accountOwner || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm whitespace-nowrap">
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => {
//                 setEditingAccount(account);
//                 setShowCreateForm(true);
//               }}
//               className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
//               title="Edit Account"
//             >
//               <Edit className="w-4 h-4" />
//             </button>
//             <button
//               onClick={() => handleDeleteAccount(account._id)}
//               className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
//               title="Delete Account"
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
//                 All Accounts
//                 <ChevronDown className="w-4 h-4 ml-2" />
//               </button>
//               {showFilters && <FilterPanel />}
//             </div>
//             {userId && (
//               <div className="text-gray-700 text-sm"> <span className="font-medium">{userId}</span></div>
//             )}
//           </div>

//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => {
//                 setEditingAccount(null); // Ensure no account is being edited when creating new
//                 setShowCreateForm(true);
//                 console.log("Create Account button clicked, showCreateForm set to true"); // Debugging log
//               }}
//               className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Create Account
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
//             <span className="text-sm font-medium">Total Records {accounts.length}</span>
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
//                       checked={selectedAccounts.length > 0 && selectedAccounts.length === accounts.length}
//                       onChange={selectAllAccounts}
//                       className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                     />
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Account Name</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Account Type</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Industry</span>
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
//                       <span>Email</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Account Owner</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th> {/* New Actions header */}
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="8" className="text-center py-12">
//                       <div className="text-gray-600 text-lg">Loading Accounts...</div>
//                     </td>
//                   </tr>
//                 ) : (
//                   renderAccountsTableRows()
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Create/Edit Account Modal */}
//       {showCreateForm && <CreateAccountModal />}
//     </div>
//   );
// };

// export default List;










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
  Trash2,
  Loader2 // Added for loading state
} from 'lucide-react';

// Base URL for your backend API
const API_BASE_URL = 'http://localhost:3000/api';

// --- Custom Confirmation Modal Component ---
const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
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
};


// CreateAccountModal component - now a standalone component to manage its own state
const CreateAccountModal = ({ onClose, editingAccount, fetchAccounts }) => {
  const [formData, setFormData] = useState({
    accountOwner: 'None',
    accountName: '',
    accountType: '',
    industry: '',
    billingAddress: '',
    billingState: '',
    billingCountry: '',
    phone: '',
    email: ''
  });

  // Effect to populate form data when editingAccount changes
  useEffect(() => {
    if (editingAccount) {
      setFormData({
        accountOwner: editingAccount.accountOwner || 'None',
        accountName: editingAccount.accountName || '',
        accountType: editingAccount.accountType || '',
        industry: editingAccount.industry || '',
        billingAddress: editingAccount.billingAddress || '',
        billingState: editingAccount.billingState || '',
        billingCountry: editingAccount.billingCountry || '',
        phone: editingAccount.phone || '',
        email: editingAccount.email || ''
      });
    } else {
      // Reset form when not editing (e.g., opening for new creation)
      setFormData({
        accountOwner: 'None',
        accountName: '',
        accountType: '',
        industry: '',
        billingAddress: '',
        billingState: '',
        billingCountry: '',
        phone: '',
        email: ''
      });
    }
  }, [editingAccount]);

  // Handle form input changes
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Function to check for duplicate accounts
  const checkForDuplicates = async (name, owner, currentId = null) => {
    try {
      const response = await fetch(`${API_BASE_URL}/account`);
      if (!response.ok) {
        throw new Error('Failed to fetch accounts for duplicate check');
      }
      const accounts = await response.json();
      // Check if any existing account has the same name and owner, excluding the current account if editing
      const duplicate = accounts.some(account =>
        account.accountName === name &&
        account.accountOwner === owner &&
        account._id !== currentId
      );
      return duplicate;
    } catch (error) {
      console.error('Error during duplicate check:', error);
      return false; // Assume no duplicate on error, but log it
    }
  };

  // Handle account creation
  const handleCreateAccount = async () => {
    if (!formData.accountName) {
      alert('Account Name is required to create an account.'); // Using alert for now as per previous pattern
      return;
    }

    const isDuplicate = await checkForDuplicates(formData.accountName, formData.accountOwner);
    if (isDuplicate) {
      alert('An account with this Name and Owner already exists. Please use a different combination.');
      return;
    }

    try {
      const newAccountData = {
        accountName: formData.accountName,
        accountOwner: formData.accountOwner === 'None' ? 'Danish Bindra' : formData.accountOwner,
        accountType: formData.accountType,
        industry: formData.industry,
        billingAddress: formData.billingAddress,
        billingState: formData.billingState,
        billingCountry: formData.billingCountry,
        phone: formData.phone,
        email: formData.email,
        status: 'approved', // Accounts created by admin are directly approved
      };

      const response = await fetch(`${API_BASE_URL}/account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAccountData),
      });

      const responseText = await response.text();
      if (!response.ok) {
        let errorMessage = responseText;
        try { const errorData = JSON.parse(responseText); if (errorData.message) errorMessage = errorData.message; } catch (parseError) { console.error("Failed to parse error response as JSON:", parseError); }
        alert(`Failed to create account: ${errorMessage}. Check console for details.`);
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }

      console.log('Account created successfully on backend.');
      fetchAccounts(); // Re-fetch accounts to update the table in parent
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  // Handle account update
  const handleUpdateAccount = async () => {
    if (!editingAccount || !formData.accountName) {
      alert('Account Name and an account to edit are required for update.');
      return;
    }

    const isDuplicate = await checkForDuplicates(formData.accountName, formData.accountOwner, editingAccount._id);
    if (isDuplicate) {
      alert('An account with this Name and Owner already exists. Please use a different combination.');
      return;
    }

    try {
      const updatedAccountData = {
        accountOwner: formData.accountOwner === 'None' ? 'Danish Bindra' : formData.accountOwner,
        accountName: formData.accountName,
        accountType: formData.accountType,
        industry: formData.industry,
        billingAddress: formData.billingAddress,
        billingState: formData.billingState,
        billingCountry: formData.billingCountry,
        phone: formData.phone,
        email: formData.email,
      };

      const response = await fetch(`${API_BASE_URL}/account/${editingAccount._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAccountData),
      });

      const responseText = await response.text();
      if (!response.ok) {
        let errorMessage = responseText;
        try { const errorData = JSON.parse(responseText); if (errorData.message) errorMessage = errorData.message; } catch (parseError) { console.error("Failed to parse error response as JSON:", parseError); }
        alert(`Failed to update account: ${errorMessage}. Check console for details.`);
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }

      console.log('Account updated successfully on backend.');
      fetchAccounts(); // Re-fetch all accounts to update the table in parent
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  // Handle save and create new
  const handleSaveAndNew = async () => {
    if (!formData.accountName) {
      alert('Account Name is required to save and create a new account.');
      return;
    }

    const isDuplicate = await checkForDuplicates(formData.accountName, formData.accountOwner);
    if (isDuplicate) {
      alert('An account with this Name and Owner already exists. Please use a different combination.');
      return;
    }

    try {
      const newAccountData = {
        accountName: formData.accountName,
        accountOwner: formData.accountOwner === 'None' ? 'Danish Bindra' : formData.accountOwner,
        accountType: formData.accountType,
        industry: formData.industry,
        billingAddress: formData.billingAddress,
        billingState: formData.billingState,
        billingCountry: formData.billingCountry,
        phone: formData.phone,
        email: formData.email,
        status: 'approved', // Accounts created by admin are directly approved
      };

      const response = await fetch(`${API_BASE_URL}/account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAccountData),
      });

      const responseText = await response.text();
      if (!response.ok) {
        let errorMessage = responseText;
        try { const errorData = JSON.parse(responseText); if (errorData.message) errorMessage = errorData.message; } catch (parseError) { console.error("Failed to parse error response as JSON:", parseError); }
        alert(`Failed to save and create new account: ${errorMessage}. Check console for details.`);
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }

      console.log('Account created successfully for Save and New.');
      fetchAccounts(); // Re-fetch accounts to update the table

      // Reset form data for the next entry, keep modal open
      setFormData({
        accountOwner: 'None',
        accountName: '',
        accountType: '',
        industry: '',
        billingAddress: '',
        billingState: '',
        billingCountry: '',
        phone: '',
        email: ''
      });

    } catch (error) {
      console.error('Error creating account (Save and New):', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-900">{editingAccount ? 'Edit Account' : 'Create Account'}</h2>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
              >
                Cancel
              </button>
              {/* Only show "Save and new" for create mode */}
              {!editingAccount && (
                <button
                  onClick={handleSaveAndNew}
                  className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm text-sm font-medium"
                >
                  Save and new
                </button>
              )}
              <button
                onClick={editingAccount ? handleUpdateAccount : handleCreateAccount}
                className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
              >
                {editingAccount ? 'Update' : 'Save'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Account Information Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="accountOwner" className="block text-sm font-medium text-gray-700 mb-1">Account Owner</label>
                  <div className="relative">
                    <select
                      id="accountOwner"
                      value={formData.accountOwner}
                      onChange={handleFormChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
                    >
                      <option value="None">-None-</option>
                      <option value="Amit Seth">Amit Seth</option>
                      <option value="Danish Bindra">Danish Bindra</option>
                      <option value="Aveek Nayan">Aveek Nayan</option>
                      <option value="Tanmay Singh">Tanmay Singh</option>
                      <option value="Prabhat Mohant">Prabhat Mohant</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">Account Name <span className="text-red-500">*</span></label>
                  <input
                    id="accountName"
                    type="text"
                    value={formData.accountName}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Account Name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                  <div className="relative">
                    <select
                      id="accountType"
                      value={formData.accountType}
                      onChange={handleFormChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
                    >
                      <option value="">-None-</option>
                      <option value="Analyst">Analyst</option>
                      <option value="Competitor">Competitor</option>
                      <option value="Customer">Customer</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Integrator">Integrator</option>
                      <option value="Investor">Investor</option>
                      <option value="Other">Other</option>
                      <option value="Partner">Partner</option>
                      <option value="Prospect">Prospect</option>
                      <option value="Reseller">Reseller</option>
                      <option value="Supplier">Supplier</option>
                      <option value="Vendor">Vendor</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                  <input
                    id="industry"
                    type="text"
                    value={formData.industry}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Industry"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    id="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Phone Number"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Id</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Email Address"
                  />
                </div>

              </div>
            </div>

            {/* Address Information Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Address Information</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
                  <textarea
                    id="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Billing Address"
                  />
                </div>
                <div>
                  <label htmlFor="billingState" className="block text-sm font-medium text-gray-700 mb-1">Billing State</label>
                  <input
                    id="billingState"
                    type="text"
                    value={formData.billingState}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Billing State"
                  />
                </div>
                <div>
                  <label htmlFor="billingCountry" className="block text-sm font-medium text-gray-700 mb-1">Billing Country</label>
                  <input
                    id="billingCountry"
                    type="text"
                    value={formData.billingCountry}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Billing Country"
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


const List = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [accounts, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editingAccount, setEditingAccount] = useState(null); // State to hold account being edited
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for confirmation modal
  const [accountToDelete, setAccountToDelete] = useState(null); // State to hold ID of account to delete

  // Memoized function to fetch accounts from the backend
  const fetchAccounts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/account`); // Fetching all accounts for now
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        throw new Error(`Failed to fetch accounts: ${response.statusText}`);
      }
      const data = await response.json();
      // Filter for approved accounts to display in the admin list
      const approvedAccounts = data.filter(account => account.status === 'approved');
      setAccounts(approvedAccounts);
      console.log('Approved accounts fetched successfully:', approvedAccounts);
    } catch (error) {
      console.error('Error fetching approved accounts from backend:', error);
      setAccounts([]); // Fallback to empty array on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch of accounts when component mounts
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  // Handler to close the modal and reset editing state
  const handleCloseModal = () => {
    setShowCreateForm(false);
    setEditingAccount(null); // Clear editing account when modal is closed
  };

  // Toggle selection for individual account checkboxes
  const toggleAccountSelection = (accountId) => {
    setSelectedAccounts(prev =>
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };

  // Select/Deselect all accounts
  const selectAllAccounts = () => {
    setSelectedAccounts(selectedAccounts.length > 0 && selectedAccounts.length === accounts.length ? [] : accounts.map(account => account._id));
  };

  // Confirm deletion
  const confirmDeleteAccount = (accountId) => {
    setAccountToDelete(accountId);
    setShowConfirmModal(true);
  };

  // Execute deletion after confirmation
  const executeDeleteAccount = async () => {
    if (!accountToDelete) return;

    setShowConfirmModal(false); // Close modal immediately
    try {
      const response = await fetch(`${API_BASE_URL}/account/${accountToDelete}`, {
        method: 'DELETE',
      });

      const responseText = await response.text();
      if (!response.ok) {
        let errorMessage = responseText;
        try { const errorData = JSON.parse(responseText); if (errorData.message) errorMessage = errorData.message; } catch (parseError) { console.error("Failed to parse error response as JSON:", parseError); }
        alert(`Failed to delete account: ${errorMessage}. Check console for details.`);
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }

      console.log('Account deleted successfully on backend:', accountToDelete);
      await fetchAccounts(); // Re-fetch accounts to update the table
      setAccountToDelete(null); // Reset
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const cancelDeleteAccount = () => {
    setShowConfirmModal(false);
    setAccountToDelete(null);
  };

  // Handle click on edit icon
  const handleEditClick = (account) => {
    setEditingAccount(account); // Set the account to be edited
    setShowCreateForm(true); // Open the modal
  };

  // Handle click on Account Name to navigate to detail view
  const handleAccountNameClick = (accountId) => {
    navigate(`/admin-dashboard/accounts/${accountId}/deals`);
  };

  // Calculate pagination details
  const totalPages = Math.ceil(accounts.length / recordsPerPage);
  const startRecord = (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, accounts.length);

  // Conditional rendering for the table rows (extracted for clarity)
  const renderAccountsTableRows = () => {
    if (accounts.length === 0 && !loading) {
      return (
        <tr>
          <td colSpan="8" className="text-center py-12">
            <div className="text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No accounts found</p>
              <p className="text-sm">Create your first account to get started</p>
            </div>
          </td>
        </tr>
      );
    }

    return accounts.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((account) => (
      <tr key={account._id} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 w-12">
          <input
            type="checkbox"
            checked={selectedAccounts.includes(account._id)}
            onChange={() => toggleAccountSelection(account._id)}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </td>
        <td className="px-6 py-4 text-sm whitespace-nowrap">
          <span
            onClick={() => handleAccountNameClick(account._id)}
            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
          >
            {account.accountName}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.accountType || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.industry || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.phone || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.email || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.accountOwner || 'N/A'}</td>
        <td className="px-6 py-4 text-sm whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleEditClick(account)} // Pass the account object to edit
              className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
              title="Edit Account"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => confirmDeleteAccount(account._id)}
              className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
              title="Delete Account"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    ));
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-2" />
        <span className="text-lg text-gray-700">Loading Accounts...</span>
      </div>
    );
  }

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
                All Accounts
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              {showFilters && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 font-sans">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">Filter Accounts by</h3>
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
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/admin-dashboard/account-requests')} // New button for requests
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
            >
              <Users className="w-4 h-4 mr-2" />
              Requests
            </button>
            <button
              onClick={() => {
                setEditingAccount(null); // Ensure no account is being edited when creating new
                setShowCreateForm(true); // Open the modal for creation
              }}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Account
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Table Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-indigo-700 text-white rounded-t-lg">
            <span className="text-sm font-medium">Total Records {accounts.length}</span>
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
                      checked={selectedAccounts.length > 0 && selectedAccounts.length === accounts.length}
                      onChange={selectAllAccounts}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>Account Name</span>
                      <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>Account Type</span>
                      <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>Industry</span>
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
                      <span>Email</span>
                      <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>Account Owner</span>
                      <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th> {/* New Actions header */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {renderAccountsTableRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create/Edit Account Modal */}
      {showCreateForm && (
        <CreateAccountModal
          onClose={handleCloseModal}
          editingAccount={editingAccount}
          fetchAccounts={fetchAccounts} // Pass fetchAccounts to the modal
        />
      )}

      {/* Confirmation Modal for deletion */}
      {showConfirmModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this account?"
          onConfirm={executeDeleteAccount}
          onCancel={cancelDeleteAccount}
        />
      )}
    </div>
  );
};

export default List;
