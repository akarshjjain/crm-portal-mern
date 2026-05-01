// import React, { useState, useEffect } from 'react';
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

// // Firebase imports
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, collection, query, onSnapshot, addDoc } from 'firebase/firestore';

// const Taskmain = () => {
//   // Define sample tasks to be used as initial data or fallback
//   const initialSampleTasks = [
//     { id: 'task1', taskOwner: 'Amit Seth', subject: 'Meeting', dueDate: '2025-07-25', contact: 'Afflatus Dell Storage Deal', account: '', status: 'Not Started', priority: 'High', reminder: false, repeat: false, description: 'Discuss new software license details.' },
//     { id: 'task2', taskOwner: 'Danish Bindra', subject: 'Schedule meeting for Q3 review', dueDate: '2025-08-05', contact: 'Afflatus Gravures Private Limited', account: '', status: 'In Progress', priority: 'Medium', reminder: true, repeat: false, description: 'Prepare presentation for the review.' },
//     { id: 'task3', taskOwner: 'Tanushree Das', subject: 'Prepare proposal for Robert Johnson', dueDate: '2025-07-20', contact: 'Ordnance Factory Board Kolkata', account: 'Stark Industries', status: 'Completed', priority: 'High', reminder: false, repeat: false, description: 'Finalize pricing and terms.' },
//     { id: 'task4', taskOwner: 'Tanmay Singh', subject: 'Call Emily Brown regarding invoice', dueDate: '2025-07-18', contact: 'Afflatus Dell Storage Deal', account: '', status: 'Deferred', priority: 'Low', reminder: true, repeat: true, description: 'Invoice #12345 overdue.' },
//     { id: 'task5', taskOwner: 'Prabhat Mohant', subject: 'Research AI trends', dueDate: '2025-07-31', contact: 'Afflatus Gravures Private Limited', account: '', status: 'Not Started', priority: 'Medium', reminder: false, repeat: false, description: 'Gather information on latest AI advancements.' }
//   ];

//   const [tasks, setTasks] = useState(initialSampleTasks);
//   const [selectedTasks, setSelectedTasks] = useState([]);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [recordsPerPage, setRecordsPerPage] = useState(100);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [firebaseApp, setFirebaseApp] = useState(null);
//   const [db, setDb] = useState(null);
//   const [auth, setAuth] = useState(null);
//   const [userId, setUserId] = useState(null);

//   // Initialize Firebase and set up auth listener
//   useEffect(() => {
//     try {
//       const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
//       const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
//       const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

//       const app = initializeApp(firebaseConfig);
//       const firestore = getFirestore(app);
//       const authentication = getAuth(app);

//       setFirebaseApp(app);
//       setDb(firestore);
//       setAuth(authentication);

//       const unsubscribe = onAuthStateChanged(authentication, async (user) => {
//         if (user) {
//           setUserId(user.uid);
//           console.log('Firebase authenticated user:', user.uid);
//         } else {
//           try {
//             if (initialAuthToken) {
//               await signInWithCustomToken(authentication, initialAuthToken);
//               console.log('Signed in with custom token.');
//             } else {
//               await signInAnonymously(authentication);
//               console.log('Signed in anonymously.');
//             }
//           } catch (error) {
//             console.error('Firebase authentication failed:', error);
//           }
//         }
//         setLoading(false); // Authentication check is complete
//       });

//       return () => unsubscribe();
//     } catch (error) {
//       console.error('Failed to initialize Firebase:', error);
//       setLoading(false);
//     }
//   }, []);

//   // Fetch tasks from Firestore
//   useEffect(() => {
//     if (db && userId) {
//       const tasksCollectionRef = collection(db, `artifacts/${__app_id}/users/${userId}/tasks`);
//       const q = query(tasksCollectionRef);

//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         const fetchedTasks = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
        
//         if (fetchedTasks.length > 0) {
//           setTasks(fetchedTasks);
//           console.log('Tasks fetched from Firestore:', fetchedTasks);
//         } else {
//           console.log('Firestore is empty for tasks. Displaying sample tasks.');
//           setTasks(initialSampleTasks); // Fallback to sample data
//         }
//       }, (error) => {
//         console.error('Error fetching tasks:', error);
//         setTasks(initialSampleTasks); // Fallback to sample data on error
//       });

//       return () => unsubscribe();
//     }
//   }, [db, userId]);


//   const [formData, setFormData] = useState({
//     taskOwner: 'None',
//     subject: '',
//     dueDate: '',
//     contact: '',
//     account: '',
//     status: 'Not Started',
//     priority: 'High',
//     reminder: false,
//     repeat: false,
//     description: ''
//   });

