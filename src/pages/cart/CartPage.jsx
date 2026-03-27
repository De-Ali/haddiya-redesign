import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash, Add, Minus, ShoppingBag, ArrowRight2,
  TicketDiscount, Star1, Gift, CloseCircle, Edit2,
} from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { vendors } from '../../data/vendors';

export default function CartPage() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { isLoggedIn } = useAuth();
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMsg, setCouponMsg] = useState('');
  const [sendAsGift, setSendAsGift] = useState(false);

  const discount = appliedCoupon ? cartTotal * 0.2 : 0;
  const subtotal = cartTotal;
  const total = subtotal - discount;

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'MUBARAK20') {
      setAppliedCoupon('MUBARAK20');
      setCouponMsg(`Coupon discounted ${(cartTotal * 0.2).toFixed(3)} OMR`);
    } else {
      setCouponMsg(lang === 'ar' ? 'كوبون غير صالح' : 'Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponMsg('');
  };

  const grouped = cartItems.reduce((acc, item) => {
    const vid = item.vendorId || 0;
    if (!acc[vid]) acc[vid] = [];
    acc[vid].push(item);
    return acc;
  }, {});

  /* ── Empty / Not logged in ── */
  if (cartItems.length === 0) {
    return (
      <div
        className="flex-1 flex flex-col items-center justify-center px-6"
        style={{ minHeight: 'calc(100dvh - 160px)', background: '#FAF8F5' }}
      >
        {!isLoggedIn ? (
          <>
            <img
              src={`${import.meta.env.BASE_URL}haddiya-logo.png`}
              alt="Haddiya"
              className="w-[100px] h-[100px] object-contain mb-6"
            />
            <button
              onClick={() => navigate('/login')}
              className="w-full max-w-[280px] h-[52px] rounded-2xl text-[15px] font-bold active:scale-[0.98] transition-transform"
              style={{ background: '#7A1E2B', color: '#FFFFFF', boxShadow: '0 4px 16px rgba(122,30,43,0.25)' }}
            >
              {lang === 'ar' ? 'تسجيل / دخول' : 'Register / Login'}
            </button>
          </>
        ) : (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(122,30,43,0.06)' }}>
              <ShoppingBag size={32} variant="Outline" color="#7A1E2B" />
            </div>
            <h3 className="text-[16px] font-semibold mb-1" style={{ color: '#1A1A1A' }}>
              {lang === 'ar' ? 'سلتك فارغة' : 'Your cart is empty'}
            </h3>
            <p className="text-[13px] mb-6" style={{ color: '#8A7A70' }}>
              {lang === 'ar' ? 'أضف بعض المنتجات للبدء' : 'Add some items to get started'}
            </p>
            <button
              onClick={() => navigate('/home')}
              className="flex items-center gap-2 px-6 h-[48px] rounded-full text-[14px] font-semibold active:scale-95 transition-transform mx-auto"
              style={{ background: '#D4AF37', color: '#1A1A1A' }}
            >
              {lang === 'ar' ? 'تسوق الآن' : 'Start Shopping'}
              <ArrowRight2 size={16} variant="Outline" color="#1A1A1A" />
            </button>
          </motion.div>
        )}
      </div>
    );
  }

  /* ── Main cart ── */
  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', paddingBottom: '140px' }}>
      <div className="px-4 pt-4">

        {/* ── Cart items grouped by vendor ── */}
        <AnimatePresence>
          {Object.entries(grouped).map(([vendorId, items]) => {
            const vendor = vendors.find(v => v.id === Number(vendorId));
            return (
              <div key={vendorId} className="mb-4">
                {vendor && (
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <img src={vendor.logo} alt="" className="w-5 h-5 rounded-md object-cover" />
                    <span className="text-[12px] font-semibold" style={{ color: '#3C3C43' }}>
                      {lang === 'ar' ? vendor.nameAr : vendor.name}
                    </span>
                  </div>
                )}
                {items.map(item => (
                  <motion.div
                    key={`${item.id}-${item.variant}`}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -80 }}
                    style={{
                      position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 12,
                      background: '#FFFFFF', borderRadius: 16, padding: 12, marginBottom: 8,
                      border: '1px solid #EDE8E1',
                    }}
                  >
                    <img src={item.image} alt={item.name} style={{ width: 70, height: 70, borderRadius: 12, objectFit: 'cover', flexShrink: 0, background: '#EDE8E1' }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.35, marginBottom: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {lang === 'ar' ? item.nameAr : item.name}
                      </p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: '#7A1E2B', marginTop: 4 }}>
                        {item.price.toFixed(3)} <span style={{ fontSize: 11, fontWeight: 500, color: '#8A7A70' }}>OMR</span>
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                        <button onClick={() => updateQty(item.id, item.qty + 1, item.variant)} style={{ width: 30, height: 30, border: '1px solid #EDE8E1', borderRadius: 8, background: '#FAF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                          <Add size={14} variant="Outline" color="#1A1A1A" />
                        </button>
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                        <button onClick={() => removeFromCart(item.id, item.variant)} style={{ width: 30, height: 30, border: '1px solid #EDE8E1', borderRadius: 8, background: '#FAF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                          <Trash size={14} variant="Outline" color="#C0392B" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            );
          })}
        </AnimatePresence>

        {/* ── Points Earned ── */}
        <div style={{ background: '#FFFFFF', border: '1px solid #EDE8E1', borderRadius: 16, padding: 14, marginBottom: 12 }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(122,30,43,0.08)' }}>
                <Star1 size={16} variant="Bold" color="#7A1E2B" />
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>
                {lang === 'ar' ? 'النقاط المكتسبة' : 'Points Earned'}
              </span>
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#7A1E2B' }}>
              0 {lang === 'ar' ? 'نقطة' : 'Points'}
            </span>
          </div>
          <div style={{ height: 1, background: '#EDE8E1', margin: '8px 0' }} />
          <p style={{ fontSize: 12, color: '#8A7A70', lineHeight: 1.5 }}>
            {lang === 'ar' ? 'يرجى تسجيل الدخول لعرض نقاطك والاستفادة منها' : 'Please login to view your points and benefit from them'}
          </p>
        </div>

        {/* ── Discount Coupon ── */}
        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>
            {lang === 'ar' ? 'كوبون خصم' : 'Discount Coupon'}
          </p>
          {appliedCoupon ? (
            <div style={{ background: '#FFFFFF', border: '1px solid #7A1E2B', borderRadius: 16, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{appliedCoupon}</span>
              <button onClick={removeCoupon} className="active:scale-90 transition-transform">
                <CloseCircle size={20} variant="Outline" color="#8A7A70" />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={couponCode}
                onChange={e => setCouponCode(e.target.value.toUpperCase())}
                placeholder={lang === 'ar' ? 'أدخل الكوبون' : 'Enter coupon code'}
                style={{ flex: 1, background: '#FFFFFF', border: '1px solid #EDE8E1', borderRadius: 16, padding: '12px 16px', fontSize: 14, fontWeight: 500, color: '#1A1A1A', outline: 'none' }}
              />
              <button
                onClick={applyCoupon}
                className="active:scale-95 transition-transform"
                style={{ padding: '0 20px', background: '#7A1E2B', color: '#FFFFFF', borderRadius: 16, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer' }}
              >
                {lang === 'ar' ? 'تطبيق' : 'Apply'}
              </button>
            </div>
          )}
          {couponMsg && (
            <p style={{ fontSize: 12, fontWeight: 500, color: appliedCoupon ? '#2D6A4F' : '#C0392B', marginTop: 6, paddingLeft: 4 }}>
              {couponMsg}
            </p>
          )}
        </div>

        {/* ── Send as Gift ── */}
        <button
          onClick={() => navigate('/send-as-gift')}
          className="w-full active:scale-[0.99] transition-transform"
          style={{
            background: '#FFFFFF', border: '1px solid #EDE8E1', borderRadius: 16,
            padding: '14px 16px', marginBottom: 12, display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 500, color: '#3C3C43' }}>
            {lang === 'ar' ? 'إرسال كهدية' : 'Send as a gift'}
          </span>
          <Edit2 size={18} variant="Outline" color="#7A1E2B" />
        </button>

        {/* ── Order Summary ── */}
        <div style={{ background: '#F5F0EB', borderRadius: 16, padding: 16, marginBottom: 8 }}>
          <div className="flex justify-between mb-2">
            <span style={{ fontSize: 13, color: '#8A7A70' }}>
              {lang === 'ar' ? `المجموع الفرعي (${cartItems.length} منتج)` : `Sub total (product ${cartItems.length})`}
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{subtotal.toFixed(3)} OMR</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between mb-2">
              <span style={{ fontSize: 13, color: '#8A7A70' }}>{lang === 'ar' ? 'الخصم' : 'Discount'}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#2D6A4F' }}>-{discount.toFixed(3)} OMR</span>
            </div>
          )}
          <div style={{ height: 1, background: '#EDE8E1', margin: '8px 0' }} />
          <div className="flex justify-between">
            <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>{lang === 'ar' ? 'الإجمالي' : 'Total'}</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#7A1E2B' }}>{total.toFixed(3)} OMR</span>
          </div>
        </div>
      </div>

      {/* ── Sticky Checkout Button ── */}
      <div style={{ position: 'fixed', bottom: 72, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, padding: '12px 16px', background: 'linear-gradient(to top, #FAF8F5 80%, transparent)', zIndex: 40 }}>
        <button
          onClick={() => navigate('/checkout')}
          className="active:scale-[0.98] transition-transform"
          style={{ width: '100%', height: 52, borderRadius: 50, background: '#7A1E2B', color: '#FFFFFF', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(122,30,43,0.25)' }}
        >
          {lang === 'ar' ? 'المتابعة للدفع' : 'Proceed to Checkout'}
          <ArrowRight2 size={18} variant="Outline" color="#FFFFFF" />
        </button>
      </div>
    </div>
  );
}
