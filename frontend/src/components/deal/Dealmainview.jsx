// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ArrowLeft, User, Calendar, DollarSign, Building2, Tag, Truck, FileText } from 'lucide-react';

// const API_BASE_URL = 'http://localhost:3000/api';

// const Dealmainview = () => {
//   const { dealId } = useParams(); // Get dealId from URL parameters
//   const navigate = useNavigate(); // For navigating back
//   const [deal, setDeal] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchDealDetails = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       console.log(`Fetching details for deal ID: ${dealId} from ${API_BASE_URL}/deal/${dealId}`);
//       const response = await fetch(`${API_BASE_URL}/deal/${dealId}`);

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Failed to fetch deal: ${response.status} - ${errorText}`);
//       }

//       const data = await response.json();
//       setDeal(data);
//       console.log('Deal details fetched successfully:', data);
//     } catch (err) {
//       console.error('Error fetching deal details:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [dealId]);

//   useEffect(() => {
//     if (dealId) {
//       fetchDealDetails();
//     }
//   }, [dealId, fetchDealDetails]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
//         <div className="text-gray-600 text-lg">Loading Deal Details...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans p-4">
//         <div className="text-red-600 text-lg mb-4">Error: {error}</div>
//         <button
//           onClick={() => navigate('/admin-dashboard/deals')} // Corrected navigation path
//           className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-md text-base font-medium flex items-center"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" /> Back to Deals List
//         </button>
//       </div>
//     );
//   }

//   if (!deal) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans p-4">
//         <div className="text-gray-600 text-lg mb-4">Deal not found.</div>
//         <button
//           onClick={() => navigate('/admin-dashboard/deals')} // Corrected navigation path
//           className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-md text-base font-medium flex items-center"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" /> Back to Deals List
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl border border-gray-200">
//         <div className="flex items-center justify-between px-6 py-4 bg-indigo-700 text-white rounded-t-lg">
//           <h1 className="text-2xl font-bold">{deal.dealName}</h1>
//           <button
//             onClick={() => navigate('/admin-dashboard/deals')} // Corrected navigation path
//             className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium flex items-center"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
//           </button>
//         </div>

//         <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
//           {/* Deal Information Section */}
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Deal Information</h2>
//             <div className="flex items-center text-gray-700">
//               <DollarSign className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" />
//               <p><span className="font-medium">Amount:</span> ₹{deal.amount !== undefined && deal.amount !== null ? parseFloat(deal.amount).toLocaleString() : 'N/A'}</p>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <Tag className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
//               <p><span className="font-medium">Sales Stage:</span> {deal.salesStage || 'N/A'}</p>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <User className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
//               <p><span className="font-medium">Contact Person:</span> {deal.contactName || 'N/A'}</p>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <User className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
//               <p><span className="font-medium">Deal Owner:</span> {deal.dealOwner || 'N/A'}</p>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <Calendar className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
//               <p><span className="font-medium">Close Date:</span> {deal.closeDate || 'N/A'}</p>
//             </div>
//           </div>

//           {/* Additional Details Section */}
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Additional Details</h2>
//             <div className="flex items-center text-gray-700">
//               <Building2 className="w-5 h-5 mr-3 text-purple-600 flex-shrink-0" />
//               <p><span className="font-medium">OEM Name:</span> {deal.oemName || 'N/A'}</p>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <User className="w-5 h-5 mr-3 text-indigo-600 flex-shrink-0" />
//               <p><span className="font-medium">Service Engineer:</span> {deal.serviceEngineer || 'N/A'}</p>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <Building2 className="w-5 h-5 mr-3 text-yellow-600 flex-shrink-0" />
//               <p><span className="font-medium">Account Name:</span> {deal.accountName || 'N/A'}</p>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <Calendar className="w-5 h-5 mr-3 text-pink-600 flex-shrink-0" />
//               <p><span className="font-medium">Start Date:</span> {deal.startDate || 'N/A'}</p>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <FileText className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
//               <p><span className="font-medium">Created At:</span> {new Date(deal.createdAt).toLocaleString() || 'N/A'}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dealmainview;


// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
// import {
//   ArrowLeft, User, Calendar, DollarSign, Building2, Tag, Truck, FileText,
//   Edit, Trash2, BarChart3, ChevronDown, Loader2, // Added Loader2 for general loading
// } from 'lucide-react';

// const API_BASE_URL = 'http://localhost:3000/api';

// // --- Custom Confirmation Modal Component ---
// const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Action</h3>
//         <p className="text-gray-700 mb-6">{message}</p>
//         <div className="flex justify-end space-x-3">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors text-sm font-medium"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
//           >
//             Confirm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- CreateDealModal Component (reused from Dealmain) ---
// const CreateDealModal = ({
//   formData,
//   handleFormChange,
//   handleCloseModal,
//   handleSaveAndNew,
//   handleCreateDeal,
//   handleUpdateDeal,
//   editingDeal,
//   KANBAN_STAGES,
//   accountNames
// }) => {
//     // Define KANBAN_STAGES if not passed as prop
//     const internalKANBAN_STAGES = KANBAN_STAGES || [
//       'Qualification', 'Need Analysis', 'Value Proposition', 'Identity Decision Maker',
//       'Proposal/Price Quote', 'Negotiation', 'Closed Won', 'Lost', 'PO received', 'Implemented', 'Win',
//       'Validated', 'Pipeline', 'Techwin', 'Commit', 'Upside', 'Budgetary'
//     ];
  
//     const [localAccountNames, setLocalAccountNames] = useState(accountNames || []);
  
//     // Fetch account names if not provided by prop
//     useEffect(() => {
//       if (!accountNames || accountNames.length === 0) {
//         const fetchLocalAccountNames = async () => {
//           try {
//             const response = await fetch(`${API_BASE_URL}/account`);
//             if (!response.ok) {
//               throw new Error('Failed to fetch account names for modal');
//             }
//             const data = await response.json();
//             const uniqueNames = [...new Set(data.map(account => account.accountName))];
//             setLocalAccountNames(uniqueNames);
//           } catch (error) {
//             console.error('Error fetching account names for modal:', error);
//           }
//         };
//         fetchLocalAccountNames();
//       }
//     }, [accountNames]);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6 border-b pb-4">
//             <h2 className="text-2xl font-bold text-gray-900">{editingDeal ? 'Edit Deal' : 'Create Deal'}</h2>
//             <div className="flex space-x-3">
//               <button
//                 onClick={handleCloseModal}
//                 className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
//               >
//                 Cancel
//               </button>
//               {!editingDeal && (
//                 <button
//                   onClick={handleSaveAndNew}
//                   className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm text-sm font-medium"
//                 >
//                   Save and new
//                 </button>
//               )}
//               <button
//                 onClick={editingDeal ? handleUpdateDeal : handleCreateDeal}
//                 className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
//               >
//                 {editingDeal ? 'Update' : 'Save'}
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-gray-900">Deal Information</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="dealName" className="block text-sm font-medium text-gray-700 mb-1">Deal Name <span className="text-red-500">*</span></label>
//                   <input
//                     id="dealName"
//                     type="text"
//                     value={formData.dealName}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Deal Name"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount <span className="text-red-500">*</span></label>
//                   <input
//                     id="amount"
//                     type="number"
//                     value={formData.amount}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Amount"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="salesStage" className="block text-sm font-medium text-gray-700 mb-1">Sales Stage</label>
//                   <div className="relative">
//                     <select
//                       id="salesStage"
//                       value={formData.salesStage}
//                       onChange={handleFormChange}
//                       className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                     >
//                       {internalKANBAN_STAGES.map(stage => (
//                         <option key={stage} value={stage}>{stage}</option>
//                       ))}
//                     </select>
//                     <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                       <ChevronDown className="w-5 h-5 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <label htmlFor="closeDate" className="block text-sm font-medium text-gray-700 mb-1">Close Date</label>
//                   <input
//                     id="closeDate"
//                     type="date"
//                     value={formData.closeDate}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-gray-900">Additional Details</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="oemName" className="block text-sm font-medium text-gray-700 mb-1">OEM Name</label>
//                   <input
//                     id="oemName"
//                     type="text"
//                     value={formData.oemName}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter OEM Name"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="serviceEngineer" className="block text-sm font-medium text-gray-700 mb-1">Service Engineer</label>
//                   <input
//                     id="serviceEngineer"
//                     type="text"
//                     value={formData.serviceEngineer}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Service Engineer Name"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
//                   <div className="relative">
//                     <select
//                       id="accountName"
//                       value={formData.accountName}
//                       onChange={handleFormChange}
//                       className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                     >
//                       <option value="">- Select Account -</option>
//                       {localAccountNames.map(name => (
//                         <option key={name} value={name}>{name}</option>
//                       ))}
//                     </select>
//                     <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                       <ChevronDown className="w-5 h-5 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//                   <input
//                     id="startDate"
//                     type="date"
//                     value={formData.startDate}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
//                   <input
//                     id="contactName"
//                     type="text"
//                     value={formData.contactName}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Contact Person"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="dealOwner" className="block text-sm font-medium text-gray-700 mb-1">Deal Owner</label>
//                   <div className="relative">
//                     <select
//                       id="dealOwner"
//                       value={formData.dealOwner}
//                       onChange={handleFormChange}
//                       className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                     >
//                       <option value="None">-None-</option>
//                       <option value="Amit Seth">Amit Seth</option>
//                       <option value="Danish Bindra">Danish Bindra</option>
//                       <option value="Tanushree Das">Tanushree Das</option>
//                       <option value="Tanmay Singh">Tanmay Singh</option>
//                       <option value="Prabhat Mohant">Prabhat Mohant</option>
//                     </select>
//                     <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                       <ChevronDown className="w-5 h-5 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Dealmainview = () => {
//   const navigate = useNavigate();
//   const { dealId } = useParams(); // This is the ID of the *specific* deal clicked
//   const [searchParams] = useSearchParams();
//   const dealNameFromQuery = searchParams.get('dealName'); // Deal Name from query param, if any

//   const [primaryDeal, setPrimaryDeal] = useState(null); // The specific deal being viewed
//   const [otherRelatedDeals, setOtherRelatedDeals] = useState([]); // Other deals with the same name
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [editingDeal, setEditingDeal] = useState(null);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [dealToDelete, setDealToDelete] = useState(null);

//   const [formData, setFormData] = useState({
//     dealName: '', amount: '', salesStage: 'Qualification', contactName: '',
//     dealOwner: 'None', closeDate: '', oemName: '', serviceEngineer: '',
//     accountName: '', startDate: '',
//   });

//   const [accountNames, setAccountNames] = useState([]);
//   useEffect(() => {
//     const fetchAccountNames = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/account`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch account names for dropdown');
//         }
//         const data = await response.json();
//         const uniqueAccountNames = [...new Set(data.map(account => account.accountName))];
//         setAccountNames(uniqueAccountNames);
//       } catch (error) {
//         console.error('Error fetching account names for dropdown:', error);
//         setAccountNames([]);
//       }
//     };
//     fetchAccountNames();
//   }, []);

