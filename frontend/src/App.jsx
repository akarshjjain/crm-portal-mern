  // import React from "react";
  // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
  // import Login from "./pages/Login";
  // import AdminDashboard from "./pages/AdminDashboard";
  // import EmployeeDashboard from './pages/EmployeeDashboard'
  // import PrivateRoutes from "./utils/PrivateRoutes";
  // import RoleBaseRoutes from "./utils/RoleBaseRoutes";
  // import AdminSummary from "./components/dashboard/AdminSummary";
  // import SellerList from "./components/seller/SellerList";
  // import AddSeller from "./components/seller/AddSeller";
  // import EditSeller from "./components/seller/EditSeller";
  // import List from "./components/employee/List";
  // import Add from "./components/employee/Add"
  // import View from "./components/employee/View";
  // import Edit from "./components/employee/Edit";
  // import Contactmain from "./components/contact/Contactmain"
  // import Dealmain from "./components/deal/Dealmain"
  // import Taskmain from "./components/task/Taskmain";
  // import SellertoDeal from './components/seller/SellertoDeal';
  // import Accountemployee from "./components/EmployeeDashboard/Accountemployee";
  // import Contactemployee from "./components/EmployeeDashboard/Contactemployee";
  // import Dealemployee from "./components/EmployeeDashboard/Dealemployee";
  // import Taskemployee from "./components/EmployeeDashboard/Taskemployee";
  // import Selleremployee from "./components/EmployeeDashboard/Selleremployee";
  // import Dealmainview from "./components/deal/Dealmainview";
  // import AccountDealView from "./components/employee/AccountDealvView";
  // import AccountRequests from "./components/employee/AccountRequests";
  // import Contactmainview from "./components/contact/Contactmainview";
  // import AuthContext from "./context/authContext";

  // function App() {

    
  //   return (
  //     <BrowserRouter>
  //     <userContextProvider> 
  //       <Routes>
  //         <Route path="/" element={<Navigate to="/admin-dashboard" />} />
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/admin-dashboard" element={
          
  //           <PrivateRoutes>
  //           <RoleBaseRoutes requiredRole={["admin"]}>
  //             <AdminDashboard />
  //             </RoleBaseRoutes>
  //           </PrivateRoutes>
              
  //         }>
  //           <Route index element={<AdminSummary />}></Route>
  //           <Route path="/admin-dashboard/sellers" element={<SellerList />} />
  //           <Route path="/admin-dashboard/sellers/:id" element={<SellertoDeal />} />
  //           <Route path="/admin-dashboard/add-seller" element={<AddSeller />} />
  //           <Route path="/admin-dashboard/seller/:id" element={<EditSeller />} />
  //           <Route path="/admin-dashboard/accounts" element={<List />} />
  //           <Route path="/admin-dashboard/add-employee" element={<Add />} />
  //           <Route path="employees/:id" element={<View />} />
  //           <Route path="employees/edit/:id" element={<Edit />} />
  //           <Route path="/admin-dashboard/contacts" element={<Contactmain />} />
  //           <Route path="/admin-dashboard/contacts/:contactId" element={<Contactmainview />} />
  //           <Route path="/admin-dashboard/tasks" element={<Taskmain />} />
  //           <Route path="/admin-dashboard/deals" element={<Dealmain />} />
  //           <Route path="/admin-dashboard/deals/view/:dealId" element={<Dealmainview />} />
  //           <Route path="/admin-dashboard/account-requests" element={<AccountRequests />} />
  //           <Route path="/admin-dashboard/accounts/:accountId/deals" element={<AccountDealView />} />
            
            

  //         </Route>
          
  //           <Route path="/employee-dashboard" element={
  //             <PrivateRoutes>
  //               <RoleBaseRoutes requiredRole={["admin", "employee"]} >
  //                 <EmployeeDashboard /> {/* EmployeeDashboard provides the sidebar and navbar */}
  //               </RoleBaseRoutes>
  //             </PrivateRoutes>
  //           }>
              
  //             <Route path="/employee-dashboard/accounts" element={<Accountemployee />} />
  //             <Route path="/employee-dashboard/contacts" element={<Contactemployee />} />
  //             <Route path="/employee-dashboard/deals" element={<Dealemployee />} />
  //             <Route path="/employee-dashboard/tasks" element={<Taskemployee />} />
  //             <Route path="/employee-dashboard/sellers" element={<Selleremployee />} />
                          
  //           </Route>

            
            
  //       <Route path="*" element={<NoMatch />} />
  //       </Routes>
  //       </userContextProvider>
  //     </BrowserRouter>
  //   );
  // }

  // // Basic No Match component for 404
  // function NoMatch() {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //       <h2 className="text-2xl font-bold text-gray-800">404 - Page Not Found</h2>
  //       <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
  //     </div>
  //   );
  // }

  // export default App;
