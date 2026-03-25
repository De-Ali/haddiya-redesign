import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash, Add, Minus, ShoppingBag, ArrowRight2, TicketDiscount } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { vendors } from '../../data/vendors';

export default function CartPage() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();

  const tax = cartTotal * 0.05;
  const discount = 0;
  const total = cartTotal + tax - discount;

  const grouped = cartItems.reduce((acc, item) => {
    const vid = item.vendorId || 0;
    if (!acc[vid]) acc[vid] = [];
    acc[vid].push(item);
    return acc;
  }, {});

  /* ── Empty state ─────────────────────────────────────────────────────── */
  if (cartItems.length === 0) {
    return (
      <div
        className="flex-1 flex flex-col items-center justify-center px-5"
        style={{ minHeight: 'calc(100vh - 180px)', background: '#FAF8F5' }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(122,30,43,0.06)' }}
          >
            <ShoppingBag size={32} variant="Outline" color="#7A1E2B" />
          </div>
          <h3
            className="text-[16px] font-semibold mb-1"
            style={{ color: '#1A1A1A' }}
          >
            {lang === 'ar' ? 'سلتك فارغة' : 'Your cart is empty'}
          </h3>
          <p className="text-[13px] mb-6" style={{ color: '#8A7A70' }}>
            {t?.cart?.empty ?? (lang === 'ar' ? 'أضف بعض المنتجات للبدء' : 'Add some items to get started')}
          </p>
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 px-6 h-[48px] rounded-[50px] text-[14px] font-semibold active:scale-95 transition-transform mx-auto"
            style={{ background: '#D4AF37', color: '#1A1A1A' }}
          >
            <span>{lang === 'ar' ? 'تسوق الآن' : 'Start Shopping'}</span>
            <ArrowRight2 size={16} variant="Outline" color="#1A1A1A" />
          </button>
        </motion.div>
      </div>
    );
  }

  /* ── Main cart ───────────────────────────────────────────────────────── */
  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', paddingBottom: '180px' }}>

      {/* ── Scrollable content ── */}
      <div className="px-4 pt-4">

        <AnimatePresence>
          {Object.entries(grouped).map(([vendorId, items]) => {
            const vendor = vendors.find(v => v.id === Number(vendorId));
            return (
              <div key={vendorId} className="mb-4">

                {/* Vendor label */}
                {vendor && (
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <img
                      src={vendor.logo}
                      alt=""
                      className="w-5 h-5 rounded-md object-cover"
                    />
                    <span
                      className="text-[12px] font-semibold"
                      style={{ color: '#3C3C43' }}
                    >
                      {lang === 'ar' ? vendor.nameAr : vendor.name}
                    </span>
                  </div>
                )}

                {/* Cart item cards */}
                {items.map(item => (
                  <motion.div
                    key={`${item.id}-${item.variant}`}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -80 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      background: '#FFFFFF',
                      borderRadius: 16,
                      padding: 12,
                      marginBottom: 8,
                      boxShadow: '0px 4px 24px rgba(0,0,0,0.07)',
                    }}
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 12,
                        objectFit: 'cover',
                        flexShrink: 0,
                        background: '#EDE8E1',
                      }}
                    />

                    {/* Content column */}
                    <div
                      style={{
                        flex: 1,
                        marginLeft: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                      }}
                    >
                      {/* Product name */}
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: '#1A1A1A',
                          lineHeight: 1.35,
                          marginBottom: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          paddingRight: 28,
                        }}
                      >
                        {lang === 'ar' ? item.nameAr : item.name}
                      </p>

                      {/* Variant */}
                      {item.variant && (
                        <p
                          style={{
                            fontSize: 12,
                            color: '#8A7A70',
                            marginTop: 2,
                          }}
                        >
                          {item.variant}
                        </p>
                      )}

                      {/* Bottom row: price + stepper */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: 10,
                        }}
                      >
                        {/* Price */}
                        <p
                          style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: '#D4AF37',
                          }}
                        >
                          {item.price.toFixed(3)}{' '}
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 500,
                              color: '#8A7A70',
                            }}
                          >
                            OMR
                          </span>
                        </p>

                        {/* Quantity stepper */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >
                          <button
                            onClick={() =>
                              updateQty(item.id, Math.max(1, item.qty - 1), item.variant)
                            }
                            style={{
                              width: 28,
                              height: 28,
                              border: '1px solid #7A1E2B',
                              borderRadius: 8,
                              background: 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            <Minus size={12} variant="Outline" color="#7A1E2B" />
                          </button>

                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: '#1A1A1A',
                              minWidth: 20,
                              textAlign: 'center',
                            }}
                          >
                            {item.qty}
                          </span>

                          <button
                            onClick={() =>
                              updateQty(item.id, item.qty + 1, item.variant)
                            }
                            style={{
                              width: 28,
                              height: 28,
                              border: '1px solid #7A1E2B',
                              borderRadius: 8,
                              background: 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            <Add size={12} variant="Outline" color="#7A1E2B" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Trash icon — absolute top right */}
                    <button
                      onClick={() => removeFromCart(item.id, item.variant)}
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        width: 28,
                        height: 28,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                      className="active:scale-90 transition-transform"
                    >
                      <Trash size={16} variant="Outline" color="#8A7A70" />
                    </button>
                  </motion.div>
                ))}
              </div>
            );
          })}
        </AnimatePresence>

        {/* Coupon row */}
        <button
          className="w-full flex items-center gap-3 active:scale-[0.99] transition-transform"
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '12px 14px',
            marginBottom: 12,
            boxShadow: '0px 4px 24px rgba(0,0,0,0.07)',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <TicketDiscount size={18} variant="Outline" color="#D4AF37" />
          <span style={{ fontSize: 13, fontWeight: 500, color: '#3C3C43' }}>
            {t?.cart?.coupon ?? (lang === 'ar' ? 'إضافة كوبون خصم' : 'Add coupon code')}
          </span>
        </button>

        {/* ── Order Summary card ── */}
        <div style={{ marginBottom: 8 }}>
          {/* Header */}
          <div
            style={{
              background: '#7A1E2B',
              padding: '12px 16px',
              borderRadius: '12px 12px 0 0',
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#FFFFFF',
              }}
            >
              {lang === 'ar' ? 'ملخص الطلب' : 'Order Summary'}
            </span>
          </div>

          {/* Body */}
          <div
            style={{
              background: '#FFFFFF',
              padding: 16,
              borderRadius: '0 0 12px 12px',
            }}
          >
            {/* Subtotal */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <span style={{ fontSize: 14, color: '#1A1A1A' }}>
                {t?.cart?.subtotal ?? (lang === 'ar' ? 'المجموع الفرعي' : 'Subtotal')}
              </span>
              <span style={{ fontSize: 14, color: '#1A1A1A', fontWeight: 500 }}>
                {cartTotal.toFixed(3)} OMR
              </span>
            </div>

            {/* Tax */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <span style={{ fontSize: 14, color: '#1A1A1A' }}>
                {t?.cart?.tax ?? (lang === 'ar' ? 'الضريبة (5%)' : 'Tax (5%)')}
              </span>
              <span style={{ fontSize: 14, color: '#1A1A1A', fontWeight: 500 }}>
                {tax.toFixed(3)} OMR
              </span>
            </div>

            {/* Discount row (only if discount > 0) */}
            {discount > 0 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <span style={{ fontSize: 14, color: '#1A1A1A' }}>
                  {lang === 'ar' ? 'الخصم' : 'Discount'}
                </span>
                <span style={{ fontSize: 14, color: '#D4AF37', fontWeight: 600 }}>
                  -{discount.toFixed(3)} OMR
                </span>
              </div>
            )}

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: '#EDE8E1',
                marginBottom: 12,
              }}
            />

            {/* Total */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>
                {t?.cart?.total ?? (lang === 'ar' ? 'الإجمالي' : 'Total')}
              </span>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>
                {total.toFixed(3)} OMR
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky bottom bar ── */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 430,
          background: '#FFFFFF',
          boxShadow: '0px -2px 12px rgba(0,0,0,0.08)',
          padding: '16px 16px 96px 16px',
          zIndex: 50,
        }}
      >
        <button
          onClick={() => navigate('/checkout')}
          className="active:scale-[0.98] transition-transform"
          style={{
            width: '100%',
            height: 52,
            borderRadius: 50,
            background: '#D4AF37',
            color: '#1A1A1A',
            fontSize: 15,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <span>
            {t?.cart?.checkout ?? (lang === 'ar' ? 'المتابعة للدفع' : 'Proceed to Checkout')}
          </span>
          <ArrowRight2 size={18} variant="Outline" color="#1A1A1A" />
        </button>
      </div>
    </div>
  );
}
