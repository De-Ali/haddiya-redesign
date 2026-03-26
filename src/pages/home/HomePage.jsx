import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  SearchNormal1, Notification, Global, ArrowRight2, ArrowLeft2,
  Setting4, Man, Woman, People, Lovely, HambergerMenu,
} from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { useDrawer } from '../../context/DrawerContext';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import { vendors } from '../../data/vendors';
import CategoryChip from '../../components/ui/CategoryChip';
import ProductCard from '../../components/ui/ProductCard';
import VendorCard from '../../components/ui/VendorCard';

/* ── Hero slides data ──────────────────────────────────────────────────────── */
const heroSlides = [
  {
    id: 1,
    tag: "EXCLUSIVE", tagAr: "حصري",
    title: "Mother's Day", titleAr: "يوم الأم",
    subtitle: "A Gift for the Most Precious One", subtitleAr: "هدية لأغلى إنسانة",
    gradient: "linear-gradient(135deg, #7A1E2B, #C4734A)",
    emoji: "💐",
  },
  {
    id: 2,
    tag: "NEW ARRIVALS", tagAr: "وصل حديثاً",
    title: "Eid Special", titleAr: "عروض العيد",
    subtitle: "Up to 40% off luxury gifts", subtitleAr: "خصم يصل إلى 40% على الهدايا الفاخرة",
    gradient: "linear-gradient(135deg, #7A1E2B, #D4AF37)",
    emoji: "🌙",
  },
  {
    id: 3,
    tag: "FREE DELIVERY", tagAr: "توصيل مجاني",
    title: "Gift with Love", titleAr: "هدية بكل محبة",
    subtitle: "Gift-wrapped and delivered across Oman", subtitleAr: "مُغلَّفة وتُوصَّل في جميع أنحاء عُمان",
    gradient: "linear-gradient(135deg, #2D6A4F, #7A1E2B)",
    emoji: "🎁",
  },
];

/* ── Gift for everyone tabs ────────────────────────────────────────────────── */
const giftForTabs = [
  { key: 'men', label: 'For Him', labelAr: 'له', Icon: Man, color: '#2E4057' },
  { key: 'women', label: 'For Her', labelAr: 'لها', Icon: Woman, color: '#8A2232' },
  { key: 'friends', label: 'Friends', labelAr: 'أصدقاء', Icon: People, color: '#5A3E1B' },
  { key: 'kids', label: 'Children', labelAr: 'أطفال', Icon: Lovely, color: '#D4AF37' },
];

/* ── Gift ideas ────────────────────────────────────────────────────────────── */
const giftIdeas = [
  { emoji: '🎁', label: 'Birthday', labelAr: 'عيد ميلاد', bg: '#FFF0F0' },
  { emoji: '💍', label: 'Wedding', labelAr: 'زفاف', bg: '#F0F0FF' },
  { emoji: '🏡', label: 'Housewarming', labelAr: 'منزل جديد', bg: '#F0FFF0' },
  { emoji: '🎓', label: 'Graduation', labelAr: 'تخرج', bg: '#FFFFF0' },
  { emoji: '👶', label: 'Baby Shower', labelAr: 'مولود', bg: '#FFF5F0' },
  { emoji: '💝', label: 'Anniversary', labelAr: 'ذكرى', bg: '#FFF0F8' },
];

/* ── Section Header ────────────────────────────────────────────────────────── */
function SectionHeader({ title, subtitle, onViewAll, isRTL }) {
  const Arrow = isRTL ? ArrowLeft2 : ArrowRight2;
  return (
    <div className="flex items-end justify-between mb-4 px-5">
      <div>
        <h2 className="font-display text-[20px] font-semibold text-dark leading-tight tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[11px] mt-1 font-medium" style={{ color: '#AEAEB2' }}>{subtitle}</p>
        )}
      </div>
      {onViewAll && (
        <button
          onClick={onViewAll}
          className="flex items-center gap-0.5 text-[12px] font-semibold active:scale-95 pb-0.5"
          style={{ color: '#7A1E2B' }}
        >
          <span>View All</span>
          <Arrow size={14} variant="Outline" color="#7A1E2B" />
        </button>
      )}
    </div>
  );
}

function Divider() {
  return <div className="mx-5 my-3 gold-divider" />;
}

/* ═══════════════════════════════════════════════════════════════════════════ */

