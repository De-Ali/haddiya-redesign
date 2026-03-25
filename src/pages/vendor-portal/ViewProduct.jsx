import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash, Eye, TrendUp, DollarCircle, TickCircle, CloseCircle, ArrowRight2 } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { products } from '../../data/products';

// ─── constants ───────────────────────────────────────────────────────────────

const GOLD   = '#D4AF37';
const MAROON = '#7A1E2B';
const DARK   = '#1C1C1E';
const MUTED  = '#AEAEB2';

const STATUS_META = {
  Live:     { color: '#34C759', bg: 'rgba(52,199,89,0.08)',    Icon: TickCircle  },
  Pending:  { color: '#FF9500', bg: 'rgba(255,149,0,0.08)',    Icon: Eye         },
  Rejected: { color: '#FF3B30', bg: 'rgba(255,59,48,0.08)',    Icon: CloseCircle },
};

// mock per-product status / analytics keyed by product index (0-based)
const MOCK_STATUS   = ['Live', 'Pending', 'Live', 'Rejected', 'Live'];
const MOCK_VIEWS    = [234, 281, 328, 375, 422];
const MOCK_SALES    = [12,  15,  18,  21,  24];

// ─── helpers ─────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, iconColor, iconBg, label, value }) {
  return (
    <div
      className="flex-1 rounded-[16px] p-3.5 flex flex-col gap-1"
      style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: iconBg }}>
        <Icon size={15} variant="Bold" color={iconColor} />
      </div>
      <p className="text-[18px] font-bold mt-1" style={{ color: DARK }}>{value}</p>
      <p className="text-[10px]" style={{ color: MUTED }}>{label}</p>
    </div>
  );
}

function DeleteModal({ productName, onConfirm, onCancel, lang }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70]"
        style={{ background: 'rgba(0,0,0,0.4)' }}
        onClick={onCancel}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{ opacity: 0, scale: 0.88, y: 20 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[71] bg-white rounded-[24px] p-6 w-[85vw] max-w-[300px] text-center"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(255,59,48,0.08)' }}
        >
          <Trash size={24} variant="Outline" color="#FF3B30" />
        </div>
        <h3 className="text-[16px] font-bold mb-1" style={{ color: DARK }}>
          {lang === 'ar' ? 'حذف المنتج؟' : 'Delete Product?'}
        </h3>
        <p className="text-[12px] mb-1" style={{ color: MUTED }}>
          {productName}
        </p>
        <p className="text-[11px] mb-5" style={{ color: MUTED }}>
          {lang === 'ar' ? 'لا يمكن التراجع عن هذا الإجراء.' : 'This action cannot be undone.'}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 h-[44px] rounded-xl text-[13px] font-semibold"
            style={{ background: '#F0F0F0', color: DARK }}
          >
            {lang === 'ar' ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-[44px] rounded-xl text-[13px] font-bold"
            style={{ background: '#FF3B30', color: '#fff', boxShadow: '0 4px 12px rgba(255,59,48,0.28)' }}
          >
            {lang === 'ar' ? 'حذف' : 'Delete'}
          </button>
        </div>
      </motion.div>
    </>
  );
}

