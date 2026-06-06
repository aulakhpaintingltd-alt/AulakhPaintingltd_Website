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

function App() {
  return (
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
  )
}

export default App
