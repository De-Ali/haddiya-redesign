import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isVendor, setIsVendor] = useState(false);

  const login = (userData) => setUser(userData || { name: 'Ahmed Al-Rashdi', nameAr: 'أحمد الراشدي', email: 'ahmed@example.com', phone: '+968 9123 4567', avatar: null });
  const logout = () => { setUser(null); setIsVendor(false); };
  const registerVendor = () => setIsVendor(true);

  return (
    <AuthContext.Provider value={{ user, isVendor, login, logout, registerVendor, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
