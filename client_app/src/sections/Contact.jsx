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
    <section id="contact" className="py-32 px-6 border-t border-white/10 relative">
      <div className="container mx-auto max-w-[1400px]">
        
        <div className="flex items-center gap-4 mb-24">
          <div className="w-12 h-[1px] bg-foreground/30"></div>
          <h2 className="text-xl md:text-2xl font-medium tracking-tight text-foreground/80 uppercase">
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
              <h3 className="text-5xl md:text-7xl font-black mb-12 tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-br from-white to-white/30">
                LET'S WORK <br /> TOGETHER.
              </h3>
              <p className="text-xl text-foreground/60 leading-relaxed max-w-md">
                I'm always open to discussing new engineering projects, creative ideas or opportunities to be part of your visions.
              </p>
            </div>
            
            <div className="mt-16 space-y-8">
              <div>
                <h4 className="text-sm font-bold tracking-widest text-accent2 uppercase mb-2">Email</h4>
                <a href="mailto:prthamsinhparmar0@gmail.com" className="text-xl md:text-2xl font-medium hover:text-white transition-colors underline underline-offset-8 decoration-white/20 hover:decoration-white">prthamsinhparmar0@gmail.com</a>
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-widest text-accent1 uppercase mb-2">Location</h4>
                <p className="text-xl md:text-2xl font-medium text-foreground/80">Karjan, Gujarat, India</p>
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
                  <span className="text-sm font-medium text-foreground/40 font-mono">01</span>
                  <label htmlFor="name" className="text-2xl md:text-3xl font-medium text-foreground/80 group-focus-within:text-white transition-colors">What's your name?</label>
                </div>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-foreground/30 py-4 text-xl focus:outline-none focus:border-white transition-colors pl-8 placeholder-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div className="relative group">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-sm font-medium text-foreground/40 font-mono">02</span>
                  <label htmlFor="email" className="text-2xl md:text-3xl font-medium text-foreground/80 group-focus-within:text-white transition-colors">What's your email?</label>
                </div>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-foreground/30 py-4 text-xl focus:outline-none focus:border-white transition-colors pl-8 placeholder-transparent"
                  placeholder="john@doe.com"
                />
              </div>

              <div className="relative group">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-sm font-medium text-foreground/40 font-mono">03</span>
                  <label htmlFor="message" className="text-2xl md:text-3xl font-medium text-foreground/80 group-focus-within:text-white transition-colors">Your message</label>
                </div>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows="1"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-foreground/30 py-4 text-xl focus:outline-none focus:border-white transition-colors pl-8 placeholder-transparent resize-none leading-relaxed"
                  placeholder="Hello Prathamsinh, can you help me with..."
                />
              </div>

              <div className="pt-8">
                <button 
                  type="submit" 
                  disabled={status.loading}
                  className="px-12 py-5 bg-foreground text-background font-black text-lg rounded-full hover:scale-[1.02] transition-transform disabled:opacity-50 inline-flex items-center gap-3"
                >
                  {status.loading ? 'Sending...' : 'Send Message'}
                  {!status.loading && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </button>
              </div>

              {status.success && <p className="text-accent1 mt-4 font-medium">Message sent successfully!</p>}
              {status.error && <p className="text-red-500 mt-4 font-medium">{status.error}</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
