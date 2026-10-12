import React from 'react';
import { Palette, Send, Heart } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Pilih tema & isi data',
      description: 'Pilih konsep yang paling cocok, lalu isi nama, tanggal, dan pesan spesial yang ingin kamu tulis.',
      icon: Palette,
      color: 'bg-[#FFF0F3] text-[#C24B60]',
    },
    {
      number: '02',
      title: 'Kirim foto & cerita ke WA',
      description: 'Kirimkan momen favoritmu dan detail yang mau ditampilkan di halaman kado agar hasilnya lebih personal.',
      icon: Send,
      color: 'bg-[#FFF0F3] text-[#C24B60]',
    },
    {
      number: '03',
      title: 'Website siap dibagikan',
      description: 'Dalam hitungan jam, link website siap dikirim dan bisa langsung dibuka oleh orang yang kamu sayangi.',
      icon: Heart,
      color: 'bg-[#FFF0F3] text-[#C24B60]',
    },
  ];

  return (
    <section id="cara-kerja" className="py-16 md:py-24 bg-white border-b border-[#F0DFD7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
       
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1F191A] uppercase mt-2">
            Cara Pesan Website Ulang Tahun
          </h2>
          <p className="text-sm sm:text-base text-[#6B575A] mt-2">
            Hanya butuh 3 langkah santai tanpa ribet coding. Kami yang akan merangkai foto dan ceritamu menjadi karya website yang berkesan.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div
                key={idx}
                className="relative bg-white rounded-3xl p-6 sm:p-8 border border-[#F0DFD7] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-editorial text-3xl font-bold text-[#E8D4D8]">
                      {step.number}
                    </span>
                    <span className={`w-11 h-11 rounded-2xl ${step.color} flex items-center justify-center shadow-xs`}>
                      <Icon className="w-5 h-5" />
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#381F23] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#705E61] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F2E8E2]">
                  <span className="text-[11px] font-semibold text-[#A8888D]">
                    Langkah {idx + 1} dari 3
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
