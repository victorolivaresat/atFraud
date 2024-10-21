import { Route, Routes, Navigate } from "react-router-dom";
import RouteTransition from "../utils/RouteTransition";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Evaluation from "../pages/Evaluation/Evaluation";
import EvaluationMasive from "../pages/EvaluationMasive/EvaluationMasive";
import Test from "../pages/Test/Test";

const urlBase = import.meta.env.VITE_URL_BASE;

const AppRoutes = () => (
  <Routes>
    <Route path={urlBase + 'login'} element={<RouteTransition><Login /></RouteTransition>} />
    <Route element={<ProtectedRoute />}>
      <Route path={urlBase + 'home'} element={<RouteTransition><Home /></RouteTransition>} />
      <Route path={urlBase + 'evaluations'} element={<RouteTransition><EvaluationMasive /></RouteTransition>} /> 
      <Route path={urlBase + 'evaluation/:idCase'} element={<RouteTransition><Evaluation /></RouteTransition>} />
      <Route path={urlBase + 'test'} element={<RouteTransition><Test /></RouteTransition>} />
      <Route path={urlBase + '*'} element={<RouteTransition><NotFound /></RouteTransition>} />
    </Route>
    <Route path="*" element={<Navigate to={urlBase + 'login'} />} />
  </Routes>
);

export default AppRoutes;