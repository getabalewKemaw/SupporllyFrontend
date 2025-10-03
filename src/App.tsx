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
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <>

<AuthProvider>

      <Routes>
        <Route path="/" element={
          <>
          <Home />,
          <About/>
          <Features />,
          <HowItWork />,
          <Testimonials />,
          <Contact />,
          <Footer />
          </>


        } />
        <Route path="/login" element={<Login />} />
      </Routes>
      </AuthProvider>
    </>


  )
}
export default App