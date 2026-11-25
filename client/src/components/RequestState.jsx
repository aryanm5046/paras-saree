import React from 'react';

export default function RequestState({ loading, retry }) {
  if (loading) {
    return <p className="catalog-message" role="status">Loading…</p>;
  }

  return (
    <div className="catalog-message" role="status">
      <p>We couldn’t load the catalog. Please try again.</p>
      <button className="button button-outline" type="button" onClick={retry}>Try again</button>
    </div>
  );
}
