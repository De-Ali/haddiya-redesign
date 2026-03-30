import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseCircle, Gift } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';

const giftCards = [
  { id: 1, bg: 'linear-gradient(135deg, #F8E8E8, #FDF2F2)', border: '#E8B4B4', accent: '#C0392B', label: 'Rose', labelAr: 'وردي' },
  { id: 2, bg: 'linear-gradient(135deg, #EEF2F7, #F0F4FA)', border: '#B4CCE8', accent: '#2C5F8A', label: 'Ocean', labelAr: 'أزرق' },
  { id: 3, bg: 'linear-gradient(135deg, #FDF8ED, #FAF0D8)', border: '#E8D4B4', accent: '#D4AF37', label: 'Gold', labelAr: 'ذهبي' },
];

export default function SendAsGift() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [selectedCard, setSelectedCard] = useState(null);
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [mediaLink, setMediaLink] = useState('');
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const card = giftCards.find(c => c.id === selectedCard) || giftCards[0];

  const InputField = ({ label, value, onChange, placeholder, multiline }) => (
    <div>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: 6 }}>{label}</label>
      {multiline ? (
        <textarea value={value} onChange={onChange} rows={3} placeholder={placeholder}
          style={{ width: '100%', background: '#FFFFFF', border: '1.5px solid #EDE8E1', borderRadius: 14, padding: '12px 16px', fontSize: 14, color: '#1A1A1A', outline: 'none', resize: 'none', fontFamily: 'inherit' }}
        />
      ) : (
        <input value={value} onChange={onChange} placeholder={placeholder}
          style={{ width: '100%', background: '#FFFFFF', border: '1.5px solid #EDE8E1', borderRadius: 14, padding: '12px 16px', fontSize: 14, color: '#1A1A1A', outline: 'none' }}
        />
      )}
    </div>
  );

  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', paddingBottom: 32 }}>
      <div className="px-5 pt-4">

        {/* Info box */}
        <div style={{ background: '#FFFFFF', border: '1px solid #EDE8E1', borderRadius: 16, padding: 14, marginBottom: 20 }}>
          {[
            isAr ? 'سيتم تغليف المنتجات مع بطاقة هدية' : 'Products will be gift wrapped with a gift card',
            isAr ? 'ستصلك الفاتورة عبر البريد الإلكتروني ولن تكون مع الطلب' : 'You will receive the invoice via e-mail and will not be included with the order',
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-2" style={{ marginBottom: i === 0 ? 8 : 0 }}>
              <span style={{ color: '#7A1E2B', fontSize: 14, lineHeight: '20px' }}>•</span>
              <p style={{ fontSize: 13, color: '#3C3C43', lineHeight: '20px' }}>{t}</p>
            </div>
          ))}
        </div>

        {/* ── Select Message Card ── */}
        <div className="flex items-center gap-2 mb-3">
          <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>
            {isAr ? 'اختر بطاقة الرسالة' : 'Select your Message Card'}
          </p>
          <span style={{ fontSize: 11, color: '#AEAEB2', fontWeight: 500 }}>
            ({isAr ? 'اختياري' : 'Optional'})
          </span>
        </div>

        {/* Card options */}
        <div className="flex gap-3 mb-6">
          {giftCards.map(gc => (
            <button
              key={gc.id}
              onClick={() => setSelectedCard(selectedCard === gc.id ? null : gc.id)}
              className="active:scale-95 transition-all relative"
              style={{
                flex: 1, aspectRatio: '3/4', borderRadius: 14,
                background: gc.bg,
                border: selectedCard === gc.id ? `2.5px solid #7A1E2B` : `1.5px solid ${gc.border}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 6, cursor: 'pointer', overflow: 'hidden',
                boxShadow: selectedCard === gc.id ? '0 4px 16px rgba(122,30,43,0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <Gift size={22} variant="Bold" color={gc.accent} />
              <span style={{ fontSize: 10, fontWeight: 600, color: gc.accent }}>
                {isAr ? gc.labelAr : gc.label}
              </span>
              {selectedCard === gc.id && (
                <div className="absolute top-1.5 end-1.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#7A1E2B' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* ── Form Fields ── */}
        <div className="space-y-4 mb-6">
          <InputField
            label={isAr ? 'من (المرسل)' : 'From (Sender)'}
            value={senderName} onChange={e => setSenderName(e.target.value)}
            placeholder={isAr ? 'اسمك' : 'Your name'}
          />
          <InputField
            label={isAr ? 'إلى (المستلم)' : 'To (Recipient)'}
            value={recipientName} onChange={e => setRecipientName(e.target.value)}
            placeholder={isAr ? 'اسم المستلم' : "Recipient's name"}
          />
          <InputField
            label={isAr ? 'الرسالة' : 'Message'}
            value={message} onChange={e => setMessage(e.target.value)}
            placeholder={isAr ? 'اكتب رسالتك هنا...' : 'Write your message here...'} multiline
          />
          <InputField
            label={isAr ? 'إرفاق رابط (فيديو أو صوت)' : 'Attach a link (video or audio)'}
            value={mediaLink} onChange={e => setMediaLink(e.target.value)}
            placeholder="https://..."
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowPreview(true)}
            className="flex-1 h-[50px] rounded-2xl text-[14px] font-semibold active:scale-[0.98] transition-transform"
            style={{ background: '#FFFFFF', color: '#1A1A1A', border: '1.5px solid #EDE8E1' }}
          >
            {isAr ? 'معاينة' : 'Review'}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 h-[50px] rounded-2xl text-[14px] font-bold active:scale-[0.98] transition-transform"
            style={{ background: '#7A1E2B', color: '#FFFFFF', boxShadow: '0 4px 14px rgba(122,30,43,0.25)' }}
          >
            {isAr ? 'حفظ' : 'Save'}
          </button>
        </div>
      </div>

      {/* ── Preview Modal ── */}
      <AnimatePresence>
        {showPreview && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80]" style={{ background: 'rgba(0,0,0,0.5)' }}
              onClick={() => setShowPreview(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 z-[81]"
              style={{ transform: 'translate(-50%, -50%)', width: '88vw', maxWidth: 360 }}
            >
              <div style={{ background: '#FFFFFF', borderRadius: 24, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
                <button onClick={() => setShowPreview(false)} className="absolute top-4 right-4 z-10">
                  <CloseCircle size={24} variant="Outline" color="#8A7A70" />
                </button>

                {/* Card preview */}
                <div style={{
                  background: card.bg, borderRadius: 18, margin: 16, padding: 20,
                  border: `2px solid ${card.border}`, position: 'relative', minHeight: 240,
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}>
                  <img src={`${import.meta.env.BASE_URL}haddiya-logo.png`} alt="" className="w-10 h-10 object-contain mb-3" />

                  {/* Message area */}
                  <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                    {message && (
                      <p style={{ fontSize: 14, color: '#3C3C43', textAlign: 'center', lineHeight: 1.6, fontStyle: 'italic', maxWidth: 220 }}>
                        "{message}"
                      </p>
                    )}
                  </div>

                  {/* QR placeholder */}
                  <div style={{ width: 56, height: 56, background: 'rgba(0,0,0,0.05)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 12 }}>
                    <span style={{ fontSize: 8, color: '#8A7A70', fontWeight: 600 }}>QR</span>
                  </div>
                  <p style={{ fontSize: 10, color: '#8A7A70', marginTop: 4, textAlign: 'center' }}>
                    {isAr ? 'سعادتكم هديتنا' : 'Your joy is the best gift to us'}
                  </p>
                </div>

                {/* From / To */}
                <div style={{ padding: '0 20px 20px' }}>
                  {[
                    { label: isAr ? 'المرسل' : 'From', value: senderName },
                    { label: isAr ? 'المستلم' : 'To', value: recipientName },
                  ].map((f, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0',
                      borderBottom: i === 0 ? '1px solid #EDE8E1' : 'none',
                    }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#8A7A70', minWidth: 40 }}>{f.label}</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{f.value || '—'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