//   useEffect(() => {
//     if (editingDeal) {
//       setFormData({
//         dealName: editingDeal.dealName || '',
//         amount: editingDeal.amount !== undefined && editingDeal.amount !== null ? String(editingDeal.amount) : '',
//         salesStage: editingDeal.salesStage || 'Qualification',
//         contactName: editingDeal.contactName || '',
//         dealOwner: editingDeal.dealOwner || 'None',
//         closeDate: editingDeal.closeDate ? editingDeal.closeDate.split('T')[0] : '',
//         oemName: editingDeal.oemName || '',
//         serviceEngineer: editingDeal.serviceEngineer || '',
//         accountName: editingDeal.accountName || '',
//         startDate: editingDeal.startDate ? editingDeal.startDate.split('T')[0] : '',
//       });
//     } else {
//       setFormData({
//         dealName: '', amount: '', salesStage: 'Qualification', contactName: '',
//         dealOwner: 'None', closeDate: '', oemName: '', serviceEngineer: '',
//         accountName: '', startDate: '',
//       });
//     }
//   }, [editingDeal]);

//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleCloseModal = () => {
//     setShowCreateForm(false);
//     setEditingDeal(null);
//   };

//   const handleCreateDeal = async () => {
//     if (!formData.dealName || !formData.amount) {
//       alert('Deal Name and Amount are required.');
//       return;
//     }
//     try {
//       const response = await fetch(`${API_BASE_URL}/deal`, {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
//       });
//       const responseText = await response.text();
//       if (!response.ok) {
//         let errorMessage = responseText; try { const errorData = JSON.parse(responseText); if (errorData.message) errorMessage = errorData.message; } catch (parseError) { console.error("Failed to parse error response as JSON:", parseError); }
//         alert(`Failed to create deal: ${errorMessage}. Check console for details.`); throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
//       }
//       await fetchAndSeparateDeals(primaryDeal ? primaryDeal._id : dealId, primaryDeal ? primaryDeal.dealName : dealNameFromQuery);
//       handleCloseModal();
//     } catch (error) { console.error('Error creating deal:', error); }
//   };

