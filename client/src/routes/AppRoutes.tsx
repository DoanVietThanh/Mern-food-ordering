import UserLayout from "@/Layout/UserLayout";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route path="/" element={<span>Home Page</span>} />
        <Route path="/user-profile" element={<span>User Profile page</span>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
