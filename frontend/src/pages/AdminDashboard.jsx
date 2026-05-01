
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Outlet, useLocation } from 'react-router-dom';




// import {
//   Home, Users, Phone, DollarSign, Calendar, BarChart3, FolderOpen,
//   Building2, FileText, Shield, BookOpen, UserCheck, Gift, Clock, Award,
//   Calculator, ChevronRight, ChevronDown, Search, Settings, User, Grid3X3
// } from 'lucide-react';
// import {
//   PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
// } from 'recharts';

// const AdminDashboard = () => {
//   const [isDigitalAssetsExpanded, setIsDigitalAssetsExpanded] = useState(false);
//   const [selectedMenuItem, setSelectedMenuItem] = useState('AdminDashboard');
//   const navigate = useNavigate();
//    const location = useLocation(); 


//   const menuItems = [
//     { icon: Home, label: 'Dashboard', hasSubmenu: false },
//     { icon: Building2, label: 'About Team1 Consulting', hasSubmenu: false },
//     { icon: Users, label: 'Organizational Structure', hasSubmenu: false },
//     { icon: FileText, label: 'Digital Assets', hasSubmenu: true, expanded: isDigitalAssetsExpanded },
//     { icon: Shield, label: 'Company Certifications', hasSubmenu: false },
//     { icon: FileText, label: 'SOPs', hasSubmenu: false },
//     { icon: BookOpen, label: 'E-Library', hasSubmenu: false },
//   ];

//   const employeeMenuItems = [
//     { icon: Gift, label: 'Holidays', hasSubmenu: false },
//     { icon: FileText, label: 'Policies', hasSubmenu: false },
//     { icon: DollarSign, label: 'Compensation', hasSubmenu: false },
//     { icon: Award, label: 'Recognition', hasSubmenu: false },
//     { icon: Clock, label: 'TimeSheet', hasSubmenu: false },
//     { icon: Shield, label: 'Insurance', hasSubmenu: false },
//     { icon: UserCheck, label: 'Team1Enrich', hasSubmenu: false },
//   ];

//  const navItems = [
//   'Home', 'Leads', 'Contacts', 'Accounts', 'Deals', 'Tasks', 'Meetings', 'Calls', 'Reports', 'Projects'
// ];

// const navRoutes = {
//   Home: '/admin-dashboard',
//   Leads: '/admin-dashboard/leads',
//   Contacts: '/admin-dashboard/contacts',
//   Accounts: '/admin-dashboard/employees',
//   Deals: '/admin-dashboard/deals',
//   Tasks: '/admin-dashboard/tasks',
//   Meetings: '/admin-dashboard/meetings',
//   Calls: '/admin-dashboard/calls',
//   Reports: '/admin-dashboard/reports',
//   Projects: '/admin-dashboard/projects',
// };


//   const metricCards = [
//     {
//       title: 'Deals Created This Month',
//       value: '137',
//       change: '100%',
//       changeType: 'positive',
//       lastMonth: 'Last Month: 30',
//       icon: '📈'
//     },
//     {
//       title: 'Revenue This Month',
//       value: '12,00,00,000.00',
//       change: '100%',
//       changeType: 'positive',
//       lastMonth: 'Last Month: ₹6,00,00,000.00',
//       icon: '💰'
//     },
//     {
//       title: 'Deals Closing This Month',
//       value: '96',
//       change: '',
//       changeType: 'neutral',
//       lastMonth: '',
//       icon: '🤝'
//     },
//     {
//       title: 'Overdue Tasks',
//       value: '13',
//       change: '',
//       changeType: 'neutral',
//       lastMonth: '',
//       icon: '📋'
//     }
//   ];

//   const pieData = [
//     { name: 'Leads', value: 400 },
//     { name: 'Deals', value: 300 },
//     { name: 'Contacts', value: 300 },
//     { name: 'Tasks', value: 200 },
//     { name: 'Accounts', value: 100 },
//   ];
//   const COLORS = ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE'];

//   const barData = [
//     { name: 'Leads', value: 240 },
//     { name: 'Accounts', value: 130 },
//     { name: 'Deals', value: 200 },
//     { name: 'Tasks', value: 100 },
//     { name: 'Contacts', value: 180 },
//   ];


  
//   return (
//     <div className="flex h-screen bg-gray-100 text-gray-800">
//       <aside className="w-64 bg-white shadow-lg flex flex-col">
//         <div className="p-5 border-b flex items-center gap-3">
//           <div className="bg-indigo-600 p-2 rounded-lg">
//             <Grid3X3 className="text-white w-5 h-5" />
//           </div>
//           <h1 className="text-xl font-bold text-indigo-700">CRM Portal</h1>
//         </div>
//         <nav className="flex-1 overflow-auto p-4">
//           <div className="space-y-6">
//             <div>
//               <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Organization</h2>
//               <div className="space-y-1">
//                 {menuItems.map((item, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => {
//                       setSelectedMenuItem(item.label);
//                       if (item.label === 'Digital Assets') {
//                         setIsDigitalAssetsExpanded(!isDigitalAssetsExpanded);
//                       }
//                     }}
//                     className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
//                       selectedMenuItem === item.label
//                         ? 'bg-indigo-100 text-indigo-700'
//                         : 'hover:bg-gray-100 text-gray-700'
//                     }`}
//                   >
//                     <div className="flex items-center gap-2">
//                       <item.icon className="w-5 h-5" />
//                       <span className="text-sm">{item.label}</span>
//                     </div>
//                     {item.hasSubmenu && (
//                       <ChevronRight className={`w-4 h-4 transition-transform ${
//                         item.expanded ? 'rotate-90' : ''
//                       }`} />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Employees</h2>
//               <div className="space-y-1">
//                 {employeeMenuItems.map((item, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setSelectedMenuItem(item.label)}
//                     className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
//                       selectedMenuItem === item.label
//                         ? 'bg-indigo-100 text-indigo-700'
//                         : 'hover:bg-gray-100 text-gray-700'
//                     }`}
//                   >
//                     <item.icon className="w-5 h-5" />
//                     <span className="text-sm">{item.label}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </nav>
//       </aside>

//       <div className="flex-1 flex flex-col">
//         <header className="bg-indigo-700 text-white shadow px-6 py-3 flex justify-between items-center">
//           <div className="flex gap-4">
//   {navItems.map((item, idx) => (
//     <button
//       key={idx}
//       onClick={() => navigate(navRoutes[item])}
//       className="text-sm font-medium px-3 py-1 rounded-md hover:bg-indigo-600 transition"
//     >
//       {item}
//     </button>
//   ))}
//   <button className="text-sm font-medium px-3 py-1 rounded-md hover:bg-indigo-600 transition">•••</button>
// </div>

//           <div className="flex items-center gap-4">
//             <button className="p-2 rounded hover:bg-indigo-600"><Grid3X3 className="w-5 h-5" /></button>
//             <button className="p-2 rounded hover:bg-indigo-600"><Search className="w-5 h-5" /></button>
//             <button className="p-2 rounded hover:bg-indigo-600"><Calendar className="w-5 h-5" /></button>
//             <button className="p-2 rounded hover:bg-indigo-600"><Settings className="w-5 h-5" /></button>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
//                 <User className="w-4 h-4" />
//               </div>
//               <span className="text-sm font-medium">Tanushree Das</span>
//               <ChevronDown className="w-4 h-4" />
//             </div>
//           </div>
//         </header>

//         <main className="p-6 space-y-6 overflow-auto">
//           <div className="flex items-center gap-4">
//             <div className="bg-gray-300 p-2 rounded-lg">
//               <Building2 className="w-6 h-6 text-gray-700" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800">Welcome, Tanushree</h2>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {metricCards.map((card, idx) => (
//               <div key={idx} className="bg-white p-5 rounded-xl shadow border border-gray-200">
//                 <div className="flex justify-between items-center mb-2">
//                   <h3 className="text-sm font-medium text-gray-700">{card.title}</h3>
//                   <span className="text-xl">{card.icon}</span>
//                 </div>
//                 <div className="flex items-end gap-2">
//                   <span className="text-3xl font-bold text-gray-900">{card.value}</span>
//                   {card.change && (
//                     <span className={`text-sm font-medium ${
//                       card.changeType === 'negative' ? 'text-red-500' : 'text-green-500'
//                     }`}>
//                       {card.changeType === 'negative' ? '▼' : '▲'} {card.change}
//                     </span>
//                   )}
//                 </div>
//                 {card.lastMonth && (
//                   <p className="text-xs text-gray-500 mt-2">{card.lastMonth}</p>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Dashboard Overview Section with Charts */}
//           <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Dashboard Overview</h3>
//             <p className="text-gray-600 text-sm mb-4">
//               This is your main admin dashboard where you can view key metrics and navigate across the business modules. Use the sidebar to access various organizational tools and employee resources.
//             </p>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="h-64">
//                 <h4 className="text-sm font-semibold text-gray-700 mb-2">Leads vs Deals vs Contacts</h4>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
//                       {pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="h-64">
//                 <h4 className="text-sm font-semibold text-gray-700 mb-2">Tasks & Account Statistics</h4>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={barData}>
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
//            <Outlet /> // Render the nested route component here
//         </main>
//       </div>
//     </div>
//   );
// };



// export default AdminDashboard;

//  import React, { useState } from 'react';
// import { useNavigate, Outlet, useLocation } from 'react-router-dom'; // Import Outlet and useLocation


// import {
//   Home, Users, Phone, DollarSign, Calendar, BarChart3, FolderOpen,
//   Building2, FileText, Shield, BookOpen, UserCheck, Gift, Clock, Award,
//   Calculator, ChevronRight, ChevronDown, Search, Settings, User, Grid3X3
// } from 'lucide-react';
// import {
//   PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
// } from 'recharts';

// const AdminDashboard = () => {
//   const [isDigitalAssetsExpanded, setIsDigitalAssetsExpanded] = useState(false);
//   const [selectedMenuItem, setSelectedMenuItem] = useState('AdminDashboard');
//   const navigate = useNavigate();
//   const location = useLocation(); // Get current location

//   const menuItems = [
//     { icon: Home, label: 'Dashboard', hasSubmenu: false },
//     { icon: Building2, label: 'About Team1 Consulting', hasSubmenu: false },
//     { icon: Users, label: 'Organizational Structure', hasSubmenu: false },
//     { icon: FileText, label: 'Digital Assets', hasSubmenu: true, expanded: isDigitalAssetsExpanded },
//     { icon: Shield, label: 'Company Certifications', hasSubmenu: false },
//     { icon: FileText, label: 'SOPs', hasSubmenu: false },
//     { icon: BookOpen, label: 'E-Library', hasSubmenu: false },
//   ];

//   const employeeMenuItems = [
//     { icon: Gift, label: 'Holidays', hasSubmenu: false },
//     { icon: FileText, label: 'Policies', hasSubmenu: false },
//     { icon: DollarSign, label: 'Compensation', hasSubmenu: false },
//     { icon: Award, label: 'Recognition', hasSubmenu: false },
//     { icon: Clock, label: 'TimeSheet', hasSubmenu: false },
//     { icon: Shield, label: 'Insurance', hasSubmenu: false },
//     { icon: UserCheck, label: 'Team1Enrich', hasSubmenu: false },
//   ];

//  const navItems = [
//   'Home', 'Leads', 'Contacts', 'Accounts', 'Deals', 'Tasks', 'Meetings', 'Calls', 'Reports', 'Projects'
// ];

// const navRoutes = {
//   Home: '/admin-dashboard',
//   Leads: '/admin-dashboard/leads',
//   Contacts: '/admin-dashboard/contacts',
//   Accounts: '/admin-dashboard/accounts', // Assuming /admin-dashboard/employees for Accounts
//   Deals: '/admin-dashboard/deals',
//   Tasks: '/admin-dashboard/tasks',
//   Meetings: '/admin-dashboard/meetings',
//   Calls: '/admin-dashboard/calls',
//   Reports: '/admin-dashboard/reports',
//   Projects: '/admin-dashboard/projects',
// };


//   const metricCards = [
//     {
//       title: 'Deals Created This Month',
//       value: '137',
//       change: '100%',
//       changeType: 'positive',
//       lastMonth: 'Last Month: 30',
//       icon: '📈'
//     },
//     {
//       title: 'Revenue This Month',
//       value: '12,00,00,000.00',
//       change: '100%',
//       changeType: 'positive',
//       lastMonth: 'Last Month: ₹6,00,00,000.00',
//       icon: '💰'
//     },
//     {
//       title: 'Deals Closing This Month',
//       value: '96',
//       change: '',
//       changeType: 'neutral',
//       lastMonth: '',
//       icon: '🤝'
//     },
//     {
//       title: 'Overdue Tasks',
//       value: '13',
//       change: '',
//       changeType: 'neutral',
//       lastMonth: '',
//       icon: '📋'
//     }
//   ];

