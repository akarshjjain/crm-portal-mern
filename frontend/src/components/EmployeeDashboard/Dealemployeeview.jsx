// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext'; // Import useAuth for permission checks

// const Dealemployeeview = () => {
//   const { dealId } = useParams(); // Get the dealId from the URL parameters
//   const navigate = useNavigate();
//   const { user: currentUser, loading: authLoading } = useAuth(); // Get current user for permissions
//   const [deal, setDeal] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // CRITICAL FIX: Ensure API_BASE_URL matches your backend server's port (3000)
//   const API_BASE_URL = 'http://localhost:3000/api'; 

//   const fetchDealDetails = useCallback(async () => {
//     // Only fetch if auth state is resolved and we have a deal ID
//     if (authLoading || !dealId) {
//         return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
//       console.log(`Attempting to fetch deal details from: ${API_BASE_URL}/deal/${dealId}`);
//       const response = await fetch(`${API_BASE_URL}/deal/${dealId}`);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`HTTP error! Status: ${response.status}, Message:`, errorText); 
//         throw new Error(`Failed to fetch deal details: ${response.status} - ${errorText}`);
//       }

//       const data = await response.json();
//       console.log('Deal details fetched successfully:', data);

//       // Implement permission check: employee can only view their own deals
//       if (currentUser?.isLoggedIn && currentUser?.role === 'employee' && data.dealOwner !== currentUser.name) {
//           setError('You do not have permission to view this deal.');
//           setDeal(null); // Clear deal data if not permitted
//       } else {
//           setDeal(data);
//       }
//     } catch (err) {
//       console.error('Error fetching deal details:', err);
//       setError(err.message);
//       setDeal(null); // Clear deal on error
//     } finally {
//       setLoading(false);
//     }
//   }, [dealId, currentUser, authLoading]);

//   useEffect(() => {
//     fetchDealDetails();
//   }, [fetchDealDetails]);

//   // Permission check for edit and delete actions
//   const canEditOrDelete = (dealOwner) => {
//     if (!currentUser?.isLoggedIn) return false;
//     return currentUser.role === 'admin' || (currentUser.role === 'employee' && currentUser.name === dealOwner);
//   };

//   // Handle edit action (placeholder for now)
//   const handleEdit = () => {
//     console.log('Editing deal:', deal);
//     // In a full implementation, you'd likely open the CreateDealModal with this deal data
//     // For now, we'll just log and provide an alert:
//     alert('Edit functionality not yet fully implemented on this view. You can edit from the main deal list.');
//   };

//   // Handle delete action
//   const handleDelete = async () => {
//     if (!canEditOrDelete(deal?.dealOwner)) {
//         alert("You do not have permission to delete this deal.");
//         return;
//     }

//     if (window.confirm('Are you sure you want to delete this deal? This action cannot be undone.')) {
//       try {
//         console.log(`Attempting to delete deal: ${API_BASE_URL}/deal/${dealId}`);
//         const response = await fetch(`${API_BASE_URL}/deal/${dealId}`, {
//           method: 'DELETE',
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error(`HTTP error! Status: ${response.status}, Message:`, errorText);
//           throw new Error(`Failed to delete deal: ${response.status} - ${errorText}`);
//         }

//         console.log('Deal deleted successfully');
//         navigate('/employee-dashboard/deals'); // Navigate back to the deals list after deletion
//       } catch (err) {
//         console.error('Error deleting deal:', err);
//         setError(`Failed to delete deal: ${err.message}`);
//       }
//     }
//   };

//   if (authLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
//         <div className="text-gray-600 text-lg">Loading authentication state...</div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
//         <div className="text-gray-600 text-lg">Loading deal details...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 font-sans p-6">
//         <div className="text-red-700 text-lg font-semibold mb-4">Error: {error}</div>
//         <button
//           onClick={() => navigate('/employee-dashboard/deals')}
//           className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium flex items-center"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" /> Back to Deals
//         </button>
//       </div>
//     );
//   }

