import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
// Icons
import {
  RiHome3Line,
  RiFileCopyLine,
  RiPieChartLine,
  RiMore2Fill,
  RiCloseFill,
} from "react-icons/ri";

const Sidebar = () => {
  
  const [showMenu, setShowMenu] = useState(false);
  const urlBase = import.meta.env.VITE_URL_BASE;
  const { currentUser } = useAuth();

  console.log(currentUser);

  return (
    <>
      <div
        className={`bg-red-800 h-full fixed lg:static w-[80%] md:w-[40%] lg:w-full transition-all z-50 duration-300 ${
          showMenu ? "left-0" : "-left-full"
        }`}
      >
        {/* Profile */}
        <div className="flex flex-col items-center justify-center p-8 gap-2 h-[30vh]">
          <img
            src={`https://avatar.iran.liara.run/username?username=${currentUser.name}+${currentUser.name}`}
            className="w-20 h-20 object-cover rounded-full ring-2 ring-gray-300"
          />
          <h1 className="text-xl text-white font-bold">{ currentUser.name }</h1>
          <p className="bg-gray-400 py-2 px-4 rounded-full text-white">
            Prevención de Fraude
          </p>
        </div>
        {/* Nav */}
         <div className="bg-gray-900 p-8 rounded-tr-[100px] h-[70vh] {/*overflow-y-scroll*/} flex flex-col justify-between gap-8"> 
          <nav className="flex flex-col gap-8">
            <a
              href={urlBase + "home"} 
              className="flex items-center gap-4 text-white px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiHome3Line /> Home
            </a>
            <a
              href="/evaluations"
              className="flex items-center gap-4 text-white px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiFileCopyLine /> Evaluacion Masiva
            </a>
            <a
              href="#"
              className="flex items-center gap-4 text-white px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiPieChartLine /> Reportes
            </a>

            <a
              href="#"
              className="flex items-center gap-4 text-white px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiHome3Line /> Utilitarios
            </a>
          </nav>
        </div>
      </div>
      {/* Button mobile */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="lg:hidden fixed right-4 bottom-4 text-2xl bg-primary-900 p-2.5 rounded-full text-white z-50"
      >
        {showMenu ? <RiCloseFill /> : <RiMore2Fill />}
      </button>
    </>
  );
};

export default Sidebar;