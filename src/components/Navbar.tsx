import React from 'react';
import { ChevronLeft, ShoppingCart } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  isCheckoutPage: boolean;
  onGoToCatalog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, isCheckoutPage, onGoToCatalog }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#151821]/85 text-[#F5EEF3] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        <div className="flex shrink-0 items-center gap-2">
          {isCheckoutPage && (
            <button
              type="button"
              onClick={onGoToCatalog}
              aria-label="Kembali ke koleksi"
              title="Kembali ke koleksi"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#E5DCE2] transition hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          <button onClick={onGoToCatalog} className="flex items-center tracking-tight group">
            <span className="text-xl sm:text-2xl font-black leading-none tracking-[0.18em] text-[#F5EEF3]">
              <span className="text-[#C24B60]">ASA</span>LERA
            </span>
          </button>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Buka keranjang, ${cartCount} desain`}
            title="Keranjang"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#C24B60] text-white transition hover:bg-[#A83D51]"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-[#C24B60]">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
