import { useState } from "react";
// Icons
import {
  RiHome3Line,
  RiFileCopyLine,
  RiWalletLine,
  RiPieChartLine,
  RiMore2Fill,
  RiCloseFill,
} from "react-icons/ri";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div
        className={`bg-primary-900 h-full fixed lg:static w-[80%] md:w-[40%] lg:w-full transition-all z-50 duration-300 ${
          showMenu ? "left-0" : "-left-full"
        }`}
      >
        {/* Profile */}
        <div className="flex flex-col items-center justify-center p-8 gap-2 h-[30vh]">
          <img
            src="https://scontent.flim4-3.fna.fbcdn.net/v/t39.30808-6/298330154_10222697371995611_4080471027859696152_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHoXDHJ4GKarpNJiK6OYvSGsEkcd4LkZ3uwSRx3guRne6rY1YdtQYvZj7ysu14JBtU&_nc_ohc=GYtNefEVsHcQ7kNvgEikupL&_nc_zt=23&_nc_ht=scontent.flim4-3.fna&_nc_gid=ArmcyT2ddNcAwiiUurV8yIX&oh=00_AYAACwuPma88c4iurhI4U1cnoH-Z39yZyFAxteVsYMsh1A&oe=6715B261"
            className="w-20 h-20 object-cover rounded-full ring-2 ring-gray-300"
          />
          <h1 className="text-xl text-white font-bold">Angelo Diaz</h1>
          <p className="bg-primary-100 py-2 px-4 rounded-full text-white">
            Ingeniero de Prev Fraude
          </p>
        </div>
        {/* Nav */}
         <div className="bg-primary-300 p-8 rounded-tr-[100px] h-[70vh] {/*overflow-y-scroll*/} flex flex-col justify-between gap-8"> 
          <nav className="flex flex-col gap-8">
            <a
              href="#"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiHome3Line /> Home
            </a>
            <a
              href="#"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiFileCopyLine /> Evaluacion
            </a>
            <a
              href="#"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiWalletLine /> Investigacion
            </a>
            <a
              href="#"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiPieChartLine /> Reportes
            </a>

            <a
              href="#"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiHome3Line /> Utilitarios
            </a>
          </nav>
          {/* <div className="bg-primary-900/50 text-white p-4 rounded-xl">
            <p className="text-gray-400">Having troubles?</p>
            <a href="#">Contact us</a>
          </div> */}
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