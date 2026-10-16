import { TemplateItem, PackageDetail, PolaroidPhoto } from '../types';
import heroAnimeImg from '../assets/images/hero_anime_birthday_trio_1791799109912.jpg';
import cardCoupleImg from '../assets/images/card_anime_couple_1791799130034.jpg';
import cardBestiesImg from '../assets/images/card_anime_besties_1791799146479.jpg';
import cardLofiImg from '../assets/images/card_anime_lofi_music_1791799161022.jpg';

export { heroAnimeImg, cardCoupleImg, cardBestiesImg, cardLofiImg };

export const TEMPLATES_DATA: TemplateItem[] = [
  {
    id: 'anime-romance',
    name: 'Sweet Romance Edition',
    subtitle: 'Kue Ultah Lilin Hangat & Surat Cinta Romantis',
    category: 'pacar',
    price: 69000,
    originalPrice: 120000,
    popular: true,
    coverStyle: 'from-[#FFECE5] to-[#FFD8CB]',
    accentBg: 'bg-[#FFECE5]',
    accentColor: '#F06543',
    badge: 'Paling Populer',
    image: cardCoupleImg,
    description: 'Konsep kado romantis anime dengan lilin ulang tahun hangat di kafe senja, galeri kenangan berdua, dan amplop surat cinta rahasia.',
    highlights: [
      'Tiup lilin kue ulang tahun virtual interaktif',
      'Galeri foto momen berdua dengan 3D flip memo',
      'Surat rahasia dengan segel lilin terbuka',
      'Pemutar musik manis dengan lirik berjalan'
    ],
    mockRecipient: 'Aurelia Cantika',
    mockAge: 21,
    mockMessage: 'Selamat bertambah usia, cintaku! Semoga setiap langkahmu selalu dipeluk bahagia dan semua mimpi indahmu terwujud.'
  },
  {
    id: 'anime-squad',
    name: 'Bestie Squad Party',
    subtitle: 'Pesta Ulang Tahun Ceria & Konfeti Sahabat',
    category: 'sahabat',
    price: 69000,
    originalPrice: 110000,
    popular: true,
    coverStyle: 'from-[#FFF1E8] to-[#FFE2D1]',
    accentBg: 'bg-[#FFF1E8]',
    accentColor: '#C24B60',
    badge: 'Bestie Choice',
    image: cardBestiesImg,
    description: 'Tema pesta ulang tahun seru bersama sahabat satu geng, penuh letupan konfeti, kuis kenangan lucu, dan voucher traktiran virtual.',
    highlights: [
      'Foto galeri geng sahabat dengan efek 3D flip',
      'Kue tart ulang tahun tiup lilin & konfeti',
      'Scratch card hadiah virtual voucher ngopi',
      'Papan ucapan kawan & timeline kenangan'
    ],
    mockRecipient: 'Nabila & Jessica',
    mockAge: 22,
    mockMessage: 'Happy birthday sahabat tergila! Makasih udah selalu ada nemenin dari zaman susah sampe sekarang. Love you to the moon!'
  },
  {
    id: 'anime-lofi',
    name: 'Lofi Cassette Melody',
    subtitle: 'Pemutar Kaset Retro & Spotify Lofi Vibes',
    category: 'retro',
    price: 79000,
    originalPrice: 135000,
    popular: true,
    coverStyle: 'from-[#FDF3EB] to-[#FCE4D6]',
    accentBg: 'bg-[#FDF3EB]',
    accentColor: '#D9532F',
    badge: 'Music Aesthetic',
    image: cardLofiImg,
    description: 'Tampilan santai kamar lofi sore hari dengan pemutar kaset pita animasi yang berputar saat musik dinyalakan, playlist kenangan, dan stiker estetik.',
    highlights: [
      'Kaset tape animasi berputar + Spotify-style player',
      'Visualizer equalizer musik bergerak dinamis',
      'Foto slider estetik dengan frame kaset vintage',
      'Kartu kuis kenangan kecil interaktif'
    ],
    mockRecipient: 'Rian Pratama',
    mockAge: 24,
    mockMessage: 'Happy 24th birthday! Semoga tahun ini penuh melodi indah, playlist baru yang menyenangkan, dan pencapaian baru!'
  },
  {
    id: 'anime-celebrate',
    name: 'Golden Joy Celebration',
    subtitle: 'Perayaan Meriah Tiga Sahabat & Kue Tart 3D',
    category: 'sahabat',
    price: 59000,
    originalPrice: 99000,
    coverStyle: 'from-[#FFF5ED] to-[#FFEAD8]',
    accentBg: 'bg-[#FFF5ED]',
    accentColor: '#F57C00',
    badge: 'Joyful & Warm',
    image: heroAnimeImg,
    description: 'Palet warna oranye aprikot hangat dengan suasana perayaan ceria, kado kejutan bertumpuk, dan ucapan penuh semangat.',
    highlights: [
      'Animasi balon dan letupan konfeti meriah',
      'Surat ucapan panjang dengan layout estetik',
      'Album potret bersama kawan terdekat',
      'Countdown hitung mundur ke hari ulang tahun'
    ],
    mockRecipient: 'Dinda Maharani',
    mockAge: 20,
    mockMessage: 'Untuk kamu yang selalu menebarkan tawa dan energi positif. Selamat ulang tahun yang ke-20, semoga selalu sukses!'
  }
];

