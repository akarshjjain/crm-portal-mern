
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
//   BarChart3, // For empty state icon (or adjust if you prefer another)
//   Edit,
//   Trash2
// } from 'lucide-react';

// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; // Import react-beautiful-dnd components
// import { useAuth } from '../../context/AuthContext'; // Import your custom useAuth hook

// // Define sales stages in the new requested order
// const KANBAN_STAGES = [
//   'Validated',
//   'Need Analysis',
//   'Identity Decision Maker', // Corrected from 'Identify Decision maker'
//   'Pipeline',
//   'Techwin',
//   'Budgetary',
//   'Value Proposition', // Corrected from 'value proposition'
//   'Upside',
//   'Commit',
//   'Proposal/Price Quote', // Mapped from 'proposals'
//   'Negotiation',
//   'PO received',
//   'Closed Won', // Mapped from 'won'
//   'Lost',
//   'Implemented' // Mapped from 'implementation'
// ];

// // Define stages where employees CANNOT edit (these stages are generally final/non-modifiable)
// const EMPLOYEE_NON_EDITABLE_KANBAN_STAGES = new Set([
//   'PO received', 'Closed Won', 'Lost', 'Implemented'
// ]);

// // Define stages where employees CAN edit (all KANBAN_STAGES except the non-editable ones)
// const EMPLOYEE_EDITABLE_STAGES = new Set(
//   KANBAN_STAGES.filter(stage => !EMPLOYEE_NON_EDITABLE_KANBAN_STAGES.has(stage))
// );


// // Base URL for your backend API
// const API_BASE_URL = 'http://localhost:3000/api';

// // Custom Confirmation Modal Component (reused from Selleremployee)
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

// // CreateDealModal Component - MODIFIED
// const CreateDealModal = ({
//   formData,
//   handleFormChange,
//   handleCloseModal,
//   handleSaveAndNew,
//   handleCreateDeal,
//   handleUpdateDeal,
//   editingDeal, // This prop tells us if we are in edit mode
//   currentUser,
//   accountNames, // Passed from parent to populate dropdown
//   isSalesStageEditable // New prop to control sales stage editability based on permission
// }) => {
//   const isOwnerFieldDisabled = currentUser?.isLoggedIn && currentUser?.role === 'employee';

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
//               {!editingDeal && ( // Only show "Save and new" when creating a new deal
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
//             {editingDeal ? (
//               // Display only "Deal Name" (read-only) and "Sales Stage" (conditional edit) when in edit mode
//               <>
//                 <div>
//                   <h3 className="text-lg font-semibold mb-4 text-gray-900">Deal Information</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <label htmlFor="dealName" className="block text-sm font-medium text-gray-700 mb-1">Deal Name</label>
//                       <input
//                         id="dealName"
//                         type="text"
//                         value={formData.dealName}
//                         className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 cursor-not-allowed"
//                         readOnly // Make Deal Name read-only when editing
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="salesStage" className="block text-sm font-medium text-gray-700 mb-1">Sales Stage</label>
//                       <div className="relative">
//                         <select
//                           id="salesStage"
//                           value={formData.salesStage}
//                           onChange={handleFormChange}
//                           className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10 ${!isSalesStageEditable ? 'bg-gray-100 cursor-not-allowed' : ''}`}
//                           disabled={!isSalesStageEditable} // Disable based on the new prop `isSalesStageEditable`
//                         >
//                           {KANBAN_STAGES.map(stage => (
//                             <option key={stage} value={stage}>{stage}</option>
//                           ))}
//                         </select>
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                           <ChevronDown className="w-5 h-5 text-gray-400" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* Empty div for the second column to maintain grid layout, or adjust as needed */}
//                 <div></div>
//               </>
//             ) : (
//               // Display all fields when creating a new deal
//               <>
//                 <div>
//                   <h3 className="text-lg font-semibold mb-4 text-gray-900">Deal Information</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <label htmlFor="dealOwner" className="block text-sm font-medium text-gray-700 mb-1">Deal Owner</label>
//                       <div className="relative">
//                         <select
//                           id="dealOwner"
//                           value={formData.dealOwner}
//                           onChange={handleFormChange}
//                           className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10 ${isOwnerFieldDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
//                           disabled={isOwnerFieldDisabled}
//                         >
//                           {isOwnerFieldDisabled ? (
//                             <option value={currentUser.name}>{currentUser.name}</option>
//                           ) : (
//                             <>
//                               <option value="None">-None-</option>
//                               {/* These should ideally come from your employee list API */}
//                               <option value="Amit Seth">Amit Seth</option>
//                               <option value="Danish Bindra">Danish Bindra</option>
//                               <option value="Tanushree Das">Tanushree Das</option>
//                               <option value="Tanmay Singh">Tanmay Singh</option>
//                               <option value="Prabhat Mohant">Prabhat Mohant</option>
//                             </>
//                           )}
//                         </select>
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                           <ChevronDown className="w-5 h-5 text-gray-400" />
//                         </div>
//                       </div>
//                     </div>

//                       <div>
//                         <label htmlFor="dealName" className="block text-sm font-medium text-gray-700 mb-1">
//                           Deal Name
//                         </label>
//                         <input
//                           id="dealName"
//                           type="text"
//                           value={formData.dealName}
//                           onChange={handleFormChange}
//                           className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                           placeholder="Enter Deal Name"
//                         />
//                       </div>

//                       <div>
//                         <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
//                           Amount
//                         </label>
//                         <input
//                           id="amount"
//                           type="number"
//                           value={formData.amount}
//                           onChange={handleFormChange}
//                           className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                           placeholder="Enter Amount"
//                         />
//                       </div>


//                     <div>
//                       <label htmlFor="salesStage" className="block text-sm font-medium text-gray-700 mb-1">Sales Stage</label>
//                       <div className="relative">
//                         <select
//                           id="salesStage"
//                           value={formData.salesStage}
//                           onChange={handleFormChange}
//                           className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                         >
//                           {KANBAN_STAGES.map(stage => (
//                             <option key={stage} value={stage}>{stage}</option>
//                           ))}
//                         </select>
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                           <ChevronDown className="w-5 h-5 text-gray-400" />
//                         </div>
//                       </div>
//                     </div>