// This code sets up a simple React application with routing.
// It uses React Router to define routes for the login page and the admin dashboard.
// The `App` component renders a `BrowserRouter` with `Routes` and `Route` components.
// The root path (`/`) redirects to the login page.
// The `/login` path renders the `Login` component, and the `/admin-dashboard` path renders the `AdminDashboard` component.
// This structure allows for easy navigation between the login page and the admin dashboard within the application.
// The `Navigate` component is used to redirect users from the root path to the login page.
// The `Login` and `AdminDashboard` components are imported from their respective files.
// This code is a basic setup for a React application with routing, allowing users to log in and access an admin dashboard.
// This code is a basic setup for a React application with routing, allowing users to log in and access an admin dashboard.
// It uses React Router to define routes for the login page and the admin dashboard.  

// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import AdminDashboard from "./pages/AdminDashboard";
// import EmployeeDashboard from './pages/EmployeeDashboard'
// import PrivateRoutes from "./utils/PrivateRoutes";
// import RoleBaseRoutes from "./utils/RoleBaseRoutes";
// import AdminSummary from "./components/dashboard/AdminSummary";
// import SellerList from "./components/seller/SellerList";
// import AddSeller from "./components/seller/AddSeller";
// import EditSeller from "./components/seller/EditSeller";
// import List from "./components/employee/List";
// import Add from "./components/employee/Add"
// import View from "./components/employee/View";
// import Edit from "./components/employee/Edit";
// import Contactmain from "./components/contact/Contactmain"
// import Dealmain from "./components/deal/Dealmain"
// import Taskmain from "./components/task/Taskmain";
// import SellertoDeal from './components/seller/SellertoDeal';
// import Accountemployee from "./components/EmployeeDashboard/Accountemployee";
// import Contactemployee from "./components/EmployeeDashboard/Contactemployee";
// import Dealemployee from "./components/EmployeeDashboard/Dealemployee";
// import Taskemployee from "./components/EmployeeDashboard/Taskemployee";
// import Selleremployee from "./components/EmployeeDashboard/Selleremployee";
// import Dealmainview from "./components/deal/Dealmainview";
// import AccountDealView from "./components/employee/AccountDealvView";
// import AccountRequests from "./components/employee/AccountRequests";
// import Contactmainview from "./components/contact/Contactmainview";
// import Taskmainview from "./components/task/Taskmainview"; // Import Taskmainview
// import Taskemployeeview from "./components/EmployeeDashboard/Taskemployeeview";
// import Dealemployeeview from "./components/EmployeeDashboard/Dealemployeeview";
// import Accountemployeeview from "./components/EmployeeDashboard/Accountemployeeview";
// import Contactemployeeview from "./components/EmployeeDashboard/Contactemployeeview";
// import Selleremployeeview from "./components/EmployeeDashboard/Selleremployeeview";

// // Correct import for your AuthContext. The default export 'authContext' is imported
// // and aliased as 'AuthContext' to follow React component naming conventions (PascalCase).
// // MAKE SURE THIS PATH IS CORRECT RELATIVE TO YOUR App.jsx FILE
// import AuthContext from './context/authContext'; 

// function App() {

