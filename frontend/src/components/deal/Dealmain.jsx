
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
//   Table,
//   Columns,
//   User,
//   Calendar,
//   DollarSign,
//   Edit,
//   Trash2,
//   Users,
//   Building2,
//   BarChart3
// } from 'lucide-react';
// // Correct import path for your AuthContext
// import { useAuth } from '../../context/authContext';


// // Define Kanban stages outside the component to ensure stability
// const KANBAN_STAGES = [
//   'Qualification', 'Need Analysis', 'Value Proposition', 'Identity Decision Maker',
//   'Proposal/Price Quote', 'Negotiation', 'Closed Won', 'Lost', 'PO received', 'Implemented', 'Win',
//   'Validated', 'Pipeline', 'Techwin', 'Commit', 'Upside', 'Budgetary'
// ];

// // Base URL for your backend API
// const API_BASE_URL = 'http://localhost:3000/api';

// // --- Custom Confirmation Modal Component ---
// // Reusable modal for confirming actions like deletion
// const ConfirmationModal = ({ message, onConfirm, onCancel }) => { // Added explicit return parentheses
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

// // --- CreateDealModal Component ---
// // Component for creating or editing a deal. Moved outside Dealmain to prevent re-declarations.
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
// }) => { // Added explicit return parentheses
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
//               {/* Only show "Save and new" for create mode */}
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
//             {/* Deal Information Section */}
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
//                       {KANBAN_STAGES.map(stage => (
//                         <option key={stage} value={stage}>{stage}</option>
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

//             {/* Other Information Section - Includes new fields */}
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
//                 {/* Account Name Dropdown (all accounts for admin) */}
//                 <div>
//                   <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">
//                     Account Name <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <select
//                       id="accountName"
//                       name="accountName"
//                       value={formData.accountName}
//                       onChange={handleFormChange}
//                       required
//                       className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                     >
//                       <option value="">- Select Account -</option>
//                       {accountNames.map(name => (
//                         <option key={name} value={name}>{name}</option>
//                       ))}
//                     </select>
//                     <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                       <ChevronDown className="w-5 h-5 text-gray-400" />
//                     </div>
//                   </div>
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

// // --- FilterPanel Component ---
// // Component for filtering deals. Moved outside Dealmain.
// const FilterPanel = ({ setShowFilters }) => { // Added explicit return parentheses
//   return (
//     <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 font-sans">
//       <div className="p-4">
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="font-semibold text-gray-900">Filter Deals by</h3>
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
// };

// // --- DealCard Component (for Kanban View) ---
// // Displays individual deal information in the Kanban view
// const DealCard = ({ deal, onEdit, onDelete, onDealNameClick }) => { // Added explicit return parentheses
//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
//       <h4
//         className="text-md font-semibold text-indigo-700 truncate cursor-pointer hover:underline"
//         onClick={() => onDealNameClick(deal._id)}
//       >
//         {deal.dealName}
//       </h4>
//       <div className="text-sm text-gray-700 mt-2 space-y-1">
//         {deal.amount !== undefined && deal.amount !== null && (
//           <p className="flex items-center">
//             <DollarSign className="w-4 h-4 mr-2 text-green-600" /> Amount: ₹{deal.amount.toLocaleString()}
//           </p>
//         )}
//         {deal.oemName && (
//           <p className="flex items-center">
//             <Users className="w-4 h-4 mr-2 text-gray-500" /> OEM: {deal.oemName}
//           </p>
//         )}
//         {deal.serviceEngineer && (
//           <p className="flex items-center">
//             <User className="w-4 h-4 mr-2 text-gray-500" /> Service Eng: {deal.serviceEngineer}
//           </p>
//         )}
//         {deal.accountName && (
//           <p className="flex items-center">
//             <Building2 className="w-4 h-4 mr-2 text-gray-500" /> Account: {deal.accountName}
//           </p>
//         )}
//         {deal.startDate && (
//           <p className="flex items-center">
//             <Calendar className="w-4 h-4 mr-2 text-gray-500" /> Start: {deal.startDate}
//           </p>
//         )}
//         {deal.closeDate && (
//           <p className="flex items-center">
//             <Calendar className="w-4 h-4 mr-2 text-gray-500" /> Close: {deal.closeDate}
//           </p>
//         )}
//       </div>
//       <div className="flex justify-end space-x-2 mt-3">
//         <button
//           onClick={() => onEdit(deal)}
//           className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
//           title="Edit Deal"
//         >
//           <Edit className="w-4 h-4" />
//         </button>
//         <button
//           onClick={() => onDelete(deal._id)}
//           className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
//           title="Delete Deal"
//         >
//           <Trash2 className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };


// // --- Main Dealmain Component ---
// const Dealmain = () => { // Added explicit return parentheses
//   const { user: currentUser, loading: authLoading } = useAuth();
//   const navigate = useNavigate();

//   const [deals, setDeals] = useState([]);
//   const [selectedDeals, setSelectedDeals] = useState([]);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [recordsPerPage, setRecordsPerPage] = useState(25);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [editingDeal, setEditingDeal] = useState(null);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [dealToDelete, setDealToDelete] = useState(null);
//   const [viewMode, setViewMode] = useState('list');
//   const [accountNames, setAccountNames] = useState([]);

//   const fetchAccountNames = useCallback(async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/account`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch account names');
//       }
//       const data = await response.json();
//       const uniqueAccountNames = [...new Set(data.map(account => account.accountName))];
//       setAccountNames(uniqueAccountNames);
//       console.log('Unique account names fetched for dropdown (Admin):', uniqueAccountNames);
//     } catch (error) {
//       console.error('Error fetching account names for dropdown:', error);
//       setAccountNames([]);
//     }
//   }, []);

//   const fetchDeals = useCallback(async () => {
//     try {
//       setLoading(true);
//       console.log('Attempting to fetch deals from:', `${API_BASE_URL}/deal`);
//       const response = await fetch(`${API_BASE_URL}/deal`);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         setDeals([]);
//         throw new Error(`Failed to fetch deals: ${response.statusText}`);
//       }

//       const data = await response.json();
//       setDeals(data);
//       console.log('Deals fetched successfully:', data);
//     } catch (error) {
//       console.error('Error fetching deals from backend:', error);
//       setDeals([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAccountNames();
//     fetchDeals();
//   }, [fetchAccountNames, fetchDeals]);

//   const [formData, setFormData] = useState({
//     dealName: '', amount: '', salesStage: 'Qualification', contactName: '',
//     dealOwner: 'None', closeDate: '', oemName: '', serviceEngineer: '',
//     accountName: '', startDate: '',
//   });

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
//       console.log('Attempting to create deal with data:', formData);
//       const response = await fetch(`${API_BASE_URL}/deal`, {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
//       });
//       const responseText = await response.text();
//       if (!response.ok) {
//         let errorMessage = responseText; try { const errorData = JSON.parse(responseText); if (errorData.message) errorMessage = errorData.message; } catch (parseError) { console.error("Failed to parse error response as JSON:", parseError); }
//         alert(`Failed to create deal: ${errorMessage}. Check console for details.`); throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
//       }
//       console.log('Deal created successfully on backend:', JSON.parse(responseText));
//       await fetchDeals(); handleCloseModal();
//     } catch (error) { console.error('Error creating deal:', error); }
//   };

