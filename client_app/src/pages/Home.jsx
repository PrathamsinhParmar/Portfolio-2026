import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import BackgroundMusic from '../components/BackgroundMusic';
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
    <div className="bg-background min-h-screen text-white relative flex flex-col overflow-x-hidden">
      {/* GLOBAL BACKGROUND MESH BLOBS (Same as Hero) */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-accent4/20 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-[-100px] w-[700px] h-[700px] bg-accent2/10 rounded-full blur-[160px] pointer-events-none z-0 opacity-50" />
      <div className="fixed top-[40%] left-[50%] translate-x-[-50%] w-[900px] h-[500px] bg-accent3/10 rounded-full blur-[200px] pointer-events-none z-0" />

      {/* Always mounted so start-music listener is ready before Loader fires */}
      <BackgroundMusic />

      {!loadingComplete && <Loader onLoadingComplete={() => setLoadingComplete(true)} />}
      
      {/* Content wrapper */}
      <div className={`${loadingComplete ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'} transition-opacity duration-1000 relative z-10`}>
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
