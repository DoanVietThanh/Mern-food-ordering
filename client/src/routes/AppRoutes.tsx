import ProtectedRoute from "@/auth/ProtectedRoute";
import UserLayout from "@/layout/UserLayout";
import AuthCallbackPage from "@/pages/AuthCallbackPage";
import HomePage from "@/pages/HomePage";
import UserProfilePage from "@/pages/UserProfilePage";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout showHero />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route element={<UserLayout showHero={false} />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/user-profile" element={<UserProfilePage />} />
        </Route>
        <Route path="/search/:city" element={<span>Search City</span>} />
      </Route>

      <Route path="/auth-callback" element={<AuthCallbackPage />} />
    </Routes>
  );
};

export default AppRoutes;
