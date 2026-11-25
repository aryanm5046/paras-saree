import { categories } from '../data/products.js';

export async function listProducts(request, response) {
  const { category, q = '' } = request.query;

  if (category !== undefined && !categories.some(({ id }) => id === category)) {
    return response.status(400).json({ error: 'Choose a valid category.' });
  }

  if (typeof q !== 'string' || q.length > 80) {
    return response.status(400).json({ error: 'Search must be a single value of up to 80 characters.' });
  }

  const products = await request.app.locals.catalog.list(category);
  const search = q.trim().toLowerCase();
  const matches = products.filter(({ name, description }) => {
    return `${name} ${description}`.toLowerCase().includes(search);
  });

  response.json({ categories, products: matches });
}

export async function getProduct(request, response) {
  const product = await request.app.locals.catalog.find(request.params.id);

  if (!product) {
    return response.status(404).json({ error: 'Product not found.' });
  }

  response.json({ product });
}
