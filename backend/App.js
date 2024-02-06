const express = require('express');
const UserRouter = require('./Routes/UserRoutes');
const AdminRouter=require('./Routes/AdminRoutes');
const CompanyRouter= require('./Routes/CompanyRoutes');
const SecurityRouter=require('./Routes/SecurityRoutes')
const cors = require('cors');
const connectDB = require('./Config/dbConnection');


const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/', UserRouter);
app.use('/admin',AdminRouter)
app.use('/company',CompanyRouter)
app.use('/Security',SecurityRouter)
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
