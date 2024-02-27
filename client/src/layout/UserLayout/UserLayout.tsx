import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "@/components/Hero";
import { Outlet } from "react-router-dom";

type UserLayoutProps = {
  showHero?: boolean;
};

const UserLayout = ({ showHero }: UserLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      {showHero && <Hero />}
      <div className="container mx-auto flex-1 py-10 text-3xl">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
