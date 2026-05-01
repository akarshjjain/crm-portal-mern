
  // import React, { useState, useEffect, useCallback } from 'react';
  // import { useParams, useNavigate } from 'react-router-dom';
  // import { ChevronLeft, Loader2, DollarSign, Briefcase } from 'lucide-react';

  // const API_BASE_URL = 'http://localhost:3000/api';

  // const AccountDealView = () => {
  //   const { accountId } = useParams(); // Get accountId from URL parameters
  //   const navigate = useNavigate(); // Hook for navigation

  //   const [account, setAccount] = useState(null);
  //   const [deals, setDeals] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);

  //   const fetchAccountAndDeals = useCallback(async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       // 1. Fetch Account Details first by ID
  //       const accountResponse = await fetch(`${API_BASE_URL}/account/${accountId}`);
  //       if (!accountResponse.ok) {
  //         const errorText = await accountResponse.text();
  //         throw new Error(`Failed to fetch account details: ${accountResponse.statusText}. ${errorText}`);
  //       }
  //       const accountData = await accountResponse.json();
  //       setAccount(accountData); // Set the fetched account

  //       // 2. Once account data is available, use its 'accountName' to fetch associated deals
  //       if (accountData && accountData.accountName) {
  //         // CORRECTED: Fetch Deals associated with this Account Name
  //         // This sends a query parameter like ?accountName=Radiansys
  //         const dealsResponse = await fetch(`${API_BASE_URL}/deal?accountName=${encodeURIComponent(accountData.accountName)}`);
  //         if (!dealsResponse.ok) {
  //           const errorText = await dealsResponse.text();
  //           throw new Error(`Failed to fetch deals by account name: ${dealsResponse.statusText}. ${errorText}`);
  //         }
  //         const dealsData = await dealsResponse.json();
  //         setDeals(dealsData); // Set the filtered deals
  //       } else {
  //         // If account data or accountName is missing, no deals can be fetched
  //         setDeals([]);
  //       }

  //     } catch (err) {
  //       console.error("Error fetching account or deals:", err);
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }, [accountId]); // Dependency on accountId to refetch if the URL param changes

  //   useEffect(() => {
  //     // Call the combined fetch function when the component mounts or accountId changes
  //     fetchAccountAndDeals();
  //   }, [fetchAccountAndDeals]); // Dependency on the memoized function

  //   if (loading) {
  //     return (
  //       <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
  //         <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-2" />
  //         <span className="text-lg text-gray-700">Loading account details...</span>
  //       </div>
  //     );
  //   }

  //   if (error) {
  //     return (
  //       <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 font-sans p-4">
  //         <p className="text-red-700 text-lg mb-4">Error: {error}</p>
  //         <button
  //           onClick={() => navigate(-1)}
  //           className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
  //         >
  //           <ChevronLeft className="w-4 h-4 mr-2" />
  //           Go Back
  //         </button>
  //       </div>
  //     );
  //   }

  //   if (!account) {
  //     return (
  //       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans p-4">
  //         <p className="text-gray-700 text-lg mb-4">Account not found.</p>
  //         <button
  //           onClick={() => navigate(-1)}
  //           className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
  //         >
  //           <ChevronLeft className="w-4 h-4 mr-2" />
  //           Go Back
  //         </button>
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-6">
  //       <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
  //         {/* Header */}
  //         <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
  //           <h1 className="text-3xl font-bold text-gray-900">Account Details: {account.accountName}</h1>
  //           <button
  //             onClick={() => navigate(-1)}
  //             className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
  //           >
  //             <ChevronLeft className="w-4 h-4 mr-2" />
  //             Back to Accounts List
  //           </button>
  //         </div>

  //         {/* Account Information Section */}
  //         <div className="p-6 border-b border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
  //           <h2 className="col-span-full text-xl font-semibold mb-2 text-gray-800">Account Information</h2>
  //           <div className="flex flex-col">
  //             <span className="text-sm font-medium text-gray-500">Account Owner</span>
  //             <span className="text-base text-gray-900">{account.accountOwner || 'N/A'}</span>
  //           </div>
  //           <div className="flex flex-col">
  //             <span className="text-sm font-medium text-gray-500">Account Type</span>
  //             <span className="text-base text-gray-900">{account.accountType || 'N/A'}</span>
  //           </div>
  //           <div className="flex flex-col">
  //             <span className="text-sm font-medium text-gray-500">Industry</span>
  //             <span className="text-base text-gray-900">{account.industry || 'N/A'}</span>
  //           </div>
  //           <div className="flex flex-col">
  //             <span className="text-sm font-medium text-gray-500">Phone</span>
  //             <span className="text-base text-gray-900">{account.phone || 'N/A'}</span>
  //           </div>
  //           <div className="flex flex-col">
  //             <span className="text-sm font-medium text-gray-500">Email</span>
  //             <span className="text-base text-gray-900">{account.email || 'N/A'}</span>
  //           </div>
  //           <div className="flex flex-col md:col-span-2">
  //             <span className="text-sm font-medium text-gray-500">Billing Address</span>
  //             <span className="text-base text-gray-900">{account.billingAddress || 'N/A'}</span>
  //           </div>
  //           <div className="flex flex-col">
  //             <span className="text-sm font-medium text-gray-500">Billing State</span>
  //             <span className="text-base text-gray-900">{account.billingState || 'N/A'}</span>
  //           </div>
  //           <div className="flex flex-col">
  //             <span className="text-sm font-medium text-gray-500">Billing Country</span>
  //             <span className="text-base text-gray-900">{account.billingCountry || 'N/A'}</span>
  //           </div>
  //         </div>

  //         {/* Deals Section */}
  //         <div className="p-6">
  //           <h2 className="text-xl font-semibold mb-4 text-gray-800">Associated Deals ({deals.length})</h2>
  //           {deals.length === 0 ? (
  //             <div className="text-center py-8 text-gray-500">
  //               <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-300" />
  //               <p className="text-lg font-medium">No deals found for this account.</p>
  //             </div>
  //           ) : (
  //             <div className="overflow-x-auto">
  //               <table className="min-w-full divide-y divide-gray-200">
  //                 <thead className="bg-gray-50">
  //                   <tr>
  //                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
  //                       Deal Name
  //                     </th>
  //                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                       Sales Stage
  //                     </th>
  //                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                       Amount
  //                     </th>
  //                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
  //                       Close Date
  //                     </th>
  //                   </tr>
  //                 </thead>
  //                 <tbody className="bg-white divide-y divide-gray-200">
  //                   {deals.map((deal) => (
  //                     <tr key={deal._id} className="hover:bg-gray-50">
  //                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
  //                         {deal.dealName}
  //                       </td>
  //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
  //                         {deal.salesStage || 'N/A'} {/* Corrected field name */}
  //                       </td>
  //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
  //                         {deal.amount ? `$${deal.amount.toLocaleString()}` : 'N/A'}
  //                       </td>
  //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
  //                         {deal.closeDate ? new Date(deal.closeDate).toLocaleDateString() : 'N/A'} {/* Corrected field name */}
  //                       </td>
  //                     </tr>
  //                   ))}
  //                 </tbody>
  //               </table>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default AccountDealView;


  import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Loader2, DollarSign, Briefcase } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3000/api';

