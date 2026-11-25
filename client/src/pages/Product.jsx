import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import RequestState from '../components/RequestState.jsx';
import { useShortlist } from '../components/ShortlistProvider.jsx';
import useApi from '../hooks/useApi.js';
import { enquiryUrl } from '../store.js';

export default function Product() {
  const { id } = useParams();
  const { state } = useLocation();
  const { items, remove, save } = useShortlist();
  const { loading, status, data, retry } = useApi(`/api/products/${encodeURIComponent(id)}`);
  const product = data?.product;
  const saved = items.some((item) => item.id === id);
  const returnTo = state?.returnTo ?? '/collection';
  const backLabel = returnTo === '/shortlist' ? 'Back to shortlist' : 'Back to collection';

  useEffect(() => {
    document.title = product ? `${product.name} | Paras Sarees` : 'Design details | Paras Sarees';
  }, [product]);

  return (
    <section className="section-shell inner-page">
      <Link className="text-link back-link" to={returnTo}>{backLabel}</Link>

      {status === 404 ? (
        <div className="empty-state">
          <h1>Design unavailable</h1>
          <p>This design is no longer listed. Browse the collection for more sarees and lehengas.</p>
          <Link className="button button-primary" to="/collection">Browse collection</Link>
        </div>
      ) : !product ? <RequestState loading={loading} retry={retry} /> : (
        <article className="product-detail">
          <div className="product-detail-photo">
            <img src={product.image} alt={product.imageAlt} fetchPriority="high" />
          </div>
          <div className="product-detail-copy">
            <Link className="text-link" to={`/collection?category=${encodeURIComponent(product.category)}`}>
              {product.category === 'lehengas' ? 'Lehengas' : 'Sarees'}
            </Link>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Ask the shop for current wholesale prices, available colours, and minimum quantities.</p>

            <div className="flow-actions">
              <button
                className="button button-primary"
                type="button"
                aria-pressed={saved}
                onClick={() => saved ? remove(product.id) : save(product.id)}
              >
                {saved ? 'Saved to shortlist' : 'Save to shortlist'}
              </button>
              <a className="button button-outline" href={enquiryUrl(product)}>Enquire on WhatsApp</a>
            </div>

            <div className="flow-actions">
              {saved && <Link className="text-link" to="/shortlist">View your shortlist</Link>}
              <a className="text-link" href={product.source.url}>View original on {product.source.name}</a>
            </div>
          </div>
        </article>
      )}
    </section>
  );
}
