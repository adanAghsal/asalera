import React, { useEffect, useState } from 'react';
import { Play, ChevronRight, Star } from 'lucide-react';
import { heroAnimeImg, cardCoupleImg, cardBestiesImg } from '../data/templates';

interface HeroProps {
  onOpenDemo: (templateId?: string) => void;
  onScrollToCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo, onScrollToCatalog }) => {
  const slides = [
    {
      id: 'anime-celebrate',
      title: 'Trio Joy Celebration',
      tag: 'Birthday Squad Edition',
      image: heroAnimeImg,
      headline: 'BUAT WEBSITE KADO ULANG TAHUN YANG KEREN & PERSONAL HANYA DI MEMOU.',
      description: 'Website kado interaktif dengan fitur tiup lilin nyata, pemutar musik lofi, galeri memori, dan amplop pesan rahasia yang bikin dia tersenyum bahagia.',
      badge: '🎂 21st',
      rating: '4.98'
    },
    {
      id: 'anime-romance',
      title: 'Sweet Romance Cafe',
      tag: 'Romantic Couple Edition',
      image: cardCoupleImg,
      headline: 'HADIAHKAN WEBSITE KENANGAN PALING ROMANTIS UNTUK SI DIA.',
      description: 'Abadikan perjalanan cinta kalian dalam satu tautan manis. Dilengkapi lilin tart hangat, alunan lagu favorit, dan surat cinta berlipat.',
      badge: '♥ Love',
      rating: '5.0'
    },
    {
      id: 'anime-squad',
      title: 'Bestie Class Party',
      tag: 'Friendship Forever',
      image: cardBestiesImg,
      headline: 'RAYAKAN ULANG TAHUN SAHABAT DENGAN SERU DAN PENUH TAWA.',
      description: 'Kompilasi foto-foto aib lucu, ucapan selamat gokil, dan mini game scratch card traktiran makan bareng sahabat tercinta.',
      badge: '★ Bestie',
      rating: '4.95'
    }
  ];

  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const current = slides[currentSlideIdx];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlideIdx((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="relative flex min-h-[620px] items-end overflow-hidden rounded-2xl border border-white/10 bg-[#10131C] shadow-2xl sm:min-h-[560px] lg:min-h-[590px]">
          <img
            src={current.image}
            alt={current.title}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D14]/95 via-[#0B0D14]/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D14]/70 via-transparent to-transparent" />

          <div className="relative z-10 w-full max-w-2xl px-6 pb-20 pt-16 sm:px-10 sm:pb-24 lg:px-14 lg:pb-24">
          
            <h1 className="max-w-xl font-editorial text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              {current.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#F5EEF3] sm:text-sm">
              <span className="flex items-center gap-0.5 text-[#F6C85F]" aria-label={`Rating ${current.rating} dari 5`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </span>
              <span className="font-bold">{current.rating}</span>
              <span className="text-white/45">|</span>
              <span>2026</span>
              <span className="text-white/45">|</span>
              <span>{current.tag}</span>
            </div>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-[#E8E2E8] sm:text-base">
              {current.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenDemo(current.id)}
                className="inline-flex items-center gap-2 rounded-lg bg-[#C24B60] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#A83D51] active:scale-95 sm:text-sm"
              >
                <Play className="h-4 w-4 fill-current" />
                Coba Live Demo
              </button>
              <button
                onClick={onScrollToCatalog}
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-[#11131B]/50 px-5 py-3 text-xs font-bold text-white transition hover:bg-white/10 sm:text-sm"
              >
                Lihat Koleksi
              </button>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 sm:left-10 lg:left-14">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlideIdx(index)}
                aria-label={`Tampilkan slide ${index + 1}: ${slide.title}`}
                aria-current={currentSlideIdx === index ? 'true' : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlideIdx === index ? 'w-8 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Slide berikutnya"
            className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm transition hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
