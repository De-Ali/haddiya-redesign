import { Box1, DiscountShape, Notification } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';

const notifications = [
  { Icon: Box1, title: 'Order Shipped', titleAr: 'تم شحن الطلب', desc: 'Your order #HD-002 is on its way!', descAr: 'طلبك #HD-002 في الطريق!', time: '2h ago', color: '#7A1E2B', bg: 'rgba(122,30,43,0.08)', unread: true },
  { Icon: DiscountShape, title: 'Flash Sale!', titleAr: 'تخفيضات!', desc: 'Up to 70% off on selected perfumes', descAr: 'خصم يصل إلى 70% على عطور مختارة', time: '5h ago', color: '#D4AF37', bg: 'rgba(212,175,55,0.08)', unread: true },
  { Icon: Notification, title: 'Welcome to Haddiya', titleAr: 'مرحباً في هدية', desc: 'Explore premium gifts from top vendors', descAr: 'اكتشف هدايا فاخرة من أفضل المتاجر', time: '1d ago', color: '#8E8E93', bg: 'rgba(142,142,147,0.06)', unread: false },
];

export default function NotificationsPage() {
  const { lang } = useLanguage();

  return (
    <div className="bg-mesh min-h-full px-5 py-4 space-y-2.5">
      {notifications.map((n, i) => (
        <div
          key={i}
          className="bg-white rounded-[18px] p-4 flex items-start gap-3.5"
          style={{
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            border: n.unread ? '1px solid rgba(212,175,55,0.15)' : '1px solid rgba(0,0,0,0.03)',
          }}
        >
          <div className="w-10 h-10 rounded-[13px] flex items-center justify-center flex-shrink-0" style={{ background: n.bg }}>
            <n.Icon size={20} variant={n.unread ? 'Bold' : 'Outline'} color={n.color} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-[12px] font-semibold" style={{ color: '#1C1C1E' }}>{lang === 'ar' ? n.titleAr : n.title}</p>
              {n.unread && <span className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: '#D4AF37' }} />}
            </div>
            <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: '#8E8E93' }}>{lang === 'ar' ? n.descAr : n.desc}</p>
          </div>
          <span className="text-[10px] flex-shrink-0 mt-0.5" style={{ color: '#AEAEB2' }}>{n.time}</span>
        </div>
      ))}
    </div>
  );
}
