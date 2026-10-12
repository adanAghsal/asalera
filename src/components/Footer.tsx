import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-transparent py-5 text-xs text-[#C6B8C1]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <p>© 2026 Asalera. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp Asalera"
            title="WhatsApp"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:scale-105 hover:bg-[#20BD5A]"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <a
            href="https://www.instagram.com/asalera/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram Asalera"
            title="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#F5EEF3] transition hover:scale-105 hover:bg-white/20"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
