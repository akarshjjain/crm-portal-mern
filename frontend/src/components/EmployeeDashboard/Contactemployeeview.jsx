import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Mail, Phone, Building, Info, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // To get current user details

const API_BASE_URL = 'http://localhost:3000/api';

const Contactemployeeview = () => {
  const { id: contactId } = useParams(); // Get contact ID from URL
  const navigate = useNavigate();
  const { loading: authLoading } = useAuth(); // Just check auth loading for now, user context not directly used for filtering here

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Contact Details
  const fetchContactDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/contact/${contactId}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch contact details: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      setContact(data);
      console.log('Contact details fetched:', data);
    } catch (err) {
      console.error('Error fetching contact details:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [contactId]);

  // Use effect for fetching data
  useEffect(() => {
    // Ensure auth state is loaded before attempting to fetch
    if (!authLoading) {
      fetchContactDetails();
    }
  }, [fetchContactDetails, authLoading]);


  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-2" />
        <span className="text-lg text-gray-700">Loading Contact Details...</span>
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

  if (!contact) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans p-4">
        <h2 className="text-xl font-semibold text-gray-700">Contact Not Found</h2>
        <p className="text-gray-500 mt-2">The contact you are looking for does not exist or you do not have access.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Contacts List
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Contact Details: {contact.accountName || 'N/A'}</h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Contacts List
          </button>
        </div>

        {/* Contact Information Section */}
        <div className="p-6">
          {/* <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Contact Information</h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-800">{contact.title} {contact.firstName} {contact.lastName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="font-medium text-gray-800">{contact.company || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">{contact.email || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Mobile</p>
                <p className="font-medium text-gray-800">{contact.mobile || 'N/A'}</p>
              </div>
            </div>
            {/* NEW: Account Name Display */}
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-gray-600" /> {/* Reusing Building icon for account name */}
              <div>
                <p className="text-sm text-gray-500">Account Name</p>
                <p className="font-medium text-gray-800">{contact.accountName || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Contact Owner</p>
                <p className="font-medium text-gray-800">{contact.contactOwner || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
            <p className="text-gray-800">
              {contact.description || 'No description provided.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactemployeeview;
