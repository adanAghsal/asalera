import React, { useEffect, useState } from 'react';
import { ArrowRight, ShoppingCart, Trash2, X } from 'lucide-react';
import { TEMPLATES_DATA } from '../data/templates';

interface CartDrawerProps {
  isOpen: boolean;
  templateIds: string[];
  onClose: () => void;
  onRemove: (templateId: string) => void;
  onCheckout: (templateId: string) => void;
  onBrowse: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  templateIds,
  onClose,
  onRemove,
  onCheckout,
  onBrowse,
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState(templateIds[0] ?? '');

  useEffect(() => {
    setSelectedTemplateId((current) => templateIds.includes(current) ? current : templateIds[0] ?? '');
  }, [templateIds]);

  if (!isOpen) return null;

  const items = templateIds
    .map((templateId) => TEMPLATES_DATA.find((template) => template.id === templateId))
    .filter((template): template is (typeof TEMPLATES_DATA)[number] => Boolean(template));
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const selectedTemplate = items.find((item) => item.id === selectedTemplateId) ?? items[0];

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Tutup keranjang"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-[#24151A]/40 backdrop-blur-[2px]"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-white/10 bg-[#1B1F29] text-[#F5EEF3] shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-white/10 bg-[#1B1F29] px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF0F3] text-[#C24B60]">
              <ShoppingCart className="h-5 w-5" />
            </span>
            <div>
              <h2 id="cart-title" className="font-editorial text-xl font-bold text-[#F5EEF3]">Keranjang</h2>
              <p className="text-xs text-[#C6B8C1]">{items.length} desain</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup keranjang"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#C6B8C1] transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF0F3] text-[#C24B60]">
              <ShoppingCart className="h-7 w-7" />
            </span>
            <h3 className="font-editorial text-xl font-bold text-[#F5EEF3]">Keranjang masih kosong</h3>

            <button
              type="button"
              onClick={onBrowse}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C24B60] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#A83D51]"
            >
              Jelajahi desain <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-4 sm:p-6">
              {items.map((item) => (
                <article
                  key={item.id}
                  className={`flex gap-3 rounded-xl border bg-[#252A36] p-3 shadow-sm ${
                    selectedTemplate?.id === item.id ? 'border-[#C24B60] ring-1 ring-[#C24B60]/25' : 'border-white/10'
                  }`}
                >
                  <img src={item.image} alt="" className="h-24 w-20 shrink-0 rounded-lg object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex min-w-0 items-start gap-2">
                        <input
                          type="radio"
                          name="cart-checkout-template"
                          checked={selectedTemplate?.id === item.id}
                          onChange={() => setSelectedTemplateId(item.id)}
                          aria-label={`Pilih ${item.name} untuk dipesan`}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-[#C24B60]"
                        />
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-bold text-[#F5EEF3]">{item.name}</h3>
                          <p className="mt-1 line-clamp-2 text-[11px] text-[#C6B8C1]">{item.subtitle}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        aria-label={`Hapus ${item.name} dari keranjang`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#C6B8C1] transition hover:bg-white/10 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto border-t border-white/10 pt-2.5">
                      <span className="text-sm font-bold tabular-nums text-[#C24B60]">Rp {item.price.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <footer className="border-t border-white/10 bg-[#1B1F29] px-5 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#C6B8C1]">Total desain</span>
                <span className="text-base font-bold tabular-nums text-[#F5EEF3]">Rp {total.toLocaleString('id-ID')}</span>
              </div>
              {selectedTemplate && (
                <button
                  type="button"
                  onClick={() => onCheckout(selectedTemplate.id)}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#C24B60] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#A83D51]"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Pesan
                </button>
              )}
            </footer>
          </>
        )}
      </aside>
    </div>
  );
};