//   const handleSaveAndNew = async () => {
//     if (!formData.dealName || !formData.amount) {
//       alert('Deal Name and Amount are required to save and create a new deal.');
//       return;
//     }
//     try {
//       console.log('Attempting to save and create new deal with data:', formData);
//       const response = await fetch(`${API_BASE_URL}/deal`, {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
//       });
//       const responseText = await response.text();
//       if (!response.ok) {
//         let errorMessage = responseText; try { const errorData = JSON.parse(responseText); if (errorData.message) errorMessage = errorData.message; } catch (parseError) { console.error("Failed to parse error response as JSON:", parseError); }
//         alert(`Failed to save and create new deal: ${errorMessage}. Check console for details.`); throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
//       }
//       console.log('Deal saved and ready for new entry:', JSON.parse(responseText));
//       await fetchDeals();
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
//       console.log(`Sending update data for deal ${editingDeal._id}:`, formData);
//       const response = await fetch(`${API_BASE_URL}/deal/${editingDeal._id}`, {
//         method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
//       });
//       const responseText = await response.text();
//       if (!response.ok) {
//         let errorMessage = responseText; try { const errorData = JSON.parse(responseText); if (errorData.message) errorMessage = errorData.message; } catch (parseError) { console.error("Failed to parse error response as JSON:", parseError); }
//         alert(`Failed to update deal: ${errorMessage}. Check console for details.`); throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
//       }
//       console.log('Deal updated successfully on backend:', JSON.parse(responseText));
//       await fetchDeals(); handleCloseModal();
//     } catch (error) { console.error('Error updating deal:', error); }
//   };

//   const confirmDeleteDeal = (dealId) => {
//     setDealToDelete(dealId);
//     setShowConfirmModal(true);
//   };

//   const executeDeleteDeal = async () => {
//     if (!dealToDelete) return;
//     setShowConfirmModal(false);
//     try {
//       console.log('Attempting to delete deal with ID:', dealToDelete);
//       const response = await fetch(`${API_BASE_URL}/deal/${dealToDelete}`, { method: 'DELETE' });
//       const responseText = await response.text();
//       if (!response.ok) {
//         let errorMessage = responseText; try { const errorData = JSON.parse(responseText); if (errorData.message) errorMessage = errorData.message; } catch (parseError) { console.error("Failed to parse error response as JSON:", parseError); }
//         alert(`Failed to delete deal: ${errorMessage}. Check console for details.`); throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
//       }
//       console.log('Deal deleted successfully on backend:', dealToDelete);
//       await fetchDeals(); setDealToDelete(null);
//     } catch (error) { console.error('Error deleting deal:', error); }
//   };

//   const cancelDeleteDeal = () => {
//     setShowConfirmModal(false);
//     setDealToDelete(null);
//   };

//   const toggleDealSelection = (dealId) => {
//     setSelectedDeals(prev =>
//       prev.includes(dealId) ? prev.filter(id => id !== dealId) : [...prev, dealId]
//     );
//   };

//   const selectAllDeals = () => {
//     setSelectedDeals(selectedDeals.length > 0 && selectedDeals.length === deals.length ? [] : deals.map(deal => deal._id));
//   };

//   const totalPages = Math.ceil(deals.length / recordsPerPage);
//   const startRecord = (currentPage - 1) * recordsPerPage + 1;
//   const endRecord = Math.min(currentPage * recordsPerPage, deals.length);

//   const dealsByStage = KANBAN_STAGES.reduce((acc, stage) => {
//     acc[stage] = deals.filter(deal => deal.salesStage === stage);
//     return acc;
//   }, {});

//   const handleDealNameClick = (dealId) => {
//     navigate(`/admin-dashboard/deals/view/${dealId}`);
//   };

//   if (loading || authLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
//         <div className="text-gray-600 text-lg">Loading Deals...</div>
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
//                 All Deals
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
//           </div>

//           <div className="flex items-center space-x-3">
//             {/* View Toggle Buttons (List/Kanban) */}
//             <div className="flex bg-gray-100 rounded-md p-1 shadow-inner">
//                 <button
//                     onClick={() => setViewMode('list')}
//                     className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-white shadow text-indigo-700' : 'text-gray-600 hover:bg-gray-200'}`}
//                     title="List View"
//                 >
//                     <Table className="w-4 h-4 inline-block mr-1" />
//                     List View
//                 </button>
//                 <button
//                     onClick={() => setViewMode('kanban')}
//                     className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${viewMode === 'kanban' ? 'bg-white shadow text-indigo-700' : 'text-gray-600 hover:bg-gray-200'}`}
//                     title="Kanban View"
//                 >
//                     <Columns className="w-4 h-4 inline-block mr-1" />
//                     Kanban View
//                 </button>
//             </div>

//             <button
//               onClick={() => {
//                 setEditingDeal(null);
//                 setShowCreateForm(true);
//               }}
//               className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Create Deal
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="p-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           {/* Table/Kanban Header with record count and pagination controls */}
//           <div className="flex items-center justify-between px-6 py-4 bg-indigo-700 text-white rounded-t-lg">
//             <span className="text-sm font-medium">Total Records {deals.length}</span>
//             {viewMode === 'list' && (
//               <div className="flex items-center space-x-4">
//                 <select
//                   value={recordsPerPage}
//                   onChange={(e) => setRecordsPerPage(Number(e.target.value))}
//                   className="bg-orange-500 text-white px-3 py-1 rounded-md border-none text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 appearance-none pr-8"
//                 >
//                   <option value={25}>25 Records per page</option>
//                   <option value={50}>50 Records per page</option>
//                   <option value={100}>100 Records per page</option>
//                 </select>
//                 <div className="flex items-center space-x-2 text-sm">
//                   <span>{startRecord}-{endRecord}</span>
//                   <button
//                     onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                     disabled={currentPage === 1}
//                     className="hover:bg-indigo-600 p-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     aria-label="Previous page"
//                   >
//                     <ChevronLeft className="w-4 h-4" />
//                   </button>
//                   <button
//                     onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                     disabled={currentPage === totalPages}
//                     className="hover:bg-indigo-600 p-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     aria-label="Next page"
//                   >
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             )}
//             {viewMode === 'kanban' && (
//               <span className="text-sm font-medium">Drag and drop deals between stages (feature not implemented yet)</span>
//             )}
//           </div>

