// // models/Contact.js
// import mongoose from 'mongoose';

// // Define the Mongoose schema for a Contact
// const ContactSchema = new mongoose.Schema({
//   contactOwner: {
//     type: String,
//     default: 'Danish Bindra', // Default value as per frontend logic
//   },
//   title: {
//     type: String,
//     enum: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', ''], // Added empty string for optional title
//     default: 'Mr.',
//   },
//   firstName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   company: {
//     type: String,
//     default: '',
//   },
//   mobile: {
//     type: String,
//     default: '',
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true, // Email should be unique for each contact
//     lowercase: true,
//     trim: true,
//   },
//   description: {
//     type: String,
//     default: '',
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Check if the model already exists to prevent OverwriteModelError during hot-reloads (nodemon)
// const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

// export default Contact;


// models/Contact.js
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  contactOwner: { type: String, default: 'Amit Seth' },
  title: { type: String, enum: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.'], default: 'Mr.' },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  company: { type: String, default: '' },
  accountName: { type: String, default: '' }, // <<< IMPORTANT: Make sure this field exists!
  mobile: { type: String, default: '' },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
export default Contact;
