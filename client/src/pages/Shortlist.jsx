import React, { useEffect } from 'react';
import { Link } from 'react-router';
import RequestState from '../components/RequestState.jsx';
import { maximumQuantity, useShortlist } from '../components/ShortlistProvider.jsx';
import useApi from '../hooks/useApi.js';
import { shortlistEnquiryUrl } from '../store.js';

function SavedDesigns({ items, remove, setQuantity }) {
  const { loading, data, retry } = useApi('/api/products');
  if (!data) return <RequestState loading={loading} retry={retry} />;

  const catalog = new Map(data.products.map((product) => [product.id, product]));
  const designs = items.map((item) => ({ ...item, product: catalog.get(item.id) }));
  const available = designs.filter(({ product }) => product);

  return (
    <>
      <ul className="saved-designs">
        {designs.map(({ id, quantity, product }) => (
          <li className="saved-design" key={id}>
            {product ? (
              <>
                <img className="saved-photo" src={product.image} alt={product.imageAlt} loading="lazy" />
                <Link className="saved-name" to={`/products/${id}`} state={{ returnTo: '/shortlist' }}>{product.name}</Link>
                <label className="quantity-label">
                  Quantity
                  <span className="sr-only"> for {product.name}</span>
                  <input
                    type="number"
                    min={1}
                    max={maximumQuantity}
                    defaultValue={quantity}
                    onChange={(event) => setQuantity(id, event.target.valueAsNumber)}
                    onBlur={(event) => { event.currentTarget.value = quantity; }}
                  />
                </label>
              </>
            ) : (
              <p className="saved-name">Design no longer listed</p>
            )}
            <button className="text-link remove-button" type="button" aria-label={`Remove ${product?.name ?? 'unavailable design'}`} onClick={() => remove(id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="shortlist-actions">
        {available.length > 0 && (
          <a className="button button-primary" href={shortlistEnquiryUrl(available)}>Send enquiry on WhatsApp</a>
        )}
        <Link className="text-link" to="/collection">Continue browsing</Link>
      </div>
    </>
  );
}

export default function Shortlist() {
  const { items, remove, setQuantity } = useShortlist();

  useEffect(() => {
    document.title = 'Your shortlist | Paras Sarees';
  }, []);

  return (
    <section className="section-shell inner-page" aria-labelledby="shortlist-title">
      <div className="section-heading">
        <div>
          <h1 id="shortlist-title">Your shortlist</h1>
          <p>Set your quantities and ask Paras Sarees for a wholesale quote on WhatsApp.</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <h2>Your shortlist is empty</h2>
          <p>Open a design from the collection and save it here.</p>
          <Link className="button button-primary" to="/collection">Browse collection</Link>
        </div>
      ) : (
        <SavedDesigns items={items} remove={remove} setQuantity={setQuantity} />
      )}
    </section>
  );
}