//   const pieData = [
//     { name: 'Leads', value: 400 },
//     { name: 'Deals', value: 300 },
//     { name: 'Contacts', value: 300 },
//     { name: 'Tasks', value: 200 },
//     { name: 'Accounts', value: 100 },
//   ];
//   const COLORS = ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE'];

//   const barData = [
//     { name: 'Leads', value: 240 },
//     { name: 'Accounts', value: 130 },
//     { name: 'Deals', value: 200 },
//     { name: 'Tasks', value: 100 },
//     { name: 'Contacts', value: 180 },
//   ];


//   return (
//     <div className="flex h-screen bg-gray-100 text-gray-800">
//       <aside className="w-64 bg-white shadow-lg flex flex-col">
//         <div className="p-5 border-b flex items-center gap-3">
//           <div className="bg-indigo-600 p-2 rounded-lg">
//             <Grid3X3 className="text-white w-5 h-5" />
//           </div>
//           <h1 className="text-xl font-bold text-indigo-700">CRM Portal</h1>
//         </div>
//         <nav className="flex-1 overflow-auto p-4">
//           <div className="space-y-6">
//             <div>
//               <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Organization</h2>
//               <div className="space-y-1">
//                 {menuItems.map((item, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => {
//                       setSelectedMenuItem(item.label);
//                       if (item.label === 'Digital Assets') {
//                         setIsDigitalAssetsExpanded(!isDigitalAssetsExpanded);
//                       }
//                       // Navigate for Dashboard item
//                       if (item.label === 'Dashboard') {
//                          navigate(navRoutes.Home); // Navigate to /admin-dashboard for Dashboard
//                       }
//                     }}
//                     className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
//                       selectedMenuItem === item.label
//                         ? 'bg-indigo-100 text-indigo-700'
//                         : 'hover:bg-gray-100 text-gray-700'
//                     }`}
//                   >
//                     <div className="flex items-center gap-2">
//                       <item.icon className="w-5 h-5" />
//                       <span className="text-sm">{item.label}</span>
//                     </div>
//                     {item.hasSubmenu && (
//                       <ChevronRight className={`w-4 h-4 transition-transform ${
//                         item.expanded ? 'rotate-90' : ''
//                       }`} />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Employees</h2>
//               <div className="space-y-1">
//                 {employeeMenuItems.map((item, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setSelectedMenuItem(item.label)}
//                     className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
//                       selectedMenuItem === item.label
//                         ? 'bg-indigo-100 text-indigo-700'
//                         : 'hover:bg-gray-100 text-gray-700'
//                     }`}
//                   >
//                     <item.icon className="w-5 h-5" />
//                     <span className="text-sm">{item.label}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </nav>
//       </aside>

//       <div className="flex-1 flex flex-col">
//         <header className="bg-indigo-700 text-white shadow px-6 py-3 flex justify-between items-center">
//           <div className="flex gap-4">
//             {navItems.map((item, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => navigate(navRoutes[item])}
//                 className="text-sm font-medium px-3 py-1 rounded-md hover:bg-indigo-600 transition"
//               >
//                 {item}
//               </button>
//             ))}
//             <button className="text-sm font-medium px-3 py-1 rounded-md hover:bg-indigo-600 transition">•••</button>
//           </div>

//           <div className="flex items-center gap-4">
//             <button className="p-2 rounded hover:bg-indigo-600"><Grid3X3 className="w-5 h-5" /></button>
//             <button className="p-2 rounded hover:bg-indigo-600"><Search className="w-5 h-5" /></button>
//             <button className="p-2 rounded hover:bg-indigo-600"><Calendar className="w-5 h-5" /></button>
//             <button className="p-2 rounded hover:bg-indigo-600"><Settings className="w-5 h-5" /></button>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
//                 <User className="w-4 h-4" />
//               </div>
//               <span className="text-sm font-medium">Amit Seth</span>
//               <ChevronDown className="w-4 h-4" />
//             </div>
//           </div>
//         </header>

//         <main className="p-6 space-y-6 overflow-auto">
//           {/* Conditional rendering for the main content area */}
//           {location.pathname === '/admin-dashboard' || location.pathname === '/admin-dashboard/' ? (
//             <>
//               {/* Dashboard Summary Content */}
//               <div className="flex items-center gap-4">
//                 <div className="bg-gray-300 p-2 rounded-lg">
//                   <Building2 className="w-6 h-6 text-gray-700" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800">Welcome, Amit</h2>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {metricCards.map((card, idx) => (
//                   <div key={idx} className="bg-white p-5 rounded-xl shadow border border-gray-200">
//                     <div className="flex justify-between items-center mb-2">
//                       <h3 className="text-sm font-medium text-gray-700">{card.title}</h3>
//                       <span className="text-xl">{card.icon}</span>
//                     </div>
//                     <div className="flex items-end gap-2">
//                       <span className="text-3xl font-bold text-gray-900">{card.value}</span>
//                       {card.change && (
//                         <span className={`text-sm font-medium ${
//                           card.changeType === 'negative' ? 'text-red-500' : 'text-green-500'
//                         }`}>
//                           {card.changeType === 'negative' ? '▼' : '▲'} {card.change}
//                         </span>
//                       )}
//                     </div>
//                     {card.lastMonth && (
//                       <p className="text-xs text-gray-500 mt-2">{card.lastMonth}</p>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Dashboard Overview Section with Charts */}
//               <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Dashboard Overview</h3>
//                 <p className="text-gray-600 text-sm mb-4">
//                   This is your main admin dashboard where you can view key metrics and navigate across the business modules. Use the sidebar to access various organizational tools and employee resources.
//                 </p>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="h-64">
//                     <h4 className="text-sm font-semibold text-gray-700 mb-2">Leads vs Deals vs Contacts</h4>
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
//                           {pieData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                   <div className="h-64">
//                     <h4 className="text-sm font-semibold text-gray-700 mb-2">Tasks & Account Statistics</h4>
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart data={barData}>
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
//                       </BarChart>
//                     </ResponsiveContainer>
//                     <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Overview for Team1 Consulting</h3>

//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                           {/* New Clients Onboarded */}
//                           <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
//                             <Users className="w-8 h-8 text-indigo-600" />
//                             <div>
//                               <p className="text-sm text-gray-600">New Clients This Quarter</p>
//                               <p className="text-2xl font-bold text-gray-900">12 <span className="text-green-500 text-base font-medium">▲ 20%</span></p>
//                               <p className="text-xs text-gray-500">vs. Last Quarter: 10</p>
//                             </div>
//                           </div>

//                           {/* Client Retention Rate */}
//                           <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
//                             <UserCheck className="w-8 h-8 text-green-600" />
//                             <div>
//                               <p className="text-sm text-gray-600">Client Retention Rate</p>
//                               <p className="text-2xl font-bold text-gray-900">92% <span className="text-green-500 text-base font-medium">▲ 2%</span></p>
//                               <p className="text-xs text-gray-500">Target: 90%</p>
//                             </div>
//                           </div>

//                           {/* Average Project Value */}
//                           <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
//                             <DollarSign className="w-8 h-8 text-yellow-600" />
//                             <div>
//                               <p className="text-sm text-gray-600">Average Project Value</p>
//                               <p className="text-2xl font-bold text-gray-900">₹8,50,000</p>
//                               <p className="text-xs text-gray-500">Increased by ₹50,000 this month</p>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="mt-6">
//                           <h4 className="text-md font-semibold text-gray-700 mb-2">Upcoming Key Client Deliverables</h4>
//                           <ul className="list-disc list-inside text-gray-700">
//                             <li>Project Alpha - Phase 2 Completion (June 30)</li>
//                             <li>Client Beta - Strategy Workshop (July 5)</li>
//                             <li>New Client Onboarding - Project Gamma (July 10)</li>
//                           </ul>
//                         </div>
//                       </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <Outlet /> // This is where LeadList (or other nested routes) will render
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;














































































// import React, { useState } from 'react';
// import { useNavigate, Outlet, useLocation } from 'react-router-dom'; // Import Outlet and useLocation

// import {
//   Home, Users, Phone, DollarSign, Calendar, BarChart3, FolderOpen,
//   Building2, FileText, Shield, BookOpen, UserCheck, Gift, Clock, Award,
//   Calculator, ChevronRight, ChevronDown, Search, Settings, User, Grid3X3, HelpCircle, Star, LogOut
// } from 'lucide-react';
// import {
//   PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
// } from 'recharts';

// const AdminDashboard = () => {
//   const [isDigitalAssetsExpanded, setIsDigitalAssetsExpanded] = useState(false);
//   // New state for collapsible sections in sidebar
//   const [isOrganizationMenuExpanded, setIsOrganizationMenuExpanded] = useState(true);
//   const [isEmployeeMenuExpanded, setIsEmployeeMenuExpanded] = useState(true);

//   const [selectedMenuItem, setSelectedMenuItem] = useState('AdminDashboard');
//   const navigate = useNavigate();
//   const location = useLocation(); // Get current location

//   const menuItems = [
//     { icon: Home, label: 'CRM', route: '/admin-dashboard', hasSubmenu: false },
//     { icon: Building2, label: 'About Team1 Consulting', route: '/admin-dashboard/about', hasSubmenu: false },
//     { icon: Users, label: 'Organizational Structure', route: '/admin-dashboard/org-structure', hasSubmenu: false },
//     { icon: FileText, label: 'Digital Assets', route: '#', hasSubmenu: true, expanded: isDigitalAssetsExpanded },
//     { icon: Shield, label: 'Company Certifications', route: '/admin-dashboard/certifications', hasSubmenu: false },
//     { icon: FileText, label: 'SOPs', route: '/admin-dashboard/sops', hasSubmenu: false },
//     { icon: BookOpen, label: 'E-Library', route: '/admin-dashboard/e-library', hasSubmenu: false },
//   ];

//   const employeeMenuItems = [
//     { icon: Gift, label: 'Holidays', route: '/admin-dashboard/holidays', hasSubmenu: false },
//     { icon: FileText, label: 'Policies', route: '/admin-dashboard/policies', hasSubmenu: false },
//     { icon: DollarSign, label: 'Compensation', route: '/admin-dashboard/compensation', hasSubmenu: false },
//     { icon: Award, label: 'Recognition', route: '/admin-dashboard/recognition', hasSubmenu: false },
//     { icon: Clock, label: 'TimeSheet', route: '/admin-dashboard/timesheet', hasSubmenu: false },
//     { icon: Shield, label: 'Insurance', route: '/admin-dashboard/insurance', hasSubmenu: false },
//     { icon: UserCheck, label: 'Team1Enrich', route: '/admin-dashboard/team1enrich', hasSubmenu: false },
//   ];

//   const navItems = [
//     'Home', 'Leads', 'Contacts', 'Accounts', 'Deals', 'Tasks', 'Meetings', 'Calls', 'Reports', 'Projects'
//   ];

//   const navRoutes = {
//     Home: '/admin-dashboard',
//     Leads: '/admin-dashboard/leads',
//     Contacts: '/admin-dashboard/contacts',
//     Accounts: '/admin-dashboard/accounts',
//     Deals: '/admin-dashboard/deals',
//     Tasks: '/admin-dashboard/tasks',
//     Meetings: '/admin-dashboard/meetings',
//     Calls: '/admin-dashboard/calls',
//     Reports: '/admin-dashboard/reports',
//     Projects: '/admin-dashboard/projects',
//   };

//   const metricCards = [
//     {
//       title: 'Deals Created This Month',
//       value: '137',
//       change: '100%',
//       changeType: 'positive',
//       lastMonth: 'Last Month: 30',
//       icon: '📈'
//     },
//     {
//       title: 'Revenue This Month',
//       value: '12,00,00,000.00',
//       change: '100%',
//       changeType: 'positive',
//       lastMonth: 'Last Month: ₹6,00,00,000.00',
//       icon: '💰'
//     },
//     {
//       title: 'Deals Closing This Month',
//       value: '96',
//       change: '',
//       changeType: 'neutral',
//       lastMonth: '',
//       icon: '🤝'
//     },
//     {
//       title: 'Overdue Tasks',
//       value: '13',
//       change: '',
//       changeType: 'neutral',
//       lastMonth: '',
//       icon: '📋'
//     }
//   ];

