import { useLanguage } from '../../context/LanguageContext';
import Badge from '../../components/ui/Badge';

const monthlyData = [
  { month: 'Jan', revenue: 1200 }, { month: 'Feb', revenue: 1850 },
  { month: 'Mar', revenue: 2450 }, { month: 'Apr', revenue: 0 },
];

const payouts = [
  { date: '2026-03-01', amount: 1665, status: 'Paid' },
  { date: '2026-02-01', amount: 1080, status: 'Paid' },
  { date: '2026-01-01', amount: 850, status: 'Paid' },
];

export default function VendorEarnings() {
  const { lang } = useLanguage();
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue), 1);

  return (
    <div className="bg-mesh min-h-full px-5 py-4">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white rounded-[18px] p-3.5 shadow-soft border border-white/60 text-center">
          <p className="text-[10px] text-muted mb-0.5">{lang === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}</p>
          <p className="text-xl font-bold text-primary">5,500</p>
          <p className="text-[10px] text-muted">OMR</p>
        </div>
        <div className="bg-white rounded-[18px] p-3.5 shadow-soft border border-white/60 text-center">
          <p className="text-[10px] text-muted mb-0.5">{lang === 'ar' ? 'صافي الأرباح' : 'Net Earnings'}</p>
          <p className="text-xl font-bold text-accent">4,675</p>
          <p className="text-[10px] text-muted">OMR (85%)</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-[18px] p-4 shadow-soft border border-white/60 mb-5">
        <h3 className="text-xs font-semibold text-dark mb-3">{lang === 'ar' ? 'الإيرادات الشهرية' : 'Monthly Revenue'}</h3>
        <div className="flex items-end gap-3 h-32">
          {monthlyData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] font-semibold text-dark">{d.revenue > 0 ? d.revenue : ''}</span>
              <div
                className="w-full rounded-t-lg transition-all duration-500"
                style={{
                  height: `${(d.revenue / maxRevenue) * 100}%`,
                  background: d.revenue > 0 ? 'linear-gradient(to top, #7A1E2B, #D4AF37)' : '#e5e5e5',
                  minHeight: d.revenue > 0 ? 8 : 4,
                }}
              />
              <span className="text-[10px] text-muted">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Commission info */}
      <div className="bg-white rounded-[18px] p-3 shadow-soft border border-white/60 mb-4 flex items-center justify-between">
        <span className="text-xs text-dark font-medium">{lang === 'ar' ? 'نسبة العمولة' : 'Commission Rate'}</span>
        <Badge color="accent">15%</Badge>
      </div>

      {/* Payouts */}
      <h3 className="text-xs font-semibold text-dark mb-3">{lang === 'ar' ? 'سجل المدفوعات' : 'Payout History'}</h3>
      <div className="space-y-2 stagger-children">
        {payouts.map((p, i) => (
          <div key={i} className="bg-white rounded-[18px] p-3 shadow-soft border border-white/60 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-dark">{p.date}</p>
              <p className="text-sm font-bold text-primary">{p.amount.toFixed(3)} OMR</p>
            </div>
            <Badge color="success" dot>{p.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
