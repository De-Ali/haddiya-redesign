import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Location, Add, Edit2, Trash, Call, TickCircle, ArrowDown2,
} from 'iconsax-react';
import Badge from '../../components/ui/Badge';
import { useLanguage } from '../../context/LanguageContext';

const CITIES = ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur'];
const CITIES_AR = ['مسقط', 'صلالة', 'صحار', 'نزوى', 'صور'];

const EMPTY_FORM = { label: '', phone: '', street: '', area: '', city: 'Muscat', isDefault: false };

const DEMO_ADDRESSES = [
  {
    id: 1,
    label: 'Home',
    labelAr: 'المنزل',
    phone: '91234567',
    street: 'Villa 45, Al Khuwair',
    area: 'Al Khuwair',
    city: 'Muscat',
    isDefault: true,
  },
  {
    id: 2,
    label: 'Office',
    labelAr: 'المكتب',
    phone: '95678901',
    street: 'Building 12, CBD Area',
    area: 'CBD',
    city: 'Muscat',
    isDefault: false,
  },
];

/* ─── small helper ─── */
function FieldLabel({ children }) {
  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 600,
        color: '#3C3C43',
        display: 'block',
        marginBottom: 6,
      }}
    >
      {children}
    </span>
  );
}

function TextInput({ value, onChange, placeholder, ...rest }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
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
      }}
      {...rest}
    />
  );
}

/* ─── confirm-delete mini overlay ─── */
function DeleteConfirm({ label, onConfirm, onCancel, lang }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      style={{
        background: 'rgba(255,59,48,0.05)',
        border: '1px solid rgba(255,59,48,0.15)',
        borderRadius: 12,
        padding: '10px 14px',
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
      }}
    >
      <span style={{ fontSize: 12, color: '#FF3B30', fontWeight: 500, flex: 1 }}>
        {lang === 'ar'
          ? `حذف "${label}"؟`
          : `Remove "${label}"?`}
      </span>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={onCancel}
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#8E8E93',
            background: 'rgba(0,0,0,0.05)',
            border: 'none',
            borderRadius: 8,
            padding: '5px 12px',
            cursor: 'pointer',
          }}
        >
          {lang === 'ar' ? 'إلغاء' : 'Cancel'}
        </button>
        <button
          onClick={onConfirm}
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#FFFFFF',
            background: '#FF3B30',
            border: 'none',
            borderRadius: 8,
            padding: '5px 12px',
            cursor: 'pointer',
          }}
        >
          {lang === 'ar' ? 'حذف' : 'Delete'}
        </button>
      </div>
    </motion.div>
  );
}

