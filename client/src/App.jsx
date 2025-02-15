import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import LocateUsPage from "./pages/shopping-view/locate_us";
import PrivacyPolicy from "./pages/user-policy/PrivacyPolicy";
import TermsConditions from "./pages/user-policy/TermsConditions";
import Disclaimer from "./pages/user-policy/Disclaimer";
import AboutUs from "./pages/More/AboutUs";
import FAQ from "./pages/More/FAQ/FAQPage";
import Event from "./pages/More/event";
import Blog from "./pages/More/blogpage/index";
import WhatsAppButton from "./components/common/WhatsAppButton";
import Invoice from "./pages/Invoice/Invoice";
import Wishlist from "./components/shopping-view/wishlist"; // ✅ Import Wishlist
import { Navigate } from 'react-router-dom';
import ContactUs from "./pages/More/contactus/ContactForm";
import InquiryPage from "./pages/admin-view/InquiryPage";
function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  console.log(isLoading, user);

  return (
    
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* <Route
          path="/"
          element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />}
        /> */}
        <Route path="/" element={<Navigate to="/shop/home" replace />} />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* Shopping routes */}
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route
            path="checkout"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingCheckout />
              </CheckAuth>
            }
          />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
          <Route path="locate-us" element={<LocateUsPage />} />
          <Route path="wishlist" element={<Wishlist />} /> {/* ✅ Fixed Wishlist Route */}
        </Route>

        {/* Direct wishlist route (in case users navigate manually) */}
        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/reach-us/contact-page" element={<ContactUs />} />
        <Route path="/event" element={<Event />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/whatsappbutton" element={<WhatsAppButton/>} />
        <Route path="shop/checkout/invoice" element={<Invoice/>} />
        <Route path="/whatsappbutton" element={<WhatsAppButton />} />
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/admin/inquiries" element={<InquiryPage/>}/>
      </Routes>
    </div>
  );
}


export default App;
