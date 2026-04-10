import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/* ─────────────────────────────────────────
   Universe Canvas – safe, defensive render
───────────────────────────────────────── */
const UniverseViz = () => {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const stateRef  = useRef(null); // mutable state shared with draw loop

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Give the DOM a frame to lay out, then start
    const init = () => {
      const W = canvas.clientWidth  || 500;
      const H = canvas.clientHeight || 500;
      if (W === 0 || H === 0) { animRef.current = requestAnimationFrame(init); return; }

      canvas.width  = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const cx = W / 2;
      const cy = H / 2;

      /* Stars */
      const stars = Array.from({ length: 220 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.6 + 0.2,
        base: Math.random() * 0.7 + 0.15,
        phase: Math.random() * Math.PI * 2,
        color: ['255,255,255','200,220,255','255,220,200'][Math.floor(Math.random()*3)],
      }));

      /* Planet definitions — scaled up significantly */
      const planets = [
        // Sun — center
        { orbit:0,   a:0,   speed:0,      r:32, name:'Sun',
          c1:'#fff8c0', c2:'#ffdd00', c3:'#ff8800',
          glowC:'rgba(255,210,0,0.22)', glowR:80, rings:false,
          bands:[{y:-0.2,h:0.15,c:'rgba(255,150,0,0.18)'},{y:0.1,h:0.1,c:'rgba(255,100,0,0.12)'}],
          moons:[], type:'sun' },
        // Mercury
        { orbit:72,  a:0.9, speed:0.017,  r:9,  name:'Mercury',
          c1:'#d4c5b2', c2:'#9e8c7a', c3:'#5a4e42',
          glowC:'rgba(160,140,120,0.12)', glowR:18, rings:false,
          bands:[], moons:[], type:'rocky' },
        // Venus
        { orbit:112, a:2.2, speed:0.010,  r:13, name:'Venus',
          c1:'#f5d58a', c2:'#e8960c', c3:'#c0560a',
          glowC:'rgba(240,160,30,0.14)', glowR:26, rings:false,
          bands:[{y:-0.1,h:0.2,c:'rgba(255,200,80,0.2)'},{y:0.2,h:0.12,c:'rgba(220,120,30,0.15)'}],
          moons:[], type:'gas' },
        // Earth
        { orbit:158, a:1.0, speed:0.008,  r:14, name:'Earth',
          c1:'#6eb8e8', c2:'#1a6ab8', c3:'#0a3d6e',
          glowC:'rgba(30,120,220,0.16)', glowR:28, rings:false,
          bands:[{y:-0.05,h:0.25,c:'rgba(40,160,70,0.35)'},{y:0.25,h:0.15,c:'rgba(20,80,180,0.25)'}],
          moons:[{mo:26,ma:0,ms:0.045,mr:4,c1:'#e8e0d0',c3:'#aaa090'}], type:'rocky' },
        // Mars
        { orbit:206, a:3.6, speed:0.006,  r:11, name:'Mars',
          c1:'#f07050', c2:'#c04020', c3:'#7a1a08',
          glowC:'rgba(210,60,30,0.14)', glowR:22, rings:false,
          bands:[{y:0.05,h:0.15,c:'rgba(180,80,40,0.25)'}],
          moons:[], type:'rocky' },
        // Jupiter
        { orbit:264, a:0.4, speed:0.0036, r:24, name:'Jupiter',
          c1:'#f4d4a8', c2:'#c8884a', c3:'#8a4a18',
          glowC:'rgba(200,130,60,0.14)', glowR:42, rings:false,
          bands:[
            {y:-0.55,h:0.18,c:'rgba(180,100,40,0.45)'},
            {y:-0.3, h:0.14,c:'rgba(240,200,140,0.35)'},
            {y:-0.1, h:0.22,c:'rgba(160,80,30,0.4)'},
            {y:0.15, h:0.14,c:'rgba(220,170,100,0.3)'},
            {y:0.32, h:0.2, c:'rgba(180,100,50,0.4)'},
          ],
          storm:{x:-0.2,y:0.1,rx:0.28,ry:0.12,c:'rgba(210,100,60,0.6)'},
          moons:[
            {mo:34,ma:0,   ms:0.05, mr:4,  c1:'#e8d0a0',c3:'#b09060'},
            {mo:44,ma:2.1, ms:0.036,mr:3.5,c1:'#d0c090',c3:'#a08050'},
          ], type:'gas' },
        // Saturn
        { orbit:318, a:5.1, speed:0.0026, r:20, name:'Saturn',
          c1:'#f8e8c0', c2:'#d4a840', c3:'#9a6818',
          glowC:'rgba(215,170,60,0.12)', glowR:36, rings:true,
          bands:[
            {y:-0.3,h:0.18,c:'rgba(200,150,60,0.35)'},
            {y:0.0, h:0.14,c:'rgba(240,200,120,0.25)'},
            {y:0.2, h:0.16,c:'rgba(190,130,50,0.3)'},
          ],
          moons:[], type:'gas' },
      ];

      stateRef.current = { ctx, W, H, cx, cy, stars, planets, t: 0, mouse: { x: cx, y: cy } };

      /* ── Sun corona effect ── */
      const drawSunCorona = (x, y, r) => {
        for (let i = 0; i < 8; i++) {
          const angle = (Math.PI * 2 * i) / 8 + stateRef.current.t * 0.3;
          const len = r * (0.5 + 0.3 * Math.sin(stateRef.current.t * 2 + i));
          const x2 = x + Math.cos(angle) * (r + len);
          const y2 = y + Math.sin(angle) * (r + len);
          const lg = ctx.createLinearGradient(x,y,x2,y2);
          lg.addColorStop(0, 'rgba(255,200,0,0.35)');
          lg.addColorStop(1, 'transparent');
          ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x2,y2);
          ctx.strokeStyle = lg; ctx.lineWidth = 2.5; ctx.stroke();
        }
      };

      /* ── Enhanced sphere with surface detail ── */
      const sphere = (x, y, r, p) => {
        // outer glow
        const g0 = ctx.createRadialGradient(x,y,0,x,y,p.glowR);
        g0.addColorStop(0, p.glowC); g0.addColorStop(1,'transparent');
        ctx.beginPath(); ctx.arc(x,y,p.glowR,0,Math.PI*2);
        ctx.fillStyle = g0; ctx.fill();

        // If Sun draw corona
        if (p.type === 'sun') drawSunCorona(x, y, r);

        // Base sphere body
        const g1 = ctx.createRadialGradient(x-r*0.35,y-r*0.35,r*0.03,x,y,r);
        g1.addColorStop(0, p.c1); g1.addColorStop(0.5, p.c2); g1.addColorStop(1, p.c3);
        ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
        ctx.fillStyle = g1; ctx.fill();

        // Atmospheric bands (clipped to sphere)
        if (p.bands && p.bands.length) {
          ctx.save();
          ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.clip();
          p.bands.forEach(b => {
            const by = y + b.y * r;
            const bh = b.h * r * 2;
            ctx.fillStyle = b.c;
            ctx.fillRect(x - r, by, r * 2, bh);
          });
          ctx.restore();
        }

        // Great Red Spot on Jupiter
        if (p.storm) {
          ctx.save();
          ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.clip();
          const sx = x + p.storm.x * r;
          const sy = y + p.storm.y * r;
          const eg = ctx.createRadialGradient(sx,sy,0,sx,sy,p.storm.rx*r);
          eg.addColorStop(0, p.storm.c); eg.addColorStop(1,'transparent');
          ctx.beginPath();
          ctx.ellipse(sx,sy,p.storm.rx*r,p.storm.ry*r,0,0,Math.PI*2);
          ctx.fillStyle = eg; ctx.fill();
          ctx.restore();
        }

        // Craters for rocky planets
        if (p.type === 'rocky' && r > 8) {
          ctx.save();
          ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.clip();
          [[0.25,-0.3,0.12], [-0.35,0.2,0.09], [0.1,0.4,0.07]].forEach(([cx2,cy2,cr]) => {
            const cxp = x + cx2*r, cyp = y + cy2*r;
            ctx.beginPath(); ctx.arc(cxp,cyp,cr*r,0,Math.PI*2);
            ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 0.5; ctx.stroke();
          });
          ctx.restore();
        }

        // Terminator (shadow on right side for 3D depth)
        const ts = ctx.createRadialGradient(x+r*0.4,y,0,x+r*0.2,y,r*1.1);
        ts.addColorStop(0,'transparent'); ts.addColorStop(0.6,'transparent');
        ts.addColorStop(1,'rgba(0,0,0,0.55)');
        ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
        ctx.fillStyle = ts; ctx.fill();

        // Specular highlight (top-left)
        const g2 = ctx.createRadialGradient(x-r*0.3,y-r*0.3,0,x,y,r*0.8);
        g2.addColorStop(0,'rgba(255,255,255,0.45)'); g2.addColorStop(0.4,'rgba(255,255,255,0.1)'); g2.addColorStop(1,'transparent');
        ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
        ctx.fillStyle = g2; ctx.fill();
      };

      /* ── Saturn rings — enhanced ── */
      const drawRings = (x, y, r) => {
        ctx.save(); ctx.translate(x,y); ctx.scale(1, 0.30);
        // Outer faint ring
        const rg1 = ctx.createLinearGradient(-r*2.8,0,r*2.8,0);
        rg1.addColorStop(0,'rgba(210,180,90,0)'); rg1.addColorStop(0.3,'rgba(210,180,90,0.3)');
        rg1.addColorStop(0.5,'rgba(240,210,110,0.5)'); rg1.addColorStop(0.7,'rgba(210,180,90,0.3)'); rg1.addColorStop(1,'rgba(210,180,90,0)');
        ctx.beginPath(); ctx.arc(0,0,r*2.8,0,Math.PI*2); ctx.arc(0,0,r*2.2,0,Math.PI*2,true);
        ctx.fillStyle = rg1; ctx.fill();
        // Inner bright ring
        const rg2 = ctx.createLinearGradient(-r*2.1,0,r*2.1,0);
        rg2.addColorStop(0,'rgba(240,200,100,0)'); rg2.addColorStop(0.25,'rgba(240,200,100,0.55)');
        rg2.addColorStop(0.5,'rgba(255,225,130,0.75)'); rg2.addColorStop(0.75,'rgba(240,200,100,0.55)'); rg2.addColorStop(1,'rgba(240,200,100,0)');
        ctx.beginPath(); ctx.arc(0,0,r*2.1,0,Math.PI*2); ctx.arc(0,0,r*1.4,0,Math.PI*2,true);
        ctx.fillStyle = rg2; ctx.fill();
        ctx.restore();
      };

      /* ── Orbit path — glowing dashed ellipse ── */
      const orbitPath = (cx2, cy2, rx) => {
        ctx.save(); ctx.translate(cx2,cy2); ctx.scale(1,0.28);
        ctx.beginPath(); ctx.arc(0,0,rx,0,Math.PI*2);
        ctx.setLineDash([5,10]); ctx.strokeStyle='rgba(180,180,255,0.12)';
        ctx.lineWidth = 1.2; ctx.stroke();
        // Subtle glow pass
        ctx.lineWidth = 3; ctx.strokeStyle='rgba(100,120,255,0.04)'; ctx.stroke();
        ctx.setLineDash([]); ctx.restore();
      };

      /* ── Moon ── */
      const drawMoon = (mx, my, m) => {
        const mg = ctx.createRadialGradient(mx,my,0,mx,my,m.mr*3.5);
        mg.addColorStop(0,'rgba(220,210,185,0.25)'); mg.addColorStop(1,'transparent');
        ctx.beginPath(); ctx.arc(mx,my,m.mr*3.5,0,Math.PI*2); ctx.fillStyle=mg; ctx.fill();
        const ms = ctx.createRadialGradient(mx-m.mr*0.35,my-m.mr*0.35,0,mx,my,m.mr);
        ms.addColorStop(0, m.c1||'#fff'); ms.addColorStop(0.6,'#c8bca8'); ms.addColorStop(1,m.c3||'#888');
        ctx.beginPath(); ctx.arc(mx,my,m.mr,0,Math.PI*2); ctx.fillStyle=ms; ctx.fill();
        // Terminator on moon
        const mt = ctx.createRadialGradient(mx+m.mr*0.3,my,0,mx+m.mr*0.1,my,m.mr*1.05);
        mt.addColorStop(0,'transparent'); mt.addColorStop(0.55,'transparent'); mt.addColorStop(1,'rgba(0,0,0,0.45)');
        ctx.beginPath(); ctx.arc(mx,my,m.mr,0,Math.PI*2); ctx.fillStyle=mt; ctx.fill();
      };

      const draw = () => {
        const s = stateRef.current;
        if (!s) return;
        const { ctx, W, H, stars, planets, mouse } = s;
        // Parallax pivot
        const pcx = W/2 + (mouse.x / W - 0.5) * 16;
        const pcy = H/2 - 50 + (mouse.y / H - 0.5) * 10;

        ctx.clearRect(0,0,W,H);

        // Twinkling stars
        stars.forEach(st => {
          const a = st.base * (0.5 + 0.5 * Math.sin(s.t * 1.6 + st.phase));
          ctx.beginPath(); ctx.arc(st.x,st.y,st.r,0,Math.PI*2);
          ctx.fillStyle = `rgba(${st.color},${a})`; ctx.fill();
        });

        // Nebula
        [[pcx-90, pcy-70, 150,'rgba(100,0,255,0.055)'],
         [pcx+80,  pcy+60, 130,'rgba(0,200,255,0.045)'],
         [pcx-30,  pcy+100,100,'rgba(255,0,80,0.03)']].forEach(([nx,ny,nr,nc]) => {
          const n = ctx.createRadialGradient(nx,ny,0,nx,ny,nr);
          n.addColorStop(0, nc);
          n.addColorStop(1, 'transparent');
          ctx.fillStyle = n;
          ctx.fillRect(0, 0, W, H);
        });

        // Orbit paths first
        planets.forEach(p => { if(p.orbit>0) orbitPath(pcx,pcy,p.orbit); });

        // Draw planets (sorted by y for depth — closer to bottom = drawn later)
        // First update angles on original objects so they actually move
        planets.forEach(p => { p.a += p.speed; });

        const sorted = planets.map(p => {
          const px = pcx + Math.cos(p.a) * p.orbit;
          const py = pcy + Math.sin(p.a) * p.orbit * 0.28;
          return { ...p, px, py, original: p };
        }).sort((a,b) => a.py - b.py);

        sorted.forEach(p => {
          if (p.rings) drawRings(p.px, p.py, p.r);
          sphere(p.px, p.py, p.r, p);
          
          p.moons?.forEach(m => {
            m.ma += m.ms;
            const mx = p.px + Math.cos(m.ma)*m.mo;
            const my = p.py + Math.sin(m.ma)*m.mo*0.35;
            drawMoon(mx,my,m);
          });
        });

        s.t += 0.016;
        animRef.current = requestAnimationFrame(draw);
      };

      draw();
    };

    animRef.current = requestAnimationFrame(init);

    const onMove = (e) => {
      const s = stateRef.current;
      if (!s) return;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        s.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }
    };
    window.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', onMove);
      stateRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />

      {/* Floating Info Cards — clustered near galaxy orbit center */}

      {/* Response Time — top-center-right near orbit */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute top-[22%] right-[18%] border border-white/10 rounded-xl px-3 py-2.5 text-right z-10"
      >
        <p className="text-[9px] text-white/40 uppercase tracking-widest font-black mb-0.5">Response Time</p>
        <p className="text-sm font-black text-accent1">Within 24h</p>
      </motion.div>

      {/* Status — left of center, mid-height near orbit */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.2 }}
        className="absolute top-[68%] left-[8%] border border-white/10 rounded-xl px-3 py-2.5 z-10"
      >
        <p className="text-[9px] text-white/40 uppercase tracking-widest font-black mb-1">Status</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent1 animate-pulse shadow-[0_0_8px_rgba(204,255,0,0.9)]" />
          <p className="text-sm font-black text-white">Available for Work</p>
        </div>
      </motion.div>

      {/* Location — right of center, mid-height near orbit */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 2.4 }}
        className="absolute top-[68%] right-[10%] border border-white/10 rounded-xl px-3 py-2.5 z-10"
      >
        <p className="text-[9px] text-white/40 uppercase tracking-widest font-black mb-0.5">Location</p>
        <p className="text-sm font-black text-accent2">Vadodara, India</p>
      </motion.div>

      {/* Available & Reachable pill — bottom-center near innermost orbit */}
      <div className="absolute bottom-[16%] left-0 right-0 flex justify-center pointer-events-none z-10">
        <div className="flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent1 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Available &amp; Reachable</span>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   Floating Label Field