/* ─── main component ─── */
export default function AddressBook() {
  const { lang, isRTL } = useLanguage();

  const [addresses, setAddresses] = useState(DEMO_ADDRESSES);
  const [showForm, setShowForm] = useState(false); // false | 'add' | 'edit'
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [cityOpen, setCityOpen] = useState(false);

  /* ── form helpers ── */
  const openAdd = () => {
    setEditingAddress(null);
    setFormData(EMPTY_FORM);
    setErrors({});
    setShowForm('add');
  };

  const openEdit = (addr) => {
    setEditingAddress(addr);
    setFormData({
      label: addr.label,
      phone: addr.phone,
      street: addr.street,
      area: addr.area,
      city: addr.city,
      isDefault: addr.isDefault,
    });
    setErrors({});
    setShowForm('edit');
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingAddress(null);
    setErrors({});
    setCityOpen(false);
  };

  const set = (key) => (e) =>
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!formData.label.trim()) e.label = true;
    if (!formData.phone.trim()) e.phone = true;
    if (!formData.street.trim()) e.street = true;
    if (!formData.area.trim()) e.area = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const base = {
      label: formData.label.trim(),
      labelAr: formData.label.trim(),
      phone: formData.phone.trim(),
      street: formData.street.trim(),
      area: formData.area.trim(),
      city: formData.city,
      isDefault: formData.isDefault,
    };

    if (showForm === 'add') {
      const newAddr = { id: Date.now(), ...base };
      setAddresses((prev) => {
        const updated = formData.isDefault
          ? prev.map((a) => ({ ...a, isDefault: false }))
          : prev;
        return [...updated, newAddr];
      });
    } else {
      setAddresses((prev) => {
        const updated = formData.isDefault
          ? prev.map((a) => ({ ...a, isDefault: false }))
          : prev;
        return updated.map((a) =>
          a.id === editingAddress.id ? { ...a, ...base } : a
        );
      });
    }

    closeForm();
  };

  const handleDelete = (id) => {
    setAddresses((prev) => {
      const remaining = prev.filter((a) => a.id !== id);
      // if deleted was default, promote first remaining
      if (prev.find((a) => a.id === id)?.isDefault && remaining.length > 0) {
        remaining[0] = { ...remaining[0], isDefault: true };
      }
      return remaining;
    });
    setPendingDeleteId(null);
  };

  const setDefault = (id) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  /* ── city display ── */
  const cityDisplay = (city) => {
    const idx = CITIES.indexOf(city);
    return lang === 'ar' && idx >= 0 ? CITIES_AR[idx] : city;
  };

  /* ── input border helper ── */
  const inputBorder = (key) =>
    errors[key]
      ? '1px solid rgba(255,59,48,0.5)'
      : '1px solid rgba(0,0,0,0.06)';

  return (
    <div
      className="bg-mesh min-h-full px-5 py-4"
      style={{ paddingBottom: 32 }}
    >
      {/* ── address cards ── */}
      <AnimatePresence initial={false}>
        {addresses.map((addr, i) => (
          <motion.div
            key={addr.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ delay: i * 0.04 }}
            style={{ marginBottom: 10 }}
          >
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 18,
                padding: 16,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                border: addr.isDefault
                  ? '1.5px solid rgba(122,30,43,0.18)'
                  : '1px solid rgba(0,0,0,0.03)',
              }}
            >
              {/* header row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <Location size={16} variant="Bold" color="#7A1E2B" />
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#1C1C1E',
                    }}
                  >
                    {lang === 'ar' ? addr.labelAr : addr.label}
                  </span>
                  {addr.isDefault && (
                    <Badge color="accent">
                      {lang === 'ar' ? 'افتراضي' : 'Default'}
                    </Badge>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    onClick={() => openEdit(addr)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.04)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Edit2 size={14} variant="Outline" color="#6B7280" />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    onClick={() =>
                      setPendingDeleteId(
                        pendingDeleteId === addr.id ? null : addr.id
                      )
                    }
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'rgba(255,59,48,0.06)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Trash size={14} variant="Outline" color="#FF3B30" />
                  </motion.button>
                </div>
              </div>

              {/* phone */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  marginBottom: 4,
                }}
              >
                <Call size={12} variant="Outline" color="#AEAEB2" />
                <span style={{ fontSize: 12, color: '#AEAEB2' }}>
                  +968 {addr.phone}
                </span>
              </div>

              {/* address text */}
              <p
                style={{
                  fontSize: 12,
                  color: '#8E8E93',
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {addr.street}, {addr.area}, {cityDisplay(addr.city)}, Oman
              </p>

              {/* set as default */}
              {!addr.isDefault && (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setDefault(addr.id)}
                  style={{
                    marginTop: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <TickCircle size={14} variant="Outline" color="#7A1E2B" />
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#7A1E2B',
                    }}
                  >
                    {lang === 'ar' ? 'تعيين كافتراضي' : 'Set as Default'}
                  </span>
                </motion.button>
              )}

              {/* inline delete confirmation */}
              <AnimatePresence>
                {pendingDeleteId === addr.id && (
                  <DeleteConfirm
                    label={lang === 'ar' ? addr.labelAr : addr.label}
                    onConfirm={() => handleDelete(addr.id)}
                    onCancel={() => setPendingDeleteId(null)}
                    lang={lang}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ── inline form ── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            key="address-form"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              background: '#FFFFFF',
              borderRadius: 20,
              padding: 20,
              boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
              border: '1px solid rgba(0,0,0,0.05)',
              marginBottom: 10,
            }}
          >
            {/* form title */}
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: '#1C1C1E',
                margin: '0 0 18px',
              }}
            >
              {showForm === 'add'
                ? lang === 'ar'
                  ? 'إضافة عنوان جديد'
                  : 'Add New Address'
                : lang === 'ar'
                ? 'تعديل العنوان'
                : 'Edit Address'}
            </h3>

            {/* label */}
            <div style={{ marginBottom: 14 }}>
              <FieldLabel>{lang === 'ar' ? 'التسمية' : 'Label'}</FieldLabel>
              <input
                value={formData.label}
                onChange={set('label')}
                placeholder={lang === 'ar' ? 'مثال: المنزل، المكتب' : 'e.g. Home, Office'}
                style={{
                  width: '100%',
                  height: 48,
                  borderRadius: 14,
                  border: inputBorder('label'),
                  background: '#FFFFFF',
                  padding: '0 14px',
                  fontSize: 14,
                  color: '#1C1C1E',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* phone */}
            <div style={{ marginBottom: 14 }}>
              <FieldLabel>{lang === 'ar' ? 'رقم الهاتف' : 'Phone'}</FieldLabel>
              <div style={{ display: 'flex', gap: 8 }}>
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
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#3C3C43' }}>
                    +968
                  </span>
                </div>
                <input
                  value={formData.phone}
                  onChange={set('phone')}
                  placeholder="9X XXX XXX"
                  inputMode="tel"
                  style={{
                    flex: 1,
                    height: 48,
                    borderRadius: 14,
                    border: inputBorder('phone'),
                    background: '#FFFFFF',
                    padding: '0 14px',
                    fontSize: 14,
                    color: '#1C1C1E',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* street */}
            <div style={{ marginBottom: 14 }}>
              <FieldLabel>
                {lang === 'ar' ? 'الشارع / المبنى' : 'Street / Building'}
              </FieldLabel>
              <TextInput
                value={formData.street}
                onChange={set('street')}
                placeholder={lang === 'ar' ? 'مثال: فيلا 45، الخوير' : 'e.g. Villa 45, Al Khuwair'}
                style={{ border: inputBorder('street') }}
              />
            </div>

            {/* area */}
            <div style={{ marginBottom: 14 }}>
              <FieldLabel>{lang === 'ar' ? 'المنطقة' : 'Area'}</FieldLabel>
              <TextInput
                value={formData.area}
                onChange={set('area')}
                placeholder={lang === 'ar' ? 'مثال: الخوير' : 'e.g. Al Khuwair'}
                style={{ border: inputBorder('area') }}
              />
            </div>

            {/* city dropdown */}
            <div style={{ marginBottom: 14 }}>
              <FieldLabel>{lang === 'ar' ? 'المحافظة' : 'City'}</FieldLabel>
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setCityOpen((v) => !v)}
                  style={{
                    width: '100%',
                    height: 48,
                    borderRadius: cityOpen ? '14px 14px 0 0' : 14,
                    border: '1px solid rgba(0,0,0,0.06)',
                    background: '#FFFFFF',
                    padding: '0 14px',
                    fontSize: 14,
                    color: '#1C1C1E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    textAlign: isRTL ? 'right' : 'left',
                  }}
                >
                  <span>{cityDisplay(formData.city)}</span>
                  <motion.span
                    animate={{ rotate: cityOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex' }}
                  >
                    <ArrowDown2 size={14} variant="Outline" color="#AEAEB2" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {cityOpen && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0.8 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0.8 }}
                      style={{
                        transformOrigin: 'top',
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: '#FFFFFF',
                        border: '1px solid rgba(0,0,0,0.06)',
                        borderTop: 'none',
                        borderRadius: '0 0 14px 14px',
                        zIndex: 20,
                        overflow: 'hidden',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.07)',
                      }}
                    >
                      {CITIES.map((city, idx) => (
                        <button
                          key={city}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, city }));
                            setCityOpen(false);
                          }}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background:
                              formData.city === city
                                ? 'rgba(122,30,43,0.04)'
                                : '#FFFFFF',
                            border: 'none',
                            borderBottom:
                              idx < CITIES.length - 1
                                ? '1px solid rgba(0,0,0,0.04)'
                                : 'none',
                            cursor: 'pointer',
                            fontSize: 14,
                            color:
                              formData.city === city ? '#7A1E2B' : '#1C1C1E',
                            fontWeight: formData.city === city ? 600 : 400,
                            textAlign: isRTL ? 'right' : 'left',
                          }}
                        >
                          <span>
                            {lang === 'ar' ? CITIES_AR[idx] : city}
                          </span>
                          {formData.city === city && (
                            <TickCircle
                              size={15}
                              variant="Bold"
                              color="#7A1E2B"
                            />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* set as default toggle */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  isDefault: !prev.isDefault,
                }))
              }
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: formData.isDefault
                  ? 'rgba(122,30,43,0.04)'
                  : 'rgba(0,0,0,0.02)',
                border: formData.isDefault
                  ? '1px solid rgba(122,30,43,0.14)'
                  : '1px solid rgba(0,0,0,0.05)',
                borderRadius: 14,
                padding: '13px 16px',
                cursor: 'pointer',
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: formData.isDefault ? '#7A1E2B' : '#3C3C43',
                }}
              >
                {lang === 'ar' ? 'تعيين كعنوان افتراضي' : 'Set as default address'}
              </span>
              {/* pill toggle */}
              <div
                style={{
                  width: 44,
                  height: 26,
                  borderRadius: 13,
                  background: formData.isDefault
                    ? '#7A1E2B'
                    : 'rgba(0,0,0,0.10)',
                  position: 'relative',
                  transition: 'background 0.22s ease',
                  flexShrink: 0,
                }}
              >
                <motion.div
                  animate={{
                    x: formData.isDefault ? 18 : 2,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    position: 'absolute',
                    top: 2,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
                  }}
                />
              </div>
            </motion.button>

            {/* error hint */}
            {Object.keys(errors).length > 0 && (
              <p
                style={{
                  fontSize: 12,
                  color: '#FF3B30',
                  marginBottom: 12,
                  marginTop: -8,
                }}
              >
                {lang === 'ar'
                  ? 'يرجى تعبئة الحقول المطلوبة'
                  : 'Please fill in all required fields.'}
              </p>
            )}

            {/* save / cancel */}
            <div style={{ display: 'flex', gap: 10 }}>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 50,
                  background: '#7A1E2B',
                  color: '#FFFFFF',
                  fontSize: 14,
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.01em',
                  boxShadow: '0 4px 14px rgba(122,30,43,0.28)',
                }}
              >
                {lang === 'ar' ? 'حفظ' : 'Save'}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={closeForm}
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
                  letterSpacing: '0.01em',
                }}
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── add new address button ── */}
      {!showForm && (
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={openAdd}
          style={{
            width: '100%',
            background: '#FFFFFF',
            borderRadius: 18,
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 7,
            fontSize: 13,
            fontWeight: 700,
            color: '#7A1E2B',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            border: '1px solid rgba(0,0,0,0.03)',
            cursor: 'pointer',
          }}
        >
          <Add size={17} variant="Outline" color="#7A1E2B" />
          {lang === 'ar' ? 'إضافة عنوان جديد' : 'Add New Address'}
        </motion.button>
      )}
    </div>
  );
}