//           {/* Conditional Rendering for List or Kanban View */}
//           {viewMode === 'list' ? (
//             <div className="overflow-x-auto">
//               <table className="w-full table-auto">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left w-12">
//                       <input
//                         type="checkbox"
//                         checked={selectedDeals.length > 0 && selectedDeals.length === deals.length}
//                         onChange={selectAllDeals}
//                         className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                       />
//                     </th>
//                     <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                       <div className="flex items-center space-x-2">
//                         <span>Deal Name</span>
//                         <Filter className="w-4 h-4 text-gray-400" />
//                       </div>
//                     </th>
//                     <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                       <div className="flex items-center space-x-2">
//                         <span>Amount</span>
//                         <Filter className="w-4 h-4 text-gray-400" />
//                       </div>
//                     </th>
//                     <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                       <div className="flex items-center space-x-2">
//                         <span>Sales Stage</span>
//                         <Filter className="w-4 h-4 text-gray-400" />
//                       </div>
//                     </th>
//                     <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                       <div className="flex items-center space-x-2">
//                         <span>OEM Name</span>
//                         <Filter className="w-4 h-4 text-gray-400" />
//                       </div>
//                     </th>
//                     <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                       <div className="flex items-center space-x-2">
//                         <span>Service Engineer</span>
//                         <Filter className="w-4 h-4 text-gray-400" />
//                       </div>
//                     </th>
//                     <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                       <div className="flex items-center space-x-2">
//                         <span>Start Date</span>
//                         <Filter className="w-4 h-4 text-gray-400" />
//                       </div>
//                     </th>
//                     <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                       <div className="flex items-center space-x-2">
//                         <span>Close Date</span>
//                         <Filter className="w-4 h-4 text-gray-400" />
//                       </div>
//                     </th>
//                     <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {deals.length > 0 ? (
//                     deals.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((deal) => (
//                       <tr key={deal._id} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-6 py-4 w-12">
//                           <input
//                             type="checkbox"
//                             checked={selectedDeals.includes(deal._id)}
//                             onChange={() => toggleDealSelection(deal._id)}
//                             className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                           />
//                         </td>
//                         <td className="px-6 py-4 text-sm whitespace-nowrap">
//                           <span
//                             className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
//                             onClick={() => handleDealNameClick(deal._id)}
//                           >
//                             {deal.dealName}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">₹{deal.amount !== undefined && deal.amount !== null ? parseFloat(deal.amount).toLocaleString() : 'N/A'}</td>
//                         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.salesStage || 'N/A'}</td>
//                         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.oemName || 'N/A'}</td>
//                         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.serviceEngineer || 'N/A'}</td>
//                         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.startDate || 'N/A'}</td>
//                         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.closeDate || 'N/A'}</td>
//                         <td className="px-6 py-4 text-sm whitespace-nowrap">
//                           <div className="flex items-center space-x-2">
//                             <button
//                               onClick={() => {
//                                 setEditingDeal(deal);
//                                 setShowCreateForm(true);
//                               }}
//                               className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
//                               title="Edit Deal"
//                             >
//                               <Edit className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => confirmDeleteDeal(deal._id)}
//                               className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
//                               title="Delete Deal"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="9" className="text-center py-12">
//                         <div className="text-gray-500">
//                           <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                           <p className="text-lg font-medium">No deals found</p>
//                           <p className="text-sm">Create your first deal to get started</p>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             // Kanban View
//             <div className="p-4 bg-gray-100 overflow-x-auto min-h-[calc(100vh-200px)]">
//               <div className="flex flex-nowrap space-x-4 h-full items-start">
//                 {KANBAN_STAGES.map(stage => (
//                   <div key={stage} className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md border border-gray-200">
//                     <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
//                       <h3 className="text-sm font-semibold text-gray-800 uppercase">{stage} ({dealsByStage[stage] ? dealsByStage[stage].length : 0})</h3>
//                     </div>
//                     <div className="p-3 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
//                       {dealsByStage[stage] && dealsByStage[stage].length > 0 ? (
//                         dealsByStage[stage].map(deal => (
//                           <DealCard
//                             key={deal._id}
//                             deal={deal}
//                             onEdit={setEditingDeal}
//                             onDelete={confirmDeleteDeal}
//                             onDealNameClick={handleDealNameClick}
//                           />
//                         ))
//                       ) : (
//                         <p className="text-center text-gray-400 text-sm py-4">No deals in this stage.</p>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
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
//           KANBAN_STAGES={KANBAN_STAGES}
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

// export default Dealmain;

// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Filter,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Plus,
//   DollarSign, // For empty state icon
//   Edit, // For edit icon
//   Trash2, // For delete icon
//   CalendarDays, // For date picker icon
//   X, // Close icon for filter panel
//   Search // Search icon for filter panel
// } from 'lucide-react';

// // Sample data (used as initial state and fallback)
// const initialSampleDeals = [
//   { _id: 'deal1', dealName: 'Website Redesign', amount: 15000, salesStage: 'Proposal/Price Quote', contactName: 'John Doe', dealOwner: 'Danish Bindra', closeDate: '2025-07-30', oemName: 'Salesforce', serviceEngineer: 'Alice', accountName: 'Acme Corp', startDate: '2025-06-01' },
//   { _id: 'deal2', dealName: 'Mobile App Development', amount: 50000, salesStage: 'Negotiation', contactName: 'Jane Smith', dealOwner: 'Amit Seth', closeDate: '2025-08-15', oemName: 'Google', serviceEngineer: 'Bob', accountName: 'Globex Inc.', startDate: '2025-06-15' },
//   { _id: 'deal3', dealName: 'Cloud Migration', amount: 120000, salesStage: 'Closed Won', contactName: 'Peter Jones', dealOwner: 'Prabhat Mohant', closeDate: '2025-05-20', oemName: 'Microsoft', serviceEngineer: 'Charlie', accountName: 'Stark Industries', startDate: '2024-12-01' },
// ];

// const KANBAN_STAGES = [
//   'Validated',
//   'Pipeline',
//   'Techwin',
//   'Commit',
//   'Upside',
//   'PO received',
//   'Budgetary',
//   'Qualification',
//   'Need Analysis',
//   'Value Proposition',
//   'Identity Decision Maker',
//   'Proposal/Price Quote',
//   'Negotiation',
//   'Closed Won',
//   'Lost',
//   'Implemented',
//   'Win'
// ];

// const API_BASE_URL = 'http://localhost:3000/api';