//   return (
//     <BrowserRouter>
//       {/* Corrected: Using the imported AuthContext component, which starts with an uppercase letter */}
//       <AuthContext> 
//         <Routes>
//           {/* Change this line: Redirect to login page initially */}
//           <Route path="/" element={<Navigate to="/login" />} /> 
//           <Route path="/login" element={<Login />} />
//           <Route path="/admin-dashboard" element={
//             <PrivateRoutes>
//               <RoleBaseRoutes requiredRole={["admin"]}>
//                 <AdminDashboard />
//               </RoleBaseRoutes>
//             </PrivateRoutes>
//           }>
//             <Route index element={<AdminSummary />}></Route>
//             <Route path="sellers" element={<SellerList />} />
//             <Route path="sellers/:id" element={<SellertoDeal />} />
//             <Route path="add-seller" element={<AddSeller />} />
//             <Route path="seller/:id" element={<EditSeller />} />
//             <Route path="accounts" element={<List />} />
//             <Route path="add-employee" element={<Add />} />
//             <Route path="employees/:id" element={<View />} />
//             <Route path="employees/edit/:id" element={<Edit />} />
//             <Route path="contacts" element={<Contactmain />} />
//             <Route path="contacts/:contactId" element={<Contactmainview />} />
//             <Route path="tasks" element={<Taskmain />} />
//             <Route path="tasks/:taskId" element={<Taskmainview />} /> {/* New Task View Route */}
//             <Route path="deals" element={<Dealmain />} />
//             <Route path="deals/:dealId" element={<Dealmainview />} />
//             <Route path="account-requests" element={<AccountRequests />} />
//             <Route path="accounts/:accountId/deals" element={<AccountDealView />} />

//           </Route>
          
//           <Route path="/employee-dashboard" element={
//             <PrivateRoutes>
//               <RoleBaseRoutes requiredRole={["admin", "employee"]} >
//                 <EmployeeDashboard /> {/* EmployeeDashboard provides the sidebar and navbar */}
//               </RoleBaseRoutes>
//             </PrivateRoutes>
//           }>
//             <Route path="accounts" element={<Accountemployee />} />
//             <Route path="accounts/:id" element={<Accountemployeeview />} />
//             <Route path="contacts" element={<Contactemployee />} />
//             <Route path="contacts/:id" element={<Contactemployeeview />} />
//             <Route path="deals" element={<Dealemployee />} />
//             <Route path="deals/:dealId" element={<Dealemployeeview />} />
//             <Route path="tasks" element={<Taskemployee />} />
//             <Route path="tasks/:taskId" element={<Taskemployeeview />} /> 
//             <Route path="sellers" element={<Selleremployee />} />
//             <Route path="sellers/:id" element={<Selleremployeeview />} />
//           </Route>

//           <Route path="*" element={<NoMatch />} />
//         </Routes>
//       </AuthContext>
//     </BrowserRouter>
//   );
// }

// // Basic No Match component for 404
// function NoMatch() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h2 className="text-2xl font-bold text-gray-800">404 - Page Not Found</h2>
//       <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
//     </div>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import SellerList from "./components/seller/SellerList";
import AddSeller from "./components/seller/AddSeller";
import EditSeller from "./components/seller/EditSeller";
import List from "./components/employee/List"; // Assuming this is for listing employees (users)
import Add from "./components/employee/Add" // This might be for adding 'employee' records, not users
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import Contactmain from "./components/contact/Contactmain"
import Dealmain from "./components/deal/Dealmain"
import Taskmain from "./components/task/Taskmain";
import SellertoDeal from './components/seller/SellertoDeal';
import Accountemployee from "./components/EmployeeDashboard/Accountemployee";
import Contactemployee from "./components/EmployeeDashboard/Contactemployee";
import Dealemployee from "./components/EmployeeDashboard/Dealemployee";
import Taskemployee from "./components/EmployeeDashboard/Taskemployee";
import Selleremployee from "./components/EmployeeDashboard/Selleremployee";
import Dealmainview from "./components/deal/Dealmainview";
import AccountDealView from "./components/employee/AccountDealvView";
import AccountRequests from "./components/employee/AccountRequests";
import Contactmainview from "./components/contact/Contactmainview";
import Taskmainview from "./components/task/Taskmainview"; // Import Taskmainview
import Taskemployeeview from "./components/EmployeeDashboard/Taskemployeeview";
import Dealemployeeview from "./components/EmployeeDashboard/Dealemployeeview";
import Accountemployeeview from "./components/EmployeeDashboard/Accountemployeeview";
import Contactemployeeview from "./components/EmployeeDashboard/Contactemployeeview";
import Selleremployeeview from "./components/EmployeeDashboard/Selleremployeeview";
import CreateNewUser from "./pages/CreateNewUser"// NEW: Import the CreateNewUser component

