import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown2, TickCircle } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';

const countries = [
  { name: 'Oman', nameAr: 'عمان', currency: 'Rial Omani', currencyAr: 'ريال عماني' },
  { name: 'UAE', nameAr: 'الإمارات', currency: 'UAE Dirham', currencyAr: 'درهم إماراتي' },
  { name: 'Bahrain', nameAr: 'البحرين', currency: 'Bahraini Dinar', currencyAr: 'دينار بحريني' },
  { name: 'Kuwait', nameAr: 'الكويت', currency: 'Kuwaiti Dinar', currencyAr: 'دينار كويتي' },
  { name: 'Saudi Arabia', nameAr: 'السعودية', currency: 'Saudi Riyal', currencyAr: 'ريال سعودي' },
];

export default function ShippingTo() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [selected, setSelected] = useState(countries[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '20px 20px 24px' }}>
        {/* Label */}
        <p style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>
          {isAr ? 'الدولة' : 'Country'}
        </p>

        {/* Selected country dropdown */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 18px', background: '#FFFFFF', border: '1px solid #EDE8E1',
            borderRadius: 16, cursor: 'pointer', marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 14, color: '#1A1A1A' }}>
            {isAr ? selected.nameAr : selected.name}
            {' - '}
            <span style={{ color: '#D4AF37', fontWeight: 600 }}>{isAr ? selected.currencyAr : selected.currency}</span>
          </span>
          <ArrowDown2
            size={16} variant="Outline" color="#8A7A70"
            style={{ transform: showDropdown ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
          />
        </button>

        {/* Dropdown list */}
        {showDropdown && (
          <div
            style={{
              background: '#FFFFFF', border: '1px solid #EDE8E1', borderRadius: 16,
              overflow: 'hidden', marginBottom: 16,
            }}
          >
            {countries.map((c, i) => (
              <button
                key={c.name}
                onClick={() => { setSelected(c); setShowDropdown(false); }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 18px', cursor: 'pointer', border: 'none',
                  background: selected.name === c.name ? 'rgba(122,30,43,0.03)' : 'transparent',
                  borderBottom: i < countries.length - 1 ? '1px solid #F5F0EB' : 'none',
                  textAlign: 'start',
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 500, color: '#1A1A1A' }}>
                  {isAr ? c.nameAr : c.name}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#D4AF37' }}>
                    {isAr ? c.currencyAr : c.currency}
                  </span>
                  {selected.name === c.name && <TickCircle size={16} variant="Bold" color="#7A1E2B" />}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Save button */}
      <div style={{ padding: '16px 20px 40px' }}>
        <button
          onClick={() => navigate(-1)}
          className="active:scale-[0.98] transition-transform"
          style={{
            width: '100%', height: 56, borderRadius: 16,
            background: '#7A1E2B', color: '#FFFFFF',
            fontSize: 16, fontWeight: 600, border: 'none',
            boxShadow: '0 4px 16px rgba(122,30,43,0.25)',
          }}
        >
          {isAr ? 'حفظ' : 'Save'}
        </button>
      </div>
    </div>
  );
}
