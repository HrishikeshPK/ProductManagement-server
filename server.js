const express = require ("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./db/connection")

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');


app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);



const PORT = process.env.PORT || 5000 
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`))
 