//   const handleCreateTask = async () => {
//     if (formData.subject && formData.dueDate && db && userId) {
//       try {
//         const newTaskData = {
//           taskOwner: formData.taskOwner === 'None' ? 'Amit Seth' : formData.taskOwner,
//           subject: formData.subject,
//           dueDate: formData.dueDate,
//           contact: formData.contact,
//           account: formData.account,
//           status: formData.status,
//           priority: formData.priority,
//           reminder: formData.reminder,
//           repeat: formData.repeat,
//           description: formData.description,
//           createdAt: new Date().toISOString()
//         };
//         await addDoc(collection(db, `artifacts/${__app_id}/users/${userId}/tasks`), newTaskData);
//         setFormData({
//           taskOwner: 'None',
//           subject: '',
//           dueDate: '',
//           contact: '',
//           account: '',
//           status: 'Not Started',
//           priority: 'High',
//           reminder: false,
//           repeat: false,
//           description: ''
//         });
//         setShowCreateForm(false);
//         console.log('Task created successfully');
//       } catch (error) {
//         console.error('Error creating task:', error);
//       }
//     } else {
//       console.warn('Subject and Due Date are required to create a task.');
//     }
//   };

//   const handleSaveAndNew = async () => {
//     if (formData.subject && formData.dueDate && db && userId) {
//       try {
//         const newTaskData = {
//           taskOwner: formData.taskOwner === 'None' ? 'Amit Seth' : formData.taskOwner,
//           subject: formData.subject,
//           dueDate: formData.dueDate,
//           contact: formData.contact,
//           account: formData.account,
//           status: formData.status,
//           priority: formData.priority,
//           reminder: formData.reminder,
//           repeat: formData.repeat,
//           description: formData.description,
//           createdAt: new Date().toISOString()
//         };
//         await addDoc(collection(db, `artifacts/${__app_id}/users/${userId}/tasks`), newTaskData);
//         setFormData({
//           taskOwner: 'None',
//           subject: '',
//           dueDate: '',
//           contact: '',
//           account: '',
//           status: 'Not Started',
//           priority: 'High',
//           reminder: false,
//           repeat: false,
//           description: ''
//         });
//         // Keep form open for new entry
//         console.log('Task saved and ready for new entry.');
//       } catch (error) {
//         console.error('Error saving and creating new task:', error);
//       }
//     } else {
//       console.warn('Subject and Due Date are required to save and create a new task.');
//     }
//   };

//   const toggleTaskSelection = (taskId) => {
//     setSelectedTasks(prev => 
//       prev.includes(taskId) 
//         ? prev.filter(id => id !== taskId)
//         : [...prev, taskId]
//     );
//   };

//   const selectAllTasks = () => {
//     setSelectedTasks(selectedTasks.length > 0 && selectedTasks.length === tasks.length ? [] : tasks.map(task => task.id));
//   };

//   const CreateTaskModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg w-full max-w-3xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6 border-b pb-4">
//             <h2 className="text-2xl font-bold text-gray-900">Create Task</h2>
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
//                 onClick={handleCreateTask}
//                 className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
//               >
//                 Save
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Task Information Section */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-gray-900">Task Information</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="taskOwner" className="block text-sm font-medium text-gray-700 mb-1">Task Owner</label>
//                   <div className="relative">
//                     <select 
//                       id="taskOwner"
//                       value={formData.taskOwner}
//                       onChange={(e) => setFormData({...formData, taskOwner: e.target.value})}
//                       className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                     >
//                       <option value="None">-None-</option>
//                       <option value="Amit Seth">Amit Seth</option>
//                       <option value="Danish Bindra">Danish Bindra</option>
//                       {/* <option value="Tanushree Das">Tanushree Das</option>
//                       <option value="Tanmay Singh">Tanmay Singh</option>
//                       <option value="Prabhat Mohant">Prabhat Mohant</option> */}
//                     </select>
//                     <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                       <ChevronDown className="w-5 h-5 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject <span className="text-red-500">*</span></label>
//                   <input
//                     id="subject"
//                     type="text"
//                     value={formData.subject}
//                     onChange={(e) => setFormData({...formData, subject: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Subject"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date <span className="text-red-500">*</span></label>
//                   <input
//                     id="dueDate"
//                     type="date"
//                     value={formData.dueDate}
//                     onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
//                   <input
//                     id="contact"
//                     type="text"
//                     value={formData.contact}
//                     onChange={(e) => setFormData({...formData, contact: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Related Contact"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="account" className="block text-sm font-medium text-gray-700 mb-1">Account</label>
//                   <input
//                     id="account"
//                     type="text"
//                     value={formData.account}
//                     onChange={(e) => setFormData({...formData, account: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Related Account"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Other Information Section */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-gray-900">Other Information</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                   <div className="relative">
//                     <select 
//                       id="status"
//                       value={formData.status}
//                       onChange={(e) => setFormData({...formData, status: e.target.value})}
//                       className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                     >
//                       <option value="Not Started">Not Started</option>
//                       <option value="In Progress">In Progress</option>
//                       <option value="Completed">Completed</option>
//                       <option value="Deferred">Deferred</option>
//                       <option value="Waiting on Someone Else">Waiting on Someone Else</option>
//                     </select>
//                     <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                       <ChevronDown className="w-5 h-5 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
//                   <div className="relative">
//                     <select 
//                       id="priority"
//                       value={formData.priority}
//                       onChange={(e) => setFormData({...formData, priority: e.target.value})}
//                       className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                     >
//                       <option value="High">High</option>
//                       <option value="Medium">Medium</option>
//                       <option value="Low">Low</option>
//                     </select>
//                     <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                       <ChevronDown className="w-5 h-5 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <label htmlFor="reminder" className="block text-sm font-medium text-gray-700">Reminder</label>
//                   <input
//                     id="reminder"
//                     type="checkbox"
//                     checked={formData.reminder}
//                     onChange={(e) => setFormData({...formData, reminder: e.target.checked})}
//                     className="form-checkbox h-5 w-5 text-indigo-600 rounded"
//                   />
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <label htmlFor="repeat" className="block text-sm font-medium text-gray-700">Repeat</label>
//                   <input
//                     id="repeat"
//                     type="checkbox"
//                     checked={formData.repeat}
//                     onChange={(e) => setFormData({...formData, repeat: e.target.checked})}
//                     className="form-checkbox h-5 w-5 text-indigo-600 rounded"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                   <textarea
//                     id="description"
//                     value={formData.description}
//                     onChange={(e) => setFormData({...formData, description: e.target.value})}
//                     rows={3}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter task description..."
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
//           <h3 className="font-semibold text-gray-900">Filter Tasks by</h3>
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

