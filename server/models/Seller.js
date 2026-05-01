//     import mongoose from "mongoose";

//     // models/seller.js
// const sellerschema = new mongoose.Schema({
//   name: { type: String, required: true },
//   company: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   description: { type: String },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

//     const seller = mongoose.model("seller", sellerschema);
//     export default seller;




    // // models/Seller.js
    // import mongoose from 'mongoose';

    // const SellerSchema = new mongoose.Schema({
    //   sellerOwner: {
    //     type: String,
    //     default: 'Amit Seth',
    //   },
    //   title: {
    //     type: String,
    //     enum: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', ''],
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

    // const Seller = mongoose.models.Seller || mongoose.model('Seller', SellerSchema);

    // export default Seller;
    

// models/Seller.js
import mongoose from 'mongoose';

const SellerSchema = new mongoose.Schema({
  sellerOwner: {
    type: String,
    default: 'Amit Seth',
  },
  title: {
    type: String,
    enum: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.'],
    default: 'Mr.',
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    default: '',
  },
  accountName: {
    type: String,
    required: true, // Still mandatory as per previous request
    default: '',
  },
  mobile: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: false, // CHANGED: Email is no longer mandatory
    unique: true,
    sparse: true, // NEW: Ensures unique index allows multiple null/undefined values
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  leadStatus: {
    type: String,
    enum: ['Open', 'Success', 'Failure'],
    default: 'Open',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Seller = mongoose.models.Seller || mongoose.model('Seller', SellerSchema);

export default Seller;
