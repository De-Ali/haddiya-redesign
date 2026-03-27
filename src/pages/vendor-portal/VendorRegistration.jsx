import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shop, DocumentText, Card, TickCircle, Gallery } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

const MAROON = '#7A1E2B';
const GOLD = '#D4AF37';

const steps = [
  { icon: Shop, label: 'Business Info', labelAr: 'بيانات المتجر' },
  { icon: DocumentText, label: 'Documents', labelAr: 'الوثائق' },
  { icon: Card, label: 'Bank Details', labelAr: 'بيانات البنك' },
];

function Field({ label, placeholder, type = 'text' }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#3C3C43', marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        style={{ width: '100%', background: '#F5F0EB', border: '1px solid #EDE8E1', borderRadius: 14, padding: '13px 16px', fontSize: 14, fontWeight: 500, color: '#1A1A1A', outline: 'none' }}
      />
    </div>
  );
}

export default function VendorRegistration() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { registerVendor } = useAuth();
  const isAr = lang === 'ar';

  const handleComplete = () => { registerVendor(); navigate('/vendor-portal/dashboard'); };

  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', padding: '16px 20px 32px' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: 'rgba(122,30,43,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
          <Shop size={28} variant="Bold" color={MAROON} />
        </div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 700, color: MAROON, marginBottom: 4 }}>
          {isAr ? 'كن بائعاً' : 'Become a Vendor'}
        </h2>
        <p style={{ fontSize: 13, color: '#8A7A70' }}>
          {isAr ? 'أكمل الخطوات التالية لبدء البيع' : 'Complete the steps below to start selling'}
        </p>
      </div>

      {/* Steps indicator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 42, height: 42, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: i <= step ? MAROON : '#FFFFFF',
              border: i <= step ? 'none' : '1px solid #EDE8E1',
              boxShadow: i <= step ? '0 3px 12px rgba(122,30,43,0.25)' : '0 1px 4px rgba(0,0,0,0.04)',
              transition: 'all 0.3s',
            }}>
              {i < step
                ? <TickCircle size={18} variant="Bold" color="#FFFFFF" />
                : <s.icon size={18} variant="Outline" color={i <= step ? '#FFFFFF' : '#AEAEB2'} />
              }
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: 28, height: 2, borderRadius: 4, background: i < step ? MAROON : '#EDE8E1', transition: 'all 0.3s' }} />
            )}
          </div>
        ))}
      </div>

      {/* Step title */}
      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 16 }}>
        {isAr ? steps[step].labelAr : steps[step].label}
      </h3>

      {/* Form card */}
      <div style={{ background: '#FFFFFF', borderRadius: 18, padding: 20, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', marginBottom: 24 }}>
        {step === 0 && (
          <>
            <Field label={isAr ? 'اسم المتجر (EN)' : 'Shop Name (EN)'} placeholder="e.g. Rose & Gold" />
            <Field label={isAr ? 'اسم المتجر (AR)' : 'Shop Name (AR)'} placeholder="مثال: روز آند جولد" />
            <Field label={isAr ? 'الوصف' : 'Description'} placeholder={isAr ? 'وصف المتجر...' : 'Describe your shop...'} />
            <Field label={isAr ? 'الفئة' : 'Category'} placeholder={isAr ? 'اختر الفئة' : 'Select category'} />
            <Field label={isAr ? 'رقم الهاتف' : 'Phone Number'} placeholder="+968 XXXX XXXX" type="tel" />
            <Field label={isAr ? 'البريد الإلكتروني' : 'Email'} placeholder="vendor@example.com" type="email" />
          </>
        )}
        {step === 1 && (
          <>
            <Field label={isAr ? 'رقم السجل التجاري' : 'CR Number'} placeholder="e.g. 1234567" />
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#3C3C43', marginBottom: 6 }}>
                {isAr ? 'صورة السجل التجاري' : 'CR Document'}
              </label>
              <div style={{
                border: '2px dashed rgba(122,30,43,0.2)', borderRadius: 16, padding: '24px 16px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                background: 'rgba(122,30,43,0.02)', cursor: 'pointer',
              }}>
                <Gallery size={24} variant="Outline" color={MAROON} />
                <p style={{ fontSize: 12, fontWeight: 600, color: MAROON }}>{isAr ? 'اضغط للرفع' : 'Tap to upload'}</p>
                <p style={{ fontSize: 10, color: '#AEAEB2' }}>PDF, JPG — max 5MB</p>
              </div>
            </div>
            <Field label={isAr ? 'رقم الهوية / جواز السفر' : 'ID / Passport Number'} placeholder="e.g. A1234567" />
          </>
        )}
        {step === 2 && (
          <>
            <Field label={isAr ? 'اسم البنك' : 'Bank Name'} placeholder="e.g. Bank Muscat" />
            <Field label={isAr ? 'رقم الحساب (IBAN)' : 'Account Number (IBAN)'} placeholder="OM0001234567890" />
            <Field label={isAr ? 'اسم صاحب الحساب' : 'Account Holder Name'} placeholder={isAr ? 'الاسم الكامل' : 'Full name as on bank account'} />
            <Field label={isAr ? 'رمز الفرع' : 'Branch Code'} placeholder="e.g. 001" />
          </>
        )}
      </div>

      {/* Navigation buttons */}
      <div style={{ display: 'flex', gap: 12 }}>
        {step > 0 && (
          <button
            onClick={() => setStep(s => s - 1)}
            className="active:scale-[0.98] transition-transform"
            style={{ flex: 1, height: 52, borderRadius: 50, fontSize: 15, fontWeight: 600, color: '#1A1A1A', background: '#FFFFFF', border: '1.5px solid #EDE8E1', cursor: 'pointer' }}
          >
            {isAr ? 'رجوع' : 'Back'}
          </button>
        )}
        <button
          onClick={() => step < 2 ? setStep(s => s + 1) : handleComplete()}
          className="active:scale-[0.98] transition-transform"
          style={{
            flex: 1, height: 52, borderRadius: 50, fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer',
            background: step === 2 ? GOLD : MAROON,
            color: step === 2 ? '#1A1A1A' : '#FFFFFF',
            boxShadow: step === 2 ? '0 4px 16px rgba(212,175,55,0.3)' : '0 4px 16px rgba(122,30,43,0.25)',
          }}
        >
          {step === 2 ? (isAr ? 'إرسال الطلب' : 'Submit Application') : (isAr ? 'التالي' : 'Next')}
        </button>
      </div>
    </div>
  );
}
