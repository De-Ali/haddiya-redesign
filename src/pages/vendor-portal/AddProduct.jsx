import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gallery, CloseCircle, Add, TickCircle, ArrowDown2 } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { categories } from '../../data/categories';

export default function AddProduct() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [images, setImages] = useState([]);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [variants, setVariants] = useState([{ type: '', options: '' }]);

  const addImage = () => {
    if (images.length < 5) setImages([...images, `https://picsum.photos/200?random=${Date.now()}`]);
  };
  const removeImage = (i) => setImages(images.filter((_, idx) => idx !== i));
  const addVariant = () => setVariants([...variants, { type: '', options: '' }]);
  const removeVariant = (i) => setVariants(variants.filter((_, idx) => idx !== i));

  const fields = [
    { label: lang === 'ar' ? 'اسم المنتج (EN)' : 'Product Name (EN)', placeholder: 'e.g. Royal Oud Collection' },
    { label: lang === 'ar' ? 'اسم المنتج (AR)' : 'Product Name (AR)', placeholder: 'مثال: مجموعة العود الملكي' },
    { label: lang === 'ar' ? 'السعر (OMR)' : 'Price (OMR)', placeholder: '0.000', type: 'number' },
    { label: lang === 'ar' ? 'السعر الأصلي (اختياري)' : 'Original Price (optional)', placeholder: '0.000', type: 'number' },
  ];

  return (
    <div className="bg-mesh min-h-full px-5 py-4 pb-8">
      {/* ── Image Upload ── */}
      <div className="mb-5">
        <p className="text-[13px] font-semibold mb-3" style={{ color: '#1C1C1E' }}>
          {lang === 'ar' ? 'صور المنتج' : 'Product Images'} <span style={{ color: '#AEAEB2' }}>({images.length}/5)</span>
        </p>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={addImage}
            className="w-[80px] h-[80px] rounded-2xl flex flex-col items-center justify-center gap-1 flex-shrink-0 active:scale-95 transition-transform"
            style={{ border: '2px dashed rgba(122,30,43,0.25)', background: 'rgba(122,30,43,0.03)' }}
          >
            <Gallery size={22} variant="Outline" color="#7A1E2B" />
            <span className="text-[9px] font-semibold" style={{ color: '#7A1E2B' }}>{lang === 'ar' ? 'إضافة' : 'Add'}</span>
          </button>
          {images.map((img, i) => (
            <div key={i} className="relative w-[80px] h-[80px] flex-shrink-0">
              <img src={img} alt="" className="w-full h-full rounded-2xl object-cover" />
              <button onClick={() => removeImage(i)} className="absolute -top-1.5 -end-1.5 w-5 h-5 rounded-full bg-white flex items-center justify-center" style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>
                <CloseCircle size={14} variant="Bold" color="#FF3B30" />
              </button>
              {i === 0 && (
                <div className="absolute bottom-1 start-1 px-1.5 py-0.5 rounded text-[7px] font-bold text-white" style={{ background: 'rgba(0,0,0,0.50)' }}>{lang === 'ar' ? 'رئيسية' : 'Main'}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Text Fields ── */}
      <div className="space-y-3 mb-5">
        {fields.map((f, i) => (
          <div key={i}>
            <label className="block text-[12px] font-semibold mb-1.5 ms-1" style={{ color: '#3C3C43' }}>{f.label}</label>
            <input type={f.type || 'text'} placeholder={f.placeholder} className="w-full bg-white rounded-[14px] px-4 py-3.5 text-[13px] font-medium outline-none" style={{ color: '#1C1C1E', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }} />
          </div>
        ))}
      </div>

      {/* ── Category Picker ── */}
      <div className="mb-5">
        <label className="block text-[12px] font-semibold mb-1.5 ms-1" style={{ color: '#3C3C43' }}>{lang === 'ar' ? 'القسم' : 'Category'}</label>
        <button onClick={() => setShowCategoryPicker(!showCategoryPicker)} className="w-full bg-white rounded-[14px] px-4 py-3.5 flex items-center justify-between" style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <span className="text-[13px] font-medium" style={{ color: selectedCategory ? '#1C1C1E' : '#AEAEB2' }}>
            {selectedCategory ? (lang === 'ar' ? categories.find(c => c.id === selectedCategory)?.nameAr : categories.find(c => c.id === selectedCategory)?.name) : (lang === 'ar' ? 'اختر القسم' : 'Select category')}
          </span>
          <ArrowDown2 size={16} variant="Outline" color="#AEAEB2" style={{ transform: showCategoryPicker ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
        </button>
        {showCategoryPicker && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[14px] mt-1 overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => { setSelectedCategory(cat.id); setShowCategoryPicker(false); }} className="w-full px-4 py-3 flex items-center gap-3 text-start active:bg-black/[0.02]" style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                <span className="text-[16px]">{cat.icon}</span>
                <span className="text-[13px] font-medium flex-1" style={{ color: '#1C1C1E' }}>{lang === 'ar' ? cat.nameAr : cat.name}</span>
                {selectedCategory === cat.id && <TickCircle size={16} variant="Bold" color="#7A1E2B" />}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* ── Description ── */}
      <div className="mb-5">
        <label className="block text-[12px] font-semibold mb-1.5 ms-1" style={{ color: '#3C3C43' }}>{lang === 'ar' ? 'الوصف' : 'Description'}</label>
        <textarea rows={3} placeholder={lang === 'ar' ? 'وصف المنتج...' : 'Describe your product...'} className="w-full bg-white rounded-[14px] px-4 py-3.5 text-[13px] font-medium outline-none resize-none" style={{ color: '#1C1C1E', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }} />
      </div>

      {/* ── Variants ── */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[12px] font-semibold ms-1" style={{ color: '#3C3C43' }}>{lang === 'ar' ? 'المتغيرات' : 'Variants'}</label>
          <button onClick={addVariant} className="text-[11px] font-semibold flex items-center gap-1 active:scale-95" style={{ color: '#7A1E2B' }}>
            <Add size={14} variant="Outline" color="#7A1E2B" /> {lang === 'ar' ? 'إضافة' : 'Add'}
          </button>
        </div>
        {variants.map((v, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input placeholder={lang === 'ar' ? 'النوع' : 'Type (e.g. Size)'} value={v.type} onChange={e => { const nv = [...variants]; nv[i].type = e.target.value; setVariants(nv); }} className="flex-1 bg-white rounded-[12px] px-3 py-3 text-[12px] font-medium outline-none" style={{ color: '#1C1C1E', border: '1px solid rgba(0,0,0,0.06)' }} />
            <input placeholder={lang === 'ar' ? 'خيارات' : 'Options (S, M, L)'} value={v.options} onChange={e => { const nv = [...variants]; nv[i].options = e.target.value; setVariants(nv); }} className="flex-[2] bg-white rounded-[12px] px-3 py-3 text-[12px] font-medium outline-none" style={{ color: '#1C1C1E', border: '1px solid rgba(0,0,0,0.06)' }} />
            {variants.length > 1 && (
              <button onClick={() => removeVariant(i)} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,59,48,0.06)' }}>
                <CloseCircle size={16} variant="Outline" color="#FF3B30" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ── Stock Toggle ── */}
      <div className="bg-white rounded-[14px] px-4 py-3.5 flex items-center justify-between mb-6" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
        <span className="text-[13px] font-medium" style={{ color: '#1C1C1E' }}>{lang === 'ar' ? 'متوفر في المخزون' : 'In Stock'}</span>
        <div className="w-11 h-[26px] rounded-full relative cursor-pointer" style={{ background: '#7A1E2B' }}>
          <div className="w-[22px] h-[22px] bg-white rounded-full absolute top-[2px] end-[2px]" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }} />
        </div>
      </div>

      {/* ── Submit ── */}
      <div className="flex gap-3">
        <button onClick={() => navigate(-1)} className="flex-1 h-[48px] rounded-2xl text-[14px] font-semibold active:scale-[0.98] transition-transform" style={{ background: '#fff', color: '#1C1C1E', border: '1px solid rgba(0,0,0,0.08)' }}>
          {lang === 'ar' ? 'إلغاء' : 'Cancel'}
        </button>
        <button onClick={() => navigate('/vendor-portal/products')} className="flex-1 h-[48px] rounded-2xl text-[14px] font-bold active:scale-[0.98] transition-transform" style={{ background: '#7A1E2B', color: '#fff', boxShadow: '0 4px 14px rgba(122,30,43,0.25)' }}>
          {lang === 'ar' ? 'نشر المنتج' : 'Publish Product'}
        </button>
      </div>
    </div>
  );
}