//   const pieData = [
//     { name: 'Leads', value: 400 },
//     { name: 'Deals', value: 300 },
//     { name: 'Contacts', value: 300 },
//     { name: 'Tasks', value: 200 },
//     { name: 'Accounts', value: 100 },
//   ];
//   const COLORS = ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE'];

//   const barData = [
//     { name: 'Leads', value: 240 },
//     { name: 'Accounts', value: 130 },
//     { name: 'Deals', value: 200 },
//     { name: 'Tasks', value: 100 },
//     { name: 'Contacts', value: 180 },
//   ];


//   return (
//     <div className="flex h-screen bg-gray-100 text-gray-800">
//       <aside className="w-64 bg-white shadow-lg flex flex-col">
//         {/* Top Section: CRM Portal Logo and Title */}
//         <div className="p-5 border-b flex items-center gap-3">
//           <div className="bg-indigo-600 p-2 rounded-lg">
//             <Grid3X3 className="text-white w-5 h-5" />
//           </div>
//           <h1 className="text-xl font-bold text-indigo-700">CRM Portal</h1>
//         </div>

//         {/* User Profile / Quick Actions
//         <div className="p-4 border-b flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white text-lg font-semibold">
//             AS
//           </div>
//           <div className="flex-1">
//             <p className="text-sm font-semibold text-gray-800">Amit Seth</p>
//             <p className="text-xs text-gray-500">Admin</p>
//           </div>
//           <button className="text-gray-400 hover:text-indigo-600 p-1 rounded-full hover:bg-gray-100 transition">
//             <Settings className="w-5 h-5" />
//           </button>
//         </div> */}

//         {/* Search Bar within Sidebar
//         <div className="p-4 border-b">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search menu..."
//               className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>
//         </div> */}

//         {/* Navigation Menu */}
//         <nav className="flex-1 overflow-auto p-4 custom-scrollbar"> {/* Added custom-scrollbar for better aesthetics */}
//           <div className="space-y-6">
//             {/* Organization Section */}
//             <div>
//               <button
//                 className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-500 uppercase mb-2 hover:bg-gray-100 rounded-md transition-colors"
//                 onClick={() => setIsOrganizationMenuExpanded(!isOrganizationMenuExpanded)}
//               >
//                 Organization
//                 {isOrganizationMenuExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
//               </button>
//               {isOrganizationMenuExpanded && (
//                 <div className="space-y-1">
//                   {menuItems.map((item, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => {
//                         setSelectedMenuItem(item.label);
//                         if (item.label === 'Digital Assets') {
//                           setIsDigitalAssetsExpanded(!isDigitalAssetsExpanded);
//                         } else if (item.route) { // Navigate for other items
//                           navigate(item.route);
//                         }
//                       }}
//                       className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
//                         selectedMenuItem === item.label || location.pathname === item.route
//                           ? 'bg-indigo-100 text-indigo-700 font-medium'
//                           : 'hover:bg-gray-100 text-gray-700'
//                       }`}
//                     >
//                       <div className="flex items-center gap-2">
//                         <item.icon className="w-5 h-5" />
//                         <span className="text-sm">{item.label}</span>
//                       </div>
//                       {item.hasSubmenu && (
//                         <ChevronRight className={`w-4 h-4 transition-transform ${
//                           item.expanded ? 'rotate-90' : ''
//                         }`} />
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Employees Section */}
//             <div>
//               <button
//                 className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-500 uppercase mb-2 hover:bg-gray-100 rounded-md transition-colors"
//                 onClick={() => setIsEmployeeMenuExpanded(!isEmployeeMenuExpanded)}
//               >
//                 Employees
//                 {isEmployeeMenuExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
//               </button>
//               {isEmployeeMenuExpanded && (
//                 <div className="space-y-1">
//                   {employeeMenuItems.map((item, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => {
//                           setSelectedMenuItem(item.label);
//                           if (item.route) {
//                             navigate(item.route);
//                           }
//                       }}
//                       className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
//                         selectedMenuItem === item.label || location.pathname === item.route
//                           ? 'bg-indigo-100 text-indigo-700 font-medium'
//                           : 'hover:bg-gray-100 text-gray-700'
//                       }`}
//                     >
//                       <item.icon className="w-5 h-5" />
//                       <span className="text-sm">{item.label}</span>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Help & Support */}
//             <div className="pt-6 border-t border-gray-200">
//                 <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Support</h2>
//                 <button
//                     onClick={() => navigate('/admin-dashboard/help')}
//                     className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
//                         selectedMenuItem === 'Help & Support'
//                             ? 'bg-indigo-100 text-indigo-700 font-medium'
//                             : 'hover:bg-gray-100 text-gray-700'
//                     }`}
//                 >
//                     <HelpCircle className="w-5 h-5" />
//                     <span className="text-sm">Help & Support</span>
//                 </button>
//                 <button
//                     onClick={() => navigate('/logout')} // Or handle logout logic
//                     className="w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-red-600 hover:bg-red-50 mt-2"
//                 >
//                     <LogOut className="w-5 h-5" />
//                     <span className="text-sm">Logout</span>
//                 </button>
//             </div>

//           </div>
//         </nav>
//       </aside>

//       <div className="flex-1 flex flex-col">
//         <header className="bg-indigo-700 text-white shadow px-6 py-3 flex justify-between items-center">
//           <div className="flex gap-4">
//             {navItems.map((item, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => navigate(navRoutes[item])}
//                 className="text-sm font-medium px-3 py-1 rounded-md hover:bg-indigo-600 transition"
//               >
//                 {item}
//               </button>
//             ))}
//             <button className="text-sm font-medium px-3 py-1 rounded-md hover:bg-indigo-600 transition">•••</button>
//           </div>

//           <div className="flex items-center gap-4">
//             <button className="p-2 rounded hover:bg-indigo-600"><Grid3X3 className="w-5 h-5" /></button>
//             <button className="p-2 rounded hover:bg-indigo-600"><Search className="w-5 h-5" /></button>
//             <button className="p-2 rounded hover:bg-indigo-600"><Calendar className="w-5 h-5" /></button>
//             <button className="p-2 rounded hover:bg-indigo-600"><Settings className="w-5 h-5" /></button>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
//                 <User className="w-4 h-4" />
//               </div>
//               <span className="text-sm font-medium">Amit Seth</span>
//               <ChevronDown className="w-4 h-4" />
//             </div>
//           </div>
//         </header>

//         <main className="p-6 space-y-6 overflow-auto">
//           {/* Conditional rendering for the main content area */}
//           {location.pathname === '/admin-dashboard' || location.pathname === '/admin-dashboard/' ? (
//             <>
//               {/* Dashboard Summary Content */}
//               <div className="flex items-center gap-4">
//                 <div className="bg-gray-300 p-2 rounded-lg">
//                   <Building2 className="w-6 h-6 text-gray-700" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800">Welcome, Amit</h2>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {metricCards.map((card, idx) => (
//                   <div key={idx} className="bg-white p-5 rounded-xl shadow border border-gray-200">
//                     <div className="flex justify-between items-center mb-2">
//                       <h3 className="text-sm font-medium text-gray-700">{card.title}</h3>
//                       <span className="text-xl">{card.icon}</span>
//                     </div>
//                     <div className="flex items-end gap-2">
//                       <span className="text-3xl font-bold text-gray-900">{card.value}</span>
//                       {card.change && (
//                         <span className={`text-sm font-medium ${
//                           card.changeType === 'negative' ? 'text-red-500' : 'text-green-500'
//                         }`}>
//                           {card.changeType === 'negative' ? '▼' : '▲'} {card.change}
//                         </span>
//                       )}
//                     </div>
//                     {card.lastMonth && (
//                       <p className="text-xs text-gray-500 mt-2">{card.lastMonth}</p>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Dashboard Overview Section with Charts */}
//               <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Dashboard Overview</h3>
//                 <p className="text-gray-600 text-sm mb-4">
//                   This is your main admin dashboard where you can view key metrics and navigate across the business modules. Use the sidebar to access various organizational tools and employee resources.
//                 </p>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="h-64">
//                     <h4 className="text-sm font-semibold text-gray-700 mb-2">Leads vs Deals vs Contacts</h4>
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
//                           {pieData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                   <div className="h-64">
//                     <h4 className="text-sm font-semibold text-gray-700 mb-2">Tasks & Account Statistics</h4>
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart data={barData}>
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>
//               </div>

//               {/* New Section: Strategic Overview (from previous response) */}
//               <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Overview for Team1 Consulting</h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {/* New Clients Onboarded */}
//                   <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
//                     <Users className="w-8 h-8 text-indigo-600" />
//                     <div>
//                       <p className="text-sm text-gray-600">New Clients This Quarter</p>
//                       <p className="text-2xl font-bold text-gray-900">12 <span className="text-green-500 text-base font-medium">▲ 20%</span></p>
//                       <p className="text-xs text-gray-500">vs. Last Quarter: 10</p>
//                     </div>
//                   </div>

//                   {/* Client Retention Rate */}
//                   <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
//                     <UserCheck className="w-8 h-8 text-green-600" />
//                     <div>
//                       <p className="text-sm text-gray-600">Client Retention Rate</p>
//                       <p className="text-2xl font-bold text-gray-900">92% <span className="text-green-500 text-base font-medium">▲ 2%</span></p>
//                       <p className="text-xs text-gray-500">Target: 90%</p>
//                     </div>
//                   </div>

//                   {/* Average Project Value */}
//                   <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
//                     <DollarSign className="w-8 h-8 text-yellow-600" />
//                     <div>
//                       <p className="text-sm text-gray-600">Average Project Value</p>
//                       <p className="text-2xl font-bold text-gray-900">₹8,50,000</p>
//                       <p className="text-xs text-gray-500">Increased by ₹50,000 this month</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-6">
//                   <h4 className="text-md font-semibold text-gray-700 mb-2">Upcoming Key Client Deliverables</h4>
//                   <ul className="list-disc list-inside text-gray-700">
//                     <li>Project Alpha - Phase 2 Completion (June 30)</li>
//                     <li>Client Beta - Strategy Workshop (July 5)</li>
//                     <li>New Client Onboarding - Project Gamma (July 10)</li>
//                   </ul>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <Outlet /> // This is where LeadList (or other nested routes) will render
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;























































































// // AdminDashboard.jsx
// import React, { useState } from 'react';
// import { useNavigate, Outlet, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/authContext'; // Import useAuth hook

// import {
//   Home, Users, Phone, DollarSign, Calendar, BarChart3, FolderOpen,
//   Building2, FileText, Shield, BookOpen, UserCheck, Gift, Clock, Award,
//   Calculator, ChevronRight, ChevronDown, Search, Settings, User, Grid3X3, HelpCircle, Star, LogOut
// } from 'lucide-react';
// import {
//   PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
// } from 'recharts';

// const AdminDashboard = () => {
//   const [isDigitalAssetsExpanded, setIsDigitalAssetsExpanded] = useState(false);
//   const [isOrganizationMenuExpanded, setIsOrganizationMenuExpanded] = useState(true);
//   const [isEmployeeMenuExpanded, setIsEmployeeMenuExpanded] = useState(true);
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // New state for profile dropdown

//   const [selectedMenuItem, setSelectedMenuItem] = useState('AdminDashboard');
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { logout } = useAuth(); // Destructure logout from useAuth

//   const menuItems = [
//     { icon: Home, label: 'CRM', route: '/admin-dashboard', hasSubmenu: false },
//     { icon: Building2, label: 'About Team1 Consulting', route: '/admin-dashboard/about', hasSubmenu: false },
//     { icon: Users, label: 'Organizational Structure', route: '/admin-dashboard/org-structure', hasSubmenu: false },
//     { icon: FileText, label: 'Digital Assets', route: '#', hasSubmenu: true, expanded: isDigitalAssetsExpanded },
//     { icon: Shield, label: 'Company Certifications', route: '/admin-dashboard/certifications', hasSubmenu: false },
//     { icon: FileText, label: 'SOPs', route: '/admin-dashboard/sops', hasSubmenu: false },
//     { icon: BookOpen, label: 'E-Library', route: '/admin-dashboard/e-library', hasSubmenu: false },
//   ];

