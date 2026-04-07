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
    <section id="contact" className="py-24 px-6 border-t border-white/10 relative">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-6xl font-black mb-16 tracking-tighter text-center md:text-left">
          SAY HELLO
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl text-muted mb-8 leading-relaxed max-w-lg">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions. Let's build something awesome together!
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm uppercase font-bold tracking-widest text-accent1 mb-1">Email</h4>
                <a href="mailto:prthamsinhparmar0@gmail.com" className="text-lg hover:text-white transition-colors">prthamsinhparmar0@gmail.com</a>
              </div>
              <div>
                <h4 className="text-sm uppercase font-bold tracking-widest text-accent2 mb-1">Location</h4>
                <p className="text-lg text-muted">Karjan, Vadodara, Gujarat, India</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-3xl flex flex-col space-y-8">
              
              <div className="relative">
                <label htmlFor="name" className="text-xs font-bold text-muted uppercase tracking-widest block mb-2">01. Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-white/10 py-3 text-lg focus:outline-none focus:border-accent1 transition-colors bg-transparent placeholder-white/20"
                  placeholder="Enter your name"
                />
              </div>

              <div className="relative">
                <label htmlFor="email" className="text-xs font-bold text-muted uppercase tracking-widest block mb-2">02. Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-white/10 py-3 text-lg focus:outline-none focus:border-accent1 transition-colors bg-transparent placeholder-white/20"
                  placeholder="Enter your email"
                />
              </div>

              <div className="relative">
                <label htmlFor="message" className="text-xs font-bold text-muted uppercase tracking-widest block mb-2">03. Message</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-white/10 py-3 text-lg focus:outline-none focus:border-accent1 transition-colors bg-transparent placeholder-white/20 resize-none"
                  placeholder="Tell me about your project"
                />
              </div>

              <button 
                type="submit" 
                disabled={status.loading}
                className="self-start px-12 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
              >
                {status.loading ? 'Sending...' : 'Send Message'}
              </button>

              {status.success && <p className="text-accent1 mt-4">Message sent successfully!</p>}
              {status.error && <p className="text-red-500 mt-4">{status.error}</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
