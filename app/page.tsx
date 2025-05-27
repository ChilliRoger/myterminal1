"use client";

import { useState, useEffect, useRef } from 'react';
import { FaCode, FaProjectDiagram, FaEnvelope, FaGithub, FaLinkedin, FaFileAlt, FaTerminal, FaExternalLinkAlt, FaMapMarkerAlt, FaPhone, FaDownload } from 'react-icons/fa';

const bootLines = [
  '[  OK  ] Initializing hardware...',
  '[  OK  ] Loading kernel modules...',
  '[  OK  ] Mounting root filesystem...',
  '[  OK  ] Activating swap space...',
  '[  OK  ] Starting udev daemon...',
  '[  OK  ] Loading device drivers...',
  '[  OK  ] Bringing up network interfaces...',
  '[  OK  ] Starting system logger...',
  '[  OK  ] Starting D-Bus system message bus...',
  '[  OK  ] Starting Avahi mDNS/DNS-SD daemon...',
  '[  OK  ] Starting Network Manager...',
  '[  OK  ] Mounting /boot...',
  '[  OK  ] Mounting /home...',
  '[  OK  ] Mounting /var...',
  '[  OK  ] Mounting /tmp...',
  '[  OK  ] Starting SSH daemon...',
  '[  OK  ] Starting ChilliShell service...',
  '[  OK  ] Starting Authorization Manager...',
  '[  OK  ] Starting Disk Manager...',
  '[  OK  ] Starting Print Service...',
  '[  OK  ] Starting Sound Service...',
  '[  OK  ] Starting Bluetooth Service...',
  '[  OK  ] Starting Firewall...',
  '[  OK  ] Synchronizing system clock...',
  '[  OK  ] Checking for system updates...',
  '[  OK  ] Starting Application Loader...',
  '[  OK  ] Starting Clipboard Manager...',
  '[  OK  ] Starting Power Management...',
  '[  OK  ] Starting Display Manager...',
  '[  OK  ] Starting Session Manager...',
  '[  OK  ] Starting Notification Service...',
  '[  OK  ] Starting Accessibility Service...',
  '[  OK  ] Starting Input Method...',
  '[  OK  ] Starting Window Manager...',
  '[  OK  ] Starting Terminal Emulator...',
  '[  OK  ] System boot completed.',
  '',
  'chillishell login: chillishell',
  'Password: ********',
  'Welcome to chillishell Terminal!',
  'Type "help" to get started.',
];

const commands = {
  help: 'Available commands: help, about, gui, projects, contact, clear, whoami, date, time, skills, greet, joke, github, linkedin, resume, echo, random, theme',
  about: 'chillishell is a terminal-style portfolio built with Next.js.',
  projects: '1. Terminal UI \n2. Boot Animation \n3. Linux Simulation',
  contact: 'Email: chilli@gmail.com\nGitHub: github.com/ChilliRoger',
  whoami: 'You are chillishell, the terminal portfolio owner.',
  date: new Date().toDateString(),
  time: new Date().toLocaleTimeString(),
  skills: 'JavaScript, TypeScript, React, Next.js, Node.js, Tailwind CSS',
  greet: 'Hello, welcome to my terminal!',
  joke: 'Why do programmers prefer dark mode? Because light attracts bugs!',
  github: 'Opens GitHub profile.',
  linkedin: 'Opens LinkedIn profile.',
  resume: 'Download resume: https://resume.com/resume.pdf',
  echo: 'Repeats your input. Usage: echo [text]',
  random: 'Shows a random number.',
  theme: 'Toggles fake dark/light theme.',
  clear: 'CLEAR_SCREEN',
  gui: 'Switching to GUI portfolio...',
  terminal: 'Switching to terminal mode...',
};