//   const totalPages = Math.ceil(tasks.length / recordsPerPage);
//   const startRecord = (currentPage - 1) * recordsPerPage + 1;
//   const endRecord = Math.min(currentPage * recordsPerPage, tasks.length);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
//         <div className="text-gray-600 text-lg">Loading Tasks...</div>
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
//                 All Tasks
//                 <ChevronDown className="w-4 h-4 ml-2" />
//               </button>
//               {showFilters && <FilterPanel />}
//             </div>
//             {userId && ( // Only show userId if authenticated
//               <div className="text-gray-700 text-sm">User ID: <span className="font-medium">{userId}</span></div>
//             )}
//           </div>
          
//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => setShowCreateForm(true)}
//               className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Create Task
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
//             <span className="text-sm font-medium">Total Records {tasks.length}</span>
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
//                       checked={selectedTasks.length > 0 && selectedTasks.length === tasks.length}
//                       onChange={selectAllTasks}
//                       className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                     />
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Subject</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Due Date</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Status</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Priority</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Related To</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Task Owner</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {tasks.length > 0 ? (
//                   tasks.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((task) => (
//                     <tr key={task.id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 w-12">
//                         <input
//                           type="checkbox"
//                           checked={selectedTasks.includes(task.id)}
//                           onChange={() => toggleTaskSelection(task.id)}
//                           className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                         />
//                       </td>
//                       <td className="px-6 py-4 text-sm whitespace-nowrap">
//                         <span className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium">
//                           {task.subject}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{task.dueDate || 'N/A'}</td>
//                       <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{task.status || 'N/A'}</td>
//                       <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{task.priority || 'N/A'}</td>
//                       <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
//                         {task.contact && task.account ? `${task.contact} (${task.account})` : task.contact || task.account || 'N/A'}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{task.taskOwner || 'N/A'}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="text-center py-12">
//                       <div className="text-gray-500">
//                         <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                         <p className="text-lg font-medium">No tasks found</p>
//                         <p className="text-sm">Create your first task to get started</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Create Task Modal */}
//       {showCreateForm && <CreateTaskModal />}
//     </div>
//   );
// };

// export default Taskmain;

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

// // Define sample tasks to be used as initial data or fallback
// // IMPORTANT: Changed 'id' to '_id' to match MongoDB documents
// const initialSampleTasks = [
//   { _id: 'task1', taskOwner: 'Amit Seth', subject: 'Meeting', dueDate: '2025-07-25', contact: ' ', account: '', status: 'Not Started', priority: 'High', reminder: false, repeat: false, description: 'Discuss new software license details.' },
//   { _id: 'task2', taskOwner: 'Danish Bindra', subject: 'Schedule meeting for Q3 review', dueDate: '2025-08-05', contact: 'Afflatus Gravures Private Limited', account: '', status: 'In Progress', priority: 'Medium', reminder: true, repeat: false, description: 'Prepare presentation for the review.' },
//   { _id: 'task3', taskOwner: 'Tanushree Das', subject: 'Prepare proposal for Robert Johnson', dueDate: '2025-07-20', contact: 'Ordnance Factory Board Kolkata', account: 'Stark Industries', status: 'Completed', priority: 'High', reminder: false, repeat: false, description: 'Finalize pricing and terms.' },
//   { _id: 'task4', taskOwner: 'Tanmay Singh', subject: 'Call Emily Brown regarding invoice', dueDate: '2025-07-18', contact: 'Afflatus Dell Storage Deal', account: '', status: 'Deferred', priority: 'Low', reminder: true, repeat: true, description: 'Invoice #12345 overdue.' },
//   { _id: 'task5', taskOwner: 'Prabhat Mohant', subject: 'Research AI trends', dueDate: '2025-07-31', contact: 'Afflatus Gravures Private Limited', account: '', status: 'Not Started', priority: 'Medium', reminder: false, repeat: false, description: 'Gather information on latest AI advancements.' }
// ];

// // --- CreateTaskModal Component (Moved outside Taskmain) ---
// const CreateTaskModal = ({
//   formData,
//   handleFormChange,
//   handleCloseModal,
//   handleSaveAndNew,
//   handleCreateTask,
//   handleUpdateTask,
//   editingTask // Determines if we are editing or creating
// }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-lg w-full max-w-3xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-6 border-b pb-4">
//           <h2 className="text-2xl font-bold text-gray-900">{editingTask ? 'Edit Task' : 'Create Task'}</h2>
//           <div className="flex space-x-3">
//             <button
//               onClick={handleCloseModal}
//               className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
//             >
//               Cancel
//             </button>
//             {/* Only show "Save and new" for create mode */}
//             {!editingTask && (
//               <button
//                 onClick={handleSaveAndNew}
//                 className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm text-sm font-medium"
//               >
//                 Save and new
//               </button>
//             )}
//             <button
//               onClick={editingTask ? handleUpdateTask : handleCreateTask}
//               className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
//             >
//               {editingTask ? 'Update' : 'Save'}
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Task Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-gray-900">Task Information</h3>
//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="taskOwner" className="block text-sm font-medium text-gray-700 mb-1">Task Owner</label>
//                 <div className="relative">
//                   <select
//                     id="taskOwner"
//                     value={formData.taskOwner}
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

//               <div>
//                 <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject <span className="text-red-500">*</span></label>
//                 <input
//                   id="subject"
//                   type="text"
//                   value={formData.subject}
//                   onChange={handleFormChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Enter Subject"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date <span className="text-red-500">*</span></label>
//                 <input
//                   id="dueDate"
//                   type="date"
//                   value={formData.dueDate}
//                   onChange={handleFormChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
//                 <input
//                   id="contact"
//                   type="text"
//                   value={formData.contact}
//                   onChange={handleFormChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Related Contact"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="account" className="block text-sm font-medium text-gray-700 mb-1">Account</label>
//                 <input
//                   id="account"
//                   type="text"
//                   value={formData.account}
//                   onChange={handleFormChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Related Account"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Other Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-gray-900">Other Information</h3>
//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                 <div className="relative">
//                   <select
//                     id="status"
//                     value={formData.status}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                   >
//                     <option value="Not Started">Not Started</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                     <option value="Deferred">Deferred</option>
//                     <option value="Waiting on Someone Else">Waiting on Someone Else</option>
//                   </select>
//                   <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                     <ChevronDown className="w-5 h-5 text-gray-400" />
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
//                 <div className="relative">
//                   <select
//                     id="priority"
//                     value={formData.priority}
//                     onChange={handleFormChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
//                   >
//                     <option value="High">High</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Low">Low</option>
//                   </select>
//                   <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                     <ChevronDown className="w-5 h-5 text-gray-400" />
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between">
//                 <label htmlFor="reminder" className="block text-sm font-medium text-gray-700">Reminder</label>
//                 <input
//                   id="reminder"
//                   type="checkbox"
//                   checked={formData.reminder}
//                   onChange={handleFormChange}
//                   className="form-checkbox h-5 w-5 text-indigo-600 rounded"
//                 />
//               </div>
//               <div className="flex items-center justify-between">
//                 <label htmlFor="repeat" className="block text-sm font-medium text-gray-700">Repeat</label>
//                 <input
//                   id="repeat"
//                   type="checkbox"
//                   checked={formData.repeat}
//                   onChange={handleFormChange}
//                   className="form-checkbox h-5 w-5 text-indigo-600 rounded"
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
//                   placeholder="Enter task description..."
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // --- FilterPanel Component (Moved outside Taskmain) ---
// const FilterPanel = ({ setShowFilters }) => (
//   <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 font-sans">
//     <div className="p-4">
//       <div className="flex items-center justify-between mb-3">
//         <h3 className="font-semibold text-gray-900">Filter Tasks by</h3>
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


// // --- Main Taskmain Component ---
// const Taskmain = () => {
//   const [tasks, setTasks] = useState([]); // Will be populated from API
//   const [selectedTasks, setSelectedTasks] = useState([]);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [recordsPerPage, setRecordsPerPage] = useState(100);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [editingTask, setEditingTask] = useState(null); // State for editing existing tasks

//   // Base URL for your backend API (ensure this matches your server's port)
//   const API_BASE_URL = 'http://localhost:3000/api';

//   // --- Fetch Tasks from Backend API ---
//   const fetchTasks = useCallback(async () => {
//     try {
//       setLoading(true);
//       console.log('Attempting to fetch tasks from:', `${API_BASE_URL}/task`);
//       const response = await fetch(`${API_BASE_URL}/task`);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         // Fallback to initial sample data on API error
//         setTasks(initialSampleTasks);
//         throw new Error(`Failed to fetch tasks: ${response.statusText}`);
//       }

//       const data = await response.json();
//       setTasks(data);
//       console.log('Tasks fetched successfully:', data);
//     } catch (error) {
//       console.error('Error fetching tasks from backend:', error);
//       setTasks(initialSampleTasks); // Ensure fallback to sample data on fetch error
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Fetch tasks on component mount
//   useEffect(() => {
//     fetchTasks();
//   }, [fetchTasks]);


//   // --- Form Data State for Create/Edit ---
//   const [formData, setFormData] = useState({
//     taskOwner: 'None',
//     subject: '',
//     dueDate: '',
//     contact: '',
//     account: '',
//     status: 'Not Started',
//     priority: 'High',
//     reminder: false,
//     repeat: false,
//     description: ''
//   });

//   // Effect to populate form data when editingTask changes (for edit mode)
//   useEffect(() => {
//     if (editingTask) {
//       setFormData({
//         taskOwner: editingTask.taskOwner || 'None',
//         subject: editingTask.subject || '',
//         dueDate: editingTask.dueDate ? editingTask.dueDate.split('T')[0] : '', // Format date for input type="date"
//         contact: editingTask.contact || '',
//         account: editingTask.account || '',
//         status: editingTask.status || 'Not Started',
//         priority: editingTask.priority || 'High',
//         reminder: editingTask.reminder || false,
//         repeat: editingTask.repeat || false,
//         description: editingTask.description || ''
//       });
//     } else {
//       // Reset form data for a new task (when opening Create form)
//       setFormData({
//         taskOwner: 'None',
//         subject: '',
//         dueDate: '',
//         contact: '',
//         account: '',
//         status: 'Not Started',
//         priority: 'High',
//         reminder: false,
//         repeat: false,
//         description: ''
//       });
//     }
//   }, [editingTask]);


//   // --- Form Change Handler ---
//   const handleFormChange = (e) => {
//     const { id, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [id]: type === 'checkbox' ? checked : value
//     }));
//   };

//   // --- Modal Close Handler ---
//   const handleCloseModal = () => {
//     setShowCreateForm(false);
//     setEditingTask(null); // Clear editing task when modal closes
//   };

//   // --- Create Task Handler ---
//   const handleCreateTask = async () => {
//     // Basic frontend validation before sending to backend
//     if (!formData.subject || !formData.dueDate) {
//       console.warn('Subject and Due Date are required to create a task.');
//       return;
//     }

//     try {
//       console.log('Attempting to create task with data:', formData);
//       const response = await fetch(`${API_BASE_URL}/task`, {
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

//       // If response is OK, parse it as JSON
//       const createdTask = JSON.parse(responseText);
//       console.log('Task created successfully on backend:', createdTask);
//       await fetchTasks(); // Re-fetch all tasks to update the table
//       handleCloseModal(); // Close the modal and reset form
//     } catch (error) {
//       console.error('Error creating task:', error);
//       // You might want to display a user-friendly alert here
//       // alert(`Failed to create task: ${error.message}`);
//     }
//   };

//   // --- Save and New Task Handler ---
//   const handleSaveAndNew = async () => {
//     if (!formData.subject || !formData.dueDate) {
//       console.warn('Subject and Due Date are required to save and create a new task.');
//       return;
//     }

//     try {
//       console.log('Attempting to save and create new task with data:', formData);
//       const response = await fetch(`${API_BASE_URL}/task`, {
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

//       const createdTask = JSON.parse(responseText);
//       console.log('Task saved and ready for new entry:', createdTask);
//       await fetchTasks(); // Re-fetch all tasks to update the table
//       // Reset form but keep modal open
//       setFormData({
//         taskOwner: 'None',
//         subject: '',
//         dueDate: '',
//         contact: '',
//         account: '',
//         status: 'Not Started',
//         priority: 'High',
//         reminder: false,
//         repeat: false,
//         description: ''
//       });
//       setEditingTask(null); // Ensure not in edit mode for the new entry
//     } catch (error) {
//       console.error('Error saving and creating new task:', error);
//       // alert(`Failed to save and create new task: ${error.message}`);
//     }
//   };

//   // --- Update Task Handler ---
//   const handleUpdateTask = async () => {
//     if (!editingTask || !formData.subject || !formData.dueDate) {
//       console.warn('Subject, Due Date, and a task to edit are required for update.');
//       return;
//     }

//     try {
//       console.log(`Sending update data for task ${editingTask._id}:`, formData);
//       const response = await fetch(`${API_BASE_URL}/task/${editingTask._id}`, {
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

//       const updatedTask = JSON.parse(responseText);
//       console.log('Task updated successfully on backend:', updatedTask);
//       await fetchTasks(); // Re-fetch all tasks to update the table
//       handleCloseModal(); // Close the modal and reset form
//     } catch (error) {
//       console.error('Error updating task:', error);
//       // alert(`Failed to update task: ${error.message}`);
//     }
//   };

//   // --- Delete Task Handler ---
//   const handleDeleteTask = async (taskId) => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       try {
//         console.log('Attempting to delete task with ID:', taskId);
//         const response = await fetch(`${API_BASE_URL}/task/${taskId}`, {
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

//         console.log('Task deleted successfully on backend:', taskId);
//         await fetchTasks(); // Re-fetch tasks to update the table
//       } catch (error) {
//         console.error('Error deleting task:', error);
//         // alert(`Failed to delete task: ${error.message}`);
//       }
//     }
//   };

//   const toggleTaskSelection = (taskId) => {
//     setSelectedTasks(prev =>
//       prev.includes(taskId)
//         ? prev.filter(id => id !== taskId)
//         : [...prev, taskId]
//     );
//   };

//   const selectAllTasks = () => {
//     setSelectedTasks(selectedTasks.length > 0 && selectedTasks.length === tasks.length ? [] : tasks.map(task => task._id));
//   };

//   const totalPages = Math.ceil(tasks.length / recordsPerPage);
//   const startRecord = (currentPage - 1) * recordsPerPage + 1;
//   const endRecord = Math.min(currentPage * recordsPerPage, tasks.length);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
//         <div className="text-gray-600 text-lg">Loading Tasks...</div>
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
//                 All Tasks
//                 <ChevronDown className="w-4 h-4 ml-2" />
//               </button>
//               {showFilters && <FilterPanel setShowFilters={setShowFilters} />}
//             </div>
//           </div>

//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => {
//                 setEditingTask(null); // Ensure no task is being edited when clicking Create
//                 setShowCreateForm(true);
//               }}
//               className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Create Task
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
//             <span className="text-sm font-medium">Total Records {tasks.length}</span>
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
//                       checked={selectedTasks.length > 0 && selectedTasks.length === tasks.length}
//                       onChange={selectAllTasks}
//                       className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                     />
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Subject</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Due Date</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Status</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Priority</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Related To</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span>Task Owner</span>
//                       <Filter className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th> {/* Added Actions column */}
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {tasks.length > 0 ? (
//                   tasks.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((task) => (
//                     // Use task._id for key as it comes from MongoDB
//                     <tr key={task._id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 w-12">
//                         <input
//                           type="checkbox"
//                           checked={selectedTasks.includes(task._id)}
//                           onChange={() => toggleTaskSelection(task._id)}
//                           className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                         />
//                       </td>
//                       <td className="px-6 py-4 text-sm whitespace-nowrap">
//                         <span className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium">
//                           {task.subject}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{task.dueDate || 'N/A'}</td>
//                       <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{task.status || 'N/A'}</td>
//                       <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{task.priority || 'N/A'}</td>
//                       <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
//                         {task.contact && task.account ? `${task.contact} (${task.account})` : task.contact || task.account || 'N/A'}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{task.taskOwner || 'N/A'}</td>
//                       <td className="px-6 py-4 text-sm whitespace-nowrap">
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => {
//                               setEditingTask(task); // Set the task to be edited
//                               setShowCreateForm(true); // Open the modal
//                             }}
//                             className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
//                             title="Edit Task"
//                           >
//                             <Edit className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteTask(task._id)}
//                             className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
//                             title="Delete Task"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="8" className="text-center py-12"> {/* Updated colspan for 8 columns */}
//                       <div className="text-gray-500">
//                         <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                         <p className="text-lg font-medium">No tasks found</p>
//                         <p className="text-sm">Create your first task to get started</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Create/Edit Task Modal */}
//       {showCreateForm && (
//         <CreateTaskModal
//           formData={formData}
//           handleFormChange={handleFormChange}
//           handleCloseModal={handleCloseModal}
//           handleSaveAndNew={handleSaveAndNew}
//           handleCreateTask={handleCreateTask}
//           handleUpdateTask={handleUpdateTask}
//           editingTask={editingTask}
//         />
//       )}
//     </div>
//   );
// };


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
  Edit, // For edit icon
  Trash2 // For delete icon
} from 'lucide-react';

// Define sample tasks to be used as initial data or fallback
const initialSampleTasks = [
  { _id: 'task1', taskOwner: 'Amit Seth', subject: 'Meeting', dueDate: '2025-07-25', contact: ' ', account: '', status: 'Not Started', priority: 'High', reminder: false, repeat: false, description: 'Discuss new software license details.' },
  { _id: 'task2', taskOwner: 'Danish Bindra', subject: 'Schedule meeting for Q3 review', dueDate: '2025-08-05', contact: 'Afflatus Gravures Private Limited', account: '', status: 'In Progress', priority: 'Medium', reminder: true, repeat: false, description: 'Prepare presentation for the review.' },
  { _id: 'task3', taskOwner: 'Tanushree Das', subject: 'Prepare proposal for Robert Johnson', dueDate: '2025-07-20', contact: 'Ordnance Factory Board Kolkata', account: 'Stark Industries', status: 'Completed', priority: 'High', reminder: false, repeat: false, description: 'Finalize pricing and terms.' },
  { _id: 'task4', taskOwner: 'Tanmay Singh', subject: 'Call Emily Brown regarding invoice', dueDate: '2025-07-18', contact: 'Afflatus Dell Storage Deal', account: '', status: 'Deferred', priority: 'Low', reminder: true, repeat: true, description: 'Invoice #12345 overdue.' },
  { _id: 'task5', taskOwner: 'Prabhat Mohant', subject: 'Research AI trends', dueDate: '2025-07-31', contact: 'Afflatus Gravures Private Limited', account: '', status: 'Not Started', priority: 'Medium', reminder: false, repeat: false, description: 'Gather information on latest AI advancements.' }
];

// --- CreateTaskModal Component (Moved outside Taskmain) ---
const CreateTaskModal = ({
  formData,
  handleFormChange,
  handleCloseModal,
  handleSaveAndNew,
  handleCreateTask,
  handleUpdateTask,
  editingTask // Determines if we are editing or creating
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg w-full max-w-3xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-900">{editingTask ? 'Edit Task' : 'Create Task'}</h2>
          <div className="flex space-x-3">
            <button
              onClick={handleCloseModal}
              className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
            >
              Cancel
            </button>
            {/* Only show "Save and new" for create mode */}
            {!editingTask && (
              <button
                onClick={handleSaveAndNew}
                className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm text-sm font-medium"
              >
                Save and new
              </button>
            )}
            <button
              onClick={editingTask ? handleUpdateTask : handleCreateTask}
              className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
            >
              {editingTask ? 'Update' : 'Save'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Task Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Task Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="taskOwner" className="block text-sm font-medium text-gray-700 mb-1">Task Owner</label>
                <div className="relative">
                  <select
                    id="taskOwner"
                    value={formData.taskOwner}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
                  >
                    <option value="None">-None-</option>
                    <option value="Amit Seth">Amit Seth</option>
                    <option value="Danish Bindra">Danish Bindra</option>
                    <option value="Aveek Nayak">Aveek Nayan</option>
                    <option value="Tanmay Singh">Tanmay Singh</option>
                    <option value="Prabhat Mohant">Prabhat Mohant</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject <span className="text-red-500">*</span></label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter Subject"
                  required
                />
              </div>
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date <span className="text-red-500">*</span></label>
                <input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                <input
                  id="contact"
                  type="text"
                  value={formData.contact}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Related Contact"
                />
              </div>
              <div>
                <label htmlFor="account" className="block text-sm font-medium text-gray-700 mb-1">Account</label>
                <input
                  id="account"
                  type="text"
                  value={formData.account}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Related Account"
                />
              </div>
            </div>
          </div>

          {/* Other Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Other Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="relative">
                  <select
                    id="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Deferred">Deferred</option>
                    <option value="Waiting on Someone Else">Waiting on Someone Else</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <div className="relative">
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="reminder" className="block text-sm font-medium text-gray-700">Reminder</label>
                <input
                  id="reminder"
                  type="checkbox"
                  checked={formData.reminder}
                  onChange={handleFormChange}
                  className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="repeat" className="block text-sm font-medium text-gray-700">Repeat</label>
                <input
                  id="repeat"
                  type="checkbox"
                  checked={formData.repeat}
                  onChange={handleFormChange}
                  className="form-checkbox h-5 w-5 text-indigo-600 rounded"
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
                  placeholder="Enter task description..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- FilterPanel Component (Moved outside Taskmain) ---
const FilterPanel = ({ setShowFilters }) => (
  <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 font-sans">
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Filter Tasks by</h3>
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


// --- Main Taskmain Component ---
const Taskmain = () => {
  const [tasks, setTasks] = useState([]); // Will be populated from API
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null); // State for editing existing tasks

  const navigate = useNavigate(); // Initialize useNavigate

  // Base URL for your backend API (Set to 3000 as per your backend confirmation)
  const API_BASE_URL = 'http://localhost:3000/api'; 

  // --- Fetch Tasks from Backend API ---
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Attempting to fetch tasks from:', `${API_BASE_URL}/task`);
      const response = await fetch(`${API_BASE_URL}/task`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        // Fallback to initial sample data on API error
        setTasks(initialSampleTasks);
        throw new Error(`Failed to fetch tasks: ${response.statusText}`);
      }

      const data = await response.json();
      setTasks(data);
      console.log('Tasks fetched successfully:', data);
    } catch (error) {
      console.error('Error fetching tasks from backend:', error);
      setTasks(initialSampleTasks); // Ensure fallback to sample data on fetch error
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);


  // --- Form Data State for Create/Edit ---
  const [formData, setFormData] = useState({
    taskOwner: 'None',
    subject: '',
    dueDate: '',
    contact: '',
    account: '',
    status: 'Not Started',
    priority: 'High',
    reminder: false,
    repeat: false,
    description: ''
  });

  // Effect to populate form data when editingTask changes (for edit mode)
  useEffect(() => {
    if (editingTask) {
      setFormData({
        taskOwner: editingTask.taskOwner || 'None',
        subject: editingTask.subject || '',
        dueDate: editingTask.dueDate ? editingTask.dueDate.split('T')[0] : '', // Format date for input type="date"
        contact: editingTask.contact || '',
        account: editingTask.account || '',
        status: editingTask.status || 'Not Started',
        priority: editingTask.priority || 'High',
        reminder: editingTask.reminder || false,
        repeat: editingTask.repeat || false,
        description: editingTask.description || ''
      });
    } else {
      // Reset form data for a new task (when opening Create form)
      setFormData({
        taskOwner: 'None',
        subject: '',
        dueDate: '',
        contact: '',
        account: '',
        status: 'Not Started',
        priority: 'High',
        reminder: false,
        repeat: false,
        description: ''
      });
    }
  }, [editingTask]);


  // --- Form Change Handler ---
  const handleFormChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  // --- Modal Close Handler ---
  const handleCloseModal = () => {
    setShowCreateForm(false);
    setEditingTask(null); // Clear editing task when modal closes
  };

  // --- Create Task Handler ---
  const handleCreateTask = async () => {
    // Basic frontend validation before sending to backend
    if (!formData.subject || !formData.dueDate) {
      console.warn('Subject and Due Date are required to create a task.');
      return;
    }

    try {
      console.log('Attempting to create task with data:', formData);
      const response = await fetch(`${API_BASE_URL}/task`, {
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

      // If response is OK, parse it as JSON
      const createdTask = JSON.parse(responseText);
      console.log('Task created successfully on backend:', createdTask);
      await fetchTasks(); // Re-fetch all tasks to update the table
      handleCloseModal(); // Close the modal and reset form
    } catch (error) {
      console.error('Error creating task:', error);
      // You might want to display a user-friendly alert here
      // alert(`Failed to create task: ${error.message}`);
    }
  };

  // --- Save and New Task Handler ---
  const handleSaveAndNew = async () => {
    if (!formData.subject || !formData.dueDate) {
      console.warn('Subject and Due Date are required to save and create a new task.');
      return;
    }

    try {
      console.log('Attempting to save and create new task with data:', formData);
      const response = await fetch(`${API_BASE_URL}/task`, {
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

      const createdTask = JSON.parse(responseText);
      console.log('Task saved and ready for new entry:', createdTask);
      await fetchTasks(); // Re-fetch all tasks to update the table
      // Reset form but keep modal open
      setFormData({
        taskOwner: 'None',
        subject: '',
        dueDate: '',
        contact: '',
        account: '',
        status: 'Not Started',
        priority: 'High',
        reminder: false,
        repeat: false,
        description: ''
      });
      setEditingTask(null); // Ensure not in edit mode for the new entry
    } catch (error) {
      console.error('Error saving and creating new task:', error);
      // alert(`Failed to save and create new task: ${error.message}`);
    }
  };

  // --- Update Task Handler ---
  const handleUpdateTask = async () => {
    if (!editingTask || !formData.subject || !formData.dueDate) {
      console.warn('Subject, Due Date, and a task to edit are required for update.');
      return;
    }

    try {
      console.log(`Sending update data for task ${editingTask._id}:`, formData);
      const response = await fetch(`${API_BASE_URL}/task/${editingTask._id}`, {
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

      const updatedTask = JSON.parse(responseText);
      console.log('Task updated successfully on backend:', updatedTask);
      await fetchTasks(); // Re-fetch all tasks to update the table
      handleCloseModal(); // Close the modal and reset form
    } catch (error) {
      console.error('Error updating task:', error);
      // alert(`Failed to update task: ${error.message}`);
    }
  };

  // --- Delete Task Handler ---
  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        console.log('Attempting to delete task with ID:', taskId);
        const response = await fetch(`${API_BASE_URL}/task/${taskId}`, {
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

        console.log('Task deleted successfully on backend:', taskId);
        await fetchTasks(); // Re-fetch tasks to update the table
      } catch (error) {
        console.error('Error deleting task:', error);
        // alert(`Failed to delete task: ${error.message}`);
      }
    }
  };

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const selectAllTasks = () => {
    setSelectedTasks(selectedTasks.length > 0 && selectedTasks.length === tasks.length ? [] : tasks.map(task => task._id));
  };

  const totalPages = Math.ceil(tasks.length / recordsPerPage);
  const startRecord = (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, tasks.length);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
        <div className="text-gray-600 text-lg">Loading Tasks...</div>
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
                All Tasks
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              {showFilters && <FilterPanel setShowFilters={setShowFilters} />}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setEditingTask(null); // Ensure no task is being edited when clicking Create
                setShowCreateForm(true);
              }}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Task
            </button>
            {/* <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium">
              Actions
              <ChevronDown className="w-4 h-4 ml-2" />
            </button> */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Table Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-indigo-700 text-white rounded-t-lg">
            <span className="text-sm font-medium">Total Records {tasks.length}</span>
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
                      checked={selectedTasks.length > 0 && selectedTasks.length === tasks.length}
                      onChange={selectAllTasks}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>Subject</span>
                      <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>Due Date</span>
                      <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>Status</span>
                      <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>Priority</span>
                      <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>Related To</span>
                      <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>Task Owner</span>
                      <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th> {/* Added Actions column */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.length > 0 ? (
                  tasks.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((task) => (
                    // Use task._id for key as it comes from MongoDB
                    <tr key={task._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 w-12">
                        <input
                          type="checkbox"
                          checked={selectedTasks.includes(task._id)}
                          onChange={() => toggleTaskSelection(task._id)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {/* Make the subject clickable */}
                        <span
                          onClick={() => navigate(`/admin-dashboard/tasks/${task._id}`)}
                          className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
                        >
                          {task.subject}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{task.dueDate || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{task.status || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{task.priority || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {task.contact && task.account ? `${task.contact} (${task.account})` : task.contact || task.account || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{task.taskOwner || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setEditingTask(task); // Set the task to be edited
                              setShowCreateForm(true); // Open the modal
                            }}
                            className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                            title="Edit Task"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task._id)}
                            className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
                            title="Delete Task"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-12"> {/* Updated colspan for 8 columns */}
                      <div className="text-gray-500">
                        <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">No tasks found</p>
                        <p className="text-sm">Create your first task to get started</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create/Edit Task Modal */}
      {showCreateForm && (
        <CreateTaskModal
          formData={formData}
          handleFormChange={handleFormChange}
          handleCloseModal={handleCloseModal}
          handleSaveAndNew={handleSaveAndNew}
          handleCreateTask={handleCreateTask}
          handleUpdateTask={handleUpdateTask}
          editingTask={editingTask}
        />
      )}
    </div>
  );
};

export default Taskmain;

