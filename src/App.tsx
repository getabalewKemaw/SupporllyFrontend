import React from 'react'
import Home from './sections/Home'
import "./styles/globals.css";
import Features from './components/Features';
import About from './components/About';
import HowItWork from './components/HowItWork';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Button from './components/Button';
const App:React.FC = () => {
  return (
    <>
  <Home/>
  <About/>
 <Features/>
 <HowItWork/>
 <Testimonials/>
 <Contact/>
 <Footer/>
<Button/>
    </>
  )
}
export default App