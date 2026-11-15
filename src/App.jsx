import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { ThemeProvider } from "./theme/ThemeContext";
import AppShell from "./components/AppShell";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ClientsPage from "./pages/ClientsPage";
import EarningsPage from "./pages/EarningsPage";
import AttendancePage from "./pages/AttendancePage";
import SchedulePage from "./pages/SchedulePage";

function Protected({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-center" />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <Protected>
                  <AppShell />
                </Protected>
              }
            >
              <Route index element={<HomePage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="earnings" element={<EarningsPage />} />
              <Route path="attendance" element={<AttendancePage />} />
              <Route path="schedule" element={<SchedulePage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
