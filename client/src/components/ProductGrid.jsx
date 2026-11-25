import React from 'react';
import { Link } from 'react-router';

export default function ProductGrid({ products, returnTo }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <article className="product-card" key={product.id}>
          <Link className="product-link" to={`/products/${product.id}`} state={{ returnTo }}>
            <div className="product-photo">
              <img src={product.image} alt={product.imageAlt} loading="lazy" />
            </div>
            <div className="product-copy">
              <h3>{product.name}</h3>
              <span className="text-link">View details</span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
