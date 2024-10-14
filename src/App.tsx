import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Auth from "./pages/Auth";

import Dashboard from "./pages/Dashboard";
import PassportForm from "./pages/Forms/PassportForm";
import PersonalInfoForms from "./pages/Forms/PersonalInfoForms";
import SeamanBookForm from "./pages/Forms/SeamanBookForm";
import { getToken} from "../session";

interface PrivateRouteProps {
  children: React.ReactNode;
}
function App() {
  function PrivateRoute({  children }:PrivateRouteProps) {
    const token = getToken();
    return token ? children : <Navigate to="/auth" />;
  }
  return (
    <Router>
    <div className="bg-zinc-100 h-[100vh]">

        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/passport-form"
            element={
              <PrivateRoute>
                <PassportForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/personal-info-forms"
            element={
              <PrivateRoute>
                <PersonalInfoForms />
              </PrivateRoute>
            }
          />
          <Route
            path="/seaman-book-form"
            element={
              <PrivateRoute>
                <SeamanBookForm />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to={getToken() ? "/dashboard" : "/auth"} />} />
        </Routes>

    </div>
  </Router>
  );
}

export default App;
