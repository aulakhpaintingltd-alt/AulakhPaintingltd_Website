import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import BeforeAfter from './components/sections/BeforeAfter'
import WhyChooseUs from './components/sections/WhyChooseUs'
import ServiceAreas from './components/sections/ServiceAreas'
import Contact from './components/sections/Contact'
import logo from './assets/images/logo.png'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const minDelay = new Promise(resolve => setTimeout(resolve, 1500));
    const windowLoad = new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve, { once: true });
      }
    });

    Promise.all([minDelay, windowLoad]).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {/* Page Loader */}
      <div className={`page-loader ${!isLoading ? 'page-loader--hidden' : ''}`}>
        <div className="page-loader__content">
          <img src={logo} alt="Aulakh Painting Ltd" className="page-loader__logo" />
          <div
            className="page-loader__spinner"
            style={{ animation: 'loaderSpin 0.8s linear infinite' }}
          ></div>
          <p className="page-loader__text">Loading...</p>
        </div>
      </div>

      {/* Main App */}
      <div className="app">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <BeforeAfter />
          <WhyChooseUs />
          <ServiceAreas />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
