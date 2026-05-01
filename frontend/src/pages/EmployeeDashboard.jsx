// EmployeeDashboard.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
// Path from src/pages/EmployeeDashboard.jsx to src/context/AuthContext.jsx is ../context/AuthContext
import { useAuth } from '../context/authContext'; 

// Path from src/pages/EmployeeDashboard.jsx to src/components/chatbot_frontend/Chatbot.jsx is ../components/chatbot_frontend/Chatbot.jsx
import Chatbot from '../components/chatbot_frontend/Chatbot.jsx'; 

import {
  Home, Users, Phone, DollarSign, Calendar, BarChart3, FolderOpen,
  Building2, FileText, Shield, BookOpen, UserCheck, Gift, Clock, Award,
  Calculator, ChevronRight, ChevronDown, Search, Settings, User, Grid3X3, HelpCircle, Star, LogOut, MessageSquareText
} from 'lucide-react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

const API_BASE_URL = 'http://localhost:3000/api'; // Define API base URL

const EmployeeDashboard = () => {
  const [isDigitalAssetsExpanded, setIsDigitalAssetsExpanded] = useState(false);
  const [isOrganizationMenuExpanded, setIsOrganizationMenuExpanded] = useState(true);
  const [isEmployeeMenuExpanded, setIsEmployeeMenuExpanded] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State for chatbot visibility

  const [selectedMenuItem, setSelectedMenuItem] = useState('AdminDashboard');
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user: currentUser, loading: authLoading } = useAuth(); // Destructure user (as currentUser) and loading from useAuth

  // State for user-specific metrics and data
  const [userMetrics, setUserMetrics] = useState({
    dealsCreatedThisMonth: '0',
    revenueThisMonth: '0.00',
    dealsClosingThisMonth: '0',
    overdueDeals: '0', // Changed from overdueTasks
  });

  const [userChartData, setUserChartData] = useState({
    pie: [],
    bar: []
  });
  const [userStrategicMetrics, setUserStrategicMetrics] = useState({
    newClientsThisQuarter: '0',
    avgProjectValue: 'N/A', // Updated to be dynamic
    upcomingHighPriorityDeliverables: [], // Updated name
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

  // Function to fetch and process user-specific data
  const fetchUserSpecificData = useCallback(async () => {
    // Only proceed if authentication is complete and user is available
    if (authLoading || !currentUser || !currentUser.name) {
      setLoadingMetrics(false); // Still loading auth or no user, so stop metric loading
      return;
    }

    setLoadingMetrics(true);
    const userName = currentUser.name;
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentQuarter = Math.floor(currentMonth / 3);

    let allDeals = [];
    let allTasks = [];
    let allAccounts = [];
    let allContacts = [];
    let allSellers = [];

    try {
      // Fetch all necessary data
      const [dealsRes, tasksRes, accountsRes, contactsRes, sellersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/deal`),
        fetch(`${API_BASE_URL}/task`),
        fetch(`${API_BASE_URL}/account`),
        fetch(`${API_BASE_URL}/contact`),
        fetch(`${API_BASE_URL}/seller`), // Assuming 'seller' is your leads module
      ]);

      if (dealsRes.ok) allDeals = await dealsRes.json();
      if (tasksRes.ok) allTasks = await tasksRes.json();
      if (accountsRes.ok) allAccounts = await accountsRes.json();
      if (contactsRes.ok) allContacts = await contactsRes.json();
      if (sellersRes.ok) allSellers = await sellersRes.json();

      // Filter data owned by the current user
      const userDeals = allDeals.filter(d => d.dealOwner === userName);
      const userTasks = allTasks.filter(t => t.taskOwner === userName);
      const userAccounts = allAccounts.filter(a => a.accountOwner === userName); // Assuming 'accountOwner' field
      const userContacts = allContacts.filter(c => c.contactOwner === userName); // Assuming 'contactOwner' field
      const userSellers = allSellers.filter(s => s.sellerOwner === userName); // Assuming 'sellerOwner' field for leads

      // --- Calculate Dashboard Overview Metrics ---
      let dealsCreatedThisMonth = 0;
      let revenueThisMonth = 0;
      let dealsClosingThisMonth = 0;
      let overdueDeals = 0;

      const completedOrLostStages = ['Closed Won', 'Lost', 'Implemented', 'Win', 'PO received'];

      userDeals.forEach(deal => {
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

      setUserMetrics({
        dealsCreatedThisMonth: String(dealsCreatedThisMonth),
        revenueThisMonth: revenueThisMonth.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }),
        dealsClosingThisMonth: String(dealsClosingThisMonth),
        overdueDeals: String(overdueDeals),
      });

      // --- Calculate data for Charts (Owned Entity Counts) ---
      const chartPieData = [
        { name: 'Leads (Owned)', value: userSellers.length },
        { name: 'Deals (Owned)', value: userDeals.length },
        { name: 'Contacts (Owned)', value: userContacts.length },
        { name: 'Tasks (Owned)', value: userTasks.length },
        { name: 'Accounts (Owned)', value: userAccounts.length },
      ];

      const chartBarData = [
        { name: 'Leads', value: userSellers.length },
        { name: 'Accounts', value: userAccounts.length },
        { name: 'Deals', value: userDeals.length },
        { name: 'Tasks', value: userTasks.length },
        { name: 'Contacts', value: userContacts.length },
      ];
      setUserChartData({ pie: chartPieData, bar: chartBarData });

      // --- Calculate Strategic Overview Metrics (User Specific) ---
      let newClientsThisQuarter = 0;
      userAccounts.forEach(account => {
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
      userDeals.forEach(deal => {
        if (deal.amount) {
          totalProjectValue += parseFloat(deal.amount);
        }
      });
      const avgProjectValue = userDeals.length > 0 ? (totalProjectValue / userDeals.length) : 0;
      
      // Filter for high priority upcoming tasks
      const upcomingHighPriorityDeliverables = userTasks
        .filter(task => new Date(task.dueDate) > now && task.priority === 'High')
        .map(task => `${task.subject} (${new Date(task.dueDate).toLocaleDateString()})`);

      setUserStrategicMetrics({
        newClientsThisQuarter: String(newClientsThisQuarter),
        avgProjectValue: avgProjectValue.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }),
        upcomingHighPriorityDeliverables: upcomingHighPriorityDeliverables.slice(0, 5), // Limit to top 5 upcoming
      });

    } catch (error) {
      console.error('Error fetching user-specific data:', error);
      // Fallback to initial empty states or sample data if needed
      setUserMetrics({ dealsCreatedThisMonth: 'N/A', revenueThisMonth: 'N/A', dealsClosingThisMonth: 'N/A', overdueDeals: 'N/A' });
      setUserChartData({ pie: [], bar: [] });
      setUserStrategicMetrics({ newClientsThisQuarter: 'N/A', avgProjectValue: 'N/A', upcomingHighPriorityDeliverables: [] });
    } finally {
      setLoadingMetrics(false);
    }
  }, [currentUser, authLoading]); // Dependencies: re-run when user or auth loading state changes

  // Trigger data fetching when auth state changes
  useEffect(() => {
    fetchUserSpecificData();
  }, [fetchUserSpecificData]);


  const menuItems = [
    { icon: Home, label: 'CRM', route: '/employee-dashboard', hasSubmenu: false }, // Changed route to employee-dashboard
    { icon: Building2, label: 'About Team1 Consulting', route: '/employee-dashboard/about', hasSubmenu: false },
    { icon: Users, label: 'Organizational Structure', route: '/employee-dashboard/org-structure', hasSubmenu: false },
    { icon: FileText, label: 'Digital Assets', route: '#', hasSubmenu: true, expanded: isDigitalAssetsExpanded },
    { icon: Shield, label: 'Company Certifications', route: '/employee-dashboard/certifications', hasSubmenu: false },
    { icon: FileText, label: 'SOPs', route: '/employee-dashboard/sops', hasSubmenu: false },
    { icon: BookOpen, label: 'E-Library', route: '/employee-dashboard/e-library', hasSubmenu: false },
  ];

  const employeeMenuItems = [ // These might not be directly linked to employee dashboard, adjust as needed
    { icon: Gift, label: 'Holidays', route: '/employee-dashboard/holidays', hasSubmenu: false },
    { icon: FileText, label: 'Policies', route: '/employee-dashboard/policies', hasSubmenu: false },
    { icon: DollarSign, label: 'Compensation', route: '/employee-dashboard/compensation', hasSubmenu: false },
    { icon: Award, label: 'Recognition', route: '/employee-dashboard/recognition', hasSubmenu: false },
    { icon: Clock, label: 'TimeSheet', route: '/employee-dashboard/timesheet', hasSubmenu: false },
    { icon: Shield, label: 'Insurance', route: '/employee-dashboard/insurance', hasSubmenu: false },
    { icon: UserCheck, label: 'Team1Enrich', route: '/employee-dashboard/team1enrich', hasSubmenu: false },
  ];

  const navItems = [
    'Home', 'Leads', 'Contacts', 'Accounts', 'Deals', 'Tasks', 'Meetings', 'Calls', 'Reports', 'Projects'
  ];

  const navRoutes = {
    Home: '/employee-dashboard',
    Leads: '/employee-dashboard/sellers', 
    Contacts: '/employee-dashboard/contacts',
    Accounts: '/employee-dashboard/accounts',
    Deals: '/employee-dashboard/deals',
    Tasks: '/employee-dashboard/tasks',
    Meetings: '/employee-dashboard/meetings',
    Calls: '/employee-dashboard/calls',
    Reports: '/employee-dashboard/reports',
    Projects: '/employee-dashboard/projects',
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (authLoading || loadingMetrics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
        <div className="text-gray-600 text-lg">Loading Dashboard Data...</div>
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

            {/* Help & Support */}
            <div className="pt-6 border-t border-gray-200">
                <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Support</h2>
                <button
                    onClick={() => navigate('/employee-dashboard/help')} // Adjusted route
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
                {/* This will display the full name from currentUser.name */}
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
          {location.pathname === '/employee-dashboard' || location.pathname === '/employee-dashboard/' ? (
            <>
              {/* Dashboard Summary Content */}
              <div className="flex items-center gap-4">
                <div className="bg-gray-300 p-2 rounded-lg">
                  <Building2 className="w-6 h-6 text-gray-700" />
                </div>
                {/* This will display the first name using the helper function */}
                <h2 className="text-2xl font-bold text-gray-800">Welcome, {getFirstName(currentUser?.name) || 'User'}</h2> 
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Dynamically rendered metric cards */}
                <div className="bg-white p-5 rounded-xl shadow border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Deals Created This Month</h3>
                    <span className="text-xl">📈</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-gray-900">{userMetrics.dealsCreatedThisMonth}</span>
                    <span className="text-sm font-medium text-green-500"></span> {/* Change % logic needs more data */}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Based on your owned deals</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Revenue This Month</h3>
                    <span className="text-xl">💰</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-gray-900">{userMetrics.revenueThisMonth}</span>
                    <span className="text-sm font-medium text-green-500"></span> {/* Change % logic needs more data */}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Based on your owned deals</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Deals Closing This Month</h3>
                    <span className="text-xl">🤝</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-gray-900">{userMetrics.dealsClosingThisMonth}</span>
                    <span className="text-sm font-medium text-gray-500"></span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Based on your owned deals</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Overdue Deals</h3> {/* Updated title */}
                    <span className="text-xl">📋</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-gray-900">{userMetrics.overdueDeals}</span>
                    <span className="text-sm font-medium text-gray-500"></span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Based on your owned deals</p>
                </div>
              </div>

              {/* Dashboard Overview Section with Charts */}
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your CRM Overview</h3>
                <p className="text-gray-600 text-sm mb-4">
                  This section provides a summary of your personal CRM activities and owned entities.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-64">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Your Leads, Deals, Contacts & Tasks</h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={userChartData.pie} dataKey="value" nameKey="name" outerRadius={80} label>
                          {userChartData.pie.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="h-64">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Your Entity Statistics</h4> {/* More general title */}
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={userChartData.bar}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* New Section: Strategic Overview (User Specific) */}
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Strategic Overview</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* New Clients Onboarded */}
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <Users className="w-8 h-8 text-indigo-600" />
                    <div>
                      <p className="text-sm text-gray-600">New Clients This Quarter (Owned)</p>
                      <p className="text-2xl font-bold text-gray-900">{userStrategicMetrics.newClientsThisQuarter}</p>
                      <p className="text-xs text-gray-500">Based on your owned accounts</p>
                    </div>
                  </div>

                  {/* Average Project Value */}
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <DollarSign className="w-8 h-8 text-yellow-600" />
                    <div>
                      <p className="text-sm text-gray-600">Average Project Value (Owned Deals)</p> {/* Updated title */}
                      <p className="text-2xl font-bold text-gray-900">{userStrategicMetrics.avgProjectValue}</p>
                      <p className="text-xs text-gray-500">Based on your owned deals</p> {/* Updated description */}
                    </div>
                  </div>
                  {/* Client Retention Rate removed */}
                </div>

                <div className="mt-6">
                  <h4 className="text-md font-semibold text-gray-700 mb-2">Your Upcoming High Priority Deliverables</h4>
                  {userStrategicMetrics.upcomingHighPriorityDeliverables.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-700">
                      {userStrategicMetrics.upcomingHighPriorityDeliverables.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">No high priority upcoming deliverables found for you.</p>
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

export default EmployeeDashboard;
