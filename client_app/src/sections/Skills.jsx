import React from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { 
  MapPin, 
  Briefcase, 
  Music, 
  Keyboard, 
  Plus, 
  ArrowUpRight, 
  Layers,
  ChevronRight,
  ExternalLink,
  Zap
} from 'lucide-react';

const GithubSVG = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

// Cleanly extracted component to fix React Hook errors
const ProjectDiscoverCard = () => {
    const [isHovered, setIsHovered] = React.useState(false);
    return (
        <motion.a 
            href="#projects"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.4)' }}
            className="md:col-span-2 md:row-span-1 relative overflow-hidden rounded-2xl bg-[#0f0f0f] border border-white/10 p-6 flex items-center justify-between group cursor-pointer transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.5)] block"
        >
            <div className="flex flex-col relative z-20 w-[200px]">
                <h3 className="text-2xl font-black leading-none mb-1.5 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Explore Projects</h3>
                
                {/* Ultra-thin Dynamic Progress Bar - State Driven */}
                <div className="relative w-full h-[2px] bg-white/5 rounded-full overflow-hidden mb-2">
                    <motion.div 
                        initial={{ width: "10%" }}
                        animate={{ width: isHovered ? "100%" : "10%" }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        className="h-full bg-accent2 shadow-[0_0_10px_rgba(0,240,255,0.8)]"
                    />
                </div>

                <p className="text-[12px] font-bold text-white/40 uppercase tracking-[0.3em]">View full Projects</p>
            </div>
            <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-700 z-10">
                <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </div>
            
            {/* Background Accent Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        </motion.a>
    );
};

const Counter = ({ value }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px" });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { stiffness: 40, damping: 20 });
    const [displayValue, setDisplayValue] = React.useState(0);

    React.useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    React.useEffect(() => {
        return springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
    }, [springValue]);

    return <span ref={ref}>{displayValue}</span>;
}

const Skills = () => {
  const techLogos = [
    { name: 'HTML5', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: '#E34F26' },
    { name: 'CSS3', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#1572B6' },
    { name: 'Tailwind', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#06B6D4' },
    { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#F7DF1E' },
    { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178C6' },
    { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB' },
    { name: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: '#FFFFFF' },
    { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933' },
    { name: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47A248' },
    { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB' },
    { name: 'Figma', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: '#F24E1E' }
  ];

  const duplicatedLogos = [...techLogos, ...techLogos];

  const [githubData, setGithubData] = React.useState(null);
  const [totalContributions, setTotalContributions] = React.useState(0);
  const [isLoadingGithub, setIsLoadingGithub] = React.useState(true);

  React.useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const username = 'PrathamsinhParmar';
        const response = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
        const data = await response.json();
        
        const flatContributions = data.contributions.flat().slice(-294);
        
        setGithubData(flatContributions);
        setTotalContributions(data.totalContributions || 0);
        setIsLoadingGithub(false);
      } catch (error) {
        console.error('Error fetching github data:', error);
        setGithubData(Array.from({ length: 294 }, () => Math.floor(Math.random() * 4)));
        setIsLoadingGithub(false);
      }
    };
    fetchGithubData();
  }, []);

  const [currentTrack, setCurrentTrack] = React.useState({
    title: 'Starboy',
    artist: 'The Weeknd',
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop'
  });

  React.useEffect(() => {
    const tracks = [
      { 
        title: 'Starboy', 
        artist: 'The Weeknd', 
        image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop' 
      },
      { 
        title: 'Blinding Lights', 
        artist: 'The Weeknd', 
        image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop' 
      },
      { 
        title: 'One Dance', 
        artist: 'Drake', 
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop' 
      },
      { 
        title: 'Lovely', 
        artist: 'Billie Eilish', 
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop' 
      }
    ];
    
    // Choose a random track on load
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
    setCurrentTrack(randomTrack);
  }, []);

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden bg-transparent">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent4/10 rounded-full blur-[140px] pointer-events-none opacity-50"></div>
      
      <div className="container mx-auto max-w-[1200px] relative z-10">
        <div className="flex items-center gap-6 mb-10 md:mb-16">
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent4 to-transparent animate-pulse shadow-[0_0_15px_rgba(112,0,255,0.8)]"></div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-white via-white/90 to-accent4/80 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(112,0,255,0.4)]">
             Expertise & History
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-auto md:grid-flow-row gap-4 max-w-[1200px] mx-auto">
          
          <motion.div 
            whileHover={{ y: -5, borderColor: 'rgba(204, 255, 0, 0.6)' }}
            className="md:col-span-1 md:row-span-1 relative overflow-hidden rounded-2xl bg-[#080800] border border-accent1/20 p-6 min-h-[180px] flex items-center justify-center group transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(204,255,0,0.15),transparent_70%)]"></div>
            <div className="absolute inset-0 grayscale opacity-40 brightness-110 contrast-125 group-hover:brightness-100 transition-all duration-700 mix-blend-screen">
               <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Vadodara,Gujarat&t=&z=12&ie=UTF8&iwloc=B&output=embed"
                className="pointer-events-none"
               ></iframe>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a00] via-transparent to-transparent"></div>
            
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 glass rounded-full border border-white/20 z-20">
              <MapPin size={12} className="text-accent1" />
              <span className="text-[12px] font-bold text-white uppercase tracking-tight">Location</span>
            </div>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-center w-full px-4">
                <div className="relative mb-2 mx-auto w-4 h-4">
                  <div className="absolute inset-0 bg-accent1 rounded-full animate-ping opacity-75"></div>
                  <div className="relative w-full h-full bg-accent1 rounded-full border-2 border-black shadow-[0_0_15px_rgba(204,255,0,0.8)]"></div>
                </div>
                <h4 className="text-2xl font-black leading-none mb-0.5 uppercase tracking-tighter bg-gradient-to-r from-white to-accent1 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(204,255,0,0.4)]">Vadodara</h4>
                <p className="text-[12px] font-bold text-white/40 uppercase tracking-[0.3em]">Gujarat, India</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5, borderColor: 'rgba(255, 0, 85, 0.6)' }}
            className="md:col-span-2 md:row-span-1 relative overflow-hidden rounded-2xl bg-[#0a0005] border border-accent3/20 p-5 flex flex-col justify-between group transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,0,85,0.15),transparent_70%)]"></div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent3/10 rounded-full blur-[60px] -translate-y-1/3 translate-x-1/3 group-hover:bg-accent3/20 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 w-fit rounded-full border border-white/10 mb-2 shadow-xl">
                <Briefcase size={12} className="text-accent3" />
                <span className="text-[12px] font-bold text-white/60 uppercase tracking-tight">Featured work</span>
              </div>
              <h3 className="text-2xl font-black mb-1 tracking-tighter leading-none bg-gradient-to-r from-white to-accent3 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,0,85,0.4)]">Bookmarked</h3>
              <p className="text-[14px] text-white/50 leading-relaxed max-w-[480px] font-medium italic">Effortlessly save and organize your favorite tweets in Notion using a Telegram bot.</p>
            </div>
            
            <div className="mt-1 relative h-[90px] overflow-hidden z-10 [mask-image:linear-gradient(to_bottom,transparent_0%,black_5%,black_95%,transparent_100%)]">
                <motion.div 
                    animate={{ y: ["0%", "-50%"] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="flex flex-col gap-2 pt-1"
                >
                    {[
                        { title: 'Bookmarked', text: 'Tweet saved to Notion', time: 'Just now', icon: <ArrowUpRight size={16} /> },
                        { title: 'Syncing', text: 'Updating database...', time: '2m ago', icon: <Layers size={16} /> },
                        { title: 'Telegram', text: 'Bot active', time: '5m ago', icon: <Zap size={16} /> },
                        { title: 'Notion', text: 'API connected', time: '10m ago', icon: <Briefcase size={16} /> },
                        { title: 'Bookmarked', text: 'Tweet saved to Notion', time: 'Just now', icon: <ArrowUpRight size={16} /> },
                        { title: 'Syncing', text: 'Updating database...', time: '2m ago', icon: <Layers size={16} /> },
                        { title: 'Telegram', text: 'Bot active', time: '5m ago', icon: <Zap size={16} /> },
                        { title: 'Notion', text: 'API connected', time: '10m ago', icon: <Briefcase size={16} /> }
                    ].map((notif, idx) => (
                        <div key={idx} className="glass-card px-3 py-2 border border-white/10 bg-white/[0.03] rounded-xl flex items-center gap-3 h-10 flex-shrink-0">
                            <div className="w-6 h-6 rounded-lg bg-accent3/20 flex items-center justify-center text-accent3 shadow-[0_0_15px_rgba(255,0,85,0.2)] flex-shrink-0">
                                {React.cloneElement(notif.icon, { size: 12 })}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-white uppercase tracking-tight">{notif.title}</span>
                                    <span className="text-[9px] text-white/30 font-bold uppercase">{notif.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5, borderColor: 'rgba(0, 240, 255, 0.6)' }}
            className="md:col-span-1 md:row-span-1 relative overflow-hidden rounded-2xl bg-[#00060a] border border-accent2/20 p-5 flex flex-col justify-between group transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(0,240,255,0.2),transparent_70%)]"></div>
            
            <div className="flex justify-between items-start relative z-10">
                <div className="px-3 py-1.5 bg-white/5 rounded-full border border-white/20 shadow-lg">
                    <Keyboard size={12} className="text-accent2" />
                </div>
                <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] pt-1">Typing Proficiency</span>
            </div>
            
            <div className="relative z-10 flex items-end gap-2">
                <div className="flex flex-col">
                    <span className="text-6xl font-black tracking-tighter bg-gradient-to-r from-white to-accent2 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,240,255,0.4)] leading-none"><Counter value={50} /></span>
                    <span className="text-[12px] font-black text-accent2 uppercase tracking-[0.3em] mt-1 ml-1">Words Per Min</span>
                </div>
                <div className="flex flex-col gap-1.5 pb-1 self-end mb-1">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 rounded-md border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent1 shadow-[0_0_8px_#ccff00]"></span>
                        <span className="text-[10px] font-black text-white/80">15S</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 rounded-md border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent2 shadow-[0_0_8px_#00f0ff]"></span>
                        <span className="text-[10px] font-black text-white/80">100%</span>
                    </div>
                </div>
            </div>
 
            <div className="absolute -bottom-4 -right-2 text-[100px] font-black text-accent2/[0.03] select-none leading-none group-hover:text-accent2/[0.08] transition-all duration-700 pointer-events-none"><Counter value={50} /></div>
          </motion.div>

          <motion.a 
            href="https://open.spotify.com/playlist/5SRH2OGCYCRtZTpeQW2VTj?si=5VOiWqTmSVC5P9oQCUYfzg"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              y: -5, 
              borderColor: 'rgba(112, 0, 255, 0.6)',
              backgroundColor: 'rgba(112, 0, 255, 0.05)'
            }}
            className="md:col-span-1 md:row-span-1 relative overflow-hidden rounded-2xl bg-[#04000a] border border-accent4/20 p-5 flex items-center gap-3.5 group transition-all duration-500 shadow-[15px_15px_40px_rgba(0,0,0,0.5)] cursor-pointer block"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(112,0,255,0.2),transparent_70%)]"></div>
            
            {/* Rotating Album Art */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full overflow-hidden bg-white/5 flex-shrink-0 relative shadow-[0_0_15px_rgba(112,0,255,0.4)] z-10 border border-white/10"
            >
               <img src={currentTrack.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Song art" />
            </motion.div>

            <div className="flex-1 overflow-hidden relative z-10">
                <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[12px] font-bold text-accent4 uppercase tracking-[0.2em] flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-accent4 animate-pulse shadow-[0_0_8px_#7000ff]"></span>
                        Listening
                    </span>
                </div>
                <h4 className="text-base font-black truncate leading-tight tracking-tight bg-gradient-to-r from-white to-accent4 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(112,0,255,0.4)]">{currentTrack.title}</h4>
                <p className="text-[12px] font-bold text-white/40 uppercase tracking-widest truncate">{currentTrack.artist}</p>
            </div>

            {/* Pulsing Music Icon */}
            <motion.div 
              animate={{ 
                y: [0, -3, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-4 right-4 text-accent4/60 group-hover:text-accent4 transition-all duration-500"
            >
                <Music size={16} />
            </motion.div>
          </motion.a>

          {/* Discover Projects Card - White/Glow Theme */}
          <ProjectDiscoverCard />

          <div className="md:col-span-1 md:row-span-1 grid grid-cols-3 gap-2.5">
            {[
              { 
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                ), 
                href: 'https://www.instagram.com/parmarprathamsinh/', 
                color: 'rgba(225, 48, 108, 0.6)' 
              },
              { 
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                ), 
                href: 'https://www.linkedin.com/in/prathamsinhparmar-2162a2300', 
                color: 'rgba(10, 102, 194, 0.6)' 
              },
              { 
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                ), 
                href: 'https://github.com/PrathamsinhParmar', 
                color: 'rgba(255, 255, 255, 0.6)' 
              }
            ].map((social, idx) => (
                <motion.a 
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      y: -3, 
                      borderColor: social.color,
                      backgroundColor: social.color.replace('0.6', '0.1')
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="aspect-square rounded-xl bg-[#0c0c0c] border border-white/10 flex items-center justify-center group cursor-pointer transition-all duration-500 shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
                >
                    <div className="text-white/50 group-hover:text-white transition-colors duration-300">
                      {social.icon}
                    </div>
                </motion.a>
            ))}
          </div>

          {/* Github Activity Card - Green Theme */}
          <motion.div 
            whileHover={{ y: -5, borderColor: 'rgba(38, 166, 65, 0.6)' }}
            className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl bg-[#000502] border border-accent1/20 p-6 flex flex-col justify-between group cursor-pointer transition-all duration-500 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(38,166,65,0.2),transparent_70%)]"></div>
            <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full border border-white/20 shadow-lg">
                        <GithubSVG size={12} className="text-accent1" />
                        <span className="text-[10px] font-bold text-white/60 uppercase tracking-tight">Commit history</span>
                    </div>
                    <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] bg-white/10 px-3 py-1 rounded-full border border-white/10">
                        {isLoadingGithub ? '---' : totalContributions.toLocaleString()} Contributions
                    </span>
                </div>
                
                {/* Visual Github Graph Grid */}
                <div className="flex gap-1 overflow-hidden justify-center mask-fade-right min-h-[85px]">
                    {isLoadingGithub ? (
                        <div className="flex items-center justify-center w-full h-full opacity-20">
                            <div className="w-10 h-[1.5px] bg-accent1 animate-pulse"></div>
                        </div>
                    ) : (
                        Array.from({ length: 42 }).map((_, colIdx) => (
                            <div key={colIdx} className="flex flex-col gap-1">
                                {Array.from({ length: 7 }).map((_, rowIdx) => {
                                    const contribution = githubData[(colIdx * 7) + rowIdx];
                                    const levelMap = { 'NONE': 0, 'FIRST_QUARTILE': 1, 'SECOND_QUARTILE': 2, 'THIRD_QUARTILE': 3, 'FOURTH_QUARTILE': 4 };
                                    const level = levelMap[contribution?.contributionLevel] || 0;
                                    const colors = ['#1a1a1a', '#0e4429', '#006d32', '#26a641', '#39d353'];
                                    
                                    return (
                                        <div 
                                            key={rowIdx} 
                                            title={`${contribution?.date || ''}: ${contribution?.contributionCount || 0} contributions`}
                                            className="w-2.5 h-2.5 rounded-[1.5px] transition-all duration-700 hover:z-10 group-hover:shadow-[0_0_10px_rgba(57,211,83,0.5)]"
                                            style={{ backgroundColor: colors[level] }}
                                        ></div>
                                    );
                                })}
                            </div>
                        ))
                    )}
                </div>
            </div>
            
            <div className="flex justify-between items-center mt-6 relative z-10">
                <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent1 animate-pulse shadow-[0_0_8px_#ccff00]"></span>
                    {isLoadingGithub ? 'Loading github sync...' : 'Synced with your live activity profile'}
                </p>
                <div className="w-10 h-[1.5px] bg-white/20 group-hover:bg-accent1 group-hover:w-16 transition-all duration-700 shadow-[0_0_12px_rgba(204,255,0,0.6)]"></div>
            </div>
          </motion.div>

          {/* Tech Stack Card - Dynamic Glow Theme */}
          <motion.div 
            whileHover={{ y: -5, borderColor: 'rgba(112, 0, 240, 0.6)' }}
            className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl bg-[#04000a] border border-accent4/20 p-6 flex flex-col justify-between group transition-all duration-500 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(112,0,255,0.2),transparent_70%)]"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 w-fit rounded-full border border-white/20 mb-6 shadow-lg">
                    <Layers size={12} className="text-accent4" />
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-tight">Mastery</span>
                </div>
                
                {/* Tech Marquee */}
                <div className="relative w-full overflow-hidden mb-8 h-14 flex items-center">
                    <motion.div 
                        className="flex gap-10 items-center"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    >
                        {duplicatedLogos.map((logo, idx) => (
                            <div key={idx} className="flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 transform drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                <img src={logo.src} alt={logo.name} className="h-8 w-8 object-contain" />
                            </div>
                        ))}
                    </motion.div>
                </div>
                
                <h3 className="text-2xl font-black mb-1.5 tracking-tighter bg-gradient-to-r from-white to-accent4 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(112,0,255,0.4)]">Tech Spectrum</h3>
                <p className="text-[10px] font-bold text-white/40 leading-tight max-w-[400px] uppercase tracking-widest italic pt-1 border-t border-white/5">
                    mastering the stack with high performance.
                </p>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -rotate-6 opacity-[0.04] pointer-events-none select-none group-hover:opacity-[0.08] transition-opacity duration-700">
                 <div className="text-[110px] font-black text-white leading-none whitespace-nowrap">MASTERY</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
