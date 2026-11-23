import React, { useEffect, useRef, useState } from 'react';
import { enquiryUrl, whatsappChannelUrl } from '../store.js';

async function getJson(path, signal) {
  const response = await fetch(path, { signal });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
}

export default function Catalog() {
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  const [draftQuery, setDraftQuery] = useState('');
  const [catalog, setCatalog] = useState({ categories: [], products: [] });
  const [status, setStatus] = useState('loading');
  const [retry, setRetry] = useState(0);
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (query) params.set('q', query);

    setStatus('loading');
    getJson(`/api/products?${params}`, controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return;
        setCatalog(data);
        setStatus('ready');
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus('error');
      });

    return () => controller.abort();
  }, [category, query, retry]);

  useEffect(() => {
    if (selected) dialog.current.showModal();
  }, [selected]);

  function search(event) {
    event.preventDefault();
    setQuery(draftQuery.trim());
  }

  function resetFilters() {
    setCategory('');
    setDraftQuery('');
    setQuery('');
  }

  return (
    <section className="section-shell catalog" id="collection" aria-labelledby="collection-title">
      <div className="section-heading">
        <div>
          <h2 id="collection-title">Explore the collection</h2>
          <p>Selected sarees and lehengas from our catalog. Ask us for current prices and availability.</p>
        </div>
        <a className="text-link" href={whatsappChannelUrl}>Latest on WhatsApp</a>
      </div>

      <div className="catalog-controls">
        <div className="filters" role="group" aria-label="Filter by category">
          {[{ id: '', name: 'All' }, ...catalog.categories].map(({ id, name }) => (
            <button key={id} type="button" aria-pressed={category === id} onClick={() => setCategory(id)}>
              {name}
            </button>
          ))}
        </div>
        <form className="search" role="search" onSubmit={search}>
          <label className="sr-only" htmlFor="catalog-search">Search the collection</label>
          <input id="catalog-search" type="search" placeholder="Try silk or bridal" maxLength={80} value={draftQuery} onChange={(event) => setDraftQuery(event.target.value)} />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="catalog-results" aria-busy={status === 'loading'}>
        {status === 'loading' && <p className="catalog-message" role="status">Loading the collection…</p>}
        {status === 'error' && (
          <div className="catalog-message" role="status">
            <p>The collection couldn’t load. Please try again.</p>
            <button className="button button-outline" type="button" onClick={() => setRetry((value) => value + 1)}>Try again</button>
          </div>
        )}
        {status === 'ready' && catalog.products.length === 0 && (
          <div className="catalog-message" role="status">
            <p>No pieces match your search.</p>
            <button className="button button-outline" type="button" onClick={resetFilters}>Clear filters</button>
          </div>
        )}
        {status === 'ready' && catalog.products.length > 0 && (
          <>
            <p className="sr-only" role="status">{catalog.products.length} pieces found.</p>
            <div className="product-grid">
              {catalog.products.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-photo">
                    <img src={product.image} alt={product.imageAlt} loading="lazy" />
                  </div>
                  <div className="product-copy">
                    <h3>{product.name}</h3>
                    <button className="text-link" type="button" aria-label={`View details for ${product.name}`} onClick={() => setSelected(product)}>View details</button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>

      <dialog ref={dialog} className="product-dialog" aria-labelledby="product-title" onClose={() => setSelected(null)}>
        {selected && (
          <div className="product-detail">
            <button className="dialog-close" type="button" aria-label="Close product details" onClick={() => dialog.current.close()}>×</button>
            <img src={selected.image} alt={selected.imageAlt} />
            <div className="product-detail-copy">
              <h2 id="product-title">{selected.name}</h2>
              <p>{selected.description}</p>
              <a className="button button-primary" href={enquiryUrl(selected)}>Enquire on WhatsApp</a>
              <a className="text-link" href={selected.source.url}>View on {selected.source.name}</a>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
