import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Package, DollarSign, User, Calendar, Tag, Mail, Phone, MapPin, Building, Briefcase, Info, List, BarChart3, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // To get current user details

const API_BASE_URL = 'http://localhost:3000/api';

const Accountemployeeview = () => {
  const { id: accountId } = useParams(); // Get account ID from URL
  const navigate = useNavigate();
  const { user: currentUser, loading: authLoading } = useAuth(); // Get current user for filtering deals

  const [account, setAccount] = useState(null);
  const [deals, setDeals] = useState([]);
  const [loadingAccount, setLoadingAccount] = useState(true);
  const [loadingDeals, setLoadingDeals] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Account Details
  const fetchAccountDetails = useCallback(async () => {
    setLoadingAccount(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/account/${accountId}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch account details: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      setAccount(data);
      console.log('Account details fetched:', data);
    } catch (err) {
      console.error('Error fetching account details:', err);
      setError(err.message);
    } finally {
      setLoadingAccount(false);
    }
  }, [accountId]);

  // Fetch Deals related to this account and current employee
  const fetchDealsForAccount = useCallback(async (accountName, dealOwner) => {
    if (!accountName || !dealOwner) {
      setLoadingDeals(false);
      setDeals([]);
      return; // Cannot fetch deals without account name and owner
    }

    setLoadingDeals(true);
    try {
      // Fetch deals for the specific accountName AND the logged-in employee
      const response = await fetch(`${API_BASE_URL}/deal?accountName=${encodeURIComponent(accountName)}&dealOwner=${encodeURIComponent(dealOwner)}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch deals: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      setDeals(data);
      console.log(`Deals for account '${accountName}' and owner '${dealOwner}' fetched:`, data);
    } catch (err) {
      console.error('Error fetching deals for account:', err);
      // Optionally set an error state for deals specifically
    } finally {
      setLoadingDeals(false);
    }
  }, []);

  // Use effects for fetching data
  useEffect(() => {
    fetchAccountDetails();
  }, [fetchAccountDetails]);

  useEffect(() => {
    // Only fetch deals if account details are loaded AND user is authenticated as employee
    if (account && currentUser?.isLoggedIn && currentUser?.role === 'employee') {
      fetchDealsForAccount(account.accountName, currentUser.name);
    } else if (account && currentUser?.isLoggedIn && currentUser?.role === 'admin') {
      // Admin can see ALL deals for this account, regardless of owner
      fetchDealsForAccount(account.accountName, ''); // Pass empty string for owner to get all deals for this account
    } else if (!authLoading && !currentUser) {
      // If auth is resolved and no user, stop loading, show no deals
      setLoadingDeals(false);
      setDeals([]);
    }
  }, [account, currentUser, authLoading, fetchDealsForAccount]);


  if (loadingAccount || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-2" />
        <span className="text-lg text-gray-700">Loading Account Details...</span>
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
        <h2 className="text-xl font-semibold text-gray-700">Account Not Found</h2>
        <p className="text-gray-500 mt-2">The account you are looking for does not exist or you do not have access.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Accounts List
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
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Account Name</p>
                <p className="font-medium text-gray-800">{account.accountName || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Tag className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Account Type</p>
                <p className="font-medium text-gray-800">{account.accountType || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Briefcase className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Industry</p>
                <p className="font-medium text-gray-800">{account.industry || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-800">{account.phone || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">{account.email || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Account Owner</p>
                <p className="font-medium text-gray-800">{account.accountOwner || 'N/A'}</p>
              </div>
            </div>
            {/* <div className="flex items-center space-x-3">
              <Info className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className={`font-medium text-sm px-2 py-1 rounded-full inline-block ${
                  account.status === 'approved' ? 'bg-green-100 text-green-800' :
                  account.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {account.status || 'N/A'}
                </p>
              </div>
            </div> */}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Billing Address</h3>
            <p className="text-gray-800">
              {account.billingAddress || 'N/A'}<br/>
              {account.billingState || 'N/A'}, {account.billingCountry || 'N/A'}
            </p>
          </div>
        </div>

        {/* Related Deals Section */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Your Deals ({deals.length})</h2>
          {loadingDeals ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-600 mr-2" />
              <span className="text-lg text-gray-700">Loading Deals...</span>
            </div>
          ) : deals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <BarChart3 className="w-10 h-10 mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-medium">No deals found for this account and your ownership.</p>
              <p className="text-sm">You can create a new deal from the Deals page.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Stage</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Close Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {deals.map((deal) => (
                    <tr key={deal._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{deal.dealName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {deal.amount ? deal.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{deal.salesStage || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{deal.closeDate || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{deal.dealOwner || 'N/A'}</td>
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

export default Accountemployeeview;
