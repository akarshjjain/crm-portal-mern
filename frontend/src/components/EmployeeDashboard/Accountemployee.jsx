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
//   Trash2, // For delete icon
// } from 'lucide-react';

// // Import your custom useAuth hook from the context file
// // Path is relative from src/components/EmployeeDashboard/Accountemployee.jsx to src/context/AuthContext.jsx
// import { useAuth } from '../../context/authContext'

// // Define sample accounts OUTSIDE the component to ensure its reference is stable.
// const initialSampleAccounts = [
//   { _id: 'sample1', accountName: 'Havells India', accountType: 'Partner', industry: 'Technology', phone: '+919269462745', email: 'contact@havellsindia.com', accountOwner: 'Amit Seth', billingAddress: '123 Tech Lane', billingState: 'CA', billingCountry: 'India' },
//   { _id: 'sample2', accountName: 'CMS Infotech', accountType: 'Customer', industry: 'Manufacturing', phone: '+918869464342', email: 'info@cmsinfotech.net', accountOwner: 'Danish Bindra', billingAddress: '456 Industrial Blvd', billingState: 'NY', billingCountry: 'India' },
//   { _id: 'sample3', accountName: 'NHPC', accountType: 'Reseller', industry: 'Aerospace', phone: '+972269462747', email: 'sales@nhpc.com', accountOwner: 'Amit Seth', billingAddress: '789 Iron Street', billingState: 'CA', billingCountry: 'India' },
//   { _id: 'sample4', accountName: 'Radiansys', accountType: 'Prospect', industry: 'Conglomerate', phone: '+919969462745', email: 'support@radiansys.org', accountOwner: 'Danish Bindra', billingAddress: '1000 Gotham Ave', billingState: 'NY', billingCountry: 'India' },
//   { _id: 'sample5', accountName: 'Jaypee Hospital', accountType: 'Customer', industry: 'Health', phone: '+919769462742', email: 'sales@jaypeehospital.in', accountOwner: 'Prabhat Mohant', billingAddress: '900 Skynet Rd', billingState: 'TX', billingCountry: 'India' }
// ];

// // Base URL for your backend API for accounts
// const API_BASE_URL = 'http://localhost:3000/api'; // Assuming your backend is running here

// // CreateAccountModal component - now a standalone component to manage its own state
// const CreateAccountModal = ({ onClose, editingAccount, fetchAccounts }) => {
//   // Use your custom useAuth hook to get user data
//   const { user: currentUser } = useAuth(); // Destructure 'user' from useAuth and alias as currentUser

//   const [formData, setFormData] = useState({
//     // Pre-fill owner based on current user role for new accounts or editing
//     accountOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : (editingAccount?.accountOwner || 'None'),
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
//       // Reset form for new creation, pre-filling owner if employee
//       setFormData({
//         accountOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
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
//   }, [editingAccount, currentUser]); // Dependency on currentUser to reset owner on login/logout

//   // Handle form input changes
//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   // Helper to determine the actual account owner for API payload
//   const getActualAccountOwner = () => {
//     if (currentUser?.isLoggedIn && currentUser?.role === 'employee') {
//       return currentUser.name; // Employee can only be their own owner
//     }
//     // For admin or if no user is logged in (though typically modal would be disabled)
//     // use selected value, defaulting if 'None' is chosen.
//     return formData.accountOwner === 'None' ? 'Danish Bindra' : formData.accountOwner;
//   };

//   // Handle account creation
//   const handleCreateAccount = async () => {
//     if (!formData.accountName) {
//       alert('Account Name is required to create an account.'); // Use alert for now, replace with custom modal
//       return;
//     }

//     try {
//       const newAccountData = {
//         accountName: formData.accountName,
//         accountOwner: getActualAccountOwner(), // Use helper for owner
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
//       alert(`Error creating account: ${error.message}`);
//     }
//   };

//   // Handle account update
//   const handleUpdateAccount = async () => {
//     if (!editingAccount || !formData.accountName) {
//       alert('Account Name and an account to edit are required for update.');
//       return;
//     }

//     try {
//       const updatedAccountData = {
//         accountName: formData.accountName,
//         accountOwner: getActualAccountOwner(), // Use helper for owner
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
//       alert(`Error updating account: ${error.message}`);
//     }
//   };

//   // Handle save and create new
//   const handleSaveAndNew = async () => {
//     if (!formData.accountName) {
//       alert('Account Name is required to create a new account.');
//       return;
//     }

//     try {
//       const newAccountData = {
//         accountName: formData.accountName,
//         accountOwner: getActualAccountOwner(), // Use helper for owner
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
//         accountOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
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
//       alert(`Error creating account (Save and New): ${error.message}`);
//     }
//   };

//   // Determine if account owner field should be disabled
//   const isAccountOwnerDisabled = currentUser?.isLoggedIn && currentUser?.role === 'employee';

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
//                       className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10 ${isAccountOwnerDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
//                       disabled={isAccountOwnerDisabled} // Disable if a regular user is logged in
//                     >
//                       {isAccountOwnerDisabled ? (
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


// const Accountemployee = () => { 
//   // Use your custom useAuth hook to get user and loading state
//   const { user: currentUser, loading: authLoading } = useAuth(); 

//   const [accounts, setAccounts] = useState([]);
//   const [selectedAccounts, setSelectedAccounts] = useState([]);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [recordsPerPage, setRecordsPerPage] = useState(100);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true); // This loading is for data fetching
//   const [editingAccount, setEditingAccount] = useState(null); // State to hold account being edited

//   // Memoized function to fetch accounts from the backend
//   const fetchAccounts = useCallback(async () => {
//     // Only attempt to fetch if authentication state has been resolved and user data is available
//     if (authLoading || !currentUser) {
//       // If still loading auth or no user, do not fetch accounts yet.
//       // This prevents fetching data with an unresolved user state.
//       return; 
//     }
    
//     try {
//       setLoading(true);
//       console.log('Attempting to fetch all accounts from:', `${API_BASE_URL}/account`);
//       const response = await fetch(`${API_BASE_URL}/account`);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         throw new Error(`Failed to fetch accounts: ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log('All accounts fetched successfully:', data);

//       // Apply client-side filtering based on logged-in user role
//       // Check currentUser.isLoggedIn for explicit login status
//       if (currentUser.isLoggedIn && currentUser.role === 'employee') {
//         const filteredData = data.filter(account => account.accountOwner === currentUser.name);
//         setAccounts(filteredData);
//         console.log(`Filtered accounts for employee ${currentUser.name}:`, filteredData);
//       } else {
//         // If admin, or not logged in, show all accounts (or a message for non-logged-in)
//         setAccounts(data);
//         console.log('Displaying all accounts (Admin view or no user logged in).');
//       }
//     } catch (error) {
//       console.error('Error fetching accounts from backend:', error);
//       // Fallback to initial sample accounts if fetching fails or no data, applying user filter
//       const fallbackData = (currentUser?.isLoggedIn && currentUser?.role === 'employee')
//         ? initialSampleAccounts.filter(acc => acc.accountOwner === currentUser.name)
//         : initialSampleAccounts;
//       setAccounts(fallbackData); 
//       console.log('Falling back to sample accounts due to fetch error or empty data, with user filter applied.');
//     } finally {
//       setLoading(false);
//     }
//   }, [currentUser, authLoading]); // Re-fetch when currentUser or authLoading changes

//   // Initial fetch of accounts when component mounts or currentUser/authLoading changes
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
//   const handleDeleteAccount = async (accountId, accountOwner) => {
//     // Permission check for delete
//     const canDelete = currentUser?.isLoggedIn && 
//                       (currentUser?.role === 'admin' || (currentUser?.role === 'employee' && currentUser.name === accountOwner));

//     if (!canDelete) {
//       alert("You do not have permission to delete this account.");
//       return;
//     }

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
//         alert(`Error deleting account: ${error.message}`);
//       }
//     }
//   };

//   // Handle click on edit icon
//   const handleEditClick = (account) => {
//     // Permission check for edit
//     const canEdit = currentUser?.isLoggedIn && 
//                     (currentUser?.role === 'admin' || (currentUser?.role === 'employee' && currentUser.name === account.accountOwner));
    
//     if (!canEdit) {
//       alert("You do not have permission to edit this account.");
//       return;
//     }
//     setEditingAccount(account); // Set the account to be edited
//     setShowCreateForm(true); // Open the modal
//   };

//   // Calculate pagination details
//   const totalPages = Math.ceil(accounts.length / recordsPerPage);
//   const startRecord = (currentPage - 1) * recordsPerPage + 1;
//   const endRecord = Math.min(currentPage * recordsPerPage, accounts.length);

//   // Show loading state if authentication is still in progress
//   // This is crucial to prevent fetching data before user identity is known
//   if (authLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-gray-600 text-lg">Loading authentication state...</div>
//       </div>
//     );
//   }

//   // If auth is not loading but there's no current user (i.e., not logged in), 
//   // you might want to redirect to login or show a "please log in" message.
//   // For now, it will simply show an empty table or all sample data if fallback occurs.
//   // For example: if (!currentUser?.isLoggedIn) return <Navigate to="/login" />;


