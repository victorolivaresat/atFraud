import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const { currentUser, logoutUser } = useAuth();

  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4">
      <h1 className="text-2xl md:text-3xl font-bold dark:text-slate-100">
        Hola! {" "}
        <span className="text-primary-100 dark:text-slate-400">
          {currentUser ? currentUser.name : "Guest"}
        </span>
      </h1>
      <form className="w-full md:w-auto">
        
      </form>
      {currentUser && (
        <button
          onClick={logoutUser}
          className="bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