// // --- CreateDealModal Component ---
// const CreateDealModal = ({
//   formData,
//   handleFormChange,
//   handleCloseModal,
//   handleSaveAndNew,
//   handleCreateDeal,
//   handleUpdateDeal,
//   editingDeal,
//   accountNames, // Prop for unique account names
// }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-lg w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-6 border-b pb-4">
//           <h2 className="text-2xl font-bold text-gray-900">{editingDeal ? 'Edit Deal' : 'Create Deal'}</h2>
//           <div className="flex space-x-3">
//             <button
//               onClick={handleCloseModal}
//               className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
//             >
//               Cancel
//             </button>
//             {!editingDeal && (
//               <button
//                 onClick={handleSaveAndNew}
//                 className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm text-sm font-medium"
//               >
//                 Save and new
//               </button>
//             )}
//             <button
//               onClick={editingDeal ? handleUpdateDeal : handleCreateDeal}
//               className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
//             >
//               {editingDeal ? 'Update' : 'Save'}
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Deal Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-gray-900">Deal Information</h3>
//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="dealName" className="block text-sm font-medium text-gray-700 mb-1">Deal Name <span className="text-red-500">*</span></label>
//                 <input
//                   id="dealName"
//                   type="text"
//                   value={formData.dealName}
//                   onChange={handleFormChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Enter Deal Name"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount <span className="text-red-500">*</span></label>
//                 <input
//                   id="amount"
//                   type="number"
//                   value={formData.amount}
//                   onChange={handleFormChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Enter Amount"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="salesStage" className="block text-sm font-medium text-gray-700 mb-1">Sales Stage</label>
//                 <div className="relative">
//                   <select
//                     id="salesStage"
//                     value={formData.salesStage}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                   >
//                     {KANBAN_STAGES.map((stage) => (
//                       <option key={stage} value={stage}>{stage}</option>
//                     ))}
//                   </select>
//                   <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                     <ChevronDown className="w-5 h-5 text-gray-400" />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="closeDate" className="block text-sm font-medium text-gray-700 mb-1">Close Date</label>
//                 <div className="relative">
//                   <input
//                     id="closeDate"
//                     type="date"
//                     value={formData.closeDate}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none pr-10"
//                   />
//                   <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                     <CalendarDays className="w-5 h-5 text-gray-400" />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//                 <div className="relative">
//                   <input
//                     id="startDate"
//                     type="date"
//                     value={formData.startDate}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none pr-10"
//                   />
//                   <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                     <CalendarDays className="w-5 h-5 text-gray-400" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Other Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-gray-900">Other Information</h3>
//             <div className="space-y-4">
//             {/* Account Name Field with sorted options and now required */}
//               <div>
//                 <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">Account Name <span className="text-red-500">*</span></label>
//                 <div className="relative">
//                   <select
//                     id="accountName"
//                     value={formData.accountName}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                     required // Added required attribute
//                   >
//                     <option value="">-None-</option> {/* Keep -None- as an option, but validate for it */}
//                     {accountNames.map((name) => (
//                       <option key={name} value={name}>{name}</option>
//                     ))}
//                   </select>
//                   <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                     <ChevronDown className="w-5 h-5 text-gray-400" />
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
//                 <input
//                   id="contactName"
//                   type="text"
//                   value={formData.contactName}
//                   onChange={handleFormChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Enter Contact Name"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="oemName" className="block text-sm font-medium text-gray-700 mb-1">OEM Name</label>
//                 <input
//                   id="oemName"
//                   type="text"
//                   value={formData.oemName}
//                   onChange={handleFormChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Enter OEM Name"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="serviceEngineer" className="block text-sm font-medium text-gray-700 mb-1">Solution Engineer</label>
//                 <input
//                   id="serviceEngineer"
//                   type="text"
//                   value={formData.serviceEngineer}
//                   onChange={handleFormChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Enter Solution Engineer"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="dealOwner" className="block text-sm font-medium text-gray-700 mb-1">Deal Owner</label>
//                 <div className="relative">
//                   <select
//                     id="dealOwner"
//                     value={formData.dealOwner}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                   >
//                     <option value="None">-None-</option> {/* Default option set to None */}
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

              
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // --- FilterPanel Component (Moved outside Dealmain) ---
// const FilterPanel = ({ setShowFilters }) => (
//   <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 font-sans">
//     <div className="p-4">
//       <div className="flex items-center justify-between mb-3">
//         <h3 className="font-semibold text-gray-900">Filter Deals by</h3>
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


// // --- Main Dealmain Component ---
// const Dealmain = () => {
//   const navigate = useNavigate();
//   const [deals, setDeals] = useState([]);
//   const [selectedDeals, setSelectedDeals] = useState([]);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [recordsPerPage, setRecordsPerPage] = useState(100);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true); // <<<<<< FIXED SYNTAX HERE
//   const [editingDeal, setEditingDeal] = useState(null);
//   const [accountNames, setAccountNames] = useState([]); // State for unique account names

//   // Base URL for your backend API
//   const API_BASE_URL = 'http://localhost:3000/api';

//   // --- Fetch Deals from Backend API ---
//   const fetchDeals = useCallback(async () => {
//     try {
//       setLoading(true);
//       console.log('Attempting to fetch deals from:', `${API_BASE_URL}/deal`);
//       const response = await fetch(`${API_BASE_URL}/deal`);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         throw new Error(`Failed to fetch deals: ${response.statusText}`);
//       }

//       const data = await response.json();
//       setDeals(data);
//       console.log('Deals fetched successfully:', data);
//     } catch (error) {
//       console.error('Error fetching deals from backend:', error);
//       setDeals(initialSampleDeals); // Fallback to sample data on error
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Fetch Account Names from Backend API for the dropdown
//   const fetchAccountNames = useCallback(async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/account`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch account names');
//       }
//       const data = await response.json();
//       // Extract unique account names, filter out empty/null ones, and SORT alphabetically
//       const names = [...new Set(data.map(acc => acc.accountName).filter(Boolean))].sort();
//       setAccountNames(names);
//       console.log('Account names fetched and sorted for dropdown:', names);
//     } catch (error) {
//       console.error('Error fetching account names for dropdown:', error);
//       setAccountNames(['Sample Account 1', 'Sample Account 2'].sort()); // Fallback for dropdown, also sorted
//     }
//   }, []);

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchDeals();
//     fetchAccountNames(); // Fetch account names on mount
//   }, [fetchDeals, fetchAccountNames]);

//   // --- Form Data State for Create/Edit ---
//   const [formData, setFormData] = useState({
//     dealName: '',
//     amount: '',
//     salesStage: 'Qualification',
//     contactName: '',
//     dealOwner: 'None', // Changed default to 'None'
//     closeDate: '',
//     oemName: '',
//     serviceEngineer: '',
//     accountName: '', // Added accountName to form data
//     startDate: '',
//   });

//   // Effect to populate form data when editingDeal changes (for edit mode)
//   useEffect(() => {
//     if (editingDeal) {
//       setFormData({
//         dealName: editingDeal.dealName || '',
//         amount: editingDeal.amount || '',
//         salesStage: editingDeal.salesStage || 'Qualification',
//         contactName: editingDeal.contactName || '',
//         dealOwner: editingDeal.dealOwner || 'None', // Populate with 'None' if undefined
//         // Format date strings for input type="date"
//         closeDate: editingDeal.closeDate ? new Date(editingDeal.closeDate).toISOString().split('T')[0] : '',
//         oemName: editingDeal.oemName || '',
//         serviceEngineer: editingDeal.serviceEngineer || '',
//         accountName: editingDeal.accountName || '', // Populate accountName for edit
//         startDate: editingDeal.startDate ? new Date(editingDeal.startDate).toISOString().split('T')[0] : '',
//       });
//     } else {
//       // Reset form data for a new deal (when opening Create form)
//       setFormData({
//         dealName: '',
//         amount: '',
//         salesStage: 'Qualification',
//         contactName: '',
//         dealOwner: 'None', // Reset to 'None' for new form
//         closeDate: '',
//         oemName: '',
//         serviceEngineer: '',
//         accountName: '', // Reset accountName for new form
//         startDate: '',
//       });
//     }
//   }, [editingDeal]);

//   // --- Form Change Handler ---
//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   // --- Modal Close Handler ---
//   const handleCloseModal = () => {
//     setShowCreateForm(false);
//     setEditingDeal(null); // Clear editing deal when modal closes
//   };

//   // --- Frontend Validation Function ---
//   const validateDealForm = () => {
//     if (!formData.dealName || typeof formData.amount === 'undefined' || formData.amount === null || formData.amount === '') {
//       alert('Deal Name and Amount are required.');
//       return false;
//     }
//     if (!formData.accountName) { // Check if accountName is empty
//       alert('Account Name is required.');
//       return false;
//     }
//     return true;
//   };

