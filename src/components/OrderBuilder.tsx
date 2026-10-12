import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, Check, Heart, Music, Calendar, 
  User, ShieldCheck, ArrowRight, Gift
} from 'lucide-react';
import { TEMPLATES_DATA, PACKAGES_DATA } from '../data/templates';
import { PackageTier, OrderState } from '../types';

interface OrderBuilderProps {
  initialTemplateId?: string;
  initialPackage?: PackageTier;
}

export const OrderBuilder: React.FC<OrderBuilderProps> = ({
  initialTemplateId,
  initialPackage,
}) => {
  const [order, setOrder] = useState<OrderState>({
    templateId: initialTemplateId || 'anime-romance',
    packageTier: initialPackage || 'deluxe',
    recipientName: '',
    nickname: '',
    turningAge: '21',
    birthdayDate: '',
    senderName: '',
    selectedSong: 'Happy Birthday Lofi Chimes',
    specialWish: '',
    photoSource: 'chat_wa',
    addons: {
      customDomain: false,
      quizMiniGame: false,
      fastExpress: false,
    },
  });

  const [copiedNotification, setCopiedNotification] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    if (initialTemplateId) {
      setOrder((prev) => ({ ...prev, templateId: initialTemplateId }));
    }
  }, [initialTemplateId]);

  useEffect(() => {
    if (initialPackage) {
      setOrder((prev) => ({ ...prev, packageTier: initialPackage }));
    }
  }, [initialPackage]);

  // Selected package details
  const selectedPkg = PACKAGES_DATA.find((p) => p.id === order.packageTier) || PACKAGES_DATA[1];
  const selectedTpl = TEMPLATES_DATA.find((t) => t.id === order.templateId) || TEMPLATES_DATA[0];

  // Calculate total price
  const basePrice = selectedPkg.price;
  const domainAddon = order.addons.customDomain ? 25000 : 0;
  const quizAddon = order.addons.quizMiniGame ? 15000 : 0;
  const expressAddon = order.addons.fastExpress ? 20000 : 0;
  const totalPrice = basePrice + domainAddon + quizAddon + expressAddon;

  // Generate clean WhatsApp message
  const generateWhatsAppMessage = () => {
    const addonsList: string[] = [];
    if (order.addons.customDomain) addonsList.push('Custom Subdomain (nama.kadoultah.id)');
    if (order.addons.quizMiniGame) addonsList.push('Mini Game Kuis Kenangan');
    if (order.addons.fastExpress) addonsList.push('Proses Kilat 12 Jam');

    return `Halo Admin Asalera! 👋✨
Saya ingin memesan Website Kado Ulang Tahun dengan rincian berikut:

📌 DATA PESANAN:
• Pilihan Desain: ${selectedTpl.name}
• Paket: ${selectedPkg.name} (Rp ${basePrice.toLocaleString('id-ID')})
• Nama yang Ultah: ${order.recipientName || '(Akan dikirim di chat)'}
• Panggilan: ${order.nickname || '-'}
• Ulang Tahun ke: ${order.turningAge || '-'}
• Tanggal Ultah: ${order.birthdayDate || '(Menyusul)'}
• Dari: ${order.senderName || '(Anonim/Spesial)'}
• Pilihan Lagu: ${order.selectedSong}
• Kirim Foto lewat: ${order.photoSource === 'chat_wa' ? 'Kirim via Chat WhatsApp' : 'Link Google Drive'}

🎁 FITUR TAMBAHAN:
${addonsList.length > 0 ? addonsList.map((a) => `• ${a}`).join('\n') : '• (Tidak ada add-on tambahan)'}

📝 PESAN / HARAPAN SINGKAT:
"${order.specialWish || 'Selamat ulang tahun, semoga selalu bahagia dan sukses selalu!'}"

💰 TOTAL ESTIMASI BIAYA: Rp ${totalPrice.toLocaleString('id-ID')}

Mohon informasi nomor rekening/QRIS untuk pembayaran dan proses pembuatannya ya kak. Terima kasih! 🥰`;
  };

  const handleSendWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <section id="form-order" className="py-16 md:py-24 border-b border-white/10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#A84557] mb-2">
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8F0F4] font-editorial text-balance">
            Form Pemesanan Web Kado Ultah
          </h2>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-7 bg-[#222631]/95 p-6 sm:p-8 rounded-3xl border border-white/10 scrapbook-card relative text-[#F5EEF3]">
            <div className="washi-tape washi-tape-mint top-[-10px] left-8 w-28 -rotate-2" />

            <form onSubmit={(e) => { e.preventDefault(); handleSendWhatsApp(); }} className="space-y-6">

              <div className="grid grid-cols-2 gap-2" aria-label="Langkah pemesanan">
                {['Detail', 'Add-on'].map((label, index) => {
                  const step = index + 1;
                  const isComplete = activeStep > step;

                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setActiveStep(step)}
                      aria-current={activeStep === step ? 'step' : undefined}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                        activeStep === step
                          ? 'border-[#A83D51] bg-[#C24B60] text-white shadow-sm'
                          : isComplete
                            ? 'border-[#A7D6B8] bg-[#EBF7F0] text-[#28734D] hover:bg-[#DDF1E5]'
                            : 'border-[#E5E0DC] bg-white text-[#857376] hover:border-[#CFC6C1] hover:bg-[#F8F6F4]'
                      }`}
                    >
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                        activeStep === step ? 'bg-white/20 text-white' : isComplete ? 'bg-[#3B7A57] text-white' : 'bg-[#F4EEEA] text-[#857376]'
                      }`}>
                        {isComplete ? <Check className="h-3.5 w-3.5" /> : step}
                      </span>
                      <span className="text-xs font-bold">{label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Step 2: Personal Details */}
              {activeStep === 1 && <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#9E4D5D] flex items-center gap-2">
                  <span>Detail kejutan ulang tahun</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#544144] mb-1.5">
                      Nama Lengkap Yang Ultah
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Aurelia Cantika"
                      value={order.recipientName}
                      onChange={(e) => setOrder({ ...order, recipientName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-[#E0D5CB] text-[#381F23] placeholder-[#AFA09C] focus:outline-none focus:ring-2 focus:ring-[#E06D7F]/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#544144] mb-1.5">
                      Panggilan Sayang / Singkat
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Aurel / Bidadariku"
                      value={order.nickname}
                      onChange={(e) => setOrder({ ...order, nickname: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-[#E0D5CB] text-[#381F23] placeholder-[#AFA09C] focus:outline-none focus:ring-2 focus:ring-[#E06D7F]/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#544144] mb-1.5">
                      Ulang Tahun Ke-
                    </label>
                    <input
                      type="number"
                      placeholder="21"
                      value={order.turningAge}
                      onChange={(e) => setOrder({ ...order, turningAge: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-[#E0D5CB] text-[#381F23] placeholder-[#AFA09C] focus:outline-none focus:ring-2 focus:ring-[#E06D7F]/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#544144] mb-1.5">
                      Tanggal Ultah
                    </label>
                    <input
                      type="date"
                      value={order.birthdayDate}
                      onChange={(e) => setOrder({ ...order, birthdayDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-[#E0D5CB] text-[#381F23] focus:outline-none focus:ring-2 focus:ring-[#E06D7F]/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#544144] mb-1.5">
                      Nama Kamu (Pengirim)
                    </label>
                    <input
                      type="text"
                      placeholder="Nama kamu"
                      value={order.senderName}
                      onChange={(e) => setOrder({ ...order, senderName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-[#E0D5CB] text-[#381F23] placeholder-[#AFA09C] focus:outline-none focus:ring-2 focus:ring-[#E06D7F]/40"
                    />
                  </div>
                </div>
              </div>}

              {/* Step 3: Message & Music */}
              {activeStep === 1 && <div className="space-y-4 pt-4 border-t border-[#F3D8C4]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#9E4D5D] flex items-center gap-2">
                  <span>Pesan Cinta & Pilihan Musik</span>
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-[#544144] mb-1.5">
                    Pilihan Lagu Latar Belakang
                  </label>
                  <select
                    value={order.selectedSong}
                    onChange={(e) => setOrder({ ...order, selectedSong: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-[#E0D5CB] text-[#381F23] focus:outline-none focus:ring-2 focus:ring-[#E06D7F]/40 cursor-pointer"
                  >
                    <option value="Happy Birthday Lofi Chimes">Happy Birthday Lofi Chimes (Acoustic Sweet)</option>
                    <option value="Ed Sheeran - Perfect (Acoustic)">Ed Sheeran - Perfect (Acoustic)</option>
                    <option value="Daniel Caesar - Best Part">Daniel Caesar - Best Part</option>
                    <option value="Niki - Every Summertime">Niki - Every Summertime</option>
                    <option value="K-Pop Sweet Birthday Song">K-Pop Sweet Birthday Song</option>
                    <option value="Request Lagu Sendiri (Bebas via WA)">Request Lagu Sendiri Bebas (Kirim di WA)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#544144] mb-1.5">
                    Isi Surat Ucapan / Harapan Spesial
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tuliskan ucapan atau cerita manis yang ingin kamu masukkan ke dalam surat rahasia..."
                    value={order.specialWish}
                    onChange={(e) => setOrder({ ...order, specialWish: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-[#E0D5CB] text-[#381F23] placeholder-[#AFA09C] focus:outline-none focus:ring-2 focus:ring-[#E06D7F]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#544144] mb-1.5">
                    Metode Pengiriman Foto Kenangan
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                      order.photoSource === 'chat_wa' ? 'bg-[#FFF0F3] border-[#F3C4CF] text-[#C24B60]' : 'bg-white border-[#E0D5CB] text-[#6E5D60]'
                    }`}>
                      <input
                        type="radio"
                        name="photoSource"
                        checked={order.photoSource === 'chat_wa'}
                        onChange={() => setOrder({ ...order, photoSource: 'chat_wa' })}
                        className="text-[#E06D7F]"
                      />
                      <span>Kirim Langsung di WhatsApp</span>
                    </label>

                    <label className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                      order.photoSource === 'google_drive' ? 'bg-[#FFF0F3] border-[#F3C4CF] text-[#C24B60]' : 'bg-white border-[#E0D5CB] text-[#6E5D60]'
                    }`}>
                      <input
                        type="radio"
                        name="photoSource"
                        checked={order.photoSource === 'google_drive'}
                        onChange={() => setOrder({ ...order, photoSource: 'google_drive' })}
                        className="text-[#E06D7F]"
                      />
                      <span>Link Google Drive</span>
                    </label>
                  </div>
                </div>
              </div>}

              {/* Step 4: Add-ons */}
              {activeStep === 2 && <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#9E4D5D]">
                  Add-on tambahan (opsional)
                </h3>

                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-[#EAE0D7] bg-white hover:bg-[#FAF6F4] transition-colors cursor-pointer text-xs">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={order.addons.customDomain}
                        onChange={(e) => setOrder({
                          ...order,
                          addons: { ...order.addons, customDomain: e.target.checked }
                        })}
                        className="rounded text-[#E06D7F] focus:ring-[#E06D7F]"
                      />
                      <div>
                        <span className="font-semibold text-[#381F23]">Custom Subdomain Spesial</span>
                        <p className="text-[11px] text-[#857376]">Contoh: aurel.kadoultah.id</p>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-[#C24B60]">+Rp 25.000</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-[#EAE0D7] bg-white hover:bg-[#FAF6F4] transition-colors cursor-pointer text-xs">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={order.addons.quizMiniGame}
                        onChange={(e) => setOrder({
                          ...order,
                          addons: { ...order.addons, quizMiniGame: e.target.checked }
                        })}
                        className="rounded text-[#E06D7F] focus:ring-[#E06D7F]"
                      />
                      <div>
                        <span className="font-semibold text-[#381F23]">Mini Game Kuis Kenangan Interaktif</span>
                        <p className="text-[11px] text-[#857376]">Tebak tanggal jadian, tempat kencan favorit, dll</p>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-[#C24B60]">+Rp 15.000</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-[#EAE0D7] bg-white hover:bg-[#FAF6F4] transition-colors cursor-pointer text-xs">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={order.addons.fastExpress}
                        onChange={(e) => setOrder({
                          ...order,
                          addons: { ...order.addons, fastExpress: e.target.checked }
                        })}
                        className="rounded text-[#E06D7F] focus:ring-[#E06D7F]"
                      />
                      <div>
                        <span className="font-semibold text-[#381F23]">Pengerjaan Kilat Express (12 Jam Jadi)</span>
                        <p className="text-[11px] text-[#857376]">Prioritas utama antrean pengerjaan admin</p>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-[#C24B60]">+Rp 20.000</span>
                  </label>
                </div>
              </div>}

              <div className="flex items-center justify-between gap-3 border-t border-[#F3D8C4] pt-4">
                <button
                  type="button"
                  onClick={() => setActiveStep((step) => Math.max(1, step - 1))}
                  disabled={activeStep === 1}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#E0D5CB] bg-white px-4 py-2.5 text-xs font-bold text-[#544144] transition hover:bg-[#FAF6F4] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowRight className="h-4 w-4 rotate-180" /> Kembali
                </button>
                {activeStep < 2 && (
                  <button
                    type="button"
                    onClick={() => setActiveStep((step) => Math.min(2, step + 1))}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#C24B60] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#A83D51] active:scale-95"
                  >
                    Lanjut <ArrowRight className="h-4 w-4" />
                  </button>
                )}
                {activeStep === 2 && <span className="text-right text-[11px] text-[#857376]">Ringkasan pesanan ada di samping</span>}
              </div>

            </form>
          </div>

          {/* Right Column: Live Order Summary & WhatsApp Action */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            
            {/* Order Summary Card */}
            <div className="bg-[#222631]/95 p-6 sm:p-7 rounded-3xl border border-white/10 scrapbook-card relative text-[#F5EEF3]">
              <div className="washi-tape washi-tape-yellow top-[-10px] right-8 w-24 rotate-3" />

              <h3 className="text-base font-bold text-[#F5EEF3] flex items-center justify-between pb-4 border-b border-white/10">
                <span>Ringkasan Pesanan Kamu</span>
                <span className="p-1 rounded-md bg-[#FFF0F3] text-[#D65D72]">
                 
                </span>
              </h3>

              {/* Itemized details */}
              <div className="space-y-3 py-4 text-xs text-[#D8CBD3]">
                <div className="flex justify-between">
                  <span>Template Terpilih:</span>
                  <span className="font-semibold text-[#F5EEF3]">{selectedTpl.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Paket:</span>
                  <span className="font-semibold text-[#F5EEF3]">{selectedPkg.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Penerima:</span>
                  <span className="font-semibold text-[#F5EEF3]">
                    {order.recipientName || '(Belum diisi)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Harga Paket:</span>
                  <span className="font-mono tabular-nums">Rp {basePrice.toLocaleString('id-ID')}</span>
                </div>

                {order.addons.customDomain && (
                  <div className="flex justify-between text-[#8A4F59]">
                    <span>+ Custom Domain:</span>
                    <span className="font-mono tabular-nums">+Rp 25.000</span>
                  </div>
                )}
                {order.addons.quizMiniGame && (
                  <div className="flex justify-between text-[#8A4F59]">
                    <span>+ Mini Game Kuis:</span>
                    <span className="font-mono tabular-nums">+Rp 15.000</span>
                  </div>
                )}
                {order.addons.fastExpress && (
                  <div className="flex justify-between text-[#8A4F59]">
                    <span>+ Pengerjaan Kilat:</span>
                    <span className="font-mono tabular-nums">+Rp 20.000</span>
                  </div>
                )}
              </div>

              {/* Total Calculation */}
              <div className="pt-4 border-t border-[#F3D8C4] flex items-baseline justify-between mb-6">
                <div>
                  <span className="text-xs text-[#D8CBD3]">Total Pembayaran:</span>
                  <p className="text-2xl font-bold text-[#C24B60] font-mono tabular-nums">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </p>
                </div>
                <span className="text-[11px] text-[#3B7A57] bg-[#EBF7F0] px-2.5 py-1 rounded-lg font-semibold">
                  Garansi Revisi Sepuasnya
                </span>
              </div>

              {/* WhatsApp Action Buttons */}
              <div className="space-y-2.5">
                {activeStep === 2 && <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full py-4 px-5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Kirim Pesanan ke WhatsApp Admin</span>
                </button>}

                {activeStep === 2 && <button
                  type="button"
                  onClick={handleCopyText}
                  className="w-full py-2.5 px-4 bg-white hover:bg-[#F9F5F1] text-[#6B5A5C] border border-[#E0D5CB] text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{copiedNotification ? '✓ Teks Format Pesanan Berhasil Disalin!' : 'Salin Draf Pesanan'}</span>
                </button>}
              </div>

              {/* Trust Badges */}
              <div className="mt-5 pt-4 border-t border-[#F3D8C4] flex items-center justify-center gap-4 text-[11px] text-[#8A797C]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3B7A57]" />
                  <span>Privasi Foto 100% Aman</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#D65D72] fill-[#D65D72]" />
                  <span>Garansi Sampai Puas</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
