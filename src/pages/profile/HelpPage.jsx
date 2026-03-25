import { useState } from 'react';
import { ArrowDown2, MessageText1 } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';

const faqs = [
  { q: 'How do I track my order?', qAr: 'كيف أتتبع طلبي؟', a: 'Go to My Orders in your profile to see real-time tracking.', aAr: 'اذهب إلى طلباتي في ملفك الشخصي لمتابعة الطلب.' },
  { q: 'What is the return policy?', qAr: 'ما هي سياسة الإرجاع؟', a: 'Returns are accepted within 14 days of delivery.', aAr: 'يُقبل الإرجاع خلال 14 يوماً من التوصيل.' },
  { q: 'How can I become a vendor?', qAr: 'كيف أصبح بائعاً؟', a: 'Register through the Vendor Portal with your CR number.', aAr: 'سجّل عبر بوابة البائع مع رقم السجل التجاري.' },
  { q: 'Do you offer gift wrapping?', qAr: 'هل تقدمون تغليف هدايا؟', a: 'Yes! Premium gift wrapping is available at checkout.', aAr: 'نعم! التغليف الفاخر متاح عند الدفع.' },
];

export default function HelpPage() {
  const [open, setOpen] = useState(null);
  const { lang } = useLanguage();

  return (
    <div className="bg-mesh min-h-full px-5 py-4">
      <div className="space-y-2.5 mb-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-[18px] overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}>
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full p-4 flex items-center justify-between text-start">
              <span className="text-[13px] font-semibold pe-3 flex-1" style={{ color: '#1C1C1E' }}>{lang === 'ar' ? faq.qAr : faq.q}</span>
              <ArrowDown2
                size={15}
                variant="Outline"
                color="#AEAEB2"
                style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
              />
            </button>
            {open === i && (
              <div className="px-4 pb-4 -mt-1">
                <p className="text-[12px] leading-relaxed" style={{ color: '#8E8E93' }}>{lang === 'ar' ? faq.aAr : faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        className="w-full h-[48px] rounded-2xl text-[14px] font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        style={{ background: '#7A1E2B', color: '#fff', boxShadow: '0 4px 14px rgba(122,30,43,0.25)' }}
      >
        <MessageText1 size={17} variant="Outline" color="#FFFFFF" />
        {lang === 'ar' ? 'تواصل معنا' : 'Contact Support'}
      </button>
    </div>
  );
}
