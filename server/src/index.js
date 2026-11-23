import { fileURLToPath } from 'node:url';
import express from 'express';
import healthRouter from './routes/health.js';
import productsRouter from './routes/products.js';

const app = express();
const port = Number(process.env.PORT ?? 3000);
const clientBuild = fileURLToPath(new URL('../../client/dist/', import.meta.url));

app.use('/api/health', healthRouter);
app.use('/api/products', productsRouter);
app.use('/api', (_request, response) => {
  response.status(404).json({ error: 'API endpoint not found.' });
});
app.use(express.static(clientBuild));

app.listen(port, () => {
  console.log(`Paras Saree API listening on port ${port}`);
});
