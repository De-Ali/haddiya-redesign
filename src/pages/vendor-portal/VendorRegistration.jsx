import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shop, DocumentText, Card, TickCircle } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

const steps = [
  { icon: Shop, label: 'Business Info', labelAr: 'بيانات المتجر' },
  { icon: DocumentText, label: 'Documents', labelAr: 'الوثائق' },
  { icon: Card, label: 'Bank Details', labelAr: 'بيانات البنك' },
];

export default function VendorRegistration() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { registerVendor } = useAuth();

  const handleComplete = () => { registerVendor(); navigate('/vendor-portal/dashboard'); };

  return (
    <div className="bg-mesh min-h-full px-5 py-4">
      {/* Steps */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                background: i <= step ? '#7A1E2B' : 'rgba(255,255,255,0.85)',
                border: i <= step ? 'none' : '1px solid rgba(255,255,255,0.65)',
                boxShadow: i <= step ? '0 2px 10px rgba(122,30,43,0.25)' : '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              {i < step
                ? <TickCircle size={16} color="#ffffff" variant="Bold" />
                : <s.icon size={16} color={i <= step ? '#ffffff' : '#9ca3af'} variant="Outline" />
              }
            </div>
            {i < steps.length - 1 && (
              <div
                className="w-6 h-0.5 rounded"
                style={{ background: i < step ? '#7A1E2B' : 'rgba(28,28,30,0.10)' }}
              />
            )}
          </div>
        ))}
      </div>

      <h2 className="font-display text-lg font-semibold mb-4" style={{ color: '#1C1C1E' }}>
        {lang === 'ar' ? steps[step].labelAr : steps[step].label}
      </h2>

      <div className="bg-white rounded-[18px] p-4 shadow-soft border border-white/60 mb-4">
        {step === 0 && (
          <div className="space-y-3">
            {[
              { label: lang === 'ar' ? 'اسم المتجر' : 'Shop Name', placeholder: 'e.g. Rose & Gold' },
              { label: lang === 'ar' ? 'الوصف' : 'Description', placeholder: 'Describe your shop...' },
              { label: lang === 'ar' ? 'الفئة' : 'Category', placeholder: 'Select category' },
              { label: lang === 'ar' ? 'رقم الهاتف' : 'Phone', placeholder: '+968 ...' },
            ].map((f, i) => (
              <div key={i}>
                <label className="block text-xs font-medium mb-1" style={{ color: '#1C1C1E' }}>{f.label}</label>
                <input
                  placeholder={f.placeholder}
                  className="w-full glass-input rounded-xl px-3 py-2.5 text-sm outline-none"
                  style={{ color: '#1C1C1E' }}
                />
              </div>
            ))}
          </div>
        )}
        {step === 1 && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#1C1C1E' }}>
                {lang === 'ar' ? 'رقم السجل التجاري' : 'CR Number'}
              </label>
              <input
                placeholder="e.g. 1234567"
                className="w-full glass-input rounded-xl px-3 py-2.5 text-sm outline-none"
                style={{ color: '#1C1C1E' }}
              />
            </div>
            <div
              className="glass rounded-xl p-4 text-center"
              style={{ border: '2px dashed rgba(122,30,43,0.20)' }}
            >
              <p className="text-xs" style={{ color: '#8E8E93' }}>
                {lang === 'ar' ? 'ارفع صورة السجل التجاري' : 'Upload CR Document'}
              </p>
              <p className="text-[10px] mt-1" style={{ color: 'rgba(142,142,147,0.70)' }}>PDF, JPG up to 5MB</p>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-3">
            {[
              { label: lang === 'ar' ? 'اسم البنك' : 'Bank Name', placeholder: 'e.g. Bank Muscat' },
              { label: lang === 'ar' ? 'رقم الحساب' : 'Account Number', placeholder: 'IBAN' },
              { label: lang === 'ar' ? 'اسم صاحب الحساب' : 'Account Holder', placeholder: 'Full name' },
            ].map((f, i) => (
              <div key={i}>
                <label className="block text-xs font-medium mb-1" style={{ color: '#1C1C1E' }}>{f.label}</label>
                <input
                  placeholder={f.placeholder}
                  className="w-full glass-input rounded-xl px-3 py-2.5 text-sm outline-none"
                  style={{ color: '#1C1C1E' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {step > 0 && (
          <Button variant="secondary" size="lg" className="flex-1" onClick={() => setStep(s => s - 1)}>
            {lang === 'ar' ? 'رجوع' : 'Back'}
          </Button>
        )}
        <Button
          variant={step === 2 ? 'accent' : 'primary'}
          size="lg"
          className="flex-1"
          onClick={() => step < 2 ? setStep(s => s + 1) : handleComplete()}
        >
          {step === 2 ? (lang === 'ar' ? 'إرسال' : 'Submit') : (lang === 'ar' ? 'التالي' : 'Next')}
        </Button>
      </div>
    </div>
  );
}