//   const handleSaveAndNew = async () => {
//     if (!formData.dealName || !formData.amount) {
//       alert('Deal Name and Amount are required to save and create a new deal.');
//       return;
//     }
//     try {
//       const response = await fetch(`${API_BASE_URL}/deal`, {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
//       });
//       const responseText = await response.text();
//       if (!response.ok) {
//         let errorMessage = responseText; try { const errorData = JSON.parse(responseText); if (errorData.message) errorMessage = errorData.message; } catch (parseError) { console.error("Failed to parse error response as JSON:", parseError); }
//         alert(`Failed to save and create new deal: ${errorMessage}. Check console for details.`); throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
//       }
//       await fetchAndSeparateDeals(primaryDeal ? primaryDeal._id : dealId, primaryDeal ? primaryDeal.dealName : dealNameFromQuery);
//       setFormData({
//         dealName: '', amount: '', salesStage: 'Qualification', contactName: '',
//         dealOwner: 'None', closeDate: '', oemName: '', serviceEngineer: '',
//         accountName: '', startDate: '',
//       });
//       setEditingDeal(null);
//     } catch (error) { console.error('Error saving and creating new deal:', error); }
//   };

//   const handleUpdateDeal = async () => {
//     if (!editingDeal || !formData.dealName || !formData.amount) {
//       alert('Deal Name, Amount, and a deal to edit are required for update.');
//       return;
//     }
//     try {
//       const response = await fetch(`${API_BASE_URL}/deal/${editingDeal._id}`, {
//         method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
//       });
//       const responseText = await response.text();
//       if (!response.ok) {
//         let errorMessage = responseText; try { const errorData = JSON.parse(responseText); if (errorData.message) errorMessage = errorData.message; } catch (parseError) { console.error("Failed to parse error response as JSON:", parseError); }
//         alert(`Failed to update deal: ${errorMessage}. Check console for details.`); throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
//       }
//       await fetchAndSeparateDeals(primaryDeal ? primaryDeal._id : dealId, primaryDeal ? primaryDeal.dealName : dealNameFromQuery);
//       handleCloseModal();
//     } catch (error) { console.error('Error updating deal:', error); }
//   };

//   const confirmDeleteDeal = (id) => {
//     setDealToDelete(id);
//     setShowConfirmModal(true);
//   };

//   const executeDeleteDeal = async () => {
//     if (!dealToDelete) return;
//     setShowConfirmModal(false);
//     try {
//       const response = await fetch(`${API_BASE_URL}/deal/${dealToDelete}`, { method: 'DELETE' });
//       const responseText = await response.text();
//       if (!response.ok) {
//         let errorMessage = responseText; try { const errorData = JSON.parse(responseText); if (errorData.message) errorMessage = errorData.message; } catch (parseError) { console.error("Failed to parse error response as JSON:", parseError); }
//         alert(`Failed to delete deal: ${errorMessage}. Check console for details.`); throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
//       }
//       // After deletion, re-fetch and re-separate deals
//       await fetchAndSeparateDeals(primaryDeal ? primaryDeal._id : dealId, primaryDeal ? primaryDeal.dealName : dealNameFromQuery);
//       setDealToDelete(null);
//     } catch (error) { console.error('Error deleting deal:', error); }
//   };

//   const cancelDeleteDeal = () => {
//     setShowConfirmModal(false);
//     setDealToDelete(null);
//   };

//   // New function to fetch the primary deal and then other related deals
//   const fetchAndSeparateDeals = useCallback(async (currentDealId, initialDealName) => {
//     setLoading(true);
//     setError(null);
//     setPrimaryDeal(null);
//     setOtherRelatedDeals([]);

//     let fetchedPrimaryDeal = null;
//     let effectiveDealName = initialDealName;

//     try {
//       // 1. Fetch the specific primary deal by ID
//       if (currentDealId) {
//         const primaryResponse = await fetch(`${API_BASE_URL}/deal/${currentDealId}`);
//         if (!primaryResponse.ok) {
//           throw new Error(`Failed to fetch primary deal: ${primaryResponse.status} - ${await primaryResponse.text()}`);
//         }
//         fetchedPrimaryDeal = await primaryResponse.json();
//         setPrimaryDeal(fetchedPrimaryDeal);
//         effectiveDealName = fetchedPrimaryDeal.dealName; // Use its name for filtering
//       } else {
//         // If no dealId, and no initialDealName, we can't show anything specific
//         setLoading(false);
//         setError('No specific deal ID or name provided for display.');
//         return;
//       }

