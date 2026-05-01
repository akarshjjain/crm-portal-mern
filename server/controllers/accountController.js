// // controllers/accountController.js
// import Account from '../models/Account.js'; // Ensure the .js extension is present

// // Get all accounts
// export const getAccounts = async (req, res) => {
//   try {
//     const accounts = await Account.find({});
//     res.status(200).json(accounts);
//   } catch (error) {
//     console.error('Error fetching accounts:', error);
//     res.status(500).json({ message: 'Server error while fetching accounts.' });
//   }
// };

// // Get account by ID (NEW FUNCTION)
// export const getAccountById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const account = await Account.findById(id);

//     if (!account) {
//       return res.status(404).json({ message: 'Account not found.' });
//     }

//     res.status(200).json(account);
//   } catch (error) {
//     console.error('Error fetching single account:', error);
//     // Handle invalid ID format specifically
//     if (error.kind === 'ObjectId') {
//         return res.status(400).json({ message: 'Invalid Account ID format.' });
//     }
//     res.status(500).json({ message: 'Server error while fetching account.' });
//   }
// };


// // Create a new account
// export const createAccount = async (req, res) => {
//   try {
//     // Destructure status from req.body, providing a default if not present
//     // Frontend (admin side) will send 'approved', user requests will send 'pending'
//     const { accountName, accountOwner, accountType, industry, billingAddress, billingState, billingCountry, phone, email, status = 'approved' } = req.body;

//     if (!accountName) {
//       return res.status(400).json({ message: 'Account Name is required.' });
//     }

//     // Check for duplicates only if the status is 'approved' or if you want to prevent duplicates for pending requests too
//     // For now, only prevent duplicates for 'approved' accounts. Pending requests can have duplicates until approved.
//     if (status === 'approved') {
//       const existingAccount = await Account.findOne({ accountName, accountOwner, status: 'approved' });
//       if (existingAccount) {
//         return res.status(409).json({ message: 'An approved account with this Name and Owner already exists.' });
//       }
//     }


//     const newAccount = new Account({
//       accountName,
//       accountOwner: accountOwner === 'None' ? 'Danish Bindra' : accountOwner,
//       accountType,
//       industry,
//       billingAddress,
//       billingState,
//       billingCountry,
//       phone,
//       email,
//       status, // Save the status
//     });

//     const savedAccount = await newAccount.save();
//     res.status(201).json(savedAccount);
//   } catch (error) {
//     console.error('Error creating account:', error);
//     res.status(500).json({ message: 'Server error while creating account.' });
//   }
// };

// // Update an account
// export const updateAccount = async (req, res) => {
//   try {
//     const { id } = req.params;
//     // Include status in destructuring for updates
//     const { accountName, accountOwner, accountType, industry, billingAddress, billingState, billingCountry, phone, email, status } = req.body;

//     if (!accountName) {
//       return res.status(400).json({ message: 'Account Name is required for update.' });
//     }

//     const updateFields = {
//       accountName,
//       accountOwner: accountOwner === 'None' ? 'Danish Bindra' : accountOwner,
//       accountType,
//       industry,
//       billingAddress,
//       billingState,
//       billingCountry,
//       phone,
//       email,
//     };

//     // Only add status to update fields if it's provided in the request body
//     if (status !== undefined) {
//       updateFields.status = status;
//     }

//     const updatedAccount = await Account.findByIdAndUpdate(
//       id,
//       updateFields,
//       { new: true, runValidators: true } // Return the updated document and run schema validators
//     );

//     if (!updatedAccount) {
//       return res.status(404).json({ message: 'Account not found.' });
//     }

//     res.status(200).json(updatedAccount);
//   } catch (error) {
//     console.error('Error updating account:', error);
//     res.status(500).json({ message: 'Server error while updating account.' });
//   }
// };

// // Delete an account
// export const deleteAccount = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedAccount = await Account.findByIdAndDelete(id);

//     if (!deletedAccount) {
//       return res.status(404).json({ message: 'Account not found.' });
//     }

//     res.status(200).json({ message: 'Account deleted successfully.' });
//   } catch (error) {
//     console.error('Error deleting account:', error);
//     res.status(500).json({ message: 'Server error while deleting account.' });
//   }
// };


// controllers/accountController.js
import Account from '../models/Account.js'; // Ensure the .js extension is present
import mongoose from 'mongoose'; // Import mongoose to check for valid ObjectId

