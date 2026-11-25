import React, { useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { useShortlist } from './ShortlistProvider.jsx';
import { enquiryUrl, instagramUrl, whatsappChannelUrl } from '../store.js';

export default function SiteLayout() {
  const { pathname, hash } = useLocation();
  const { items } = useShortlist();
  const main = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    const initial = firstRender.current;
    firstRender.current = false;

    if (hash === '#visit' || hash === '#collection') {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      if (!initial) document.getElementById(hash.slice(1))?.focus({ preventScroll: true });
    } else if (!initial) {
      window.scrollTo(0, 0);
      main.current?.focus({ preventScroll: true });
    }
  }, [pathname, hash]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="location-bar">Manufacturer &amp; wholesaler <span>·</span> Chandni Chowk, Delhi</div>
        <div className="section-shell header-inner">
          <Link className="brand" to="/">
            <span className="brand-mark" aria-hidden="true">PS</span>
            <span>Paras Sarees</span>
          </Link>
          <nav aria-label="Main navigation">
            <NavLink to="/collection">Collection</NavLink>
            <Link to="/#visit">Visit us</Link>
            <NavLink className="shortlist-nav" to="/shortlist">
              Shortlist <span className="shortlist-count">{items.length}</span>
            </NavLink>
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} ref={main}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <Link className="brand" to="/">Paras Sarees</Link>
          <nav aria-label="Shop and social links">
            <a href={enquiryUrl()}>WhatsApp enquiries</a>
            <a href={instagramUrl}>Instagram</a>
            <a href={whatsappChannelUrl}>WhatsApp channel</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
