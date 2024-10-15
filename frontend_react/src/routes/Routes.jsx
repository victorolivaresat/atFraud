import { Route, Routes, Navigate } from "react-router-dom";
import RouteTransition from "../utils/RouteTransition";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Test from "../pages/Test/Test";

const AppRoutes = () => (
  <Routes>
    <Route
      path="/login"
      element={
        <RouteTransition>
          <Login />
        </RouteTransition>
      }
    />
    <Route element={<ProtectedRoute />}>
      <Route
        path="/"
        element={
          <RouteTransition>
            <Home />
          </RouteTransition>
        }
      />

      <Route
        path="/test"
        element={
          <RouteTransition>
            <Test />
          </RouteTransition>
        }
      />

      <Route
        path="*"
        element={
          <RouteTransition>
            <NotFound />
          </RouteTransition>
        }
      />
    </Route>
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default AppRoutes;