//   // Conditional rendering for the table rows (extracted for clarity)
//   const renderAccountsTableRows = () => {
//     if (accounts.length === 0 && !loading) {
//       return (
//         <tr>
//           <td colSpan="8" className="text-center py-12">
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
//             {/* <button
//               onClick={() => handleEditClick(account)} // Pass the account object to edit
//               // Disable edit button if not admin and not owner of the account
//               disabled={!(currentUser?.isLoggedIn && (currentUser?.role === 'admin' || (currentUser?.role === 'employee' && currentUser.name === account.accountOwner)))}
//               className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Edit Account"
//             >
//               <Edit className="w-4 h-4" />
//             </button> */}
//             {/* <button
//               onClick={() => handleDeleteAccount(account._id, account.accountOwner)} // Pass owner for permission check
//               // Disable delete button if not admin and not not owner of the account
//               disabled={!(currentUser?.isLoggedIn && (currentUser?.role === 'admin' || (currentUser?.role === 'employee' && currentUser.name === account.accountOwner)))}
//               className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Delete Account"
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
//             {/* Display logged-in user info */}
//             {currentUser?.isLoggedIn && (
//               <div className="text-gray-700 text-sm">
//                  <span className="font-medium"></span>
//               </div>
//             )}
//             {!currentUser?.isLoggedIn && (
//               <div className="text-gray-500 text-sm">Not logged in.</div>
//             )}
//           </div>

//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => {
//                 setEditingAccount(null); // Ensure no account is being edited when creating new
//                 setShowCreateForm(true); // Open the modal for creation
//               }}
//               // Disable create button if not logged in
//               disabled={!currentUser?.isLoggedIn}
//               className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Create Account
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
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap"></th>
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
//           fetchAccounts={fetchAccounts} 
//         />
//       )}
//     </div>
//   );
// };

// export default Accountemployee;


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
//   Edit, // For edit icon (though will be removed for employees)
//   Trash2, // For delete icon (though will be removed for employees)
// } from 'lucide-react';

// // Import your custom useAuth hook from the context file
// import { useAuth } from '../../context/AuthContext'; // Corrected path to AuthContext

// // Define sample accounts OUTSIDE the component to ensure its reference is stable.
// // These are for fallback/initial structure, actual data comes from API.
// const initialSampleAccounts = [
//   { _id: 'sample1', accountName: 'Havells India', accountType: 'Partner', industry: 'Technology', phone: '+919269462745', email: 'contact@havellsindia.com', accountOwner: 'Amit Seth', billingAddress: '123 Tech Lane', billingState: 'GA', billingCountry: 'India', status: 'approved' },
//   { _id: 'sample2', accountName: 'CMS Infotech', accountType: 'Customer', industry: 'Manufacturing', phone: '+918869464342', email: 'info@cmsinfotech.net', accountOwner: 'Danish Bindra', billingAddress: '456 Industrial Blvd', billingState: 'NY', billingCountry: 'India', status: 'approved' },
//   { _id: 'sample3', accountName: 'NHPC', accountType: 'Reseller', industry: 'Aerospace', phone: '+972269462747', email: 'sales@nhpc.com', accountOwner: 'Amit Seth', billingAddress: '789 Iron Street', billingState: 'CA', billingCountry: 'India', status: 'approved' },
//   { _id: 'sample4', accountName: 'Radiansys', accountType: 'Prospect', industry: 'Conglomerate', phone: '+919969462745', email: 'support@radiansys.org', accountOwner: 'Danish Bindra', billingAddress: '1000 Gotham Ave', billingState: 'TX', billingCountry: 'India', status: 'approved' },
//   { _id: 'sample5', accountName: 'Jaypee Hospital', accountType: 'Customer', industry: 'Health', phone: '+919769462742', email: 'sales@jaypeehospital.in', accountOwner: 'Prabhat Mohant', billingAddress: '900 Skynet Rd', billingState: 'TX', billingCountry: 'India', status: 'pending' } // Example pending
// ];

// // Base URL for your backend API for accounts
// const API_BASE_URL = 'http://localhost:3000/api';

// // Custom Confirmation Modal Component (reused for general confirmations)
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


// // RequestAccountModal component - Modified for employee account requests
// const RequestAccountModal = ({ onClose, fetchAccounts }) => {
//   const { user: currentUser } = useAuth();

//   const [formData, setFormData] = useState({
//     accountOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
//     accountName: '',
//     accountType: '',
//     industry: '',
//     billingAddress: '',
//     billingState: '',
//     billingCountry: '',
//     phone: '',
//     email: '',
//     status: 'pending' // New accounts requested by employees are always 'pending'
//   });

//   // Automatically set owner for employees when the modal opens or currentUser changes
//   useEffect(() => {
//     if (currentUser?.isLoggedIn && currentUser?.role === 'employee') {
//       setFormData(prev => ({
//         ...prev,
//         accountOwner: currentUser.name,
//         status: 'pending' // Ensure status is pending for new requests
//       }));
//     } else {
//       // For non-employees (e.g., if an admin somehow accesses this modal directly),
//       // allow them to pick or default to 'None' but still set status to 'pending' as a request.
//       setFormData(prev => ({
//         ...prev,
//         accountOwner: 'None',
//         status: 'pending'
//       }));
//     }
//   }, [currentUser]);