//   const employeeMenuItems = [
//     { icon: Gift, label: 'Holidays', route: '/admin-dashboard/holidays', hasSubmenu: false },
//     { icon: FileText, label: 'Policies', route: '/admin-dashboard/policies', hasSubmenu: false },
//     { icon: DollarSign, label: 'Compensation', route: '/admin-dashboard/compensation', hasSubmenu: false },
//     { icon: Award, label: 'Recognition', route: '/admin-dashboard/recognition', hasSubmenu: false },
//     { icon: Clock, label: 'TimeSheet', route: '/admin-dashboard/timesheet', hasSubmenu: false },
//     { icon: Shield, label: 'Insurance', route: '/admin-dashboard/insurance', hasSubmenu: false },
//     { icon: UserCheck, label: 'Team1Enrich', route: '/admin-dashboard/team1enrich', hasSubmenu: false },
//   ];

//   const navItems = [
//     'Home', 'Leads', 'Contacts', 'Accounts', 'Deals', 'Tasks', 'Meetings', 'Calls', 'Reports', 'Projects'
//   ];

//   const navRoutes = {
//     Home: '/admin-dashboard',
//     Leads: '/admin-dashboard/leads',
//     Contacts: '/admin-dashboard/contacts',
//     Accounts: '/admin-dashboard/accounts',
//     Deals: '/admin-dashboard/deals',
//     Tasks: '/admin-dashboard/tasks',
//     Meetings: '/admin-dashboard/meetings',
//     Calls: '/admin-dashboard/calls',
//     Reports: '/admin-dashboard/reports',
//     Projects: '/admin-dashboard/projects',
//   };

//   const metricCards = [
//     {
//       title: 'Deals Created This Month',
//       value: '137',
//       change: '100%',
//       changeType: 'positive',
//       lastMonth: 'Last Month: 30',
//       icon: '📈'
//     },
//     {
//       title: 'Revenue This Month',
//       value: '12,00,00,000.00',
//       change: '100%',
//       changeType: 'positive',
//       lastMonth: 'Last Month: ₹6,00,00,000.00',
//       icon: '💰'
//     },
//     {
//       title: 'Deals Closing This Month',
//       value: '96',
//       change: '',
//       changeType: 'neutral',
//       lastMonth: '',
//       icon: '🤝'
//     },
//     {
//       title: 'Overdue Tasks',
//       value: '13',
//       change: '',
//       changeType: 'neutral',
//       lastMonth: '',
//       icon: '📋'
//     }
//   ];

//   const pieData = [
//     { name: 'Leads', value: 400 },
//     { name: 'Deals', value: 300 },
//     { name: 'Contacts', value: 300 },
//     { name: 'Tasks', value: 200 },
//     { name: 'Accounts', value: 100 },
//   ];
//   const COLORS = ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE'];

//   const barData = [
//     { name: 'Leads', value: 240 },
//     { name: 'Accounts', value: 130 },
//     { name: 'Deals', value: 200 },
//     { name: 'Tasks', value: 100 },
//     { name: 'Contacts', value: 180 },
//   ];

//   const handleLogout = () => {
//     logout(); // Call the logout function from your auth context
//     navigate('/login'); // Redirect to the login page
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 text-gray-800">
//       <aside className="w-64 bg-white shadow-lg flex flex-col">
//         {/* Top Section: CRM Portal Logo and Title */}
//         <div className="p-5 border-b flex items-center gap-3">
//           <div className="bg-indigo-600 p-2 rounded-lg">
//             <Grid3X3 className="text-white w-5 h-5" />
//           </div>
//           <h1 className="text-xl font-bold text-indigo-700">CRM Portal</h1>
//         </div>

//         {/* Navigation Menu */}
//         <nav className="flex-1 overflow-auto p-4 custom-scrollbar">
//           <div className="space-y-6">
//             {/* Organization Section */}
//             <div>
//               <button
//                 className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-500 uppercase mb-2 hover:bg-gray-100 rounded-md transition-colors"
//                 onClick={() => setIsOrganizationMenuExpanded(!isOrganizationMenuExpanded)}
//               >
//                 Organization
//                 {isOrganizationMenuExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
//               </button>
//               {isOrganizationMenuExpanded && (
//                 <div className="space-y-1">
//                   {menuItems.map((item, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => {
//                         setSelectedMenuItem(item.label);
//                         if (item.label === 'Digital Assets') {
//                           setIsDigitalAssetsExpanded(!isDigitalAssetsExpanded);
//                         } else if (item.route) {
//                           navigate(item.route);
//                         }
//                       }}
//                       className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
//                         selectedMenuItem === item.label || location.pathname === item.route
//                           ? 'bg-indigo-100 text-indigo-700 font-medium'
//                           : 'hover:bg-gray-100 text-gray-700'
//                       }`}
//                     >
//                       <div className="flex items-center gap-2">
//                         <item.icon className="w-5 h-5" />
//                         <span className="text-sm">{item.label}</span>
//                       </div>
//                       {item.hasSubmenu && (
//                         <ChevronRight className={`w-4 h-4 transition-transform ${
//                           item.expanded ? 'rotate-90' : ''
//                         }`} />
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Employees Section */}
//             <div>
//               <button
//                 className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-500 uppercase mb-2 hover:bg-gray-100 rounded-md transition-colors"
//                 onClick={() => setIsEmployeeMenuExpanded(!isEmployeeMenuExpanded)}
//               >
//                 Employees
//                 {isEmployeeMenuExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
//               </button>
//               {isEmployeeMenuExpanded && (
//                 <div className="space-y-1">
//                   {employeeMenuItems.map((item, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => {
//                           setSelectedMenuItem(item.label);
//                           if (item.route) {
//                             navigate(item.route);
//                           }
//                       }}
//                       className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
//                         selectedMenuItem === item.label || location.pathname === item.route
//                           ? 'bg-indigo-100 text-indigo-700 font-medium'
//                           : 'hover:bg-gray-100 text-gray-700'
//                       }`}
//                     >
//                       <item.icon className="w-5 h-5" />
//                       <span className="text-sm">{item.label}</span>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Help & Support */}
//             <div className="pt-6 border-t border-gray-200">
//                 <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Support</h2>
//                 <button
//                     onClick={() => navigate('/admin-dashboard/help')}
//                     className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
//                         selectedMenuItem === 'Help & Support'
//                             ? 'bg-indigo-100 text-indigo-700 font-medium'
//                             : 'hover:bg-gray-100 text-gray-700'
//                     }`}
//                 >
//                     <HelpCircle className="w-5 h-5" />
//                     <span className="text-sm">Help & Support</span>
//                 </button>
//             </div>

//           </div>
//         </nav>
//       </aside>

//       <div className="flex-1 flex flex-col">
//         <header className="bg-indigo-700 text-white shadow px-6 py-3 flex justify-between items-center">
//           <div className="flex gap-4">
//             {navItems.map((item, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => navigate(navRoutes[item])}
//                 className="text-sm font-medium px-3 py-1 rounded-md hover:bg-indigo-600 transition"
//               >
//                 {item}
//               </button>
//             ))}
//             <button className="text-sm font-medium px-3 py-1 rounded-md hover:bg-indigo-600 transition">•••</button>
//           </div>

//           <div className="flex items-center gap-4">
//             <button className="p-2 rounded hover:bg-indigo-600"><Grid3X3 className="w-5 h-5" /></button>
//             <button className="p-2 rounded hover:bg-indigo-600"><Search className="w-5 h-5" /></button>
//             <button className="p-2 rounded hover:bg-indigo-600"><Calendar className="w-5 h-5" /></button>
//             <button className="p-2 rounded hover:bg-indigo-600"><Settings className="w-5 h-5" /></button>
//             {/* Profile Button with Dropdown */}
//             <div className="relative">
//               <button
//                 className="flex items-center gap-2 p-2 rounded hover:bg-indigo-600"
//                 onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
//               >
//                 <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
//                   <User className="w-4 h-4" />
//                 </div>
//                 <span className="text-sm font-medium">Amit Seth</span>
//                 <ChevronDown className={`w-4 h-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
//               </button>
//               {isProfileMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         <main className="p-6 space-y-6 overflow-auto">
//           {/* Conditional rendering for the main content area */}
//           {location.pathname === '/admin-dashboard' || location.pathname === '/admin-dashboard/' ? (
//             <>
//               {/* Dashboard Summary Content */}
//               <div className="flex items-center gap-4">
//                 <div className="bg-gray-300 p-2 rounded-lg">
//                   <Building2 className="w-6 h-6 text-gray-700" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800">Welcome, Amit</h2>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {metricCards.map((card, idx) => (
//                   <div key={idx} className="bg-white p-5 rounded-xl shadow border border-gray-200">
//                     <div className="flex justify-between items-center mb-2">
//                       <h3 className="text-sm font-medium text-gray-700">{card.title}</h3>
//                       <span className="text-xl">{card.icon}</span>
//                     </div>
//                     <div className="flex items-end gap-2">
//                       <span className="text-3xl font-bold text-gray-900">{card.value}</span>
//                       {card.change && (
//                         <span className={`text-sm font-medium ${
//                           card.changeType === 'negative' ? 'text-red-500' : 'text-green-500'
//                         }`}>
//                           {card.changeType === 'negative' ? '▼' : '▲'} {card.change}
//                         </span>
//                       )}
//                     </div>
//                     {card.lastMonth && (
//                       <p className="text-xs text-gray-500 mt-2">{card.lastMonth}</p>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Dashboard Overview Section with Charts */}
//               <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Dashboard Overview</h3>
//                 <p className="text-gray-600 text-sm mb-4">
//                   This is your main admin dashboard where you can view key metrics and navigate across the business modules. Use the sidebar to access various organizational tools and employee resources.
//                 </p>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="h-64">
//                     <h4 className="text-sm font-semibold text-gray-700 mb-2">Leads vs Deals vs Contacts</h4>
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
//                           {pieData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                   <div className="h-64">
//                     <h4 className="text-sm font-semibold text-gray-700 mb-2">Tasks & Account Statistics</h4>
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart data={barData}>
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>
//               </div>

//               {/* New Section: Strategic Overview (from previous response) */}
//               <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Overview for Team1 Consulting</h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {/* New Clients Onboarded */}
//                   <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
//                     <Users className="w-8 h-8 text-indigo-600" />
//                     <div>
//                       <p className="text-sm text-gray-600">New Clients This Quarter</p>
//                       <p className="text-2xl font-bold text-gray-900">12 <span className="text-green-500 text-base font-medium">▲ 20%</span></p>
//                       <p className="text-xs text-gray-500">vs. Last Quarter: 10</p>
//                     </div>
//                   </div>

//                   {/* Client Retention Rate */}
//                   <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
//                     <UserCheck className="w-8 h-8 text-green-600" />
//                     <div>
//                       <p className="text-sm text-gray-600">Client Retention Rate</p>
//                       <p className="text-2xl font-bold text-gray-900">92% <span className="text-green-500 text-base font-medium">▲ 2%</span></p>
//                       <p className="text-xs text-gray-500">Target: 90%</p>
//                     </div>
//                   </div>

//                   {/* Average Project Value */}
//                   <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
//                     <DollarSign className="w-8 h-8 text-yellow-600" />
//                     <div>
//                       <p className="text-sm text-gray-600">Average Project Value</p>
//                       <p className="text-2xl font-bold text-gray-900">₹8,50,000</p>
//                       <p className="text-xs text-gray-500">Increased by ₹50,000 this month</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-6">
//                   <h4 className="text-md font-semibold text-gray-700 mb-2">Upcoming Key Client Deliverables</h4>
//                   <ul className="list-disc list-inside text-gray-700">
//                     <li>Project Alpha - Phase 2 Completion (June 30)</li>
//                     <li>Client Beta - Strategy Workshop (July 5)</li>
//                     <li>New Client Onboarding - Project Gamma (July 10)</li>
//                   </ul>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <Outlet />
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;









































// // AdminDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, Outlet, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/authContext.jsx'; // Path assumes AdminDashboard.jsx is in a subdirectory of src
// import Chatbot from '../components/chatbot_frontend/Chatbot.jsx'; // Path assumes components is a subdirectory of src

// import {
//   Home, Users, Phone, DollarSign, Calendar, BarChart3, FolderOpen,
//   Building2, FileText, Shield, BookOpen, UserCheck, Gift, Clock, Award,
//   Calculator, ChevronRight, ChevronDown, Search, Settings, User, Grid3X3, HelpCircle, Star, LogOut, MessageSquareText
// } from 'lucide-react';
// import {
//   PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
// } from 'recharts';

// const AdminDashboard = () => {
//   const [isDigitalAssetsExpanded, setIsDigitalAssetsExpanded] = useState(false);
//   const [isOrganizationMenuExpanded, setIsOrganizationMenuExpanded] = useState(true);
//   const [isEmployeeMenuExpanded, setIsEmployeeMenuExpanded] = useState(true);
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State for chatbot visibility

