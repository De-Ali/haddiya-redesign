import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box1, Bag2, DollarCircle, TrendUp, Add, Chart, ArrowRight2, Shop, Eye } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';

const MAROON = '#7A1E2B';
const GOLD = '#D4AF37';

const stats = [
  { icon: Box1, label: 'Products', labelAr: 'المنتجات', value: '24', change: '+3', color: MAROON },
  { icon: Bag2, label: 'Orders', labelAr: 'الطلبات', value: '156', change: '+12', color: GOLD },
  { icon: DollarCircle, label: 'Revenue', labelAr: 'الإيرادات', value: '2,450', unit: 'OMR', change: '+18%', color: '#2D6A4F' },
  { icon: Eye, label: 'Views', labelAr: 'المشاهدات', value: '8.2K', change: '+25%', color: '#007AFF' },
];

const quickActions = [
  { icon: Add, label: 'Add Product', labelAr: 'إضافة منتج', path: '/vendor-portal/add-product', color: MAROON, bg: '#FEF5F6' },
  { icon: Box1, label: 'My Products', labelAr: 'منتجاتي', path: '/vendor-portal/products', color: GOLD, bg: '#FDF8EC' },
  { icon: Bag2, label: 'Orders', labelAr: 'الطلبات', path: '/vendor-portal/orders', color: '#007AFF', bg: '#EFF6FF' },
  { icon: Chart, label: 'Earnings', labelAr: 'الأرباح', path: '/vendor-portal/earnings', color: '#2D6A4F', bg: '#ECFDF5' },
];

export default function VendorDashboard() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', paddingBottom: 24 }}>

      {/* ── Welcome Card ── */}
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <div style={{
          background: '#FFFFFF', borderRadius: 20, padding: '20px 18px',
          border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div style={{ width: 50, height: 50, borderRadius: 16, background: MAROON, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shop size={24} variant="Bold" color="#FFFFFF" />
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>{isAr ? 'مرحباً بعودتك' : 'Welcome back!'}</h2>
              <p style={{ fontSize: 12, color: '#8A7A70', marginTop: 2 }}>{isAr ? 'إليك ملخص متجرك' : 'Here\'s your store overview'}</p>
            </div>
          </div>

          {/* Stats 2x2 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  background: '#FAF8F5', borderRadius: 16, padding: '14px 14px 12px',
                  border: '1px solid rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: `${s.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <s.icon size={16} variant="Bold" color={s.color} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#34C759', background: 'rgba(52,199,89,0.08)', padding: '2px 6px', borderRadius: 6 }}>{s.change}</span>
                </div>
                <p style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A', lineHeight: 1 }}>
                  {s.value}
                  {s.unit && <span style={{ fontSize: 11, fontWeight: 500, color: '#8A7A70', marginLeft: 4 }}>{s.unit}</span>}
                </p>
                <p style={{ fontSize: 11, color: '#8A7A70', marginTop: 4 }}>{isAr ? s.labelAr : s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div style={{ padding: '0 20px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>
          {isAr ? 'إجراءات سريعة' : 'Quick Actions'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {quickActions.map((a, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(a.path)}
              style={{
                background: '#FFFFFF', borderRadius: 16, padding: '16px 14px',
                border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 1px 6px rgba(0,0,0,0.03)',
                display: 'flex', alignItems: 'center', gap: 12,
                cursor: 'pointer', textAlign: 'start',
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <a.icon size={18} variant="Outline" color={a.color} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{isAr ? a.labelAr : a.label}</span>
            </motion.button>
          ))}
        </div>

        {/* ── Recent Orders ── */}
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>
          {isAr ? 'أحدث الطلبات' : 'Recent Orders'}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { id: 'HD-101', customer: 'Sara Al-Balushi', items: 2, total: 74.7, status: 'New', color: '#FF9500' },
            { id: 'HD-098', customer: 'Mohammed Al-Harthy', items: 1, total: 85, status: 'Processing', color: '#007AFF' },
            { id: 'HD-095', customer: 'Fatima Al-Rawahi', items: 3, total: 154.4, status: 'Shipped', color: '#34C759' },
          ].map((o, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/vendor-portal/orders')}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                background: '#FFFFFF', borderRadius: 14, padding: '12px 14px',
                border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                cursor: 'pointer', textAlign: 'start',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>#{o.id}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: o.color, background: `${o.color}12`, padding: '2px 8px', borderRadius: 6 }}>{o.status}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, color: '#8A7A70' }}>{o.customer}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: GOLD }}>{o.total.toFixed(3)} OMR</span>
                </div>
              </div>
              <ArrowRight2 size={14} variant="Outline" color="#CDCDCF" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
