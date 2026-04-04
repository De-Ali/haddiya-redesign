import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchNormal1, TickCircle, Clock, Box1, TruckFast, ArrowRight2 } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { products } from '../../data/products';

// ─── helpers ────────────────────────────────────────────────────────────────

const findProduct = (id) => products.find((p) => p.id === id) || {};

const STATUS_META = {
  New:        { color: '#7A1E2B', bg: 'rgba(122,30,43,0.08)',   dot: '#7A1E2B'  },
  Processing: { color: '#FF9500', bg: 'rgba(255,149,0,0.08)',   dot: '#FF9500'  },
  Shipped:    { color: '#007AFF', bg: 'rgba(0,122,255,0.08)',   dot: '#007AFF'  },
  Delivered:  { color: '#34C759', bg: 'rgba(52,199,89,0.08)',   dot: '#34C759'  },
};

const GOLD = '#D4AF37';
const MAROON = '#7A1E2B';
const DARK = '#1C1C1E';
const MUTED = '#AEAEB2';

const TABS = ['All', 'New', 'Processing', 'Shipped', 'Delivered'];

const INITIAL_ORDERS = [
  {
    id: 'HD-101',
    customer: 'Sara Al-Balushi',
    phone: '+968 9123 4567',
    address: 'Al Khuwair, Muscat, Oman',
    date: '2026-03-25',
    status: 'New',
    items: [
      { productId: 1, qty: 1, variant: '100ml' },
      { productId: 2, qty: 1, variant: 'Pink'  },
    ],
    shipping: 2.0,
  },
  {
    id: 'HD-098',
    customer: 'Mohammed Al-Harthy',
    phone: '+968 9234 5678',
    address: 'Ruwi, Muscat, Oman',
    date: '2026-03-24',
    status: 'Processing',
    items: [
      { productId: 4, qty: 1, variant: 'Gold' },
    ],
    shipping: 2.0,
  },
  {
    id: 'HD-095',
    customer: 'Fatima Al-Rawahi',
    phone: '+968 9345 6789',
    address: 'Seeb, Muscat, Oman',
    date: '2026-03-22',
    status: 'Shipped',
    items: [
      { productId: 3, qty: 1, variant: null  },
      { productId: 6, qty: 2, variant: 'Large' },
    ],
    shipping: 0,
  },
  {
    id: 'HD-090',
    customer: 'Ibrahim Al Hadrami',
    phone: '+968 9456 7890',
    address: 'Nizwa, Ad Dakhiliyah, Oman',
    date: '2026-03-19',
    status: 'Delivered',
    items: [
      { productId: 4, qty: 1, variant: 'Rose Gold' },
    ],
    shipping: 2.0,
  },
  {
    id: 'HD-088',
    customer: 'Hessa Al-Busaidi',
    phone: '+968 9567 8901',
    address: 'Sohar, Al Batinah, Oman',
    date: '2026-03-18',
    status: 'New',
    items: [
      { productId: 5, qty: 1, variant: 'Leather' },
    ],
    shipping: 2.0,
  },
];

// ─── sub-components ─────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const meta = STATUS_META[status] || STATUS_META.New;
  return (
    <span
      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold"
      style={{ background: meta.bg, color: meta.color }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: meta.dot }}
      />
      {status}
    </span>
  );
}

