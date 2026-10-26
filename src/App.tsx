import { useEffect, useState } from 'react';

const PHONE_DISPLAY = '(972) 489-7877';
const PHONE_LINK = 'tel:+19724897877';
const ADDRESS_LINE = '1303 E Belt Line Rd';
const CITY_LINE = 'Carrollton, TX 75006';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Oscars%20Salon%201303%20E%20Belt%20Line%20Rd%20Carrollton%20TX%2075006';
const REVIEWS_URL = 'https://www.google.com/search?q=Oscars+Salon+1303+E+Belt+Line+Rd+Carrollton+TX+reviews';

const DAYS = [
  { name: 'Monday', hours: '10:00 am – 6:00 pm', open: true },
  { name: 'Tuesday', hours: 'Closed', open: false },
  { name: 'Wednesday', hours: '10:00 am – 6:00 pm', open: true },
  { name: 'Thursday', hours: '10:00 am – 6:00 pm', open: true },
  { name: 'Friday', hours: '10:00 am – 6:00 pm', open: true },
  { name: 'Saturday', hours: '10:00 am – 6:00 pm', open: true },
  { name: 'Sunday', hours: 'Closed', open: false },
];

type IconName = 'arrow' | 'arrow-right' | 'phone' | 'pin' | 'menu' | 'close' | 'clock' | 'sparkle' | 'down' | 'check';
function Icon({ name, size = 20, className = '' }: { name: IconName; size?: number; className?: string }) {
  const base = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className, 'aria-hidden': true as const };
  switch (name) {
    case 'arrow': return <svg {...base}><path d="M5 19 19 5M7 5h12v12" /></svg>;
    case 'arrow-right': return <svg {...base}><path d="M4 12h16m-7-7 7 7-7 7" /></svg>;
    case 'phone': return <svg {...base}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.11 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.68 2.8a2 2 0 0 1-.45 2.11L8.06 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.68A2 2 0 0 1 22 16.92Z" /></svg>;
    case 'pin': return <svg {...base}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.7" /></svg>;
    case 'menu': return <svg {...base}><path d="M3 7h18M3 12h18M3 17h18" /></svg>;
    case 'close': return <svg {...base}><path d="M5 5 19 19M19 5 5 19" /></svg>;
    case 'clock': return <svg {...base}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case 'sparkle': return <svg {...base}><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" /></svg>;
    case 'down': return <svg {...base}><path d="M12 3v18m-7-7 7 7 7-7" /></svg>;
    case 'check': return <svg {...base}><path d="m5 12 4 4L19 6" /></svg>;
  }
}

function Stars({ small = false, label = 'Star rating' }: { small?: boolean; label?: string }) {
  return <span className={`stars ${small ? 'stars-small' : ''}`} aria-label={label}>★★★★★</span>;
}

function Brand({ light = false, onClick, homeLabel }: { light?: boolean; onClick?: () => void; homeLabel: string }) {
  return (
    <a className={`brand ${light ? 'brand-light' : ''}`} href="#top" onClick={onClick} aria-label={homeLabel}>
      <span className="brand-icon">o<span className="brand-icon-mark">.</span></span>
      <span className="brand-type"><strong>oscars</strong><small>S A L O N</small></span>
    </a>
  );
}

function getBusinessTime() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago', weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date());
  const value = (type: string) => parts.find((part) => part.type === type)?.value || '';
  const weekday = value('weekday');
  const minutes = Number(value('hour')) * 60 + Number(value('minute'));
  const isOpenDay = DAYS.some((day) => day.name === weekday && day.open);
  return { weekday, isOpen: isOpenDay && minutes >= 600 && minutes < 1080 };
}

function useBusinessTime() {
  const [time, setTime] = useState(getBusinessTime);
  useEffect(() => {
    const interval = window.setInterval(() => setTime(getBusinessTime()), 60_000);
    return () => window.clearInterval(interval);
  }, []);
  return time;
}

function HairArt() {
  return (
    <svg className="art-icon art-hair" viewBox="0 0 360 300" fill="none" aria-hidden="true">
      <circle cx="190" cy="153" r="115" stroke="currentColor" opacity=".23" strokeWidth="1" />
      <path d="M108 242c50-27 64-60 57-105-7-42 13-79 55-84 43-5 65 27 63 63-3 57-58 73-70 118" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M128 251c41-30 58-61 55-111-2-32 14-62 40-65 33-4 48 20 42 50-6 35-49 64-43 110" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M154 253c35-31 47-76 48-113 1-23 6-40 20-43 15-3 25 9 22 25-6 25-37 58-29 118" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".7" />
      <path d="M88 202c27-15 47-38 53-70" stroke="currentColor" strokeWidth="1.1" />
      <path d="M254 44c13 9 22 17 32 34M84 133c-8 24-8 47-2 66" stroke="currentColor" strokeWidth="1" opacity=".6" />
      <circle cx="279" cy="56" r="3.6" fill="currentColor" />
    </svg>
  );
}

