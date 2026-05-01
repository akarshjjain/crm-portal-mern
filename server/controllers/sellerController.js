// import seller from "../models/seller.js";

// const getSellers = async (req, res) => {
//   try {
//     const sellers = await seller.find();
//     return res.status(200).json({ success: true, sellers });
//   } catch (error) {
//     return res.status(500).json({ success: false, error: "get Sellers server error" });
//   }
// };

// const addSeller = async (req, res) => {
//   try {
//     const { name, company, email, phone, description } = req.body;

//     const newSeller = new seller({ name, company, email, phone, description });
//     await newSeller.save();

//     return res.status(200).json({ success: true, seller: newSeller });
//   } catch (error) {
//     console.error("addSeller error:", error);
//     return res.status(500).json({ success: false, error: "add seller server error" });
//   }
// };


// const getSeller = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const seller = await seller.findById({ _id: id });
//     return res.status(200).json({ success: true, seller }); // fixed: return the actual seller
//   } catch (error) {
//     return res.status(500).json({ success: false, error: "get seller server error" });
//   }
// };

// const updateSeller = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { dep_name, description } = req.body;
//     const updateDep = await seller.findByIdAndUpdate(
//       { _id: id },
//       { dep_name, description },
//       { new: true } // to return updated document
//     );
//     return res.status(200).json({ success: true, seller: updateDep });
//   } catch (error) {
//     return res.status(500).json({ success: false, error: "update seller server error" });
//   }
// };

// const deleteSeller = async (req, res) =>{
//    try {
//     const { id } = req.params;
//     const deletedep = await seller.findByIdAndDelete({ _id: id });
//     return res.status(200).json({ success: true, seller: deletedep });
//   } catch (error) {
//     return res.status(500).json({ success: false, error: "delete seller server error" });
//   }
// 



















// // controllers/sellerController.js
// import Seller from '../models/Seller.js'; // Ensure the .js extension is present

// // Get all sellers
// export const getSellers = async (req, res) => {
//   try {
//     const sellers = await Seller.find({});
//     res.status(200).json(sellers);
//   } catch (error) {
//     console.error('Error fetching sellers:', error);
//     res.status(500).json({ message: 'Server error while fetching sellers.' });
//   }
// };

// // Create a new seller
// export const createSeller = async (req, res) => {
//   try {
//     const { sellerOwner, title, firstName, lastName, company, mobile, email, description } = req.body;

//     // Basic validation
//     if (!firstName || !lastName || !email) {
//       return res.status(400).json({ message: 'First Name, Last Name, and Email are required.' });
//     }

//     // Check if a seller with this email already exists
//     const existingSeller = await Seller.findOne({ email });
//     if (existingSeller) {
//       return res.status(409).json({ message: 'A seller with this email already exists.' });
//     }

//     const newSeller = new Seller({
//       sellerOwner: sellerOwner === 'None' ? 'Danish Bindra' : sellerOwner, // Set default if "None" selected
//       title,
//       firstName,
//       lastName,
//       company,
//       mobile,
//       email,
//       description,
//       createdAt: new Date(),
//     });

//     await newSeller.save();
//     res.status(201).json(newSeller);
//   } catch (error) {
//     console.error('Error creating seller:', error);
//     res.status(500).json({ message: 'Server error while creating seller.' });
//   }
// };

// // Update an existing seller
// export const updateSeller = async (req, res) => {
//   try {
//     const { id } = req.params; // Seller ID from URL parameter
//     const { sellerOwner, title, firstName, lastName, company, mobile, email, description } = req.body;

//     if (!firstName || !lastName || !email) {
//       return res.status(400).json({ message: 'First Name, Last Name, and Email are required for update.' });
//     }

//     // Prepare update data, setting sellerOwner default if 'None' is passed
//     const updateData = {
//       sellerOwner: sellerOwner === 'None' ? 'Danish Bindra' : sellerOwner,
//       title,
//       firstName,
//       lastName,
//       company,
//       mobile,
//       email,
//       description,
//     };

