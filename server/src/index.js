import { fileURLToPath } from 'node:url';
import express from 'express';
import { openPool } from './db/pool.js';
import { createCatalog } from './models/catalog.js';
import healthRouter from './routes/health.js';
import productsRouter from './routes/products.js';

const app = express();
const port = Number(process.env.PORT ?? 3000);
const clientBuild = fileURLToPath(new URL('../../client/dist/', import.meta.url));
const pool = process.env.DATABASE_URL ? openPool(process.env.DATABASE_URL) : null;

if (pool) {
  try {
    await pool.query('SELECT id FROM catalog_products LIMIT 0');
  } catch (error) {
    console.error('Could not open the PostgreSQL catalog. Check DATABASE_URL and run db:seed.', error.code ?? error.name);
    await pool.end();
    process.exit(1);
  }
}

app.disable('x-powered-by');
app.locals.catalog = createCatalog(pool);
app.use('/api/health', healthRouter);
app.use('/api/products', productsRouter);
app.use('/api', (_request, response) => {
  response.status(404).json({ error: 'API endpoint not found.' });
});
app.use(express.static(clientBuild));
app.get(['/collection', '/products/:id', '/shortlist'], (_request, response) => {
  response.sendFile('index.html', { root: clientBuild });
});
app.get('/{*path}', (request, response, next) => {
  if (!request.accepts('html')) return next();
  response.status(404).sendFile('index.html', { root: clientBuild });
});

app.use((error, request, response, next) => {
  if (response.headersSent) return next(error);

  const status = error.status ?? (request.path.startsWith('/api/') ? 503 : 500);
  if (status >= 500) console.error('Request failed', error.code ?? error.name);
  response.status(status).json({ error: status >= 500 ? 'Service temporarily unavailable.' : 'Request could not be completed.' });
});

const server = app.listen(port, () => {
  console.log(`Paras Sarees listening on port ${server.address().port} (${pool ? 'PostgreSQL' : 'bundled catalog'}).`);
});

if (pool) {
  const shutDown = () => server.close(() => pool.end());
  process.once('SIGINT', shutDown);
  process.once('SIGTERM', shutDown);
}