//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const getActualAccountOwner = () => {
//     if (currentUser?.isLoggedIn && currentUser?.role === 'employee') {
//       return currentUser.name;
//     }
//     // Fallback for admin or unauthenticated, though this modal is primarily for employees
//     return formData.accountOwner === 'None' ? 'Danish Bindra' : formData.accountOwner;
//   };

//   const handleSendRequest = async () => {
//     if (!formData.accountName) {
//       alert('Account Name is required to send an account request.');
//       return;
//     }

//     try {
//       const requestData = {
//         ...formData,
//         accountOwner: getActualAccountOwner(),
//         status: 'pending' // Explicitly set status to pending
//       };

//       console.log('Sending account request data:', requestData);
//       const response = await fetch(`${API_BASE_URL}/account`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       const createdAccount = await response.json();
//       console.log('Account request sent successfully:', createdAccount);
//       fetchAccounts(); // Re-fetch accounts to update the table in parent
//       onClose(); // Close the modal
//       alert('Account request sent successfully! Awaiting admin approval.'); // Provide feedback
//     } catch (error) {
//       console.error('Error sending account request:', error);
//       alert(`Error sending account request: ${error.message}`);
//     }
//   };

//   const handleSendRequestAndNew = async () => {
//     if (!formData.accountName) {
//       alert('Account Name is required to send an account request.');
//       return;
//     }

//     try {
//       const requestData = {
//         ...formData,
//         accountOwner: getActualAccountOwner(),
//         status: 'pending' // Explicitly set status to pending
//       };

//       console.log('Sending account request for Save and New:', requestData);
//       const response = await fetch(`${API_BASE_URL}/account`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       const createdAccount = await response.json();
//       console.log('Account request sent successfully (Save and New):', createdAccount);
//       fetchAccounts(); // Re-fetch accounts to update the table

//       // Reset form data for the next entry, keep modal open
//       setFormData({
//         accountOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
//         accountName: '',
//         accountType: '',
//         industry: '',
//         billingAddress: '',
//         billingState: '',
//         billingCountry: '',
//         phone: '',
//         email: '',
//         status: 'pending' // Always pending for new requests
//       });
//       alert('Account request sent successfully! You can submit another.'); // Provide feedback
//     } catch (error) {
//       console.error('Error sending account request (Save and New):', error);
//       alert(`Error sending account request: ${error.message}`);
//     }
//   };

//   // Determine if account owner field should be disabled (always for employee, unless admin)
//   const isAccountOwnerDisabled = currentUser?.isLoggedIn && currentUser?.role === 'employee';

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6 border-b pb-4">
//             <h2 className="text-2xl font-bold text-gray-900">Request New Account</h2>
//             <div className="flex space-x-3">
//               <button
//                 onClick={onClose}
//                 className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSendRequestAndNew}
//                 className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm text-sm font-medium"
//               >
//                 Send Request and New
//               </button>
//               <button
//                 onClick={handleSendRequest}
//                 className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
//               >
//                 Send Request
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
//                       className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10 ${isAccountOwnerDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
//                       disabled={isAccountOwnerDisabled} // Disable if employee is logged in
//                     >
//                       {isAccountOwnerDisabled ? (
//                         <option value={currentUser.name}>{currentUser.name}</option>
//                       ) : (
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


// const Accountemployee = () => {
//   const { user: currentUser, loading: authLoading } = useAuth();

//   const [accounts, setAccounts] = useState([]);
//   const [selectedAccounts, setSelectedAccounts] = useState([]);
//   const [showRequestForm, setShowRequestForm] = useState(false); // Renamed from showCreateForm
//   const [showFilters, setShowFilters] = useState(false);
//   const [recordsPerPage, setRecordsPerPage] = useState(100);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [showConfirmModal, setShowConfirmModal] = useState(false); // For delete confirmation
//   const [accountToDelete, setAccountToDelete] = useState(null); // Account ID to delete


//   // Memoized function to fetch accounts from the backend
//   const fetchAccounts = useCallback(async () => {
//     if (authLoading || !currentUser) {
//       setLoading(false);
//       setAccounts([]); // Clear accounts if user not ready or not logged in
//       return;
//     }

//     try {
//       setLoading(true);
//       let url = `${API_BASE_URL}/account?status=approved`; // Always fetch approved accounts