export default function Home() {
  const [bootIndex, setBootIndex] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [guiMode, setGuiMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bootIndex < bootLines.length) {
      const timer = setTimeout(() => setBootIndex(bootIndex + 1), 400);
      return () => clearTimeout(timer);
    } else {
      setBootComplete(true);
    }
  }, [bootIndex]);

  useEffect(() => {
    if (bootComplete && inputRef.current && !guiMode) {
      inputRef.current.focus();
    }
  }, [bootComplete, guiMode]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    let result: string | undefined = commands[trimmed as keyof typeof commands];

    // Dynamic commands
    if (trimmed === 'date') {
      result = new Date().toDateString();
    }
    if (trimmed === 'time') {
      result = new Date().toLocaleTimeString();
    }
    if (trimmed.startsWith('echo ')) {
      result = trimmed.slice(5);
    }
    if (trimmed === 'random') {
      result = `Random number: ${Math.floor(Math.random() * 10000)}`;
    }
    if (trimmed === 'theme') {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      result = `Theme switched to ${theme === 'dark' ? 'light' : 'dark'}. (Just for fun!)`;
    }
    if (trimmed === 'github') {
      window.open('https://github.com/ChilliRoger', '_blank');
      result = 'Opening GitHub profile...';
    }
    if (trimmed === 'linkedin') {
      window.open('https://www.linkedin.com/in/francis16102005', '_blank');
      result = 'Opening LinkedIn profile...';
    }
    if (trimmed === 'gui') {
      setGuiMode(true);
      result = 'Switching to GUI portfolio...';
    }
    if (trimmed === 'terminal') {
      setGuiMode(false);
      result = 'Switching to terminal mode...';
    }

    if (result === 'CLEAR_SCREEN') {
      setHistory([]);
    } else {
      setHistory([...history, `$ ${trimmed}`, result || 'Command not found. Type "help" for available commands.']);
    }
    setInput('');
  };

  //  GUI Portfolio
  const guiPortfolio = (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Terminal Toggle Button */}
      <button
        onClick={() => setGuiMode(false)}
        className="fixed top-6 right-6 z-50 bg-white/10 backdrop-blur-md text-white rounded-full p-3 hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-lg hover:shadow-xl hover:scale-110"
        title="Switch to Terminal"
      >
        <FaTerminal size={20} />
      </button>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="mb-8"></div>
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaCode className="text-purple-400 text-2xl" />
            <h2 className="text-xl md:text-2xl text-purple-300 font-semibold">Francis Roger 0_o</h2>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Passionate MERN-stack developer crafting beautiful and functional web experiences. 
            Specialized in modern JavaScript frameworks and always eager to learn new technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
            >
              <FaEnvelope /> Get In Touch
            </a>
            <a
              href="#projects"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center gap-2"
            >
              <FaProjectDiagram /> View My Work
            </a>
          </div>
        </section>
        {/* Skills Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Skills</h3>
            <p className="text-gray-300 text-lg">Technologies I work with</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-6xl mx-auto">
            {[
              { name: 'React', color: 'from-blue-400 to-blue-600' },
              { name: 'Next.js', color: 'from-gray-400 to-gray-600' },
              { name: 'Node.js', color: 'from-green-400 to-green-600' },
              { name: 'TypeScript', color: 'from-blue-500 to-blue-700' },
              { name: 'Tailwind CSS', color: 'from-cyan-400 to-cyan-600' },
              { name: 'MongoDB', color: 'from-green-500 to-green-700' },
              { name: 'Docker', color: 'from-blue-400 to-blue-500' }
            ].map((skill, index) => (
              <div
                key={skill.name}
                className={`bg-gradient-to-r ${skill.color} p-4 rounded-3xl text-white text-center font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mx-auto`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <FaCode className="mx-auto mb-2 text-lg" />
                <span className="text-sm">{skill.name}</span>
              </div>
            ))}
          </div>
        </section>
        {/* Projects Section */}
        <section id="projects" className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h3>
            <p className="text-gray-300 text-lg">Some of my recent work</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Terminal UI Portfolio',
                description: 'An interactive Linux-style terminal interface built with React and Next.js. Features boot animation and command system.',
                tech: ['React', 'Next.js', 'TypeScript'],
                gradient: 'from-green-400 to-blue-500'
              },
              {
                title: 'Boot Animation Simulator',
                description: 'Realistic Linux boot process simulation with authentic system messages and loading sequences.',
                tech: ['JavaScript', 'CSS Animations', 'React'],
                gradient: 'from-purple-400 to-pink-500'
              },
              {
                title: 'Linux Command Simulator',
                description: 'Educational app for learning Linux commands in a safe, interactive environment.',
                tech: ['Node.js', 'Express', 'MongoDB'],
                gradient: 'from-orange-400 to-red-500'
              }
            ].map((project, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl group mx-auto"
              >
                <div className={`w-full h-48 bg-gradient-to-r ${project.gradient} rounded-3xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                  <FaProjectDiagram className="text-white text-4xl" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3 text-center">{project.title}</h4>
                <p className="text-gray-300 mb-4 leading-relaxed text-center">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/20 text-white text-sm rounded-full border border-white/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 justify-center">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2">
                    <FaExternalLinkAlt /> Live Demo
                  </button>
                  <button className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center justify-center">
                    <FaGithub />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" className="mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h3>
              <p className="text-gray-300 text-lg">Let&apos;s connect and build something amazing together</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 flex flex-col items-center">
                <h4 className="text-2xl font-bold text-white mb-6 text-center">Contact Information</h4>
                <div className="space-y-4 w-full">
                  <div className="flex items-center gap-4 justify-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <FaEnvelope className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Email</p>
                      <p className="text-white font-semibold">chili@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 justify-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                      <FaMapMarkerAlt className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Location</p>
                      <p className="text-white font-semibold">Dolakpur, India</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 justify-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                      <FaPhone className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Phone</p>
                      <p className="text-white font-semibold">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-8 justify-center w-full">
                  <a
                    href="https://github.com/ChilliRoger"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaGithub /> GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/francis16102005"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaLinkedin /> LinkedIn
                  </a>
                </div>
              </div>
              {/* Resume Download */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mb-6">
                  <FaFileAlt className="text-white text-2xl" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Download Resume</h4>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Get a detailed overview of my experience, skills, and achievements in a professional format.
                </p>
                <a
                  href="https://yourwebsite.com/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold rounded-full hover:from-orange-500 hover:to-red-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3"
                >
                  <FaDownload /> Download PDF
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="text-center py-8 border-t border-white/20">
          <p className="text-gray-400 mb-2">
            &copy; {new Date().getFullYear()} Francis Roger. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Built with Next.js, React, and Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );

  // Main Render
  return guiMode ? (
    guiPortfolio
  ) : (
    <main className="bg-black text-cyan-400 min-h-screen font-mono p-4">
      {!bootComplete ? (
        <div>
          {bootLines.slice(0, bootIndex).map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      ) : (
        <div>
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">{line}</div>
          ))}
          <form onSubmit={handleCommand} className="flex items-center">
            <span className="mr-2 select-none text-cyan-400">$</span>
            <input
              ref={inputRef}
              type="text"
              className="bg-transparent text-cyan-400 placeholder:text-cyan-400 border-none outline-none caret-cyan-400 font-mono flex-1 font-[var(--font-geist-mono)]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              style={{ minWidth: 10, color: '#22d3ee' }}
            />
          </form>
        </div>
      )}
    </main>
  );
}