//     const updatedSeller = await Seller.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

//     if (!updatedSeller) {
//       return res.status(404).json({ message: 'Seller not found.' });
//     }

//     res.status(200).json(updatedSeller);
//   } catch (error) {
//     console.error('Error updating seller:', error);
//     res.status(500).json({ message: 'Server error while updating seller.' });
//   }
// };

// // Delete a seller
// export const deleteSeller = async (req, res) => {
//   try {
//     const { id } = req.params; // Seller ID from URL parameter
//     const deletedSeller = await Seller.findByIdAndDelete(id);

//     if (!deletedSeller) {
//       return res.status(404).json({ message: 'Seller not found.' });
//     }

//     res.status(200).json({ message: 'Seller deleted successfully.', deletedSeller });
//   } catch (error) {
//     console.error('Error deleting seller:', error);
//     res.status(500).json({ message: 'Server error while deleting seller.' });
//   }
// };





// // controllers/sellerController.js
// import Seller from '../models/Seller.js'; // Ensure the .js extension is present

// // Get all sellers
// export const getSellers = async (req, res) => {
//   try {
//     const sellers = await Seller.find({});
//     res.status(200).json(sellers);
//   } catch (error) {
//     console.error('Error fetching sellers:', error);
//     res.status(500).json({ message: 'Server error while fetching sellers.' });
//   }
// };

// // Get a single seller by ID
// export const getSellerById = async (req, res) => {
//   try {
//     const { id } = req.params; // Seller ID from URL parameter
//     const seller = await Seller.findById(id);

//     if (!seller) {
//       // If no seller found with the given ID
//       return res.status(404).json({ message: 'Seller not found.' });
//     }

//     res.status(200).json(seller);
//   } catch (error) {
//     console.error('Error fetching single seller by ID:', error);
//     // Handle cases where the ID format is invalid (e.g., not a valid MongoDB ObjectId)
//     if (error.kind === 'ObjectId') {
//       return res.status(400).json({ message: 'Invalid Seller ID format.' });
//     }
//     res.status(500).json({ message: 'Server error while fetching seller by ID.' });
//   }
// };


// // Create a new seller
// export const createSeller = async (req, res) => {
//   try {
//     const { sellerOwner, title, firstName, lastName, company, mobile, email, description } = req.body;

//     // Basic validation
//     if (!firstName || !lastName || !email) {
//       return res.status(400).json({ message: 'First Name, Last Name, and Email are required.' });
//     }

//     // Check if a seller with this email already exists
//     const existingSeller = await Seller.findOne({ email });
//     if (existingSeller) {
//       return res.status(409).json({ message: 'A seller with this email already exists.' });
//     }

//     const newSeller = new Seller({
//       sellerOwner: sellerOwner === 'None' ? 'Danish Bindra' : sellerOwner, // Set default if "None" selected
//       title,
//       firstName,
//       lastName,
//       company,
//       mobile,
//       email,
//       description,
//       createdAt: new Date(),
//     });

//     await newSeller.save();
//     res.status(201).json(newSeller);
//   } catch (error) {
//     console.error('Error creating seller:', error);
//     res.status(500).json({ message: 'Server error while creating seller.' });
//   }
// };

// // Update an existing seller
// export const updateSeller = async (req, res) => {
//   try {
//     const { id } = req.params; // Seller ID from URL parameter
//     const { sellerOwner, title, firstName, lastName, company, mobile, email, description } = req.body;

//     if (!firstName || !lastName || !email) {
//       return res.status(400).json({ message: 'First Name, Last Name, and Email are required for update.' });
//     }

//     // Prepare update data, setting sellerOwner default if 'None' is passed
//     const updateData = {
//       sellerOwner: sellerOwner === 'None' ? 'Danish Bindra' : sellerOwner,
//       title,
//       firstName,
//       lastName,
//       company,
//       mobile,
//       email,
//       description,
//     };

//     const updatedSeller = await Seller.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

