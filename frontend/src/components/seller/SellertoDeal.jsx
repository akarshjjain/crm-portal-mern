// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   ArrowLeft,
//   User,
//   Building,
//   Mail,
//   Phone,
//   Tag,
//   AlignLeft,
//   Loader2 // For loading spinner
// } from 'lucide-react';

// const SellertoDeal = () => {
//   const { id } = useParams(); // Get seller ID from URL parameters
//   const navigate = useNavigate(); // For navigating back
//   const [seller, setSeller] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const API_BASE_URL = 'http://localhost:3000/api'; // Your backend API base URL

//   const fetchSellerDetails = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       console.log(`Attempting to fetch seller details for ID: ${id} from: ${API_BASE_URL}/seller/${id}`);
//       const response = await fetch(`${API_BASE_URL}/seller/${id}`);

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Failed to fetch seller details: ${response.status} - ${errorText}`);
//       }

//       const data = await response.json();
//       setSeller(data);
//       console.log('Seller details fetched successfully:', data);
//     } catch (err) {
//       console.error('Error fetching seller details:', err);
//       setError('Failed to load seller details. Please try again.');
//       setSeller(null); // Clear any previous seller data
//     } finally {
//       setLoading(false);
//     }
//   }, [id]); // Re-run effect if ID changes

//   useEffect(() => {
//     if (id) {
//       fetchSellerDetails();
//     }
//   }, [id, fetchSellerDetails]); // Depend on id and fetchSellerDetails


//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-2" />
//         <span className="text-lg text-gray-700">Loading seller details...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//           <strong className="font-bold">Error!</strong>
//           <span className="block sm:inline"> {error}</span>
//           <button
//             onClick={() => navigate('/sellers')} // Navigate back to list on error
//             className="mt-4 block mx-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
//           >
//             Go Back to Sellers List
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!seller) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-gray-700">
//         <h2 className="text-xl font-semibold mb-4">Seller Not Found</h2>
//         <p className="mb-6">The seller you are looking for does not exist or has been deleted.</p>
//         <button
//           onClick={() => navigate('/sellers')}
//           className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-lg text-base font-medium"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" />
//           Back to Sellers List
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 font-sans text-gray-900 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
//         {/* Header */}
//         <div className="px-6 py-5 bg-indigo-700 text-white flex items-center justify-between rounded-t-lg">
//           <h1 className="text-3xl font-bold">Seller Details</h1>
//           <button
//             onClick={() => navigate('/sellers')}
//             className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-800 transition-colors shadow-sm text-sm font-medium"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to List
//           </button>
//         </div>

//         {/* Seller Information */}
//         <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
//           <div className="col-span-full pb-4 border-b border-gray-200 mb-4">
//             <h2 className="text-2xl font-bold text-gray-800">
//               {seller.title} {seller.firstName} {seller.lastName}
//             </h2>
//             {seller.company && <p className="text-lg text-gray-600 mt-1">{seller.company}</p>}
//           </div>

//           <div className="space-y-4">
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">Contact Details</h3>
//             <div className="flex items-center text-gray-700">
//               <Mail className="w-5 h-5 mr-3 text-blue-500" />
//               <span>Email: {seller.email || 'N/A'}</span>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <Phone className="w-5 h-5 mr-3 text-green-500" />
//               <span>Mobile: {seller.mobile || 'N/A'}</span>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">Ownership & Company</h3>
//             <div className="flex items-center text-gray-700">
//               <User className="w-5 h-5 mr-3 text-purple-500" />
//               <span>Seller Owner: {seller.sellerOwner || 'N/A'}</span>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <Building className="w-5 h-5 mr-3 text-orange-500" />
//               <span>Company: {seller.company || 'N/A'}</span>
//             </div>
//           </div>
//         </div>

//         {/* Description Section */}
//         {seller.description && (
//           <div className="p-6 border-t border-gray-200 mt-6">
//             <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
//               <AlignLeft className="w-5 h-5 mr-2 text-gray-600" /> Description
//             </h3>
//             <p className="text-gray-700 sellering-relaxed bg-gray-50 p-4 rounded-md border border-gray-200">
//               {seller.description}
//             </p>
//           </div>
//         )}

//         {/* Actions (Optional - could add edit button here) */}
//         {/* <div className="p-6 border-t border-gray-200 flex justify-end">
//           <button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm text-sm font-medium">
//             Edit Seller
//           </button>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default SellertoDeal;


import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Building,
  Mail,
  Phone,
  Tag,
  AlignLeft,
  Loader2, // For loading spinner
  DollarSign, // For deal amount
  Calendar, // For deal close date
  Edit, // For deal edit (if you add functionality)
  Trash2 // For deal delete (if you add functionality)
} from 'lucide-react';

const SellertoDeal = () => {
  const { id } = useParams(); // Get seller ID from URL parameters
  const navigate = useNavigate(); // For navigating back
  const [seller, setSeller] = useState(null);
  const [deals, setDeals] = useState([]); // State for associated deals
  const [loading, setLoading] = useState(true);
  const [dealsLoading, setDealsLoading] = useState(false); // Loading state for deals
  const [error, setError] = useState(null);
  const [dealsError, setDealsError] = useState(null); // Error state for deals

  const API_BASE_URL = 'http://localhost:3000/api'; // Your backend API base URL

  // Fetch seller details
  const fetchSellerDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log(`Attempting to fetch seller details for ID: ${id} from: ${API_BASE_URL}/seller/${id}`);
      const response = await fetch(`${API_BASE_URL}/seller/${id}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch seller details: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setSeller(data);
      console.log('Seller details fetched successfully:', data);
      return data; // Return data to be used for fetching deals
    } catch (err) {
      console.error('Error fetching seller details:', err);
      setError('Failed to load seller details. Please try again.');
      setSeller(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Fetch associated deals based on sellerOwner
  const fetchAssociatedDeals = useCallback(async (ownerName) => {
    // Only fetch if ownerName is provided and not 'None'
    if (!ownerName || ownerName === 'None') {
      console.log('Skipping deal fetch: ownerName is not valid or "None".');
      setDeals([]);
      setDealsLoading(false); // Ensure loading is turned off
      return;
    }
    try {
      setDealsLoading(true);
      setDealsError(null);
      console.log(`Attempting to fetch deals for owner: ${ownerName} from: ${API_BASE_URL}/deal?dealOwner=${encodeURIComponent(ownerName)}`);
      const response = await fetch(`${API_BASE_URL}/deal?dealOwner=${encodeURIComponent(ownerName)}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch associated deals: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setDeals(data);
      console.log(`Associated deals fetched successfully for ${ownerName}:`, data);
    } catch (err) {
      console.error('Error fetching associated deals:', err);
      setDealsError('Failed to load associated deals.');
      setDeals([]);
    } finally {
      setDealsLoading(false);
    }
  }, []);

  // Effect to fetch seller details and then associated deals
  useEffect(() => {
    const loadData = async () => {
      const fetchedSeller = await fetchSellerDetails();
      if (fetchedSeller && fetchedSeller.sellerOwner) {
        fetchAssociatedDeals(fetchedSeller.sellerOwner);
      } else {
        // If no seller or no sellerOwner, ensure deals are cleared and loading is off
        setDeals([]);
        setDealsLoading(false);
      }
    };
    if (id) {
      loadData();
    } else {
      // If no ID is present in URL (e.g., direct navigation), stop loading and set no seller
      setLoading(false);
      setSeller(null);
      setDeals([]);
      setDealsLoading(false);
    }
  }, [id, fetchSellerDetails, fetchAssociatedDeals]); // Depend on ID and memoized fetch functions


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-2" />
        <span className="text-lg text-gray-700">Loading seller details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <button
            onClick={() => navigate('/admin-dashboard/sellers')}
            className="mt-4 block mx-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
          >
            Go Back to Sellers List
          </button>
        </div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-gray-700">
        <h2 className="text-xl font-semibold mb-4">Seller Not Found</h2>
        <p className="mb-6">The seller you are looking for does not exist or has been deleted.</p>
        <button
          onClick={() => navigate('/admin-dashboard/sellers')}
          className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-lg text-base font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Sellers List
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-indigo-700 text-white flex items-center justify-between rounded-t-lg">
          <h1 className="text-3xl font-bold">Seller Details & Deals</h1>
          <button
            onClick={() => navigate('/admin-dashboard/sellers')}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-800 transition-colors shadow-sm text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </button>
        </div>

        {/* Seller Information */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
          <div className="col-span-full pb-4 border-b border-gray-200 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {seller.title} {seller.firstName} {seller.lastName}
            </h2>
            {seller.company && <p className="text-lg text-gray-600 mt-1">{seller.company}</p>}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Contact Details</h3>
            <div className="flex items-center text-gray-700">
              <Mail className="w-5 h-5 mr-3 text-blue-500" />
              <span>Email: {seller.email || 'N/A'}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Phone className="w-5 h-5 mr-3 text-green-500" />
              <span>Mobile: {seller.mobile || 'N/A'}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Ownership & Company</h3>
            <div className="flex items-center text-gray-700">
              <User className="w-5 h-5 mr-3 text-purple-500" />
              <span>Seller Owner: {seller.sellerOwner || 'N/A'}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Building className="w-5 h-5 mr-3 text-orange-500" />
              <span>Company: {seller.company || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Description Section */}
        {seller.description && (
          <div className="p-6 border-t border-gray-200 mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
              <AlignLeft className="w-5 h-5 mr-2 text-gray-600" /> Description
            </h3>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-md border border-gray-200">
              {seller.description}
            </p>
          </div>
        )}

        {/* Associated Deals Section */}
        <div className="p-6 border-t border-gray-200 mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Associated Deals ({deals.length})</h3>
          {dealsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-500 mr-2" />
              <span className="text-gray-600">Loading associated deals...</span>
            </div>
          ) : dealsError ? (
            <div className="text-red-600 text-center py-8">{dealsError}</div>
          ) : deals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {deals.map(deal => (
                <div key={deal._id} className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200">
                  <h4 className="text-md font-semibold text-indigo-700 truncate mb-1">{deal.dealName}</h4>
                  <p className="flex items-center text-sm text-gray-700">
                    <DollarSign className="w-4 h-4 mr-2 text-green-600" /> Amount: ₹{deal.amount !== undefined && deal.amount !== null ? parseFloat(deal.amount).toLocaleString() : 'N/A'}
                  </p>
                  <p className="flex items-center text-sm text-gray-700">
                    <User className="w-4 h-4 mr-2 text-gray-500" /> Owner: {deal.dealOwner || 'N/A'}
                  </p>
                  <p className="flex items-center text-sm text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" /> Close: {deal.closeDate ? new Date(deal.closeDate).toLocaleDateString() : 'N/A'}
                  </p>
                  <p className="flex items-center text-sm text-gray-700">
                    <Tag className="w-4 h-4 mr-2 text-blue-500" /> Stage: {deal.salesStage || 'N/A'}
                  </p>
                  {/* You can add edit/delete buttons for deals here if needed */}
                  {/* For instance, to edit a deal:
                  <div className="flex justify-end space-x-2 mt-3">
                    <button
                      onClick={() => console.log('Edit deal:', deal._id)} // Replace with actual edit logic
                      className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                      title="Edit Deal"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => console.log('Delete deal:', deal._id)} // Replace with actual delete logic
                      className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
                      title="Delete Deal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  */}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">No associated deals found for this seller owner.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellertoDeal;