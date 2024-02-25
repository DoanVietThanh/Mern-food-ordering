import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <div className="container mx-auto flex-1 py-10 text-3xl">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default UserLayout;