//     if (!updatedSeller) {
//       return res.status(404).json({ message: 'Seller not found.' });
//     }

//     res.status(200).json(updatedSeller);
//   } catch (error) {
//     console.error('Error updating seller:', error);
//     res.status(500).json({ message: 'Server error while updating seller.' });
//   }
// };

// // Delete a seller
// export const deleteSeller = async (req, res) => {
//   try {
//     const { id } = req.params; // Seller ID from URL parameter
//     const deletedSeller = await Seller.findByIdAndDelete(id);

//     if (!deletedSeller) {
//       return res.status(404).json({ message: 'Seller not found.' });
//     }

//     res.status(200).json({ message: 'Seller deleted successfully.', deletedSeller });
//   } catch (error) {
//     console.error('Error deleting seller:', error);
//     res.status(500).json({ message: 'Server error while deleting seller.' });
//   }
// };



// // controllers/sellerController.js
// import Seller from '../models/Seller.js';
// import mongoose from 'mongoose'; // Import mongoose to check for valid ObjectId

// // Get all sellers, with optional filtering by sellerOwner (for employee view)
// export const getSellers = async (req, res) => {
//   try {
//     const { sellerOwner } = req.query; // Extract sellerOwner from query parameters
//     let filter = {};

//     // If sellerOwner is provided in the query, filter by it
//     if (sellerOwner) {
//       filter.sellerOwner = sellerOwner;
//     }

//     const sellers = await Seller.find(filter);
//     res.status(200).json(sellers);
//   } catch (error) {
//     console.error('Error fetching sellers:', error);
//     res.status(500).json({ message: 'Server error while fetching sellers.' });
//   }
// };

// // Get a single seller by ID
// export const getSellerById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // IMPORTANT: Validate if the ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid Seller ID format.' });
//     }

//     const seller = await Seller.findById(id);

//     if (!seller) {
//       return res.status(404).json({ message: 'Seller not found.' });
//     }

//     res.status(200).json(seller);
//   } catch (error) {
//     console.error('Error fetching single seller by ID:', error);
//     res.status(500).json({ message: 'Server error while fetching seller.' });
//   }
// };

// // Create a new seller
// export const createSeller = async (req, res) => {
//   try {
//     const {
//       sellerOwner,
//       title,
//       firstName,
//       lastName,
//       company,
//       accountName, // NEW: Include accountName
//       mobile,
//       email,
//       description,
//       leadStatus // NEW: Include leadStatus (though it defaults to 'Open' if not provided by client)
//     } = req.body;

//     // Basic validation for required fields
//     if (!firstName || !lastName || !email || !accountName) { // Make accountName mandatory
//       return res.status(400).json({ message: 'First Name, Last Name, Email, and Account Name are required.' });
//     }

//     // Check if a seller with this email already exists
//     const existingSeller = await Seller.findOne({ email });
//     if (existingSeller) {
//       return res.status(409).json({ message: 'A seller with this email already exists.' });
//     }

//     const newSeller = new Seller({
//       sellerOwner: sellerOwner === 'None' ? 'Amit Seth' : sellerOwner, // Set default if "None" selected from client
//       title,
//       firstName,
//       lastName,
//       company,
//       accountName, // Store accountName
//       mobile,
//       email,
//       description,
//       leadStatus, // Store leadStatus (will use schema default 'Open' if not provided)
//       createdAt: new Date(),
//     });

//     const savedSeller = await newSeller.save();
//     res.status(201).json(savedSeller);
//   } catch (error) {
//     console.error('Error creating seller:', error);
//     // Handle duplicate email error (MongoDB E11000)
//     if (error.code === 11000) {
//       return res.status(409).json({ message: 'Seller with this email already exists.' });
//     }
//     // Handle Mongoose validation errors (e.g., if enum value is invalid)
//     if (error.name === 'ValidationError') {
//       const errors = Object.keys(error.errors).map(key => error.errors[key].message);
//       return res.status(400).json({ message: 'Validation failed', errors });
//     }
//     res.status(500).json({ message: 'Server error while creating seller.' });
//   }
// };