function NailArt() {
  return (
    <svg className="art-icon art-nail" viewBox="0 0 360 300" fill="none" aria-hidden="true">
      <circle cx="178" cy="152" r="118" stroke="currentColor" opacity=".18" strokeWidth="1" />
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M92 239c33-21 60-37 84-66l48-62c8-10 22-6 22 5 0 4-2 8-6 12l-34 44 55-61c8-10 23-4 21 7 0 4-2 7-5 11l-50 62 44-47c10-10 24-2 20 9-1 4-4 8-9 12l-47 50 30-23c11-8 24 3 17 13-6 9-26 24-43 35-40 27-88 39-138 42" strokeWidth="2.2" />
        <path d="m223 111 16 13m27-13 12 12m0 31-12-10" strokeWidth="1.1" opacity=".7" />
        <path d="M105 220c27-8 48-21 64-42" strokeWidth="1.1" opacity=".7" />
      </g>
      <path d="m95 70 5.8 17.2L118 93l-17.2 5.8L95 116l-5.8-17.2L72 93l17.2-5.8L95 70Z" fill="currentColor" opacity=".8" />
      <circle cx="283" cy="70" r="4" fill="currentColor" />
    </svg>
  );
}

function GroomArt() {
  return (
    <svg className="art-icon art-groom" viewBox="0 0 360 300" fill="none" aria-hidden="true">
      <circle cx="180" cy="154" r="118" stroke="currentColor" opacity=".22" strokeWidth="1" />
      <circle cx="180" cy="153" r="94" stroke="currentColor" opacity=".3" strokeWidth="1" />
      <path d="m180 61 15 72 72 20-72 20-15 72-15-72-72-20 72-20 15-72Z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
      <path d="m180 115 8 30 29 8-29 8-8 30-8-30-29-8 29-8 8-30Z" fill="currentColor" opacity=".62" />
      <path d="M101 51v28m-14-14h28M278 224v28m-14-14h28M276 70v15m-7.5-7.5h15M82 227v15m-7.5-7.5h15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="180" cy="153" r="4" fill="currentColor" />
    </svg>
  );
}

type Language = 'en' | 'vi';