//       // If employee, filter by accountOwner
//       if (currentUser.isLoggedIn && currentUser.role === 'employee') {
//         url = `${API_BASE_URL}/account?status=approved&accountOwner=${encodeURIComponent(currentUser.name)}`;
//         console.log(`Fetching approved accounts for employee: ${currentUser.name}`);
//       } else if (currentUser.isLoggedIn && currentUser.role === 'admin') {
//         // Admins see all approved accounts
//         console.log('Fetching all approved accounts for admin.');
//       } else {
//         // If not logged in, show no accounts or redirect
//         setAccounts([]);
//         setLoading(false);
//         console.log('Not logged in, no accounts fetched.');
//         return;
//       }

//       const response = await fetch(url);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         throw new Error(`Failed to fetch accounts: ${response.statusText}`);
//       }

//       const data = await response.json();
//       setAccounts(data);
//       console.log('Approved accounts fetched successfully:', data);
//     } catch (error) {
//       console.error('Error fetching accounts from backend:', error);
//       // Fallback to sample data (filtered if employee, showing all approved samples if admin)
//       const fallbackData = (currentUser?.isLoggedIn && currentUser?.role === 'employee')
//         ? initialSampleAccounts.filter(acc => acc.accountOwner === currentUser.name && acc.status === 'approved')
//         : (currentUser?.isLoggedIn && currentUser?.role === 'admin')
//             ? initialSampleAccounts.filter(acc => acc.status === 'approved')
//             : []; // No fallback for non-logged-in
//       setAccounts(fallbackData);
//       console.log('Falling back to sample accounts due to fetch error, with user/status filter applied.');
//     } finally {
//       setLoading(false);
//     }
//   }, [currentUser, authLoading]); // Re-fetch when currentUser or authLoading changes

//   // Initial fetch of accounts when component mounts or currentUser/authLoading changes
//   useEffect(() => {
//     fetchAccounts();
//   }, [fetchAccounts]);

//   // Handler to close the request modal
//   const handleCloseRequestModal = () => { // Renamed from handleCloseModal
//     setShowRequestForm(false);
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

//   // Handle account deletion confirmation (only for Admin role)
//   const confirmDeleteAccount = (accountId, accountOwner) => {
//     // Only Admin can delete accounts
//     const canDelete = currentUser?.isLoggedIn && currentUser?.role === 'admin';

//     if (!canDelete) {
//       alert("You do not have permission to delete accounts.");
//       return;
//     }
//     setAccountToDelete({ id: accountId, owner: accountOwner });
//     setShowConfirmModal(true);
//   };

//   // Execute account deletion
//   const executeDeleteAccount = async () => {
//     if (!accountToDelete) return;
//     setShowConfirmModal(false); // Close the confirmation modal

//     try {
//       console.log('Attempting to delete account with ID:', accountToDelete.id);
//       const response = await fetch(`${API_BASE_URL}/account/${accountToDelete.id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       console.log('Account deleted successfully on backend:', accountToDelete.id);
//       await fetchAccounts(); // Re-fetch accounts to update the table
//       setAccountToDelete(null); // Reset the state
//     } catch (error) {
//       console.error('Error deleting account:', error);
//       alert(`Error deleting account: ${error.message}`);
//     }
//   };

//   const cancelDeleteAccount = () => {
//     setShowConfirmModal(false);
//     setAccountToDelete(null);
//   };

//   // Permission check for edit action (only Admin role)
//   const canEditAccount = () => {
//     return currentUser?.isLoggedIn && currentUser?.role === 'admin';
//   };

//   // Calculate pagination details
//   const totalPages = Math.ceil(accounts.length / recordsPerPage);
//   const startRecord = (currentPage - 1) * recordsPerPage + 1;
//   const endRecord = Math.min(currentPage * recordsPerPage, accounts.length);

//   // Show loading state if authentication is still in progress
//   if (authLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-gray-600 text-lg">Loading authentication state...</div>
//       </div>
//     );
//   }

//   // Show loading state for data fetching after auth is resolved
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
//         <div className="text-gray-600 text-lg">Loading Accounts...</div>
//       </div>
//     );
//   }

