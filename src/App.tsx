import React from 'react'
import Home from './sections/Home'
import "./styles/globals.css";
import Features from './components/Features';
import About from './components/About';
import HowItWork from './components/HowItWork';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import UserDashboard from "./pages/dashboard/user/UserDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import OAuthSuccess from './pages/OAuthSuccess';
const App: React.FC = () => {
  return (
    <>

      <AuthProvider>

        <Routes>
          <Route path="/" element={
            <>
              <Home />,
              <About />
              <Features />,
              <HowItWork />,
              <Testimonials />,
              <Contact />,
              <Footer />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        {/* User Dashboard */}
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute allowedRoles={["customer", "agent"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        </Routes>
      </AuthProvider>
    </>


  )
}
export default App