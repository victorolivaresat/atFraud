import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import AppRoutes from "../routes/routes";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      <ToastContainer />
      <div className={isLoginPage ? "" : "grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen"}>
        {!isLoginPage && <Sidebar />}
        <main className={isLoginPage ? "w-full min-h-screen" : "lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll"}>
          {!isLoginPage && <Header />}
          <AppRoutes />
        </main>
      </div>
    </>
  );
  
};

export default Layout;
