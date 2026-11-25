import React, { useEffect } from 'react';
import { Link } from 'react-router';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found | Paras Sarees';
  }, []);

  return (
    <section className="section-shell inner-page" aria-labelledby="missing-page-title">
      <div className="empty-state">
        <h1 id="missing-page-title">Page not found</h1>
        <p>Visit the collection to browse sarees and lehengas.</p>
        <Link className="button button-primary" to="/collection">Browse collection</Link>
      </div>
    </section>
  );
}
