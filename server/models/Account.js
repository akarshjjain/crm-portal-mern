// models/Account.js
import mongoose from 'mongoose';

// Define the Mongoose schema for an Account
const AccountSchema = new mongoose.Schema({
  accountOwner: {
    type: String,
    default: 'Danish Bindra', // Default value as per frontend logic
  },
  accountName: {
    type: String,
    required: true,
    trim: true,
  },
  accountType: {
    type: String,
    enum: ['Analyst', 'Competitor', 'Customer', 'Distributor', 'Integrator', 'Investor', 'Other', 'Partner', 'Prospect', 'Reseller', 'Supplier', 'Vendor', ''],
    default: '',
  },
  industry: {
    type: String,
    default: '',
  },
  billingAddress: {
    type: String,
    default: '',
  },
  billingState: {
    type: String,
    default: '',
  },
  billingCountry: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
    lowercase: true,
  },
  status: { // Added status field
    type: String,
    enum: ['pending', 'approved', 'denied'], // Possible statuses
    default: 'approved', // Default to 'approved' for accounts created by admin directly
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Mongoose model
const Account = mongoose.model('Account', AccountSchema);

export default Account;
