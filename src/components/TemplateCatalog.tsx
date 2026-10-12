import React, { useState } from 'react';
import { Heart, Play, ShoppingCart, Star } from 'lucide-react';
import { TEMPLATES_DATA } from '../data/templates';

interface TemplateCatalogProps {
  onOpenDemo: (templateId: string) => void;
  onAddToCart: (templateId: string) => void;
  cartTemplateIds: string[];
}

export const TemplateCatalog: React.FC<TemplateCatalogProps> = ({
  onOpenDemo,
  onAddToCart,
  cartTemplateIds,
}) => {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['anime-romance']);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="katalog" className="border-b border-white/10 bg-transparent text-[#F5EEF3]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 sm:py-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="font-editorial text-2xl font-bold text-[#F8F0F4] sm:text-3xl">
            Pilih Desain untuk Kejutanmu
          </h2>
          <span className="shrink-0 text-xs font-semibold text-[#C6B8C1]">Geser untuk melihat</span>
        </div>

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4" aria-label="Koleksi desain" tabIndex={0}>
          {TEMPLATES_DATA.map((template) => {
                    const isBookmarked = bookmarkedIds.includes(template.id);
                    const isInCart = cartTemplateIds.includes(template.id);

                    return (
                      <article
                        key={template.id}
                        className="group w-[180px] shrink-0 snap-start overflow-hidden rounded-xl border border-white/10 bg-[#222631]/95 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:w-[205px]"
                      >
                        <div className="relative aspect-[3/4] overflow-hidden bg-[#1B1F29]">
                          <img
                            src={template.image}
                            alt={template.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                          <span className="absolute bottom-3 left-3 rounded-full bg-[#C24B60] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
                            {template.badge}
                          </span>
                          <button
                            type="button"
                            onClick={(event) => toggleBookmark(template.id, event)}
                            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#1F191A] shadow-sm transition hover:bg-white"
                            aria-label={isBookmarked ? 'Hapus dari favorit' : 'Simpan ke favorit'}
                          >
                            <Heart className={`h-4 w-4 ${isBookmarked ? 'fill-[#C24B60] text-[#C24B60]' : ''}`} />
                          </button>
                        </div>

                        <div className="p-3.5">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="line-clamp-1 text-sm font-bold text-[#F5EEF3]">{template.name}</h3>
                            <span className="flex shrink-0 items-center gap-1 text-[10px] font-bold text-[#C24B60]">
                              <Star className="h-3 w-3 fill-current" /> 4.9
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-1 text-[10px] text-[#C6B8C1]">{template.subtitle}</p>
                          <div className="mt-3 flex items-center justify-between gap-3">
                            <p className="text-sm font-bold tabular-nums text-[#F5EEF3]">Rp {template.price.toLocaleString('id-ID')}</p>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => onOpenDemo(template.id)}
                                aria-label={`Play ${template.name}`}
                                title={`Play ${template.name}`}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                              >
                                <Play className="h-4 w-4 fill-current" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onAddToCart(template.id)}
                                disabled={isInCart}
                                aria-label={isInCart ? `${template.name} sudah di keranjang` : `Tambah ${template.name} ke keranjang`}
                                title={isInCart ? 'Di keranjang' : 'Tambah ke keranjang'}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C24B60] text-white transition hover:bg-[#A83D51] disabled:cursor-default disabled:bg-[#F3C4CF] disabled:text-[#7D3444]"
                              >
                                <ShoppingCart className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
        </div>
      </div>
    </section>
  );
};