//       // 2. Fetch all deals (or filter if your API supports dealName query for all)
//       // For now, fetching all and filtering in client-side as per previous implementation logic
//       const allDealsResponse = await fetch(`${API_BASE_URL}/deal`);
//       if (!allDealsResponse.ok) {
//         throw new Error(`Failed to fetch all deals: ${allDealsResponse.status} - ${await allDealsResponse.text()}`);
//       }
//       const allDeals = await allDealsResponse.json();

//       // 3. Filter for other deals with the same effectiveDealName, excluding the primary one
//       if (effectiveDealName) {
//         const related = allDeals.filter(
//           (deal) => deal.dealName === effectiveDealName && deal._id !== currentDealId
//         );
//         setOtherRelatedDeals(related);
//       } else {
//         setOtherRelatedDeals([]);
//       }

//     } catch (err) {
//       console.error('Error in fetchAndSeparateDeals:', err);
//       setError(`Failed to load deal details or related deals: ${err.message}`);
//       setPrimaryDeal(null);
//       setOtherRelatedDeals([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     // Trigger the combined fetch when dealId or dealNameFromQuery changes
//     fetchAndSeparateDeals(dealId, dealNameFromQuery);
//   }, [dealId, dealNameFromQuery, fetchAndSeparateDeals]); // Add fetchAndSeparateDeals to dependencies

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
//         <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-2" />
//         <span className="text-lg text-gray-700">Loading Deal Details...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans p-4">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//           <strong className="font-bold">Error!</strong>
//           <span className="block sm:inline"> {error}</span>
//           <button
//             onClick={() => navigate('/admin-dashboard/deals')}
//             className="mt-4 block mx-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
//           >
//             Go Back to Deals List
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!primaryDeal) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans p-4 text-gray-700">
//         <h2 className="text-xl font-semibold mb-4">Deal Not Found</h2>
//         <p className="mb-6">The specific deal you are looking for does not exist or has been deleted.</p>
//         <button
//           onClick={() => navigate('/admin-dashboard/deals')}
//           className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-lg text-base font-medium"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" />
//           Back to Deals List
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-6">
//       <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl border border-gray-200">
//         <div className="flex items-center justify-between px-6 py-4 bg-indigo-700 text-white rounded-t-lg">
//           <h1 className="text-2xl font-bold">Deal Details: {primaryDeal.dealName}</h1>
//           <button
//             onClick={() => navigate('/admin-dashboard/deals')}
//             className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium flex items-center"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" /> Back to Deals List
//           </button>
//         </div>

//         {/* Primary Deal Information Section (Detail View) */}
//         <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 border-b border-gray-200 pb-6 mb-6">
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Deal Information</h2>
//             <div className="flex items-center text-gray-700">
//               <DollarSign className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" />
//               <p><span className="font-medium">Amount:</span> ₹{primaryDeal.amount !== undefined && primaryDeal.amount !== null ? parseFloat(primaryDeal.amount).toLocaleString() : 'N/A'}</p>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <Tag className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
//               <p><span className="font-medium">Sales Stage:</span> {primaryDeal.salesStage || 'N/A'}</p>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <User className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
//               <p><span className="font-medium">Contact Person:</span> {primaryDeal.contactName || 'N/A'}</p>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <User className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
//               <p><span className="font-medium">Deal Owner:</span> {primaryDeal.dealOwner || 'N/A'}</p>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <Calendar className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
//               <p><span className="font-medium">Close Date:</span> {primaryDeal.closeDate || 'N/A'}</p>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Additional Details</h2>
//             <div className="flex items-center text-gray-700">
//               <Building2 className="w-5 h-5 mr-3 text-purple-600 flex-shrink-0" />
//               <p><span className="font-medium">OEM Name:</span> {primaryDeal.oemName || 'N/A'}</p>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <User className="w-5 h-5 mr-3 text-indigo-600 flex-shrink-0" />
//               <p><span className="font-medium">Service Engineer:</span> {primaryDeal.serviceEngineer || 'N/A'}</p>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <Building2 className="w-5 h-5 mr-3 text-yellow-600 flex-shrink-0" />
//               <p><span className="font-medium">Account Name:</span> {primaryDeal.accountName || 'N/A'}</p>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <Calendar className="w-5 h-5 mr-3 text-pink-600 flex-shrink-0" />
//               <p><span className="font-medium">Start Date:</span> {primaryDeal.startDate || 'N/A'}</p>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <FileText className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
//               <p><span className="font-medium">Created At:</span> {new Date(primaryDeal.createdAt).toLocaleString() || 'N/A'}</p>
//             </div>
//             {/* Action buttons for the primary deal */}
//             {/* <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-100">
//                 <button
//                     onClick={() => {
//                         setEditingDeal(primaryDeal);
//                         setShowCreateForm(true);
//                     }}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-sm text-sm font-medium flex items-center"
//                 >
//                     <Edit className="w-4 h-4 mr-2" /> Edit Deal
//                 </button>
//                 <button
//                     onClick={() => confirmDeleteDeal(primaryDeal._id)}
//                     className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-sm text-sm font-medium flex items-center"
//                 >
//                     <Trash2 className="w-4 h-4 mr-2" /> Delete Deal
//                 </button>
//             </div> */}
//           </div>
//         </div>