// Actual localized routes: English is /, Vietnamese is /vi/.
// This data powers two independently addressable, fully translated pages.
const CONTENT = {
  en: {
    accessibility: {
      skip: 'Skip to content', mainNav: 'Main navigation', mobileNav: 'Mobile navigation',
      openNav: 'Open navigation', closeNav: 'Close navigation', selectLang: 'Select website language',
      logo: 'Oscars Salon, back to top', call: 'Call Oscars Salon', map: 'Open directions in Google Maps',
      scroll: 'Scroll to our story', stars: 'Star rating',
    },
    nav: { story: 'Our story', services: 'Services', hours: 'Opening hours', visit: 'Find us', call: 'CALL TO BOOK' },
    topline: 'THE NEIGHBORHOOD BEAUTY EDIT · CARROLLTON, TX',
    hero: {
      kicker: 'A FRESH TAKE ON YOUR NEIGHBORHOOD SALON', first: 'Beauty feels', emph: 'better', last: ' here',
      description: 'A little time for yourself goes a long way. Discover everyday hair, nails, and feel-good beauty at Oscars Salon in Carrollton.',
      call: 'Call to book', services: 'Explore services', find: 'COME FIND US',
      reviews: 'from 78 Google reviews', closing: 'YOUR NEXT GOOD HAIR DAY STARTS HERE',
    },
    intro: {
      eyebrow: 'THE OSCARS FEELING', heading: 'Your kind of', emph: 'beautiful.',
      lead: 'Great style doesn’t have to be complicated.',
      p1: 'Whether you’re here for a fresh haircut, nail care, or a little everyday maintenance, Oscars Salon is your local spot to look and feel more like yourself.',
      p2: 'Easy to find on E Belt Line Road, with budget-friendly haircuts and grooming that fit real life.',
      signature1: 'Come as you are.', signature2: 'Leave with a little extra glow.',
      highlights: [
        ['LOCAL & LOVELY', 'Carrollton, Texas'],
        ['BEAUTY FOR EVERY DAY', 'Hair, nails & grooming'],
        ['COME ON IN', 'Call for availability'],
      ],
    },
    services: {
      eyebrow: 'WHAT WE DO', titleFirst: 'The little things', titleSecond: 'make a', titleEm: 'big difference.',
      lead: 'From a quick refresh to a moment just for you, explore the beauty essentials at Oscars Salon.',
      artwork: 'THE ART OF FEELING GOOD',
      items: [
        { eyebrow: 'FRESH STARTS', title: 'Haircuts & styling', text: 'A little trim or a whole new look. Ask about hair services designed for your everyday style.' },
        { eyebrow: 'THE LITTLE DETAILS', title: 'Nails & spa', text: 'Your moment to slow down and feel polished. Call to ask about available nail and spa services.' },
        { eyebrow: 'FEEL YOUR BEST', title: 'Beauty & grooming', text: 'Simple, feel-good grooming and beauty care to help you step into the day with confidence.' },
      ],
      askAbout: 'Call to ask about',
      note: 'Please call for current services, pricing, and appointment availability.',
    },
    showcase: {
      label: 'A LITTLE LOCAL MAGIC', first: 'Right around', second: 'the corner.', emph: 'Right for you.',
      text: 'We’re right here in Carrollton — your neighborhood destination for a fresh look and a little personal time.',
      link: 'Come visit us', imageAlt: 'Stylized still illustration of the Oscars Salon storefront illuminated at night',
      caption: '01 / OUR NEIGHBORHOOD', badgeLine: 'Find your', badgeEm: 'glow.',
      regionLabel: 'Our salon storefront',
    },
    hours: {
      eyebrow: 'MAKE TIME FOR YOU', first: 'A little beauty', emph: 'break?',
      lead: 'Drop by when the moment is right. Check our weekly hours, then call if you’d like to ask about a service or plan your visit.',
      call: 'Give us a call', accent: 'time for', accentEm: 'you.', top: 'STUDIO HOURS',
      title: 'Opening hours', nowOpen: 'Open now', nowClosed: 'Closed now', today: 'Today', closed: 'Closed',
      clock: '10:00 am – 6:00 pm',
      weekdays: {
        Monday: 'Monday', Tuesday: 'Tuesday', Wednesday: 'Wednesday', Thursday: 'Thursday',
        Friday: 'Friday', Saturday: 'Saturday', Sunday: 'Sunday',
      },
    },
    visit: {
      eyebrow: 'FIND YOUR WAY TO US', first: 'See you', emph: 'soon.',
      lead: 'Good things are closer than you think. You’ll find us along E Belt Line Road in Carrollton.',
      address: 'OUR ADDRESS', ring: 'GIVE US A RING', directions: 'Get directions', call: 'Call the salon',
      county: 'DALLAS COUNTY',
    },
    footer: {
      kicker: 'ONE MORE THING BEFORE YOU GO', first: 'Make room for', emph: 'beautiful.',
      tagline: 'A fresh look. A little self-care. A neighborhood salon to call your own.',
      explore: 'EXPLORE', greeting: 'COME SAY HELLO', planning: 'PLAN YOUR VISIT',
      days: 'Monday & Wednesday–Saturday', clock: '10:00 am – 6:00 pm', closed: 'Closed Tuesday & Sunday',
      google: 'See us on Google', rights: 'All rights reserved.', made: 'MADE WITH CARE IN CARROLLTON, TEXAS', top: 'BACK TO TOP',
    },
  },
  vi: {
    accessibility: {
      skip: 'Bỏ qua menu đến nội dung', mainNav: 'Điều hướng chính', mobileNav: 'Menu trên điện thoại',
      openNav: 'Mở menu', closeNav: 'Đóng menu', selectLang: 'Chọn ngôn ngữ trang web',
      logo: 'Oscars Salon, trở về đầu trang', call: 'Gọi cho Oscars Salon', map: 'Mở chỉ đường trong Google Maps',
      scroll: 'Xem giới thiệu về tiệm', stars: 'Đánh giá sao',
    },
    nav: { story: 'Về chúng tôi', services: 'Dịch vụ', hours: 'Giờ mở cửa', visit: 'Địa chỉ', call: 'GỌI ĐẶT LỊCH' },
    topline: 'GÓC LÀM ĐẸP THÂN QUEN · CARROLLTON, TX',
    hero: {
      kicker: 'TIỆM LÀM ĐẸP THÂN QUEN NGAY GẦN BẠN', first: 'Rạng rỡ', emph: 'mỗi ngày', last: '',
      description: 'Dành một chút thời gian cho bản thân để thêm tự tin. Khám phá các dịch vụ tóc, móng và chăm sóc sắc đẹp tại Oscars Salon ở Carrollton.',
      call: 'Gọi đặt lịch', services: 'Khám phá dịch vụ', find: 'GHÉ THĂM CHÚNG TÔI',
      reviews: 'từ 78 đánh giá trên Google', closing: 'MỘT DIỆN MẠO TƯƠI MỚI ĐANG CHỜ BẠN',
    },
    intro: {
      eyebrow: 'TRẢI NGHIỆM TẠI OSCARS', heading: 'Vẻ đẹp', emph: 'theo cách của bạn.',
      lead: 'Làm đẹp không nhất thiết phải cầu kỳ.',
      p1: 'Dù bạn muốn cắt tóc, chăm sóc móng hay chỉ đơn giản là làm mới diện mạo, Oscars Salon luôn chào đón bạn đến thư giãn và tự tin hơn.',
      p2: 'Tọa lạc thuận tiện trên đường E Belt Line, tiệm mang đến các lựa chọn cắt tóc và chăm sóc cá nhân với mức giá phải chăng.',
      signature1: 'Cứ thoải mái là chính mình.', signature2: 'Ra về với nụ cười rạng rỡ.',
      highlights: [
        ['THÂN THIỆN & GẦN GŨI', 'Carrollton, Texas'],
        ['LÀM ĐẸP MỖI NGÀY', 'Tóc, móng & chăm sóc cá nhân'],
        ['RẤT HÂN HẠNH ĐÓN TIẾP', 'Gọi để hỏi lịch trống'],
      ],
    },
    services: {
      eyebrow: 'DỊCH VỤ CỦA CHÚNG TÔI', titleFirst: 'Chút chăm sóc', titleSecond: 'mang đến', titleEm: 'khác biệt lớn.',
      lead: 'Từ một lần làm mới diện mạo đến những phút giây thư giãn, hãy khám phá các dịch vụ làm đẹp tại Oscars Salon.',
      artwork: 'NGHỆ THUẬT CHĂM SÓC BẢN THÂN',
      items: [
        { eyebrow: 'KHỞI ĐẦU TƯƠI MỚI', title: 'Cắt & tạo kiểu tóc', text: 'Cắt tỉa gọn gàng hay đổi mới phong cách. Vui lòng gọi để hỏi về các dịch vụ tóc phù hợp với bạn.' },
        { eyebrow: 'CHĂM CHÚT TỪNG CHI TIẾT', title: 'Móng & spa', text: 'Dành thời gian thư giãn và chăm sóc bản thân. Hãy gọi tiệm để hỏi về các dịch vụ móng và spa hiện có.' },
        { eyebrow: 'TỰ TIN THEO CÁCH RIÊNG', title: 'Làm đẹp & chăm sóc', text: 'Những dịch vụ làm đẹp và chăm sóc cá nhân giúp bạn cảm thấy thoải mái, tự tin hơn mỗi ngày.' },
      ],
      askAbout: 'Gọi để hỏi về',
      note: 'Vui lòng gọi để xác nhận dịch vụ, giá cả và lịch hẹn hiện có.',
    },
    showcase: {
      label: 'MỘT CHÚT NÉT DUYÊN ĐỊA PHƯƠNG', first: 'Ngay trong', second: 'khu phố bạn.', emph: 'Luôn chào đón.',
      text: 'Chúng tôi ở ngay Carrollton — điểm hẹn gần nhà để bạn làm mới diện mạo và dành chút thời gian cho bản thân.',
      link: 'Đến thăm tiệm', imageAlt: 'Hình minh họa tĩnh mặt tiền Oscars Salon với bảng hiệu được chiếu sáng vào ban đêm',
      caption: '01 / KHU PHỐ CỦA CHÚNG TA', badgeLine: 'Thêm phần', badgeEm: 'rạng rỡ.',
      regionLabel: 'Mặt tiền tiệm làm đẹp',
    },
    hours: {
      eyebrow: 'DÀNH THỜI GIAN CHO BẢN THÂN', first: 'Một chút thời gian', emph: 'làm đẹp?',
      lead: 'Ghé tiệm khi thuận tiện. Xem giờ làm việc hằng tuần và gọi trước nếu bạn muốn hỏi dịch vụ hoặc sắp xếp lịch hẹn.',
      call: 'Gọi cho tiệm', accent: 'thời gian cho', accentEm: 'bạn.', top: 'GIỜ HOẠT ĐỘNG',
      title: 'Giờ mở cửa', nowOpen: 'Đang mở cửa', nowClosed: 'Đang đóng cửa', today: 'Hôm nay', closed: 'Đóng cửa',
      clock: '10:00 – 18:00',
      weekdays: {
        Monday: 'Thứ Hai', Tuesday: 'Thứ Ba', Wednesday: 'Thứ Tư', Thursday: 'Thứ Năm',
        Friday: 'Thứ Sáu', Saturday: 'Thứ Bảy', Sunday: 'Chủ Nhật',
      },
    },
    visit: {
      eyebrow: 'TÌM ĐƯỜNG ĐẾN TIỆM', first: 'Hẹn gặp', emph: 'bạn nhé.',
      lead: 'Một địa điểm thuận tiện ngay tại Carrollton. Hãy ghé Oscars Salon trên đường E Belt Line.',
      address: 'ĐỊA CHỈ', ring: 'SỐ ĐIỆN THOẠI', directions: 'Chỉ đường', call: 'Gọi cho tiệm',
      county: 'HẠT DALLAS',
    },
    footer: {
      kicker: 'THÊM MỘT ĐIỀU TRƯỚC KHI BẠN ĐI', first: 'Dành thời gian', emph: 'tỏa sáng.',
      tagline: 'Một diện mạo mới. Một chút chăm sóc bản thân. Một tiệm làm đẹp thân quen ngay gần nhà.',
      explore: 'KHÁM PHÁ', greeting: 'GHÉ THĂM CHÚNG TÔI', planning: 'LÊN KẾ HOẠCH GHÉ TIỆM',
      days: 'Thứ Hai & Thứ Tư–Thứ Bảy', clock: '10:00 – 18:00', closed: 'Đóng cửa Thứ Ba & Chủ Nhật',
      google: 'Xem tiệm trên Google', rights: 'Bảo lưu mọi quyền.', made: 'THỰC HIỆN VỚI SỰ TẬN TÂM TẠI CARROLLTON, TEXAS', top: 'VỀ ĐẦU TRANG',
    },
  },
} as const;

