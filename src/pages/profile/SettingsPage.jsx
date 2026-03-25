import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Global, Notification, Moon, User, Trash,
  ArrowRight2, ArrowLeft2,
  Call, Sms,
} from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import DeleteAccountSheet from '../../components/sheets/DeleteAccountSheet';

/* ─── reusable toggle pill ─── */
function TogglePill({ on, onToggle }) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.94 }}
      style={{
        width: 44,
        height: 26,
        borderRadius: 13,
        background: on ? '#7A1E2B' : 'rgba(0,0,0,0.10)',
        position: 'relative',
        border: 'none',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'background 0.22s ease',
      }}
      aria-pressed={on}
    >
      <motion.div
        animate={{ x: on ? 18 : 2 }}
        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
        style={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: '#FFFFFF',
          position: 'absolute',
          top: 2,
          boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
        }}
      />
    </motion.button>
  );
}

/* ─── row wrapper ─── */
function SettingRow({ Icon, iconColor, iconBg, label, right, onClick, hasBorder }) {
  return (
    <motion.div
      whileTap={onClick ? { scale: 0.99 } : undefined}
      onClick={onClick}
      style={{
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        borderBottom: hasBorder ? '1px solid rgba(0,0,0,0.04)' : 'none',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 12,
          background: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={18} variant="Outline" color={iconColor} />
      </div>
      <span
        style={{
          flex: 1,
          fontSize: 13,
          fontWeight: 500,
          color: '#1C1C1E',
        }}
      >
        {label}
      </span>
      {right}
    </motion.div>
  );
}

/* ─── main component ─── */
export default function SettingsPage() {
  const { lang, toggleLanguage, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft2 : ArrowRight2;

  const [notificationsOn, setNotificationsOn] = useState(true);
  const [darkModeOn, setDarkModeOn] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [deleteSheetOpen, setDeleteSheetOpen] = useState(false);
  const [toast, setToast] = useState(false);

  // profile form state
  const [profileData, setProfileData] = useState({
    name: 'Ali Hassan',
    email: 'ali@example.com',
    phone: '91234567',
  });
  const [profileDraft, setProfileDraft] = useState({ ...profileData });
  const [profileSaved, setProfileSaved] = useState(false);

  /* ── dark mode toast ── */
  const handleDarkMode = () => {
    setDarkModeOn((v) => !v);
    setToast(true);
  };

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(false), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  /* ── profile save ── */
  const handleSaveProfile = () => {
    setProfileData({ ...profileDraft });
    setProfileSaved(true);
    setTimeout(() => {
      setProfileSaved(false);
      setShowEditProfile(false);
    }, 900);
  };

  const set = (key) => (e) =>
    setProfileDraft((prev) => ({ ...prev, [key]: e.target.value }));

  const inputStyle = {
    width: '100%',
    height: 48,
    borderRadius: 14,
    border: '1px solid rgba(0,0,0,0.06)',
    background: '#FFFFFF',
    padding: '0 14px',
    fontSize: 14,
    color: '#1C1C1E',
    outline: 'none',
    boxSizing: 'border-box',
    marginTop: 6,
    display: 'block',
  };

  const fieldLabelStyle = {
    fontSize: 12,
    fontWeight: 600,
    color: '#3C3C43',
    display: 'block',
  };

  return (
    <div
      className="bg-mesh min-h-full px-5 py-4"
      style={{ paddingBottom: 48, position: 'relative' }}
    >
      {/* ── main settings card ── */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.03)',
          marginBottom: 10,
        }}
      >
        {/* Language */}
        <SettingRow
          Icon={Global}
          iconColor="#7A1E2B"
          iconBg="rgba(122,30,43,0.07)"
          label={lang === 'ar' ? 'اللغة' : 'Language'}
          hasBorder
          right={
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={toggleLanguage}
              style={{
                padding: '7px 16px',
                borderRadius: 12,
                fontSize: 12,
                fontWeight: 700,
                background: 'rgba(122,30,43,0.08)',
                color: '#7A1E2B',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.01em',
              }}
            >
              {lang === 'ar' ? 'English' : 'العربية'}
            </motion.button>
          }
        />

        {/* Notifications */}
        <SettingRow
          Icon={Notification}
          iconColor="#D4AF37"
          iconBg="rgba(212,175,55,0.07)"
          label={lang === 'ar' ? 'الإشعارات' : 'Notifications'}
          hasBorder
          right={
            <TogglePill
              on={notificationsOn}
              onToggle={() => setNotificationsOn((v) => !v)}
            />
          }
        />

        {/* Dark Mode */}
        <SettingRow
          Icon={Moon}
          iconColor="#8E8E93"
          iconBg="rgba(142,142,147,0.07)"
          label={lang === 'ar' ? 'الوضع الداكن' : 'Dark Mode'}
          hasBorder
          right={
            <TogglePill on={darkModeOn} onToggle={handleDarkMode} />
          }
        />

        {/* Edit Profile */}
        <SettingRow
          Icon={User}
          iconColor="#8E8E93"
          iconBg="rgba(142,142,147,0.07)"
          label={lang === 'ar' ? 'تعديل الملف الشخصي' : 'Edit Profile'}
          hasBorder={false}
          onClick={() => {
            setProfileDraft({ ...profileData });
            setProfileSaved(false);
            setShowEditProfile((v) => !v);
          }}
          right={
            <motion.span
              animate={{ rotate: showEditProfile ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex' }}
            >
              <Arrow size={14} variant="Outline" color="#CDCDCF" />
            </motion.span>
          }
        />

        {/* inline edit profile form */}
        <AnimatePresence initial={false}>
          {showEditProfile && (
            <motion.div
              key="edit-profile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  padding: '4px 20px 20px',
                  borderTop: '1px solid rgba(0,0,0,0.04)',
                  background: 'rgba(0,0,0,0.01)',
                }}
              >
                {/* full name */}
                <div style={{ marginBottom: 14 }}>
                  <label style={fieldLabelStyle}>
                    {lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                  </label>
                  <input
                    value={profileDraft.name}
                    onChange={set('name')}
                    placeholder="Full Name"
                    style={inputStyle}
                  />
                </div>

                {/* email */}
                <div style={{ marginBottom: 14 }}>
                  <label style={fieldLabelStyle}>
                    {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      value={profileDraft.email}
                      onChange={set('email')}
                      placeholder="email@example.com"
                      inputMode="email"
                      style={{ ...inputStyle, paddingLeft: 40 }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        left: 13,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginTop: 3,
                        display: 'flex',
                      }}
                    >
                      <Sms size={15} variant="Outline" color="#AEAEB2" />
                    </span>
                  </div>
                </div>

                {/* phone */}
                <div style={{ marginBottom: 20 }}>
                  <label style={fieldLabelStyle}>
                    {lang === 'ar' ? 'رقم الهاتف' : 'Phone'}
                  </label>
                  <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    <div
                      style={{
                        height: 48,
                        borderRadius: 14,
                        border: '1px solid rgba(0,0,0,0.06)',
                        background: 'rgba(0,0,0,0.02)',
                        padding: '0 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        flexShrink: 0,
                      }}
                    >
                      <Call size={14} variant="Outline" color="#AEAEB2" />
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: '#3C3C43',
                        }}
                      >
                        +968
                      </span>
                    </div>
                    <input
                      value={profileDraft.phone}
                      onChange={set('phone')}
                      placeholder="9X XXX XXX"
                      inputMode="tel"
                      style={{
                        ...inputStyle,
                        marginTop: 0,
                        flex: 1,
                      }}
                    />
                  </div>
                </div>

                {/* save / cancel */}
                <div style={{ display: 'flex', gap: 10 }}>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSaveProfile}
                    style={{
                      flex: 1,
                      height: 48,
                      borderRadius: 50,
                      background: profileSaved ? '#34C759' : '#7A1E2B',
                      color: '#FFFFFF',
                      fontSize: 14,
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(122,30,43,0.22)',
                      transition: 'background 0.25s ease',
                    }}
                  >
                    {profileSaved
                      ? lang === 'ar'
                        ? 'تم الحفظ'
                        : 'Saved!'
                      : lang === 'ar'
                      ? 'حفظ'
                      : 'Save'}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowEditProfile(false)}
                    style={{
                      flex: 1,
                      height: 48,
                      borderRadius: 50,
                      background: '#FFFFFF',
                      color: '#7A1E2B',
                      fontSize: 14,
                      fontWeight: 700,
                      border: '1.5px solid #7A1E2B',
                      cursor: 'pointer',
                    }}
                  >
                    {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── delete account card ── */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 20,
          padding: '4px 0',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.03)',
        }}
      >
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setDeleteSheetOpen(true)}
          style={{
            width: '100%',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: 'rgba(255,59,48,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Trash size={18} variant="Outline" color="#FF3B30" />
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#FF3B30',
            }}
          >
            {lang === 'ar' ? 'حذف الحساب' : 'Delete Account'}
          </span>
        </motion.button>
      </div>

      {/* ── delete account sheet ── */}
      <DeleteAccountSheet
        isOpen={deleteSheetOpen}
        onClose={() => setDeleteSheetOpen(false)}
        onConfirm={() => {
          setDeleteSheetOpen(false);
          // hook into real auth delete here
        }}
      />

      {/* ── dark mode coming soon toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="dark-toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed',
              bottom: 88,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(28,28,30,0.88)',
              color: '#FFFFFF',
              fontSize: 13,
              fontWeight: 600,
              padding: '10px 22px',
              borderRadius: 50,
              whiteSpace: 'nowrap',
              zIndex: 999,
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.20)',
              letterSpacing: '0.01em',
            }}
          >
            {lang === 'ar' ? 'قريباً...' : 'Coming soon'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
