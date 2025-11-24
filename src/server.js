import express from 'express';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weatherRoute.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/weather', weatherRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
