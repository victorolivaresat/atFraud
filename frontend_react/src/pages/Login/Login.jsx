import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const onSubmit = async (data) => {
    const { email, password } = data;
    await loginUser(email, password);
  };
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center w-full max-w-md p-8 bg-white rounded-lg shadow dark:border md:mt-0 sm:p-10 dark:bg-gray-800 dark:border-gray-700">
        <img className="w-24 h-24 mb-6" src={Logo} alt="Logo" />
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-6">
          Login
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "El correo es requerido" })}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "La contraseña es requerida" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="••••••••"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="h-4 w-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Recuérdame
              </label>
            </div>
            <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <button type="submit" className="w-full text-white bg-gray-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Iniciar sesión
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            ¿No tienes una cuenta?{" "}
            <a href="#" className="font-medium text-red-600 hover:underline dark:text-red-500">
              Regístrate
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
