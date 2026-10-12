import React from 'react';
import { ShoppingCart } from 'lucide-react';

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
        <button onClick={onGoToCatalog} className="flex items-center tracking-tight group shrink-0">
          <span className="text-xl sm:text-2xl font-black leading-none tracking-[0.18em] text-[#F5EEF3]">
            <span className="text-[#C24B60]">ASA</span>LERA
          </span>
        </button>

        {isCheckoutPage && (
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#E5DCE2]">
            <button onClick={onGoToCatalog} className="hover:text-[#C24B60] transition-colors whitespace-nowrap shrink-0 cursor-pointer">
              Kembali ke koleksi
            </button>
          </nav>
        )}

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
