/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TemplateCatalog } from './components/TemplateCatalog';
import { OrderBuilder } from './components/OrderBuilder';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { LiveDemoModal } from './components/LiveDemoModal';
import { CartDrawer } from './components/CartDrawer';
import { TEMPLATES_DATA } from './data/templates';

type AppPage = 'catalog' | 'checkout';

const getPageFromLocation = (): AppPage => window.location.pathname === '/pemesanan' ? 'checkout' : 'catalog';

export default function App() {
  const [page, setPage] = useState<AppPage>(getPageFromLocation);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [demoTemplateId, setDemoTemplateId] = useState('anime-romance');
  const [orderTemplateId, setOrderTemplateId] = useState(() => new URLSearchParams(window.location.search).get('template') || 'anime-romance');
  const [cartTemplateIds, setCartTemplateIds] = useState<string[]>(() => {
    try {
      const savedCart: unknown = JSON.parse(window.localStorage.getItem('asalera-cart') || '[]');
      return Array.isArray(savedCart) ? savedCart.filter((id): id is string => typeof id === 'string') : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handlePopState = () => {
      setPage(getPageFromLocation());
      setOrderTemplateId(new URLSearchParams(window.location.search).get('template') || 'anime-romance');
      setIsCartOpen(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('asalera-cart', JSON.stringify(cartTemplateIds));
  }, [cartTemplateIds]);

  const handleOpenDemo = (templateId?: string) => {
    if (templateId) {
      setDemoTemplateId(templateId);
    }
    setIsDemoOpen(true);
  };

  const handleCloseDemo = () => {
    setIsDemoOpen(false);
  };

  const handleAddToCart = (templateId: string) => {
    setCartTemplateIds((current) => current.includes(templateId) ? current : [...current, templateId]);
  };

  const handleRemoveFromCart = (templateId: string) => {
    setCartTemplateIds((current) => current.filter((id) => id !== templateId));
  };

  const handleCheckoutTemplate = (templateId: string) => {
    setOrderTemplateId(templateId);
    window.history.pushState({}, '', `/pemesanan?template=${encodeURIComponent(templateId)}`);
    setPage('checkout');
    setIsCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCatalog = () => {
    if (page === 'checkout') {
      window.history.pushState({}, '', '/');
      setPage('catalog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const catalogSection = document.getElementById('katalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
    <div className="cosmos-backdrop" aria-hidden="true">
      <div className="cosmos-stars" />
      <div className="cosmos-moon" />
      <div className="cosmos-planet" />
    </div>
    <div className="relative z-10 flex min-h-screen flex-col bg-transparent text-[#F5EEF3]">
      {/* Top Navbar */}
      <Navbar
        cartCount={cartTemplateIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        isCheckoutPage={page === 'checkout'}
        onGoToCatalog={scrollToCatalog}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {page === 'checkout' ? (
          <OrderBuilder
            key={orderTemplateId}
            initialTemplateId={orderTemplateId}
            initialPackage="deluxe"
          />
        ) : (
          <>
            <Hero
              onOpenDemo={handleOpenDemo}
              onScrollToCatalog={scrollToCatalog}
            />
            <TemplateCatalog
              onOpenDemo={handleOpenDemo}
              onAddToCart={handleAddToCart}
              cartTemplateIds={cartTemplateIds}
            />
            <Testimonials />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Live Demo Modal */}
      <LiveDemoModal
        isOpen={isDemoOpen}
        onClose={handleCloseDemo}
        selectedTemplateId={demoTemplateId}
        onSelectForOrder={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        templateIds={cartTemplateIds}
        onClose={() => setIsCartOpen(false)}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckoutTemplate}
        onBrowse={scrollToCatalog}
      />
    </div>
    </>
  );
}