//   if (!deal) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Deal Not Found</h2>
//         <p className="text-gray-600">The deal with ID "{dealId}" could not be found or you do not have permission to view it.</p>
//         <button
//           onClick={() => navigate('/employee-dashboard/deals')}
//           className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium flex items-center"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" /> Back to Deals
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
//         <div className="p-6 border-b border-gray-200 flex items-center justify-between">
//           <button
//             onClick={() => navigate(-1)} // Go back to the previous page
//             className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors text-sm font-medium"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" /> Back to Deals
//           </button>
//           <h1 className="text-2xl font-bold text-gray-900">Deal Details: {deal.dealName}</h1>
//           <div className="flex space-x-2">
//             <button
//               onClick={handleEdit}
//               disabled={!canEditOrDelete(deal.dealOwner)}
//               className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Edit Deal"
//             >
//               <Edit className="w-5 h-5" />
//             </button>
//             <button
//               onClick={handleDelete}
//               disabled={!canEditOrDelete(deal.dealOwner)}
//               className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Delete Deal"
//             >
//               <Trash2 className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
//           <div className="detail-item">
//             <p className="text-sm font-medium text-gray-500">Deal ID</p>
//             <p className="text-base text-gray-900 font-semibold">{deal._id}</p>
//           </div>
//           <div className="detail-item">
//             <p className="text-sm font-medium text-gray-500">Deal Owner</p>
//             <p className="text-base text-gray-900">{deal.dealOwner || 'N/A'}</p>
//           </div>
//           <div className="detail-item">
//             <p className="text-sm font-medium text-gray-500">Deal Name</p>
//             <p className="text-base text-gray-900">{deal.dealName || 'N/A'}</p>
//           </div>
//           <div className="detail-item">
//             <p className="text-sm font-medium text-gray-500">Amount</p>
//             <p className="text-base text-gray-900">{deal.amount ? deal.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : 'N/A'}</p>
//           </div>
//           <div className="detail-item">
//             <p className="text-sm font-medium text-gray-500">Sales Stage</p>
//             <p className="text-base text-gray-900">{deal.salesStage || 'N/A'}</p>
//           </div>
//           <div className="detail-item">
//             <p className="text-sm font-medium text-gray-500">Close Date</p>
//             <p className="text-base text-gray-900">{deal.closeDate || 'N/A'}</p>
//           </div>
//           <div className="detail-item">
//             <p className="text-sm font-medium text-gray-500">OEM Name</p>
//             <p className="text-base text-gray-900">{deal.oemName || 'N/A'}</p>
//           </div>
//           <div className="detail-item">
//             <p className="text-sm font-medium text-gray-500">Service Engineer</p>
//             <p className="text-base text-gray-900">{deal.serviceEngineer || 'N/A'}</p>
//           </div>
//           <div className="detail-item">
//             <p className="text-sm font-medium text-gray-500">Account Name</p>
//             <p className="text-base text-gray-900">{deal.accountName || 'N/A'}</p>
//           </div>
//           <div className="detail-item">
//             <p className="text-sm font-medium text-gray-500">Start Date</p>
//             <p className="text-base text-gray-900">{deal.startDate || 'N/A'}</p>
//           </div>
//           <div className="detail-item">
//             <p className="text-sm font-medium text-gray-500">Contact Name</p>
//             <p className="text-base text-gray-900">{deal.contactName || 'N/A'}</p>
//           </div>
//           <div className="md:col-span-2 detail-item">
//             <p className="text-sm font-medium text-gray-500">Created At</p>
//             <p className="text-base text-gray-900">{deal.createdAt ? new Date(deal.createdAt).toLocaleString() : 'N/A'}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dealemployeeview;


import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Link2 } from 'lucide-react'; // Added Link2 for the related deals icon
import { useAuth } from '../../context/AuthContext'; // Import useAuth for permission checks

