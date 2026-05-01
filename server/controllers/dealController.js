
// // controllers/dealController.js
// import Deal from '../models/Deal.js'; // Ensure the .js extension is present
// import mongoose from 'mongoose'; // Import mongoose to check for valid ObjectId

// // Get all deals, with optional filtering by dealOwner
// export const getDeals = async (req, res) => {
//   try {
//     const { dealOwner } = req.query; // Extract dealOwner from query parameters
//     let filter = {};

//     // If dealOwner query parameter is provided, add it to the filter
//     if (dealOwner) {
//       filter.dealOwner = dealOwner;
//     }

//     // Find deals based on the constructed filter.
//     // If filter is empty ({}), it will return all deals.
//     // If filter is { dealOwner: "Some Name" }, it will return deals for that owner.
//     const deals = await Deal.find(filter);
//     res.status(200).json(deals);
//   } catch (error) {
//     console.error('Error fetching deals:', error);
//     res.status(500).json({ message: 'Server error while fetching deals.' });
//   }
// };

// // Get a single deal by ID
// export const getDealById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid Deal ID format.' });
//     }

//     const deal = await Deal.findById(id);

//     if (!deal) {
//       return res.status(404).json({ message: 'Deal not found.' });
//     }

//     res.status(200).json(deal);
//   } catch (error) {
//     console.error('Error fetching single deal by ID:', error);
//     res.status(500).json({ message: 'Server error while fetching deal.' });
//   }
// };

// // Create a new deal
// export const createDeal = async (req, res) => {
//   try {
//     const { 
//       dealName, 
//       amount, 
//       salesStage, 
//       contactName, 
//       dealOwner, 
//       closeDate,
//       oemName,          
//       serviceEngineer,  
//       accountName,      
//       startDate         // NEW FIELD
//     } = req.body;

//     // Basic validation for required fields
//     if (!dealName || typeof amount === 'undefined' || amount === null) {
//       return res.status(400).json({ message: 'Deal Name and Amount are required.' });
//     }

//     const newDeal = new Deal({
//       dealName,
//       amount: parseFloat(amount), // Ensure amount is stored as a number
//       salesStage,
//       contactName,
//       dealOwner: dealOwner === 'None' ? 'Danish Bindra' : dealOwner, // Set default if "None" selected
//       closeDate,
//       oemName,          
//       serviceEngineer,  
//       accountName,      
//       startDate,        // Include new field
//       createdAt: new Date(),
//     });

//     await newDeal.save();
//     res.status(201).json(newDeal); // Respond with the created document
//   } catch (error) {
//     console.error('Error creating deal:', error);
//     res.status(500).json({ message: 'Server error while creating deal.' });
//   }
// };

// // Update an existing deal
// export const updateDeal = async (req, res) => {
//   try {
//     const { id } = req.params; // Deal ID from URL parameter

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid Deal ID format.' });
//     }

//     const { 
//       dealName, 
//       amount, 
//       salesStage, 
//       contactName, 
//       dealOwner, 
//       closeDate,
//       oemName,          
//       serviceEngineer,  
//       accountName,      
//       startDate         // NEW FIELD
//     } = req.body;

//     // Basic validation for required fields
//     if (!dealName || typeof amount === 'undefined' || amount === null) {
//       return res.status(400).json({ message: 'Deal Name and Amount are required for update.' });
//     }

//     const updateData = {
//       dealName,
//       amount: parseFloat(amount),
//       salesStage,
//       contactName,
//       dealOwner: dealOwner === 'None' ? 'Danish Bindra' : dealOwner,
//       closeDate,
//       oemName,          
//       serviceEngineer,  
//       accountName,      
//       startDate,        // Include new field
//     };

//     // findByIdAndUpdate ensures we get the updated document back (new: true)
//     // runValidators ensures schema validation runs on update
//     const updatedDeal = await Deal.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

//     if (!updatedDeal) {
//       return res.status(404).json({ message: 'Deal not found.' });
//     }

