require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');

const projects = [
  {
    title: "Zenfluence Marketing",
    description: "Creative marketing agency helping brands grow through smart strategy and bold execution.",
    githubLink: "https://github.com/PrathamsinhParmar/SCT_WD_1/",
    liveDemoLink: "https://prathamsinhparmar.github.io/SCT_WD_1/",
    technologies: ["HTML5", "CSS3", "JavaScript"]
  },
  {
    title: "Interactive Quiz",
    description: "A fun and engaging way to learn, compete, and prove how smart you really are.",
    githubLink: "https://github.com/PrathamsinhParmar/SCT_WD_3/",
    liveDemoLink: "https://prathamsinhparmar.github.io/SCT_WD_3/",
    technologies: ["React JS", "CSS Modules"]
  },
  {
    title: "Stop Watch",
    description: "A simple and precise stopwatch to track time for any activity.",
    githubLink: "https://github.com/PrathamsinhParmar/SCT_WD_2/",
    liveDemoLink: "https://prathamsinhparmar.github.io/SCT_WD_2/",
    technologies: ["Vanilla JS", "Tailwind CSS"]
  },
  {
    title: "Task Manager App",
    description: "A clean and efficient task manager to help you plan, track, and complete your daily goals.",
    githubLink: "https://github.com/PrathamsinhParmar/SCT_WD_4/tree/master",
    liveDemoLink: "https://prathamsinhparmar.github.io/SCT_WD_4/",
    technologies: ["React JS", "Node.js"]
  },
  {
    title: "Notes Web App",
    description: "A minimal notes app to jot down ideas, reminders, and to-dos anytime.",
    githubLink: "https://github.com/PrathamsinhParmar/JavaScript-Mini-Projects/blob/main/NotesApp.html",
    liveDemoLink: "https://prathamsinhparmar.github.io/JavaScript-Mini-Projects/NotesApp.html",
    technologies: ["JavaScript", "HTML", "CSS"]
  },
  {
    title: "EbookHub",
    description: "EbookHub is your go-to platform for downloading free IT and computer science eBooks.",
    githubLink: "https://prathamsinhparmar.github.io/Portfolio_2025/",
    liveDemoLink: "https://prathamsinhparmar.github.io/Portfolio_2025/",
    technologies: ["React Router", "Tailwind CSS"]
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
