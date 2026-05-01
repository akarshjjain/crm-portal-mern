// // controllers/contactController.js
// import Contact from '../models/Contact.js'; // Ensure the .js extension is present

// // Get all contacts
// export const getContacts = async (req, res) => {
//   try {
//     const contacts = await Contact.find({});
//     res.status(200).json(contacts);
//   } catch (error) {
//     console.error('Error fetching contacts:', error);
//     res.status(500).json({ message: 'Server error while fetching contacts.' });
//   }
// };

// // Create a new contact
// export const createContact = async (req, res) => {
//   try {
//     const { contactOwner, title, firstName, lastName, company, mobile, email, description } = req.body;

//     // Basic validation for required fields
//     if (!firstName || !lastName || !email) {
//       return res.status(400).json({ message: 'First Name, Last Name, and Email are required.' });
//     }

//     // Check if a contact with this email already exists (due to unique constraint in schema)
//     const existingContact = await Contact.findOne({ email });
//     if (existingContact) {
//       return res.status(409).json({ message: 'A contact with this email already exists.' });
//     }

//     const newContact = new Contact({
//       contactOwner: contactOwner === 'None' ? 'Danish Bindra' : contactOwner, // Set default if "None" selected
//       title,
//       firstName,
//       lastName,
//       company,
//       mobile,
//       email,
//       description,
//       createdAt: new Date(),
//     });

//     await newContact.save();
//     res.status(201).json(newContact); // Respond with the created document
//   } catch (error) {
//     console.error('Error creating contact:', error);
//     res.status(500).json({ message: 'Server error while creating contact.' });
//   }
// };

// // Update an existing contact
// export const updateContact = async (req, res) => {
//   try {
//     const { id } = req.params; // Contact ID from URL parameter
//     const { contactOwner, title, firstName, lastName, company, mobile, email, description } = req.body;

//     if (!firstName || !lastName || !email) {
//       return res.status(400).json({ message: 'First Name, Last Name, and Email are required for update.' });
//     }

//     // Prepare update data, setting contactOwner default if 'None' is passed
//     const updateData = {
//       contactOwner: contactOwner === 'None' ? 'Danish Bindra' : contactOwner,
//       title,
//       firstName,
//       lastName,
//       company,
//       mobile,
//       email,
//       description,
//     };

//     // findByIdAndUpdate ensures we get the updated document back (new: true)
//     // runValidators ensures schema validation runs on update
//     const updatedContact = await Contact.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

//     if (!updatedContact) {
//       return res.status(404).json({ message: 'Contact not found.' });
//     }

//     res.status(200).json(updatedContact); // Respond with the updated document
//   } catch (error) {
//     console.error('Error updating contact:', error);
//     res.status(500).json({ message: 'Server error while updating contact.' });
//   }
// };

// // Delete a contact
// export const deleteContact = async (req, res) => {
//   try {
//     const { id } = req.params; // Contact ID from URL parameter
//     const deletedContact = await Contact.findByIdAndDelete(id);

//     if (!deletedContact) {
//       return res.status(404).json({ message: 'Contact not found.' });
//     }

//     res.status(200).json({ message: 'Contact deleted successfully.', deletedContact });
//   } catch (error) {
//     console.error('Error deleting contact:', error);
//     res.status(500).json({ message: 'Server error while deleting contact.' });
//   }
// };


// // controllers/contactController.js
// import Contact from '../models/Contact.js';
// import mongoose from 'mongoose';

// export const getContacts = async (req, res) => {
//   try {
//     const contacts = await Contact.find({});
//     res.status(200).json(contacts);
//   } catch (error) {
//     console.error('Error fetching contacts:', error);
//     res.status(500).json({ message: 'Server error while fetching contacts.' });
//   }
// };

// export const getContactById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // IMPORTANT: Validate if the ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid Contact ID format.' });
//     }

//     const contact = await Contact.findById(id);

//     if (!contact) {
//       return res.status(404).json({ message: 'Contact not found.' });
//     }
//     res.status(200).json(contact);
//   } catch (error) {
//     console.error('Error fetching single contact by ID:', error);
//     res.status(500).json({ message: 'Server error while fetching contact.' });
//   }
// };