//   const [selectedMenuItem, setSelectedMenuItem] = useState('AdminDashboard');
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { logout } = useAuth();

//   // Debugging: Log chatbot state every time it changes
//   useEffect(() => {
//     console.log('Chatbot state:', isChatbotOpen ? 'OPEN' : 'CLOSED');
//     if (isChatbotOpen) {
//       console.log('Chatbot should be visible now.');
//     } else {
//       console.log('Chatbot should be hidden now.');
//     }
//   }, [isChatbotOpen]);

//   const menuItems = [
//     { icon: Home, label: 'CRM', route: '/admin-dashboard', hasSubmenu: false },
//     { icon: Building2, label: 'About Team1 Consulting', route: '/admin-dashboard/about', hasSubmenu: false },
//     { icon: Users, label: 'Organizational Structure', route: '/admin-dashboard/org-structure', hasSubmenu: false },
//     { icon: FileText, label: 'Digital Assets', route: '#', hasSubmenu: true, expanded: isDigitalAssetsExpanded },
//     { icon: Shield, label: 'Company Certifications', route: '/admin-dashboard/certifications', hasSubmenu: false },
//     { icon: FileText, label: 'SOPs', route: '/admin-dashboard/sops', hasSubmenu: false },
//     { icon: BookOpen, label: 'E-Library', route: '/admin-dashboard/e-library', hasSubmenu: false },
//   ];

//   const employeeMenuItems = [
//     { icon: Gift, label: 'Holidays', route: '/admin-dashboard/holidays', hasSubmenu: false },
//     { icon: FileText, label: 'Policies', route: '/admin-dashboard/policies', hasSubmenu: false },
//     { icon: DollarSign, label: 'Compensation', route: '/admin-dashboard/compensation', hasSubmenu: false },
//     { icon: Award, label: 'Recognition', route: '/admin-dashboard/recognition', hasSubmenu: false },
//     { icon: Clock, label: 'TimeSheet', route: '/admin-dashboard/timesheet', hasSubmenu: false },
//     { icon: Shield, label: 'Insurance', route: '/admin-dashboard/insurance', hasSubmenu: false },
//     { icon: UserCheck, label: 'Team1Enrich', route: '/admin-dashboard/team1enrich', hasSubmenu: false },
//   ];

//   const navItems = [
//     'Home', 'Leads', 'Contacts', 'Accounts', 'Deals', 'Tasks', 'Meetings', 'Calls', 'Reports', 'Projects'
//   ];

//   const navRoutes = {
//     Home: '/admin-dashboard',
//     Leads: '/admin-dashboard/leads',
//     Contacts: '/admin-dashboard/contacts',
//     Accounts: '/admin-dashboard/accounts',
//     Deals: '/admin-dashboard/deals',
//     Tasks: '/admin-dashboard/tasks',
//     Meetings: '/admin-dashboard/meetings',
//     Calls: '/admin-dashboard/calls',
//     Reports: '/admin-dashboard/reports',
//     Projects: '/admin-dashboard/projects',
//   };

//   const metricCards = [
//     {
//       title: 'Deals Created This Month',
//       value: '137',
//       change: '100%',
//       changeType: 'positive',
//       lastMonth: 'Last Month: 30',
//       icon: '📈'
//     },
//     {
//       title: 'Revenue This Month',
//       value: '12,00,00,000.00',
//       change: '100%',
//       changeType: 'positive',
//       lastMonth: 'Last Month: ₹6,00,00,000.00',
//       icon: '💰'
//     },
//     {
//       title: 'Deals Closing This Month',
//       value: '96',
//       change: '',
//       changeType: 'neutral',
//       lastMonth: '',
//       icon: '🤝'
//     },
//     {
//       title: 'Overdue Tasks',
//       value: '13',
//       change: '',
//       changeType: 'neutral',
//       lastMonth: '',
//       icon: '📋'
//     }
//   ];

//   const pieData = [
//     { name: 'Leads', value: 400 },
//     { name: 'Deals', value: 300 },
//     { name: 'Contacts', value: 300 },
//     { name: 'Tasks', value: 200 },
//     { name: 'Accounts', value: 100 },
//   ];
//   const COLORS = ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE'];

//   const barData = [
//     { name: 'Leads', value: 240 },
//     { name: 'Accounts', value: 130 },
//     { name: 'Deals', value: 200 },
//     { name: 'Tasks', value: 100 },
//     { name: 'Contacts', value: 180 },
//   ];

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 text-gray-800">
//       <aside className="w-64 bg-white shadow-lg flex flex-col">
//         {/* Top Section: CRM Portal Logo and Title */}
//         <div className="p-5 border-b flex items-center gap-3">
//           <div className="bg-indigo-600 p-2 rounded-lg">
//             <Grid3X3 className="text-white w-5 h-5" />
//           </div>
//           <h1 className="text-xl font-bold text-indigo-700">CRM Portal</h1>
//         </div>

//         {/* Navigation Menu */}
//         <nav className="flex-1 overflow-auto p-4 custom-scrollbar">
//           <div className="space-y-6">
//             {/* Organization Section */}
//             <div>
//               <button
//                 className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-500 uppercase mb-2 hover:bg-gray-100 rounded-md transition-colors"
//                 onClick={() => setIsOrganizationMenuExpanded(!isOrganizationMenuExpanded)}
//               >
//                 Organization
//                 {isOrganizationMenuExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
//               </button>
//               {isOrganizationMenuExpanded && (
//                 <div className="space-y-1">
//                   {menuItems.map((item, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => {
//                         setSelectedMenuItem(item.label);
//                         if (item.label === 'Digital Assets') {
//                           setIsDigitalAssetsExpanded(!isDigitalAssetsExpanded);
//                         } else if (item.route) {
//                           navigate(item.route);
//                         }
//                       }}
//                       className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
//                         selectedMenuItem === item.label || location.pathname === item.route
//                           ? 'bg-indigo-100 text-indigo-700 font-medium'
//                           : 'hover:bg-gray-100 text-gray-700'
//                       }`}
//                     >
//                       <div className="flex items-center gap-2">
//                         <item.icon className="w-5 h-5" />
//                         <span className="text-sm">{item.label}</span>
//                       </div>
//                       {item.hasSubmenu && (
//                         <ChevronRight className={`w-4 h-4 transition-transform ${
//                           item.expanded ? 'rotate-90' : ''
//                         }`} />
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Employees Section */}
//             <div>
//               <button
//                 className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-500 uppercase mb-2 hover:bg-gray-100 rounded-md transition-colors"
//                 onClick={() => setIsEmployeeMenuExpanded(!isEmployeeMenuExpanded)}
//               >
//                 Employees
//                 {isEmployeeMenuExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
//               </button>
//               {isEmployeeMenuExpanded && (
//                 <div className="space-y-1">
//                   {employeeMenuItems.map((item, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => {
//                           setSelectedMenuItem(item.label);
//                           if (item.route) {
//                             navigate(item.route);
//                           }
//                       }}
//                       className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
//                         selectedMenuItem === item.label || location.pathname === item.route
//                           ? 'bg-indigo-100 text-indigo-700 font-medium'
//                           : 'hover:bg-gray-100 text-gray-700'
//                       }`}
//                     >
//                       <item.icon className="w-5 h-5" />
//                       <span className="text-sm">{item.label}</span>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Help & Support */}
//             <div className="pt-6 border-t border-gray-200">
//                 <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Support</h2>
//                 <button
//                     onClick={() => navigate('/admin-dashboard/help')}
//                     className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
//                         selectedMenuItem === 'Help & Support'
//                             ? 'bg-indigo-100 text-indigo-700 font-medium'
//                             : 'hover:bg-gray-100 text-gray-700'
//                     }`}
//                 >
//                     <HelpCircle className="w-5 h-5" />
//                     <span className="text-sm">Help & Support</span>
//                 </button>
//             </div>

//           </div>
//         </nav>
//       </aside>

//       <div className="flex-1 flex flex-col">
//         <header className="bg-indigo-700 text-white shadow px-6 py-3 flex justify-between items-center">
//           <div className="flex gap-4">
//             {navItems.map((item, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => navigate(navRoutes[item])}
//                 className="text-sm font-medium px-3 py-1 rounded-md hover:bg-indigo-600 transition"
//               >
//                 {item}
//               </button>
//             ))}
//             <button className="text-sm font-medium px-3 py-1 rounded-md hover:bg-indigo-600 transition">•••</button>
//           </div>

//           <div className="flex items-center gap-4">
//             {/* Chatbot Toggle Button - Added a distinct background for debugging */}
//             <button
//               className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 relative flex items-center justify-center" // Added bg-blue-500 for visibility
//               onClick={() => setIsChatbotOpen(!isChatbotOpen)}
//               aria-label="Open Chatbot"
//             >
//               <MessageSquareText className="w-5 h-5 text-white" /> {/* Added text-white for icon visibility */}
//               {isChatbotOpen && (
//                 <span className="absolute -top-1 -right-1 bg-green-500 rounded-full w-2 h-2 animate-pulse"></span>
//               )}
//             </button>
//             <button className="p-2 rounded hover:bg-indigo-600"><Grid3X3 className="w-5 h-5" /></button>
//             <button className="p-2 rounded hover:bg-indigo-600"><Search className="w-5 h-5" /></button>
//             <button className="p-2 rounded hover:bg-indigo-600"><Calendar className="w-5 h-5" /></button>
//             <button className="p-2 rounded hover:bg-indigo-600"><Settings className="w-5 h-5" /></button>
//             {/* Profile Button with Dropdown */}
//             <div className="relative">
//               <button
//                 className="flex items-center gap-2 p-2 rounded hover:bg-indigo-600"
//                 onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
//               >
//                 <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
//                   <User className="w-4 h-4" />
//                 </div>
//                 <span className="text-sm font-medium">Amit Seth</span>
//                 <ChevronDown className={`w-4 h-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
//               </button>
//               {isProfileMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         <main className="p-6 space-y-6 overflow-auto">
//           {/* Conditional rendering for the main content area */}
//           {location.pathname === '/admin-dashboard' || location.pathname === '/admin-dashboard/' ? (
//             <>
//               {/* Dashboard Summary Content */}
//               <div className="flex items-center gap-4">
//                 <div className="bg-gray-300 p-2 rounded-lg">
//                   <Building2 className="w-6 h-6 text-gray-700" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800">Welcome, Amit</h2>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {metricCards.map((card, idx) => (
//                   <div key={idx} className="bg-white p-5 rounded-xl shadow border border-gray-200">
//                     <div className="flex justify-between items-center mb-2">
//                       <h3 className="text-sm font-medium text-gray-700">{card.title}</h3>
//                       <span className="text-xl">{card.icon}</span>
//                     </div>
//                     <div className="flex items-end gap-2">
//                       <span className="text-3xl font-bold text-gray-900">{card.value}</span>
//                       {card.change && (
//                         <span className={`text-sm font-medium ${
//                           card.changeType === 'negative' ? 'text-red-500' : 'text-green-500'
//                         }`}>
//                           {card.changeType === 'negative' ? '▼' : '▲'} {card.change}
//                         </span>
//                       )}
//                     </div>
//                     {card.lastMonth && (
//                       <p className="text-xs text-gray-500 mt-2">{card.lastMonth}</p>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Dashboard Overview Section with Charts */}
//               <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Dashboard Overview</h3>
//                 <p className="text-gray-600 text-sm mb-4">
//                   This is your main admin dashboard where you can view key metrics and navigate across the business modules. Use the sidebar to access various organizational tools and employee resources.
//                 </p>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="h-64">
//                     <h4 className="text-sm font-semibold text-gray-700 mb-2">Leads vs Deals vs Contacts</h4>
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
//                           {pieData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                   <div className="h-64">
//                     <h4 className="text-sm font-semibold text-gray-700 mb-2">Tasks & Account Statistics</h4>
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart data={barData}>
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>
//               </div>

//               {/* New Section: Strategic Overview (from previous response) */}
//               <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Overview for Team1 Consulting</h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {/* New Clients Onboarded */}
//                   <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
//                     <Users className="w-8 h-8 text-indigo-600" />
//                     <div>
//                       <p className="text-sm text-gray-600">New Clients This Quarter</p>
//                       <p className="text-2xl font-bold text-gray-900">12 <span className="text-green-500 text-base font-medium">▲ 20%</span></p>
//                       <p className="text-xs text-gray-500">vs. Last Quarter: 10</p>
//                     </div>
//                   </div>