//     res.status(200).json(updatedDeal); // Respond with the updated document
//   } catch (error) {
//     console.error('Error updating deal:', error);
//     res.status(500).json({ message: 'Server error while updating deal.' });
//   }
// };

// // Delete a deal
// export const deleteDeal = async (req, res) => {
//   try {
//     const { id } = req.params; // Deal ID from URL parameter

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid Deal ID format.' });
//     }

//     const deletedDeal = await Deal.findByIdAndDelete(id);

//     if (!deletedDeal) {
//       return res.status(404).json({ message: 'Deal not found.' });
//     }

//     res.status(200).json({ message: 'Deal deleted successfully.', deletedDeal });
//   } catch (error) {
//     console.error('Error deleting deal:', error);
//     res.status(500).json({ message: 'Server error while deleting deal.' });
//   }
// };


// // controllers/dealController.js
// import Deal from '../models/Deal.js'; // Ensure the .js extension is present
// import mongoose from 'mongoose'; // Import mongoose to check for valid ObjectId

// // Get all deals, with optional filtering by dealOwner OR accountName
// export const getDeals = async (req, res) => {
//   try {
//     const { dealOwner, accountName } = req.query; // Extract both dealOwner AND accountName from query parameters
//     let filter = {};

//     // Prioritize accountName filtering if provided (as per your request for AccountDealView)
//     if (accountName) {
//       filter.accountName = accountName; // Filter by the accountName field in the Deal model
//     } else if (dealOwner) {
//       // If no accountName, then check for dealOwner
//       filter.dealOwner = dealOwner;
//     }

//     // Find deals based on the constructed filter.
//     const deals = await Deal.find(filter);
//     res.status(200).json(deals);
//   } catch (error) {
//     console.error('Error fetching deals:', error);
//     res.status(500).json({ message: 'Server error while fetching deals.' });
//   }
// };

// // Get a single deal by ID
// export const getDealById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid Deal ID format.' });
//     }

//     const deal = await Deal.findById(id);

//     if (!deal) {
//       return res.status(404).json({ message: 'Deal not found.' });
//     }

//     res.status(200).json(deal);
//   } catch (error) {
//     console.error('Error fetching single deal by ID:', error);
//     res.status(500).json({ message: 'Server error while fetching deal.' });
//   }
// };

// // Create a new deal
// export const createDeal = async (req, res) => {
//   try {
//     const {
//       dealName,
//       amount,
//       salesStage,
//       contactName,
//       dealOwner,
//       closeDate,
//       oemName,
//       serviceEngineer,
//       accountName, // Ensure accountName is received from frontend
//       startDate
//     } = req.body;

//     // Basic validation for required fields
//     if (!dealName || typeof amount === 'undefined' || amount === null) {
//       return res.status(400).json({ message: 'Deal Name and Amount are required.' });
//     }

//     const newDeal = new Deal({
//       dealName,
//       amount: parseFloat(amount), // Ensure amount is stored as a number
//       salesStage,
//       contactName,
//       dealOwner: dealOwner === 'None' ? 'Danish Bindra' : dealOwner, // Set default if "None" selected
//       closeDate,
//       oemName,
//       serviceEngineer,
//       accountName, // Store the accountName
//       startDate,
//       createdAt: new Date(),
//     });

//     await newDeal.save();
//     res.status(201).json(newDeal); // Respond with the created document
//   } catch (error) {
//     console.error('Error creating deal:', error);
//     res.status(500).json({ message: 'Server error while creating deal.' });
//   }
// };

// // Update an existing deal
// export const updateDeal = async (req, res) => {
//   try {
//     const { id } = req.params; // Deal ID from URL parameter

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid Deal ID format.' });
//     }

//     const {
//       dealName,
//       amount,
//       salesStage,
//       contactName,
//       dealOwner,
//       closeDate,
//       oemName,
//       serviceEngineer,
//       accountName, // Ensure accountName can be updated
//       startDate
//     } = req.body;