//   // --- Create Deal Handler ---
//   const handleCreateDeal = async () => {
//     if (!validateDealForm()) { // Use the validation function
//       return;
//     }

//     try {
//       console.log('Attempting to create deal with data:', formData);
//       const response = await fetch(`${API_BASE_URL}/deal`, {
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

//       const createdDeal = JSON.parse(responseText);
//       console.log('Deal created successfully on backend:', createdDeal);
//       await fetchDeals(); // Re-fetch all deals to update the table
//       handleCloseModal(); // Close the modal and reset form
//     } catch (error) {
//       console.error('Error creating deal:', error);
//       alert(`Failed to create deal: ${error.message}`);
//     }
//   };

//   // --- Save and New Deal Handler ---
//   const handleSaveAndNew = async () => {
//     if (!validateDealForm()) { // Use the validation function
//       return;
//     }

//     try {
//       console.log('Attempting to save and create new deal with data:', formData);
//       const response = await fetch(`${API_BASE_URL}/deal`, {
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

//       const createdDeal = JSON.parse(responseText);
//       console.log('Deal saved and ready for new entry:', createdDeal);
//       await fetchDeals(); // Re-fetch all deals to update the table
//       // Reset form but keep modal open
//       setFormData({
//         dealName: '',
//         amount: '',
//         salesStage: 'Qualification',
//         contactName: '',
//         dealOwner: 'None', // Reset to 'None' for new form
//         closeDate: '',
//         oemName: '',
//         serviceEngineer: '',
//         accountName: '',
//         startDate: '',
//       });
//       setEditingDeal(null); // Ensure not in edit mode for the new entry
//     } catch (error) {
//       console.error('Error saving and creating new deal:', error);
//       alert(`Failed to save and create new deal: ${error.message}`);
//     }
//   };

//   // --- Update Deal Handler ---
//   const handleUpdateDeal = async () => {
//     if (!validateDealForm()) { // Use the validation function
//       return;
//     }
//     if (!editingDeal) { // Additional check for update
//         console.warn('No deal selected for update.');
//         return;
//     }

//     try {
//       console.log(`Sending update data for deal ${editingDeal._id}:`, formData);
//       const response = await fetch(`${API_BASE_URL}/deal/${editingDeal._id}`, {
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

//       const updatedDeal = JSON.parse(responseText);
//       console.log('Deal updated successfully on backend:', updatedDeal);
//       await fetchDeals(); // Re-fetch all deals to update the table
//       handleCloseModal(); // Close the modal and reset form
//     } catch (error) {
//       console.error('Error updating deal:', error);
//       alert(`Failed to update deal: ${error.message}`);
//     }
//   };

//   // --- Delete Deal Handler ---
//   const handleDeleteDeal = async (dealId) => {
//     if (window.confirm('Are you sure you want to delete this deal?')) {
//       try {
//         console.log('Attempting to delete deal with ID:', dealId);
//         const response = await fetch(`${API_BASE_URL}/deal/${dealId}`, {
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

//         console.log('Deal deleted successfully on backend:', dealId);
//         await fetchDeals(); // Re-fetch deals to update the table
//       } catch (error) {
//         console.error('Error deleting deal:', error);
//         alert(`Failed to delete deal: ${error.message}`);
//       }
//     }
//   };

//   const toggleDealSelection = (dealId) => {
//     setSelectedDeals(prev =>
//       prev.includes(dealId)
//         ? prev.filter(id => id !== dealId)
//         : [...prev, dealId]
//     );
//   };

//   const selectAllDeals = () => {
//     setSelectedDeals(selectedDeals.length > 0 && selectedDeals.length === deals.length ? [] : deals.map(deal => deal._id));
//   };

//   const totalPages = Math.ceil(deals.length / recordsPerPage);
//   const startRecord = (currentPage - 1) * recordsPerPage + 1;
//   const endRecord = Math.min(currentPage * recordsPerPage, deals.length);

//   const renderDealsTableRows = () => {
//     if (deals.length === 0 && !loading) {
//       return (
//         <tr>
//           <td colSpan="8" className="text-center py-12"> {/* Adjusted colspan */}
//             <div className="text-gray-500">
//               <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//               <p className="text-lg font-medium">No deals found</p>
//               <p className="text-sm">Create your first deal to get started</p>
//             </div>
//           </td>
//         </tr>
//       );
//     }