function currentLanguage(): Language {
  return typeof window !== 'undefined' && /^\/vi(?:\/|$)/.test(window.location.pathname) ? 'vi' : 'en';
}

type Copy = (typeof CONTENT)[Language];

function LanguageSwitch({ language, t }: { language: Language; t: Copy }) {
  return (
    <nav className="language-switch" aria-label={t.accessibility.selectLang}>
      <a href="/" lang="en" hrefLang="en" className={language === 'en' ? 'language-active' : ''} aria-current={language === 'en' ? 'page' : undefined} title="English">EN</a>
      <span aria-hidden="true" className="language-divider" />
      <a href="/vi/" lang="vi" hrefLang="vi" className={language === 'vi' ? 'language-active' : ''} aria-current={language === 'vi' ? 'page' : undefined} title="Tiếng Việt">VI</a>
    </nav>
  );
}

function Header({ language, t }: { language: Language; t: Copy }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') closeMenu(); };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('menu-open');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  const menuLinks = [
    { id: 'experience', text: t.nav.story }, { id: 'services', text: t.nav.services },
    { id: 'hours', text: t.nav.hours }, { id: 'visit', text: t.nav.visit },
  ];

  return <>
    <div className="topline">
      <div className="container topline-inner">
        <span className="topline-left"><span className="topline-diamond">✦</span> {t.topline}</span>
        <a href={PHONE_LINK}><Icon name="phone" size={12} /> {PHONE_DISPLAY}<span className="topline-link-end"> ↗</span></a>
      </div>
    </div>
    <header className="site-header">
      <div className="container header-inner">
        <Brand onClick={closeMenu} homeLabel={t.accessibility.logo} />
        <nav className="desktop-nav" aria-label={t.accessibility.mainNav}>
          {menuLinks.map(({ id, text }) => <a href={'#' + id} key={id}>{text}</a>)}
        </nav>
        <div className="header-actions">
          <LanguageSwitch language={language} t={t} />
          <a className="header-cta" href={PHONE_LINK}>{t.nav.call} <Icon name="arrow" size={16} /></a>
          <button type="button" className="mobile-toggle" data-open-label={t.accessibility.openNav} data-close-label={t.accessibility.closeNav} aria-label={menuOpen ? t.accessibility.closeNav : t.accessibility.openNav} aria-controls="mobile-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
            <Icon name={menuOpen ? 'close' : 'menu'} size={27} />
          </button>
        </div>
      </div>
      {menuOpen && <button className="menu-backdrop" type="button" tabIndex={-1} aria-label={t.accessibility.closeNav} onClick={closeMenu} />}
      <nav id="mobile-nav" className={`mobile-nav ${menuOpen ? 'mobile-nav-open' : ''}`} aria-label={t.accessibility.mobileNav} aria-hidden={!menuOpen}>
        {menuLinks.map(({ id, text }, index) => <a href={'#' + id} key={id} onClick={closeMenu}><span>0{index + 1}</span> {text} <Icon name="arrow" /></a>)}
        <a className="mobile-nav-call" href={PHONE_LINK} onClick={closeMenu}><Icon name="phone" /> {t.hero.call} · {PHONE_DISPLAY}</a>
      </nav>
    </header>
  </>;
}