//         {/* Other Related Deals Section (Table View) */}
//         <div className="p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Other Deals for "{primaryDeal.dealName}" ({otherRelatedDeals.length})</h2>
//           {otherRelatedDeals.length > 0 ? (
//             <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Stage</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Owner</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Close Date</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {otherRelatedDeals.map((deal) => (
//                     <tr key={deal._id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{deal.dealName || 'N/A'}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{deal.amount !== undefined && deal.amount !== null ? parseFloat(deal.amount).toLocaleString() : 'N/A'}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{deal.salesStage || 'N/A'}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{deal.contactName || 'N/A'}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{deal.dealOwner || 'N/A'}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{deal.closeDate || 'N/A'}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         {/* <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => {
//                               setEditingDeal(deal);
//                               setShowCreateForm(true);
//                             }}
//                             className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
//                             title="Edit Deal"
//                           >
//                             <Edit className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() => confirmDeleteDeal(deal._id)}
//                             className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
//                             title="Delete Deal"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div> */}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="text-center py-8 text-gray-500">
//               <p>No other deals found with the name "{primaryDeal.dealName}".</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Create/Edit Deal Modal */}
//       {showCreateForm && (
//         <CreateDealModal
//           formData={formData}
//           handleFormChange={handleFormChange}
//           handleCloseModal={handleCloseModal}
//           handleSaveAndNew={handleSaveAndNew}
//           handleCreateDeal={handleCreateDeal}
//           handleUpdateDeal={handleUpdateDeal}
//           editingDeal={editingDeal}
//           KANBAN_STAGES={[
//             'Qualification', 'Need Analysis', 'Value Proposition', 'Identity Decision Maker',
//             'Proposal/Price Quote', 'Negotiation', 'Closed Won', 'Lost', 'PO received', 'Implemented', 'Win',
//             'Validated', 'Pipeline', 'Techwin', 'Commit', 'Upside', 'Budgetary'
//           ]}
//           accountNames={accountNames}
//         />
//       )}

//       {/* Confirmation Modal for deletion */}
//       {showConfirmModal && (
//         <ConfirmationModal
//           message="Are you sure you want to delete this deal?"
//           onConfirm={executeDeleteDeal}
//           onCancel={cancelDeleteDeal}
//         />
//       )}
//     </div>
//   );
// };

// export default Dealmainview;



import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft, User, Calendar, DollarSign, Building2, Tag, Truck, FileText,
  Edit, Trash2, BarChart3, ChevronDown, Loader2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Import useAuth to get current user

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