const AccountDealView = () => {
  const { accountId } = useParams(); // Get accountId from URL parameters
  const navigate = useNavigate(); // Hook for navigation

  const [account, setAccount] = useState(null);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAccountAndDeals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch Account Details first by ID
      const accountResponse = await fetch(`${API_BASE_URL}/account/${accountId}`);
      if (!accountResponse.ok) {
        const errorText = await accountResponse.text();
        throw new Error(`Failed to fetch account details: ${accountResponse.statusText}. ${errorText}`);
      }
      const accountData = await accountResponse.json();
      setAccount(accountData); // Set the fetched account

      // 2. Once account data is available, use its 'accountName' to fetch associated deals
      if (accountData && accountData.accountName) {
        // Fetch Deals associated with this Account Name
        // This sends a query parameter like ?accountName=Radiansys
        const dealsResponse = await fetch(`${API_BASE_URL}/deal?accountName=${encodeURIComponent(accountData.accountName)}`);
        if (!dealsResponse.ok) {
          const errorText = await dealsResponse.text();
          throw new Error(`Failed to fetch deals by account name: ${dealsResponse.statusText}. ${errorText}`);
        }
        const dealsData = await dealsResponse.json();
        setDeals(dealsData); // Set the filtered deals
      } else {
        // If account data or accountName is missing, no deals can be fetched
        setDeals([]);
      }

    } catch (err) {
      console.error("Error fetching account or deals:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [accountId]); // Dependency on accountId to refetch if the URL param changes

  useEffect(() => {
    // Call the combined fetch function when the component mounts or accountId changes
    fetchAccountAndDeals();
  }, [fetchAccountAndDeals]); // Dependency on the memoized function

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-2" />
        <span className="text-lg text-gray-700">Loading account details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 font-sans p-4">
        <p className="text-red-700 text-lg mb-4">Error: {error}</p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans p-4">
        <p className="text-gray-700 text-lg mb-4">Account not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Account Details: {account.accountName}</h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Accounts List
          </button>
        </div>

        {/* Account Information Section */}
        <div className="p-6 border-b border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <h2 className="col-span-full text-xl font-semibold mb-2 text-gray-800">Account Information</h2>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Account Owner</span>
            <span className="text-base text-gray-900">{account.accountOwner || 'N/A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Account Type</span>
            <span className="text-base text-gray-900">{account.accountType || 'N/A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Industry</span>
            <span className="text-base text-gray-900">{account.industry || 'N/A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Phone</span>
            <span className="text-base text-gray-900">{account.phone || 'N/A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Email</span>
            <span className="text-base text-gray-900">{account.email || 'N/A'}</span>
          </div>
          <div className="flex flex-col md:col-span-2">
            <span className="text-sm font-medium text-gray-500">Billing Address</span>
            <span className="text-base text-gray-900">{account.billingAddress || 'N/A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Billing State</span>
            <span className="text-base text-gray-900">{account.billingState || 'N/A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Billing Country</span>
            <span className="text-base text-gray-900">{account.billingCountry || 'N/A'}</span>
          </div>
        </div>

        {/* Deals Section */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Associated Deals ({deals.length})</h2>
          {deals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-300" /> {/* Reusing icon, still appropriate */}
              <p className="text-lg font-medium">No deals found for this account.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                      Deal Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sales Stage
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                      Close Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {deals.map((deal) => (
                    <tr key={deal._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {deal.dealName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {deal.salesStage || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {deal.amount ? `₹${deal.amount.toLocaleString('en-IN')}` : 'N/A'} {/* CHANGED: Rupee symbol and 'en-IN' locale for comma separation */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {deal.closeDate ? new Date(deal.closeDate).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountDealView;