function Hero({ t }: { t: Copy }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-media">
        <img src="/oscars-storefront.webp" alt="" aria-hidden="true" fetchPriority="high" decoding="async" />
      </div>
      <div className="hero-shade" />
      <div className="hero-grain" />
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-kicker"><span className="line" /> {t.hero.kicker}</div>
          <h1 id="hero-title">{t.hero.first}<br /><em>{t.hero.emph}</em>{t.hero.last}<span className="hero-period">.</span></h1>
          <p className="hero-description">{t.hero.description}</p>
          <div className="hero-actions">
            <a className="btn btn-cream" href={PHONE_LINK}><span>{t.hero.call}</span><Icon name="arrow" size={18} /></a>
            <a className="text-link text-link-light" href="#services">{t.hero.services} <Icon name="arrow-right" size={17} /></a>
          </div>
        </div>
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hero-address-card" aria-label={t.accessibility.map}>
          <div className="hero-card-pin"><Icon name="pin" size={19} /></div>
          <div><span>{t.hero.find}</span><strong>{ADDRESS_LINE}</strong><small>{CITY_LINE}</small></div>
          <Icon name="arrow" size={19} className="hero-card-arrow" />
        </a>
      </div>
      <div className="hero-bottom-bar">
        <div className="container hero-bottom-inner">
          <a className="hero-review" href={REVIEWS_URL} target="_blank" rel="noopener noreferrer"><Stars label={t.accessibility.stars} /> <strong>4.3</strong> <span>{t.hero.reviews}</span> <Icon name="arrow" size={13} /></a>
          <span className="hero-bottom-right">{t.hero.closing} <span className="hero-bottom-star">✳</span></span>
          <a href="#experience" className="hero-scroll" aria-label={t.accessibility.scroll}><Icon name="down" size={17} /></a>
        </div>
      </div>
    </section>
  );
}