//     // Basic validation for required fields
//     if (!dealName || typeof amount === 'undefined' || amount === null) {
//       return res.status(400).json({ message: 'Deal Name and Amount are required for update.' });
//     }

//     const updateData = {
//       dealName,
//       amount: parseFloat(amount),
//       salesStage,
//       contactName,
//       dealOwner: dealOwner === 'None' ? 'Danish Bindra' : dealOwner,
//       closeDate,
//       oemName,
//       serviceEngineer,
//       accountName, // Update the accountName
//       startDate,
//     };

//     // findByIdAndUpdate ensures we get the updated document back (new: true)
//     // runValidators ensures schema validation runs on update
//     const updatedDeal = await Deal.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

//     if (!updatedDeal) {
//       return res.status(404).json({ message: 'Deal not found.' });
//     }

//     res.status(200).json(updatedDeal); // Respond with the updated document
//   } catch (error) {
//     console.error('Error updating deal:', error);
//     res.status(500).json({ message: 'Server error while updating deal.' });
//   }
// };

// // Delete a deal
// export const deleteDeal = async (req, res) => {
//   try {
//     const { id } = req.params; // Deal ID from URL parameter

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid Deal ID format.' });
//     }

//     const deletedDeal = await Deal.findByIdAndDelete(id);

//     if (!deletedDeal) {
//       return res.status(404).json({ message: 'Deal not found.' });
//     }

//     res.status(200).json({ message: 'Deal deleted successfully.', deletedDeal });
//   } catch (error) {
//     console.error('Error deleting deal:', error);
//     res.status(500).json({ message: 'Server error while deleting deal.' });
//   }
// };


// // controllers/dealController.js
// import Deal from '../models/Deal.js'; // Ensure the .js extension is present
// import mongoose from 'mongoose'; // Import mongoose to check for valid ObjectId

// // Get all deals, with optional filtering by dealOwner OR accountName
// export const getDeals = async (req, res) => {
//   try {
//     const { dealOwner, accountName } = req.query; // Extract both dealOwner AND accountName from query parameters
//     let filter = {};

//     // Prioritize accountName filtering if provided (as per your request for AccountDealView)
//     if (accountName) {
//       filter.accountName = accountName; // Filter by the accountName field in the Deal model
//     } else if (dealOwner) {
//       // If no accountName, then check for dealOwner
//       filter.dealOwner = dealOwner;
//     }

//     // Find deals based on the constructed filter.
//     const deals = await Deal.find(filter);
//     res.status(200).json(deals);
//   } catch (error) {
//     console.error('Error fetching deals:', error);
//     res.status(500).json({ message: 'Server error while fetching deals.' });
//   }
// };

// // Get a single deal by ID
// export const getDealById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid Deal ID format.' });
//     }

//     const deal = await Deal.findById(id);

//     if (!deal) {
//       return res.status(404).json({ message: 'Deal not found.' });
//     }

//     res.status(200).json(deal);
//   } catch (error) {
//     console.error('Error fetching single deal by ID:', error);
//     res.status(500).json({ message: 'Server error while fetching deal.' });
//   }
// };

// // Create a new deal
// export const createDeal = async (req, res) => {
//   try {
//     const {
//       dealName,
//       amount,
//       salesStage,
//       contactName,
//       dealOwner,
//       closeDate,
//       oemName,
//       serviceEngineer,
//       accountName, // Ensure accountName is received from frontend
//       startDate
//     } = req.body;

//     // Basic validation for required fields FOR CREATE
//     if (!dealName || typeof amount === 'undefined' || amount === null || accountName === undefined || accountName === null || accountName === '') {
//       return res.status(400).json({ message: 'Deal Name, Amount, and Account Name are required for creation.' });
//     }

//     const newDeal = new Deal({
//       dealName,
//       amount: parseFloat(amount), // Ensure amount is stored as a number
//       salesStage,
//       contactName,
//       dealOwner: dealOwner === 'None' ? 'Danish Bindra' : dealOwner, // Set default if "None" selected
//       closeDate,
//       oemName,
//       serviceEngineer,
//       accountName, // Store the accountName
//       startDate,
//       createdAt: new Date(),
//     });