//   // Conditional rendering for the table rows (extracted for clarity)
//   const renderAccountsTableRows = () => {
//     if (accounts.length === 0 && !loading) {
//       return (
//         <tr>
//           <td colSpan="8" className="text-center py-12">
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
//           {/* Edit and Delete buttons only visible and enabled for Admin */}
//           {currentUser?.isLoggedIn && currentUser?.role === 'admin' && (
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => {
//                   // Admin can edit any account, including changing status (though not in this modal)
//                   // For now, this button won't open the modal for edit as employees don't edit
//                   // If you re-introduce admin editing, you'd need a separate edit modal for admin
//                   alert("Admin can edit via a separate interface if needed. This button is removed for employee view.");
//                 }}
//                 disabled={true} // Always disabled for now as no edit modal is triggered
//                 className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 title="Edit Account (Admin Only - not implemented here)"
//               >
//                 <Edit className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={() => confirmDeleteAccount(account._id, account.accountOwner)}
//                 className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
//                 title="Delete Account (Admin Only)"
//               >
//                 <Trash2 className="w-4 h-4" />
//               </button>
//             </div>
//           )}
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
//             {/* Display logged-in user info */}
//             {currentUser?.isLoggedIn && (
//               <div className="text-gray-700 text-sm">
//                 <span className="font-medium">Logged in as: {currentUser.name} ({currentUser.role})</span>
//               </div>
//             )}
//             {!currentUser?.isLoggedIn && (
//               <div className="text-gray-500 text-sm">Not logged in.</div>
//             )}
//           </div>

//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => {
//                 setShowRequestForm(true); // Open the modal for requesting
//               }}
//               disabled={!currentUser?.isLoggedIn || currentUser?.role === 'admin'} // Disable if not logged in or if admin
//               className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Request Account
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
//                 <span>{startRecord}-{endRecord} of {accounts.length}</span>
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
//                   {currentUser?.isLoggedIn && currentUser?.role === 'admin' && ( // Show Actions column only for admin
//                     <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th>
//                   )}
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {renderAccountsTableRows()}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Request Account Modal */}
//       {showRequestForm && (
//         <RequestAccountModal
//           onClose={handleCloseRequestModal}
//           fetchAccounts={fetchAccounts}
//         />
//       )}

//       {/* Confirmation Modal for Delete */}
//       {showConfirmModal && (
//         <ConfirmationModal
//           message={`Are you sure you want to delete account: ${accountToDelete?.id}? This action cannot be undone.`}
//           onConfirm={executeDeleteAccount}
//           onCancel={cancelDeleteAccount}
//         />
//       )}
//     </div>
//   );
// };

// export default Accountemployee;


import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  Plus,
  Users, // For empty state icon
  Edit, // For edit icon (though will be removed for employees)
  Trash2, // For delete icon (though will be removed for employees)
} from 'lucide-react';

// Import your custom useAuth hook from the context file
import { useAuth } from '../../context/AuthContext'; // Corrected path to AuthContext

// Define sample accounts OUTSIDE the component to ensure its reference is stable.
// These are for fallback/initial structure, actual data comes from API.
const initialSampleAccounts = [
  { _id: 'sample1', accountName: 'Havells India', accountType: 'Partner', industry: 'Technology', phone: '+919269462745', email: 'contact@havellsindia.com', accountOwner: 'Amit Seth', billingAddress: '123 Tech Lane', billingState: 'GA', billingCountry: 'India', status: 'approved' },
  { _id: 'sample2', accountName: 'CMS Infotech', accountType: 'Customer', industry: 'Manufacturing', phone: '+918869464342', email: 'info@cmsinfotech.net', accountOwner: 'Danish Bindra', billingAddress: '456 Industrial Blvd', billingState: 'NY', billingCountry: 'India', status: 'approved' },
  { _id: 'sample3', accountName: 'NHPC', accountType: 'Reseller', industry: 'Aerospace', phone: '+972269462747', email: 'sales@nhpc.com', accountOwner: 'Amit Seth', billingAddress: '789 Iron Street', billingState: 'CA', billingCountry: 'India', status: 'approved' },
  { _id: 'sample4', accountName: 'Radiansys', accountType: 'Prospect', industry: 'Conglomerate', phone: '+919969462745', email: 'support@radiansys.org', accountOwner: 'Danish Bindra', billingAddress: '1000 Gotham Ave', billingState: 'TX', billingCountry: 'India', status: 'approved' },
  { _id: 'sample5', accountName: 'Jaypee Hospital', accountType: 'Customer', industry: 'Health', phone: '+919769462742', email: 'sales@jaypeehospital.in', accountOwner: 'Prabhat Mohant', billingAddress: '900 Skynet Rd', billingState: 'TX', billingCountry: 'India', status: 'pending' } // Example pending
];

// Base URL for your backend API for accounts
const API_BASE_URL = 'http://localhost:3000/api';

// Custom Confirmation Modal Component (reused for general confirmations)
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


