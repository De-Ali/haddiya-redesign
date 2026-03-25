import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Add, Edit2, Trash, Eye, SearchNormal1, TickCircle, CloseCircle, Clock } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { products } from '../../data/products';

const statusMap = { Live: { color: '#34C759', bg: 'rgba(52,199,89,0.08)', Icon: TickCircle }, Pending: { color: '#FF9500', bg: 'rgba(255,149,0,0.08)', Icon: Clock }, Rejected: { color: '#FF3B30', bg: 'rgba(255,59,48,0.08)', Icon: CloseCircle } };
const statusList = ['Live', 'Pending', 'Live', 'Rejected', 'Live'];
const tabs = ['All', 'Live', 'Pending', 'Rejected'];

export default function VendorProducts() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const vendorProducts = products.slice(0, 5).map((p, i) => ({ ...p, status: statusList[i], views: 234 + i * 47, sales: 12 + i * 3 }));

  const filtered = vendorProducts.filter(p => {
    const matchTab = activeTab === 'All' || p.status === activeTab;
    const name = lang === 'ar' ? p.nameAr : p.name;
    const matchSearch = !search || name.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleDelete = (id) => {
    setDeleteConfirm(null);
    // In real app: remove product
  };

  return (
    <div className="bg-mesh min-h-full px-5 py-4">
      {/* Add button */}
      <button
        onClick={() => navigate('/vendor-portal/add-product')}
        className="w-full h-[48px] rounded-2xl text-[14px] font-bold flex items-center justify-center gap-2 mb-4 active:scale-[0.98] transition-transform"
        style={{ background: '#7A1E2B', color: '#fff', boxShadow: '0 4px 14px rgba(122,30,43,0.25)' }}
      >
        <Add size={18} variant="Outline" color="#FFFFFF" />
        {lang === 'ar' ? 'إضافة منتج جديد' : 'Add New Product'}
      </button>

      {/* Search */}
      <div className="flex items-center gap-3 bg-white rounded-[14px] px-4 py-3 mb-4" style={{ border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 1px 4px rgba(0,0,0,0.02)' }}>
        <SearchNormal1 size={16} variant="Outline" color="#AEAEB2" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={lang === 'ar' ? 'بحث في المنتجات...' : 'Search products...'}
          className="flex-1 bg-transparent outline-none text-[13px] font-medium"
          style={{ color: '#1C1C1E' }}
        />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2 rounded-xl text-[12px] font-semibold flex-shrink-0 transition-all active:scale-95"
            style={{
              background: activeTab === tab ? '#1C1C1E' : 'white',
              color: activeTab === tab ? '#fff' : '#6B7280',
              border: activeTab === tab ? 'none' : '1px solid rgba(0,0,0,0.06)',
              boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.03)',
            }}
          >
            {tab} {tab !== 'All' && `(${vendorProducts.filter(p => p.status === tab).length})`}
          </button>
        ))}
      </div>

      {/* Product list */}
      <div className="space-y-2.5">
        <AnimatePresence>
          {filtered.map((p) => {
            const st = statusMap[p.status];
            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -80 }}
                className="bg-white rounded-[18px] p-4"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}
              >
                <div className="flex gap-3.5">
                  <img src={p.image} alt="" className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-bg-warm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[13px] font-semibold truncate" style={{ color: '#1C1C1E' }}>
                        {lang === 'ar' ? p.nameAr : p.name}
                      </h3>
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-md flex-shrink-0" style={{ background: st.bg }}>
                        <st.Icon size={10} variant="Bold" color={st.color} />
                        <span className="text-[9px] font-bold" style={{ color: st.color }}>{p.status}</span>
                      </div>
                    </div>
                    <p className="text-[14px] font-bold text-primary mb-1">{p.price.toFixed(3)} <span className="text-[10px] font-medium" style={{ color: '#AEAEB2' }}>OMR</span></p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Eye size={11} variant="Outline" color="#AEAEB2" />
                        <span className="text-[10px]" style={{ color: '#AEAEB2' }}>{p.views} views</span>
                      </div>
                      <span className="text-[10px]" style={{ color: '#AEAEB2' }}>·</span>
                      <span className="text-[10px] font-medium" style={{ color: '#34C759' }}>{p.sales} sales</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 mt-3 pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                  <button
                    onClick={() => navigate('/vendor-portal/add-product')}
                    className="flex-1 h-[36px] rounded-xl flex items-center justify-center gap-1.5 text-[11px] font-semibold active:scale-95 transition-transform"
                    style={{ background: 'rgba(122,30,43,0.06)', color: '#7A1E2B' }}
                  >
                    <Edit2 size={13} variant="Outline" color="#7A1E2B" /> {lang === 'ar' ? 'تعديل' : 'Edit'}
                  </button>
                  <button
                    onClick={() => navigate(`/vendor-portal/product/${p.id}`)}
                    className="flex-1 h-[36px] rounded-xl flex items-center justify-center gap-1.5 text-[11px] font-semibold active:scale-95 transition-transform"
                    style={{ background: 'rgba(52,199,89,0.06)', color: '#34C759' }}
                  >
                    <Eye size={13} variant="Outline" color="#34C759" /> {lang === 'ar' ? 'عرض' : 'View'}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(p.id)}
                    className="flex-1 h-[36px] rounded-xl flex items-center justify-center gap-1.5 text-[11px] font-semibold active:scale-95 transition-transform"
                    style={{ background: 'rgba(255,59,48,0.06)', color: '#FF3B30' }}
                  >
                    <Trash size={13} variant="Outline" color="#FF3B30" /> {lang === 'ar' ? 'حذف' : 'Delete'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[14px] font-medium" style={{ color: '#AEAEB2' }}>
              {lang === 'ar' ? 'لا توجد منتجات' : 'No products found'}
            </p>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70]"
              style={{ background: 'rgba(0,0,0,0.35)' }}
              onClick={() => setDeleteConfirm(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[71] bg-white rounded-[22px] p-6 w-[85vw] max-w-[300px] text-center"
              style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.15)' }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,59,48,0.08)' }}>
                <Trash size={24} variant="Outline" color="#FF3B30" />
              </div>
              <h3 className="text-[16px] font-bold mb-1" style={{ color: '#1C1C1E' }}>
                {lang === 'ar' ? 'حذف المنتج؟' : 'Delete Product?'}
              </h3>
              <p className="text-[12px] mb-5" style={{ color: '#8E8E93' }}>
                {lang === 'ar' ? 'لا يمكن التراجع عن هذا الإجراء' : 'This action cannot be undone'}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 h-[42px] rounded-xl text-[13px] font-semibold"
                  style={{ background: '#F0F0F0', color: '#1C1C1E' }}
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 h-[42px] rounded-xl text-[13px] font-bold"
                  style={{ background: '#FF3B30', color: '#fff', boxShadow: '0 4px 12px rgba(255,59,48,0.25)' }}
                >
                  {lang === 'ar' ? 'حذف' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
