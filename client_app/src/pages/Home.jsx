import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Experience from '../sections/Experience';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import Footer from '../components/Footer';

const Home = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div className="bg-background min-h-screen text-foreground">
      {!loadingComplete && <Loader onLoadingComplete={() => setLoadingComplete(true)} />}
      
      {/* Hide scrollbar and content until loader finishes to replicate exact presentation */}
      <div className={`${loadingComplete ? 'opacity-100 overflow-visible' : 'opacity-0 h-screen overflow-hidden'}`}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