//                     <div>
//                       <label htmlFor="closeDate" className="block text-sm font-medium text-gray-700 mb-1">Close Date</label>
//                       <input
//                         id="closeDate"
//                         type="date"
//                         value={formData.closeDate}
//                         onChange={handleFormChange}
//                         className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Additional Deal Information Section - All Fields */}
//                 <div>
//                   <h3 className="text-lg font-semibold mb-4 text-gray-900">Additional Information</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <label htmlFor="oemName" className="block text-sm font-medium text-gray-700 mb-1">OEM Name</label>
//                       <input
//                         id="oemName"
//                         type="text"
//                         value={formData.oemName}
//                         onChange={handleFormChange}
//                         className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                         placeholder="Enter OEM Name"
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="serviceEngineer" className="block text-sm font-medium text-gray-700 mb-1">Solution Engineer</label>
//                       <input
//                         id="serviceEngineer"
//                         type="text"
//                         value={formData.serviceEngineer}
//                         onChange={handleFormChange}
//                         className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                         placeholder="Enter Solution Engineer Name"
//                       />
//                     </div>
//                      <div>
//                       <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">
//                         Account Name <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <select
//                           id="accountName"
//                           value={formData.accountName}
//                           onChange={handleFormChange}
//                           required
//                           className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                         >
//                           <option value="">- Select Account -</option>
//                           {accountNames.map(account => (
//                             <option key={account._id} value={account.accountName}>
//                               {account.accountName}
//                             </option>
//                           ))}
//                         </select>
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                           <ChevronDown className="w-5 h-5 text-gray-400" />
//                         </div>
//                       </div>
//                     </div>

//                     {/* NEW FIELD: Start Date */}
//                     <div>
//                       <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//                       <input
//                         id="startDate"
//                         type="date"
//                         value={formData.startDate}
//                         onChange={handleFormChange}
//                         className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       />
//                     </div>
//                     {/* Keeping contactName if it's still relevant to deals, otherwise remove */}
//                     <div>
//                       <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
//                       <input
//                         id="contactName"
//                         type="text"
//                         value={formData.contactName}
//                         onChange={handleFormChange}
//                         className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                         placeholder="Enter Contact Name"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}
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

// // KanbanBoard component defined internally within Dealemployee.jsx
// const InternalKanbanBoard = ({ deals, KANBAN_STAGES, onDealDrop, onDealClick, canEmployeeEditDeal }) => {
//   // Group deals by sales stage
//   const dealsByStage = KANBAN_STAGES.reduce((acc, stage) => {
//     acc[stage] = deals.filter(deal => deal.salesStage === stage);
//     return acc;
//   }, {});

//   const onDragEnd = (result) => {
//     const { source, destination, draggableId } = result;

//     // Dropped outside the list
//     if (!destination) {
//       return;
//     }

//     // If moved to the same place, do nothing
//     if (source.droppableId === destination.droppableId && source.index === destination.index) {
//       return;
//     }

//     const sourceStage = source.droppableId;
//     const destinationStage = destination.droppableId;
//     const movedDeal = deals.find(deal => deal._id === draggableId);

//     if (!movedDeal) return;

//     // Check if the current user has permission to edit this deal (based on ownership)
//     // and if the destination stage is editable for an employee.
//     const isOwnerOrAdmin = canEmployeeEditDeal(movedDeal); // This checks ownership and general editability
//     const isDestinationStageEditable = EMPLOYEE_EDITABLE_STAGES.has(destinationStage); // Use EMPLOYEE_EDITABLE_STAGES

//     if (!isOwnerOrAdmin || !isDestinationStageEditable) {
//       alert(`You cannot move this deal to '${destinationStage}' stage.`);
//       return;
//     }

//     // Call the parent component's handler to update the deal's stage
//     onDealDrop(draggableId, destinationStage);
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <div className="flex overflow-x-auto gap-4 p-4 min-h-[calc(100vh-180px)]"> {/* Adjust min-height as needed */}
//         {KANBAN_STAGES.map((stage) => (
//           <Droppable droppableId={stage} key={stage}>
//             {(provided, snapshot) => (
//               <div
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 className={`flex-shrink-0 w-80 rounded-lg shadow-md border 
//                             ${snapshot.isDraggingOver ? 'bg-indigo-100 border-indigo-400' : 'bg-gray-100 border-gray-200'} 
//                             transition-all duration-200 flex flex-col`}
//                 style={{ minHeight: '150px' }} // Ensure columns have a minimum height for dropping
//               >
//                 <h3 className="px-4 py-3 bg-indigo-700 text-white rounded-t-lg font-semibold text-lg border-b border-indigo-600">
//                   {stage} ({dealsByStage[stage]?.length || 0})
//                 </h3>
//                 <div className="p-3 flex-grow overflow-y-auto">
//                   {dealsByStage[stage] && dealsByStage[stage].length > 0 ? (
//                     dealsByStage[stage].map((deal, index) => (
//                       <Draggable
//                         key={deal._id}
//                         draggableId={deal._id}
//                         index={index}
//                         isDragDisabled={
//                           !canEmployeeEditDeal(deal) || // Cannot drag if general edit permission is denied
//                           EMPLOYEE_NON_EDITABLE_KANBAN_STAGES.has(deal.salesStage) // Cannot drag if current stage is non-editable
//                         }
//                       >
//                         {(provided, snapshot) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className={`bg-white p-4 mb-3 rounded-md shadow-sm border border-gray-200 cursor-pointer 
//                                         ${snapshot.isDragging ? 'ring-2 ring-indigo-500 shadow-lg' : 'hover:border-indigo-300'}
//                                         ${(!canEmployeeEditDeal(deal) || EMPLOYEE_NON_EDITABLE_KANBAN_STAGES.has(deal.salesStage)) ? 'opacity-60 cursor-not-allowed border-dashed' : ''}
//                                         transition-all duration-150`}
//                             onClick={() => onDealClick(deal._id)}
//                           >
//                             <h4 className="font-semibold text-gray-800 text-base mb-1">{deal.dealName}</h4>
//                             <p className="text-sm text-gray-600">
//                               Amount: {deal.amount ? deal.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : 'N/A'}
//                             </p>
//                             <p className="text-sm text-gray-600">Owner: {deal.dealOwner || 'N/A'}</p>
//                             <p className="text-sm text-gray-600">Close Date: {deal.closeDate || 'N/A'}</p>
//                           </div>
//                         )}
//                       </Draggable>
//                     ))
//                   ) : (
//                     <div className="text-center py-6 text-gray-500">
//                       <BarChart3 className="w-8 h-8 mx-auto mb-2 text-gray-300" />
//                       No deals in this stage.
//                     </div>
//                   )}
//                   {provided.placeholder}
//                 </div>
//               </div>
//             )}
//           </Droppable>
//         ))}
//       </div>
//     </DragDropContext>
//   );
// };


