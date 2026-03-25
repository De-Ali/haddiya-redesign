import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box1, ArrowRight2, ArrowLeft2 } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import Badge from '../../components/ui/Badge';

const orders = [
  { id: 'HD-001', date: '2026-03-20', status: 'delivered', statusAr: 'تم التوصيل', total: 45.0, items: 2, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=100&q=80' },
  { id: 'HD-002', date: '2026-03-22', status: 'shipped', statusAr: 'تم الشحن', total: 29.7, items: 1, image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=100&q=80' },
  { id: 'HD-003', date: '2026-03-23', status: 'processing', statusAr: 'قيد المعالجة', total: 125.0, items: 1, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&q=80' },
];

const statusColor = { delivered: 'success', shipped: 'accent', processing: 'warning' };

export default function MyOrders() {
  const navigate = useNavigate();
  const { lang, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft2 : ArrowRight2;

  return (
    <div className="bg-mesh min-h-full px-5 py-4 space-y-2.5">
      {orders.map((order, i) => (
        <motion.button
          key={order.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          onClick={() => navigate(`/order/${order.id}`)}
          className="w-full bg-white rounded-[18px] p-4 flex items-center gap-3.5 text-start shadow-soft border border-white/60 active:scale-[0.99] transition-transform"
        >
          <img src={order.image} alt="" className="w-14 h-14 rounded-xl object-cover bg-bg-warm flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-bold" style={{ color: '#1C1C1E' }}>#{order.id}</span>
              <Badge color={statusColor[order.status]} dot>{lang === 'ar' ? order.statusAr : order.status}</Badge>
            </div>
            <p className="text-[10px]" style={{ color: 'rgba(142,142,147,0.70)' }}>
              {order.date} · {order.items} {lang === 'ar' ? 'منتجات' : 'items'}
            </p>
            <p className="text-[13px] font-bold mt-0.5" style={{ color: '#7A1E2B' }}>{order.total.toFixed(3)} OMR</p>
          </div>
          <Arrow size={14} variant="Outline" color="rgba(142,142,147,0.50)" />
        </motion.button>
      ))}
    </div>
  );
}
