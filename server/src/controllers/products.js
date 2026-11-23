import { categories, products } from '../data/products.js';

export function listProducts(request, response) {
  const { category, q = '' } = request.query;

  if (category !== undefined && !categories.some(({ id }) => id === category)) {
    return response.status(400).json({ error: 'Choose a valid category.' });
  }

  if (typeof q !== 'string' || q.length > 80) {
    return response.status(400).json({ error: 'Search must be a single value of up to 80 characters.' });
  }

  const search = q.trim().toLowerCase();
  const matches = products.filter((product) => {
    const inCategory = !category || product.category === category;
    const searchable = `${product.name} ${product.description}`.toLowerCase();
    return inCategory && searchable.includes(search);
  });

  response.json({ categories, products: matches });
}

export function getProduct(request, response) {
  const product = products.find(({ id }) => id === request.params.id);

  if (!product) {
    return response.status(404).json({ error: 'Product not found.' });
  }

  response.json({ product });
}