export default function HomePage() {
  const navigate = useNavigate();
  const { t, lang, toggleLanguage, isRTL } = useLanguage();
  const { openDrawer } = useDrawer();

  /* Hero carousel state */
  const [activeSlide, setActiveSlide] = useState(0);

  /* Other page state */
  const [activeGiftTab, setActiveGiftTab] = useState('men');

  const newProducts = products.filter((p) => p.isNew);
  const featuredProducts = products.filter((p) => p.isFeatured);

  /* Auto-play carousel */
  useEffect(() => {
    const timer = setInterval(
      () => setActiveSlide(prev => (prev + 1) % heroSlides.length),
      3500,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-mesh min-h-full pb-6">

      {/* ══ Header ═══════════════════════════════════════════════════════════ */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Hamburger menu */}
          <button
            onClick={openDrawer}
            className="w-10 h-10 rounded-full bg-white border flex items-center justify-center active:scale-90 transition-transform shadow-soft"
            style={{ borderColor: 'rgba(0,0,0,0.06)' }}
          >
            <HambergerMenu size={20} variant="Outline" color="#1C1C1E" />
          </button>
          {/* Logo */}
          <img src="/haddiya-logo.png" alt="Haddiya" className="w-[42px] h-[42px] object-contain" />
          <div>
            <h1 className="font-display text-[20px] font-semibold text-dark tracking-tight leading-none">Haddiya</h1>
            <p className="text-[8px] text-accent font-bold tracking-[0.22em] uppercase mt-[2px]">
              {lang === 'ar' ? 'هدايا فاخرة' : 'PREMIUM GIFTS'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="w-10 h-10 rounded-full bg-white border flex items-center justify-center active:scale-90 transition-transform shadow-soft"
            style={{ borderColor: 'rgba(0,0,0,0.06)' }}
          >
            <Global size={18} variant="Outline" color="#6B7280" />
          </button>
          <button
            onClick={() => navigate('/notifications')}
            className="w-10 h-10 rounded-full bg-white border flex items-center justify-center relative active:scale-90 transition-transform shadow-soft"
            style={{ borderColor: 'rgba(0,0,0,0.06)' }}
          >
            <Notification size={18} variant="Outline" color="#6B7280" />
            <span
              className="absolute top-1 end-1 w-[9px] h-[9px] bg-accent rounded-full"
              style={{ border: '2px solid white' }}
            />
          </button>
        </div>
      </div>

      {/* ══ Search ════════════════════════════════════════════════════════════ */}
      <div className="px-5 mb-5">
        <button
          onClick={() => navigate('/search')}
          className="w-full flex items-center gap-3 px-4 py-[14px] rounded-2xl bg-white border shadow-soft active:scale-[0.99] transition-transform"
          style={{ borderColor: 'rgba(0,0,0,0.05)' }}
        >
          <SearchNormal1 size={18} variant="Outline" color="#AEAEB2" />
          <span
            className="text-[14px] font-medium flex-1 text-start"
            style={{ color: '#AEAEB2' }}
          >
            {t.home.search}
          </span>
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(212,175,55,0.10)' }}
          >
            <Setting4 size={15} variant="Outline" color="#D4AF37" />
          </div>
        </button>
      </div>

      {/* ══ Hero Carousel ════════════════════════════════════════════════════ */}
      <div className="px-5 mb-6">
        {/* Track */}
        <div
          style={{
            overflow: 'hidden',
            borderRadius: 16,
            height: 200,
            position: 'relative',
          }}
        >
          {/* Slides wrapper */}
          <div
            style={{
              display: 'flex',
              width: `${heroSlides.length * 100}%`,
              height: '100%',
              transform: `translateX(-${(activeSlide * 100) / heroSlides.length}%)`,
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {heroSlides.map((slide) => {
              const slideTag = lang === 'ar' ? slide.tagAr : slide.tag;
              const slideTitle = lang === 'ar' ? slide.titleAr : slide.title;
              const slideSubtitle = lang === 'ar' ? slide.subtitleAr : slide.subtitle;
              return (
                <div
                  key={slide.id}
                  style={{
                    width: `${100 / heroSlides.length}%`,
                    height: 200,
                    background: slide.gradient,
                    padding: 20,
                    position: 'relative',
                    overflow: 'hidden',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                  }}
                >
                  {/* Decorative circles */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-20%',
                      right: '-10%',
                      width: '55%',
                      height: '75%',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.07)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-25%',
                      left: '35%',
                      width: '45%',
                      height: '65%',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.04)',
                    }}
                  />

                  {/* Emoji */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      fontSize: 36,
                    }}
                  >
                    {slide.emoji}
                  </div>

                  {/* Text content */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Tag */}
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: '#D4AF37',
                        letterSpacing: '2px',
                        marginBottom: 4,
                        textTransform: 'uppercase',
                      }}
                    >
                      {slideTag}
                    </p>

                    {/* Title */}
                    <h2
                      className="font-heading"
                      style={{
                        fontSize: 28,
                        fontWeight: 700,
                        color: '#FFFFFF',
                        lineHeight: 1.1,
                        marginBottom: 4,
                      }}
                    >
                      {slideTitle}
                    </h2>

                    {/* Subtitle */}
                    <p
                      style={{
                        fontSize: 13,
                        color: 'rgba(255,255,255,0.80)',
                        marginBottom: 12,
                        maxWidth: 200,
                      }}
                    >
                      {slideSubtitle}
                    </p>

                    {/* CTA */}
                    <button
                      onClick={() => navigate('/search')}
                      className="active:scale-95 transition-transform"
                      style={{
                        background: '#D4AF37',
                        color: '#1A1A1A',
                        fontSize: 12,
                        fontWeight: 600,
                        padding: '8px 16px',
                        borderRadius: 20,
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      {t?.home?.shopNow ?? (lang === 'ar' ? 'تسوق الآن' : 'Shop Now')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot indicators */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 6,
            marginTop: 10,
          }}
        >
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              style={{
                width: i === activeSlide ? 24 : 6,
                height: 6,
                borderRadius: i === activeSlide ? 3 : '50%',
                background: i === activeSlide ? '#D4AF37' : '#EDE8E1',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* ══ Categories ═══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader title={t.home.categories} onViewAll={() => navigate('/categories')} isRTL={isRTL} />
        <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat, i) => (
            <CategoryChip key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>

      <Divider />

      {/* ══ New Arrivals ═════════════════════════════════════════════════════ */}
      <div className="mb-6 mt-4">
        <SectionHeader
          title={lang === 'ar' ? 'وصل حديثاً' : 'New Arrivals'}
          subtitle={lang === 'ar' ? 'أحدث الإضافات لمجموعتنا' : 'Latest additions to our collection'}
          onViewAll={() => navigate('/products/new')}
          isRTL={isRTL}
        />
        <div className="flex gap-3.5 px-5 overflow-x-auto no-scrollbar pb-2">
          {newProducts.map((p, i) => (
            <div key={p.id} className="min-w-[160px] max-w-[160px] flex-shrink-0">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* ══ Gift for Every Moment ════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader
          title={lang === 'ar' ? 'هدية لكل مناسبة' : 'Gift for Every Moment'}
          subtitle={lang === 'ar' ? 'اكتشف أفكار هدايا مميزة' : 'Explore unique gift ideas'}
          isRTL={isRTL}
        />
        <div className="flex gap-2.5 px-5 overflow-x-auto no-scrollbar pb-2">
          {giftIdeas.map((idea, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => navigate('/search')}
              className="flex flex-col items-center gap-2 min-w-[72px] flex-shrink-0"
            >
              <div
                className="w-[58px] h-[58px] rounded-2xl flex items-center justify-center text-[24px]"
                style={{ background: idea.bg }}
              >
                {idea.emoji}
              </div>
              <span className="text-[10px] font-medium text-dark truncate max-w-[72px]">
                {lang === 'ar' ? idea.labelAr : idea.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <Divider />

      {/* ══ Top Vendors (Best Brands) ════════════════════════════════════════ */}
      <div className="mb-6 mt-4">
        <SectionHeader
          title={lang === 'ar' ? 'أفضل العلامات' : 'The Best Brands'}
          onViewAll={() => navigate('/vendors')}
          isRTL={isRTL}
        />
        <div className="flex gap-4 px-5 overflow-x-auto no-scrollbar pb-1">
          {vendors.slice(0, 5).map((v, i) => (
            <VendorCard key={v.id} vendor={v} index={i} compact />
          ))}
        </div>
      </div>

      {/* ══ Gift for Everyone (Tab-based) ════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader
          title={lang === 'ar' ? 'هدية للجميع' : 'Gifts for Everyone'}
          isRTL={isRTL}
        />
        {/* Tab buttons */}
        <div className="flex gap-2 px-5 mb-4 overflow-x-auto no-scrollbar">
          {giftForTabs.map((tab) => {
            const active = activeGiftTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveGiftTab(tab.key)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[12px] font-semibold flex-shrink-0 transition-all active:scale-95"
                style={{
                  background: active ? tab.color : 'white',
                  color: active ? '#fff' : '#3C3C43',
                  boxShadow: active ? `0 4px 12px ${tab.color}30` : '0 1px 4px rgba(0,0,0,0.04)',
                  border: active ? 'none' : '1px solid rgba(0,0,0,0.05)',
                }}
              >
                <tab.Icon
                  size={14}
                  variant={active ? 'Bold' : 'Outline'}
                  color={active ? '#fff' : tab.color}
                />
                {lang === 'ar' ? tab.labelAr : tab.label}
              </button>
            );
          })}
        </div>
        {/* Products */}
        <div className="flex gap-3.5 px-5 overflow-x-auto no-scrollbar pb-2">
          {featuredProducts.slice(0, 4).map((p, i) => (
            <div key={p.id} className="min-w-[160px] max-w-[160px] flex-shrink-0">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ══ Trending Gifts (2-col grid) ══════════════════════════════════════ */}
      <div className="px-5 mb-6 mt-4">
        <SectionHeader
          title={lang === 'ar' ? 'الأكثر رواجاً' : 'Trending Gifts'}
          subtitle={lang === 'ar' ? 'الأكثر شعبية لدى عملائنا' : 'Most loved by our customers'}
          isRTL={isRTL}
        />
        <div className="grid grid-cols-2 gap-3.5">
          {featuredProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>

    </div>
  );
}
