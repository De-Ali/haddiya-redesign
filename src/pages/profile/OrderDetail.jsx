import { motion } from 'framer-motion';
import { Clock, Box1, TruckFast, TickCircle } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';

const timeline = [
  { Icon: Clock, label: 'Order Placed', labelAr: 'تم الطلب', time: 'Mar 23, 10:30 AM', done: true },
  { Icon: Box1, label: 'Processing', labelAr: 'قيد المعالجة', time: 'Mar 23, 11:00 AM', done: true },
  { Icon: TruckFast, label: 'Shipped', labelAr: 'تم الشحن', time: 'Mar 23, 2:00 PM', done: true },
  { Icon: TickCircle, label: 'Delivered', labelAr: 'تم التوصيل', time: 'Estimated Mar 24', done: false },
];

export default function OrderDetail() {
  const { lang } = useLanguage();

  return (
    <div className="bg-mesh min-h-full px-5 py-4">
      {/* Timeline card */}
      <div className="bg-white rounded-[20px] p-5 mb-3" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}>
        <div className="flex justify-between items-center mb-5">
          <span className="text-[14px] font-bold" style={{ color: '#1C1C1E' }}>#HD-003</span>
          <span className="text-[11px]" style={{ color: '#AEAEB2' }}>2026-03-23</span>
        </div>
        <div className="space-y-0">
          {timeline.map((step, i) => (
            <div key={i} className="flex gap-3.5">
              <div className="flex flex-col items-center">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: step.done ? '#7A1E2B' : 'rgba(0,0,0,0.05)',
                  }}
                >
                  <step.Icon size={16} variant={step.done ? 'Bold' : 'Outline'} color={step.done ? '#FFFFFF' : '#AEAEB2'} />
                </div>
                {i < timeline.length - 1 && (
                  <div className="w-[2px] h-8 rounded-full" style={{ background: step.done ? '#7A1E2B' : 'rgba(0,0,0,0.06)' }} />
                )}
              </div>
              <div className="pb-5">
                <p className="text-[12px] font-semibold" style={{ color: step.done ? '#1C1C1E' : '#AEAEB2' }}>
                  {lang === 'ar' ? step.labelAr : step.label}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: '#AEAEB2' }}>{step.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order items */}
      <div className="bg-white rounded-[20px] p-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}>
        <h3 className="text-[13px] font-semibold mb-3" style={{ color: '#1C1C1E' }}>
          {lang === 'ar' ? 'تفاصيل الطلب' : 'Order Items'}
        </h3>
        <div className="flex items-center gap-3 py-2">
          <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&q=80" alt="" className="w-14 h-14 rounded-xl object-cover bg-bg-warm" />
          <div className="flex-1">
            <p className="text-[12px] font-semibold" style={{ color: '#1C1C1E' }}>{lang === 'ar' ? 'طقم الخنجر التراثي' : 'Heritage Khanjar Set'}</p>
            <p className="text-[10px] mt-0.5" style={{ color: '#AEAEB2' }}>x1</p>
          </div>
          <span className="text-[13px] font-bold text-primary">125.000 OMR</span>
        </div>
      </div>
    </div>
  );
}
