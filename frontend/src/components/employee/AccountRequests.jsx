// AccountRequests.jsx (Admin Side)
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Users, Loader2, ChevronLeft } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3000/api';

// --- Custom Confirmation Modal Component ---
const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
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
};

const AccountRequests = () => {
  const navigate = useNavigate();
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState(''); // 'approve' or 'deny'
  const [accountToActOn, setAccountToActOn] = useState(null); // Account object for the action

  const fetchPendingAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch only accounts with 'pending' status
      const response = await fetch(`${API_BASE_URL}/account?status=pending`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch accounts: ${response.statusText}. ${errorText}`);
      }
      const pending = await response.json();
      setPendingAccounts(pending);
      console.log('Pending accounts fetched successfully:', pending);
    } catch (err) {
      console.error("Error fetching pending accounts:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingAccounts();
  }, [fetchPendingAccounts]);

  const handleAction = async (account, action) => {
    setAccountToActOn(account);
    setActionType(action);
    setShowConfirmModal(true);
  };

  const executeAction = async () => {
    if (!accountToActOn || !actionType) return;

    setShowConfirmModal(false); // Close modal
    try {
      const newStatus = actionType === 'approve' ? 'approved' : 'denied';
      const response = await fetch(`${API_BASE_URL}/account/${accountToActOn._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }), // Update only the status
      });

      const responseText = await response.text();
      if (!response.ok) {
        let errorMessage = responseText;
        try { const errorData = JSON.parse(responseText); if (errorData.message) errorMessage = errorData.message; } catch (parseError) { console.error("Failed to parse error response as JSON:", parseError); }
        alert(`Failed to ${actionType} account: ${errorMessage}. Check console for details.`);
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }

      console.log(`Account ${accountToActOn._id} ${actionType}d successfully.`);
      fetchPendingAccounts(); // Re-fetch pending accounts to update the list
      setAccountToActOn(null); // Reset
      setActionType(''); // Reset
    } catch (err) {
      console.error(`Error ${actionType}ing account:`, err);
      setAccountToActOn(null); // Reset
      setActionType(''); // Reset
    }
  };

  const cancelAction = () => {
    setShowConfirmModal(false);
    setAccountToActOn(null);
    setActionType('');
  };

  // Handle click on Account Name for detail view (similar to List.jsx)
  const handleAccountNameClick = (accountId) => {
    // Navigate to a read-only detail view of the requested account
    // Or if you have a general account detail page, navigate there
    // For now, it's just navigating for demonstration.
    alert(`Navigating to details for account ID: ${accountId}. This account is still in review.`);
    // navigate(`/admin-dashboard/accounts/${accountId}`); // Example: Navigate to account detail page
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-2" />
        <span className="text-lg text-gray-700">Loading account requests...</span>
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

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Account Requests ({pendingAccounts.length})</h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Accounts List
          </button>
        </div>

        {/* Pending Accounts List */}
        <div className="p-6">
          {pendingAccounts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No pending account requests.</p>
              <p className="text-sm">All accounts are currently approved or denied.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                      Account Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Account Owner
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Account Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingAccounts.map((account) => (
                    <tr key={account._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <span
                            onClick={() => handleAccountNameClick(account._id)}
                            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                        >
                            {account.accountName}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {account.accountOwner || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {account.accountType || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {account.email || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAction(account, 'approve')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                            title="Approve Account"
                          >
                            <Check className="w-4 h-4 mr-1" /> Approve
                          </button>
                          <button
                            onClick={() => handleAction(account, 'deny')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                            title="Deny Account"
                          >
                            <X className="w-4 h-4 mr-1" /> Deny
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmationModal
          message={`Are you sure you want to ${actionType} this account (${accountToActOn?.accountName})?`}
          onConfirm={executeAction}
          onCancel={cancelAction}
        />
      )}
    </div>
  );
};

export default AccountRequests;