// ─── main component ──────────────────────────────────────────────────────────

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // find product by id (string comparison safety)
  const productIndex = products.findIndex((p) => String(p.id) === String(id));
  const product = products[productIndex];

  if (!product) {
    return (
      <div className="bg-mesh min-h-full flex flex-col items-center justify-center px-5">
        <p className="text-[15px] font-semibold mb-4" style={{ color: MUTED }}>
          {lang === 'ar' ? 'المنتج غير موجود' : 'Product not found'}
        </p>
        <button
          onClick={() => navigate('/vendor-portal/products')}
          className="h-[44px] px-6 rounded-2xl text-[13px] font-bold"
          style={{ background: MAROON, color: '#fff' }}
        >
          {lang === 'ar' ? 'العودة' : 'Go Back'}
        </button>
      </div>
    );
  }

  const statusKey  = MOCK_STATUS[productIndex % MOCK_STATUS.length] || 'Live';
  const views      = MOCK_VIEWS[productIndex % MOCK_VIEWS.length];
  const sales      = MOCK_SALES[productIndex % MOCK_SALES.length];
  const revenue    = (product.price * sales).toFixed(3);
  const statusMeta = STATUS_META[statusKey];
  const name       = lang === 'ar' ? product.nameAr : product.name;
  const description = lang === 'ar' ? product.descriptionAr : product.description;

  const handleDelete = () => {
    setShowDeleteModal(false);
    navigate('/vendor-portal/products');
  };

  return (
    <div className="bg-mesh min-h-full pb-8">
      {/* Back button row */}
      <div className="flex items-center gap-3 px-5 pt-4 mb-4">
        <button
          onClick={() => navigate('/vendor-portal/products')}
          className="w-9 h-9 rounded-xl flex items-center justify-center active:scale-95 transition-transform"
          style={{ background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}
        >
          <ArrowRight2 size={16} variant="Outline" color={DARK} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <h2 className="text-[16px] font-bold flex-1 truncate" style={{ color: DARK }}>
          {lang === 'ar' ? 'تفاصيل المنتج' : 'Product Details'}
        </h2>
      </div>

      {/* Hero image */}
      <div className="px-5 mb-4">
        <div className="w-full rounded-[22px] overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
          <img
            src={product.image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="px-5 space-y-4">
        {/* Name + status */}
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-[18px] font-bold leading-snug flex-1" style={{ color: DARK }}>
            {name}
          </h1>
          <span
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold flex-shrink-0"
            style={{ background: statusMeta.bg, color: statusMeta.color }}
          >
            <statusMeta.Icon size={12} variant="Bold" color={statusMeta.color} />
            {statusKey}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-[22px] font-bold" style={{ color: GOLD }}>
            {product.price.toFixed(3)}
          </span>
          <span className="text-[13px] font-medium" style={{ color: MUTED }}>OMR</span>
          {product.originalPrice && (
            <span
              className="text-[13px] line-through"
              style={{ color: MUTED }}
            >
              {product.originalPrice.toFixed(3)}
            </span>
          )}
        </div>

        {/* Stats row */}
        <div className="flex gap-3">
          <StatCard
            icon={Eye}
            iconColor="#007AFF"
            iconBg="rgba(0,122,255,0.08)"
            label={lang === 'ar' ? 'المشاهدات' : 'Views'}
            value={views.toLocaleString()}
          />
          <StatCard
            icon={TrendUp}
            iconColor={MAROON}
            iconBg="rgba(122,30,43,0.08)"
            label={lang === 'ar' ? 'المبيعات' : 'Sales'}
            value={sales}
          />
          <StatCard
            icon={DollarCircle}
            iconColor={GOLD}
            iconBg="rgba(212,175,55,0.10)"
            label={lang === 'ar' ? 'الإيرادات' : 'Revenue'}
            value={`${revenue}`}
          />
        </div>

        {/* Description */}
        {description && (
          <div
            className="bg-white rounded-[18px] p-4"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}
          >
            <p className="text-[11px] font-semibold uppercase mb-2" style={{ color: MUTED, letterSpacing: '0.06em' }}>
              {lang === 'ar' ? 'الوصف' : 'Description'}
            </p>
            <p className="text-[13px] leading-relaxed" style={{ color: DARK }}>
              {description}
            </p>
          </div>
        )}

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <div
            className="bg-white rounded-[18px] p-4"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}
          >
            <p className="text-[11px] font-semibold uppercase mb-3" style={{ color: MUTED, letterSpacing: '0.06em' }}>
              {lang === 'ar' ? 'المتغيرات' : 'Variants'}
            </p>
            {product.variants.map((variant, i) => (
              <div key={i} className={i > 0 ? 'mt-3' : ''}>
                <p className="text-[12px] font-semibold mb-2" style={{ color: DARK }}>
                  {variant.type}
                </p>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map((opt) => (
                    <span
                      key={opt}
                      className="px-3 py-1.5 rounded-xl text-[11px] font-medium"
                      style={{
                        background: 'rgba(122,30,43,0.06)',
                        color: MAROON,
                        border: '1px solid rgba(122,30,43,0.12)',
                      }}
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stock status */}
        <div
          className="bg-white rounded-[18px] p-4 flex items-center justify-between"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}
        >
          <p className="text-[13px] font-semibold" style={{ color: DARK }}>
            {lang === 'ar' ? 'حالة المخزون' : 'Stock Status'}
          </p>
          <span
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold"
            style={{
              background: product.inStock ? 'rgba(52,199,89,0.08)' : 'rgba(255,59,48,0.08)',
              color: product.inStock ? '#34C759' : '#FF3B30',
            }}
          >
            {product.inStock
              ? (lang === 'ar' ? 'متوفر' : 'In Stock')
              : (lang === 'ar' ? 'نفذ المخزون' : 'Out of Stock')}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={() => navigate('/vendor-portal/add-product')}
            className="flex-1 h-[50px] rounded-2xl text-[14px] font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            style={{ background: MAROON, color: '#fff', boxShadow: '0 4px 14px rgba(122,30,43,0.28)' }}
          >
            <Edit2 size={17} variant="Outline" color="#fff" />
            {lang === 'ar' ? 'تعديل المنتج' : 'Edit Product'}
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex-1 h-[50px] rounded-2xl text-[14px] font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            style={{ background: 'rgba(255,59,48,0.08)', color: '#FF3B30', border: '1px solid rgba(255,59,48,0.15)' }}
          >
            <Trash size={17} variant="Outline" color="#FF3B30" />
            {lang === 'ar' ? 'حذف' : 'Delete'}
          </button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteModal
            productName={name}
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteModal(false)}
            lang={lang}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
