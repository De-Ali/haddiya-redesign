import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown2 } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { useDrawer } from '../../context/DrawerContext';

export default function DrawerMenuItem({ item, Icon }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { closeDrawer } = useDrawer();

  const label = lang === 'ar' ? item.labelAr : item.label;

  if (item.type === 'separator') {
    return <div className="mx-5 my-2 gold-divider" />;
  }

  const handleNavigate = (route) => {
    closeDrawer();
    setTimeout(() => navigate(route), 150);
  };

  /* ── Link item ── */
  if (item.type === 'link') {
    return (
      <button
        onClick={() => handleNavigate(item.route)}
        className="w-full flex items-center gap-3.5 px-5 py-3.5 active:bg-black/[0.03] transition-colors"
      >
        {Icon && <Icon size={20} variant="Outline" color="#3C3C43" />}
        <span className="flex-1 text-start text-[14px] font-medium" style={{ color: '#1C1C1E' }}>
          {label}
        </span>
        {item.badge && (
          <span
            className="px-2 py-0.5 rounded-md text-[9px] font-bold text-white tracking-wider"
            style={{ background: '#D4AF37' }}
          >
            {item.badge}
          </span>
        )}
      </button>
    );
  }

  /* ── Expandable item ── */
  if (item.type === 'expandable') {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-3.5 px-5 py-3.5 active:bg-black/[0.03] transition-colors"
        >
          {Icon && <Icon size={20} variant="Outline" color="#3C3C43" />}
          <span className="flex-1 text-start text-[14px] font-medium" style={{ color: '#1C1C1E' }}>
            {label}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ArrowDown2 size={16} variant="Outline" color="#AEAEB2" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="pb-1">
                {item.children?.map((child) => {
                  const childLabel = lang === 'ar' ? child.labelAr : child.label;
                  return (
                    <button
                      key={child.id}
                      onClick={() => handleNavigate(child.route)}
                      className="w-full flex items-center gap-2 ps-14 pe-5 py-3 active:bg-black/[0.03] transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#D4AF37' }} />
                      <span className="text-[13px] font-medium" style={{ color: '#6B7280' }}>
                        {childLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return null;
}