export const PACKAGES_DATA: PackageDetail[] = [
  {
    id: 'starter',
    name: 'Paket Sweet Starter',
    price: 39000,
    description: 'Pilihan hemat untuk kejutan manis yang berkesan.',
    features: [
      '1 Halaman Website Estetik Responsif',
      'Kue Ultah Tiup Lilin + Konfeti',
      'Galeri 4 Foto Polaroid Pilihan',
      'Surat Ucapan Spesial Terbuka',
      '1 Lagu Latar Pilihan Kamu',
      'Masa Aktif Website 1 Tahun'
    ]
  },
  {
    id: 'deluxe',
    name: 'Paket Deluxe Scrapbook',
    price: 69000,
   
    description: 'Fitur terlengkap untuk kado paling istimewa dan memorable.',
    features: [
      'Semua Fitur Paket Starter',
      'Galeri 10 Foto Polaroid (Bisa di-flip)',
      'Pemutar Musik Cassette / Spotify Visualizer',
      'Surat Amplop Rahasia Segel Lilin Terbuka',
      'Kartu Gosok (Scratch Card) Hadiah Virtual',
      'Countdown Menghitung Hari/Jam Ultah',
      'Masa Aktif Website Selamanya (Tanpa Batas)'
    ]
  },
  {
    id: 'vip',
    name: 'Paket VIP Exclusive Custom',
    price: 99000,
    
    description: 'Kemewahan maksimal dengan custom domain eksklusif dan mini game kuis.',
    features: [
      'Semua Fitur Paket Deluxe',
      'Custom Link Eksklusif (nama.kadoultah.id)',
      'Mini Game Kuis Tebak Kenangan',
      'Buku Tamu Ucapan Virtual dari Teman-teman',
      'Pengerjaan Kilat Prioritas (12 Jam Jadi)',
      'Garansi Revisi Sepuasnya'
    ]
  }
];

export const MOCK_POLAROIDS: PolaroidPhoto[] = [
  {
    id: 1,
    title: 'Kafe Senja Berdua',
    date: '14 Februari · Kafe Senja',
    frontImage: cardCoupleImg,
    backMemo: 'Ingat waktu kamu grogi pas pesan kopi pertama kali? Dari hari itu, aku tahu kamu sosok yang spesial banget.',
    rotation: '-rotate-2'
  },
  {
    id: 2,
    title: 'Pesta Ulang Tahun Bestie',
    date: '28 Juli · Kelas 2-A',
    frontImage: cardBestiesImg,
    backMemo: 'Senang banget bisa ngerayain bareng kalian semua! Semoga pertemanan kita awet sampai tua!',
    rotation: 'rotate-3'
  },
  {
    id: 3,
    title: 'Sore Santai Lofi Melodi',
    date: '19 November · Kamar Estetik',
    frontImage: cardLofiImg,
    backMemo: 'Setiap dengerin lagu ini, rasanya tenang banget kayak lagi ngobrol santai sama kamu.',
    rotation: '-rotate-1'
  },
  {
    id: 4,
    title: 'Momen Tiup Lilin Bersama',
    date: '10 Mei · Rumah Kenangan',
    frontImage: heroAnimeImg,
    backMemo: 'Semoga semua harapan dan cita-citamu di umur yang baru ini terkabul ya!',
    rotation: 'rotate-2'
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Clarissa Natalia',
    role: 'Pesan untuk Pacar (Ultah ke-22)',
    comment: 'Pacarku nangis terharu pas buka linknya! Dia kaget banget ada fitur tiup lilin yang bisa ditiup beneran sama lagu kesukaan kita. Worth it parah daripada kado barang biasa.',
    rating: 5,
    tag: 'Kejutan Romantis'
  },
  {
    id: 2,
    name: 'Dimas Aditya',
    role: 'Pesan untuk Istri Tercinta',
    comment: 'Pengerjaannya cepet banget, adminnya ramah pas aku minta revisi ganti foto. Waktu istriku buka amplop surat virtualnya, dia langsung peluk aku. Terima kasih Memou!',
    rating: 5,
    tag: 'Surat Virtual'
  },
  {
    id: 3,
    name: 'Rania & Geng Kampus',
    role: 'Pesan untuk Sahabat Seperjuangan',
    comment: 'Kami patungan bikin web ultah tema polaroid buat sahabat kami. Pas dia gosok scratch card hadiahnya ternyata voucher traktiran kita, seru banget!',
    rating: 5,
    tag: 'Kado Sahabat'
  }
];

export const FAQ_DATA = [
  {
    question: 'Berapa lama proses pembuatan websitenya?',
    answer: 'Proses pembuatan rata-rata memakan waktu 12 hingga 24 jam setelah data foto, ucapan, dan pilihan lagu dikirimkan lengkap melalui WhatsApp.'
  },
  {
    question: 'Apakah website bisa dibuka di semua jenis HP / Laptop?',
    answer: 'Ya, tentu! Website dibuat 100% responsif, ringan, dan lancar dibuka di iPhone, Android, Tablet, maupun Laptop tanpa perlu unduh aplikasi apapun.'
  },
  {
    question: 'Bagaimana cara saya mengirimkan foto dan ucapan?',
    answer: 'Setelah memilih paket dan klik tombol WhatsApp, admin kami akan langsung memandu Anda. Anda cukup mengirimkan foto lewat chat WhatsApp atau melampirkan link Google Drive.'
  },
  {
    question: 'Apakah lagunya bisa diganti dengan lagu favorit sendiri?',
    answer: 'Bisa banget! Anda bebas memilih lagu apa saja (lagu romantis, lagu K-pop, lagu indie, lofi, lagu persahabatan, atau voice note rekaman suara Anda sendiri).'
  },
  {
    question: 'Berapa lama masa aktif websitenya?',
    answer: 'Untuk Paket Starter aktif selama 1 tahun penuh. Sedangkan Paket Deluxe dan VIP aktif SELAMANYA tanpa ada biaya perpanjangan tahunan!'
  }
];
