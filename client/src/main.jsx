import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import Catalog from './components/Catalog.jsx';
import SiteLayout from './components/SiteLayout.jsx';
import { ShortlistProvider } from './components/ShortlistProvider.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Product from './pages/Product.jsx';
import Shortlist from './pages/Shortlist.jsx';
import './styles/main.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShortlistProvider>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="collection" element={<Catalog />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="shortlist" element={<Shortlist />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ShortlistProvider>
  </BrowserRouter>,
);
