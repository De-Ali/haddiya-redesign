import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseCircle } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';

const giftCards = [
  { id: 1, color: '#F8E8E8', border: '#E8B4B4', label: 'Floral' },
  { id: 2, color: '#E8F0F8', border: '#B4CCE8', label: 'Blue' },
  { id: 3, color: '#F8F0E8', border: '#E8D4B4', label: 'Gold' },
];

export default function SendAsGift() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [selectedCard, setSelectedCard] = useState(1);
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [mediaLink, setMediaLink] = useState('');
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const card = giftCards.find(c => c.id === selectedCard);

  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', paddingBottom: 32 }}>
      <div className="px-4 pt-4">

        {/* Info card */}
        <div style={{ background: '#FFFFFF', border: '1px solid #EDE8E1', borderRadius: 16, padding: 16, marginBottom: 20 }}>
          <div className="flex items-start gap-2 mb-2">
            <span style={{ color: '#7A1E2B', fontSize: 16 }}>•</span>
            <p style={{ fontSize: 13, color: '#3C3C43', lineHeight: 1.6 }}>
              {isAr ? 'سيتم تغليف المنتجات مع بطاقة هدية' : 'Products will be gift wrapped with a gift card'}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span style={{ color: '#7A1E2B', fontSize: 16 }}>•</span>
            <p style={{ fontSize: 13, color: '#3C3C43', lineHeight: 1.6 }}>
              {isAr ? 'ستصلك الفاتورة عبر البريد الإلكتروني ولن تكون مع الطلب' : 'You will receive the invoice via e-mail and will not be included with the order'}
            </p>
          </div>
        </div>

        {/* Card Design */}
        <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>
          {isAr ? 'تصميم البطاقة' : 'Card Design'}
        </p>
        <div className="flex gap-3 mb-6">
          {giftCards.map(gc => (
            <button
              key={gc.id}
              onClick={() => setSelectedCard(gc.id)}
              className="active:scale-95 transition-transform"
              style={{
                width: 72, height: 90, borderRadius: 12, background: gc.color,
                border: selectedCard === gc.id ? `2px solid #7A1E2B` : `1px solid ${gc.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', position: 'relative',
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}haddiya-logo.png`}
                alt=""
                className="w-8 h-8 object-contain opacity-40"
              />
            </button>
          ))}
        </div>

        {/* Form fields */}
        <div className="space-y-4 mb-6">
          <div>
            <label style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: 6 }}>
              {isAr ? 'اسم مرسل الهدية' : "Gift sender's name"}
            </label>
            <input
              value={senderName}
              onChange={e => setSenderName(e.target.value)}
              placeholder={isAr ? 'اسمك' : 'Your name'}
              style={{ width: '100%', background: '#FFFFFF', border: '1px solid #EDE8E1', borderRadius: 14, padding: '14px 16px', fontSize: 14, color: '#1A1A1A', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: 6 }}>
              {isAr ? 'اسم مستلم الهدية' : "Gift recipient's name"}
            </label>
            <input
              value={recipientName}
              onChange={e => setRecipientName(e.target.value)}
              placeholder={isAr ? 'اسم المستلم' : "Recipient's name"}
              style={{ width: '100%', background: '#FFFFFF', border: '1px solid #EDE8E1', borderRadius: 14, padding: '14px 16px', fontSize: 14, color: '#1A1A1A', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: 6 }}>
              {isAr ? 'إرفاق رابط (فيديو أو صوت)' : 'Attach a link (video or audio)'}
            </label>
            <input
              value={mediaLink}
              onChange={e => setMediaLink(e.target.value)}
              placeholder="https://..."
              style={{ width: '100%', background: '#FFFFFF', border: '1px solid #EDE8E1', borderRadius: 14, padding: '14px 16px', fontSize: 14, color: '#1A1A1A', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: 6 }}>
              {isAr ? 'إرفاق رسالة' : 'Attach a message'}
            </label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={4}
              placeholder={isAr ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
              style={{ width: '100%', background: '#FFFFFF', border: '1px solid #EDE8E1', borderRadius: 14, padding: '14px 16px', fontSize: 14, color: '#1A1A1A', outline: 'none', resize: 'none' }}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowPreview(true)}
            className="flex-1 h-[50px] rounded-2xl text-[14px] font-semibold active:scale-[0.98] transition-transform"
            style={{ background: '#FFFFFF', color: '#1A1A1A', border: '1px solid #EDE8E1' }}
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

      {/* ── Gift Card Preview Modal ── */}
      <AnimatePresence>
        {showPreview && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80]"
              style={{ background: 'rgba(0,0,0,0.5)' }}
              onClick={() => setShowPreview(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[81] w-[85vw] max-w-[340px]"
            >
              <div style={{ background: '#FFFFFF', borderRadius: 20, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
                {/* Close button */}
                <button
                  onClick={() => setShowPreview(false)}
                  className="absolute top-3 right-3 z-10"
                >
                  <CloseCircle size={24} variant="Outline" color="#8A7A70" />
                </button>

                {/* Card design area */}
                <div style={{ background: card.color, border: `3px solid ${card.border}`, borderRadius: 16, margin: 16, padding: 20, minHeight: 280, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Logo */}
                  <img
                    src={`${import.meta.env.BASE_URL}haddiya-logo.png`}
                    alt="Haddiya"
                    className="w-10 h-10 object-contain mb-4"
                  />

                  {/* QR Code placeholder */}
                  <div style={{ width: 80, height: 80, background: 'rgba(0,0,0,0.06)', borderRadius: 8, marginTop: 'auto', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 10, color: '#8A7A70' }}>QR Code</span>
                  </div>

                  <p style={{ fontSize: 11, color: '#8A7A70', textAlign: 'center' }}>
                    {isAr ? 'سعادتكم هديتنا' : 'Your joy is the best gift to us'}
                  </p>
                </div>

                {/* Sender / Recipient */}
                <div style={{ padding: '0 16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0', borderBottom: '1px solid #EDE8E1' }}>
                    <span style={{ fontSize: 12, color: '#8A7A70' }}>{isAr ? 'المرسل' : 'Sender'}:</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{senderName || '—'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0' }}>
                    <span style={{ fontSize: 12, color: '#8A7A70' }}>{isAr ? 'المستلم' : 'Recipient'}:</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{recipientName || '—'}</span>
                  </div>
                  {message && (
                    <div style={{ padding: '10px 0', borderTop: '1px solid #EDE8E1' }}>
                      <span style={{ fontSize: 12, color: '#8A7A70' }}>{isAr ? 'الرسالة' : 'Message'}:</span>
                      <p style={{ fontSize: 13, color: '#3C3C43', marginTop: 4, lineHeight: 1.5 }}>{message}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