function Intro({ t }: { t: Copy }) {
  return (
    <section className="intro-section section-pad" id="experience">
      <div className="container intro-grid">
        <div className="intro-left reveal">
          <p className="eyebrow"><span className="eyebrow-index">01 /</span> {t.intro.eyebrow}</p>
          <h2 className="display-title">{t.intro.heading} <em>{t.intro.emph}</em></h2>
          <div className="intro-flourish" aria-hidden="true"><Icon name="sparkle" size={28} /><span /></div>
        </div>
        <div className="intro-right reveal">
          <p className="intro-lead">{t.intro.lead}</p>
          <p>{t.intro.p1}</p>
          <p>{t.intro.p2}</p>
          <div className="intro-signature"><span className="signature-mark">o.</span><span>{t.intro.signature1}<br /><strong>{t.intro.signature2}</strong></span></div>
        </div>
      </div>
      <div className="container intro-meta reveal">
        {t.intro.highlights.map(([title, subtitle], i) => <div key={title}><span>0{i + 1}</span><strong>{title}</strong><small>{subtitle}</small></div>)}
      </div>
    </section>
  );
}

function Services({ t }: { t: Copy }) {
  const art = [HairArt, NailArt, GroomArt] as const;
  return (
    <section className="services-section section-pad" id="services">
      <div className="container">
        <div className="services-head reveal">
          <div>
            <p className="eyebrow"><span className="eyebrow-index">02 /</span> {t.services.eyebrow}</p>
            <h2 className="display-title">{t.services.titleFirst}<br />{t.services.titleSecond} <em>{t.services.titleEm}</em></h2>
          </div>
          <p>{t.services.lead}</p>
        </div>
        <div className="service-grid">
          {t.services.items.map(({ eyebrow, title, text }, index) => {
            const Art = art[index] ?? GroomArt;
            const style = ['hair', 'nail', 'groom'][index];
            return <article key={style} className="service-card reveal">
              <div className={`service-visual service-visual-${style}`}>
                <span className="service-visual-top">OS. <span>0{index + 1} — 03</span></span>
                <Art />
                <span className="service-visual-bottom">{t.services.artwork}</span>
              </div>
              <div className="service-details">
                <span className="service-eyebrow">{eyebrow}</span>
                <div className="service-title-line"><h3>{title}</h3><a href={PHONE_LINK} className="service-arrow" aria-label={`${t.services.askAbout} ${title}`}><Icon name="arrow" size={19} /></a></div>
                <p>{text}</p>
              </div>
            </article>;
          })}
        </div>
        <p className="services-footnote"><Icon name="sparkle" size={14} /> {t.services.note}</p>
      </div>
    </section>
  );
}