// const Dealemployee = () => {
//   const { user: currentUser, loading: authLoading } = useAuth();
//   const navigate = useNavigate(); // Initialize useNavigate

//   const [deals, setDeals] = useState([]);
//   const [selectedDeals, setSelectedDeals] = useState([]);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [recordsPerPage, setRecordsPerPage] = useState(25); // Default to 25 records per page
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [editingDeal, setEditingDeal] = useState(null);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [dealToDelete, setDealToDelete] = useState(null);
//   const [accountNames, setAccountNames] = useState([]); // State to store account names for dropdown
//   const [viewMode, setViewMode] = useState('table'); // 'table' or 'kanban'

//   // Memoized function to fetch accounts for the dropdown, filtered by current user if employee
//   const fetchAccountNames = useCallback(async () => {
//     // Only fetch if currentUser is available and not still loading auth
//     if (!currentUser || authLoading) {
//       setAccountNames([]); // Clear accounts if user not ready or not logged in
//       return;
//     }

//     try {
//       // Always fetch all accounts first
//       const response = await fetch(`${API_BASE_URL}/account`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch account names');
//       }
//       let allAccounts = await response.json();
//       console.log('All accounts fetched for dropdown:', allAccounts);

//       // Filter accounts if the current user is an employee
//       if (currentUser.isLoggedIn && currentUser.role === 'employee') {
//         allAccounts = allAccounts.filter(account => account.accountOwner === currentUser.name);
//         console.log(`Filtered accounts for employee ${currentUser.name}:`, allAccounts);
//       } else {
//         console.log('Displaying all accounts in dropdown (Admin or no specific role).');
//       }

//       // Sort accounts alphabetically by accountName
//       allAccounts.sort((a, b) => a.accountName.localeCompare(b.accountName));
//       setAccountNames(allAccounts);

//     } catch (error) {
//       console.error('Error fetching account names:', error);
//       setAccountNames([]); // Fallback to empty array on error
//     }
//   }, [currentUser, authLoading]); // Dependencies: re-run when currentUser or authLoading changes

//   // Memoized function to fetch deals, with optional filtering by dealOwner
//   const fetchDeals = useCallback(async () => {
//     if (authLoading || !currentUser) {
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       let url = `${API_BASE_URL}/deal`;

//       // If employee, filter by dealOwner
//       if (currentUser.isLoggedIn && currentUser.role === 'employee') {
//         url = `${API_BASE_URL}/deal?dealOwner=${encodeURIComponent(currentUser.name)}`;
//         console.log(`Fetching deals for employee: ${currentUser.name}`);
//       } else {
//         console.log('Fetching all deals (Admin view or not logged in)');
//       }

//       const response = await fetch(url);
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
//       setDeals([]); // Fallback to empty array on error
//     } finally {
//       setLoading(false);
//     }
//   }, [currentUser, authLoading]);

//   // Fetch accounts and deals on component mount or when auth state changes
//   useEffect(() => {
//     fetchAccountNames();
//     fetchDeals();
//   }, [fetchAccountNames, fetchDeals]);


//   const [formData, setFormData] = useState({
//     dealOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
//     dealName: '',
//     amount: '',
//     salesStage: 'Qualification', // Default to first stage if not specified
//     contactName: '',
//     closeDate: '',
//     oemName: '', 
//     serviceEngineer: '', 
//     accountName: '', 
//     startDate: '', // NEW FIELD
//   });

//   // Effect to populate form data when editingDeal changes or currentUser changes (for owner reset)
//   useEffect(() => {
//     if (editingDeal) {
//       setFormData({
//         dealOwner: editingDeal.dealOwner || 'None',
//         dealName: editingDeal.dealName || '',
//         amount: editingDeal.amount || '',
//         salesStage: editingDeal.salesStage || KANBAN_STAGES[0], // Default to first KANBAN_STAGE
//         contactName: editingDeal.contactName || '',
//         closeDate: editingDeal.closeDate || '',
//         oemName: editingDeal.oemName || '', 
//         serviceEngineer: editingDeal.serviceEngineer || '', 
//         accountName: editingDeal.accountName || '', 
//         startDate: editingDeal.startDate || '', // NEW FIELD
//       });
//     } else {
//       // Reset form data for a new deal, pre-filling owner if employee
//       setFormData({
//         dealOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
//         dealName: '',
//         amount: '',
//         salesStage: KANBAN_STAGES[0], // Default to first KANBAN_STAGE
//         contactName: '',
//         closeDate: '',
//         oemName: '',
//         serviceEngineer: '',
//         accountName: '',
//         startDate: '', // NEW FIELD
//       });
//     }
//   }, [editingDeal, currentUser]);


//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleCloseModal = () => {
//     setShowCreateForm(false);
//     setEditingDeal(null); // Clear editing deal when modal closes
//   };