//                   {/* Client Retention Rate */}
//                   <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
//                     <UserCheck className="w-8 h-8 text-green-600" />
//                     <div>
//                       <p className="text-sm text-gray-600">Client Retention Rate</p>
//                       <p className="text-2xl font-bold text-gray-900">92% <span className="text-green-500 text-base font-medium">▲ 2%</span></p>
//                       <p className="text-xs text-gray-500">Target: 90%</p>
//                     </div>
//                   </div>

//                   {/* Average Project Value */}
//                   <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
//                     <DollarSign className="w-8 h-8 text-yellow-600" />
//                     <div>
//                       <p className="text-sm text-gray-600">Average Project Value</p>
//                       <p className="text-2xl font-bold text-gray-900">₹8,50,000</p>
//                       <p className="text-xs text-gray-500">Increased by ₹50,000 this month</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-6">
//                   <h4 className="text-md font-semibold text-gray-700 mb-2">Upcoming Key Client Deliverables</h4>
//                   <ul className="list-disc list-inside text-gray-700">
//                     <li>Project Alpha - Phase 2 Completion (June 30)</li>
//                     <li>Client Beta - Strategy Workshop (July 5)</li>
//                     <li>New Client Onboarding - Project Gamma (July 10)</li>
//                   </ul>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <Outlet />
//           )}
//         </main>
//       </div>
//       {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}
//     </div>
//   );
// };

// export default AdminDashboard;


// // AdminDashboard.jsx

// import React, { useState, useEffect } from 'react';

// import { useNavigate, Outlet, useLocation } from 'react-router-dom';

// import { useAuth } from '../context/authContext.jsx'; // Path assumes AdminDashboard.jsx is in a subdirectory of src

// import Chatbot from '../components/chatbot_frontend/Chatbot.jsx'; // Path assumes components is a subdirectory of src



// import {

//   Home, Users, Phone, DollarSign, Calendar, BarChart3, FolderOpen,

//   Building2, FileText, Shield, BookOpen, UserCheck, Gift, Clock, Award,

//   Calculator, ChevronRight, ChevronDown, Search, Settings, User, Grid3X3, HelpCircle, Star, LogOut, MessageSquareText

// } from 'lucide-react';

// import {

//   PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,

// } from 'recharts';



// const AdminDashboard = () => {

//   const [isDigitalAssetsExpanded, setIsDigitalAssetsExpanded] = useState(false);

//   const [isOrganizationMenuExpanded, setIsOrganizationMenuExpanded] = useState(true);

//   const [isEmployeeMenuExpanded, setIsEmployeeMenuExpanded] = useState(true);

//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

//   const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State for chatbot visibility



//   const [selectedMenuItem, setSelectedMenuItem] = useState('AdminDashboard');

//   const navigate = useNavigate();

//   const location = useLocation();

//   const { logout } = useAuth();



//   // Debugging: Log chatbot state every time it changes

//   useEffect(() => {

//     console.log('Chatbot state:', isChatbotOpen ? 'OPEN' : 'CLOSED');

//     if (isChatbotOpen) {

//       console.log('Chatbot should be visible now.');

//     } else {

//       console.log('Chatbot should be hidden now.');

//     }

//   }, [isChatbotOpen]);



//   const menuItems = [

//     { icon: Home, label: 'CRM', route: '/admin-dashboard', hasSubmenu: false },

//     { icon: Building2, label: 'About Team1 Consulting', route: '/admin-dashboard/about', hasSubmenu: false },

//     { icon: Users, label: 'Organizational Structure', route: '/admin-dashboard/org-structure', hasSubmenu: false },

//     { icon: FileText, label: 'Digital Assets', route: '#', hasSubmenu: true, expanded: isDigitalAssetsExpanded },

//     { icon: Shield, label: 'Company Certifications', route: '/admin-dashboard/certifications', hasSubmenu: false },

//     { icon: FileText, label: 'SOPs', route: '/admin-dashboard/sops', hasSubmenu: false },

//     { icon: BookOpen, label: 'E-Library', route: '/admin-dashboard/e-library', hasSubmenu: false },

//   ];



//   const employeeMenuItems = [

//     { icon: Gift, label: 'Holidays', route: '/admin-dashboard/holidays', hasSubmenu: false },

//     { icon: FileText, label: 'Policies', route: '/admin-dashboard/policies', hasSubmenu: false },

//     { icon: DollarSign, label: 'Compensation', route: '/admin-dashboard/compensation', hasSubmenu: false },

//     { icon: Award, label: 'Recognition', route: '/admin-dashboard/recognition', hasSubmenu: false },

//     { icon: Clock, label: 'TimeSheet', route: '/admin-dashboard/timesheet', hasSubmenu: false },

//     { icon: Shield, label: 'Insurance', route: '/admin-dashboard/insurance', hasSubmenu: false },

//     { icon: UserCheck, label: 'Team1Enrich', route: '/admin-dashboard/team1enrich', hasSubmenu: false },

//   ];



//   const navItems = [

//     'Home', 'Sellers', 'Contacts', 'Accounts', 'Deals', 'Tasks', 'Meetings', 'Calls', 'Reports', 'Projects'

//   ];



//   const navRoutes = {

//     Home: '/admin-dashboard',

//     Sellers: '/admin-dashboard/sellers',

//     Contacts: '/admin-dashboard/contacts',

//     Accounts: '/admin-dashboard/accounts',

//     Deals: '/admin-dashboard/deals',

//     Tasks: '/admin-dashboard/tasks',

//     Meetings: '/admin-dashboard/meetings',

//     Calls: '/admin-dashboard/calls',

//     Reports: '/admin-dashboard/reports',

//     Projects: '/admin-dashboard/projects',

//   };



//   const metricCards = [

//     {

//       title: 'Deals Created This Month',

//       value: '137',

//       change: '100%',

//       changeType: 'positive',

//       lastMonth: 'Last Month: 30',

//       icon: '📈'

//     },

//     {

//       title: 'Revenue This Month',

//       value: '12,00,00,000.00',

//       change: '100%',

//       changeType: 'positive',

//       lastMonth: 'Last Month: ₹6,00,00,000.00',

//       icon: '💰'

//     },

//     {

//       title: 'Deals Closing This Month',

//       value: '96',

//       change: '',

//       changeType: 'neutral',

//       lastMonth: '',

//       icon: '🤝'

//     },

//     {

//       title: 'Overdue Tasks',

//       value: '13',

//       change: '',

//       changeType: 'neutral',

//       lastMonth: '',

//       icon: '📋'

//     }

//   ];



//   const pieData = [

//     { name: 'Leads', value: 400 },

//     { name: 'Deals', value: 300 },

//     { name: 'Contacts', value: 300 },

//     { name: 'Tasks', value: 200 },

//     { name: 'Accounts', value: 100 },

//   ];

//   const COLORS = ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE'];



//   const barData = [

//     { name: 'Leads', value: 240 },

//     { name: 'Accounts', value: 130 },

//     { name: 'Deals', value: 200 },

//     { name: 'Tasks', value: 100 },

//     { name: 'Contacts', value: 180 },

//   ];



//   const handleLogout = () => {

//     logout();

//     navigate('/login');

//   };



//   return (

//     <div className="flex h-screen bg-gray-100 text-gray-800">

//       <aside className="w-64 bg-white shadow-lg flex flex-col">

//         {/* Top Section: CRM Portal Logo and Title */}

//         <div className="p-5 border-b flex items-center gap-3">

//           <div className="bg-indigo-600 p-2 rounded-lg">

//             <Grid3X3 className="text-white w-5 h-5" />

//           </div>

//           <h1 className="text-xl font-bold text-indigo-700">CRM Portal</h1>

//         </div>



//         {/* Navigation Menu */}

//         <nav className="flex-1 overflow-auto p-4 custom-scrollbar">

//           <div className="space-y-6">

//             {/* Organization Section */}

//             {/* <div>

//               <button

//                 className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-500 uppercase mb-2 hover:bg-gray-100 rounded-md transition-colors"

//                 onClick={() => setIsOrganizationMenuExpanded(!isOrganizationMenuExpanded)}

//               >

//                 Organization

//                 {isOrganizationMenuExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}

//               </button>

//               {isOrganizationMenuExpanded && (

//                 <div className="space-y-1">

//                   {menuItems.map((item, idx) => (

//                     <button

//                       key={idx}

//                       onClick={() => {

//                         setSelectedMenuItem(item.label);

//                         if (item.label === 'Digital Assets') {

//                           setIsDigitalAssetsExpanded(!isDigitalAssetsExpanded);

//                         } else if (item.route) {

//                           navigate(item.route);

//                         }

//                       }}

//                       className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${

//                         selectedMenuItem === item.label || location.pathname === item.route

//                           ? 'bg-indigo-100 text-indigo-700 font-medium'

//                           : 'hover:bg-gray-100 text-gray-700'

//                       }`}

//                     >

//                       <div className="flex items-center gap-2">

//                         <item.icon className="w-5 h-5" />

//                         <span className="text-sm">{item.label}</span>

//                       </div>

//                       {item.hasSubmenu && (

//                         <ChevronRight className={`w-4 h-4 transition-transform ${

//                           item.expanded ? 'rotate-90' : ''

//                         }`} />

//                       )}

//                     </button>

//                   ))}

//                 </div>

//               )}

//             </div> */}



//             {/* Employees Section */}

//             {/* <div>

//               <button

//                 className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-500 uppercase mb-2 hover:bg-gray-100 rounded-md transition-colors"

//                 onClick={() => setIsEmployeeMenuExpanded(!isEmployeeMenuExpanded)}

//               >

//                 Employees

//                 {isEmployeeMenuExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}

//               </button>

//               {isEmployeeMenuExpanded && (

//                 <div className="space-y-1">

//                   {employeeMenuItems.map((item, idx) => (

//                     <button

//                       key={idx}

//                       onClick={() => {

//                           setSelectedMenuItem(item.label);

//                           if (item.route) {

//                             navigate(item.route);

//                           }

//                       }}

//                       className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${

//                         selectedMenuItem === item.label || location.pathname === item.route

//                           ? 'bg-indigo-100 text-indigo-700 font-medium'

//                           : 'hover:bg-gray-100 text-gray-700'

//                       }`}

//                     >

//                       <item.icon className="w-5 h-5" />

//                       <span className="text-sm">{item.label}</span>

//                     </button>

//                   ))}

//                 </div>

//               )}

//             </div> */}



//             {/* Help & Support */}

//             <div className="pt-6 border-t border-gray-200">

//                 <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Support</h2>

//                 <button

//                     onClick={() => navigate('/admin-dashboard/help')}

//                     className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${

//                         selectedMenuItem === 'Help & Support'

//                             ? 'bg-indigo-100 text-indigo-700 font-medium'

//                             : 'hover:bg-gray-100 text-gray-700'

//                     }`}

//                 >

//                     <HelpCircle className="w-5 h-5" />

//                     <span className="text-sm">Help & Support</span>

//                 </button>

                

//                 {/* AI Assistant Chatbot Button */}

//                 <button

//                     onClick={() => setIsChatbotOpen(!isChatbotOpen)}

//                     className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors mt-1 ${

//                         isChatbotOpen

//                             ? 'bg-blue-100 text-blue-700 font-medium'

//                             : 'hover:bg-gray-100 text-gray-700'

//                     }`}

//                 >

//                     <MessageSquareText className="w-5 h-5" />

//                     <span className="text-sm">AI Assistant</span>

//                     {isChatbotOpen && (

//                         <span className="ml-auto bg-green-500 rounded-full w-2 h-2 animate-pulse"></span>

//                     )}

//                 </button>

//             </div>



//           </div>

//         </nav>

//       </aside>



//       <div className="flex-1 flex flex-col">

//         <header className="bg-indigo-700 text-white shadow px-6 py-3 flex justify-between items-center">

//           <div className="flex gap-4">

//             {navItems.map((item, idx) => (

//               <button

//                 key={idx}

//                 onClick={() => navigate(navRoutes[item])}

//                 className="text-sm font-medium px-3 py-1 rounded-md hover:bg-indigo-600 transition"

//               >

//                 {item}

//               </button>

//             ))}

//             <button className="text-sm font-medium px-3 py-1 rounded-md hover:bg-indigo-600 transition">•••</button>

//           </div>



//           <div className="flex items-center gap-4">

//             <button className="p-2 rounded hover:bg-indigo-600"><Grid3X3 className="w-5 h-5" /></button>