// // Update an existing seller
// export const updateSeller = async (req, res) => {
//   try {
//     const { id } = req.params; // Seller ID from URL parameter

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid Seller ID format.' });
//     }

//     const {
//       sellerOwner,
//       title,
//       firstName,
//       lastName,
//       company,
//       accountName, // NEW: Include accountName in update
//       mobile,
//       email,
//       description,
//       leadStatus // NEW: Include leadStatus in update
//     } = req.body;

//     // Basic validation: ensure required fields are not being set to empty strings on update
//     // Note: If you want to allow making optional fields empty, adjust this logic.
//     if ((firstName !== undefined && firstName === '') ||
//         (lastName !== undefined && lastName === '') ||
//         (email !== undefined && email === '') ||
//         (accountName !== undefined && accountName === '')) { // Ensure accountName is not set to empty
//       return res.status(400).json({ message: 'First Name, Last Name, Email, and Account Name cannot be empty.' });
//     }

//     // Prepare update data, defaulting sellerOwner if 'None' is passed
//     const updateData = {
//       sellerOwner: sellerOwner === 'None' ? 'Amit Seth' : sellerOwner, // Handle default for owner
//       title,
//       firstName,
//       lastName,
//       company,
//       accountName, // Include accountName
//       mobile,
//       email,
//       description,
//       leadStatus, // Include leadStatus
//     };

//     // Find and update the seller. `new: true` returns the updated document. `runValidators: true` applies schema validators.
//     const updatedSeller = await Seller.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

//     if (!updatedSeller) {
//       return res.status(404).json({ message: 'Seller not found.' });
//     }

//     res.status(200).json(updatedSeller);
//   } catch (error) {
//     console.error('Error updating seller:', error);
//     // Handle duplicate email error
//     if (error.code === 11000) {
//       return res.status(409).json({ message: 'Seller with this email already exists.' });
//     }
//     // Handle Mongoose validation errors
//     if (error.name === 'ValidationError') {
//         const errors = Object.keys(error.errors).map(key => error.errors[key].message);
//         return res.status(400).json({ message: 'Validation failed', errors });
//     }
//     res.status(500).json({ message: 'Server error while updating seller.' });
//   }
// };

// // Delete a seller
// export const deleteSeller = async (req, res) => {
//   try {
//     const { id } = req.params; // Seller ID from URL parameter

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid Seller ID format.' });
//     }

//     const deletedSeller = await Seller.findByIdAndDelete(id);

//     if (!deletedSeller) {
//       return res.status(404).json({ message: 'Seller not found.' });
//     }

//     res.status(200).json({ message: 'Seller deleted successfully.', deletedSeller });
//   } catch (error) {
//     console.error('Error deleting seller:', error);
//     res.status(500).json({ message: 'Server error while deleting seller.' });
//   }
// };


// controllers/sellerController.js
import Seller from '../models/Seller.js';
import mongoose from 'mongoose';

// Get all sellers, with optional filtering by sellerOwner (for employee view)
export const getSellers = async (req, res) => {
  try {
    const { sellerOwner } = req.query;
    let filter = {};

    if (sellerOwner) {
      filter.sellerOwner = sellerOwner;
    }

    const sellers = await Seller.find(filter);
    res.status(200).json(sellers);
  } catch (error) {
    console.error('Error fetching sellers:', error);
    res.status(500).json({ message: 'Server error while fetching sellers.' });
  }
};

// Get a single seller by ID
export const getSellerById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Seller ID format.' });
    }

    const seller = await Seller.findById(id);

    if (!seller) {
      return res.status(404).json({ message: 'Seller not found.' });
    }

    res.status(200).json(seller);
  } catch (error) {
    console.error('Error fetching single seller by ID:', error);
    res.status(500).json({ message: 'Server error while fetching seller.' });
  }
};