//   // Helper to determine the actual deal owner for API payload
//   const getActualDealOwner = () => {
//     if (currentUser?.isLoggedIn && currentUser?.role === 'employee') {
//       return currentUser.name; // Employee can only be their own owner
//     }
//     // For admin or if no user is logged in
//     return formData.dealOwner === 'None' ? 'Danish Bindra' : formData.dealOwner; // Default if "None" selected by admin
//   };

//   const handleCreateDeal = async () => {
//     if (!formData.dealName || !formData.amount) {
//       alert('Deal Name and Amount are required.');
//       return;
//     }

//     try {
//       const newDealData = {
//         ...formData,
//         dealOwner: getActualDealOwner(), // Use the helper to set the owner
//       };

//       console.log('Attempting to create deal with data:', newDealData);
//       const response = await fetch(`${API_BASE_URL}/deal`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newDealData),
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

//       const createdDeal = JSON.parse(responseText);
//       console.log('Deal created successfully on backend:', createdDeal);
//       await fetchDeals();
//       handleCloseModal();
//     } catch (error) {
//       console.error('Error creating deal:', error);
//       alert(`Failed to create deal: ${error.message}. Check console for details.`);
//     }
//   };

//   const handleSaveAndNew = async () => {
//     if (!formData.dealName || !formData.amount) {
//       alert('Deal Name and Amount are required to save and create a new deal.');
//       return;
//     }

//     try {
//       const newDealData = {
//         ...formData,
//         dealOwner: getActualDealOwner(),
//       };

//       console.log('Attempting to save and create new deal with data:', newDealData);
//       const response = await fetch(`${API_BASE_URL}/deal`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newDealData),
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

//       const createdDeal = JSON.parse(responseText);
//       console.log('Deal saved and ready for new entry:', createdDeal);
//       await fetchDeals();
//       setFormData({
//         dealOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
//         dealName: '',
//         amount: '',
//         salesStage: KANBAN_STAGES[0], // Reset to first KANBAN_STAGE
//         contactName: '',
//         closeDate: '',
//         oemName: '',
//         serviceEngineer: '',
//         accountName: '',
//         startDate: '', // NEW FIELD
//       });
//       setEditingDeal(null);
//       // Keep form open for new entry
//     } catch (error) {
//       console.error('Error saving and creating new deal:', error);
//       alert(`Failed to save and create new deal: ${error.message}. Check console for details.`);
//     }
//   };

//   const handleUpdateDeal = async () => {
//     if (!editingDeal) {
//       alert('No deal is being edited.');
//       return;
//     }

//     // Only allow updating salesStage from the modal when in edit mode
//     // The Deal Name is read-only, and other fields are not shown in edit view.
//     const updatedFields = {
//       salesStage: formData.salesStage,
//     };

//     try {
//       console.log(`Sending update data for deal ${editingDeal._id}:`, updatedFields);
//       const response = await fetch(`${API_BASE_URL}/deal/${editingDeal._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedFields),
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

//       const updatedDeal = JSON.parse(responseText);
//       console.log('Deal updated successfully on backend:', updatedDeal);
//       await fetchDeals();
//       handleCloseModal();
//     } catch (error) {
//       console.error('Error updating deal:', error);
//       alert(`Failed to update deal: ${error.message}. Check console for details.`);
//     }
//   };

//   const handleDealDrop = async (dealId, newSalesStage) => {
//     const dealToUpdate = deals.find(deal => deal._id === dealId);
//     if (!dealToUpdate) {
//       console.error('Deal not found for drag-and-drop update:', dealId);
//       return;
//     }

//     // Apply the same permission check for drag-and-drop as for the edit button
//     // Ensure the moved deal is editable and the target stage is also editable
//     const isOwnerOrAdmin = canEmployeeEditDeal(dealToUpdate);
//     const isDestinationStageEditable = EMPLOYEE_EDITABLE_STAGES.has(newSalesStage); // Using the same logic for target stage

//     if (!isOwnerOrAdmin || !isDestinationStageEditable) {
//       alert(`You cannot move this deal to '${newSalesStage}' stage or you don't have permission.`);
//       return;
//     }

//     // Optimistic UI update
//     setDeals(prevDeals =>
//       prevDeals.map(deal =>
//         deal._id === dealId ? { ...deal, salesStage: newSalesStage } : deal
//       )
//     );

//     try {
//       console.log(`Attempting to update deal ${dealId} to stage: ${newSalesStage}`);
//       const response = await fetch(`${API_BASE_URL}/deal/${dealId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ salesStage: newSalesStage }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         throw new Error(`Failed to update deal stage: ${response.statusText}`);
//       }
//       console.log('Deal stage updated successfully on backend.');
//       // Re-fetch all deals to ensure data consistency, especially if other fields might change or sorting logic is complex
//       await fetchDeals();
//     } catch (error) {
//       console.error('Error updating deal stage:', error);
//       alert(`Failed to update deal stage: ${error.message}. Reverting changes.`);
//       // Revert optimistic update on error
//       setDeals(prevDeals =>
//         prevDeals.map(deal =>
//           deal._id === dealId ? { ...deal, salesStage: dealToUpdate.salesStage } : deal // Revert to original stage
//         )
//       );
//     }
//   };


//   const confirmDeleteDeal = (dealId, dealOwner) => {
//     // Only admins can delete deals
//     const canDelete = currentUser?.isLoggedIn && currentUser?.role === 'admin';

//     if (!canDelete) {
//       alert("You do not have permission to delete this deal.");
//       return;
//     }

//     setDealToDelete(dealId);
//     setShowConfirmModal(true);
//   };

//   const executeDeleteDeal = async () => {
//     if (!dealToDelete) return;
//     setShowConfirmModal(false);

//     try {
//       console.log('Attempting to delete deal with ID:', dealToDelete);
//       const response = await fetch(`${API_BASE_URL}/deal/${dealToDelete}`, {
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

