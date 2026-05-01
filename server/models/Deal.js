// // models/Deal.js
// import mongoose from 'mongoose';

// const DealSchema = new mongoose.Schema({
//   dealName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   amount: {
//     type: Number, // Storing amount as a Number
//     required: true,
//   },
//   salesStage: {
//     type: String,
//     // Using an enum to match your KANBAN_STAGES on the frontend
//     enum: [
//       'Validated', 'Pipeline', 'Techwin', 'Commit', 'Upside', 'PO received',
//       'Budgetary', 'Qualification', 'Need Analysis', 'Value Proposition',
//       'Identity Decision Maker', 'Proposal/Price Quote', 'Negotiation',
//       'Closed Won', 'Lost', 'Implemented', 'Win'
//     ],
//     default: 'Qualification',
//   },
//   contactName: {
//     type: String,
//     default: '',
//   },
//   dealOwner: {
//     type: String,
//     default: 'Danish Bindra', // Default value as per frontend logic
//   },
//   closeDate: {
//     type: String, // Storing as string "YYYY-MM-DD" from date input
//     default: '',
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Check if the model already exists to prevent OverwriteModelError during hot-reloads (nodemon)
// const Deal = mongoose.models.Deal || mongoose.model('Deal', DealSchema);

// export default Deal;














// // models/Deal.js
// import mongoose from 'mongoose';

// const DealSchema = new mongoose.Schema({
//   dealName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   amount: {
//     type: Number, // Storing amount as a Number
//     required: true,
//   },
//   salesStage: {
//     type: String,
//     // Using an enum to match your KANBAN_STAGES on the frontend
//     enum: [
//       'Validated', 'Pipeline', 'Techwin', 'Commit', 'Upside', 'PO received',
//       'Budgetary', 'Qualification', 'Need Analysis', 'Value Proposition',
//       'Identity Decision Maker', 'Proposal/Price Quote', 'Negotiation',
//       'Closed Won', 'Lost', 'Implemented', 'Win'
//     ],
//     default: 'Qualification',
//   },
//   contactName: {
//     type: String,
//     default: '',
//   },
//   dealOwner: {
//     type: String,
//     default: 'Danish Bindra', // Default value as per frontend logic
//   },
//   closeDate: {
//     type: String, // Storing as string "YYYY-MM-DD" from date input
//     default: '',
//   },
//   // NEW FIELDS ADDED HERE
//   oemName: {
//     type: String,
//     default: '',
//   },
//   serviceEngineer: {
//     type: String,
//     default: '',
//   },
//   accountName: { // Storing the selected account name
//     type: String,
//     default: '',
//   },
//   // END NEW FIELDS
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Check if the model already exists to prevent OverwriteModelError during hot-reloads (nodemon)
// const Deal = mongoose.models.Deal || mongoose.model('Deal', DealSchema);

// export default Deal;



// // models/Deal.js
// import mongoose from 'mongoose';

// const DealSchema = new mongoose.Schema({
//   dealName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   amount: {
//     type: Number, // Storing amount as a Number
//     required: true,
//   },
//   salesStage: {
//     type: String,
//     // Using an enum to match your KANBAN_STAGES on the frontend
//     enum: [
//       'Validated', 'Pipeline', 'Techwin', 'Commit', 'Upside', 'PO received',
//       'Budgetary', 'Qualification', 'Need Analysis', 'Value Proposition',
//       'Identity Decision Maker', 'Proposal/Price Quote', 'Negotiation',
//       'Closed Won', 'Lost', 'Implemented', 'Win'
//     ],
//     default: 'Qualification',
//   },
//   contactName: {
//     type: String,
//     default: '',
//   },
//   dealOwner: {
//     type: String,
//     default: 'Danish Bindra', // Default value as per frontend logic
//   },
//   closeDate: {
//     type: String, // Storing as string "YYYY-MM-DD" from date input
//     default: '',
//   },
//   oemName: {
//     type: String,
//     default: '',
//   },
//   serviceEngineer: {
//     type: String,
//     default: '',
//   },
//   accountName: { // Storing the selected account name (still in schema)
//     type: String,
//     default: '',
//   },
//   // NEW FIELD: Start Date
//   startDate: { 
//     type: String, // Storing as string "YYYY-MM-DD" from date input
//     default: '',
//   },
//   // END NEW FIELDS
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Check if the model already exists to prevent OverwriteModelError during hot-reloads (nodemon)
// const Deal = mongoose.models.Deal || mongoose.model('Deal', DealSchema);

// export default Deal;



// models/Deal.js
import mongoose from 'mongoose';

const DealSchema = new mongoose.Schema({
  dealName: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number, // Storing amount as a Number
  },
  salesStage: {
    type: String,
    // Using an enum to match your KANBAN_STAGES on the frontend
    enum: [
      'Validated', 'Pipeline', 'Techwin', 'Commit', 'Upside', 'PO received',
      'Budgetary', 'Qualification', 'Need Analysis', 'Value Proposition',
      'Identity Decision Maker', 'Proposal/Price Quote', 'Negotiation',
      'Closed Won', 'Lost', 'Implemented', 'Win'
    ],
    default: 'Qualification',
  },
  contactName: {
    type: String,
    default: '',
  },
  dealOwner: {
    type: String,
    default: 'Danish Bindra', // Default value as per frontend logic
  },
  closeDate: {
    type: String, // Storing as string "YYYY-MM-DD" from date input
    default: '',
  },
  oemName: {
    type: String,
    default: '',
  },
  serviceEngineer: {
    type: String,
    default: '',
  },
  accountName: { // Storing the selected account name (still in schema)
    type: String,
    default: '',
  },
  startDate: { 
    type: String, // Storing as string "YYYY-MM-DD" from date input
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists to prevent OverwriteModelError during hot-reloads (nodemon)
const Deal = mongoose.models.Deal || mongoose.model('Deal', DealSchema);

export default Deal;
