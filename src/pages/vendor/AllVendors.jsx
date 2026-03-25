import { useState } from 'react';
import { SearchNormal1 } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { vendors } from '../../data/vendors';
import VendorCard from '../../components/ui/VendorCard';

export default function AllVendors() {
  const [query, setQuery] = useState('');
  const { lang } = useLanguage();

  const filtered = vendors.filter(v => {
    const name = lang === 'ar' ? v.nameAr : v.name;
    return name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="bg-mesh min-h-full px-5 py-4">
      <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 mb-5 shadow-soft border border-white/60">
        <SearchNormal1 size={18} variant="Outline" color="rgba(138,122,112,0.60)" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={lang === 'ar' ? 'ابحث عن متجر...' : 'Search vendors...'}
          className="flex-1 bg-transparent outline-none text-[14px] font-medium"
          style={{ color: '#1C1C1E' }}
        />
      </div>
      <div className="space-y-3">
        {filtered.map((v, i) => (
          <VendorCard key={v.id} vendor={v} index={i} />
        ))}
      </div>
    </div>
  );
}
