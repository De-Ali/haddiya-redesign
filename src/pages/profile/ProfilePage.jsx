import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box1, Location, Setting2, Shop,
  MessageQuestion, Shield, DocumentText, ReceiptText,
  TruckFast, Logout, ArrowRight2, ArrowLeft2, User,
} from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { t, lang, isRTL } = useLanguage();
  const { user, isLoggedIn, logout } = useAuth();
  const Arrow = isRTL ? ArrowLeft2 : ArrowRight2;

  const mainMenu = [
    { Icon: Box1, label: t.profile.orders, path: '/orders', color: '#7A1E2B', bg: 'rgba(122,30,43,0.08)' },
    { Icon: Location, label: t.profile.addresses, path: '/addresses', color: '#D4AF37', bg: 'rgba(212,175,55,0.08)' },
    { Icon: Setting2, label: t.profile.settings, path: '/settings', color: '#6B7280', bg: 'rgba(107,114,128,0.08)' },
    { Icon: Shop, label: t.vendor.portal, path: '/vendor-portal/dashboard', color: '#34C759', bg: 'rgba(52,199,89,0.08)' },
  ];

  const infoMenu = [
    { Icon: MessageQuestion, label: t.profile.help, path: '/help', color: '#6B7280' },
    { Icon: Shield, label: t.profile.privacy, path: '/privacy', color: '#6B7280' },
    { Icon: DocumentText, label: t.profile.terms, path: '/terms', color: '#6B7280' },
    { Icon: ReceiptText, label: t.profile.refund, path: '/refund', color: '#6B7280' },
    { Icon: TruckFast, label: t.profile.shipping, path: '/shipping', color: '#6B7280' },
  ];

  return (
    <div className="bg-mesh min-h-full px-5 py-4">
      {/* Profile card */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.985 }}
        onClick={isLoggedIn ? undefined : () => navigate('/login')}
        className="w-full bg-white p-5 flex items-center gap-4 mb-5 text-start rounded-[22px]"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            background: isLoggedIn ? 'linear-gradient(135deg, #7A1E2B, #9E3040)' : 'rgba(122,30,43,0.06)',
            boxShadow: isLoggedIn ? '0 4px 12px rgba(122,30,43,0.20)' : 'none',
          }}
        >
          {isLoggedIn ? (
            <span className="text-[20px] font-bold text-white font-display">{(user?.name || 'A')[0]}</span>
          ) : (
            <User size={24} variant="Outline" color="#7A1E2B" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          {isLoggedIn ? (
            <>
              <h2 className="text-[16px] font-bold tracking-tight" style={{ color: '#1C1C1E' }}>{lang === 'ar' ? user?.nameAr : user?.name}</h2>
              <p className="text-[12px] mt-0.5" style={{ color: '#AEAEB2' }}>{user?.email}</p>
            </>
          ) : (
            <>
              <h2 className="text-[16px] font-bold" style={{ color: '#1C1C1E' }}>{t.auth.login}</h2>
              <p className="text-[12px] mt-0.5" style={{ color: '#AEAEB2' }}>{lang === 'ar' ? 'سجّل دخولك للمتابعة' : 'Sign in to continue'}</p>
            </>
          )}
        </div>
        <Arrow size={16} variant="Outline" color="#AEAEB2" />
      </motion.button>

      {/* Main menu */}
      <div className="bg-white rounded-[22px] overflow-hidden mb-4" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}>
        {mainMenu.map((item, i) => (
          <motion.button
            key={item.path}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + i * 0.04 }}
            onClick={() => navigate(item.path)}
            className="w-full px-5 py-4 flex items-center gap-4 active:bg-black/[0.02] transition-colors"
            style={{ borderBottom: i < mainMenu.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}
          >
            <div className="w-10 h-10 rounded-[13px] flex items-center justify-center" style={{ background: item.bg }}>
              <item.Icon size={20} variant="Outline" color={item.color} />
            </div>
            <span className="flex-1 text-start text-[14px] font-semibold" style={{ color: '#1C1C1E' }}>{item.label}</span>
            <Arrow size={14} variant="Outline" color="#CDCDCF" />
          </motion.button>
        ))}
      </div>

      {/* Info menu */}
      <div className="bg-white rounded-[22px] overflow-hidden mb-4" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}>
        {infoMenu.map((item, i) => (
          <motion.button
            key={item.path}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.03 }}
            onClick={() => navigate(item.path)}
            className="w-full px-5 py-3.5 flex items-center gap-4 active:bg-black/[0.02] transition-colors"
            style={{ borderBottom: i < infoMenu.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}
          >
            <div className="w-9 h-9 rounded-[12px] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.03)' }}>
              <item.Icon size={18} variant="Outline" color={item.color} />
            </div>
            <span className="flex-1 text-start text-[13px] font-medium" style={{ color: '#6B7280' }}>{item.label}</span>
            <Arrow size={13} variant="Outline" color="#D1D1D6" />
          </motion.button>
        ))}
      </div>

      {/* Logout */}
      {isLoggedIn && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => { logout(); navigate('/home'); }}
          className="w-full bg-white px-5 py-4 flex items-center gap-4 rounded-[22px] active:scale-[0.99] transition-transform"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}
        >
          <div className="w-10 h-10 rounded-[13px] flex items-center justify-center" style={{ background: 'rgba(255,59,48,0.08)' }}>
            <Logout size={18} variant="Outline" color="#FF3B30" />
          </div>
          <span className="text-[14px] font-semibold" style={{ color: '#FF3B30' }}>{t.profile.logout}</span>
        </motion.button>
      )}
    </div>
  );
}