// Correct import for your AuthContext. The default export 'authContext' is imported
// and aliased as 'AuthContext' to follow React component naming conventions (PascalCase).
// MAKE SURE THIS PATH IS CORRECT RELATIVE TO YOUR App.jsx FILE
import AuthContext from './context/authContext'; 

function App() {

  return (
    <BrowserRouter>
      {/* Corrected: Using the imported AuthContext component, which starts with an uppercase letter */}
      <AuthContext> 
        <Routes>
          {/* Change this line: Redirect to login page initially */}
          <Route path="/" element={<Navigate to="/login" />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }>
            <Route index element={<AdminSummary />}></Route>
            <Route path="sellers" element={<SellerList />} />
            <Route path="sellers/:id" element={<SellertoDeal />} />
            <Route path="add-seller" element={<AddSeller />} />
            <Route path="seller/:id" element={<EditSeller />} />
            <Route path="accounts" element={<List />} /> {/* Assuming 'List' here is for accounts, but named employees in dashboard */}
            {/* NOTE: There seems to be a naming conflict here:
               - 'accounts' path uses 'List' component.
               - 'add-employee' path uses 'Add' component.
               - 'employees/:id' uses 'View'.
               - 'employees/edit/:id' uses 'Edit'.
               This suggests 'List', 'Add', 'View', 'Edit' might be generic for 'employees'
               but your 'accounts' also uses 'List'. If 'List' is specifically for *users/employees*,
               you might want a separate component for accounts if 'List' does employee-specific things.

               For now, I'm assuming your existing employee routes are functional.
               The NEW 'create-user' route is specifically for creating a new user (employee/admin).
            */}
            <Route path="add-employee" element={<Add />} /> {/* This route seems to add a different kind of 'employee' record */}
            <Route path="employees/:id" element={<View />} />
            <Route path="employees/edit/:id" element={<Edit />} />
            <Route path="contacts" element={<Contactmain />} />
            <Route path="contacts/:contactId" element={<Contactmainview />} />
            <Route path="tasks" element={<Taskmain />} />
            <Route path="tasks/:taskId" element={<Taskmainview />} /> {/* New Task View Route */}
            <Route path="deals" element={<Dealmain />} />
            <Route path="deals/:dealId" element={<Dealmainview />} />
            <Route path="account-requests" element={<AccountRequests />} />
            <Route path="accounts/:accountId/deals" element={<AccountDealView />} />
            {/* NEW ROUTE: For adding a new user (employee/admin) through the CreateNewUser form */}
            <Route path="create-user" element={<CreateNewUser />} />

          </Route>
          
          <Route path="/employee-dashboard" element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin", "employee"]} >
                <EmployeeDashboard /> {/* EmployeeDashboard provides the sidebar and navbar */}
              </RoleBaseRoutes>
            </PrivateRoutes>
          }>
            <Route path="accounts" element={<Accountemployee />} />
            <Route path="accounts/:id" element={<Accountemployeeview />} />
            <Route path="contacts" element={<Contactemployee />} />
            <Route path="contacts/:id" element={<Contactemployeeview />} />
            <Route path="deals" element={<Dealemployee />} />
            <Route path="deals/:dealId" element={<Dealemployeeview />} />
            <Route path="tasks" element={<Taskemployee />} />
            <Route path="tasks/:taskId" element={<Taskemployeeview />} /> 
            <Route path="sellers" element={<Selleremployee />} />
            <Route path="sellers/:id" element={<Selleremployeeview />} />
          </Route>

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </AuthContext>
    </BrowserRouter>
  );
}

// Basic No Match component for 404
function NoMatch() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800">404 - Page Not Found</h2>
      <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
    </div>
  );
}

export default App;
