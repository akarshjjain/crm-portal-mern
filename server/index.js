// server/index.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import connectToDatabase from './db/db.js';
import sellerRouter from './routes/seller.js';
import employeeRouter from './routes/employee.js';
import accountRouter from './routes/account.js';
import contactRouter from './routes/contact.js';
import dealRouter from './routes/deal.js';  
import taskRouter from './routes/task.js';

connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/account', accountRouter);
app.use('/api/contact', contactRouter);
app.use('/api/deal', dealRouter);
app.use('/api/task', taskRouter); 

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
// ✅ Server setup with environment variables, CORS, and routes
// ✅ Database connection established 