function Showcase({ t }: { t: Copy }) {
  return <section className="showcase-section" aria-label={t.showcase.regionLabel}>
    <div className="container showcase-grid">
      <div className="showcase-copy reveal">
        <p className="eyebrow eyebrow-light"><span className="eyebrow-index">{t.showcase.label}</span></p>
        <h2>{t.showcase.first}<br />{t.showcase.second}<br /><em>{t.showcase.emph}</em></h2>
        <p>{t.showcase.text}</p>
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-link text-link-light">{t.showcase.link} <Icon name="arrow" size={18} /></a>
      </div>
      <div className="showcase-photo-wrap reveal">
        <div className="showcase-photo"><img src="/oscars-storefront-full.png" loading="lazy" alt={t.showcase.imageAlt} /></div>
        <div className="showcase-photo-caption"><span>{t.showcase.caption}</span><span>CARROLLTON, TX</span></div>
        <div className="showcase-photo-badge"><span>{t.showcase.badgeLine}</span><em>{t.showcase.badgeEm}</em><Icon name="sparkle" size={20} /></div>
      </div>
    </div>
  </section>;
}

function Hours({ t }: { t: Copy }) {
  const { weekday, isOpen } = useBusinessTime();
  return (
    <section className="hours-section section-pad" id="hours">
      <div className="container hours-grid">
        <div className="hours-copy reveal">
          <p className="eyebrow"><span className="eyebrow-index">03 /</span> {t.hours.eyebrow}</p>
          <h2 className="display-title">{t.hours.first}<br /><em>{t.hours.emph}</em></h2>
          <p>{t.hours.lead}</p>
          <a href={PHONE_LINK} className="btn btn-dark"><span>{t.hours.call}</span><Icon name="arrow" size={18} /></a>
          <div className="hours-accent" aria-hidden="true"><span>{t.hours.accent}</span><em>{t.hours.accentEm}</em></div>
        </div>
        <div className="hours-card reveal">
          <div className="hours-card-top"><span>{t.hours.top}</span><Icon name="clock" size={23} /></div>
          <div className="hours-card-head"><div><span className="hours-subtitle">OSCARS SALON</span><h3>{t.hours.title}<span>.</span></h3></div><span className={`status-pill ${isOpen ? 'status-open' : 'status-closed'}`}><i />{isOpen ? t.hours.nowOpen : t.hours.nowClosed}</span></div>
          <div className="hours-list">
            {DAYS.map(({ name, open }) => <div data-weekday={name} className={`hours-row ${weekday === name ? 'hours-row-today' : ''} ${!open ? 'hours-row-closed' : ''}`} key={name}>
              <span>{t.hours.weekdays[name as keyof typeof t.hours.weekdays]}{weekday === name && <small>{t.hours.today}</small>}</span><span>{open ? t.hours.clock : t.hours.closed}</span>
            </div>)}
          </div>
          <div className="hours-card-bottom"><Icon name="pin" size={17} /> <span>{ADDRESS_LINE} · Carrollton, TX</span></div>
        </div>
      </div>
    </section>
  );
}

