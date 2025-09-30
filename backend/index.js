const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
require('dotenv').config();
const authRoutes=require('./routes/authRoutes')
const app = express();

 

app.use(cors());  
app.use(express.json());
app.use('/api/v1/auth',authRoutes)


app.use('/api/v1/admin',require('./routes/adminRoutes'))


app.use('/api/v1/customer',require('./routes/customerRoutes'))


app.use('/api/v1',require('./routes/claimRoutes'))


app.use('/api/v1/payments',require('./routes/paymentRoutes'))

app.use('/api/v1/agent',require('./routes/agentRoutes'))

app.use('/api/v1',require('./routes/auditLogRoutes'))
 

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI)
.then(console.log("DB Connected"))
.catch((err)=>console.log(err));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
