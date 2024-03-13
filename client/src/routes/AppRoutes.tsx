import ProtectedRoute from "@/auth/ProtectedRoute";
import UserLayout from "@/layout/UserLayout";
import AuthCallbackPage from "@/pages/AuthCallbackPage";
import DetailRestaurantPage from "@/pages/DetailRestaurantPage";
import HomePage from "@/pages/HomePage";
import ManageRestaurantPage from "@/pages/ManageRestaurantPage";
import SearchPage from "@/pages/SearchPage";
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
          <Route path="/manage-restaurant" element={<ManageRestaurantPage />} />
        </Route>
        <Route path="/search/:city" element={<SearchPage />} />
        <Route path="/detail-restaurant/:restaurantId" element={<DetailRestaurantPage />} />
      </Route>

      <Route path="/auth-callback" element={<AuthCallbackPage />} />
    </Routes>
  );
};

export default AppRoutes;
