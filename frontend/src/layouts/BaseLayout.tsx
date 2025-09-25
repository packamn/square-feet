import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

const BaseLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 pb-20 pt-12 md:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
