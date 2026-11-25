import React, { useEffect } from 'react';
import { Link } from 'react-router';
import ProductGrid from '../components/ProductGrid.jsx';
import RequestState from '../components/RequestState.jsx';
import useApi from '../hooks/useApi.js';
import { directionsUrl, enquiryUrl, phoneNumbers, shopEmail, whatsappChannelUrl } from '../store.js';

export default function Home() {
  const { loading, data, retry } = useApi('/api/products');

  useEffect(() => {
    document.title = 'Paras Sarees | Sarees & Lehengas in Chandni Chowk';
  }, []);

  return (
    <>
      <section className="section-shell hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">From Jogiwara, Old Delhi</p>
          <h1 id="hero-title">Sarees &amp; lehengas <em>for every celebration.</em></h1>
          <p>Browse bridal and occasion wear from our Chandni Chowk shop. Message us for wholesale prices and the latest designs.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/collection">Browse collection</Link>
            <a className="button button-outline" href={enquiryUrl()}>Enquire on WhatsApp</a>
          </div>
        </div>
        <figure className="hero-image">
          <picture>
            <source media="(max-width: 650px)" srcSet="/images/paras-hero-640.webp" />
            <img src="/images/paras-hero.webp" width="1200" height="900" alt="Vermilion silk saree with a gold woven border in a sandstone setting" fetchPriority="high" />
          </picture>
          <figcaption>Illustrative image</figcaption>
        </figure>
      </section>

      <section className="section-shell catalog" id="collection" tabIndex={-1} aria-labelledby="featured-title">
        <div className="section-heading">
          <div>
            <h2 id="featured-title">From the collection</h2>
            <p>Browse a few of the shop’s bridal and occasion wear designs.</p>
          </div>
          <Link className="text-link" to="/collection">View full collection</Link>
        </div>
        {!data ? <RequestState loading={loading} retry={retry} /> : (
          data.products.length > 0
            ? <ProductGrid products={data.products.slice(0, 3)} />
            : <p className="catalog-message">Ask us on WhatsApp for the latest collection.</p>
        )}
      </section>

      <section className="section-shell visit-section" id="visit" tabIndex={-1} aria-labelledby="visit-title">
        <div>
          <h2 id="visit-title">Visit our shop</h2>
          <address>
            Shop No. 4329, 1st Floor, Gali Bhairon Wali<br />
            Near Bhairon Baba Mandir, Jogiwara<br />
            Nai Sarak, Chandni Chowk, Delhi 110006
          </address>
          <a className="button button-outline" href={directionsUrl}>Get directions</a>
        </div>
        <div className="visit-contact">
          <h3>For wholesale enquiries</h3>
          {phoneNumbers.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}
          <a href={`mailto:${shopEmail}`}>{shopEmail}</a>
          <a href={whatsappChannelUrl}>Follow the WhatsApp channel</a>
        </div>
      </section>
    </>
  );
}
