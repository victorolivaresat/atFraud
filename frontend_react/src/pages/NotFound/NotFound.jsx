import LoaderPage from "../../utils/LoaderPage";
import { useState, useEffect } from "react";

const NotFound = () => {
  const [loading, setLoading] = useState(true);
  const urlBase = import.meta.env.VITE_URL_BASE;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading ? (
        <LoaderPage />
      ) : (
        <div className="flex items-center justify-center mt-40">
          <div className="text-center">
            <h1 className="dark:text-gray-300 text-9xl font-bold">
              404
            </h1>
            <p className="text-2xl dark:text-gray-300">
              <span className="text-red-600">Opps!</span> Página no encontrada.
            </p>
            <p className="text-lg mb-5 dark:text-gray-300">
              La página que estás buscando no existe.
            </p>
            <a
              href={urlBase + "home"}
              className="bg-blue-500 dark:bg-gray-900 hover:bg-blue-700 dark:hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
            >
              Ir a Inicio
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default NotFound;
