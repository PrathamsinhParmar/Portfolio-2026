import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

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
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
    } catch (error) {
      setStatus({ loading: false, success: false, error: error.response?.data?.error || 'Failed to send message.' });
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-accent1 text-black relative">
      <div className="container mx-auto max-w-[1400px]">
        
        <div className="flex items-center gap-4 mb-24">
          <div className="w-12 h-[1px] bg-black/30"></div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight uppercase">
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
              <h3 className="text-5xl md:text-7xl font-black mb-12 tracking-tight leading-none text-black">
                LET'S WORK <br /> TOGETHER.
              </h3>
              <p className="text-lg md:text-xl text-black/80 font-medium leading-relaxed max-w-md">
                I'm always open to discussing new engineering projects, creative ideas or opportunities to be part of your visions.
              </p>
            </div>
            
            <div className="mt-16 space-y-8">
              <div>
                <h4 className="text-sm font-black tracking-widest text-black/50 uppercase mb-2">Email</h4>
                <a href="mailto:prthamsinhparmar0@gmail.com" className="text-xl md:text-2xl font-bold hover:opacity-70 transition-opacity underline underline-offset-8 decoration-black/20 hover:decoration-black">prthamsinhparmar0@gmail.com</a>
              </div>
              <div>
                <h4 className="text-sm font-black tracking-widest text-black/50 uppercase mb-2">Location</h4>
                <p className="text-xl md:text-2xl font-bold">Karjan, Gujarat, India</p>
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
                  <span className="text-sm font-bold text-black/40 font-mono">01</span>
                  <label htmlFor="name" className="text-2xl md:text-3xl font-bold text-black/80 group-focus-within:text-black transition-colors">What's your name?</label>
                </div>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-black/30 py-4 text-xl font-bold text-black focus:outline-none focus:border-black transition-colors placeholder-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div className="relative group">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-sm font-bold text-black/40 font-mono">02</span>
                  <label htmlFor="email" className="text-2xl md:text-3xl font-bold text-black/80 group-focus-within:text-black transition-colors">What's your email?</label>
                </div>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-black/30 py-4 text-xl font-bold text-black focus:outline-none focus:border-black transition-colors placeholder-transparent"
                  placeholder="john@doe.com"
                />
              </div>

              <div className="relative group">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-sm font-bold text-black/40 font-mono">03</span>
                  <label htmlFor="message" className="text-2xl md:text-3xl font-bold text-black/80 group-focus-within:text-black transition-colors">Your message</label>
                </div>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows="1"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-black/30 py-4 text-xl font-bold text-black focus:outline-none focus:border-black transition-colors resize-none leading-relaxed placeholder-transparent"
                  placeholder="Hello Prathamsinh, can you help me with..."
                />
              </div>

              <div className="pt-8">
                <button 
                  type="submit" 
                  disabled={status.loading}
                  className="px-12 py-5 bg-black text-white font-black text-lg rounded-full hover:scale-[1.02] transition-transform disabled:opacity-50 inline-flex items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.2)]"
                >
                  {status.loading ? 'Sending...' : 'Send Message'}
                  {!status.loading && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </button>
              </div>

              {status.success && <p className="text-black font-black mt-4 border border-black p-4 rounded-xl inline-block w-fit">Message sent successfully!</p>}
              {status.error && <p className="text-red-700 font-black mt-4">{status.error}</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
