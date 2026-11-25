import { products } from '../data/products.js';

const productColumns = `
  id, name, category, description, image, image_alt AS "imageAlt",
  json_build_object('name', source_name, 'url', source_url) AS source
`;

export function createCatalog(pool) {
  if (!pool) {
    return {
      async list(category) {
        return category ? products.filter((product) => product.category === category) : products;
      },
      async find(id) {
        return products.find((product) => product.id === id);
      },
    };
  }

  return {
    async list(category) {
      const result = await pool.query(
        `SELECT ${productColumns}
         FROM catalog_products
         WHERE ($1::text IS NULL OR category = $1)
         ORDER BY sort_order, id`,
        [category || null],
      );
      return result.rows;
    },
    async find(id) {
      const result = await pool.query(
        `SELECT ${productColumns} FROM catalog_products WHERE id = $1`,
        [id],
      );
      return result.rows[0];
    },
  };
}