//     await newDeal.save();
//     res.status(201).json(newDeal); // Respond with the created document
//   } catch (error) {
//     console.error('Error creating deal:', error);
//     res.status(500).json({ message: 'Server error while creating deal.' });
//   }
// };

// // Update an existing deal
// export const updateDeal = async (req, res) => {
//   try {
//     const { id } = req.params; // Deal ID from URL parameter

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid Deal ID format.' });
//     }

//     const updateData = req.body; // Take all provided data from the body

//     // IMPORTANT: Removed the `dealName` and `amount` required validation here.
//     // This allows partial updates (e.g., just salesStage from Kanban).
//     // The schema itself doesn't mark them as required, which is consistent.

//     // If 'dealOwner' is explicitly set to 'None' in the update, convert it to a default
//     // (This ensures consistency with the create logic if 'None' is chosen during a full edit)
//     if (updateData.dealOwner === 'None') {
//       updateData.dealOwner = 'Danish Bindra';
//     }

//     // Ensure amount is parsed if it's part of the updateData and is not empty
//     if (updateData.amount !== undefined && updateData.amount !== null && updateData.amount !== '') {
//       updateData.amount = parseFloat(updateData.amount);
//     } else if (updateData.amount === '') { // If explicitly set to empty string, convert to null or remove property
//       updateData.amount = null; // Or delete updateData.amount; if you want to remove it from the document
//     }


//     // findByIdAndUpdate ensures we get the updated document back (new: true)
//     // runValidators ensures schema validation runs on update (e.g., enum checks)
//     const updatedDeal = await Deal.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

//     if (!updatedDeal) {
//       return res.status(404).json({ message: 'Deal not found.' });
//     }

//     res.status(200).json(updatedDeal); // Respond with the updated document
//   } catch (error) {
//     console.error('Error updating deal:', error);
//     // Specifically handle validation errors from Mongoose
//     if (error.name === 'ValidationError') {
//         const errors = Object.keys(error.errors).map(key => error.errors[key].message);
//         return res.status(400).json({ message: 'Validation failed', errors });
//     }
//     res.status(500).json({ message: 'Server error while updating deal.' });
//   }
// };

// // Delete a deal
// export const deleteDeal = async (req, res) => {
//   try {
//     const { id } = req.params; // Deal ID from URL parameter

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid Deal ID format.' });
//     }

//     const deletedDeal = await Deal.findByIdAndDelete(id);

//     if (!deletedDeal) {
//       return res.status(404).json({ message: 'Deal not found.' });
//     }

//     res.status(200).json({ message: 'Deal deleted successfully.', deletedDeal });
//   } catch (error) {
//     console.error('Error deleting deal:', error);
//     res.status(500).json({ message: 'Server error while deleting deal.' });
//   }
// };


// controllers/dealController.js
import Deal from '../models/Deal.js'; // Ensure the .js extension is present
import mongoose from 'mongoose'; // Import mongoose to check for valid ObjectId

// Get all deals, with optional filtering by dealOwner AND/OR accountName
export const getDeals = async (req, res) => {
  try {
    const { dealOwner, accountName, status } = req.query; // Include status for future-proofing if needed
    let filter = {};

    // Apply dealOwner filter if present
    if (dealOwner) {
      filter.dealOwner = dealOwner;
    }

    // Apply accountName filter if present
    if (accountName) {
      filter.accountName = accountName;
    }

    // If you ever add a 'status' field to your Deal model and want to filter by it
    if (status) {
      filter.status = status;
    }

    // Find deals based on the constructed filter.
    // If both dealOwner and accountName are provided, Mongoose will apply an implicit AND condition.
    const deals = await Deal.find(filter);
    res.status(200).json(deals);
  } catch (error) {
    console.error('Error fetching deals:', error);
    res.status(500).json({ message: 'Server error while fetching deals.' });
  }
};

