import { useState } from 'react';

export default function Input({ label, icon, type = 'text', className = '', ...props }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-xs font-medium mb-1.5 ms-1" style={{ color: '#8A7A70' }}>{label}</label>
      )}
      <div
        className="flex items-center gap-2 glass-input rounded-2xl px-4 py-3.5"
        style={focused ? { outline: '2px solid rgba(212,175,55,0.20)', borderColor: 'rgba(212,175,55,0.40)', background: 'rgba(255,255,255,0.80)' } : {}}
      >
        {icon && <span className="flex-shrink-0" style={{ color: '#8A7A70' }}>{icon}</span>}
        <input
          type={type}
          className="flex-1 bg-transparent outline-none text-sm font-body"
          style={{ color: '#1C1C1E' }}
          placeholder={props.placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </div>
    </div>
  );
}
