import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Mail, Phone, Building, Info, CalendarDays, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // To get current user details

const API_BASE_URL = 'http://localhost:3000/api';

const Selleremployeeview = () => {
  const { id: sellerId } = useParams(); // Get seller ID from URL
  const navigate = useNavigate();
  const { loading: authLoading } = useAuth(); // Just check auth loading for now

  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Seller Details
  const fetchSellerDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/seller/${sellerId}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch seller details: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      setSeller(data);
      console.log('Seller details fetched:', data);
    } catch (err) {
      console.error('Error fetching seller details:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [sellerId]);

  // Use effect for fetching data
  useEffect(() => {
    // Ensure auth state is loaded before attempting to fetch
    if (!authLoading) {
      fetchSellerDetails();
    }
  }, [fetchSellerDetails, authLoading]);


  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-2" />
        <span className="text-lg text-gray-700">Loading Lead Details...</span>
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

  if (!seller) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans p-4">
        <h2 className="text-xl font-semibold text-gray-700">Lead Not Found</h2>
        <p className="text-gray-500 mt-2">The lead you are looking for does not exist or you do not have access.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Leads List
        </button>
      </div>
    );
  }

  const creationDate = seller.createdAt ? new Date(seller.createdAt).toLocaleDateString() : 'N/A';

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Lead Details: {seller.firstName} {seller.lastName}</h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Leads List
          </button>
        </div>

        {/* Seller Information Section */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Lead Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-800">{seller.title} {seller.firstName} {seller.lastName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="font-medium text-gray-800">{seller.company || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">{seller.email || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Mobile</p>
                <p className="font-medium text-gray-800">{seller.mobile || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Account Name</p>
                <p className="font-medium text-gray-800">{seller.accountName || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Lead Owner</p>
                <p className="font-medium text-gray-800">{seller.sellerOwner || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Info className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Lead Status</p>
                <p className={`font-medium ${seller.leadStatus === 'Success' ? 'text-green-600' : seller.leadStatus === 'Failure' ? 'text-red-600' : 'text-gray-800'}`}>
                  {seller.leadStatus || 'N/A'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarDays className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Creation Date</p>
                <p className="font-medium text-gray-800">{creationDate}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
            <p className="text-gray-800">
              {seller.description || 'No description provided.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selleremployeeview;
