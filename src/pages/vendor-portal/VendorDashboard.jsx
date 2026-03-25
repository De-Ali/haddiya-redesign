import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box1, Bag2, DollarCircle, TrendUp, Add, Chart, ArrowRight2 } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../../components/ui/Button';

const stats = [
  { icon: Box1, label: 'Products', labelAr: 'المنتجات', value: '24', change: '+3', color: '#7A1E2B', bg: 'rgba(122,30,43,0.10)' },
  { icon: Bag2, label: 'Orders', labelAr: 'الطلبات', value: '156', change: '+12', color: '#D4AF37', bg: 'rgba(212,175,55,0.10)' },
  { icon: DollarCircle, label: 'Revenue', labelAr: 'الإيرادات', value: '2,450', change: '+18%', color: '#22c55e', bg: 'rgba(52,199,89,0.10)' },
  { icon: TrendUp, label: 'Views', labelAr: 'المشاهدات', value: '8.2K', change: '+25%', color: '#6b7280', bg: 'rgba(28,28,30,0.05)' },
];

const quickActions = [
  { icon: Add, label: 'Add Product', labelAr: 'إضافة منتج', path: '/vendor-portal/add-product' },
  { icon: Box1, label: 'My Products', labelAr: 'منتجاتي', path: '/vendor-portal/products' },
  { icon: Bag2, label: 'Orders', labelAr: 'الطلبات', path: '/vendor-portal/orders' },
  { icon: Chart, label: 'Earnings', labelAr: 'الأرباح', path: '/vendor-portal/earnings' },
];

export default function VendorDashboard() {
  const navigate = useNavigate();
  const { lang } = useLanguage();

  return (
    <div className="bg-mesh min-h-full px-5 py-4">
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-5 stagger-children">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-[18px] p-3.5 shadow-soft border border-white/60">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
              style={{ background: stat.bg }}
            >
              <stat.icon size={16} color={stat.color} variant="Bold" />
            </div>
            <p className="text-xs" style={{ color: '#8E8E93' }}>{lang === 'ar' ? stat.labelAr : stat.label}</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-lg font-bold" style={{ color: '#1C1C1E' }}>{stat.value}</span>
              <span className="text-[10px] font-semibold" style={{ color: '#34C759' }}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h3 className="font-display text-sm font-semibold mb-3" style={{ color: '#1C1C1E' }}>
        {lang === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
      </h3>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {quickActions.map((action, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(action.path)}
            className="glass rounded-2xl p-4 flex flex-col items-center gap-2 text-center"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(122,30,43,0.10)' }}
            >
              <action.icon size={18} color="#7A1E2B" variant="Outline" />
            </div>
            <span className="text-xs font-medium" style={{ color: '#1C1C1E' }}>
              {lang === 'ar' ? action.labelAr : action.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Recent orders preview */}
      <h3 className="font-display text-sm font-semibold mb-3" style={{ color: '#1C1C1E' }}>
        {lang === 'ar' ? 'أحدث الطلبات' : 'Recent Orders'}
      </h3>
      <div className="space-y-2">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="bg-white rounded-[18px] p-3 shadow-soft border border-white/60 flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/vendor-portal/orders')}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(212,175,55,0.10)' }}
            >
              <Bag2 size={16} color="#D4AF37" variant="Bold" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold" style={{ color: '#1C1C1E' }}>Order #HD-00{i}</p>
              <p className="text-[10px]" style={{ color: '#8E8E93' }}>{i} item{i > 1 ? 's' : ''} · {45 * i}.000 OMR</p>
            </div>
            <ArrowRight2 size={14} color="#9ca3af" variant="Outline" />
          </div>
        ))}
      </div>
    </div>
  );
}
