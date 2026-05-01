

// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ChevronLeft, Loader2, User, Mail, Phone, Building, Briefcase, Info } from 'lucide-react'; // Added Info icon for description

// const API_BASE_URL = 'http://localhost:3000/api';

// const Contactmainview = () => {
//   const { contactId } = useParams(); // Get contactId from URL parameters
//   const navigate = useNavigate(); // Hook for navigation

//   const [contact, setContact] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchContactDetails = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       console.log(`Attempting to fetch contact details for ID: ${contactId} from ${API_BASE_URL}/contact/${contactId}`);
//       const response = await fetch(`${API_BASE_URL}/contact/${contactId}`);
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('API Response Text:', errorText); // Log actual error from backend
//         throw new Error(`Failed to fetch contact details: ${response.statusText}. ${errorText}`);
//       }
//       const data = await response.json();
//       setContact(data);
//       console.log('Contact details fetched successfully:', data);
//     } catch (err) {
//       console.error('Error fetching contact details:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [contactId]);

//   useEffect(() => {
//     fetchContactDetails();
//   }, [fetchContactDetails]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
//         <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-2" />
//         <span className="text-lg text-gray-700">Loading contact details...</span>
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

//   if (!contact) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans p-4">
//         <p className="text-gray-700 text-lg mb-4">Contact not found.</p>
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
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
//         {/* Header */}
//         <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Contact Details: {contact.title} {contact.firstName} {contact.lastName}
//           </h1>
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
//           >
//             <ChevronLeft className="w-4 h-4 mr-2" />
//             Back to Contacts
//           </button>
//         </div>

//         {/* Contact Information Section */}
//         <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
//           <h2 className="col-span-full text-xl font-semibold mb-2 text-gray-800">Contact Information</h2>

//           <div className="flex flex-col">
//             <span className="text-sm font-medium text-gray-500">Contact Owner</span>
//             <span className="text-base text-gray-900 flex items-center"><User className="w-4 h-4 mr-2 text-gray-600" />{contact.contactOwner || 'N/A'}</span>
//           </div>

//           <div className="flex flex-col">
//             <span className="text-sm font-medium text-gray-500">Full Name</span>
//             <span className="text-base text-gray-900">{contact.title} {contact.firstName} {contact.lastName || 'N/A'}</span>
//           </div>

//           <div className="flex flex-col">
//             <span className="text-sm font-medium text-gray-500">Company</span>
//             <span className="text-base text-gray-900 flex items-center"><Building className="w-4 h-4 mr-2 text-gray-600" />{contact.company || 'N/A'}</span>
//           </div>

//           <div className="flex flex-col">
//             <span className="text-sm font-medium text-gray-500">Associated Account</span>
//             <span className="text-base text-gray-900 flex items-center"><Briefcase className="w-4 h-4 mr-2 text-gray-600" />{contact.accountName || 'N/A'}</span>
//           </div>

//           <div className="flex flex-col">
//             <span className="text-sm font-medium text-gray-500">Email</span>
//             <span className="text-base text-gray-900 flex items-center"><Mail className="w-4 h-4 mr-2 text-gray-600" />{contact.email || 'N/A'}</span>
//           </div>

//           <div className="flex flex-col">
//             <span className="text-sm font-medium text-gray-500">Mobile</span>
//             <span className="text-base text-gray-900 flex items-center"><Phone className="w-4 h-4 mr-2 text-gray-600" />{contact.mobile || 'N/A'}</span>
//           </div>

//           <div className="flex flex-col md:col-span-2">
//             <span className="text-sm font-medium text-gray-500">Description</span>
//             <span className="text-base text-gray-900 flex items-start">
//                 <Info className="w-4 h-4 mr-2 mt-1 text-gray-600 flex-shrink-0" />
//                 <span>{contact.description || 'N/A'}</span>
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contactmainview;


import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Loader2, User, Mail, Phone, Building, Briefcase, Info } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3000/api';

const Contactmainview = () => {
  const { contactId } = useParams(); // Get contactId from URL parameters
  const navigate = useNavigate(); // Hook for navigation

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContactDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    // --- DEBUGGING LOGS ---
    console.log("Contactmainview: Starting fetch for contact details.");
    console.log("Contactmainview: contactId from useParams:", contactId);
    // --- END DEBUGGING LOGS ---

    if (!contactId) {
        console.error("Contactmainview: No contactId found in URL parameters. Cannot fetch.");
        setError("No contact ID provided. Please navigate from the contacts list.");
        setLoading(false);
        return;
    }

    try {
      const url = `${API_BASE_URL}/contact/${contactId}`;
      console.log(`Contactmainview: Attempting to fetch from URL: ${url}`);
      
      const response = await fetch(url);
      
      // --- DEBUGGING LOGS ---
      console.log(`Contactmainview: Fetch response status: ${response.status}`);
      // --- END DEBUGGING LOGS ---

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Contactmainview: API Response Text (Error):', errorText); // Log actual error from backend
        throw new Error(`Failed to fetch contact details: ${response.statusText}. ${errorText}`);
      }
      
      const data = await response.json();
      setContact(data);
      console.log('Contactmainview: Contact details fetched successfully:', data);
    } catch (err) {
      console.error('Contactmainview: Error fetching contact details:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [contactId]); // Re-run fetch when contactId changes

  useEffect(() => {
    fetchContactDetails();
  }, [fetchContactDetails]); // Re-run effect when fetchContactDetails function reference changes

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-2" />
        <span className="text-lg text-gray-700">Loading contact details...</span>
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

  // If contact is null after loading, display "not found"
  if (!contact) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans p-4">
        <p className="text-gray-700 text-lg mb-4">Contact not found or data is empty.</p>
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

  // Render contact details if 'contact' object is available
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Contact Details: {contact.title} {contact.firstName} {contact.lastName}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Contacts
          </button>
        </div>

        {/* Contact Information Section */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <h2 className="col-span-full text-xl font-semibold mb-2 text-gray-800">Contact Information</h2>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Contact Owner</span>
            <span className="text-base text-gray-900 flex items-center"><User className="w-4 h-4 mr-2 text-gray-600" />{contact.contactOwner || 'N/A'}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Full Name</span>
            <span className="text-base text-gray-900">{contact.title} {contact.firstName} {contact.lastName || 'N/A'}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Company</span>
            <span className="text-base text-gray-900 flex items-center"><Building className="w-4 h-4 mr-2 text-gray-600" />{contact.company || 'N/A'}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Associated Account</span>
            <span className="text-base text-gray-900 flex items-center"><Briefcase className="w-4 h-4 mr-2 text-gray-600" />{contact.accountName || 'N/A'}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Email</span>
            <span className="text-base text-gray-900 flex items-center"><Mail className="w-4 h-4 mr-2 text-gray-600" />{contact.email || 'N/A'}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Mobile</span>
            <span className="text-base text-gray-900 flex items-center"><Phone className="w-4 h-4 mr-2 text-gray-600" />{contact.mobile || 'N/A'}</span>
          </div>

          <div className="flex flex-col md:col-span-2">
            <span className="text-sm font-medium text-gray-500">Description</span>
            <span className="text-base text-gray-900 flex items-start">
                <Info className="w-4 h-4 mr-2 mt-1 text-gray-600 flex-shrink-0" />
                <span>{contact.description || 'N/A'}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactmainview;
