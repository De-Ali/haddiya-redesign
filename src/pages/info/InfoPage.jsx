import { useLanguage } from '../../context/LanguageContext';

const content = {
  privacy: {
    en: [
      { title: 'Information We Collect', body: 'We collect information you provide directly — name, email, phone, and shipping address when you create an account or place an order.' },
      { title: 'How We Use Your Data', body: 'Your data is used solely for order processing, delivery, and improving your shopping experience. We never sell your personal information.' },
      { title: 'Data Security', body: 'We use industry-standard encryption and security measures to protect your personal data at all times.' },
    ],
    ar: [
      { title: 'المعلومات التي نجمعها', body: 'نجمع المعلومات التي تقدمها مباشرة — الاسم والبريد والهاتف وعنوان الشحن عند إنشاء حساب أو تقديم طلب.' },
      { title: 'كيف نستخدم بياناتك', body: 'تُستخدم بياناتك فقط لمعالجة الطلبات والتوصيل وتحسين تجربة التسوق. لا نبيع معلوماتك الشخصية أبداً.' },
      { title: 'أمان البيانات', body: 'نستخدم تشفيراً وإجراءات أمان معيارية لحماية بياناتك الشخصية في جميع الأوقات.' },
    ],
  },
  terms: {
    en: [
      { title: 'Terms of Use', body: 'By using Haddiya, you agree to these terms. We reserve the right to modify services at any time.' },
      { title: 'User Accounts', body: 'You are responsible for maintaining the security of your account and for all activities under your account.' },
      { title: 'Purchases', body: 'All purchases are subject to product availability. Prices are in Omani Rials and include VAT where applicable.' },
    ],
    ar: [
      { title: 'شروط الاستخدام', body: 'باستخدام هدية، أنت توافق على هذه الشروط. نحتفظ بالحق في تعديل الخدمات في أي وقت.' },
      { title: 'حسابات المستخدمين', body: 'أنت مسؤول عن الحفاظ على أمان حسابك وعن جميع الأنشطة تحت حسابك.' },
      { title: 'المشتريات', body: 'جميع المشتريات تخضع لتوفر المنتج. الأسعار بالريال العماني وتشمل ضريبة القيمة المضافة حيثما ينطبق.' },
    ],
  },
  refund: {
    en: [
      { title: 'Return Policy', body: 'Items may be returned within 14 days of delivery in their original condition and packaging.' },
      { title: 'Refund Process', body: 'Refunds are processed within 5-7 business days after we receive the returned item.' },
      { title: 'Non-Returnable Items', body: 'Perishable goods (flowers, chocolates), personalized items, and opened perfumes cannot be returned.' },
    ],
    ar: [
      { title: 'سياسة الإرجاع', body: 'يمكن إرجاع المنتجات خلال 14 يوماً من التوصيل بحالتها وتغليفها الأصلي.' },
      { title: 'عملية الاسترداد', body: 'تتم معالجة المبالغ المستردة خلال 5-7 أيام عمل بعد استلامنا للمنتج المرتجع.' },
      { title: 'منتجات غير قابلة للإرجاع', body: 'لا يمكن إرجاع البضائع القابلة للتلف والمنتجات المخصصة والعطور المفتوحة.' },
    ],
  },
  shipping: {
    en: [
      { title: 'Standard Delivery', body: '2-4 business days within Muscat. 3-6 business days for other governorates. Free for orders above 20 OMR.' },
      { title: 'Express Delivery', body: 'Same-day delivery available in Muscat for orders placed before 2 PM. Additional 2 OMR charge.' },
      { title: 'Gift Wrapping', body: 'Premium gift wrapping available for 1.5 OMR. Luxury box packaging for 3 OMR.' },
    ],
    ar: [
      { title: 'التوصيل العادي', body: '2-4 أيام عمل في مسقط. 3-6 أيام للمحافظات الأخرى. مجاني للطلبات فوق 20 ر.ع.' },
      { title: 'التوصيل السريع', body: 'توصيل في نفس اليوم في مسقط للطلبات قبل الساعة 2 ظهراً. رسوم إضافية 2 ر.ع.' },
      { title: 'تغليف الهدايا', body: 'تغليف هدايا فاخر متاح بـ 1.5 ر.ع. تغليف صندوق فاخر بـ 3 ر.ع.' },
    ],
  },
  payment: {
    en: [
      { title: 'Credit / Debit Cards', body: 'We accept Visa, Mastercard, and American Express. All transactions are secured with SSL encryption.' },
      { title: 'Apple Pay & Google Pay', body: 'Quick and secure mobile payments. Simply authenticate with Face ID, Touch ID, or your device PIN.' },
      { title: 'Cash on Delivery', body: 'Pay when your order arrives. Available for orders within Oman up to 200 OMR. Additional 0.5 OMR COD fee.' },
      { title: 'Bank Transfer', body: 'Direct bank transfer to our account. Order processing begins after payment confirmation.' },
    ],
    ar: [
      { title: 'بطاقات الائتمان والخصم', body: 'نقبل فيزا وماستركارد وأمريكان إكسبريس. جميع المعاملات مؤمنة بتشفير SSL.' },
      { title: 'Apple Pay و Google Pay', body: 'مدفوعات هاتفية سريعة وآمنة. قم بالمصادقة ببصمة الوجه أو الإصبع أو رمز الجهاز.' },
      { title: 'الدفع عند الاستلام', body: 'ادفع عند وصول طلبك. متاح للطلبات داخل عمان حتى 200 ر.ع. رسوم إضافية 0.5 ر.ع.' },
      { title: 'التحويل البنكي', body: 'تحويل بنكي مباشر إلى حسابنا. تبدأ معالجة الطلب بعد تأكيد الدفع.' },
    ],
  },
};

export default function InfoPage({ type }) {
  const { lang } = useLanguage();
  const sections = content[type]?.[lang] || content[type]?.en || [];

  return (
    <div className="bg-mesh min-h-full px-5 py-4 space-y-2.5">
      {sections.map((s, i) => (
        <div key={i} className="bg-white rounded-[18px] p-5 shadow-soft border border-white/60">
          <h3 className="text-[14px] font-semibold mb-2" style={{ color: '#1C1C1E' }}>{s.title}</h3>
          <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(142,142,147,0.85)' }}>{s.body}</p>
        </div>
      ))}
    </div>
  );
}
