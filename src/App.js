import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLogin/AdminLogin.js";
import UserLoginPage from "./pages/UserLogin/UserLogin.js";
// import UserSignupPage from "./pages/UserSignup/UserSignup.js";
import HomePage from "./pages/Home/Home.js";
import ContactUsPage from "./pages/ContactUs/ContactUs.js";
import ProductsPage from "./pages/Products/Products.js";
import TrainingPage from "./pages/training/training.js";
import DashboardPage from "./pages/Dashboard/Dashboard.js";
import NotFound from "./pages/NotFound/NotFound.js";
import PrivateRoutes from "./utils/privateRoutes";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import Order from "./pages/Products/Order/Order";
import DashboardHome from "./pages/DashboardHome/DashboardHome.js";
import DashboardAdmins from "./pages/DashboardAdmins/DashboardAdmins";
import DashboardOrders from "./pages/DashboardOrders/DashboardOrders";
import DashboardProducts from "./pages/DashboardProducts/DashboardProducts";
import DashboardTrainings from "./pages/DashboardTrainings/DashboardTrainings";
import DashboardCategories from "./pages/DashboardCategories/DashboardCategories";
import HeaderPage from "./components/header/header";
import Footer from "./components/footer/footer";
import Spinner from "./components/spinner/spinner";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const isDashboardPath = location.pathname.startsWith("/dashboard");
  const isNotFoundPath = location.pathname === "*";
  const isUnauthorizedPath = location.pathname === "/unauthorized";
  const isAdminLoginPath = location.pathname === "/admin-login";
  const isUserLoginPath = location.pathname === "/user-login";

  // Don't render the header in Dashboard, Unauthorized, and NotFound pages
  const shouldRenderHeader =
    !isDashboardPath &&
    !isNotFoundPath &&
    !isUnauthorizedPath &&
    !isAdminLoginPath &&
    !isUserLoginPath;

  useEffect(() => {
    // Simulate a delay in loading the page
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="App">
      {shouldRenderHeader && <HeaderPage />}
      {isLoading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <div
          className="pages"
          style={shouldRenderHeader ? { marginTop: "85px" } : { marginTop: 0 }}
        >
          <Routes>
            <Route>
              <Route>
                <Route exact path="/" element={<HomePage />} />
                <Route path="admin-login" element={<AdminLoginPage />} />
                <Route path="user-login" element={<UserLoginPage />} />
                <Route path="home-page" element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="training" element={<TrainingPage />} />
                <Route path="contact" element={<ContactUsPage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="unauthorized" element={<Unauthorized />} />
              </Route>
              <Route path="/" element={<PrivateRoutes />}>
                <Route path="/" element={<DashboardPage />}>
                  <Route path="/dashboard" element={<DashboardHome />} />
                  <Route
                    path="/dashboard-admins"
                    element={<DashboardAdmins />}
                  />
                  <Route
                    path="/dashboard-orders"
                    element={<DashboardOrders />}
                  />
                  <Route
                    path="/dashboard-products"
                    element={<DashboardProducts />}
                  />
                  <Route
                    path="/dashboard-trainings"
                    element={<DashboardTrainings />}
                  />
                  <Route
                    path="/dashboard-categories"
                    element={<DashboardCategories />}
                  />
                </Route>
              </Route>

              <Route exact path="/order" element={<Order />} />
              <Route exact path="/show-product" element={<HomePage />} />
              <Route exact path="/" element={<HomePage />} />
              <Route path="admin-login" element={<AdminLoginPage />} />
              <Route path="user-login" element={<UserLoginPage />} />
              {/* <Route path="user-signup" element={<UserSignupPage />} /> */}
              <Route path="home-page" element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              {/* <Route path="products/show-products" element={<ShowProduct />} /> */}
              <Route path="donation" element={<TrainingPage />} />
              <Route path="contact" element={<ContactUsPage />} />
              <Route path="*" element={<NotFound />} />
              <Route path="unauthorized" element={<Unauthorized />} />
            </Route>
          </Routes>
        </div>
      )}
      {shouldRenderHeader && <Footer />}
    </div>
  );
}

export default App;
