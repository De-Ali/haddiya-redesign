import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Location, Card, DocumentText, TickCircle, Add, Sms, Call, User, Map, Calendar, Clock } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';

const steps = [
  { key: 'address', Icon: Location, label: 'Address', labelAr: 'العنوان' },
  { key: 'payment', Icon: Card, label: 'Payment', labelAr: 'الدفع' },
  { key: 'review', Icon: DocumentText, label: 'Review', labelAr: 'المراجعة' },
];

const savedAddresses = [
  { id: 1, label: 'Home', labelAr: 'المنزل', address: 'Villa 45, Al Khuwair, Muscat, Oman', addressAr: 'فيلا 45، الخوير، مسقط، عمان', phone: '+968 9123 4567' },
  { id: 2, label: 'Office', labelAr: 'المكتب', address: 'Building 12, CBD Area, Muscat', addressAr: 'مبنى 12، منطقة الأعمال، مسقط', phone: '+968 9876 5432' },
];

const paymentMethods = [
  { id: 'visa', name: 'Visa •••• 4521', icon: '💳' },
  { id: 'apple', name: 'Apple Pay', icon: '' },
  { id: 'cod', name: 'Cash on Delivery', nameAr: 'الدفع عند الاستلام', icon: '💵' },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const isAr = lang === 'ar';
  const { cartItems, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('visa');
  const [showAddAddress, setShowAddAddress] = useState(false);

  /* ── Delivery Scheduling (per client Meet3 review) ── */
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('morning');

  const deliveryDates = useMemo(() => {
    const daysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysAr = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const monthsEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const monthsAr = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    const out = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      let label, labelAr;
      if (i === 0) { label = 'Today'; labelAr = 'اليوم'; }
      else if (i === 1) { label = 'Tomorrow'; labelAr = 'غداً'; }
      else { label = daysEn[d.getDay()]; labelAr = daysAr[d.getDay()]; }
      out.push({
        label, labelAr,
        day: d.getDate(),
        month: monthsEn[d.getMonth()],
        monthAr: monthsAr[d.getMonth()],
        iso: d.toISOString().slice(0, 10),
      });
    }
    return out;
  }, []);

  const timeSlots = [
    { key: 'morning',   label: 'Morning',   labelAr: 'صباحاً', range: '9:00 AM – 12:00 PM', rangeAr: '٩:٠٠ ص – ١٢:٠٠ م', emoji: '☀️' },
    { key: 'afternoon', label: 'Afternoon', labelAr: 'ظهراً',   range: '12:00 PM – 5:00 PM', rangeAr: '١٢:٠٠ م – ٥:٠٠ م', emoji: '🌤️' },
    { key: 'evening',   label: 'Evening',   labelAr: 'مساءً',   range: '5:00 PM – 9:00 PM',  rangeAr: '٥:٠٠ م – ٩:٠٠ م',  emoji: '🌙' },
  ];

  const selectedDate = deliveryDates[selectedDateIdx];
  const selectedSlot = timeSlots.find(s => s.key === selectedTimeSlot);

  const tax = cartTotal * 0.05;
  const total = cartTotal + tax;

  const handlePlaceOrder = () => { clearCart(); navigate('/order-success'); };

  return (
    <div className="bg-mesh min-h-full px-5 py-4">
      {/* ── Progress Steps ── */}
      <div className="flex items-center justify-center gap-2 mb-7">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: i <= step ? '#7A1E2B' : '#F0F0F0',
                  boxShadow: i <= step ? '0 3px 10px rgba(122,30,43,0.20)' : 'none',
                }}
              >
                {i < step
                  ? <TickCircle size={18} variant="Bold" color="#FFFFFF" />
                  : <s.Icon size={17} variant={i === step ? 'Bold' : 'Outline'} color={i <= step ? '#FFFFFF' : '#AEAEB2'} />
                }
              </div>
              <span className="text-[9px] font-semibold" style={{ color: i <= step ? '#7A1E2B' : '#AEAEB2' }}>
                {lang === 'ar' ? s.labelAr : s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-10 h-[2px] rounded-full -mt-4" style={{ background: i < step ? '#7A1E2B' : '#E5E5E5' }} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ══ Step 1: Address ══ */}
        {step === 0 && !showAddAddress && (
          <motion.div key="address" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-display text-[18px] font-semibold tracking-tight mb-4" style={{ color: '#1C1C1E' }}>
              {t.checkout.address}
            </h2>
            <div className="space-y-2.5 mb-5">
              {savedAddresses.map(addr => (
                <button
                  key={addr.id}
                  onClick={() => setSelectedAddress(addr.id)}
                  className="w-full text-start bg-white rounded-[18px] p-4 transition-all"
                  style={{
                    border: selectedAddress === addr.id ? '1.5px solid #7A1E2B' : '1px solid rgba(0,0,0,0.05)',
                    boxShadow: selectedAddress === addr.id ? '0 0 0 3px rgba(122,30,43,0.06)' : '0 2px 8px rgba(0,0,0,0.03)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
                      style={{
                        border: selectedAddress === addr.id ? 'none' : '2px solid #D1D1D6',
                        background: selectedAddress === addr.id ? '#7A1E2B' : 'transparent',
                      }}
                    >
                      {selectedAddress === addr.id && <TickCircle size={12} variant="Bold" color="#FFFFFF" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[13px] font-semibold" style={{ color: '#1C1C1E' }}>{lang === 'ar' ? addr.labelAr : addr.label}</p>
                        <span className="text-[10px]" style={{ color: '#AEAEB2' }}>{addr.phone}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed" style={{ color: '#8E8E93' }}>{lang === 'ar' ? addr.addressAr : addr.address}</p>
                    </div>
                  </div>
                </button>
              ))}
              <button
                onClick={() => setShowAddAddress(true)}
                className="w-full bg-white rounded-[18px] p-4 flex items-center gap-2.5 text-[12px] font-semibold active:scale-[0.99] transition-transform"
                style={{ color: '#7A1E2B', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}
              >
                <Add size={16} variant="Outline" color="#7A1E2B" /> {t.checkout.addNew}
              </button>
            </div>

            {/* ── Delivery Scheduling (per client request) ── */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={18} variant="Bold" color="#7A1E2B" />
                <h3 className="font-display text-[15px] font-semibold tracking-tight" style={{ color: '#1C1C1E' }}>
                  {isAr ? 'موعد التوصيل' : 'Delivery Schedule'}
                </h3>
              </div>
              <p className="text-[11px] mb-3" style={{ color: '#8E8E93' }}>
                {isAr ? 'اختر التاريخ والوقت المناسب لاستلام هديتك' : 'Pick a convenient date & time for your gift'}
              </p>

              {/* Date chips */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-3 -mx-1 px-1">
                {deliveryDates.map((d, i) => {
                  const active = selectedDateIdx === i;
                  return (
                    <button
                      key={d.iso}
                      onClick={() => setSelectedDateIdx(i)}
                      className="flex-shrink-0 active:scale-95 transition-all"
                      style={{
                        minWidth: 68,
                        padding: '10px 8px',
                        borderRadius: 14,
                        background: active ? '#7A1E2B' : '#FFFFFF',
                        border: active ? '1.5px solid #7A1E2B' : '1px solid rgba(0,0,0,0.06)',
                        boxShadow: active ? '0 4px 14px rgba(122,30,43,0.22)' : '0 1px 4px rgba(0,0,0,0.03)',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ fontSize: 10, fontWeight: 600, color: active ? 'rgba(255,255,255,0.75)' : '#8E8E93', marginBottom: 3 }}>
                        {isAr ? d.labelAr : d.label}
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: active ? '#FFFFFF' : '#1C1C1E', lineHeight: 1 }}>
                        {d.day}
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 500, color: active ? 'rgba(255,255,255,0.75)' : '#AEAEB2', marginTop: 3 }}>
                        {isAr ? d.monthAr : d.month}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Time slots */}
              <div className="flex items-center gap-1.5 mb-2">
                <Clock size={14} variant="Bold" color="#8E8E93" />
                <span className="text-[11px] font-semibold" style={{ color: '#8E8E93' }}>
                  {isAr ? 'الوقت المفضل' : 'Preferred time slot'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => {
                  const active = selectedTimeSlot === slot.key;
                  return (
                    <button
                      key={slot.key}
                      onClick={() => setSelectedTimeSlot(slot.key)}
                      className="active:scale-95 transition-all"
                      style={{
                        padding: '10px 6px',
                        borderRadius: 14,
                        background: active ? 'rgba(122,30,43,0.06)' : '#FFFFFF',
                        border: active ? '1.5px solid #7A1E2B' : '1px solid rgba(0,0,0,0.06)',
                        boxShadow: active ? '0 0 0 3px rgba(122,30,43,0.06)' : '0 1px 4px rgba(0,0,0,0.03)',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ fontSize: 18, marginBottom: 3 }}>{slot.emoji}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: active ? '#7A1E2B' : '#1C1C1E', lineHeight: 1.1 }}>
                        {isAr ? slot.labelAr : slot.label}
                      </div>
                      <div style={{ fontSize: 9, fontWeight: 500, color: active ? '#7A1E2B' : '#AEAEB2', marginTop: 2, lineHeight: 1.2 }}>
                        {isAr ? slot.rangeAr : slot.range}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full h-[48px] rounded-2xl text-[14px] font-bold active:scale-[0.98] transition-transform"
              style={{ background: '#7A1E2B', color: '#fff', boxShadow: '0 4px 14px rgba(122,30,43,0.25)' }}
            >
              {lang === 'ar' ? 'متابعة' : 'Continue'}
            </button>
          </motion.div>
        )}

        {/* ══ Add New Address Form ══ */}
        {step === 0 && showAddAddress && (
          <motion.div key="add-address" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-display text-[18px] font-semibold tracking-tight mb-4" style={{ color: '#1C1C1E' }}>
              {lang === 'ar' ? 'عنوان جديد' : 'New Address'}
            </h2>
            <div className="space-y-3 mb-5">
              {[
                { Icon: User, placeholder: lang === 'ar' ? 'الاسم الكامل' : 'Full Name' },
                { Icon: Call, placeholder: lang === 'ar' ? 'رقم الهاتف' : 'Phone Number', type: 'tel' },
                { Icon: Sms, placeholder: lang === 'ar' ? 'البريد الإلكتروني' : 'Email (optional)', type: 'email' },
                { Icon: Map, placeholder: lang === 'ar' ? 'المنطقة / المحافظة' : 'Area / Governorate' },
                { Icon: Location, placeholder: lang === 'ar' ? 'العنوان التفصيلي' : 'Detailed Address (villa, building, street)' },
              ].map((field, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-[14px]"
                  style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 4px rgba(0,0,0,0.02)' }}
                >
                  <field.Icon size={18} variant="Outline" color="#AEAEB2" />
                  <input
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    className="flex-1 bg-transparent outline-none text-[13px] font-medium"
                    style={{ color: '#1C1C1E' }}
                  />
                </div>
              ))}
              {/* Address label selector */}
              <div className="flex gap-2">
                {[
                  { label: lang === 'ar' ? 'المنزل' : 'Home', icon: '🏠' },
                  { label: lang === 'ar' ? 'المكتب' : 'Office', icon: '🏢' },
                  { label: lang === 'ar' ? 'آخر' : 'Other', icon: '📍' },
                ].map((tag, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[12px] font-medium"
                    style={{ border: i === 0 ? '1.5px solid #7A1E2B' : '1px solid rgba(0,0,0,0.08)', color: i === 0 ? '#7A1E2B' : '#6B7280', background: i === 0 ? 'rgba(122,30,43,0.04)' : 'white' }}
                  >
                    {tag.icon} {tag.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddAddress(false)}
                className="flex-1 h-[48px] rounded-2xl text-[14px] font-semibold active:scale-[0.98] transition-transform"
                style={{ background: '#fff', color: '#1C1C1E', border: '1px solid rgba(0,0,0,0.08)' }}
              >
                {lang === 'ar' ? 'رجوع' : 'Back'}
              </button>
              <button
                onClick={() => { setShowAddAddress(false); }}
                className="flex-1 h-[48px] rounded-2xl text-[14px] font-bold active:scale-[0.98] transition-transform"
                style={{ background: '#7A1E2B', color: '#fff', boxShadow: '0 4px 14px rgba(122,30,43,0.25)' }}
              >
                {lang === 'ar' ? 'حفظ العنوان' : 'Save Address'}
              </button>
            </div>
          </motion.div>
        )}

        {/* ══ Step 2: Payment ══ */}
        {step === 1 && (
          <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-display text-[18px] font-semibold tracking-tight mb-4" style={{ color: '#1C1C1E' }}>
              {t.checkout.payment}
            </h2>
            <div className="space-y-2.5 mb-5">
              {paymentMethods.map(pm => (
                <button
                  key={pm.id}
                  onClick={() => setSelectedPayment(pm.id)}
                  className="w-full text-start bg-white rounded-[18px] p-4 transition-all"
                  style={{
                    border: selectedPayment === pm.id ? '1.5px solid #7A1E2B' : '1px solid rgba(0,0,0,0.05)',
                    boxShadow: selectedPayment === pm.id ? '0 0 0 3px rgba(122,30,43,0.06)' : '0 2px 8px rgba(0,0,0,0.03)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        border: selectedPayment === pm.id ? 'none' : '2px solid #D1D1D6',
                        background: selectedPayment === pm.id ? '#7A1E2B' : 'transparent',
                      }}
                    >
                      {selectedPayment === pm.id && <TickCircle size={12} variant="Bold" color="#FFFFFF" />}
                    </div>
                    {pm.id === 'apple' ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1A1A1A"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                    ) : (
                      <span className="text-[18px]">{pm.icon}</span>
                    )}
                    <span className="text-[13px] font-medium" style={{ color: '#1C1C1E' }}>
                      {lang === 'ar' && pm.nameAr ? pm.nameAr : pm.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(0)}
                className="flex-1 h-[48px] rounded-2xl text-[14px] font-semibold active:scale-[0.98] transition-transform"
                style={{ background: '#fff', color: '#1C1C1E', border: '1px solid rgba(0,0,0,0.08)' }}
              >
                {lang === 'ar' ? 'رجوع' : 'Back'}
              </button>
              <button
                onClick={() => setStep(2)}
                className="flex-1 h-[48px] rounded-2xl text-[14px] font-bold active:scale-[0.98] transition-transform"
                style={{ background: '#7A1E2B', color: '#fff', boxShadow: '0 4px 14px rgba(122,30,43,0.25)' }}
              >
                {lang === 'ar' ? 'متابعة' : 'Continue'}
              </button>
            </div>
          </motion.div>
        )}

        {/* ══ Step 3: Review ══ */}
        {step === 2 && (
          <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-display text-[18px] font-semibold tracking-tight mb-4" style={{ color: '#1C1C1E' }}>
              {t.checkout.review}
            </h2>

            {/* Delivery info */}
            <div className="bg-white rounded-[18px] p-4 mb-3" style={{ border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Location size={14} variant="Bold" color="#7A1E2B" />
                <span className="text-[11px] font-semibold" style={{ color: '#7A1E2B' }}>{lang === 'ar' ? 'عنوان التوصيل' : 'Delivery Address'}</span>
              </div>
              <p className="text-[12px] font-medium" style={{ color: '#1C1C1E' }}>
                {lang === 'ar' ? savedAddresses[0].addressAr : savedAddresses[0].address}
              </p>
            </div>

            {/* Delivery schedule summary */}
            <div className="bg-white rounded-[18px] p-4 mb-3" style={{ border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={14} variant="Bold" color="#7A1E2B" />
                <span className="text-[11px] font-semibold" style={{ color: '#7A1E2B' }}>{isAr ? 'موعد التوصيل' : 'Delivery Schedule'}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold" style={{ color: '#1C1C1E' }}>
                  {isAr
                    ? `${selectedDate.labelAr} · ${selectedDate.day} ${selectedDate.monthAr}`
                    : `${selectedDate.label} · ${selectedDate.month} ${selectedDate.day}`}
                </p>
                <div className="flex items-center gap-1">
                  <span style={{ fontSize: 14 }}>{selectedSlot.emoji}</span>
                  <span className="text-[11px] font-semibold" style={{ color: '#7A1E2B' }}>
                    {isAr ? selectedSlot.labelAr : selectedSlot.label}
                  </span>
                </div>
              </div>
              <p className="text-[10px] mt-1" style={{ color: '#8E8E93' }}>
                {isAr ? selectedSlot.rangeAr : selectedSlot.range}
              </p>
            </div>

            {/* Items */}
            <div className="bg-white rounded-[18px] p-4 mb-3" style={{ border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              {cartItems.map((item, i) => (
                <div
                  key={`${item.id}-${item.variant}`}
                  className="flex items-center gap-3 py-3"
                  style={{ borderTop: i > 0 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}
                >
                  <img src={item.image} alt="" className="w-14 h-14 rounded-xl object-cover bg-bg-warm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold truncate" style={{ color: '#1C1C1E' }}>{lang === 'ar' ? item.nameAr : item.name}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: '#AEAEB2' }}>x{item.qty}</p>
                  </div>
                  <span className="text-[13px] font-bold text-primary">{(item.price * item.qty).toFixed(3)}</span>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-[18px] p-4 mb-5" style={{ border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div className="space-y-2">
                <div className="flex justify-between text-[12px]">
                  <span style={{ color: '#8E8E93' }}>{t.cart.subtotal}</span>
                  <span className="font-medium" style={{ color: '#1C1C1E' }}>{cartTotal.toFixed(3)} OMR</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span style={{ color: '#8E8E93' }}>{t.cart.tax}</span>
                  <span className="font-medium" style={{ color: '#1C1C1E' }}>{tax.toFixed(3)} OMR</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span style={{ color: '#8E8E93' }}>{lang === 'ar' ? 'التوصيل' : 'Delivery'}</span>
                  <span className="font-medium" style={{ color: '#34C759' }}>{lang === 'ar' ? 'مجاني' : 'FREE'}</span>
                </div>
                <div className="h-px my-1" style={{ background: 'rgba(0,0,0,0.05)' }} />
                <div className="flex justify-between text-[14px] font-bold">
                  <span style={{ color: '#1C1C1E' }}>{t.cart.total}</span>
                  <span className="text-primary">{total.toFixed(3)} OMR</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 h-[48px] rounded-2xl text-[14px] font-semibold active:scale-[0.98] transition-transform"
                style={{ background: '#fff', color: '#1C1C1E', border: '1px solid rgba(0,0,0,0.08)' }}
              >
                {lang === 'ar' ? 'رجوع' : 'Back'}
              </button>
              <button
                onClick={handlePlaceOrder}
                className="flex-1 h-[48px] rounded-2xl text-[14px] font-bold active:scale-[0.98] transition-transform"
                style={{ background: '#D4AF37', color: '#fff', boxShadow: '0 4px 14px rgba(212,175,55,0.30)' }}
              >
                {t.checkout.placeOrder}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
