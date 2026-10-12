import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/templates';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 paper-pattern border-b border-[#EBDED4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#A84557] mb-2">
           
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#381F23] font-editorial text-balance">
            Tanya Jawab Seputar Pemesanan
          </h2>
          <p className="text-sm sm:text-base text-[#6B575A] mt-3">
            Punya pertanyaan lain? Jangan ragu hubungi kami langsung lewat WhatsApp ya.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-[#FFFDFC] rounded-2xl border border-[#EAE0D7] scrapbook-card overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-semibold text-sm sm:text-base text-[#381F23]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8A797C] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#C24B60]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-[#6E5A5D] leading-relaxed border-t border-[#F5EDE8]">
                    <p className="mt-3">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