───────────────────────────────────────── */
const FloatingField = ({ id, label, type = 'text', value, onChange, accent, index, required, as: Tag = 'input', rows, placeholder }) => {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="relative group"
    >
      <div className="flex items-start gap-4">
        <span className="text-xs font-black font-mono mt-1 shrink-0" style={{ color: accent }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex-1 relative">
          <label
            htmlFor={id}
            className="block text-[10px] uppercase tracking-widest font-black mb-1.5 transition-colors duration-300"
            style={{ color: focused ? accent : 'rgba(255,255,255,0.35)' }}
          >
            {label}
          </label>
          <Tag
            id={id}
            name={id}
            type={type}
            required={required}
            rows={rows}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base font-medium text-white placeholder-white/20 focus:outline-none transition-all duration-300 resize-none"
            style={{
              borderColor: focused ? accent + 'aa' : undefined,
              boxShadow: focused ? `0 0 20px ${accent}18, inset 0 0 20px ${accent}06` : undefined,
            }}
          />
          <motion.div
            animate={{ scaleX: focused ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 h-[1.5px] w-full rounded-full origin-left"
            style={{ background: accent }}
          />
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   Contact Section
───────────────────────────────────────── */
const Contact = () => {
  const [formData, setFormData] = useState({ name:'', email:'', subject:'', message:'', _honeypot:'' });
  const [status, setStatus]     = useState({ loading:false, success:false, error:null });
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData._honeypot) return;
    setStatus({ loading:true, success:false, error:null });
    try {
      await axios.post(`${API_BASE_URL}/contact`, formData);
      setStatus({ loading:false, success:true, error:null });
      setFormData({ name:'', email:'', subject:'', message:'', _honeypot:'' });
      setTimeout(() => setStatus(p => ({ ...p, success:false })), 7000);
    } catch (err) {
      setStatus({ loading:false, success:false, error: err.response?.data?.error || 'Something went wrong.' });
    }
  };

  const fields = [
    { id:'name',    label:"What's your name?",  type:'text',  accent:'#ccff00', placeholder:'Full Name' },
    { id:'email',   label:"Your email address",  type:'email', accent:'#00f0ff', placeholder:'name@email.com' },
    { id:'subject', label:"What's this about?",  type:'text',  accent:'#7000ff', placeholder:'Subject' },
    { id:'message', label:"Tell me more…",       type:'text',  accent:'#ff0055', placeholder:'Your message here...', as:'textarea', rows:3 },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 md:py-32 px-6 bg-transparent text-white relative overflow-hidden border-t border-white/10"
    >
      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent4/5 blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent2/5 blur-[120px] pointer-events-none z-0" />

      <div className="container mx-auto max-w-[1400px] relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6 }}
          className="flex items-center gap-6 mb-10 md:mb-16"
        >
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent1 to-transparent animate-pulse shadow-[0_0_15px_rgba(204,255,0,0.8)]" />
          <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-white via-white/90 to-accent1/80 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(204,255,0,0.4)]">
            Say Hello
          </h2>
        </motion.div>

        {/* ── Side by side: Form (left) + Universe aligned to form height (right) ── */}
        <div className="flex flex-col xl:flex-row xl:items-stretch gap-12 xl:gap-0">

          {/* LEFT: Form */}
          <motion.div
            initial={{ opacity:0, x:-40 }}
            animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.8, ease:[0.76,0,0.24,1] }}
            className="flex-1 xl:max-w-[55%] xl:pr-12"
          >
            <div className="mb-6">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-white uppercase mb-3 whitespace-nowrap">
                LET'S WORK <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent1 via-accent2 to-accent4">TOGETHER.</span>
              </h3>
              <p className="text-white/50 text-xs md:text-sm font-medium leading-relaxed max-w-xs">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <a href="mailto:prthamsinhparmar0@gmail.com"
                className="group flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 hover:border-accent1/50 hover:bg-accent1/5 transition-all duration-300">
                <svg className="w-4 h-4 text-accent1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span className="text-xs font-bold text-white/60 group-hover:text-white transition-colors tracking-wide truncate max-w-[200px]">prthamsinhparmar0@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2.5">
                <svg className="w-4 h-4 text-accent2 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="text-xs font-bold text-white/60 tracking-wide">Vadodara, Gujarat, India</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input type="text" name="_honeypot" value={formData._honeypot} onChange={handleChange} style={{ display:'none' }} />
              {fields.map((f,i) => (
                <FloatingField key={f.id} id={f.id} label={f.label} type={f.type}
                  accent={f.accent} index={i} required value={formData[f.id]}
                  onChange={handleChange} as={f.as} rows={f.rows} placeholder={f.placeholder} />
              ))}

              <motion.div initial={{ opacity:0,y:10 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:0.5 }} className="pl-8">
                <motion.button
                  type="submit"
                  disabled={status.loading}
                  whileHover={!status.loading ? {
                    y:[0,-8,4,0], x:[0,6,-3,0], rotate:[-0.5,0.5,-0.5,0.5,0],
                    transition:{ duration:2.2, repeat:Infinity, ease:'easeInOut' }
                  } : {}}
                  className="relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 bg-accent1 rounded-full text-black font-black text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(204,255,0,0.25)] hover:shadow-[0_0_40px_rgba(204,255,0,0.45)] transition-shadow duration-300 disabled:opacity-50 group"
                >
                  <div className="absolute top-[100%] left-[50%] -translate-x-[50%] w-[200%] aspect-square bg-accent2 rounded-full scale-0 group-hover:scale-100 group-hover:-top-[50%] transition-all duration-700 ease-[0.76,0,0.24,1]" />
                  <span className="relative z-10 flex items-center gap-3">
                    {status.loading ? (
                      <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" opacity="0.25"/><path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/></svg>Sending...</>
                    ) : (
                      <>Send Message<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:translate-x-1 transition-transform"><path d="M5 12H19M19 12L12 5M19 12L12 19"/></svg></>
                    )}
                  </span>
                </motion.button>
              </motion.div>

              <AnimatePresence>
                {status.success && (
                  <motion.div initial={{ opacity:0,y:10,scale:0.98 }} animate={{ opacity:1,y:0,scale:1 }} exit={{ opacity:0,y:-10 }}
                    className="flex items-center gap-3 px-5 py-4 rounded-xl border border-accent1/30 bg-accent1/5 shadow-[0_0_30px_rgba(204,255,0,0.08)] ml-8">
                    <div className="w-7 h-7 rounded-full bg-accent1 flex items-center justify-center text-black font-black text-xs shrink-0">✓</div>
                    <p className="text-accent1 font-bold text-sm">Thank you! Message delivered to Prathamsinh Parmar.</p>
                  </motion.div>
                )}
                {status.error && (
                  <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }}
                    className="px-5 py-4 rounded-xl border border-red-500/30 bg-red-500/5 text-red-400 font-bold text-sm ml-8">
                    {status.error}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* RIGHT: Universe — height matches form via items-stretch on parent */}
          <motion.div
            initial={{ opacity:0, x:40 }}
            animate={inView ? { opacity:1, y: 30, x:0 } : {}}
            transition={{ duration:0.9, ease:[0.76,0,0.24,1], delay:0.2 }}
            className="hidden xl:block xl:flex-1 relative self-stretch"
            aria-hidden="true"
          >
            {/* Canvas fills exact parent height = form height */}
            {/* Canvas fills exact parent height = form height */}
            <div className="w-full h-full" style={{ background: 'transparent' }}>
              <UniverseViz />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
