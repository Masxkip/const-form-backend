const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: [
    "https://www.aaaconstructionequipmentmarket.ca",
    "https://aaaconstructionequipmentmarket.ca"
  ]
}));

app.use(express.json());

// Use the 
const contactRoutes = require('./routes/contactRoutes');
app.use('/api', contactRoutes); // Handles /api/contact

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
