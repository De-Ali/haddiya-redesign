import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { DrawerProvider } from './context/DrawerContext';
import MobileFrame from './components/layout/MobileFrame';
import SideDrawer from './components/ui/SideDrawer';

// Pages
import SplashScreen from './pages/onboarding/SplashScreen';
import OnboardingFlow from './pages/onboarding/OnboardingFlow';
import HomePage from './pages/home/HomePage';
import CategoriesPage from './pages/categories/CategoriesPage';
import ProductListing from './pages/products/ProductListing';
import ProductDetail from './pages/products/ProductDetail';
import SearchPage from './pages/products/SearchPage';
import VendorStore from './pages/vendor/VendorStore';
import AllVendors from './pages/vendor/AllVendors';
import CartPage from './pages/cart/CartPage';
import WishlistPage from './pages/cart/WishlistPage';
import SendAsGift from './pages/cart/SendAsGift';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrderSuccess from './pages/checkout/OrderSuccess';
import LoginPage from './pages/auth/LoginPage';
import PhoneLoginPage from './pages/auth/PhoneLoginPage';
import SignupPage from './pages/auth/SignupPage';
import OtpPage from './pages/auth/OtpPage';
import ForgotPassword from './pages/auth/ForgotPassword';
import ProfilePage from './pages/profile/ProfilePage';
import MyOrders from './pages/profile/MyOrders';
import OrderDetail from './pages/profile/OrderDetail';
import AddressBook from './pages/profile/AddressBook';
import SettingsPage from './pages/profile/SettingsPage';
import NotificationsPage from './pages/profile/NotificationsPage';
import HelpPage from './pages/profile/HelpPage';
import InfoPage from './pages/info/InfoPage';
import VendorDashboard from './pages/vendor-portal/VendorDashboard';
import VendorRegistration from './pages/vendor-portal/VendorRegistration';
import AddProduct from './pages/vendor-portal/AddProduct';
import VendorProducts from './pages/vendor-portal/VendorProducts';
import VendorOrders from './pages/vendor-portal/VendorOrders';
import VendorEarnings from './pages/vendor-portal/VendorEarnings';
import ViewProduct from './pages/vendor-portal/ViewProduct';
import ShippingTo from './pages/profile/ShippingTo';

export default function App() {
  return (
    <HashRouter>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <DrawerProvider>
              <SideDrawer />
              <MobileFrame>
                <Routes>
                  <Route path="/" element={<SplashScreen />} />
                  <Route path="/splash" element={<SplashScreen />} />
                  <Route path="/onboarding" element={<OnboardingFlow />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/products/:categoryId" element={<ProductListing />} />
                  <Route path="/products/:categoryId/:subcategoryId" element={<ProductListing />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/vendor/:id" element={<VendorStore />} />
                  <Route path="/vendors" element={<AllVendors />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/send-as-gift" element={<SendAsGift />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/login-phone" element={<PhoneLoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/otp" element={<OtpPage />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/orders" element={<MyOrders />} />
                  <Route path="/order/:id" element={<OrderDetail />} />
                  <Route path="/addresses" element={<AddressBook />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/help" element={<HelpPage />} />
                  <Route path="/privacy" element={<InfoPage type="privacy" />} />
                  <Route path="/terms" element={<InfoPage type="terms" />} />
                  <Route path="/refund" element={<InfoPage type="refund" />} />
                  <Route path="/shipping" element={<InfoPage type="shipping" />} />
                  <Route path="/payment-methods" element={<InfoPage type="payment" />} />
                  <Route path="/shipping-to" element={<ShippingTo />} />
                  <Route path="/vendor-portal" element={<VendorRegistration />} />
                  <Route path="/vendor-portal/dashboard" element={<VendorDashboard />} />
                  <Route path="/vendor-portal/add-product" element={<AddProduct />} />
                  <Route path="/vendor-portal/products" element={<VendorProducts />} />
                  <Route path="/vendor-portal/orders" element={<VendorOrders />} />
                  <Route path="/vendor-portal/earnings" element={<VendorEarnings />} />
                  <Route path="/vendor-portal/product/:id" element={<ViewProduct />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </MobileFrame>
            </DrawerProvider>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </HashRouter>
  );
}