// export const createContact = async (req, res) => {
//   try {
//     const { contactOwner, title, firstName, lastName, company, mobile, email, description, accountName } = req.body; // <-- Include accountName
//     if (!firstName || !lastName || !email) {
//       return res.status(400).json({ message: 'First Name, Last Name, and Email are required.' });
//     }
//     const newContact = new Contact({ contactOwner, title, firstName, lastName, company, mobile, email, description, accountName }); // <-- Pass accountName
//     const savedContact = await newContact.save();
//     res.status(201).json(savedContact);
//   } catch (error) {
//     console.error('Error creating contact:', error);
//     if (error.code === 11000) {
//       return res.status(409).json({ message: 'Contact with this email already exists.' });
//     }
//     res.status(500).json({ message: 'Server error while creating contact.' });
//   }
// };

// export const updateContact = async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid Contact ID format.' });
//     }
//     const { contactOwner, title, firstName, lastName, company, mobile, email, description, accountName } = req.body; // <-- Include accountName
//     if (!firstName || !lastName || !email) {
//       return res.status(400).json({ message: 'First Name, Last Name, and Email are required for update.' });
//     }
//     const updatedContact = await Contact.findByIdAndUpdate(
//       id,
//       { contactOwner, title, firstName, lastName, company, mobile, email, description, accountName }, // <-- Pass accountName
//       { new: true, runValidators: true }
//     );
//     if (!updatedContact) {
//       return res.status(404).json({ message: 'Contact not found.' });
//     }
//     res.status(200).json(updatedContact);
//   } catch (error) {
//     console.error('Error updating contact:', error);
//     if (error.code === 11000) {
//       return res.status(409).json({ message: 'Contact with this email already exists.' });
//     }
//     res.status(500).json({ message: 'Server error while updating contact.' });
//   }
// };

// export const deleteContact = async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid Contact ID format.' });
//     }
//     const deletedContact = await Contact.findByIdAndDelete(id);
//     if (!deletedContact) {
//       return res.status(404).json({ message: 'Contact not found.' });
//     }
//     res.status(200).json({ message: 'Contact deleted successfully.' });
//   } catch (error) {
//     console.error('Error deleting contact:', error);
//     res.status(500).json({ message: 'Server error while deleting contact.' });
//   }
// };


// controllers/contactController.js
import Contact from '../models/Contact.js';
import mongoose from 'mongoose';

export const getContacts = async (req, res) => {
  try {
    const { contactOwner } = req.query; // <--- Extract contactOwner from query parameters
    let filter = {}; // Initialize an empty filter object

    // If contactOwner is provided in the query, add it to the filter
    if (contactOwner) {
      filter.contactOwner = contactOwner;
    }

    // Find contacts based on the constructed filter.
    // If filter is empty (no contactOwner provided), it will find all contacts.
    // If contactOwner is provided, it will find contacts matching that owner.
    const contacts = await Contact.find(filter);
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Server error while fetching contacts.' });
  }
};

export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Contact ID format.' });
    }

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error('Error fetching single contact by ID:', error);
    res.status(500).json({ message: 'Server error while fetching contact.' });
  }
};

export const createContact = async (req, res) => {
  try {
    const { contactOwner, title, firstName, lastName, company, mobile, email, description, accountName } = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'First Name, Last Name, and Email are required.' });
    }
    // Add createdAt field to the new contact
    const newContact = new Contact({ contactOwner, title, firstName, lastName, company, mobile, email, description, accountName, createdAt: new Date() });
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    console.error('Error creating contact:', error);
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Contact with this email already exists.' });
    }
    if (error.name === 'ValidationError') { // Catch Mongoose validation errors
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);
        return res.status(400).json({ message: 'Validation failed', errors });
    }
    res.status(500).json({ message: 'Server error while creating contact.' });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Contact ID format.' });
    }
    const updateData = req.body; // Use updateData to allow partial updates

    // Ensure required fields are not being set to empty strings on update
    if ((updateData.firstName !== undefined && updateData.firstName === '') ||
        (updateData.lastName !== undefined && updateData.lastName === '') ||
        (updateData.email !== undefined && updateData.email === '')) {
      return res.status(400).json({ message: 'First Name, Last Name, and Email cannot be empty.' });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      updateData, // Pass updateData directly
      { new: true, runValidators: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    console.error('Error updating contact:', error);
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Contact with this email already exists.' });
    }
    if (error.name === 'ValidationError') {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);
        return res.status(400).json({ message: 'Validation failed', errors });
    }
    res.status(500).json({ message: 'Server error while updating contact.' });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Contact ID format.' });
    }
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Server error while deleting contact.' });
  }
};