//       console.log('Deal deleted successfully on backend:', dealToDelete);
//       await fetchDeals();
//       setDealToDelete(null);
//     } catch (error) {
//       console.error('Error deleting deal:', error);
//       alert(`Failed to delete deal: ${error.message}. Check console for details.`);
//     }
//   };

//   const cancelDeleteDeal = () => {
//     setShowConfirmModal(false);
//     setDealToDelete(null);
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

//   // Permission check for edit action based on role and sales stage
//   const canEmployeeEditDeal = (deal) => {
//     if (!currentUser?.isLoggedIn) return false;

//     // Admin can always edit
//     if (currentUser.role === 'admin') {
//       return true;
//     }

//     // Employee can edit ONLY their own deals AND if the sales stage is editable
//     if (currentUser.role === 'employee' && currentUser.name === deal.dealOwner) {
//       return EMPLOYEE_EDITABLE_STAGES.has(deal.salesStage);
//     }

//     return false; // No permission otherwise
//   };

//   // Permission check for delete action (only admin can delete)
//   const canDeleteDeal = () => {
//     return currentUser?.isLoggedIn && currentUser?.role === 'admin';
//   };

//   if (authLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
//         <div className="text-gray-600 text-lg">Loading authentication state...</div>
//       </div>
//     );
//   }

//   // Moved loading check to render block for better UX with initial state
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
//         <div className="text-gray-600 text-lg">Loading Deals...</div>
//       </div>
//     );
//   }

//   const renderDealsTableRows = () => {
//     if (deals.length === 0 && !loading) {
//       return (
//         <tr>
//           <td colSpan="9" className="text-center py-12"> {/* Updated colspan for 9 columns */}
//             <div className="text-gray-500">
//               <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
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
//           {/* Navigate to Dealemployeeview */}
//           <span
//             onClick={() => navigate(`/employee-dashboard/deals/${deal._id}`)}
//             className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
//           >
//             {deal.dealName}
//           </span>
//         </td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
//           {deal.amount ? deal.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : 'N/A'}
//         </td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.salesStage || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.oemName || 'N/A'}</td> 
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.serviceEngineer || 'N/A'}</td> 
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.startDate || 'N/A'}</td> {/* Display Start Date */}
//         <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.closeDate || 'N/A'}</td>
//         <td className="px-6 py-4 text-sm whitespace-nowrap">
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => {
//                 // Check if employee can edit this specific deal based on sales stage and ownership
//                 if (!canEmployeeEditDeal(deal)) {
//                   alert("You do not have permission to edit this deal at its current stage or you are not the owner.");
//                   return;
//                 }
//                 setEditingDeal(deal);
//                 setShowCreateForm(true);
//               }}
//               // Disabled based on canEmployeeEditDeal function
//               disabled={!canEmployeeEditDeal(deal)}
//               className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Edit Deal"
//             >
//               <Edit className="w-10 h-4" /> Update
//             </button>
//             {/* <button
//               onClick={() => confirmDeleteDeal(deal._id, deal.dealOwner)}
//               // Disabled if not an admin
//               disabled={!canDeleteDeal()}
//               className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Delete Deal"
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
//             {!currentUser?.isLoggedIn && (
//               <div className="text-gray-500 text-sm">Not logged in.</div>
//             )}
//           </div>

//           <div className="flex items-center space-x-3">
//              {/* View Mode Toggle Buttons */}
//             <button
//               onClick={() => setViewMode('table')}
//               className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${viewMode === 'table' ? 'bg-orange-600 text-white shadow' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
//             >
//               List View
//             </button>
//             <button
//               onClick={() => setViewMode('kanban')}
//               className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${viewMode === 'kanban' ? 'bg-orange-600 text-white shadow' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
//             >
//               Kanban View
//             </button>
//             <button
//               onClick={() => {
//                 setEditingDeal(null);
//                 setShowCreateForm(true);
//               }}
//               disabled={!currentUser?.isLoggedIn}
//               className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Create Deal
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-6">
//         {viewMode === 'table' ? (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//             {/* Table Header */}
//             <div className="flex items-center justify-between px-6 py-4 bg-indigo-700 text-white rounded-t-lg">
//               <span className="text-sm font-medium">Total Records {deals.length}</span>
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
//             </div>

//             {/* Table */}
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
//                         <span>Solution Engineer</span> 
//                         <Filter className="w-4 h-4 text-gray-400" />
//                       </div>
//                     </th>
//                     <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                       <div className="flex items-center space-x-2">
//                         <span>Start Date</span> {/* Column header changed */}
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
//                   {renderDealsTableRows()}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         ) : (
//           <InternalKanbanBoard
//             deals={deals}
//             KANBAN_STAGES={KANBAN_STAGES}
//             onDealDrop={handleDealDrop}
//             onDealClick={(dealId) => navigate(`/employee-dashboard/deals/${dealId}`)} // Pass for navigation
//             canEmployeeEditDeal={canEmployeeEditDeal} // Pass the permission checker
//           />
//         )}
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
//           currentUser={currentUser}
//           accountNames={accountNames} // Pass account names to modal
//           isSalesStageEditable={editingDeal ? canEmployeeEditDeal(editingDeal) : true} // Pass editability to modal
//         />
//       )}

//       {/* Confirmation Modal */}
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

// export default Dealemployee;


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
  BarChart3, // For empty state icon (or adjust if you prefer another)
  Edit,
  Trash2
} from 'lucide-react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; // Import react-beautiful-dnd components
import { useAuth } from '../../context/AuthContext'; // Import your custom useAuth hook

// Define sales stages in the new requested order
const KANBAN_STAGES = [
  'Validated',
  'Need Analysis',
  'Identity Decision Maker', // Corrected from 'Identify Decision maker'
  'Pipeline',
  'Techwin',
  'Budgetary',
  'Value Proposition', // Corrected from 'value proposition'
  'Upside',
  'Commit',
  'Proposal/Price Quote', // Mapped from 'proposals'
  'Negotiation',
  'PO received',
  'Closed Won', // Mapped from 'won'
  'Lost',
  'Implemented' // Mapped from 'implementation'
];

