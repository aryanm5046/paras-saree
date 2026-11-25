import { readFile } from 'node:fs/promises';
import { products } from '../data/products.js';
import { openPool } from './pool.js';

if (!process.env.DATABASE_URL) {
  console.error('Set DATABASE_URL in the environment or in server/.env before running db:seed.');
  process.exit(1);
}

const schema = await readFile(new URL('./schema.sql', import.meta.url), 'utf8');
const pool = openPool(process.env.DATABASE_URL);

try {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    await client.query(schema);

    let inserted = 0;
    for (const [index, product] of products.entries()) {
      const result = await client.query(
        `INSERT INTO catalog_products
         (id, name, category, description, image, image_alt, source_name, source_url, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (id) DO NOTHING`,
        [
          product.id, product.name, product.category, product.description, product.image,
          product.imageAlt, product.source.name, product.source.url, index + 1,
        ],
      );
      inserted += result.rowCount;
    }

    await client.query('COMMIT');
    console.log(`Catalog ready. Inserted ${inserted} of ${products.length} bundled products.`);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
} catch (error) {
  console.error('Could not seed the PostgreSQL catalog.', error.code ?? error.name);
  process.exitCode = 1;
} finally {
  await pool.end();
}
