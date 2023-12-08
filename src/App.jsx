import { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../src/app/pages/login";
import Register from "./app/pages/Register";
import CompanyAdminDashboard from "../src/app/pages/CompanyAdminDashboard";
import VendorAdminDashboard from "../src/app/pages/VendorAdminDashboard";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "./app/features/eventSlice";

function App() {
  const auth = useSelector((state) => state.auth);
  const events = useSelector((state) => state.events.events);
  const userRole = auth.user?.role;
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user) {
      dispatch(fetchEvents(auth.token));
    }
  }, [dispatch, auth.user, auth.token]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            auth.user ? (
              userRole === "company" ? (
                <Navigate to="/company-admin" replace />
              ) : userRole === "vendor" ? (
                <Navigate to="/vendor-admin" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/company-admin"
          element={
            auth.user ? (
              userRole === "company" ? (
                <CompanyAdminDashboard
                  events={events}
                  token={auth.token}
                  userId={auth.user._id}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/vendor-admin"
          element={
            auth.user ? (
              userRole === "vendor" ? (
                <VendorAdminDashboard events={events} token={auth.token} />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