// Get a single deal by ID
export const getDealById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Deal ID format.' });
    }

    const deal = await Deal.findById(id);

    if (!deal) {
      return res.status(404).json({ message: 'Deal not found.' });
    }

    res.status(200).json(deal);
  } catch (error) {
    console.error('Error fetching single deal by ID:', error);
    // Handle invalid ID format specifically
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid Deal ID format.' });
    }
    res.status(500).json({ message: 'Server error while fetching deal.' });
  }
};

// Create a new deal
export const createDeal = async (req, res) => {
  try {
    const {
      dealName,
      amount,
      salesStage,
      contactName,
      dealOwner,
      closeDate,
      oemName,
      serviceEngineer,
      accountName, // Ensure accountName is received from frontend
      startDate
    } = req.body;

    // Basic validation for required fields FOR CREATE
    if (!dealName || typeof amount === 'undefined' || amount === null || accountName === undefined || accountName === null || accountName === '') {
      return res.status(400).json({ message: 'Deal Name, Amount, and Account Name are required for creation.' });
    }

    const newDeal = new Deal({
      dealName,
      amount: parseFloat(amount), // Ensure amount is stored as a number
      salesStage,
      contactName,
      dealOwner: dealOwner === 'None' ? 'Danish Bindra' : dealOwner, // Set default if "None" selected
      closeDate,
      oemName,
      serviceEngineer,
      accountName, // Store the accountName
      startDate,
      createdAt: new Date(),
    });

    await newDeal.save();
    res.status(201).json(newDeal); // Respond with the created document
  } catch (error) {
    console.error('Error creating deal:', error);
    // Mongoose duplicate key error (if unique index is set on dealName alone)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.dealName) { // Assuming dealName could be unique
        return res.status(409).json({ message: 'A deal with this name already exists.' });
    }
    res.status(500).json({ message: 'Server error while creating deal.' });
  }
};

// Update an existing deal
export const updateDeal = async (req, res) => {
  try {
    const { id } = req.params; // Deal ID from URL parameter

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Deal ID format.' });
    }

    const updateData = req.body; // Take all provided data from the body

    // If 'dealOwner' is explicitly set to 'None' in the update, convert it to a default
    if (updateData.dealOwner === 'None') {
      updateData.dealOwner = 'Danish Bindra';
    }

    // Ensure amount is parsed if it's part of the updateData and is not empty
    if (updateData.amount !== undefined && updateData.amount !== null && updateData.amount !== '') {
      updateData.amount = parseFloat(updateData.amount);
    } else if (updateData.amount === '') { // If explicitly set to empty string, convert to null or remove property
      updateData.amount = null; // Or delete updateData.amount; if you want to remove it from the document
    }


    // findByIdAndUpdate ensures we get the updated document back (new: true)
    // runValidators ensures schema validation runs on update (e.g., enum checks)
    const updatedDeal = await Deal.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedDeal) {
      return res.status(404).json({ message: 'Deal not found.' });
    }

    res.status(200).json(updatedDeal); // Respond with the updated document
  } catch (error) {
    console.error('Error updating deal:', error);
    // Specifically handle validation errors from Mongoose
    if (error.name === 'ValidationError') {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);
        return res.status(400).json({ message: 'Validation failed', errors });
    }
    // Handle duplicate key error if dealName is being changed to an existing one (if unique index exists)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.dealName) {
        return res.status(409).json({ message: 'A deal with this name already exists.' });
    }
    res.status(500).json({ message: 'Server error while updating deal.' });
  }
};

// Delete a deal
export const deleteDeal = async (req, res) => {
  try {
    const { id } = req.params; // Deal ID from URL parameter

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Deal ID format.' });
    }

    const deletedDeal = await Deal.findByIdAndDelete(id);

    if (!deletedDeal) {
      return res.status(404).json({ message: 'Deal not found.' });
    }

    res.status(200).json({ message: 'Deal deleted successfully.', deletedDeal });
  } catch (error) {
    console.error('Error deleting deal:', error);
    res.status(500).json({ message: 'Server error while deleting deal.' });
  }
};
