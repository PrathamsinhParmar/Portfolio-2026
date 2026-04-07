require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');

const projects = [
  {
    title: "AI Code Intel Pro",
    description: "An advanced engineering tool that performs deep structural and security analysis on source code using Large Language Models, providing automated documentation and vulnerability detection.",
    githubLink: "https://github.com/PrathamsinhParmar/AI-Code-Intel",
    liveDemoLink: "https://ai-code-intel.demo.com",
    technologies: ["Next.js", "OpenAI", "Node.js", "Prism.js"]
  },
  {
    title: "Lumina OS Simulation",
    description: "A high-fidelity operating system simulation built for the browser, featuring a window management system, terminal emulator, and custom file system architecture.",
    githubLink: "https://github.com/PrathamsinhParmar/Lumina-OS",
    liveDemoLink: "https://lumina-os.demo.com",
    technologies: ["React", "Framer Motion", "Tailwind CSS", "Canvas API"]
  },
  {
    title: "CryptoPulse Engine",
    description: "A real-time cryptocurrency monitoring dashboard with advanced technical indicators, live websocket data streams, and automated price alert systems.",
    githubLink: "https://github.com/PrathamsinhParmar/CryptoPulse",
    liveDemoLink: "https://cryptopulse.demo.com",
    technologies: ["React", "WebSockets", "Chart.js", "Redis"]
  },
  {
    title: "Vanguard E-Commerce",
    description: "A high-performance, headless e-commerce architecture optimized for conversion with server-side rendering, global state management, and integrated secure payment flows.",
    githubLink: "https://github.com/PrathamsinhParmar/Vanguard-Commerce",
    liveDemoLink: "https://vanguard-commerce.demo.com",
    technologies: ["Next.js", "Stripe API", "MongoDB", "Redux Toolkit"]
  },
  {
    title: "Zenfluence Marketing",
    description: "Creative marketing agency platform helping brands grow through smart strategy and bold execution with highly animated layouts.",
    githubLink: "https://github.com/PrathamsinhParmar/SCT_WD_1/",
    liveDemoLink: "https://prathamsinhparmar.github.io/SCT_WD_1/",
    technologies: ["Framer Motion", "HTML5", "CSS3"]
  }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB connected. Seeding data...');
  await Project.deleteMany({}); // Clear existing records
  await Project.insertMany(projects);
  console.log('Database seeded successfully.');
  process.exit();
})
.catch(err => {
  console.error('Seed script error:', err);
  process.exit(1);
});
