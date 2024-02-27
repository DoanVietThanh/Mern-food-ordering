import UserLayout from "@/layout/UserLayout";
import HomePage from "@/pages/HomePage";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout showHero />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-profile" element={<span>User Profile page</span>} />
      </Route>

      <Route element={<UserLayout showHero={false} />}>
        <Route path="/search/:city" element={<span>Search City</span>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
