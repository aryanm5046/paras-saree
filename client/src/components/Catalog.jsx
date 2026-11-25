import React, { useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router';
import ProductGrid from './ProductGrid.jsx';
import RequestState from './RequestState.jsx';
import useApi from '../hooks/useApi.js';
import { whatsappChannelUrl } from '../store.js';

function filtersFor(category, query) {
  const filters = new URLSearchParams();
  if (category) filters.set('category', category);
  if (query) filters.set('q', query);
  return filters;
}

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const category = params.get('category') ?? '';
  const query = params.get('q') ?? '';
  const { loading, data, previousData, status, retry } = useApi(`/api/products?${filtersFor(category, query)}`);

  useEffect(() => {
    document.title = 'Saree & Lehenga Collection | Paras Sarees';
  }, []);

  function search(event) {
    event.preventDefault();
    const term = new FormData(event.currentTarget).get('q').trim();
    setParams(filtersFor(category, term));
  }

  return (
    <section className="section-shell inner-page" aria-labelledby="collection-title">
      <div className="section-heading">
        <div>
          <h1 id="collection-title">Saree &amp; lehenga collection</h1>
          <p>Explore bridal and occasion wear. Save the designs you like to ask for prices and availability together.</p>
        </div>
        <a className="text-link" href={whatsappChannelUrl}>Latest on WhatsApp</a>
      </div>

      <div className="catalog-controls">
        <nav className="filters" aria-label="Filter by category">
          {[{ id: '', name: 'All' }, ...(previousData?.categories ?? [])].map(({ id, name }) => (
            <Link key={id} to={{ search: filtersFor(id, query).toString() }} aria-current={category === id ? 'true' : undefined}>
              {name}
            </Link>
          ))}
        </nav>
        <form className="search" role="search" onSubmit={search}>
          <label className="sr-only" htmlFor="catalog-search">Search the collection</label>
          <input key={query} id="catalog-search" name="q" type="search" placeholder="Try silk or bridal" maxLength={80} defaultValue={query} />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="catalog-results" aria-busy={loading}>
        {status === 400 ? (
          <div className="catalog-message">
            <p>These filters couldn’t be applied.</p>
            <Link className="button button-outline" to="/collection">Clear filters</Link>
          </div>
        ) : !data ? <RequestState loading={loading} retry={retry} /> : (
          <>
            <p className="result-count" role="status">
              {data.products.length === 0 ? 'No designs match these filters.' : `${data.products.length} ${data.products.length === 1 ? 'design' : 'designs'}`}
            </p>
            {data.products.length > 0
              ? <ProductGrid products={data.products} returnTo={location.pathname + location.search} />
              : <Link className="button button-outline" to="/collection">Clear filters</Link>}
          </>
        )}
      </div>
    </section>
  );
}
