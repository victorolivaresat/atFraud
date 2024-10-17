import { Route, Routes, Navigate } from "react-router-dom";
import RouteTransition from "../utils/RouteTransition";
import Evaluation from "../pages/Evaluation/Evaluation";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Test from "../pages/Test/Test";

const urlBase = import.meta.env.VITE_URL_BASE;

const AppRoutes = () => (
  <Routes>
    <Route path={urlBase + 'login'} element={<RouteTransition><Login /></RouteTransition>} />
    <Route element={<ProtectedRoute />}>
      <Route path={urlBase + 'home'} element={<RouteTransition><Home /></RouteTransition>} />
      <Route path={urlBase + 'evaluation/:idcase'} element={<RouteTransition><Evaluation /></RouteTransition>} />
      <Route path={urlBase + 'test'} element={<RouteTransition><Test /></RouteTransition>} />
      <Route path={urlBase + '*'} element={<RouteTransition><NotFound /></RouteTransition>} />
    </Route>
    <Route path="*" element={<Navigate to={urlBase + 'login'} />} />
  </Routes>
);

export default AppRoutes;