//     return deals.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((deal) => (
//       <tr key={deal._id} className="hover:bg-gray-50 transition-colors">
//         <td className="px-6 py-4 w-12">
//           <input
//             type="checkbox"
//             checked={selectedDeals.includes(deal._id)}
//             onChange={() => toggleDealSelection(deal._id)}
//             className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//           />
//         </td>
//         <td className="px-6 py-4 text-sm whitespace-nowrap">
//           <span
//             onClick={() => navigate(`/admin-dashboard/deals/view/${deal._id}`)}
//             className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
//           >
//             {deal.dealName}
//           </span>
//         </td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.accountName || 'N/A'}</td> {/* Display Account Name */}
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
//           {deal.amount ? `$${deal.amount.toLocaleString()}` : 'N/A'}
//         </td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.salesStage || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.dealOwner || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
//           {deal.closeDate ? new Date(deal.closeDate).toLocaleDateString() : 'N/A'}
//         </td>
//         <td className="px-6 py-4 text-sm whitespace-nowrap">
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => {
//                 setEditingDeal(deal);
//                 setShowCreateForm(true);
//               }}
//               className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
//               title="Edit Deal"
//             >
//               <Edit className="w-4 h-4" />
//             </button>
//             <button
//               onClick={() => handleDeleteDeal(deal._id)}
//               className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
//               title="Delete Deal"
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
//                 All Deals
//                 <ChevronDown className="w-4 h-4 ml-2" />
//               </button>
//               {showFilters && <FilterPanel setShowFilters={setShowFilters} />}
//             </div>
//           </div>

//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => {
//                 setEditingDeal(null);
//                 setShowCreateForm(true);
//               }}
//               className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Create Deal
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           {/* Table Header */}
//           <div className="flex items-center justify-between px-6 py-4 bg-indigo-700 text-white rounded-t-lg">
//             <span className="text-sm font-medium">Total Records {deals.length}</span>
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
//                       checked={selectedDeals.length > 0 && selectedDeals.length === deals.length}
//                       onChange={selectAllDeals}
//                       className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                     />
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Deal Name</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Account Name</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Amount</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Sales Stage</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Deal Owner</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Close Date</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="8" className="text-center py-12">
//                       <div className="text-gray-600 text-lg">Loading Deals...</div>
//                     </td>
//                   </tr>
//                 ) : (
//                   renderDealsTableRows()
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {deals.length === 0 && !loading && (
//             <div className="text-center py-12">
//               <div className="text-gray-500">
//                 <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                 <p className="text-lg font-medium">No deals found</p>
//                 <p className="text-sm">Create your first deal to get started</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {showCreateForm && (
//         <CreateDealModal
//           formData={formData}
//           handleFormChange={handleFormChange}
//           handleCloseModal={handleCloseModal}
//           handleSaveAndNew={handleSaveAndNew}
//           handleCreateDeal={handleCreateDeal}
//           handleUpdateDeal={handleUpdateDeal}
//           editingDeal={editingDeal}
//           accountNames={accountNames} // Pass account names to the modal
//         />
//       )}
//     </div>
//   );
// };

// export default Dealmain;


import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  DollarSign, // For empty state icon (assuming it's a generic empty state)
  Edit, // For edit icon
  Trash2, // For delete icon
  CalendarDays, // For date picker icon
  X, // Close icon for filter panel
  Search, // Search icon for filter panel
  BarChart3 // Better empty state icon for data views
} from 'lucide-react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Sample data (used as initial state and fallback)
const initialSampleDeals = [
  { _id: 'deal1', dealName: 'Website Redesign', amount: 15000, salesStage: 'Proposal/Price Quote', contactName: 'John Doe', dealOwner: 'Danish Bindra', closeDate: '2025-07-30', oemName: 'Salesforce', serviceEngineer: 'Alice', accountName: 'Acme Corp', startDate: '2025-06-01' },
  { _id: 'deal2', dealName: 'Mobile App Development', amount: 50000, salesStage: 'Negotiation', contactName: 'Jane Smith', dealOwner: 'Amit Seth', closeDate: '2025-08-15', oemName: 'Google', serviceEngineer: 'Bob', accountName: 'Globex Inc.', startDate: '2025-06-15' },
  { _id: 'deal3', dealName: 'Cloud Migration', amount: 120000, salesStage: 'Closed Won', contactName: 'Peter Jones', dealOwner: 'Prabhat Mohant', closeDate: '2025-05-20', oemName: 'Microsoft', serviceEngineer: 'Charlie', accountName: 'Stark Industries', startDate: '2024-12-01' },
];

// Define sales stages in the new requested order
const KANBAN_STAGES = [
  'Validated',
  'Need Analysis',
  'Identity Decision Maker',
  'Pipeline',
  'Techwin',
  'Budgetary',
  'Value Proposition',
  'Upside',
  'Commit',
  'Proposal/Price Quote',
  'Negotiation',
  'PO received',
  'Closed Won',
  'Lost',
  'Implemented'
];

// Define stages where deals CANNOT be moved into or out of via Kanban (typically final states)
const NON_EDITABLE_KANBAN_STAGES = new Set([
  'PO received', 'Closed Won', 'Lost', 'Implemented'
]);

// Determine stages that are generally editable/movable in Kanban
const EDITABLE_KANBAN_STAGES = new Set(
  KANBAN_STAGES.filter(stage => !NON_EDITABLE_KANBAN_STAGES.has(stage))
);

const API_BASE_URL = 'http://localhost:3000/api';

// --- Custom Confirmation Modal Component (for delete operations) ---
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


// --- CreateDealModal Component ---
const CreateDealModal = ({
  formData,
  handleFormChange,
  handleCloseModal,
  handleSaveAndNew,
  handleCreateDeal,
  handleUpdateDeal,
  editingDeal,
  accountNames, // Prop for unique account names
}) => (
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
          {/* Deal Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Deal Information</h3>
            <div className="space-y-4">
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
                    {KANBAN_STAGES.map((stage) => (
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
                <div className="relative">
                  <input
                    id="closeDate"
                    type="date"
                    value={formData.closeDate}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none pr-10"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <CalendarDays className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <div className="relative">
                  <input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none pr-10"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <CalendarDays className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Other Information</h3>
            <div className="space-y-4">
              {/* Account Name Field with sorted options and now required */}
              <div>
                <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">Account Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select
                    id="accountName"
                    value={formData.accountName}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
                    required // Added required attribute
                  >
                    <option value="">-None-</option> {/* Keep -None- as an option, but validate for it */}
                    {accountNames.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                <input
                  id="contactName"
                  type="text"
                  value={formData.contactName}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter Contact Name"
                />
              </div>

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
                <label htmlFor="serviceEngineer" className="block text-sm font-medium text-gray-700 mb-1">Solution Engineer</label>
                <input
                  id="serviceEngineer"
                  type="text"
                  value={formData.serviceEngineer}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter Solution Engineer"
                />
              </div>
              <div>
                <label htmlFor="dealOwner" className="block text-sm font-medium text-gray-700 mb-1">Deal Owner</label>
                <div className="relative">
                  <select
                    id="dealOwner"
                    value={formData.dealOwner}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
                  >
                    <option value="None">-None-</option> {/* Default option set to None */}
                    <option value="Amit Seth">Amit Seth</option>
                    <option value="Danish Bindra">Danish Bindra</option>
                    <option value="Tanmay Singh">Tanmay Singh</option>
                    <option value="Prabhat Mohant">Prabhat Mohant</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- FilterPanel Component ---
const FilterPanel = ({ setShowFilters }) => (
  <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 font-sans">
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Filter Deals by</h3>
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

// --- InternalKanbanBoard Component ---
const InternalKanbanBoard = ({ deals, KANBAN_STAGES, onDealDrop, onDealClick }) => {
  // Group deals by sales stage
  const dealsByStage = KANBAN_STAGES.reduce((acc, stage) => {
    acc[stage] = deals.filter(deal => deal.salesStage === stage);
    return acc;
  }, {});

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // If moved to the same place, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const destinationStage = destination.droppableId;

    // Prevent dragging into or out of non-editable stages
    if (NON_EDITABLE_KANBAN_STAGES.has(source.droppableId) || NON_EDITABLE_KANBAN_STAGES.has(destinationStage)) {
      alert(`Cannot move deals into or out of '${source.droppableId}' or '${destinationStage}' stages.`);
      return;
    }

    // Call the parent component's handler to update the deal's stage
    onDealDrop(draggableId, destinationStage);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex overflow-x-auto gap-4 p-4 min-h-[calc(100vh-180px)]"> {/* Adjust min-height as needed */}
        {KANBAN_STAGES.map((stage) => (
          <Droppable droppableId={stage} key={stage}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex-shrink-0 w-80 rounded-lg shadow-md border
                            ${snapshot.isDraggingOver ? 'bg-indigo-100 border-indigo-400' : 'bg-gray-100 border-gray-200'}
                            transition-all duration-200 flex flex-col`}
                style={{ minHeight: '150px' }} // Ensure columns have a minimum height for dropping
              >
                <h3 className="px-4 py-3 bg-indigo-700 text-white rounded-t-lg font-semibold text-lg border-b border-indigo-600">
                  {stage} ({dealsByStage[stage]?.length || 0})
                </h3>
                <div className="p-3 flex-grow overflow-y-auto">
                  {dealsByStage[stage] && dealsByStage[stage].length > 0 ? (
                    dealsByStage[stage].map((deal, index) => (
                      <Draggable
                        key={deal._id}
                        draggableId={deal._id}
                        index={index}
                        isDragDisabled={NON_EDITABLE_KANBAN_STAGES.has(deal.salesStage)} // Disable drag for non-editable stages
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white p-4 mb-3 rounded-md shadow-sm border border-gray-200 cursor-pointer
                                        ${snapshot.isDragging ? 'ring-2 ring-indigo-500 shadow-lg' : 'hover:border-indigo-300'}
                                        ${NON_EDITABLE_KANBAN_STAGES.has(deal.salesStage) ? 'opacity-60 cursor-not-allowed border-dashed' : ''}
                                        transition-all duration-150`}
                            onClick={() => onDealClick(deal._id)}
                          >
                            <h4 className="font-semibold text-gray-800 text-base mb-1">{deal.dealName}</h4>
                            <p className="text-sm text-gray-600">
                              Amount: {deal.amount ? deal.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : 'N/A'}
                            </p>
                            <p className="text-sm text-gray-600">Owner: {deal.dealOwner || 'N/A'}</p>
                            <p className="text-sm text-gray-600">Close Date: {deal.closeDate || 'N/A'}</p>
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <BarChart3 className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      No deals in this stage.
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};


// --- Main Dealmain Component ---
const Dealmain = () => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [selectedDeals, setSelectedDeals] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editingDeal, setEditingDeal] = useState(null);
  const [accountNames, setAccountNames] = useState([]); // State for unique account names
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'kanban'
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [dealToDelete, setDealToDelete] = useState(null);


  // --- Fetch Deals from Backend API ---
  const fetchDeals = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Attempting to fetch deals from:', `${API_BASE_URL}/deal`);
      const response = await fetch(`${API_BASE_URL}/deal`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        throw new Error(`Failed to fetch deals: ${response.statusText}`);
      }

      const data = await response.json();
      setDeals(data);
      console.log('Deals fetched successfully:', data);
    } catch (error) {
      console.error('Error fetching deals from backend:', error);
      setDeals(initialSampleDeals); // Fallback to sample data on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch Account Names from Backend API for the dropdown
  const fetchAccountNames = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/account`);
      if (!response.ok) {
        throw new Error('Failed to fetch account names');
      }
      const data = await response.json();
      // Extract unique account names, filter out empty/null ones, and SORT alphabetically
      const names = [...new Set(data.map(acc => acc.accountName).filter(Boolean))].sort();
      setAccountNames(names);
      console.log('Account names fetched and sorted for dropdown:', names);
    } catch (error) {
      console.error('Error fetching account names for dropdown:', error);
      setAccountNames(['Sample Account 1', 'Sample Account 2'].sort()); // Fallback for dropdown, also sorted
    }
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchDeals();
    fetchAccountNames(); // Fetch account names on mount
  }, [fetchDeals, fetchAccountNames]);

  // --- Form Data State for Create/Edit ---
  const [formData, setFormData] = useState({
    dealName: '',
    amount: '',
    salesStage: KANBAN_STAGES[0], // Default to first stage in the new order
    contactName: '',
    dealOwner: 'None', // Changed default to 'None'
    closeDate: '',
    oemName: '',
    serviceEngineer: '',
    accountName: '', // Added accountName to form data
    startDate: '',
  });

  // Effect to populate form data when editingDeal changes (for edit mode)
  useEffect(() => {
    if (editingDeal) {
      setFormData({
        dealName: editingDeal.dealName || '',
        amount: editingDeal.amount || '',
        salesStage: editingDeal.salesStage || KANBAN_STAGES[0], // Default to first KANBAN_STAGE
        contactName: editingDeal.contactName || '',
        dealOwner: editingDeal.dealOwner || 'None', // Populate with 'None' if undefined
        // Format date strings for input type="date"
        closeDate: editingDeal.closeDate ? new Date(editingDeal.closeDate).toISOString().split('T')[0] : '',
        oemName: editingDeal.oemName || '',
        serviceEngineer: editingDeal.serviceEngineer || '',
        accountName: editingDeal.accountName || '', // Populate accountName for edit
        startDate: editingDeal.startDate ? new Date(editingDeal.startDate).toISOString().split('T')[0] : '',
      });
    } else {
      // Reset form data for a new deal (when opening Create form)
      setFormData({
        dealName: '',
        amount: '',
        salesStage: KANBAN_STAGES[0], // Reset to first KANBAN_STAGE
        contactName: '',
        dealOwner: 'None', // Reset to 'None' for new form
        closeDate: '',
        oemName: '',
        serviceEngineer: '',
        accountName: '', // Reset accountName for new form
        startDate: '',
      });
    }
  }, [editingDeal]);

  // --- Form Change Handler ---
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // --- Modal Close Handler ---
  const handleCloseModal = () => {
    setShowCreateForm(false);
    setEditingDeal(null); // Clear editing deal when modal closes
  };

  // --- Frontend Validation Function ---
  const validateDealForm = () => {
    if (!formData.dealName || typeof formData.amount === 'undefined' || formData.amount === null || formData.amount === '') {
      alert('Deal Name and Amount are required.');
      return false;
    }
    if (!formData.accountName) { // Check if accountName is empty
      alert('Account Name is required.');
      return false;
    }
    return true;
  };

  // --- Create Deal Handler ---
  const handleCreateDeal = async () => {
    if (!validateDealForm()) { // Use the validation function
      return;
    }

    try {
      console.log('Attempting to create deal with data:', formData);
      const response = await fetch(`${API_BASE_URL}/deal`, {
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

      const createdDeal = JSON.parse(responseText);
      console.log('Deal created successfully on backend:', createdDeal);
      await fetchDeals(); // Re-fetch all deals to update the table
      handleCloseModal(); // Close the modal and reset form
    } catch (error) {
      console.error('Error creating deal:', error);
      alert(`Failed to create deal: ${error.message}`);
    }
  };

  // --- Save and New Deal Handler ---
  const handleSaveAndNew = async () => {
    if (!validateDealForm()) { // Use the validation function
      return;
    }

    try {
      console.log('Attempting to save and create new deal with data:', formData);
      const response = await fetch(`${API_BASE_URL}/deal`, {
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

      const createdDeal = JSON.parse(responseText);
      console.log('Deal saved and ready for new entry:', createdDeal);
      await fetchDeals(); // Re-fetch all deals to update the table
      // Reset form but keep modal open
      setFormData({
        dealName: '',
        amount: '',
        salesStage: KANBAN_STAGES[0], // Reset to first KANBAN_STAGE
        contactName: '',
        dealOwner: 'None', // Reset to 'None' for new form
        closeDate: '',
        oemName: '',
        serviceEngineer: '',
        accountName: '',
        startDate: '',
      });
      setEditingDeal(null); // Ensure not in edit mode for the new entry
    } catch (error) {
      console.error('Error saving and creating new deal:', error);
      alert(`Failed to save and create new deal: ${error.message}`);
    }
  };

  // --- Update Deal Handler ---
  const handleUpdateDeal = async () => {
    if (!validateDealForm()) { // Use the validation function
      return;
    }
    if (!editingDeal) { // Additional check for update
        console.warn('No deal selected for update.');
        return;
    }

    try {
      console.log(`Sending update data for deal ${editingDeal._id}:`, formData);
      const response = await fetch(`${API_BASE_URL}/deal/${editingDeal._id}`, {
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

      const updatedDeal = JSON.parse(responseText);
      console.log('Deal updated successfully on backend:', updatedDeal);
      await fetchDeals(); // Re-fetch all deals to update the table
      handleCloseModal(); // Close the modal and reset form
    } catch (error) {
      console.error('Error updating deal:', error);
      alert(`Failed to update deal: ${error.message}`);
    }
  };

  // --- Handle Deal Drop for Kanban ---
  const handleDealDrop = async (dealId, newSalesStage) => {
    const dealToUpdate = deals.find(deal => deal._id === dealId);
    if (!dealToUpdate) {
      console.error('Deal not found for drag-and-drop update:', dealId);
      return;
    }

    // Check if the source or destination stage is non-editable
    if (NON_EDITABLE_KANBAN_STAGES.has(dealToUpdate.salesStage) || NON_EDITABLE_KANBAN_STAGES.has(newSalesStage)) {
      alert(`Cannot move deals into or out of '${dealToUpdate.salesStage}' or '${newSalesStage}' stages.`);
      // Revert UI if optimistic update happened
      setDeals(prevDeals => [...prevDeals]); // Force re-render to revert
      return;
    }

    // Optimistic UI update
    setDeals(prevDeals =>
      prevDeals.map(deal =>
        deal._id === dealId ? { ...deal, salesStage: newSalesStage } : deal
      )
    );

    try {
      console.log(`Attempting to update deal ${dealId} to stage: ${newSalesStage}`);
      const response = await fetch(`${API_BASE_URL}/deal/${dealId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ salesStage: newSalesStage }), // Only send salesStage for drag-drop updates
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        throw new Error(`Failed to update deal stage: ${response.statusText}`);
      }
      console.log('Deal stage updated successfully on backend.');
      // Re-fetch all deals to ensure data consistency, especially if other fields might change or sorting logic is complex
      await fetchDeals();
    } catch (error) {
      console.error('Error updating deal stage:', error);
      alert(`Failed to update deal stage: ${error.message}. Reverting changes.`);
      // Revert optimistic update on error
      setDeals(prevDeals =>
        prevDeals.map(deal =>
          deal._id === dealId ? { ...deal, salesStage: dealToUpdate.salesStage } : deal // Revert to original stage
        )
      );
    }
  };


  // --- Delete Deal Handler (using custom modal) ---
  const confirmDeleteDeal = (dealId) => {
    setDealToDelete(dealId);
    setShowConfirmModal(true);
  };

  const executeDeleteDeal = async () => {
    if (!dealToDelete) return;
    setShowConfirmModal(false); // Close modal immediately

    try {
      console.log('Attempting to delete deal with ID:', dealToDelete);
      const response = await fetch(`${API_BASE_URL}/deal/${dealToDelete}`, {
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

      console.log('Deal deleted successfully on backend:', dealToDelete);
      await fetchDeals(); // Re-fetch deals to update the table
      setDealToDelete(null); // Clear the deal to delete state
    } catch (error) {
      console.error('Error deleting deal:', error);
      alert(`Failed to delete deal: ${error.message}`);
    }
  };

  const cancelDeleteDeal = () => {
    setShowConfirmModal(false);
    setDealToDelete(null);
  };

  // --- Table Selection Handlers ---
  const toggleDealSelection = (dealId) => {
    setSelectedDeals(prev =>
      prev.includes(dealId)
        ? prev.filter(id => id !== dealId)
        : [...prev, dealId]
    );
  };

  const selectAllDeals = () => {
    setSelectedDeals(selectedDeals.length > 0 && selectedDeals.length === deals.length ? [] : deals.map(deal => deal._id));
  };

  // --- Pagination Logic ---
  const totalPages = Math.ceil(deals.length / recordsPerPage);
  const startRecord = (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, deals.length);

  // --- Loading State Render ---
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
        <div className="text-gray-600 text-lg">Loading Deals...</div>
      </div>
    );
  }

  // --- Render Table Rows ---
  const renderDealsTableRows = () => {
    if (deals.length === 0) { // No need for !loading check here, as it's handled above
      return (
        <tr>
          <td colSpan="9" className="text-center py-12">
            <div className="text-gray-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No deals found</p>
              <p className="text-sm">Create your first deal to get started</p>
            </div>
          </td>
        </tr>
      );
    }

    return deals.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((deal) => (
      <tr key={deal._id} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 w-12">
          <input
            type="checkbox"
            checked={selectedDeals.includes(deal._id)}
            onChange={() => toggleDealSelection(deal._id)}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </td>
        <td className="px-6 py-4 text-sm whitespace-nowrap">
          {/* Navigate to Dealmainview (assuming this path is for detail view) */}
          <span
            onClick={() => navigate(`/admin-dashboard/deals/${deal._id}`)}
            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
          >
            {deal.dealName}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
          {deal.amount ? deal.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : 'N/A'}
        </td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.salesStage || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.oemName || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.serviceEngineer || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.startDate || 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.closeDate || 'N/A'}</td>
        <td className="px-6 py-4 text-sm whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setEditingDeal(deal); // Set the deal to be edited
                setShowCreateForm(true); // Open the modal
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
                All Deals
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              {showFilters && <FilterPanel setShowFilters={setShowFilters} />}
            </div>
            {/* You might want to add current user info if Dealmain uses authentication */}
          </div>

          <div className="flex items-center space-x-3">
            {/* View Mode Toggle Buttons */}
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${viewMode === 'table' ? 'bg-orange-600 text-white shadow' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${viewMode === 'kanban' ? 'bg-orange-600 text-white shadow' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
            >
              Kanban View
            </button>
            <button
              onClick={() => {
                setEditingDeal(null); // Ensure no deal is being edited when opening for create
                setShowCreateForm(true);
              }}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Deal
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {viewMode === 'table' ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Table Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-indigo-700 text-white rounded-t-lg">
              <span className="text-sm font-medium">Total Records {deals.length}</span>
              <div className="flex items-center space-x-4">
                <select
                  value={recordsPerPage}
                  onChange={(e) => setCurrentPage(1) || setRecordsPerPage(Number(e.target.value))} // Reset page on records per page change
                  className="bg-orange-500 text-white px-3 py-1 rounded-md border-none text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 appearance-none pr-8"
                >
                  <option value={25}>25 Records per page</option>
                  <option value={50}>50 Records per page</option>
                  <option value={100}>100 Records per page</option>
                </select>
                <div className="flex items-center space-x-2 text-sm">
                  <span>{startRecord}-{endRecord} of {deals.length}</span>
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
                        checked={selectedDeals.length > 0 && selectedDeals.length === deals.length}
                        onChange={selectAllDeals}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span>Deal Name</span>
                        <Filter className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span>Amount</span>
                        <Filter className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span>Sales Stage</span>
                        <Filter className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span>OEM Name</span>
                        <Filter className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span>Solution Engineer</span>
                        <Filter className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span>Start Date</span>
                        <Filter className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span>Close Date</span>
                        <Filter className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {renderDealsTableRows()}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <InternalKanbanBoard
            deals={deals}
            KANBAN_STAGES={KANBAN_STAGES}
            onDealDrop={handleDealDrop}
            onDealClick={(dealId) => navigate(`/admin-dashboard/deals/${dealId}`)} // Navigate to detail view on click
          />
        )}
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
          accountNames={accountNames} // Pass account names to modal
        />
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this deal?"
          onConfirm={executeDeleteDeal}
          onCancel={cancelDeleteDeal}
        />
      )}
    </div>
  );
};

export default Dealmain;
