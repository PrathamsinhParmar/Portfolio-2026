import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_BASE_URL = 'http://10.86.238.244:5000/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });
    
    try {
      await axios.post(`${API_BASE_URL}/contact`, formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
    } catch (error) {
      setStatus({ loading: false, success: false, error: error.response?.data?.error || 'Failed to send message.' });
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-transparent text-white relative">
      <div className="container mx-auto max-w-[1400px]">
        
        <div className="flex items-center gap-6 mb-24">
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent1 to-transparent animate-pulse shadow-[0_0_15px_rgba(204,255,0,0.8)]"></div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-white via-white/90 to-accent1/80 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(204,255,0,0.4)]">
             Say Hello
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Text Area */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col justify-between"
          >
            <div>
              <h3 className="text-5xl md:text-7xl font-black mb-12 tracking-tight leading-none text-white">
                LET'S WORK <br /> TOGETHER.
              </h3>
              <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed max-w-md">
                I'm always open to discussing new engineering projects, creative ideas or opportunities to be part of your visions.
              </p>
            </div>
            
            <div className="mt-16 space-y-8">
              <div>
                <h4 className="text-sm font-black tracking-widest text-white/40 uppercase mb-2">Email</h4>
                <a href="mailto:prthamsinhparmar0@gmail.com" className="text-xl md:text-2xl font-bold hover:text-accent1 transition-colors underline underline-offset-8 decoration-white/10 hover:decoration-accent1">prthamsinhparmar0@gmail.com</a>
              </div>
              <div>
                <h4 className="text-sm font-black tracking-widest text-white/40 uppercase mb-2">Location</h4>
                <p className="text-xl md:text-2xl font-bold text-white">Karjan, Gujarat, India</p>
              </div>
            </div>
          </motion.div>

          {/* Form Area matching reference exact borders */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col space-y-16 mt-8">
              
              <div className="relative group">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-sm font-bold text-accent1 font-mono">01</span>
                  <label htmlFor="name" className="text-2xl md:text-3xl font-bold text-white/50 group-focus-within:text-white transition-colors">What's your name?</label>
                </div>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-white/10 py-4 text-xl font-bold text-white focus:outline-none focus:border-accent1 transition-colors placeholder-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div className="relative group">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-sm font-bold text-accent2 font-mono">02</span>
                  <label htmlFor="email" className="text-2xl md:text-3xl font-bold text-white/50 group-focus-within:text-white transition-colors">What's your email?</label>
                </div>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-white/10 py-4 text-xl font-bold text-white focus:outline-none focus:border-accent2 transition-colors placeholder-transparent"
                  placeholder="john@doe.com"
                />
              </div>

              <div className="relative group">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-sm font-bold text-accent3 font-mono">03</span>
                  <label htmlFor="message" className="text-2xl md:text-3xl font-bold text-white/50 group-focus-within:text-white transition-colors">Your message</label>
                </div>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows="1"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-white/10 py-4 text-xl font-bold text-white focus:outline-none focus:border-accent3 transition-colors resize-none leading-relaxed placeholder-transparent"
                  placeholder="Hello Prathamsinh, can you help me with..."
                />
              </div>

              <div className="pt-8">
                <button 
                  type="submit" 
                  disabled={status.loading}
                  className="relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 bg-accent1 text-black font-black text-lg rounded-full transition-all group mt-4 mb-2 border-2 border-transparent hover:border-accent2"
                >
                  {/* ARC Background Fill */}
                  <div className="absolute top-[100%] left-[50%] -translate-x-[50%] w-[150%] aspect-square bg-accent2 rounded-full scale-0 group-hover:scale-100 group-hover:-top-[50%] transition-all duration-700 ease-[0.76, 0, 0.24, 1]" />
                  
                  <span className="relative z-10 flex items-center gap-3">
                    {status.loading ? 'Sending...' : 'Send Message'}
                    {!status.loading && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19"/>
                      </svg>
                    )}
                  </span>
                </button>
              </div>

              {status.success && <p className="text-accent1 font-black mt-4 border border-accent1 p-4 rounded-xl inline-block w-fit shadow-[0_0_15px_rgba(204,255,0,0.2)]">Message sent successfully!</p>}
              {status.error && <p className="text-red-500 font-black mt-4">{status.error}</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
