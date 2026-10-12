import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, Play, Pause, RotateCcw, Flame, Heart, 
  ChevronLeft, ChevronRight, Music, Mail, Gift, 
  Smartphone, Monitor, CheckCircle, ArrowRight
} from 'lucide-react';
import { TEMPLATES_DATA, MOCK_POLAROIDS } from '../data/templates';
import { birthdayAudioPlayer } from '../utils/audioSynth';

interface LiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplateId: string;
  onSelectForOrder: (templateId: string) => void;
}

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({
  isOpen,
  onClose,
  selectedTemplateId,
  onSelectForOrder,
}) => {
  const [activeTemplateId, setActiveTemplateId] = useState(selectedTemplateId || 'anime-romance');
  const [deviceView, setDeviceView] = useState<'mobile' | 'desktop'>('mobile');
  
  // Interactive Feature 1: Tiup Lilin
  const [isCandleLit, setIsCandleLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  // Interactive Feature 2: Audio Player
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Interactive Feature 3: Polaroid Flip
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Interactive Feature 4: Envelope Letter
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  // Interactive Feature 5: Scratch Card
  const scratchCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isScratchClaimed, setIsScratchClaimed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  // Active template data
  const template = TEMPLATES_DATA.find((t) => t.id === activeTemplateId) || TEMPLATES_DATA[0];

  useEffect(() => {
    if (selectedTemplateId) {
      setActiveTemplateId(selectedTemplateId);
    }
  }, [selectedTemplateId]);

  // Audio player listener
  useEffect(() => {
    birthdayAudioPlayer.setBeatCallback((_, progress) => {
      setAudioProgress(progress);
    });

    return () => {
      birthdayAudioPlayer.pause();
    };
  }, []);

  // Handle candle blow
  const handleBlowCandle = () => {
    if (!isCandleLit) return;
    setIsCandleLit(false);
    setWishMade(true);

    // Blast celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E06D7F', '#F59E0B', '#F472B6', '#FBBF24', '#A78BFA']
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0.2, y: 0.7 },
        colors: ['#E06D7F', '#F59E0B', '#34D399']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 0.8, y: 0.7 },
        colors: ['#E06D7F', '#F59E0B', '#60A5FA']
      });
    }, 250);
  };

  const handleRelightCandle = () => {
    setIsCandleLit(true);
    setWishMade(false);
  };

  const toggleAudio = () => {
    birthdayAudioPlayer.toggle((playing) => {
      setIsPlayingAudio(playing);
    });
  };

  // Canvas Scratch Card Logic
  const initScratchCard = () => {
    const canvas = scratchCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Fill with pastel silver/shimmer scratch cover
    ctx.globalCompositeOperation = 'source-over';
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#E2D9D2');
    gradient.addColorStop(0.5, '#F5EDE8');
    gradient.addColorStop(1, '#D9CEC6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw scratch hint text on top
    ctx.fillStyle = '#786467';
    ctx.font = 'bold 13px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ GOSOK DENGAN JARI / KURSOR ✨', width / 2, height / 2 - 4);
    ctx.font = '11px Plus Jakarta Sans, sans-serif';
    ctx.fillStyle = '#9E888B';
    ctx.fillText('Buka Hadiah Rahasia Ultahmu', width / 2, height / 2 + 16);

    setScratchPercent(0);
    setIsScratchClaimed(false);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        initScratchCard();
      }, 300);
    }
  }, [isOpen, activeTemplateId]);

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = scratchCanvasRef.current;
    if (!canvas || isScratchClaimed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();

    // Estimate scratched percentage
    const current = scratchPercent + 4;
    setScratchPercent(Math.min(current, 100));

    if (current > 50 && !isScratchClaimed) {
      setIsScratchClaimed(true);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    setIsScratching(false);
  };

  if (!isOpen) return null;

  const currentPhoto = MOCK_POLAROIDS[currentPhotoIdx];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Demo ${template.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-5xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8D9CE] overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Control Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-white border-b border-[#EBDED4] flex items-center justify-between gap-4 shrink-0">
          
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9A8589]">Demo desain</p>
            <h2 className="truncate text-sm font-bold text-[#381F23] sm:text-base">{template.name}</h2>
          </div>

          {/* Viewport Mode Toggles + Close */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center p-1 bg-[#F5EFE8] rounded-full border border-[#E6DAD0]">
              <button
                onClick={() => setDeviceView('mobile')}
                className={`p-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  deviceView === 'mobile' ? 'bg-[#C24B60] text-white shadow-xs' : 'text-[#8A797C]'
                }`}
                title="Tampilan HP"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceView('desktop')}
                className={`p-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  deviceView === 'desktop' ? 'bg-[#C24B60] text-white shadow-xs' : 'text-[#8A797C]'
                }`}
                title="Tampilan Desktop"
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                birthdayAudioPlayer.pause();
                setIsPlayingAudio(false);
                onClose();
              }}
              className="p-2 text-[#786467] hover:text-[#381F23] hover:bg-[#F0E4DE] rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Simulator Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF7F2] paper-pattern">
          
          <div className={`mx-auto transition-all duration-300 ${
            deviceView === 'mobile' 
              ? 'max-w-md bg-white rounded-[2.5rem] border-[6px] border-[#382629] shadow-2xl p-4 sm:p-5' 
              : 'max-w-3xl bg-white rounded-3xl border border-[#E6DAD0] shadow-md p-6 sm:p-8'
          }`}>
            
            {/* Live Preview Header */}
            <div className="text-center pb-6 border-b border-[#F0E6DE] relative">
              <div className="washi-tape washi-tape-mint top-[-24px] left-1/3 w-28 -rotate-1" />
              <div className="inline-flex items-center gap-1.5 text-xs text-[#C24B60] font-medium tracking-wide">
                <span>SPECIAL BIRTHDAY CELEBRATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#381F23] font-editorial mt-1">
                Happy {template.mockAge}th Birthday!
              </h2>
              <p className="font-handwriting text-2xl text-[#C24B60] mt-0.5">
                Dear, {template.mockRecipient} ✨
              </p>
            </div>

            {/* INTERACTIVE FEATURE 1: Virtual Birthday Cake & Candle Blow */}
            <div className="my-6 p-4 sm:p-6 bg-[#FFF9FA] rounded-2xl border border-[#FCE2E7] text-center relative overflow-hidden">
              <div className="washi-tape washi-tape-yellow top-[-10px] right-6 w-20 rotate-3" />
              
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#9E4D5D] mb-4">
                Fitur Interaktif #1 · Tiup Lilin Ulang Tahun
              </h3>

              {/* Cake Illustration with Candle */}
              <div className="relative inline-block my-2">
                {/* Candle Stick */}
                <div className="relative mx-auto w-4 h-12 bg-[#F4C542] rounded-t-sm shadow-xs">
                  {/* Wick */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-[#451A03]" />
                  
                  {/* Candle Flame (Interactive clickable flame) */}
                  {isCandleLit ? (
                    <div
                      onClick={handleBlowCandle}
                      className="absolute -top-7 left-1/2 -translate-x-1/2 w-5 h-7 rounded-full bg-[#F7B52C] animate-flame cursor-pointer shadow-lg hover:scale-125 transition-transform"
                      title="Klik apinya untuk meniup!"
                    />
                  ) : (
                    /* Smoke puff when blown out */
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70">
                      <span className="text-xs font-handwriting text-[#786467] animate-pulse">~ puff ~</span>
                    </div>
                  )}
                </div>

                {/* Cake 3-Layered Base */}
                <div className="mt-1 w-44 sm:w-52 mx-auto">
                  {/* Layer 1: Top cream frosting */}
                  <div className="h-6 bg-[#FED7E2] rounded-t-xl border-b-2 border-white flex justify-around items-center px-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]" />
                  </div>
                  {/* Layer 2: Sponge cake body */}
                  <div className="h-10 bg-[#FDE2D0] border-b-2 border-[#FED7E2] flex items-center justify-center">
                    <span className="font-handwriting text-sm text-[#834E37]">★ Sweet Wishes ★</span>
                  </div>
                  {/* Layer 3: Bottom plate */}
                  <div className="h-3 bg-[#E2E8F0] rounded-b-xl shadow-md" />
                </div>
              </div>

              {/* Action Buttons for Candle */}
              <div className="mt-4">
                {isCandleLit ? (
                  <button
                    onClick={handleBlowCandle}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D65D72] hover:bg-[#C24B60] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-all cursor-pointer active:scale-95"
                  >
                    <Flame className="w-4 h-4 fill-[#FDE047] text-[#FDE047]" />
                    <span>Tiup Lilin Sekarang! (Klik di sini)</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <p className="font-handwriting text-xl text-[#C24B60] animate-bounce">
                      ✨ Lilin padam! Semua doa terbaik dikabulkan! 🥳 ✨
                    </p>
                    <button
                      onClick={handleRelightCandle}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-[#786467] border border-[#E8D4D8] text-xs font-medium rounded-lg hover:bg-[#FFF5F7] transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Nyalakan Lilin Lagi</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* INTERACTIVE FEATURE 2: Aesthetic Music Player (Spotify / Cassette style) */}
            <div className="my-6 p-4 sm:p-5 bg-[#F6F5FF] rounded-2xl border border-[#E4E0FB] relative">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E3FC]">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-white text-[#7C3AED] shadow-2xs">
                    <Music className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#3B2961]">Fitur #2 · Pemutar Musik Lagu Kenangan</h4>
                    <p className="text-[11px] text-[#7B6A9E]">Sweet Birthday Lofi Melody · Track #01</p>
                  </div>
                </div>

                {/* Animated Visualizer Bars */}
                <div className="flex items-end gap-1 h-5 px-2">
                  <span className={`w-1 bg-[#8B5CF6] rounded-full ${isPlayingAudio ? 'animate-bar-1' : 'h-1.5'}`} />
                  <span className={`w-1 bg-[#A78BFA] rounded-full ${isPlayingAudio ? 'animate-bar-2' : 'h-2.5'}`} />
                  <span className={`w-1 bg-[#8B5CF6] rounded-full ${isPlayingAudio ? 'animate-bar-3' : 'h-1'}`} />
                  <span className={`w-1 bg-[#C4B5FD] rounded-full ${isPlayingAudio ? 'animate-bar-4' : 'h-2'}`} />
                  <span className={`w-1 bg-[#8B5CF6] rounded-full ${isPlayingAudio ? 'animate-bar-5' : 'h-1.5'}`} />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-[#E5DFF8] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#7C3AED] h-full transition-all duration-300"
                    style={{ width: `${isPlayingAudio ? audioProgress * 100 : 0}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-[#8675A9] mt-1">
                  <span>0:14</span>
                  <span>0:45</span>
                </div>
              </div>

              {/* Play/Pause Button & Lyrics Quote */}
              <div className="mt-2 flex items-center justify-between gap-3">
                <button
                  onClick={toggleAudio}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-white" />
                      <span>Jeda Musik</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Putar Lagu Ulang Tahun</span>
                    </>
                  )}
                </button>

                <p className="font-handwriting text-sm text-[#5B3E96] italic text-right">
                  "Semoga lagu ini selalu mengingatkanmu pada hari bahagiamu..."
                </p>
              </div>
            </div>

            {/* INTERACTIVE FEATURE 3: Polaroid Interactive Photo Gallery (Flip Card) */}
            <div className="my-6 p-4 sm:p-6 bg-[#FCFBF7] rounded-2xl border border-[#EDE4DC] relative text-center">
              <div className="washi-tape washi-tape-lavender top-[-10px] left-6 w-24 -rotate-2" />

              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A6352] text-left">
                    Fitur #3 · Galeri Polaroid Kenangan (Klik Foto untuk Membalik)
                  </h3>
                  <p className="text-[11px] text-[#A38E7E] text-left">Foto {currentPhotoIdx + 1} dari {MOCK_POLAROIDS.length}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setIsFlipped(false);
                      setCurrentPhotoIdx((prev) => (prev > 0 ? prev - 1 : MOCK_POLAROIDS.length - 1));
                    }}
                    className="p-1.5 rounded-lg bg-white border border-[#E0D5CB] text-[#695444] hover:bg-[#F5EDE4] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setIsFlipped(false);
                      setCurrentPhotoIdx((prev) => (prev + 1) % MOCK_POLAROIDS.length);
                    }}
                    className="p-1.5 rounded-lg bg-white border border-[#E0D5CB] text-[#695444] hover:bg-[#F5EDE4] cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3D Flip Card Container */}
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className="relative max-w-xs mx-auto aspect-[4/5] cursor-pointer select-none group perspective-1000"
              >
                <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  
                  {/* FRONT SIDE: Polaroid Photo */}
                  <div className="absolute inset-0 bg-white p-3 pt-3 pb-6 rounded-2xl polaroid-shadow border border-[#E8DDD2] flex flex-col justify-between backface-hidden">
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#F2EAE4] relative">
                      <img
                        src={currentPhoto.frontImage}
                        alt={currentPhoto.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/50 text-[10px] text-white backdrop-blur-xs">
                        Ketuk untuk balik ↺
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <h4 className="font-handwriting text-xl text-[#382326]">{currentPhoto.title}</h4>
                      <p className="text-[11px] text-[#9E8B83]">{currentPhoto.date}</p>
                    </div>
                  </div>

                  {/* BACK SIDE: Secret Handwritten Memo Note */}
                  <div className="absolute inset-0 bg-[#FFFDF7] p-5 rounded-2xl polaroid-shadow border border-[#E8DDD2] flex flex-col justify-between rotate-y-180 backface-hidden">
                    <div className="border-b border-[#E8DFD5] pb-2 text-left">
                      <span className="text-[10px] uppercase font-semibold text-[#B39B8B] tracking-wider">Catatan di Balik Foto</span>
                      <p className="text-xs text-[#6B5A51] font-medium">{currentPhoto.title}</p>
                    </div>
                    
                    <div className="my-auto py-2">
                      <p className="font-handwriting text-2xl text-[#C24B60] leading-relaxed">
                        "{currentPhoto.backMemo}"
                      </p>
                    </div>

                    <div className="text-center pt-2 border-t border-[#E8DFD5]">
                      <span className="text-[10px] text-[#A38E7E]">Ketuk lagi untuk melihat foto</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* INTERACTIVE FEATURE 4: Secret Letter with Wax-Sealed Envelope */}
            <div className="my-6 p-4 sm:p-6 bg-[#FFF9F6] rounded-2xl border border-[#FBE3D8] text-center relative">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A8583B] mb-2">
                Fitur #4 · Surat Cinta dalam Amplop Rahasia
              </h3>
              <p className="text-[11px] text-[#8C6D60] mb-4">
                Penerima bisa membuka segel lilin untuk membaca surat ucapan pribadi dari kamu.
              </p>

              {/* Envelope Component */}
              <div className="max-w-sm mx-auto">
                {!isEnvelopeOpen ? (
                  <div
                    onClick={() => setIsEnvelopeOpen(true)}
                    className="p-6 bg-[#FFF2EB] hover:bg-[#FFEAE0] rounded-2xl border-2 border-dashed border-[#F3CDBF] cursor-pointer transition-all shadow-sm group hover:scale-[1.02]"
                  >
                    {/* Wax seal simulation */}
                    <div className="w-14 h-14 mx-auto rounded-full bg-[#E06D7F] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Heart className="w-6 h-6 fill-white" />
                    </div>
                    <p className="font-handwriting text-2xl text-[#381F23] mt-3">
                      Surat Rahasia untuk {template.mockRecipient}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#C24B60] font-semibold mt-1">
                      <Mail className="w-3.5 h-3.5" />
                      Klik untuk Buka Segel Surat
                    </span>
                  </div>
                ) : (
                  <div className="p-5 bg-white rounded-2xl polaroid-shadow border border-[#EAD5CB] text-left transition-all animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-[#F2E4DC] pb-2 mb-3">
                      <span className="font-handwriting text-xl text-[#C24B60]">Untuk Bidadari Favoritku 💌</span>
                      <button
                        onClick={() => setIsEnvelopeOpen(false)}
                        className="text-xs text-[#9E867E] hover:text-[#381F23] cursor-pointer"
                      >
                        Tutup Surat
                      </button>
                    </div>
                    <p className="font-handwriting text-xl text-[#4A3236] leading-relaxed whitespace-pre-line">
                      {template.mockMessage}
                    </p>
                    <div className="mt-4 pt-3 border-t border-[#F2E4DC] text-right">
                      <p className="font-handwriting text-lg text-[#C24B60]">Dengan cinta, selalu ♥</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* INTERACTIVE FEATURE 5: Mini Game Scratch Card (Kartu Gosok Hadiah Virtual) */}
            <div className="my-6 p-4 sm:p-6 bg-[#FDFCF7] rounded-2xl border border-[#EAE3D2] text-center relative">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#736340] mb-1">
                Fitur #5 · Mini Game Scratch Card (Gosok Kartu Hadiah)
              </h3>
              <p className="text-[11px] text-[#8C7A58] mb-4">
                Gosok lapisan kartu di bawah ini untuk melihat kado rahasia!
              </p>

              <div className="relative max-w-xs mx-auto h-36 rounded-2xl overflow-hidden border-2 border-[#D8CEB8] shadow-inner bg-[#FFF3CB] flex items-center justify-center p-4">
                {/* Underneath content (The hidden prize) */}
                <div className="text-center select-none">
                  <div className="w-9 h-9 mx-auto rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center mb-1">
                    <Gift className="w-5 h-5" />
                  </div>
                  <p className="font-semibold text-xs text-[#92400E]">🎟️ VOUCHER KADO ULTAH</p>
                  <p className="font-handwriting text-xl text-[#B45309] font-bold">
                    "Traktir Makan Sepuasnya & Pelukan Tanpa Batas"
                  </p>
                  <span className="text-[10px] text-[#A16207]">Berlaku selamanya tanpa kadaluarsa!</span>
                </div>

                {/* Canvas scratch layer */}
                <canvas
                  ref={scratchCanvasRef}
                  width={320}
                  height={144}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
                />
              </div>

              {isScratchClaimed && (
                <div className="mt-3 text-xs font-semibold text-[#059669] flex items-center justify-center gap-1.5 animate-bounce">
                  <CheckCircle className="w-4 h-4" />
                  <span>Hadiah berhasil terungkap! Siap diklaim oleh penerima kado!</span>
                </div>
              )}
            </div>

            {/* Modal Bottom Call to Action */}
            <div className="mt-8 pt-5 border-t border-[#F0E6DE] text-center space-y-3">
              <p className="text-xs sm:text-sm text-[#695457]">
                Tertarik dengan template <strong className="text-[#381F23]">{template.name}</strong> ini? Kamu bisa kustomisasi tulisan, foto, dan lagu sesuai ceritamu!
              </p>
              
              <button
                onClick={() => {
                  birthdayAudioPlayer.pause();
                  setIsPlayingAudio(false);
                  onSelectForOrder(template.id);
                  onClose();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D65D72] hover:bg-[#C24B60] text-white text-sm font-semibold rounded-2xl shadow-md transition-all cursor-pointer active:scale-95"
              >
                <span>Tambah ke Keranjang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
