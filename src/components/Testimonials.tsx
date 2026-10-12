import React from 'react';
import { Star, Heart } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/templates';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 md:py-24 border-b border-white/10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#A84557] mb-2">
            
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8F0F4] font-editorial text-balance">
            Cerita di Balik Kejutan Personal
          </h2>
        
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item, idx) => {
            const rotations = ['rotate-1', '-rotate-1', 'rotate-2'];
            const rot = rotations[idx % rotations.length];

            return (
              <div
                key={item.id}
                className={`paper-note relative flex flex-col justify-between rounded-lg border border-[#E8D8D1] p-6 pt-8 text-[#382B30] transition-transform duration-300 hover:rotate-0 ${rot}`}
              >
                <div className="paper-note-tape" aria-hidden="true" />

                <div>
                  {/* Stars & Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#F59E0B]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
                      ))}
                    </div>
                    <span className="rounded-md bg-[#F7E5E9] px-2 py-0.5 text-[11px] font-semibold text-[#8A4054]">
                      {item.tag}
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="font-handwriting text-xl leading-relaxed text-[#493940] mb-6">
                    "{item.comment}"
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center justify-between border-t border-[#E8D8D1] pt-4">
                  <div>
                    <h4 className="text-sm font-bold text-[#382B30]">{item.name}</h4>
                    <p className="text-xs text-[#796970]">{item.role}</p>
                  </div>
                  <span className="text-xs text-[#E06D7F]">♥</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