// --- CreateDealModal Component (reused from Dealmain, now enhanced) ---
const CreateDealModal = ({
  formData,
  handleFormChange,
  handleCloseModal,
  handleSaveAndNew,
  handleCreateDeal,
  handleUpdateDeal,
  editingDeal,
  KANBAN_STAGES,
  accountNames,
  currentUser // NEW: Pass currentUser to modal
}) => {
  // Define KANBAN_STAGES if not passed as prop or use a default
  const internalKANBAN_STAGES = KANBAN_STAGES || [
    'Qualification', 'Need Analysis', 'Value Proposition', 'Identity Decision Maker',
    'Proposal/Price Quote', 'Negotiation', 'Closed Won', 'Lost', 'PO received', 'Implemented', 'Win',
    'Validated', 'Pipeline', 'Techwin', 'Commit', 'Upside', 'Budgetary'
  ];

  const [localAccountNames, setLocalAccountNames] = useState(accountNames || []);

  // Fetch account names if not provided by prop or if empty
  useEffect(() => {
    if (!accountNames || accountNames.length === 0) {
      const fetchLocalAccountNames = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/account`);
          if (!response.ok) {
            throw new Error('Failed to fetch account names for modal');
          }
          const data = await response.json();
          const uniqueNames = [...new Set(data.map(account => account.accountName))].sort(); // Sort alphabetically
          setLocalAccountNames(uniqueNames);
        } catch (error) {
          console.error('Error fetching account names for modal:', error);
        }
      };
      fetchLocalAccountNames();
    }
  }, [accountNames]);

  const isDealOwnerDisabled = currentUser?.isLoggedIn && currentUser?.role === 'employee';


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-900">{editingDeal ? 'Edit Deal' : 'Create Deal'}</h2>
            <div className="flex space-x-3">
              <button
                onClick={handleCloseModal}
                className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
              >
                Cancel
              </button>
              {!editingDeal && (
                <button
                  onClick={handleSaveAndNew}
                  className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm text-sm font-medium"
                >
                  Save and new
                </button>
              )}
              <button
                onClick={editingDeal ? handleUpdateDeal : handleCreateDeal}
                className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
              >
                {editingDeal ? 'Update' : 'Save'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Deal Information</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="dealOwner" className="block text-sm font-medium text-gray-700 mb-1">Deal Owner</label>
                  <div className="relative">
                    <select
                      id="dealOwner"
                      value={formData.dealOwner}
                      onChange={handleFormChange}
                      className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10 ${isDealOwnerDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                      disabled={isDealOwnerDisabled} // Disable if employee
                    >
                      {isDealOwnerDisabled ? (
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
                  <label htmlFor="dealName" className="block text-sm font-medium text-gray-700 mb-1">Deal Name <span className="text-red-500">*</span></label>
                  <input
                    id="dealName"
                    type="text"
                    value={formData.dealName}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Deal Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount <span className="text-red-500">*</span></label>
                  <input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Amount"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="salesStage" className="block text-sm font-medium text-gray-700 mb-1">Sales Stage</label>
                  <div className="relative">
                    <select
                      id="salesStage"
                      value={formData.salesStage}
                      onChange={handleFormChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
                    >
                      {internalKANBAN_STAGES.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="closeDate" className="block text-sm font-medium text-gray-700 mb-1">Close Date</label>
                  <input
                    id="closeDate"
                    type="date"
                    value={formData.closeDate}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Additional Details</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="oemName" className="block text-sm font-medium text-gray-700 mb-1">OEM Name</label>
                  <input
                    id="oemName"
                    type="text"
                    value={formData.oemName}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter OEM Name"
                  />
                </div>
                <div>
                  <label htmlFor="serviceEngineer" className="block text-sm font-medium text-gray-700 mb-1">Service Engineer</label>
                  <input
                    id="serviceEngineer"
                    type="text"
                    value={formData.serviceEngineer}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Service Engineer Name"
                  />
                </div>
                <div>
                  <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">Account Name <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      id="accountName"
                      value={formData.accountName}
                      onChange={handleFormChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
                      required // Account Name is mandatory
                    >
                      <option value="">- Select Account -</option>
                      {localAccountNames.map(name => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                  <input
                    id="contactName"
                    type="text"
                    value={formData.contactName}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Contact Person"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleFormChange}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter deal description..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};


const Dealmainview = () => {
  const navigate = useNavigate();
  const { dealId } = useParams(); // This is the ID of the *specific* deal clicked
  const [searchParams] = useSearchParams();
  const dealNameFromQuery = searchParams.get('dealName'); // Deal Name from query param, if any
  const { user: currentUser } = useAuth(); // Get current user for owner logic and permissions

  const [primaryDeal, setPrimaryDeal] = useState(null); // The specific deal being viewed
  const [otherRelatedDeals, setOtherRelatedDeals] = useState([]); // Other deals with the same accountName
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingDeal, setEditingDeal] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [dealToDelete, setDealToDelete] = useState(null);

  const [formData, setFormData] = useState({
    dealName: '', amount: '', salesStage: 'Qualification', contactName: '',
    dealOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None', // Default to current user if employee
    closeDate: '', oemName: '', serviceEngineer: '',
    accountName: '', startDate: '', description: ''
  });

  const [accountNames, setAccountNames] = useState([]);
  useEffect(() => {
    const fetchAccountNames = async () => {
      try {
        let url = `${API_BASE_URL}/account`;
        // Only fetch accounts owned by the current employee if logged in as employee
        if (currentUser?.isLoggedIn && currentUser.role === 'employee') {
          url += `?accountOwner=${encodeURIComponent(currentUser.name)}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch account names for dropdown');
        }
        const data = await response.json();
        const uniqueAccountNames = [...new Set(data.map(account => account.accountName))].sort(); // Sort alphabetically
        setAccountNames(uniqueAccountNames);
      } catch (error) {
        console.error('Error fetching account names for dropdown:', error);
        setAccountNames([]);
      }
    };
    fetchAccountNames();
  }, [currentUser]); // Depend on currentUser to refetch if user changes (e.g., login/logout)


  useEffect(() => {
    if (editingDeal) {
      setFormData({
        dealOwner: editingDeal.dealOwner || 'None',
        dealName: editingDeal.dealName || '',
        amount: editingDeal.amount !== undefined && editingDeal.amount !== null ? String(editingDeal.amount) : '',
        salesStage: editingDeal.salesStage || 'Qualification',
        contactName: editingDeal.contactName || '',
        closeDate: editingDeal.closeDate ? new Date(editingDeal.closeDate).toISOString().split('T')[0] : '', // Format date for input
        oemName: editingDeal.oemName || '',
        serviceEngineer: editingDeal.serviceEngineer || '',
        accountName: editingDeal.accountName || '',
        startDate: editingDeal.startDate ? new Date(editingDeal.startDate).toISOString().split('T')[0] : '', // Format date for input
        description: editingDeal.description || ''
      });
    } else {
      setFormData({
        dealName: '', amount: '', salesStage: 'Qualification', contactName: '',
        dealOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
        closeDate: '', oemName: '', serviceEngineer: '',
        accountName: '', startDate: '', description: ''
      });
    }
  }, [editingDeal, currentUser]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCloseModal = () => {
    setShowCreateForm(false);
    setEditingDeal(null);
  };

  const getActualDealOwner = () => {
    if (currentUser?.isLoggedIn && currentUser?.role === 'employee') {
      return currentUser.name;
    }
    return formData.dealOwner === 'None' ? 'Amit Seth' : formData.dealOwner;
  };

  const handleCreateDeal = async () => {
    if (!formData.dealName || !formData.amount || !formData.accountName) {
      alert('Deal Name, Amount, and Account Name are required to create a deal.');
      return;
    }
    if (isNaN(parseFloat(formData.amount))) {
      alert('Amount must be a valid number.');
      return;
    }

    try {
      const newDealData = {
        ...formData,
        amount: parseFloat(formData.amount), // Ensure amount is a number
        dealOwner: getActualDealOwner(),
      };
      console.log('Creating deal with:', newDealData);
      const response = await fetch(`${API_BASE_URL}/deal`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newDealData),
      });
      const responseText = await response.text();
      if (!response.ok) {
        let errorMessage = responseText;
        try { const errorData = JSON.parse(responseText); if (errorData.message) errorMessage = errorData.message; } catch (parseError) { console.error("Failed to parse error response as JSON:", parseError); }
        alert(`Failed to create deal: ${errorMessage}. Check console for details.`); throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }
      // Re-fetch based on primary deal's ID and name for comprehensive update
      await fetchAndSeparateDeals(primaryDeal ? primaryDeal._id : dealId, primaryDeal ? primaryDeal.dealName : dealNameFromQuery);
      handleCloseModal();
    } catch (error) { console.error('Error creating deal:', error); }
  };

  const handleSaveAndNew = async () => {
    if (!formData.dealName || !formData.amount || !formData.accountName) {
      alert('Deal Name, Amount, and Account Name are required to save and create a new deal.');
      return;
    }
    if (isNaN(parseFloat(formData.amount))) {
      alert('Amount must be a valid number.');
      return;
    }

    try {
      const newDealData = {
        ...formData,
        amount: parseFloat(formData.amount), // Ensure amount is a number
        dealOwner: getActualDealOwner(),
      };
      console.log('Saving and creating new deal with:', newDealData);
      const response = await fetch(`${API_BASE_URL}/deal`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newDealData),
      });
      const responseText = await response.text();
      if (!response.ok) {
        let errorMessage = responseText; try { const errorData = JSON.parse(responseText); if (errorData.message) errorMessage = errorData.message; } catch (parseError) { console.error("Failed to parse error response as JSON:", parseError); }
        alert(`Failed to save and create new deal: ${errorMessage}. Check console for details.`); throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }
      // Re-fetch based on primary deal's ID and name for comprehensive update
      await fetchAndSeparateDeals(primaryDeal ? primaryDeal._id : dealId, primaryDeal ? primaryDeal.dealName : dealNameFromQuery);
      setFormData({
        dealName: '', amount: '', salesStage: 'Qualification', contactName: '',
        dealOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
        closeDate: '', oemName: '', serviceEngineer: '',
        accountName: '', startDate: '', description: ''
      });
      setEditingDeal(null);
    } catch (error) { console.error('Error saving and creating new deal:', error); }
  };

  const handleUpdateDeal = async () => {
    if (!editingDeal || !formData.dealName || !formData.amount || !formData.accountName) {
      alert('Deal Name, Amount, Account Name, and a deal to edit are required for update.');
      return;
    }
    if (isNaN(parseFloat(formData.amount))) {
      alert('Amount must be a valid number.');
      return;
    }

    try {
      const updatedDealData = {
        ...formData,
        amount: parseFloat(formData.amount), // Ensure amount is a number
        dealOwner: getActualDealOwner(),
      };
      console.log(`Updating deal ${editingDeal._id} with:`, updatedDealData);
      const response = await fetch(`${API_BASE_URL}/deal/${editingDeal._id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedDealData),
      });
      const responseText = await response.text();
      if (!response.ok) {
        let errorMessage = responseText; try { const errorData = JSON.parse(responseText); if (errorData.message) errorMessage = errorData.message; } catch (parseError) { console.error("Failed to parse error response as JSON:", parseError); }
        alert(`Failed to update deal: ${errorMessage}. Check console for details.`); throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }
      // Re-fetch based on primary deal's ID and name for comprehensive update
      await fetchAndSeparateDeals(primaryDeal ? primaryDeal._id : dealId, primaryDeal ? primaryDeal.dealName : dealNameFromQuery);
      handleCloseModal();
    } catch (error) { console.error('Error updating deal:', error); }
  };

  const confirmDeleteDeal = (id) => {
    if (!currentUser?.isLoggedIn) {
      alert("You must be logged in to delete deals.");
      return;
    }
    setDealToDelete(id);
    setShowConfirmModal(true);
  };

  const executeDeleteDeal = async () => {
    if (!dealToDelete) return;
    setShowConfirmModal(false);
    try {
      console.log('Attempting to delete deal with ID:', dealToDelete);
      const response = await fetch(`${API_BASE_URL}/deal/${dealToDelete}`, { method: 'DELETE' });
      const responseText = await response.text();
      if (!response.ok) {
        let errorMessage = responseText; try { const errorData = JSON.parse(responseText); if (errorData.message) errorMessage = errorData.message; } catch (parseError) { console.error("Failed to parse error response as JSON:", parseError); }
        alert(`Failed to delete deal: ${errorMessage}. Check console for details.`); throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }
      console.log('Deal deleted successfully:', dealToDelete);
      // After deletion, re-fetch and re-separate deals
      // If the primary deal was deleted, navigate back to the list
      if (dealToDelete === primaryDeal?._id) {
          navigate('/admin-dashboard/deals'); // Or employee-dashboard/deals, depending on context
      } else {
          // If a related deal was deleted, re-fetch based on the current primary deal
          await fetchAndSeparateDeals(primaryDeal._id, primaryDeal.dealName);
      }
      setDealToDelete(null);
    } catch (error) { console.error('Error deleting deal:', error); }
  };

  const cancelDeleteDeal = () => {
    setShowConfirmModal(false);
    setDealToDelete(null);
  };

  // New function to fetch the primary deal and then other related deals
  const fetchAndSeparateDeals = useCallback(async (currentDealId, initialDealName) => {
    setLoading(true);
    setError(null);
    setPrimaryDeal(null);
    setOtherRelatedDeals([]);

    let fetchedPrimaryDeal = null;
    let primaryDealAccountName = null; // Variable to store primary deal's account name

    try {
      // 1. Fetch the specific primary deal by ID
      if (currentDealId) {
        const primaryResponse = await fetch(`${API_BASE_URL}/deal/${currentDealId}`);
        if (!primaryResponse.ok) {
          throw new Error(`Failed to fetch primary deal: ${primaryResponse.status} - ${await primaryResponse.text()}`);
        }
        fetchedPrimaryDeal = await primaryResponse.json();
        setPrimaryDeal(fetchedPrimaryDeal);
        primaryDealAccountName = fetchedPrimaryDeal.accountName; // Get accountName from primary deal
      } else {
        setLoading(false);
        setError('No specific deal ID or name provided for display.');
        return;
      }

      // 2. Fetch all deals related to the primary deal's accountName
      if (primaryDealAccountName) {
        // CORRECTED: Fetch deals filtered by accountName from the backend
        const relatedDealsResponse = await fetch(`${API_BASE_URL}/deal?accountName=${encodeURIComponent(primaryDealAccountName)}`);
        if (!relatedDealsResponse.ok) {
          throw new Error(`Failed to fetch related deals by account name: ${relatedDealsResponse.status} - ${await relatedDealsResponse.text()}`);
        }
        const allRelatedDeals = await relatedDealsResponse.json();

        // 3. Filter out the primary deal from the list of all related deals
        const otherRelated = allRelatedDeals.filter(
          (deal) => String(deal._id) !== String(currentDealId) // Ensure string comparison for IDs
        );
        setOtherRelatedDeals(otherRelated);
      } else {
        setOtherRelatedDeals([]); // No accountName, no related deals
      }

    } catch (err) {
      console.error('Error in fetchAndSeparateDeals:', err);
      setError(`Failed to load deal details or related deals: ${err.message}`);
      setPrimaryDeal(null);
      setOtherRelatedDeals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndSeparateDeals(dealId, dealNameFromQuery);
  }, [dealId, dealNameFromQuery, fetchAndSeparateDeals]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-2" />
        <span className="text-lg text-gray-700">Loading Deal Details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <button
            onClick={() => navigate('/admin-dashboard/deals')}
            className="mt-4 block mx-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
          >
            Go Back to Deals List
          </button>
        </div>
      </div>
    );
  }

  if (!primaryDeal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans p-4 text-gray-700">
        <h2 className="text-xl font-semibold mb-4">Deal Not Found</h2>
        <p className="mb-6">The specific deal you are looking for does not exist or has been deleted.</p>
        <button
          onClick={() => navigate('/admin-dashboard/deals')}
          className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-lg text-base font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Deals List
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl border border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 bg-indigo-700 text-white rounded-t-lg">
          <h1 className="text-2xl font-bold">Deal Details: {primaryDeal.dealName}</h1>
          <button
            onClick={() => navigate('/admin-dashboard/deals')}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Deals List
          </button>
        </div>

        {/* Primary Deal Information Section (Detail View) */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 border-b border-gray-200 pb-6 mb-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Deal Information</h2>
            <div className="flex items-center text-gray-700">
              <DollarSign className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" />
              <p>
                <span className="font-medium">Amount:</span> ₹{primaryDeal.amount !== undefined && primaryDeal.amount !== null ? parseFloat(primaryDeal.amount).toLocaleString('en-IN') : 'N/A'}
              </p>
            </div>
            <div className="flex items-center text-gray-700">
              <Tag className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
              <p><span className="font-medium">Sales Stage:</span> {primaryDeal.salesStage || 'N/A'}</p>
            </div>
            <div className="flex items-center text-gray-700">
              <User className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
              <p><span className="font-medium">Contact Person:</span> {primaryDeal.contactName || 'N/A'}</p>
            </div>
            <div className="flex items-center text-gray-700">
              <User className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
              <p><span className="font-medium">Deal Owner:</span> {primaryDeal.dealOwner || 'N/A'}</p>
            </div>
            <div className="flex items-center text-gray-700">
              <Calendar className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
              <p><span className="font-medium">Close Date:</span> {primaryDeal.closeDate ? new Date(primaryDeal.closeDate).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Additional Details</h2>
            <div className="flex items-center text-gray-700">
              <Building2 className="w-5 h-5 mr-3 text-purple-600 flex-shrink-0" />
              <p><span className="font-medium">OEM Name:</span> {primaryDeal.oemName || 'N/A'}</p>
            </div>
            <div className="flex items-center text-gray-700">
              <User className="w-5 h-5 mr-3 text-indigo-600 flex-shrink-0" />
              <p><span className="font-medium">Service Engineer:</span> {primaryDeal.serviceEngineer || 'N/A'}</p>
            </div>
            <div className="flex items-center text-gray-700">
              <Building2 className="w-5 h-5 mr-3 text-yellow-600 flex-shrink-0" />
              <p><span className="font-medium">Account Name:</span> {primaryDeal.accountName || 'N/A'}</p>
            </div>
            <div className="flex items-center text-gray-700">
              <Calendar className="w-5 h-5 mr-3 text-pink-600 flex-shrink-0" />
              <p><span className="font-medium">Start Date:</span> {primaryDeal.startDate ? new Date(primaryDeal.startDate).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div className="flex items-center text-gray-700">
              <FileText className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
              <p><span className="font-medium">Created At:</span> {new Date(primaryDeal.createdAt).toLocaleString() || 'N/A'}</p>
            </div>
            {/* Action buttons for the primary deal */}
            {/* <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-100">
                <button
                    onClick={() => {
                        setEditingDeal(primaryDeal);
                        setShowCreateForm(true);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-sm text-sm font-medium flex items-center"
                >
                    <Edit className="w-4 h-4 mr-2" /> Edit Deal
                </button>
                <button
                    onClick={() => confirmDeleteDeal(primaryDeal._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-sm text-sm font-medium flex items-center"
                >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete Deal
                </button>
            </div> */}
          </div>
        </div>

        {/* Other Related Deals Section (Table View) */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Other Deals for Account "{primaryDeal.accountName}" ({otherRelatedDeals.length})
          </h2>
          {otherRelatedDeals.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Stage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Owner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Close Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th> {/* Added Actions column */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {otherRelatedDeals.map((deal) => (
                    <tr key={deal._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{deal.dealName || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{deal.amount !== undefined && deal.amount !== null ? parseFloat(deal.amount).toLocaleString('en-IN') : 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{deal.salesStage || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{deal.contactName || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{deal.dealOwner || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{deal.closeDate ? new Date(deal.closeDate).toLocaleDateString() : 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {/* <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setEditingDeal(deal);
                              setShowCreateForm(true);
                            }}
                            className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                            title="Edit Deal"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => confirmDeleteDeal(deal._id)}
                            className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
                            title="Delete Deal"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No other deals found for account "{primaryDeal.accountName}".</p>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Deal Modal */}
      {showCreateForm && (
        <CreateDealModal
          formData={formData}
          handleFormChange={handleFormChange}
          handleCloseModal={handleCloseModal}
          handleSaveAndNew={handleSaveAndNew}
          handleCreateDeal={handleCreateDeal}
          handleUpdateDeal={handleUpdateDeal}
          editingDeal={editingDeal}
          KANBAN_STAGES={[
            'Qualification', 'Need Analysis', 'Value Proposition', 'Identity Decision Maker',
            'Proposal/Price Quote', 'Negotiation', 'Closed Won', 'Lost', 'PO received', 'Implemented', 'Win',
            'Validated', 'Pipeline', 'Techwin', 'Commit', 'Upside', 'Budgetary'
          ]}
          accountNames={accountNames}
          currentUser={currentUser}
        />
      )}

      {/* Confirmation Modal for deletion */}
      {showConfirmModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this deal? This action cannot be undone."
          onConfirm={executeDeleteDeal}
          onCancel={cancelDeleteDeal}
        />
      )}
    </div>
  );
};

export default Dealmainview;