// RequestAccountModal component - Modified for employee account requests
const RequestAccountModal = ({ onClose, fetchAccounts }) => {
  const { user: currentUser } = useAuth();

  const [formData, setFormData] = useState({
    accountOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
    accountName: '',
    accountType: '',
    industry: '',
    billingAddress: '',
    billingState: '',
    billingCountry: '',
    phone: '',
    email: '',
    status: 'pending' // New accounts requested by employees are always 'pending'
  });

  // Automatically set owner for employees when the modal opens or currentUser changes
  useEffect(() => {
    if (currentUser?.isLoggedIn && currentUser?.role === 'employee') {
      setFormData(prev => ({
        ...prev,
        accountOwner: currentUser.name,
        status: 'pending' // Ensure status is pending for new requests
      }));
    } else {
      // For non-employees (e.g., if an admin somehow accesses this modal directly),
      // allow them to pick or default to 'None' but still set status to 'pending' as a request.
      setFormData(prev => ({
        ...prev,
        accountOwner: 'None',
        status: 'pending'
      }));
    }
  }, [currentUser]);


  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const getActualAccountOwner = () => {
    if (currentUser?.isLoggedIn && currentUser?.role === 'employee') {
      return currentUser.name;
    }
    // Fallback for admin or unauthenticated, though this modal is primarily for employees
    return formData.accountOwner === 'None' ? 'Danish Bindra' : formData.accountOwner;
  };

  const handleSendRequest = async () => {
    if (!formData.accountName) {
      alert('Account Name is required to send an account request.');
      return;
    }

    try {
      const requestData = {
        ...formData,
        accountOwner: getActualAccountOwner(),
        status: 'pending' // Explicitly set status to pending
      };

      console.log('Sending account request data:', requestData);
      const response = await fetch(`${API_BASE_URL}/account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const createdAccount = await response.json();
      console.log('Account request sent successfully:', createdAccount);
      fetchAccounts(); // Re-fetch accounts to update the table in parent
      onClose(); // Close the modal
      alert('Account request sent successfully! Awaiting admin approval.'); // Provide feedback
    } catch (error) {
      console.error('Error sending account request:', error);
      alert(`Error sending account request: ${error.message}`);
    }
  };

  const handleSendRequestAndNew = async () => {
    if (!formData.accountName) {
      alert('Account Name is required to send an account request.');
      return;
    }

    try {
      const requestData = {
        ...formData,
        accountOwner: getActualAccountOwner(),
        status: 'pending' // Explicitly set status to pending
      };

      console.log('Sending account request for Save and New:', requestData);
      const response = await fetch(`${API_BASE_URL}/account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const createdAccount = await response.json();
      console.log('Account request sent successfully (Save and New):', createdAccount);
      fetchAccounts(); // Re-fetch accounts to update the table

      // Reset form data for the next entry, keep modal open
      setFormData({
        accountOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
        accountName: '',
        accountType: '',
        industry: '',
        billingAddress: '',
        billingState: '',
        billingCountry: '',
        phone: '',
        email: '',
        status: 'pending' // Always pending for new requests
      });
      alert('Account request sent successfully! You can submit another.'); // Provide feedback
    } catch (error) {
      console.error('Error sending account request (Save and New):', error);
      alert(`Error sending account request: ${error.message}`);
    }
  };

  // Determine if account owner field should be disabled (always for employee, unless admin)
  const isAccountOwnerDisabled = currentUser?.isLoggedIn && currentUser?.role === 'employee';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-900">Request New Account</h2>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSendRequestAndNew}
                className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm text-sm font-medium"
              >
                Send Request and New
              </button>
              <button
                onClick={handleSendRequest}
                className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
              >
                Send Request
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
                      className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10 ${isAccountOwnerDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                      disabled={isAccountOwnerDisabled} // Disable if employee is logged in
                    >
                      {isAccountOwnerDisabled ? (
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


const Accountemployee = () => {
  const { user: currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const [accounts, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false); // Renamed from showCreateForm
  const [showFilters, setShowFilters] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // For delete confirmation
  const [accountToDelete, setAccountToDelete] = useState(null); // Account ID to delete


  // Memoized function to fetch accounts from the backend
  const fetchAccounts = useCallback(async () => {
    if (authLoading || !currentUser) {
      setLoading(false);
      setAccounts([]); // Clear accounts if user not ready or not logged in
      return;
    }

    try {
      setLoading(true);
      let url = `${API_BASE_URL}/account?status=approved`; // Always fetch approved accounts

      // If employee, filter by accountOwner
      if (currentUser.isLoggedIn && currentUser.role === 'employee') {
        url = `${API_BASE_URL}/account?status=approved&accountOwner=${encodeURIComponent(currentUser.name)}`;
        console.log(`Fetching approved accounts for employee: ${currentUser.name}`);
      } else if (currentUser.isLoggedIn && currentUser.role === 'admin') {
        // Admins see all approved accounts
        console.log('Fetching all approved accounts for admin.');
        // Note: Admin might need a way to filter pending accounts separately, e.g., on a different page
      } else {
        // If not logged in, show no accounts or redirect
        setAccounts([]);
        setLoading(false);
        console.log('Not logged in, no accounts fetched.');
        return;
      }

      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        throw new Error(`Failed to fetch accounts: ${response.statusText}`);
      }

      const data = await response.json();
      setAccounts(data);
      console.log('Approved accounts fetched successfully:', data);
    } catch (error) {
      console.error('Error fetching accounts from backend:', error);
      // Fallback to sample data (filtered if employee, showing all approved samples if admin)
      const fallbackData = (currentUser?.isLoggedIn && currentUser?.role === 'employee')
        ? initialSampleAccounts.filter(acc => acc.accountOwner === currentUser.name && acc.status === 'approved')
        : (currentUser?.isLoggedIn && currentUser?.role === 'admin')
            ? initialSampleAccounts.filter(acc => acc.status === 'approved')
            : []; // No fallback for non-logged-in
      setAccounts(fallbackData);
      console.log('Falling back to sample accounts due to fetch error, with user/status filter applied.');
    } finally {
      setLoading(false);
    }
  }, [currentUser, authLoading]); // Re-fetch when currentUser or authLoading changes

  // Initial fetch of accounts when component mounts or currentUser/authLoading changes
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  // Handler to close the request modal
  const handleCloseRequestModal = () => { // Renamed from handleCloseModal
    setShowRequestForm(false);
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

  // Handle account deletion confirmation (only for Admin role)
  const confirmDeleteAccount = (accountId, accountOwner) => {
    // Only Admin can delete accounts
    const canDelete = currentUser?.isLoggedIn && currentUser?.role === 'admin';

    if (!canDelete) {
      alert("You do not have permission to delete accounts.");
      return;
    }
    setAccountToDelete({ id: accountId, owner: accountOwner });
    setShowConfirmModal(true);
  };

  // Execute account deletion
  const executeDeleteAccount = async () => {
    if (!accountToDelete) return;
    setShowConfirmModal(false); // Close the confirmation modal

    try {
      console.log('Attempting to delete account with ID:', accountToDelete.id);
      const response = await fetch(`${API_BASE_URL}/account/${accountToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      console.log('Account deleted successfully on backend:', accountToDelete.id);
      await fetchAccounts(); // Re-fetch accounts to update the table
      setAccountToDelete(null); // Reset the state
    } catch (error) {
      console.error('Error deleting account:', error);
      alert(`Error deleting account: ${error.message}`);
    }
  };

  const cancelDeleteAccount = () => {
    setShowConfirmModal(false);
    setAccountToDelete(null);
  };

  // Permission check for edit action (only Admin role)
  const canEditAccount = () => {
    return currentUser?.isLoggedIn && currentUser?.role === 'admin';
  };

  // Calculate pagination details
  const totalPages = Math.ceil(accounts.length / recordsPerPage);
  const startRecord = (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, accounts.length);

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
        <div className="text-gray-600 text-lg">Loading Accounts...</div>
      </div>
    );
  }

  // Conditional rendering for the table rows (extracted for clarity)
  const renderAccountsTableRows = () => {
    if (accounts.length === 0 && !loading) {
      return (
        <tr>
          <td colSpan={currentUser?.isLoggedIn && currentUser?.role === 'admin' ? "9" : "8"} className="text-center py-12">
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
          {/* Make Account Name clickable to view details */}
          <span
            onClick={() => navigate(`/employee-dashboard/accounts/${account._id}`)} // Navigate to the new detail page
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
        {currentUser?.isLoggedIn && currentUser?.role === 'admin' && ( // Show Actions column only for admin
          <td className="px-6 py-4 text-sm whitespace-nowrap">
            <div className="flex items-center space-x-2">
              {/* Edit button (disabled as no edit modal implemented for admin here, but leaving icon for context) */}
              <button
                // No direct edit functionality via modal for admin here, but an icon can be shown
                disabled={true} // Always disabled for now as no specific edit modal is triggered
                className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Edit Account (Admin Only - not implemented here)"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => confirmDeleteAccount(account._id, account.accountOwner)}
                className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
                title="Delete Account (Admin Only)"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </td>
        )}
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
                setShowRequestForm(true); // Open the modal for requesting
              }}
              disabled={!currentUser?.isLoggedIn || currentUser?.role === 'admin'} // Disable if not logged in or if admin
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 mr-2" />
              Request Account
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
                <span>{startRecord}-{endRecord} of {accounts.length}</span>
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
                  {currentUser?.isLoggedIn && currentUser?.role === 'admin' && ( // Show Actions column only for admin
                    <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {renderAccountsTableRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Request Account Modal */}
      {showRequestForm && (
        <RequestAccountModal
          onClose={handleCloseRequestModal}
          fetchAccounts={fetchAccounts}
        />
      )}

      {/* Confirmation Modal for Delete */}
      {showConfirmModal && (
        <ConfirmationModal
          message={`Are you sure you want to delete account: ${accountToDelete?.id}? This action cannot be undone.`}
          onConfirm={executeDeleteAccount}
          onCancel={cancelDeleteAccount}
        />
      )}
    </div>
  );
};

export default Accountemployee;
