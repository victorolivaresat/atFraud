import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout/Layout";
import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
