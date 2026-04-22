import { motion } from 'framer-motion';
import { DollarCircle, Wallet, PercentageCircle, Calendar, TickCircle, ArrowUp } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';

const MAROON = '#7A1E2B';
const GOLD = '#D4AF37';

const monthlyData = [
  { month: 'Jan', monthAr: 'يناير', revenue: 1200 },
  { month: 'Feb', monthAr: 'فبراير', revenue: 1850 },
  { month: 'Mar', monthAr: 'مارس', revenue: 2450 },
  { month: 'Apr', monthAr: 'أبريل', revenue: 0 },
];

const payouts = [
  { date: '2026-03-01', amount: 1665, status: 'Paid' },
  { date: '2026-02-01', amount: 1080, status: 'Paid' },
  { date: '2026-01-01', amount: 850, status: 'Paid' },
];

export default function VendorEarnings() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue), 1);

  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', paddingBottom: 24 }}>
      {/* ── Summary Cards ── */}
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {/* Total Revenue */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: '#FFFFFF', borderRadius: 18, padding: '16px 14px',
              border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: `${MAROON}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DollarCircle size={18} variant="Bold" color={MAROON} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: 'rgba(52,199,89,0.08)', padding: '2px 6px', borderRadius: 6 }}>
                <ArrowUp size={10} variant="Outline" color="#34C759" />
                <span style={{ fontSize: 9, fontWeight: 700, color: '#34C759' }}>+18%</span>
              </div>
            </div>
            <p style={{ fontSize: 24, fontWeight: 800, color: '#1A1A1A', lineHeight: 1 }}>5,500</p>
            <p style={{ fontSize: 11, color: '#8A7A70', marginTop: 4 }}>{isAr ? 'إجمالي الإيرادات' : 'Total Revenue'} <span style={{ color: '#AEAEB2' }}>OMR</span></p>
          </motion.div>

          {/* Net Earnings */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            style={{
              background: '#FFFFFF', borderRadius: 18, padding: '16px 14px',
              border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: `${GOLD}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wallet size={18} variant="Bold" color={GOLD} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: GOLD, background: `${GOLD}12`, padding: '2px 8px', borderRadius: 6 }}>85%</span>
            </div>
            <p style={{ fontSize: 24, fontWeight: 800, color: GOLD, lineHeight: 1 }}>4,675</p>
            <p style={{ fontSize: 11, color: '#8A7A70', marginTop: 4 }}>{isAr ? 'صافي الأرباح' : 'Net Earnings'} <span style={{ color: '#AEAEB2' }}>OMR</span></p>
          </motion.div>
        </div>
      </div>

      {/* ── Monthly Chart ── */}
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <div style={{
          background: '#FFFFFF', borderRadius: 18, padding: '18px 16px',
          border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>{isAr ? 'الإيرادات الشهرية' : 'Monthly Revenue'}</h3>
            <span style={{ fontSize: 11, color: '#AEAEB2' }}>2026</span>
          </div>

          {/* Bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 120, paddingBottom: 0 }}>
            {monthlyData.map((d, i) => {
              const pct = d.revenue > 0 ? (d.revenue / maxRevenue) * 100 : 3;
              const isActive = d.revenue > 0;
              return (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, transformOrigin: 'bottom' }}
                >
                  {isActive && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#1A1A1A' }}>{(d.revenue / 1000).toFixed(1)}K</span>
                  )}
                  <div style={{
                    width: '100%', maxWidth: 40,
                    height: `${pct}%`, minHeight: isActive ? 16 : 6,
                    borderRadius: 8,
                    background: isActive
                      ? `linear-gradient(180deg, ${GOLD} 0%, ${MAROON} 100%)`
                      : '#EDE8E1',
                    boxShadow: isActive ? '0 2px 8px rgba(122,30,43,0.15)' : 'none',
                  }} />
                  <span style={{ fontSize: 11, fontWeight: 500, color: isActive ? '#1A1A1A' : '#AEAEB2' }}>
                    {isAr ? d.monthAr : d.month}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Commission Rate ── */}
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <div style={{
          background: '#FFFFFF', borderRadius: 16, padding: '14px 16px',
          border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 1px 6px rgba(0,0,0,0.02)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 11, background: 'rgba(107,114,128,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PercentageCircle size={18} variant="Outline" color="#6B7280" />
          </div>
          <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>
            {isAr ? 'نسبة العمولة' : 'Commission Rate'}
          </span>
          <span style={{ fontSize: 14, fontWeight: 700, color: GOLD, background: `${GOLD}12`, padding: '4px 12px', borderRadius: 8 }}>15%</span>
        </div>
      </div>

      {/* ── Payout History ── */}
      <div style={{ padding: '0 20px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>
          {isAr ? 'سجل المدفوعات' : 'Payout History'}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {payouts.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              style={{
                background: '#FFFFFF', borderRadius: 14, padding: '14px 16px',
                border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                display: 'flex', alignItems: 'center', gap: 12,
              }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(52,199,89,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Calendar size={16} variant="Outline" color="#34C759" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, color: '#8A7A70', marginBottom: 2 }}>{p.date}</p>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>{p.amount.toFixed(3)} <span style={{ fontSize: 11, fontWeight: 500, color: '#8A7A70' }}>OMR</span></p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(52,199,89,0.06)', padding: '4px 10px', borderRadius: 8 }}>
                <TickCircle size={12} variant="Bold" color="#34C759" />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#34C759' }}>{p.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