//             <button className="p-2 rounded hover:bg-indigo-600"><Search className="w-5 h-5" /></button>

//             <button className="p-2 rounded hover:bg-indigo-600"><Calendar className="w-5 h-5" /></button>

//             <button className="p-2 rounded hover:bg-indigo-600"><Settings className="w-5 h-5" /></button>

//             {/* Profile Button with Dropdown */}

//             <div className="relative">

//               <button

//                 className="flex items-center gap-2 p-2 rounded hover:bg-indigo-600"

//                 onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}

//               >

//                 <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">

//                   <User className="w-4 h-4" />

//                 </div>

//                 <span className="text-sm font-medium">Amit Seth</span>

//                 <ChevronDown className={`w-4 h-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />

//               </button>

//               {isProfileMenuOpen && (

//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">

//                   <button

//                     onClick={handleLogout}

//                     className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"

//                   >

//                     <LogOut className="w-4 h-4" />

//                     Logout

//                   </button>

//                 </div>

//               )}

//             </div>

//           </div>

//         </header>



//         <main className="p-6 space-y-6 overflow-auto">

//           {/* Conditional rendering for the main content area */}

//           {location.pathname === '/admin-dashboard' || location.pathname === '/admin-dashboard/' ? (

//             <>

//               {/* Dashboard Summary Content */}

//               <div className="flex items-center gap-4">

//                 <div className="bg-gray-300 p-2 rounded-lg">

//                   <Building2 className="w-6 h-6 text-gray-700" />

//                 </div>

//                 <h2 className="text-2xl font-bold text-gray-800">Welcome, Amit</h2>

//               </div>



//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

//                 {metricCards.map((card, idx) => (

//                   <div key={idx} className="bg-white p-5 rounded-xl shadow border border-gray-200">

//                     <div className="flex justify-between items-center mb-2">

//                       <h3 className="text-sm font-medium text-gray-700">{card.title}</h3>

//                       <span className="text-xl">{card.icon}</span>

//                     </div>

//                     <div className="flex items-end gap-2">

//                       <span className="text-3xl font-bold text-gray-900">{card.value}</span>

//                       {card.change && (

//                         <span className={`text-sm font-medium ${

//                           card.changeType === 'negative' ? 'text-red-500' : 'text-green-500'

//                         }`}>

//                           {card.changeType === 'negative' ? '▼' : '▲'} {card.change}

//                         </span>

//                       )}

//                     </div>

//                     {card.lastMonth && (

//                       <p className="text-xs text-gray-500 mt-2">{card.lastMonth}</p>

//                     )}

//                   </div>

//                 ))}

//               </div>



//               {/* Dashboard Overview Section with Charts */}

//               <div className="bg-white p-6 rounded-lg shadow border border-gray-200">

//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Dashboard Overview</h3>

//                 <p className="text-gray-600 text-sm mb-4">

//                   This is your main admin dashboard where you can view key metrics and navigate across the business modules. Use the sidebar to access various organizational tools and employee resources.

//                 </p>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                   <div className="h-64">

//                     <h4 className="text-sm font-semibold text-gray-700 mb-2">Leads vs Deals vs Contacts</h4>

//                     <ResponsiveContainer width="100%" height="100%">

//                       <PieChart>

//                         <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>

//                           {pieData.map((entry, index) => (

//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

//                           ))}

//                         </Pie>

//                         <Tooltip />

//                       </PieChart>

//                     </ResponsiveContainer>

//                   </div>

//                   <div className="h-64">

//                     <h4 className="text-sm font-semibold text-gray-700 mb-2">Tasks & Account Statistics</h4>

//                     <ResponsiveContainer width="100%" height="100%">

//                       <BarChart data={barData}>

//                         <XAxis dataKey="name" />

//                         <YAxis />

//                         <Tooltip />

//                         <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />

//                       </BarChart>

//                     </ResponsiveContainer>

//                   </div>

//                 </div>

//               </div>



//               {/* New Section: Strategic Overview (from previous response) */}

//               <div className="bg-white p-6 rounded-lg shadow border border-gray-200">

//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Overview for Team1 Consulting</h3>



//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//                   {/* New Clients Onboarded */}

//                   <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">

//                     <Users className="w-8 h-8 text-indigo-600" />

//                     <div>

//                       <p className="text-sm text-gray-600">New Clients This Quarter</p>

//                       <p className="text-2xl font-bold text-gray-900">12 <span className="text-green-500 text-base font-medium">▲ 20%</span></p>

//                       <p className="text-xs text-gray-500">vs. Last Quarter: 10</p>

//                     </div>

//                   </div>



//                   {/* Client Retention Rate */}

//                   <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">

//                     <UserCheck className="w-8 h-8 text-green-600" />

//                     <div>

//                       <p className="text-sm text-gray-600">Client Retention Rate</p>

//                       <p className="text-2xl font-bold text-gray-900">92% <span className="text-green-500 text-base font-medium">▲ 2%</span></p>

//                       <p className="text-xs text-gray-500">Target: 90%</p>

//                     </div>

//                   </div>



//                   {/* Average Project Value */}

//                   <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">

//                     <DollarSign className="w-8 h-8 text-yellow-600" />

//                     <div>

//                       <p className="text-sm text-gray-600">Average Project Value</p>

//                       <p className="text-2xl font-bold text-gray-900">₹8,50,000</p>

//                       <p className="text-xs text-gray-500">Increased by ₹50,000 this month</p>

//                     </div>

//                   </div>

//                 </div>



//                 <div className="mt-6">

//                   <h4 className="text-md font-semibold text-gray-700 mb-2">Upcoming Key Client Deliverables</h4>

//                   <ul className="list-disc list-inside text-gray-700">

//                     <li>Project Alpha - Phase 2 Completion (June 30)</li>

//                     <li>Client Beta - Strategy Workshop (July 5)</li>

//                     <li>New Client Onboarding - Project Gamma (July 10)</li>

//                   </ul>

//                 </div>

//               </div>

//             </>

//           ) : (

//             <Outlet />

//           )}

//         </main>

//       </div>

//       {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}

//     </div>

//   );

// };



