import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'; // Make sure the path and `.js` are correct
import noteRoutes from './routes/noteRoutes.js'; // Adjust if needed

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Root route for Render test
app.get('/', (req, res) => {
  res.send('Backend is live');
});

// Notes routes
app.use('/api/notes', noteRoutes);

// Start server
const PORT = process.env.PORT || 10000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('MongoDB connection failed:', err);
});
