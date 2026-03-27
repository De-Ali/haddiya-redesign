import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box1, Location, Setting2, Shop, Global, Star1,
  MessageQuestion, Shield, DocumentText, ReceiptText,
  TruckFast, Logout, ArrowRight2, ArrowLeft2, User,
  Truck, Call, Whatsapp, Sms, InfoCircle,
  Facebook, Instagram,
} from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { t, lang, isRTL, toggleLanguage } = useLanguage();
  const { user, isLoggedIn, logout } = useAuth();
  const Arrow = isRTL ? ArrowLeft2 : ArrowRight2;
  const isAr = lang === 'ar';

  const mainMenu = [
    { Icon: User, label: isAr ? 'الملف الشخصي' : 'Profile', path: '/settings', color: '#7A1E2B', bg: 'rgba(122,30,43,0.08)' },
    { Icon: Box1, label: isAr ? 'الطلبات' : 'Orders', path: '/orders', color: '#D4AF37', bg: 'rgba(212,175,55,0.08)' },
    { Icon: Global, label: isAr ? 'لغة التطبيق' : 'Application language', path: null, color: '#6B7280', bg: 'rgba(107,114,128,0.08)', rightText: isAr ? 'English' : 'العربية', action: toggleLanguage },
  ];

  const infoMenu = [
    { Icon: InfoCircle, label: isAr ? 'من نحن' : 'About Us', path: '/help' },
    { Icon: Shield, label: isAr ? 'سياسة الخصوصية والاستخدام' : 'Privacy Policy and Use', path: '/privacy' },
    { Icon: DocumentText, label: isAr ? 'الشروط والأحكام' : 'Terms and Conditions', path: '/terms' },
    { Icon: ReceiptText, label: isAr ? 'سياسة الإرجاع والاسترداد' : 'Return and Refund Policy', path: '/refund' },
    { Icon: MessageQuestion, label: isAr ? 'الأسئلة الشائعة' : "FAQ's", path: '/help' },
    { Icon: TruckFast, label: isAr ? 'خيارات الشحن' : 'Shipping options', path: '/shipping' },
    { Icon: Truck, label: isAr ? 'الشحن إلى' : 'Shipping to', path: '/shipping-to' },
  ];

  const socialIcons = [
    { Icon: Global, label: 'Web' },
    { Icon: Instagram, label: 'Snapchat' },
    { Icon: Facebook, label: 'Facebook' },
    { label: '𝕏', isText: true },
    { label: '♪', isText: true },
    { Icon: Instagram, label: 'Instagram' },
  ];

  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', paddingBottom: 24 }}>
      {/* Welcome + Loyalty Points */}
      <div style={{ padding: '16px 20px 0' }}>
        {/* Welcome */}
        <p style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>
          {isAr ? 'مرحباً' : 'Welcome'} {isLoggedIn ? (isAr ? user?.nameAr : user?.name) : ''}
        </p>

        {/* Loyalty Points card */}
        <div
          style={{
            background: '#FFFFFF', borderRadius: 16, padding: '14px 18px',
            border: '1px solid #EDE8E1', marginBottom: 16,
            display: 'flex', alignItems: 'center', gap: 14,
          }}
        >
          <div style={{ width: 48, height: 48, borderRadius: 14, background: '#7A1E2B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star1 size={22} variant="Bold" color="#D4AF37" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, color: '#8A7A70' }}>{isAr ? 'نقاط الولاء' : 'Loyalty points'}</p>
            <p style={{ fontSize: 12, color: '#8A7A70', marginTop: 2 }}>{isAr ? 'نقاط معلقة' : 'Pending point'} <InfoCircle size={12} variant="Outline" color="#AEAEB2" /></p>
          </div>
          <Arrow size={18} variant="Outline" color="#AEAEB2" />
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 6, background: '#F0EDED' }} />

      {/* Main menu */}
      <div style={{ padding: '4px 0' }}>
        {mainMenu.map((item, i) => (
          <button
            key={i}
            onClick={() => item.action ? item.action() : item.path && navigate(item.path)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 20px', background: 'transparent', border: 'none',
              borderBottom: '1px solid #F0EDED', cursor: 'pointer', textAlign: 'start',
            }}
          >
            <item.Icon size={22} variant="Outline" color={item.color} />
            <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: '#1A1A1A' }}>{item.label}</span>
            {item.rightText && <span style={{ fontSize: 14, fontWeight: 600, color: '#D4AF37', marginRight: 4 }}>{item.rightText}</span>}
            <Arrow size={16} variant="Outline" color="#CDCDCF" />
          </button>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 6, background: '#F0EDED' }} />

      {/* Info menu */}
      <div style={{ padding: '4px 0' }}>
        {infoMenu.map((item, i) => (
          <button
            key={i}
            onClick={() => navigate(item.path)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 20px', background: 'transparent', border: 'none',
              borderBottom: i < infoMenu.length - 1 ? '1px solid #F0EDED' : 'none',
              cursor: 'pointer', textAlign: 'start',
            }}
          >
            <item.Icon size={22} variant="Outline" color="#6B7280" />
            <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: '#1A1A1A' }}>{item.label}</span>
            <Arrow size={16} variant="Outline" color="#CDCDCF" />
          </button>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 6, background: '#F0EDED' }} />

      {/* Logout */}
      {isLoggedIn && (
        <button
          onClick={() => { logout(); navigate('/home'); }}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 14,
            padding: '16px 20px', background: 'transparent', border: 'none',
            borderBottom: '1px solid #F0EDED', cursor: 'pointer',
          }}
        >
          <Logout size={22} variant="Outline" color="#FF3B30" />
          <span style={{ fontSize: 15, fontWeight: 500, color: '#1A1A1A' }}>{isAr ? 'تسجيل الخروج' : 'Logout'}</span>
        </button>
      )}

      {/* Social Media */}
      <div style={{ padding: '20px 20px 0' }}>
        <div
          style={{
            background: '#FFFFFF', borderRadius: 16, padding: '16px 20px',
            border: '1px solid #EDE8E1', display: 'flex', alignItems: 'center', gap: 12,
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>Social Media</span>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            {socialIcons.map((s, i) => (
              <div key={i} style={{ cursor: 'pointer' }}>
                {s.isText ? (
                  <span style={{ fontSize: 20, color: '#7A1E2B' }}>{s.label}</span>
                ) : (
                  <s.Icon size={22} variant="Outline" color="#7A1E2B" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Connect with us */}
      <div style={{ padding: '16px 20px 0' }}>
        <p style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>
          {isAr ? 'تواصل معنا' : 'Connect with us'}
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { Icon: Call, label: isAr ? 'اتصال' : 'Contact', color: '#7A1E2B' },
            { Icon: Whatsapp, label: isAr ? 'واتساب' : 'Whatsapp', color: '#7A1E2B' },
            { Icon: Sms, label: isAr ? 'بريد' : 'Email', color: '#7A1E2B' },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                flex: 1, background: '#FFFFFF', borderRadius: 14, padding: '16px 8px',
                border: '1px solid #EDE8E1', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 6, cursor: 'pointer',
              }}
            >
              <c.Icon size={24} variant="Outline" color={c.color} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A' }}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* App version */}
      <p style={{ textAlign: 'center', fontSize: 12, color: '#AEAEB2', marginTop: 24 }}>
        App Version 2.0.0 (100)
      </p>
    </div>
  );
}