// Create a new seller
export const createSeller = async (req, res) => {
  try {
    const {
      sellerOwner,
      title,
      firstName,
      lastName,
      company,
      accountName,
      mobile,
      email, // Email is now optional, but if provided must be unique
      description,
      leadStatus
    } = req.body;

    // Basic validation for mandatory fields (email is no longer here)
    if (!firstName || !lastName || !accountName) { // CHANGED: Removed !email
      return res.status(400).json({ message: 'First Name, Last Name, and Account Name are required.' });
    }

    // Check for duplicate email only if email is provided
    if (email) { // NEW: Only check if email is present
        const existingSeller = await Seller.findOne({ email });
        if (existingSeller) {
            return res.status(409).json({ message: 'A seller with this email already exists.' });
        }
    }

    const newSeller = new Seller({
      sellerOwner: sellerOwner === 'None' ? 'Amit Seth' : sellerOwner,
      title,
      firstName,
      lastName,
      company,
      accountName,
      mobile,
      email: email || null, // Store as null if empty string to match sparse index behavior
      description,
      leadStatus,
      createdAt: new Date(),
    });

    const savedSeller = await newSeller.save();
    res.status(201).json(savedSeller);
  } catch (error) {
    console.error('Error creating seller:', error);
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Seller with this email already exists.' });
    }
    if (error.name === 'ValidationError') {
      const errors = Object.keys(error.errors).map(key => error.errors[key].message);
      return res.status(400).json({ message: 'Validation failed', errors });
    }
    res.status(500).json({ message: 'Server error while creating seller.' });
  }
};

// Update an existing seller
export const updateSeller = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Seller ID format.' });
    }

    const {
      sellerOwner,
      title,
      firstName,
      lastName,
      company,
      accountName,
      mobile,
      email, // Email is now optional
      description,
      leadStatus
    } = req.body;

    // Basic validation: ensure required fields are not being set to empty strings on update
    if ((firstName !== undefined && firstName === '') ||
        (lastName !== undefined && lastName === '') ||
        (accountName !== undefined && accountName === '')) { // CHANGED: Removed email check here
      return res.status(400).json({ message: 'First Name, Last Name, and Account Name cannot be empty.' });
    }

    // Find the existing seller to check for email changes
    const currentSeller = await Seller.findById(id);
    if (!currentSeller) {
        return res.status(404).json({ message: 'Seller not found.' });
    }

    // Check for duplicate email if email is being updated and is not empty
    if (email !== undefined && email !== null && email !== '' && email !== currentSeller.email) {
        const existingSellerWithNewEmail = await Seller.findOne({ email });
        if (existingSellerWithNewEmail && String(existingSellerWithNewEmail._id) !== String(id)) {
            return res.status(409).json({ message: 'Another seller with this email already exists.' });
        }
    }

    const updateData = {
      sellerOwner: sellerOwner === 'None' ? 'Amit Seth' : sellerOwner,
      title,
      firstName,
      lastName,
      company,
      accountName,
      mobile,
      email: email === '' ? null : email, // Store empty string as null for sparse index
      description,
      leadStatus,
    };

    const updatedSeller = await Seller.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedSeller) {
      return res.status(404).json({ message: 'Seller not found.' });
    }

    res.status(200).json(updatedSeller);
  } catch (error) {
    console.error('Error updating seller:', error);
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Seller with this email already exists.' });
    }
    if (error.name === 'ValidationError') {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);
        return res.status(400).json({ message: 'Validation failed', errors });
    }
    res.status(500).json({ message: 'Server error while updating seller.' });
  }
};

// Delete a seller
export const deleteSeller = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Seller ID format.' });
    }

    const deletedSeller = await Seller.findByIdAndDelete(id);

    if (!deletedSeller) {
      return res.status(404).json({ message: 'Seller not found.' });
    }

    res.status(200).json({ message: 'Seller deleted successfully.', deletedSeller });
  } catch (error) {
    console.error('Error deleting seller:', error);
    res.status(500).json({ message: 'Server error while deleting seller.' });
  }
};
