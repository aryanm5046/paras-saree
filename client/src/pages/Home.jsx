import React from 'react';
import Catalog from '../components/Catalog.jsx';
import { directionsUrl, enquiryUrl, instagramUrl, phoneNumbers, shopEmail, whatsappChannelUrl } from '../store.js';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header" id="top">
        <div className="location-bar">Manufacturer &amp; wholesaler <span>·</span> Chandni Chowk, Delhi</div>
        <div className="section-shell header-inner">
          <a className="brand" href="#top">
            <span className="brand-mark" aria-hidden="true">PS</span>
            <span>Paras Sarees</span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#collection">Collection</a>
            <a href="#visit">Visit us</a>
            <a className="header-contact" href={enquiryUrl()}>WhatsApp</a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="section-shell hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">From Jogiwara, Old Delhi</p>
            <h1 id="hero-title">Sarees &amp; lehengas <em>for every celebration.</em></h1>
            <p>Browse bridal and occasion wear from our Chandni Chowk shop. Message us for wholesale prices and the latest designs.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#collection">Browse collection</a>
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

        <Catalog />

        <section className="section-shell visit-section" id="visit" aria-labelledby="visit-title">
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
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <a className="brand" href="#top">Paras Sarees</a>
          <nav aria-label="Social channels">
            <a href={instagramUrl}>Instagram</a>
            <a href={whatsappChannelUrl}>WhatsApp channel</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