function OrderTimeline({ status }) {
  const steps = [
    { Icon: Clock,      label: 'Order Placed', labelAr: 'تم الطلب' },
    { Icon: Box1,       label: 'Processing',   labelAr: 'قيد المعالجة' },
    { Icon: TruckFast,  label: 'Shipped',      labelAr: 'تم الشحن' },
    { Icon: TickCircle, label: 'Delivered',    labelAr: 'تم التوصيل' },
  ];
  const statusIndex = { New: 0, Processing: 1, Shipped: 2, Delivered: 3 };
  const current = statusIndex[status] ?? 0;

  return (
    <div className="space-y-0">
      {steps.map((step, i) => {
        const done = i <= current;
        return (
          <div key={i} className="flex gap-3.5">
            <div className="flex flex-col items-center">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: done ? MAROON : 'rgba(0,0,0,0.05)' }}
              >
                <step.Icon size={16} variant={done ? 'Bold' : 'Outline'} color={done ? '#FFFFFF' : MUTED} />
              </div>
              {i < steps.length - 1 && (
                <div
                  className="w-[2px] h-8 rounded-full"
                  style={{ background: done ? MAROON : 'rgba(0,0,0,0.06)' }}
                />
              )}
            </div>
            <div className="pb-5">
              <p className="text-[12px] font-semibold" style={{ color: done ? DARK : MUTED }}>
                {step.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── order detail view ───────────────────────────────────────────────────────

function OrderDetailView({ order, onBack, onUpdateStatus, lang }) {
  const subtotal = order.items.reduce((sum, item) => {
    const p = findProduct(item.productId);
    return sum + (p.price || 0) * item.qty;
  }, 0);
  const total = subtotal + order.shipping;

  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.22 }}
      className="px-5 py-4 space-y-3"
    >
      {/* Back link + Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 mb-2 active:opacity-60 transition-opacity"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <ArrowRight2 size={14} variant="Outline" color={MAROON} style={{ transform: 'rotate(180deg)' }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: MAROON }}>{lang === 'ar' ? 'العودة للطلبات' : 'Back to orders'}</span>
      </button>
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-[15px] font-bold" style={{ color: DARK }}>#{order.id}</h2>
          <p className="text-[11px]" style={{ color: MUTED }}>{order.date}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Customer info */}
      <div
        className="bg-white rounded-[18px] p-4"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}
      >
        <p className="text-[11px] font-semibold uppercase mb-3" style={{ color: MUTED, letterSpacing: '0.06em' }}>
          {lang === 'ar' ? 'معلومات العميل' : 'Customer Info'}
        </p>
        <p className="text-[13px] font-bold mb-1" style={{ color: DARK }}>{order.customer}</p>
        <p className="text-[12px] mb-1" style={{ color: MUTED }}>{order.phone}</p>
        <p className="text-[12px]" style={{ color: MUTED }}>{order.address}</p>
      </div>

      {/* Order items */}
      <div
        className="bg-white rounded-[18px] p-4"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}
      >
        <p className="text-[11px] font-semibold uppercase mb-3" style={{ color: MUTED, letterSpacing: '0.06em' }}>
          {lang === 'ar' ? 'المنتجات' : 'Order Items'}
        </p>
        <div className="space-y-3">
          {order.items.map((item, i) => {
            const p = findProduct(item.productId);
            return (
              <div key={i} className="flex items-center gap-3">
                <img
                  src={p.image}
                  alt=""
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  style={{ background: '#F5F0E8' }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold truncate" style={{ color: DARK }}>
                    {lang === 'ar' ? p.nameAr : p.name}
                  </p>
                  {item.variant && (
                    <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>{item.variant}</p>
                  )}
                  <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>x{item.qty}</p>
                </div>
                <span className="text-[13px] font-bold" style={{ color: GOLD }}>
                  {((p.price || 0) * item.qty).toFixed(3)} OMR
                </span>
              </div>
            );
          })}
        </div>

        {/* Price breakdown */}
        <div
          className="mt-4 pt-4 space-y-2"
          style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}
        >
          <div className="flex justify-between">
            <span className="text-[12px]" style={{ color: MUTED }}>
              {lang === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}
            </span>
            <span className="text-[12px] font-semibold" style={{ color: DARK }}>
              {subtotal.toFixed(3)} OMR
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[12px]" style={{ color: MUTED }}>
              {lang === 'ar' ? 'الشحن' : 'Shipping'}
            </span>
            <span className="text-[12px] font-semibold" style={{ color: DARK }}>
              {order.shipping === 0
                ? (lang === 'ar' ? 'مجاني' : 'Free')
                : `${order.shipping.toFixed(3)} OMR`}
            </span>
          </div>
          <div className="flex justify-between pt-1" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <span className="text-[13px] font-bold" style={{ color: DARK }}>
              {lang === 'ar' ? 'الإجمالي' : 'Total'}
            </span>
            <span className="text-[14px] font-bold" style={{ color: GOLD }}>
              {total.toFixed(3)} OMR
            </span>
          </div>
        </div>
      </div>

      {/* Status timeline */}
      <div
        className="bg-white rounded-[18px] p-4"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}
      >
        <p className="text-[11px] font-semibold uppercase mb-4" style={{ color: MUTED, letterSpacing: '0.06em' }}>
          {lang === 'ar' ? 'حالة الطلب' : 'Order Status'}
        </p>
        <OrderTimeline status={order.status} />
      </div>

      {/* Action buttons */}
      {order.status === 'New' && (
        <div className="flex gap-3 pb-4">
          <button
            onClick={() => onUpdateStatus(order.id, 'Processing')}
            className="flex-1 h-[48px] rounded-2xl text-[13px] font-bold active:scale-[0.98] transition-transform"
            style={{ background: MAROON, color: '#fff', boxShadow: `0 4px 14px rgba(122,30,43,0.3)` }}
          >
            {lang === 'ar' ? 'قبول' : 'Accept Order'}
          </button>
          <button
            className="flex-1 h-[48px] rounded-2xl text-[13px] font-bold active:scale-[0.98] transition-transform"
            style={{ border: `1.5px solid ${MAROON}`, color: MAROON, background: 'transparent' }}
          >
            {lang === 'ar' ? 'رفض' : 'Decline'}
          </button>
        </div>
      )}
      {order.status === 'Processing' && (
        <div className="pb-4">
          <button
            onClick={() => onUpdateStatus(order.id, 'Shipped')}
            className="w-full h-[48px] rounded-2xl text-[13px] font-bold active:scale-[0.98] transition-transform"
            style={{ background: GOLD, color: '#fff', boxShadow: `0 4px 14px rgba(212,175,55,0.35)` }}
          >
            {lang === 'ar' ? 'تحديث إلى تم الشحن' : 'Mark as Shipped'}
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ─── main component ──────────────────────────────────────────────────────────

export default function VendorOrders() {
  const { lang } = useLanguage();
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const updateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    // keep detail view in sync
    setSelectedOrder((prev) => (prev && prev.id === orderId ? { ...prev, status: newStatus } : prev));
  };

  const filtered = orders.filter(
    (o) => activeTab === 'All' || o.status === activeTab
  );

  // ── detail view ──
  if (selectedOrder) {
    const liveOrder = orders.find((o) => o.id === selectedOrder.id) || selectedOrder;
    return (
      <div className="bg-mesh min-h-full">
        <AnimatePresence mode="wait">
          <OrderDetailView
            key={liveOrder.id}
            order={liveOrder}
            onBack={() => setSelectedOrder(null)}
            onUpdateStatus={updateStatus}
            lang={lang}
          />
        </AnimatePresence>
      </div>
    );
  }

  // ── list view ──
  return (
    <div className="bg-mesh min-h-full px-5 py-4">
      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => {
          const count = tab === 'All' ? orders.length : orders.filter((o) => o.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-xl text-[12px] font-semibold flex-shrink-0 transition-all active:scale-95"
              style={{
                background: activeTab === tab ? DARK : 'white',
                color: activeTab === tab ? '#fff' : '#6B7280',
                border: activeTab === tab ? 'none' : '1px solid rgba(0,0,0,0.06)',
                boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.03)',
              }}
            >
              {tab} {tab !== 'All' && `(${count})`}
            </button>
          );
        })}
      </div>

      {/* Order cards */}
      <div className="space-y-3">
        <AnimatePresence>
          {filtered.map((order) => {
            const subtotal = order.items.reduce((sum, item) => {
              const p = findProduct(item.productId);
              return sum + (p.price || 0) * item.qty;
            }, 0);
            const total = subtotal + order.shipping;

            return (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -60 }}
                className="bg-white rounded-[18px] p-4"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[14px] font-bold" style={{ color: DARK }}>#{order.id}</span>
                  <StatusBadge status={order.status} />
                </div>

                {/* Customer + date */}
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[12px] font-medium" style={{ color: MUTED }}>{order.customer}</p>
                  <p className="text-[11px]" style={{ color: MUTED }}>{order.date}</p>
                </div>

                {/* Items list */}
                <div className="space-y-1.5 mb-3">
                  {order.items.map((item, i) => {
                    const p = findProduct(item.productId);
                    return (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-[11px]" style={{ color: DARK }}>
                          {lang === 'ar' ? p.nameAr : p.name}
                          {item.variant ? ` · ${item.variant}` : ''}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px]" style={{ color: MUTED }}>x{item.qty}</span>
                          <span className="text-[11px] font-semibold" style={{ color: MUTED }}>
                            {((p.price || 0) * item.qty).toFixed(3)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Total */}
                <div
                  className="flex items-center justify-between pt-2.5 mb-3"
                  style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}
                >
                  <span className="text-[12px]" style={{ color: MUTED }}>
                    {lang === 'ar' ? 'الإجمالي' : 'Total'}
                  </span>
                  <span className="text-[15px] font-bold" style={{ color: GOLD }}>
                    {total.toFixed(3)} OMR
                  </span>
                </div>

                {/* Action buttons */}
                {order.status === 'New' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(order.id, 'Processing')}
                      className="flex-1 h-[38px] rounded-xl text-[12px] font-bold active:scale-95 transition-transform"
                      style={{ background: MAROON, color: '#fff', boxShadow: '0 3px 10px rgba(122,30,43,0.25)' }}
                    >
                      {lang === 'ar' ? 'قبول' : 'Accept'}
                    </button>
                    <button
                      className="flex-1 h-[38px] rounded-xl text-[12px] font-bold active:scale-95 transition-transform"
                      style={{ border: `1.5px solid ${MAROON}`, color: MAROON, background: 'transparent' }}
                    >
                      {lang === 'ar' ? 'رفض' : 'Decline'}
                    </button>
                  </div>
                )}

                {order.status === 'Processing' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(order.id, 'Shipped')}
                      className="flex-1 h-[38px] rounded-xl text-[12px] font-bold active:scale-95 transition-transform"
                      style={{ background: GOLD, color: '#fff', boxShadow: '0 3px 10px rgba(212,175,55,0.3)' }}
                    >
                      {lang === 'ar' ? 'تحديث للشحن' : 'Mark as Shipped'}
                    </button>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="h-[38px] px-4 rounded-xl text-[12px] font-semibold active:scale-95 transition-transform flex items-center gap-1.5"
                      style={{ background: 'rgba(0,0,0,0.04)', color: DARK }}
                    >
                      {lang === 'ar' ? 'التفاصيل' : 'View Details'}
                      <ArrowRight2 size={13} variant="Outline" color={DARK} />
                    </button>
                  </div>
                )}

                {(order.status === 'Shipped' || order.status === 'Delivered') && (
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="w-full h-[38px] rounded-xl text-[12px] font-semibold active:scale-95 transition-transform flex items-center justify-center gap-1.5"
                    style={{ background: 'rgba(0,0,0,0.04)', color: DARK }}
                  >
                    {lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                    <ArrowRight2 size={13} variant="Outline" color={DARK} />
                  </button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[14px] font-medium" style={{ color: MUTED }}>
              {lang === 'ar' ? 'لا توجد طلبات' : 'No orders found'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
