import React from 'react';
import { Check, Star } from 'lucide-react';
import { PACKAGES_DATA } from '../data/templates';
import { PackageTier } from '../types';

interface PackagesPricingProps {
  onSelectPackage: (pkg: PackageTier) => void;
}

export const PackagesPricing: React.FC<PackagesPricingProps> = ({ onSelectPackage }) => {
  return (
    <section id="paket-harga" className="py-16 md:py-24 paper-pattern border-b border-[#EBDED4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#A84557] mb-2">
          
         
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#381F23] font-editorial text-balance">
            Pilihan Paket Kado Web Ulang Tahun
          </h2>
          <p className="text-sm sm:text-base text-[#6B575A] mt-3">
            Tanpa biaya bulanan tersembunyi. Sekali bayar, website kado kenangan ini siap dipamerkan dan disimpan selamanya.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PACKAGES_DATA.map((pkg) => {
            const isDeluxe = pkg.id === 'deluxe';

            return (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-3xl border flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 ${
                  isDeluxe
                    ? 'border-[#C24B60] ring-2 ring-[#C24B60]/20 shadow-xl'
                    : 'border-[#F0DFD7] shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  {/* Package Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-[#C24B60]">
                      {pkg.name}
                    </span>
                    {pkg.badge && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFF0F3] text-[#C24B60] text-[11px] font-bold border border-[#F3C4CF]">
                        <Star className="w-3 h-3 fill-[#C24B60]" />
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#7A696C] mb-4">
                    {pkg.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-[#F5EDE8]">
                    <span className="text-xs text-[#8A797C]">Mulai dari</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl sm:text-4xl font-black text-[#1F191A] font-mono tabular-nums">
                        Rp {pkg.price.toLocaleString('id-ID')}
                      </span>
                      <span className="text-xs text-[#8A797C]">/ website</span>
                    </div>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#544447]">
                        <span className="w-4 h-4 rounded-full bg-[#EBF7F0] text-[#059669] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Select Button */}
                <button
                  onClick={() => onSelectPackage(pkg.id)}
                  className={`w-full py-3.5 px-4 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer text-center ${
                    isDeluxe
                      ? 'bg-[#C24B60] hover:bg-[#A83D51] text-white shadow-md active:scale-95'
                      : 'bg-white hover:bg-[#FFF2EC] text-[#1F191A] border border-[#E8D4CC] active:scale-95'
                  }`}
                >
                  Pilih {pkg.name}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
