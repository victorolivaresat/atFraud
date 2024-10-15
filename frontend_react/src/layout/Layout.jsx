import { ToastContainer } from "react-toastify";
import AppRoutes from "../routes/routes";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";

const Layout = () => {
  return (
    <>
      <ToastContainer />
      <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <Sidebar />
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
        <Header />
        <AppRoutes />
      </main>
    </div>
    </>
  );
};

export default Layout;
