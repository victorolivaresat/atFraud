import { useAuth } from "../contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import AppRoutes from "../routes/Routes";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";

const Layout = () => {

  const { isAuthenticated } = useAuth();

  return (
    <>
      <ToastContainer />
      <div className={!isAuthenticated ? "" : "grid lg:grid-cols-4 xl:grid-cols-6  min-h-screen"}>
        {isAuthenticated && <Sidebar />}
        <main className={!isAuthenticated ? "w-full min-h-screen" : "lg:col-span-3 xl:col-span-5 bg-gray-100 dark:bg-gray-700 p-8 h-[100vh] overflow-y-scroll"}>
          {isAuthenticated && <Header />}
          <AppRoutes />
        </main>
      </div>
    </>
  );
  
};

export default Layout;