function Visit({ t }: { t: Copy }) {
  return (
    <section className="visit-section" id="visit">
      <div className="container visit-grid">
        <div className="visit-map-art reveal">
          <div className="map-art-grid" aria-hidden="true" />
          <div className="map-art-route map-art-route-a" aria-hidden="true" />
          <div className="map-art-route map-art-route-b" aria-hidden="true" />
          <div className="map-art-route map-art-route-c" aria-hidden="true" />
          <span className="map-art-corner map-art-top">33° N <span>CARROLLTON</span></span>
          <span className="map-art-road map-art-road-one">E BELT LINE RD</span>
          <span className="map-art-road map-art-road-two">TEXAS</span>
          <div className="map-art-pin"><span>o.</span></div>
          <span className="map-art-corner map-art-bottom">{t.visit.county} <span>TX, USA</span></span>
          <a href={MAPS_URL} className="map-art-action" target="_blank" rel="noopener noreferrer" aria-label={t.accessibility.map}><Icon name="arrow" size={22} /></a>
        </div>
        <div className="visit-copy reveal">
          <p className="eyebrow"><span className="eyebrow-index">04 /</span> {t.visit.eyebrow}</p>
          <h2 className="display-title">{t.visit.first} <em>{t.visit.emph}</em></h2>
          <p>{t.visit.lead}</p>
          <div className="visit-detail"><span>{t.visit.address}</span><strong>{ADDRESS_LINE}<br />{CITY_LINE}</strong></div>
          <div className="visit-detail"><span>{t.visit.ring}</span><a href={PHONE_LINK}>{PHONE_DISPLAY}</a></div>
          <div className="visit-buttons">
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-dark"><span>{t.visit.directions}</span><Icon name="arrow" size={18} /></a>
            <a href={PHONE_LINK} className="text-link">{t.visit.call} <Icon name="arrow-right" size={17} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }: { t: Copy }) {
  return <footer className="footer">
    <div className="container footer-main">
      <div className="footer-topline"><span>{t.footer.kicker}</span><Icon name="sparkle" size={24} /></div>
      <div className="footer-cta-row">
        <h2>{t.footer.first} <em>{t.footer.emph}</em></h2>
        <a href={PHONE_LINK} className="footer-round-link" aria-label={t.accessibility.call}><Icon name="arrow" size={36} /></a>
      </div>
      <div className="footer-rule" />
      <div className="footer-columns">
        <div className="footer-about"><Brand light homeLabel={t.accessibility.logo} /><p>{t.footer.tagline}</p></div>
        <div className="footer-links"><h3>{t.footer.explore}</h3><a href="#experience">{t.nav.story}</a><a href="#services">{t.nav.services}</a><a href="#hours">{t.nav.hours}</a><a href="#visit">{t.nav.visit}</a></div>
        <div className="footer-location"><h3>{t.footer.greeting}</h3><a href={MAPS_URL} target="_blank" rel="noopener noreferrer">{ADDRESS_LINE}<br />{CITY_LINE}</a><a href={PHONE_LINK} className="footer-tel">{PHONE_DISPLAY}</a></div>
        <div className="footer-social"><h3>{t.footer.planning}</h3><p>{t.footer.days}<br />{t.footer.clock}<br />{t.footer.closed}</p><a href={REVIEWS_URL} target="_blank" rel="noopener noreferrer">{t.footer.google} <Icon name="arrow" size={15} /></a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Oscars Salon. {t.footer.rights}</span><span>{t.footer.made} <span className="footer-twinkle">✳</span></span><a href="#top">{t.footer.top} ↑</a></div>
    </div>
  </footer>;
}

export default function App() {
  const language = currentLanguage();
  const t = CONTENT[language];
  useEffect(() => {
    document.documentElement.lang = language;
    const nodes = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((element) => element.classList.add('in-view'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) { target.classList.add('in-view'); observer.unobserve(target); }
      });
    }, { threshold: .09, rootMargin: '0px 0px -30px 0px' });
    nodes.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [language]);

  return <>
    <a href="#main" className="skip-link">{t.accessibility.skip}</a>
    <Header language={language} t={t} />
    <main id="main"><Hero t={t} /><Intro t={t} /><Services t={t} /><Showcase t={t} /><Hours t={t} /><Visit t={t} /></main>
    <Footer t={t} />
    <a href={PHONE_LINK} className="floating-call" aria-label={t.accessibility.call}><Icon name="phone" size={19} /><span>{t.hero.call}</span></a>
  </>;
}