// export default AdminDashboard;



  // AdminDashboard.jsx

  import React, { useState, useEffect, useCallback } from 'react';
  import { useNavigate, Outlet, useLocation } from 'react-router-dom';
  import { useAuth } from '../context/authContext.jsx'; // Corrected import path based on common structure
  import Chatbot from '../components/chatbot_frontend/Chatbot.jsx'; // Corrected import path based on common structure

  import {
    Home, Users, Phone, DollarSign, Calendar, BarChart3, FolderOpen,
    Building2, FileText, Shield, BookOpen, UserCheck, Gift, Clock, Award,
    Calculator, ChevronRight, ChevronDown, Search, Settings,  IndianRupee, User, Grid3X3, HelpCircle, Star, LogOut, MessageSquareText
  } from 'lucide-react';
  import {
    PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  } from 'recharts';

  const API_BASE_URL = 'http://localhost:3000/api'; // Define API base URL

  const AdminDashboard = () => {
    const [isDigitalAssetsExpanded, setIsDigitalAssetsExpanded] = useState(false);
    const [isOrganizationMenuExpanded, setIsOrganizationMenuExpanded] = useState(true);
    const [isEmployeeMenuExpanded, setIsEmployeeMenuExpanded] = useState(true);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State for chatbot visibility

    const [selectedMenuItem, setSelectedMenuItem] = useState('AdminDashboard');
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, user: currentUser, loading: authLoading } = useAuth(); // Destructure user (as currentUser) and loading from useAuth

    // State for company-wide metrics and data
    const [adminMetrics, setAdminMetrics] = useState({
      dealsCreatedThisMonth: '0',
      revenueThisMonth: '0.00',
      dealsClosingThisMonth: '0',
      overdueDeals: '0',
    });

    const [adminChartData, setAdminChartData] = useState({
      pie: [],
      bar: []
    });
    const [adminStrategicMetrics, setAdminStrategicMetrics] = useState({
      newClientsThisQuarter: '0',
      avgProjectValue: 'N/A',
      upcomingHighPriorityDeliverables: [],
    });
    const [loadingMetrics, setLoadingMetrics] = useState(true);


    // Debugging: Log chatbot state every time it changes
    useEffect(() => {
      console.log('Chatbot state:', isChatbotOpen ? 'OPEN' : 'CLOSED');
    }, [isChatbotOpen]);

    const COLORS = ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE'];

    // Helper function to get the first name
    const getFirstName = (fullName) => {
      if (!fullName) return '';
      return fullName.split(' ')[0];
    };

    // Function to fetch and process company-wide data
    const fetchAllDataAndCalculateMetrics = useCallback(async () => {
      // Only proceed if authentication is complete
      if (authLoading) {
        setLoadingMetrics(false); // Still loading auth, so stop metric loading for now
        return;
      }

      setLoadingMetrics(true);
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      const currentQuarter = Math.floor(currentMonth / 3);

      let allDeals = [];
      let allTasks = [];
      let allAccounts = [];
      let allContacts = [];
      let allSellers = []; // Assuming 'seller' is your leads module

      try {
        // Fetch all necessary data
        const [dealsRes, tasksRes, accountsRes, contactsRes, sellersRes] = await Promise.all([
          fetch(`${API_BASE_URL}/deal`),
          fetch(`${API_BASE_URL}/task`),
          fetch(`${API_BASE_URL}/account`),
          fetch(`${API_BASE_URL}/contact`),
          fetch(`${API_BASE_URL}/seller`),
        ]);

        if (dealsRes.ok) allDeals = await dealsRes.json();
        if (tasksRes.ok) allTasks = await tasksRes.json();
        if (accountsRes.ok) allAccounts = await accountsRes.json();
        if (contactsRes.ok) allContacts = await contactsRes.json();
        if (sellersRes.ok) allSellers = await sellersRes.json();

        // --- Calculate Dashboard Overview Metrics (Company-wide) ---
        let dealsCreatedThisMonth = 0;
        let revenueThisMonth = 0;
        let dealsClosingThisMonth = 0;
        let overdueDeals = 0;

        const completedOrLostStages = ['Closed Won', 'Lost', 'Implemented', 'Win', 'PO received'];

        allDeals.forEach(deal => {
          const dealCreatedAt = new Date(deal.createdAt); // Assuming 'createdAt' field for deal creation date
          const dealCloseDate = new Date(deal.closeDate);

          // Deals Created This Month
          if (dealCreatedAt.getMonth() === currentMonth && dealCreatedAt.getFullYear() === currentYear) {
            dealsCreatedThisMonth++;
          }

          // Revenue This Month (for deals created this month)
          if (dealCreatedAt.getMonth() === currentMonth && dealCreatedAt.getFullYear() === currentYear && deal.amount) {
              revenueThisMonth += parseFloat(deal.amount);
          }

          // Deals Closing This Month
          if (dealCloseDate.getMonth() === currentMonth && dealCloseDate.getFullYear() === currentYear) {
            dealsClosingThisMonth++;
          }

          // Overdue Deals: Close date in past AND not in a "completed" or "lost" stage
          if (dealCloseDate < now && !completedOrLostStages.includes(deal.salesStage)) {
            overdueDeals++;
          }
        });

        setAdminMetrics({
          dealsCreatedThisMonth: String(dealsCreatedThisMonth),
          revenueThisMonth: revenueThisMonth.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }),
          dealsClosingThisMonth: String(dealsClosingThisMonth),
          overdueDeals: String(overdueDeals),
        });

        // --- Calculate data for Charts (All Entity Counts) ---
        const chartPieData = [
          { name: 'Sellers (Leads)', value: allSellers.length },
          { name: 'Deals', value: allDeals.length },
          { name: 'Contacts', value: allContacts.length },
          { name: 'Tasks', value: allTasks.length },
          { name: 'Accounts', value: allAccounts.length },
        ];

        const chartBarData = [
          { name: 'Sellers', value: allSellers.length },
          { name: 'Accounts', value: allAccounts.length },
          { name: 'Deals', value: allDeals.length },
          { name: 'Tasks', value: allTasks.length },
          { name: 'Contacts', value: allContacts.length },
        ];
        setAdminChartData({ pie: chartPieData, bar: chartBarData });

        // --- Calculate Strategic Overview Metrics (Company-wide) ---
        let newClientsThisQuarter = 0;
        allAccounts.forEach(account => {
          // Assuming 'createdAt' field exists on accounts for creation date
          if (account.createdAt) {
            const accountCreationDate = new Date(account.createdAt);
            const accountCreationQuarter = Math.floor(accountCreationDate.getMonth() / 3);
            if (accountCreationDate.getFullYear() === currentYear && accountCreationQuarter === currentQuarter) {
              newClientsThisQuarter++;
            }
          }
        });

        let totalProjectValue = 0;
        allDeals.forEach(deal => {
          if (deal.amount) {
            totalProjectValue += parseFloat(deal.amount);
          }
        });
        const avgProjectValue = allDeals.length > 0 ? (totalProjectValue / allDeals.length) : 0;
        
        // Filter for high priority upcoming tasks (company-wide)
        const upcomingHighPriorityDeliverables = allTasks
          .filter(task => new Date(task.dueDate) > now && task.priority === 'High')
          .map(task => `${task.subject} (${new Date(task.dueDate).toLocaleDateString()})`);

        setAdminStrategicMetrics({
          newClientsThisQuarter: String(newClientsThisQuarter),
          avgProjectValue: avgProjectValue.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }),
          upcomingHighPriorityDeliverables: upcomingHighPriorityDeliverables.slice(0, 5), // Limit to top 5 upcoming
        });

      } catch (error) {
        console.error('Error fetching company-wide data:', error);
        // Fallback to initial empty states or sample data if needed
        setAdminMetrics({ dealsCreatedThisMonth: 'N/A', revenueThisMonth: 'N/A', dealsClosingThisMonth: 'N/A', overdueDeals: 'N/A' });
        setAdminChartData({ pie: [], bar: [] });
        setAdminStrategicMetrics({ newClientsThisQuarter: 'N/A', avgProjectValue: 'N/A', upcomingHighPriorityDeliverables: [] });
      } finally {
        setLoadingMetrics(false);
      }
    }, [authLoading]); // Dependencies: re-run when auth loading state changes

    // Trigger data fetching when auth state changes
    useEffect(() => {
      fetchAllDataAndCalculateMetrics();
    }, [fetchAllDataAndCalculateMetrics]);


    const menuItems = [
      { icon: Home, label: 'CRM', route: '/admin-dashboard', hasSubmenu: false },
      { icon: Building2, label: 'About Team1 Consulting', route: '/admin-dashboard/about', hasSubmenu: false },
      { icon: Users, label: 'Organizational Structure', route: '/admin-dashboard/org-structure', hasSubmenu: false },
      { icon: FileText, label: 'Digital Assets', route: '#', hasSubmenu: true, expanded: isDigitalAssetsExpanded },
      { icon: Shield, label: 'Company Certifications', route: '/admin-dashboard/certifications', hasSubmenu: false },
      { icon: FileText, label: 'SOPs', route: '/admin-dashboard/sops', hasSubmenu: false },
      { icon: BookOpen, label: 'E-Library', route: '/admin-dashboard/e-library', hasSubmenu: false },
    ];

    const employeeMenuItems = [
      { icon: Gift, label: 'Holidays', route: '/admin-dashboard/holidays', hasSubmenu: false },
      { icon: FileText, label: 'Policies', route: '/admin-dashboard/policies', hasSubmenu: false },
      { icon: DollarSign, label: 'Compensation', route: '/admin-dashboard/compensation', hasSubmenu: false },
      { icon: Award, label: 'Recognition', route: '/admin-dashboard/recognition', hasSubmenu: false },
      { icon: Clock, label: 'TimeSheet', route: '/admin-dashboard/timesheet', hasSubmenu: false },
      { icon: Shield, label: 'Insurance', route: '/admin-dashboard/insurance', hasSubmenu: false },
      { icon: UserCheck, label: 'Team1Enrich', route: '/admin-dashboard/team1enrich', hasSubmenu: false },
    ];

    const navItems = [
      'Home', 'Sellers', 'Contacts', 'Accounts', 'Deals', 'Tasks', 'Meetings', 'Calls', 'Reports', 'Projects'
    ];

    const navRoutes = {
      Home: '/admin-dashboard',
      Sellers: '/admin-dashboard/sellers',
      Contacts: '/admin-dashboard/contacts',
      Accounts: '/admin-dashboard/accounts',
      Deals: '/admin-dashboard/deals',
      Tasks: '/admin-dashboard/tasks',
      Meetings: '/admin-dashboard/meetings',
      Calls: '/admin-dashboard/calls',
      Reports: '/admin-dashboard/reports',
      Projects: '/admin-dashboard/projects',
    };

    const handleLogout = () => {
      logout();
      navigate('/login');
    };

    if (authLoading || loadingMetrics) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
          <div className="text-gray-600 text-lg">Loading Admin Dashboard Data...</div>
        </div>
      );
    }

    return (
      <div className="flex h-screen bg-gray-100 text-gray-800">
        <aside className="w-64 bg-white shadow-lg flex flex-col">
          {/* Top Section: CRM Portal Logo and Title */}
          <div className="p-5 border-b flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Grid3X3 className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-indigo-700">CRM Portal</h1>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-auto p-4 custom-scrollbar">
            <div className="space-y-6">
              {/* You can uncomment and utilize the Organization and Employee sections if needed */}
              {/*
              <div>
                <button
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-500 uppercase mb-2 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setIsOrganizationMenuExpanded(!isOrganizationMenuExpanded)}
                >
                  Organization
                  {isOrganizationMenuExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {isOrganizationMenuExpanded && (
                  <div className="space-y-1">
                    {menuItems.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedMenuItem(item.label);
                          if (item.label === 'Digital Assets') {
                            setIsDigitalAssetsExpanded(!isDigitalAssetsExpanded);
                          } else if (item.route) {
                            navigate(item.route);
                          }
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                          selectedMenuItem === item.label || location.pathname === item.route
                            ? 'bg-indigo-100 text-indigo-700 font-medium'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="w-5 h-5" />
                          <span className="text-sm">{item.label}</span>
                        </div>
                        {item.hasSubmenu && (
                          <ChevronRight className={`w-4 h-4 transition-transform ${
                            item.expanded ? 'rotate-90' : ''
                          }`} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-500 uppercase mb-2 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setIsEmployeeMenuExpanded(!isEmployeeMenuExpanded)}
                >
                  Employees
                  {isEmployeeMenuExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {isEmployeeMenuExpanded && (
                  <div className="space-y-1">
                    {employeeMenuItems.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                            setSelectedMenuItem(item.label);
                            if (item.route) {
                              navigate(item.route);
                            }
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                          selectedMenuItem === item.label || location.pathname === item.route
                            ? 'bg-indigo-100 text-indigo-700 font-medium'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              */}

              {/* Help & Support */}
              <div className="pt-6 border-t border-gray-200">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Support</h2>
                  <button
                      onClick={() => navigate('/admin-dashboard/help')}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                          selectedMenuItem === 'Help & Support'
                              ? 'bg-indigo-100 text-indigo-700 font-medium'
                              : 'hover:bg-gray-100 text-gray-700'
                      }`}
                  >
                      <HelpCircle className="w-5 h-5" />
                      <span className="text-sm">Help & Support</span>
                  </button>
                  
                  {/* AI Assistant Chatbot Button */}
                  <button
                      onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors mt-1 ${
                          isChatbotOpen
                              ? 'bg-blue-100 text-blue-700 font-medium'
                              : 'hover:bg-gray-100 text-gray-700'
                      }`}
                  >
                      <MessageSquareText className="w-5 h-5" />
                      <span className="text-sm">AI Assistant</span>
                      {isChatbotOpen && (
                          <span className="ml-auto bg-green-500 rounded-full w-2 h-2 animate-pulse"></span>
                      )}
                  </button>
              </div>

            </div>
          </nav>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="bg-indigo-700 text-white shadow px-6 py-3 flex justify-between items-center">
            <div className="flex gap-4">
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(navRoutes[item])}
                  className="text-sm font-medium px-3 py-1 rounded-md hover:bg-indigo-600 transition"
                >
                  {item}
                </button>
              ))}
              <button className="text-sm font-medium px-3 py-1 rounded-md hover:bg-indigo-600 transition">•••</button>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded hover:bg-indigo-600"><Grid3X3 className="w-5 h-5" /></button>
              <button className="p-2 rounded hover:bg-indigo-600"><Search className="w-5 h-5" /></button>
              <button className="p-2 rounded hover:bg-indigo-600"><Calendar className="w-5 h-5" /></button>
              <button className="p-2 rounded hover:bg-indigo-600"><Settings className="w-5 h-5" /></button>
              {/* Profile Button with Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center gap-2 p-2 rounded hover:bg-indigo-600"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  {/* Display dynamic user full name */}
                  <span className="text-sm font-medium">{currentUser?.name || 'Guest'}</span> 
                  <ChevronDown className={`w-4 h-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="p-6 space-y-6 overflow-auto">
            {/* Conditional rendering for the main content area */}
            {location.pathname === '/admin-dashboard' || location.pathname === '/admin-dashboard/' ? (
              <>
                {/* Dashboard Summary Content */}
                <div className="flex items-center gap-4">
                  <div className="bg-gray-300 p-2 rounded-lg">
                    <Building2 className="w-6 h-6 text-gray-700" />
                  </div>
                  {/* Display dynamic welcome message with first name */}
                  <h2 className="text-2xl font-bold text-gray-800">Welcome, {getFirstName(currentUser?.name) || 'Admin'}</h2> 
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Dynamically rendered metric cards */}
                  <div className="bg-white p-5 rounded-xl shadow border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium text-gray-700">Deals Created This Month</h3>
                      <span className="text-xl">📈</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-gray-900">{adminMetrics.dealsCreatedThisMonth}</span>
                      <span className="text-sm font-medium text-green-500"></span> {/* Change % logic needs more data */}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Company-wide deals</p>
                  </div>

                  <div className="bg-white p-5 rounded-xl shadow border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium text-gray-700">Revenue This Month</h3>
                      <span className="text-xl">💰</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-gray-900">{adminMetrics.revenueThisMonth}</span>
                      <span className="text-sm font-medium text-green-500"></span> {/* Change % logic needs more data */}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Company-wide revenue</p>
                  </div>

                  <div className="bg-white p-5 rounded-xl shadow border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium text-gray-700">Deals Closing This Month</h3>
                      <span className="text-xl">🤝</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-gray-900">{adminMetrics.dealsClosingThisMonth}</span>
                      <span className="text-sm font-medium text-gray-500"></span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Company-wide deals</p>
                  </div>

                  <div className="bg-white p-5 rounded-xl shadow border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium text-gray-700">Overdue Deals</h3>
                      <span className="text-xl">📋</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-gray-900">{adminMetrics.overdueDeals}</span>
                      <span className="text-sm font-medium text-gray-500"></span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Company-wide overdue deals</p>
                  </div>
                </div>

                {/* Dashboard Overview Section with Charts */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Company CRM Overview</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    This section provides a summary of all CRM activities across the company.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-64">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Company Leads, Deals, Contacts & Tasks</h4>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={adminChartData.pie} dataKey="value" nameKey="name" outerRadius={80} label>
                            {adminChartData.pie.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="h-64">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Company Entity Statistics</h4>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={adminChartData.bar}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* New Section: Strategic Overview (Company-wide) */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Strategic Overview</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* New Clients Onboarded */}
                    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                      <Users className="w-8 h-8 text-indigo-600" />
                      <div>
                        <p className="text-sm text-gray-600">New Clients This Quarter</p>
                        <p className="text-2xl font-bold text-gray-900">{adminStrategicMetrics.newClientsThisQuarter}</p>
                        <p className="text-xs text-gray-500">Across all accounts</p>
                      </div>
                    </div>

                    {/* Average Project Value */}
                    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                      <IndianRupee className="w-8 h-8 text-yellow-600" />
                      <div>
                        <p className="text-sm text-gray-600">Average Project Value</p>
                        <p className="text-2xl font-bold text-gray-900">{adminStrategicMetrics.avgProjectValue}</p>
                        <p className="text-xs text-gray-500">Across all deals</p>
                      </div>
                    </div>
                    {/* Client Retention Rate removed */}
                  </div>

                  <div className="mt-6">
                    <h4 className="text-md font-semibold text-gray-700 mb-2">Upcoming High Priority Deliverables (Company-wide)</h4>
                    {adminStrategicMetrics.upcomingHighPriorityDeliverables.length > 0 ? (
                      <ul className="list-disc list-inside text-gray-700">
                        {adminStrategicMetrics.upcomingHighPriorityDeliverables.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm">No high priority upcoming deliverables found for the company.</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <Outlet />
            )}
          </main>
        </div>
        {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}
      </div>
    );
  };

  export default AdminDashboard;
