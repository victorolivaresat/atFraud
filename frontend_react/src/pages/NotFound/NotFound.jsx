import LoaderPage from "../../utils/LoaderPage";
import { useState, useEffect } from "react";

const NotFound = () => {
  const [loading, setLoading] = useState(true);

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
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-9xl font-bold">
              404
            </h1>
            <p className="text-2xl">
              <span className="text-red-600">Opps!</span> Página no encontrada.
            </p>
            <p className="text-lg mb-5">
              La página que estás buscando no existe.
            </p>
            <a
              href="/"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