const Dealemployeeview = () => {
  const { dealId } = useParams(); // Get the dealId from the URL parameters
  const navigate = useNavigate();
  const { user: currentUser, loading: authLoading } = useAuth(); // Get current user for permissions
  const [deal, setDeal] = useState(null);
  const [relatedDeals, setRelatedDeals] = useState([]); // New state for related deals
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:3000/api'; 

  const fetchDealDetails = useCallback(async () => {
    // Only fetch if auth state is resolved and we have a deal ID
    if (authLoading || !dealId) {
        return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log(`Attempting to fetch deal details from: ${API_BASE_URL}/deal/${dealId}`);
      const response = await fetch(`${API_BASE_URL}/deal/${dealId}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! Status: ${response.status}, Message:`, errorText); 
        throw new Error(`Failed to fetch deal details: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Deal details fetched successfully:', data);

      // Implement permission check: employee can only view their own deals
      if (currentUser?.isLoggedIn && currentUser?.role === 'employee' && data.dealOwner !== currentUser.name) {
          setError('You do not have permission to view this deal.');
          setDeal(null); // Clear deal data if not permitted
          setRelatedDeals([]); // Clear related deals too
      } else {
          setDeal(data);
          // Once the main deal is fetched, fetch related deals if accountName exists
          if (data.accountName) {
            fetchRelatedDeals(data.accountName, data._id); // Pass current deal's ID to exclude it
          } else {
            setRelatedDeals([]); // No account name, no related deals
          }
      }
    } catch (err) {
      console.error('Error fetching deal details:', err);
      setError(err.message);
      setDeal(null); // Clear deal on error
      setRelatedDeals([]); // Clear related deals on error
    } finally {
      setLoading(false);
    }
  }, [dealId, currentUser, authLoading]);

  // New function to fetch related deals
  const fetchRelatedDeals = useCallback(async (accountName, currentDealId) => {
    if (!accountName || !currentUser || authLoading) {
      setRelatedDeals([]);
      return;
    }

    try {
      let url = `${API_BASE_URL}/deal?accountName=${encodeURIComponent(accountName)}`;
      
      // If current user is an employee, filter related deals by their ownership as well
      if (currentUser.isLoggedIn && currentUser.role === 'employee') {
        url += `&dealOwner=${encodeURIComponent(currentUser.name)}`;
        console.log(`Fetching related deals for account '${accountName}' and owner '${currentUser.name}'`);
      } else {
        console.log(`Fetching related deals for account '${accountName}' (Admin view)`);
      }

      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        throw new Error(`Failed to fetch related deals: ${response.statusText}`);
      }
      const data = await response.json();
      // Filter out the current deal from the related deals list
      const filteredRelatedDeals = data.filter(deal => deal._id !== currentDealId);
      setRelatedDeals(filteredRelatedDeals);
      console.log('Related deals fetched successfully:', filteredRelatedDeals);
    } catch (error) {
      console.error('Error fetching related deals:', error);
      setRelatedDeals([]);
    }
  }, [currentUser, authLoading]);


  useEffect(() => {
    fetchDealDetails();
  }, [fetchDealDetails]);

  // Permission check for edit and delete actions
  const canEditOrDelete = (dealOwner) => {
    if (!currentUser?.isLoggedIn) return false;
    return currentUser.role === 'admin' || (currentUser.role === 'employee' && currentUser.name === dealOwner);
  };

  // Handle edit action (placeholder for now)
  const handleEdit = () => {
    console.log('Editing deal:', deal);
    // In a full implementation, you'd likely open the CreateDealModal with this deal data
    // For now, we'll just log and provide an alert:
    alert('Edit functionality not yet fully implemented on this view. You can edit from the main deal list.');
  };

  // Handle delete action
  const handleDelete = async () => {
    if (!canEditOrDelete(deal?.dealOwner)) {
        alert("You do not have permission to delete this deal.");
        return;
    }

    if (window.confirm('Are you sure you want to delete this deal? This action cannot be undone.')) {
      try {
        console.log(`Attempting to delete deal: ${API_BASE_URL}/deal/${dealId}`);
        const response = await fetch(`${API_BASE_URL}/deal/${dealId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`HTTP error! Status: ${response.status}, Message:`, errorText);
          throw new Error(`Failed to delete deal: ${response.status} - ${errorText}`);
        }

        console.log('Deal deleted successfully');
        navigate('/employee-dashboard/deals'); // Navigate back to the deals list after deletion
      } catch (err) {
        console.error('Error deleting deal:', err);
        setError(`Failed to delete deal: ${err.message}`);
      }
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
        <div className="text-gray-600 text-lg">Loading authentication state...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
        <div className="text-gray-600 text-lg">Loading deal details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 font-sans p-6">
        <div className="text-red-700 text-lg font-semibold mb-4">Error: {error}</div>
        <button
          onClick={() => navigate('/employee-dashboard/deals')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Deals
        </button>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Deal Not Found</h2>
        <p className="text-gray-600">The deal with ID "{dealId}" could not be found or you do not have permission to view it.</p>
        <button
          onClick={() => navigate('/employee-dashboard/deals')}
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Deals
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          
          <h1 className="text-2xl font-bold text-gray-900">Deal Details: {deal.dealName}</h1>
          {/* <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              disabled={!canEditOrDelete(deal.dealOwner)}
              className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Edit Deal"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              disabled={!canEditOrDelete(deal.dealOwner)}
              className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Delete Deal"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div> */}
          <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors text-sl font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Deals
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
          {/* <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">Deal ID</p>
            <p className="text-base text-gray-900 font-semibold">{deal._id}</p>
          </div> */}
          <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">Deal Owner</p>
            <p className="text-base text-gray-900">{deal.dealOwner || 'N/A'}</p>
          </div>
          <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">Deal Name</p>
            <p className="text-base text-gray-900">{deal.dealName || 'N/A'}</p>
          </div>
          <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">Amount</p>
            <p className="text-base text-gray-900">{deal.amount ? deal.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : 'N/A'}</p>
          </div>
          <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">Sales Stage</p>
            <p className="text-base text-gray-900">{deal.salesStage || 'N/A'}</p>
          </div>
          <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">Close Date</p>
            <p className="text-base text-gray-900">{deal.closeDate || 'N/A'}</p>
          </div>
          <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">OEM Name</p>
            <p className="text-base text-gray-900">{deal.oemName || 'N/A'}</p>
          </div>
          <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">Service Engineer</p>
            <p className="text-base text-gray-900">{deal.serviceEngineer || 'N/A'}</p>
          </div>
          <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">Account Name</p>
            <p className="text-base text-gray-900">{deal.accountName || 'N/A'}</p>
          </div>
          <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">Start Date</p>
            <p className="text-base text-gray-900">{deal.startDate || 'N/A'}</p>
          </div>
          <div className="md:col-span-2 detail-item">
            <p className="text-sm font-medium text-gray-500">Contact Name</p>
            <p className="text-base text-gray-900">{deal.contactName || 'N/A'}</p>
          </div>
          <div className="md:col-span-2 detail-item">
            <p className="text-sm font-medium text-gray-500">Created At</p>
            <p className="text-base text-gray-900">{deal.createdAt ? new Date(deal.createdAt).toLocaleString() : 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Related Deals Section */}
      {relatedDeals.length > 0 && (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center">
            <Link2 className="w-5 h-5 text-gray-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Related Deals for "{deal.accountName}"</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Stage</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Owner</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Close Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {relatedDeals.map((relatedDeal) => (
                    <tr key={relatedDeal._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                        onClick={() => navigate(`/employee-dashboard/deals/${relatedDeal._id}`)}
                      >
                        {relatedDeal.dealName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {relatedDeal.amount ? relatedDeal.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{relatedDeal.salesStage || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{relatedDeal.dealOwner || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{relatedDeal.closeDate || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dealemployeeview;
