import { Route, Routes, Navigate } from "react-router-dom";
import RouteTransition from "../utils/RouteTransition";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Evaluacion from "../pages/Evaluacion/Evaluacion";
import Test from "../pages/Test/Test";

const AppRoutes = () => (
  <Routes>
    <Route
      path="/totalSecure/login" element={<RouteTransition><Login /></RouteTransition>} />
    <Route element={<ProtectedRoute />}>
      <Route path="/totalSecure/" element={<RouteTransition> <Home /></RouteTransition>} />
      <Route path="/totalSecure/inicio" element={<RouteTransition> <Home /></RouteTransition>} />
      <Route path="/totalSecure/evaluacion/:idcaso" element={<RouteTransition><Evaluacion /></RouteTransition>} />
      <Route path="/totalSecure/test" element={<RouteTransition><Test /></RouteTransition>} />
      <Route path="/totalSecure/*" element={<RouteTransition><NotFound /></RouteTransition>} />
    </Route>
    <Route path="/totalSecure/*" element={<Navigate to="totalSecure/login" />} />
  </Routes>
);

export default AppRoutes;