// Get all accounts, with optional filtering by accountOwner AND/OR status
export const getAccounts = async (req, res) => {
  try {
    const { accountOwner, status } = req.query;
    let filter = {};

    // Filter by status if provided.
    // If no status is provided, you might want a default behavior, e.g., showing 'approved'.
    // The frontend should ideally specify the status it needs.
    if (status) {
      filter.status = status;
    }

    // Filter by accountOwner if provided
    if (accountOwner) {
      filter.accountOwner = accountOwner;
    }

    // Find accounts based on the constructed filter.
    const accounts = await Account.find(filter);
    res.status(200).json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ message: 'Server error while fetching accounts.' });
  }
};

// Get account by ID
export const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Account ID format.' });
    }

    const account = await Account.findById(id);

    if (!account) {
      return res.status(404).json({ message: 'Account not found.' });
    }

    res.status(200).json(account);
  } catch (error) {
    console.error('Error fetching single account:', error);
    // Handle invalid ID format specifically (though mongoose.Types.ObjectId.isValid handles most)
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid Account ID format.' });
    }
    res.status(500).json({ message: 'Server error while fetching account.' });
  }
};


// Create a new account (used for both employee requests and admin direct creation)
export const createAccount = async (req, res) => {
  try {
    // Destructure all fields including 'status'.
    // The frontend should now explicitly send the desired status ('pending' or 'approved').
    const { accountName, accountOwner, accountType, industry, billingAddress, billingState, billingCountry, phone, email, status } = req.body;

    // Basic validation for required fields for ANY account creation
    if (!accountName) {
      return res.status(400).json({ message: 'Account Name is required.' });
    }

    // Optional: Add more specific validation here if certain fields are mandatory for ALL new accounts.
    // E.g., if phone or email must always be present.

    // Check for duplicates only for 'approved' accounts to avoid multiple pending requests for same name
    // If you want to prevent duplicate *pending* requests too, adjust this logic.
    const existingAccount = await Account.findOne({ accountName });
    if (existingAccount) {
      // If an account with the same name exists, check its status
      if (existingAccount.status === 'approved') {
        return res.status(409).json({ message: 'An approved account with this name already exists.' });
      } else if (existingAccount.status === 'pending') {
        // If a pending request with the same name exists, prevent another one
        return res.status(409).json({ message: 'A pending request for an account with this name already exists.' });
      }
    }


    const newAccount = new Account({
      accountName,
      // If accountOwner is 'None' from frontend (admin choice), set a default
      accountOwner: accountOwner === 'None' ? 'Danish Bindra' : accountOwner,
      accountType,
      industry,
      billingAddress,
      billingState,
      billingCountry,
      phone,
      email,
      status: status || 'pending', // Default to 'pending' if status is not explicitly sent
      createdAt: new Date(),
    });

    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount);
  } catch (error) {
    console.error('Error creating account:', error);
    // Mongoose duplicate key error (if unique index is set on accountName alone)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.accountName) {
        return res.status(409).json({ message: 'An account with this name already exists.' });
    }
    res.status(500).json({ message: 'Server error while creating account.' });
  }
};

// Update an account
export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    // Get the entire request body as updateFields
    const updateFields = req.body;

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Account ID format.' });
    }

    // IMPORTANT: Removed the `accountName` required validation here.
    // This allows partial updates (e.g., just changing 'status' from admin side).
    // The `Account.js` model itself already handles `required: true` on `accountName` for creation.

    // If 'accountOwner' is explicitly set to 'None' in the update, convert it to a default
    // This handles cases where an admin might be doing a full update and sets owner to 'None'.
    if (updateFields.accountOwner === 'None') {
      updateFields.accountOwner = 'Danish Bindra';
    }


    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      updateFields, // Use the entire body for updates
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedAccount) {
      return res.status(404).json({ message: 'Account not found.' });
    }

    res.status(200).json(updatedAccount);
  } catch (error) {
    console.error('Error updating account:', error);
    // Handle specific validation errors from Mongoose
    if (error.name === 'ValidationError') {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);
        return res.status(400).json({ message: 'Validation failed', errors });
    }
    // Handle duplicate key error if accountName is being changed to an existing one
    if (error.code === 11000 && error.keyPattern && error.keyPattern.accountName) {
        return res.status(409).json({ message: 'An account with this name already exists.' });
    }
    res.status(500).json({ message: 'Server error while updating account.' });
  }
};

// Delete an account
export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Account ID format.' });
    }

    const deletedAccount = await Account.findByIdAndDelete(id);

    if (!deletedAccount) {
      return res.status(404).json({ message: 'Account not found.' });
    }

    res.status(200).json({ message: 'Account deleted successfully.' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Server error while deleting account.' });
  }
};