// Define stages where employees CANNOT edit (these stages are generally final/non-modifiable)
const EMPLOYEE_NON_EDITABLE_KANBAN_STAGES = new Set([
  'PO received', 'Closed Won', 'Lost', 'Implemented'
]);

// Define stages where employees CAN edit (all KANBAN_STAGES except the non-editable ones)
const EMPLOYEE_EDITABLE_STAGES = new Set(
  KANBAN_STAGES.filter(stage => !EMPLOYEE_NON_EDITABLE_KANBAN_STAGES.has(stage))
);


// Base URL for your backend API
const API_BASE_URL = 'http://localhost:3000/api';

// Custom Confirmation Modal Component (reused from Selleremployee)
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

// CreateDealModal Component - MODIFIED
const CreateDealModal = ({
  formData,
  handleFormChange,
  handleCloseModal,
  handleSaveAndNew,
  handleCreateDeal,
  handleUpdateDeal,
  editingDeal, // This prop tells us if we are in edit mode
  currentUser,
  accountNames, // Passed from parent to populate dropdown (NOW FILTERED)
  isSalesStageEditable // New prop to control sales stage editability based on permission
}) => {
  const isOwnerFieldDisabled = currentUser?.isLoggedIn && currentUser?.role === 'employee';

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
              {!editingDeal && ( // Only show "Save and new" when creating a new deal
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
            {editingDeal ? (
              // Display only "Deal Name" (read-only) and "Sales Stage" (conditional edit) when in edit mode
              <>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Deal Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="dealName" className="block text-sm font-medium text-gray-700 mb-1">Deal Name</label>
                      <input
                        id="dealName"
                        type="text"
                        value={formData.dealName}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 cursor-not-allowed"
                        readOnly // Make Deal Name read-only when editing
                      />
                    </div>
                    <div>
                      <label htmlFor="salesStage" className="block text-sm font-medium text-gray-700 mb-1">Sales Stage</label>
                      <div className="relative">
                        <select
                          id="salesStage"
                          value={formData.salesStage}
                          onChange={handleFormChange}
                          className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10 ${!isSalesStageEditable ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                          disabled={!isSalesStageEditable} // Disable based on the new prop `isSalesStageEditable`
                        >
                          {KANBAN_STAGES.map(stage => (
                            <option key={stage} value={stage}>{stage}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Empty div for the second column to maintain grid layout, or adjust as needed */}
                <div></div>
              </>
            ) : (
              // Display all fields when creating a new deal
              <>
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
                          className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10 ${isOwnerFieldDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                          disabled={isOwnerFieldDisabled}
                        >
                          {isOwnerFieldDisabled ? (
                            <option value={currentUser.name}>{currentUser.name}</option>
                          ) : (
                            <>
                              <option value="None">-None-</option>
                              {/* These should ideally come from your employee list API */}
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
                          {KANBAN_STAGES.map(stage => (
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

                {/* Additional Deal Information Section - All Fields */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Additional Information</h3>
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
                      <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                      <div className="relative">
                        <select
                          id="accountName"
                          value={formData.accountName}
                          onChange={handleFormChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
                        >
                          <option value="">- Select Account -</option>
                          {accountNames.map(account => (
                            // Assuming accountNames is an array of objects like { _id, accountName }
                            <option key={account._id} value={account.accountName}>{account.accountName}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    {/* NEW FIELD: Start Date */}
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
                    {/* Keeping contactName if it's still relevant to deals, otherwise remove */}
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
                  </div>
                </div>
              </>
            )}
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

// KanbanBoard component defined internally within Dealemployee.jsx
const InternalKanbanBoard = ({ deals, KANBAN_STAGES, onDealDrop, onDealClick, canEmployeeEditDeal }) => {
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

    const sourceStage = source.droppableId;
    const destinationStage = destination.droppableId;
    const movedDeal = deals.find(deal => deal._id === draggableId);

    if (!movedDeal) return;

    // Check if the current user has permission to edit this deal (based on ownership)
    // and if the destination stage is editable for an employee.
    const isOwnerOrAdmin = canEmployeeEditDeal(movedDeal); // This checks ownership and general editability
    const isDestinationStageEditable = EMPLOYEE_EDITABLE_STAGES.has(destinationStage); // Use EMPLOYEE_EDITABLE_STAGES

    if (!isOwnerOrAdmin || !isDestinationStageEditable) {
      alert(`You cannot move this deal to '${destinationStage}' stage.`);
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
                        isDragDisabled={
                          !canEmployeeEditDeal(deal) || // Cannot drag if general edit permission is denied
                          EMPLOYEE_NON_EDITABLE_KANBAN_STAGES.has(deal.salesStage) // Cannot drag if current stage is non-editable
                        }
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white p-4 mb-3 rounded-md shadow-sm border border-gray-200 cursor-pointer
                                        ${snapshot.isDragging ? 'ring-2 ring-indigo-500 shadow-lg' : 'hover:border-indigo-300'}
                                        ${(!canEmployeeEditDeal(deal) || EMPLOYEE_NON_EDITABLE_KANBAN_STAGES.has(deal.salesStage)) ? 'opacity-60 cursor-not-allowed border-dashed' : ''}
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


const Dealemployee = () => {
  const { user: currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const [deals, setDeals] = useState([]);
  const [selectedDeals, setSelectedDeals] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(25); // Default to 25 records per page
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editingDeal, setEditingDeal] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [dealToDelete, setDealToDelete] = useState(null);
  const [accountNames, setAccountNames] = useState([]); // State to store account names for dropdown
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'kanban'

  // Memoized function to fetch accounts for the dropdown, filtered by current user if employee
  const fetchAccountNames = useCallback(async () => {
    // Only fetch if currentUser is available and not still loading auth
    if (!currentUser || authLoading) {
      setAccountNames([]); // Clear accounts if user not ready or not logged in
      return;
    }

    try {
      setLoading(true); // Assuming this might also affect overall loading or at least show activity
      let url = `${API_BASE_URL}/account?status=approved`; // Always start with approved accounts

      // If employee, filter by their owned accounts
      if (currentUser.isLoggedIn && currentUser.role === 'employee') {
        url += `&accountOwner=${encodeURIComponent(currentUser.name)}`;
        console.log(`Fetching approved accounts for dropdown, employee: ${currentUser.name}`);
      } else if (currentUser.isLoggedIn && currentUser.role === 'admin') {
        // Admins can see all approved accounts
        console.log('Fetching all approved accounts for dropdown (Admin view).');
      } else {
        // If not logged in, no accounts to show
        setAccountNames([]);
        setLoading(false);
        return;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch account names');
      }
      let accountsData = await response.json();
      console.log('Raw accounts fetched for dropdown:', accountsData);

      // Sort accounts alphabetically by accountName
      accountsData.sort((a, b) => a.accountName.localeCompare(b.accountName));
      setAccountNames(accountsData); // Store full account objects if needed, or just names: .map(acc => acc.accountName)

    } catch (error) {
      console.error('Error fetching account names:', error);
      setAccountNames([]); // Fallback to empty array on error
    } finally {
      // Note: Setting loading to false here might clash with overall Dealemployee loading state.
      // If `fetchDeals` also sets `loading`, consider a more granular loading state.
      // For now, I'll remove it as `fetchDeals` will manage the primary `loading` state.
      // setLoading(false);
    }
  }, [currentUser, authLoading]); // Dependencies: re-run when currentUser or authLoading changes

  // Memoized function to fetch deals, with optional filtering by dealOwner
  const fetchDeals = useCallback(async () => {
    if (authLoading || !currentUser) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      let url = `${API_BASE_URL}/deal`;

      // If employee, filter by dealOwner
      if (currentUser.isLoggedIn && currentUser.role === 'employee') {
        url = `${API_BASE_URL}/deal?dealOwner=${encodeURIComponent(currentUser.name)}`;
        console.log(`Fetching deals for employee: ${currentUser.name}`);
      } else {
        console.log('Fetching all deals (Admin view or not logged in)');
      }

      const response = await fetch(url);
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
      setDeals([]); // Fallback to empty array on error
    } finally {
      setLoading(false);
    }
  }, [currentUser, authLoading]);

  // Fetch accounts AND deals on component mount or when auth state changes
  useEffect(() => {
    fetchAccountNames();
    fetchDeals();
  }, [fetchAccountNames, fetchDeals]);


  const [formData, setFormData] = useState({
    dealOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
    dealName: '',
    amount: '',
    salesStage: 'Qualification', // Default to first stage if not specified
    contactName: '',
    closeDate: '',
    oemName: '',
    serviceEngineer: '',
    accountName: '',
    startDate: '', // NEW FIELD
  });

  // Effect to populate form data when editingDeal changes or currentUser changes (for owner reset)
  useEffect(() => {
    if (editingDeal) {
      setFormData({
        dealOwner: editingDeal.dealOwner || 'None',
        dealName: editingDeal.dealName || '',
        amount: editingDeal.amount || '',
        salesStage: editingDeal.salesStage || KANBAN_STAGES[0], // Default to first KANBAN_STAGE
        contactName: editingDeal.contactName || '',
        closeDate: editingDeal.closeDate || '',
        oemName: editingDeal.oemName || '',
        serviceEngineer: editingDeal.serviceEngineer || '',
        accountName: editingDeal.accountName || '',
        startDate: editingDeal.startDate || '', // NEW FIELD
      });
    } else {
      // Reset form data for a new deal, pre-filling owner if employee
      setFormData({
        dealOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
        dealName: '',
        amount: '',
        salesStage: KANBAN_STAGES[0], // Default to first KANBAN_STAGE
        contactName: '',
        closeDate: '',
        oemName: '',
        serviceEngineer: '',
        accountName: '',
        startDate: '', // NEW FIELD
      });
    }
  }, [editingDeal, currentUser]);


  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCloseModal = () => {
    setShowCreateForm(false);
    setEditingDeal(null); // Clear editing deal when modal closes
  };

  // Helper to determine the actual deal owner for API payload
  const getActualDealOwner = () => {
    if (currentUser?.isLoggedIn && currentUser?.role === 'employee') {
      return currentUser.name; // Employee can only be their own owner
    }
    // For admin or if no user is logged in
    return formData.dealOwner === 'None' ? 'Danish Bindra' : formData.dealOwner; // Default if "None" selected by admin
  };

  const handleCreateDeal = async () => {
    if (!formData.dealName || !formData.amount) {
      alert('Deal Name and Amount are required.');
      return;
    }

    try {
      const newDealData = {
        ...formData,
        dealOwner: getActualDealOwner(), // Use the helper to set the owner
      };

      console.log('Attempting to create deal with data:', newDealData);
      const response = await fetch(`${API_BASE_URL}/deal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDealData),
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

      const createdDeal = JSON.parse(responseText);
      console.log('Deal created successfully on backend:', createdDeal);
      await fetchDeals();
      handleCloseModal();
    } catch (error) {
      console.error('Error creating deal:', error);
      alert(`Failed to create deal: ${error.message}. Check console for details.`);
    }
  };

  const handleSaveAndNew = async () => {
    if (!formData.dealName || !formData.amount) {
      alert('Deal Name and Amount are required to save and create a new deal.');
      return;
    }

    try {
      const newDealData = {
        ...formData,
        dealOwner: getActualDealOwner(),
      };

      console.log('Attempting to save and create new deal with data:', newDealData);
      const response = await fetch(`${API_BASE_URL}/deal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDealData),
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

      const createdDeal = JSON.parse(responseText);
      console.log('Deal saved and ready for new entry:', createdDeal);
      await fetchDeals();
      setFormData({
        dealOwner: currentUser?.isLoggedIn && currentUser?.role === 'employee' ? currentUser.name : 'None',
        dealName: '',
        amount: '',
        salesStage: KANBAN_STAGES[0], // Reset to first KANBAN_STAGE
        contactName: '',
        closeDate: '',
        oemName: '',
        serviceEngineer: '',
        accountName: '',
        startDate: '', // NEW FIELD
      });
      setEditingDeal(null);
      // Keep form open for new entry
    } catch (error) {
      console.error('Error saving and creating new deal:', error);
      alert(`Failed to save and create new deal: ${error.message}. Check console for details.`);
    }
  };

  const handleUpdateDeal = async () => {
    if (!editingDeal) {
      alert('No deal is being edited.');
      return;
    }

    // Only allow updating salesStage from the modal when in edit mode
    // The Deal Name is read-only, and other fields are not shown in edit view.
    const updatedFields = {
      salesStage: formData.salesStage,
    };

    try {
      console.log(`Sending update data for deal ${editingDeal._id}:`, updatedFields);
      const response = await fetch(`${API_BASE_URL}/deal/${editingDeal._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
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

      const updatedDeal = JSON.parse(responseText);
      console.log('Deal updated successfully on backend:', updatedDeal);
      await fetchDeals();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating deal:', error);
      alert(`Failed to update deal: ${error.message}. Check console for details.`);
    }
  };

  const handleDealDrop = async (dealId, newSalesStage) => {
    const dealToUpdate = deals.find(deal => deal._id === dealId);
    if (!dealToUpdate) {
      console.error('Deal not found for drag-and-drop update:', dealId);
      return;
    }

    // Apply the same permission check for drag-and-drop as for the edit button
    // Ensure the moved deal is editable and the target stage is also editable
    const isOwnerOrAdmin = canEmployeeEditDeal(dealToUpdate);
    const isDestinationStageEditable = EMPLOYEE_EDITABLE_STAGES.has(newSalesStage); // Using the same logic for target stage

    if (!isOwnerOrAdmin || !isDestinationStageEditable) {
      alert(`You cannot move this deal to '${newSalesStage}' stage or you don't have permission.`);
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
        body: JSON.stringify({ salesStage: newSalesStage }),
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


  const confirmDeleteDeal = (dealId, dealOwner) => {
    // Only admins can delete deals
    const canDelete = currentUser?.isLoggedIn && currentUser?.role === 'admin';

    if (!canDelete) {
      alert("You do not have permission to delete this deal.");
      return;
    }

    setDealToDelete(dealId);
    setShowConfirmModal(true);
  };

  const executeDeleteDeal = async () => {
    if (!dealToDelete) return;
    setShowConfirmModal(false);

    try {
      console.log('Attempting to delete deal with ID:', dealToDelete);
      const response = await fetch(`${API_BASE_URL}/deal/${dealToDelete}`, {
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

      console.log('Deal deleted successfully on backend:', dealToDelete);
      await fetchDeals();
      setDealToDelete(null);
    } catch (error) {
      console.error('Error deleting deal:', error);
      alert(`Failed to delete deal: ${error.message}. Check console for details.`);
    }
  };

  const cancelDeleteDeal = () => {
    setShowConfirmModal(false);
    setDealToDelete(null);
  };

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

  const totalPages = Math.ceil(deals.length / recordsPerPage);
  const startRecord = (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, deals.length);

  // Permission check for edit action based on role and sales stage
  const canEmployeeEditDeal = (deal) => {
    if (!currentUser?.isLoggedIn) return false;

    // Admin can always edit
    if (currentUser.role === 'admin') {
      return true;
    }

    // Employee can edit ONLY their own deals AND if the sales stage is editable
    if (currentUser.role === 'employee' && currentUser.name === deal.dealOwner) {
      return EMPLOYEE_EDITABLE_STAGES.has(deal.salesStage);
    }

    return false; // No permission otherwise
  };

  // Permission check for delete action (only admin can delete)
  const canDeleteDeal = () => {
    return currentUser?.isLoggedIn && currentUser?.role === 'admin';
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
        <div className="text-gray-600 text-lg">Loading authentication state...</div>
      </div>
    );
  }

  // Moved loading check to render block for better UX with initial state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
        <div className="text-gray-600 text-lg">Loading Deals...</div>
      </div>
    );
  }

  const renderDealsTableRows = () => {
    if (deals.length === 0 && !loading) {
      return (
        <tr>
          <td colSpan="9" className="text-center py-12"> {/* Updated colspan for 9 columns */}
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
          {/* Navigate to Dealemployeeview */}
          <span
            onClick={() => navigate(`/employee-dashboard/deals/${deal._id}`)}
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
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.startDate || 'N/A'}</td> {/* Display Start Date */}
        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{deal.closeDate || 'N/A'}</td>
        <td className="px-6 py-4 text-sm whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                // Check if employee can edit this specific deal based on sales stage and ownership
                if (!canEmployeeEditDeal(deal)) {
                  alert("You do not have permission to edit this deal at its current stage or you are not the owner.");
                  return;
                }
                setEditingDeal(deal);
                setShowCreateForm(true);
              }}
              // Disabled based on canEmployeeEditDeal function
              disabled={!canEmployeeEditDeal(deal)}
              className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Edit Deal"
            >
              <Edit className="w-10 h-4" /> Update
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
                setEditingDeal(null);
                setShowCreateForm(true);
              }}
              disabled={!currentUser?.isLoggedIn}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
                  onChange={(e) => setRecordsPerPage(Number(e.target.value))}
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
                        <span>Service Engineer</span>
                        <Filter className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span>Start Date</span> {/* Column header changed */}
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
            onDealClick={(dealId) => navigate(`/employee-dashboard/deals/${dealId}`)} // Pass for navigation
            canEmployeeEditDeal={canEmployeeEditDeal} // Pass the permission checker
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
          currentUser={currentUser}
          accountNames={accountNames} // Pass account names to modal
          isSalesStageEditable={editingDeal ? canEmployeeEditDeal(editingDeal) : true} // Pass editability to modal
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

export default Dealemployee;
