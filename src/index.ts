import express from 'express';
import itemsRouter from './routes/items';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use('/items', itemsRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
