import { useState, useRef, useEffect } from 'react';

/*
  Chatbot — a self-contained, rule-based assistant that answers
  questions about Adarsh Kumar Tiwari. No external API / API key
  required, so it never fails due to network issues, quotas, or
  missing credentials. All knowledge lives in KNOWLEDGE_BASE below —
  edit that object any time to update what the bot knows.
*/

const KNOWLEDGE_BASE = {
  greeting:
    "Hey! 👋 I'm Adarsh's portfolio assistant. Ask me anything — skills, core competencies, projects, experience, education, certifications, or how to get in touch. Short queries like \"skills\" or \"projects\" work too!",

  about:
    "Adarsh Kumar Tiwari is a B.Tech Computer Science undergraduate (Class of 2027) and an AI Engineer & Full-Stack Developer. He specializes in building AI-powered applications — conversational agents, RAG pipelines, and full-stack web platforms — turning complex ideas into clean, scalable products that solve real problems. He's completed 8+ internships and is AI/ML certified.",

  education:
    "Adarsh is currently pursuing a B.Tech in Computer Science Engineering, expected to graduate in 2027 (CSE '27).",

  skills:
    "Adarsh's technical skills span:\n• Languages: Java, Python, JavaScript (ES6+)\n• Frontend: React.js, HTML5, CSS3, Tailwind CSS\n• Backend & APIs: Node.js, RESTful APIs\n• AI/ML: NLP, RAG, LLM-based systems, AI model deployment\n• Cloud & DevOps: IBM Cloud, Vercel, Netlify\n• Tools: Git, GitHub, NumPy, Pandas, Data Visualization",

  competencies:
    "Adarsh's core competencies (from the 'Director's Cut' section):\n1. AI & Machine Learning — building intelligent agents and RAG-based systems, applying NLP and LLM-based approaches to real-world problems.\n2. Full-Stack Development — scalable web apps with React interfaces and Node.js powered RESTful APIs.\n3. Cloud & DevOps — deploying on AWS, GCP & containerized environments, with hands-on experience across IBM Cloud, Vercel, and Netlify.\n4. Problem Solving — turning complex ideas into clean, scalable, production-ready products.",

  experience:
    "Adarsh has completed 9 internships:\n• AI Intern (Summer Internship - 2026) — Mirai School of Technology\n• AI Intern (Winter Internship - 2026) — Mirai School of Technology\n• Cloud Computing Intern (Azure) — Microsoft Elevate (AICTE)\n• Cybersecurity with GenAI Intern — Edunet Foundation (VOIS for Tech)\n• AI & Machine Learning Intern — Edunet Foundation (IBM SkillsBuild)\n• AI & Cloud Intern — Edunet Foundation (IBM SkillsBuild)\n• AI & Data Analytics Intern — Edunet Foundation (Shell)\n• Front End Web Development Intern — Edunet Foundation (AICTE)\n• Web Developer Intern — InternPe",

  certifications:
    "Adarsh holds several industry certifications: AI & ML (Microsoft), Power BI (Microsoft), Azure (Microsoft), DSA (Infosys), AI (Infosys), GenAI & GPT (Infosys), Deep Learning (Infosys), Web Dev (IBM), and AI Fundamentals (IBM).",

  contact:
    "You can reach Adarsh at adarshkumart88@gmail.com, or connect via the LinkedIn and GitHub links in the footer / contact section of this site. There's also a contact form on this page that sends messages straight to his inbox.",

  hire:
    "Adarsh is open to opportunities in AI/ML engineering and full-stack development. The best way to reach out is via the contact form on this page or by emailing adarshkumart88@gmail.com.",

  projectsList:
    "Adarsh has built 8 major projects:\n1. CardioAI — cardiovascular risk prediction\n2. DiabetaScan AI — diabetes risk prediction (96% accuracy)\n3. RESQ — real-time disaster response & evacuation platform\n4. Interview Trainer AI Agent — RAG-based interview coaching\n5. AI Health Assistant — multi-agent medical report analysis\n6. Mental Health Score Prediction — ML-based student wellbeing scoring\n7. ROMAL — multi-agent LLM research system\n8. HireLens AI — AI resume analysis vs job descriptions\n\nAsk me about any one of these by name for more detail!",

  projects: {
    cardioai:
      "CardioAI is an AI-powered cardiovascular risk prediction system that analyzes clinical parameters to detect potential heart disease with real-time feedback. Built with Python, KNN, Streamlit, and scikit-learn.",
    diabetascan:
      "DiabetaScan AI is a deep-learning diabetes risk prediction platform analyzing 26 clinical features with 96% accuracy for multi-class diagnostic insights. Built with Python, TensorFlow, Keras, and Streamlit.",
    resq:
      "RESQ is a real-time disaster response and evacuation platform enabling civilians to send SOS alerts, locate safe zones, and connect with volunteers. Built with JavaScript, Leaflet.js, the Geolocation API, and REST APIs.",
    interview:
      "Interview Trainer AI Agent is an AI-powered interview simulation system providing personalized coaching and real-time feedback using RAG-based response generation. Built with Python, RAG, IBM Granite, and NLP.",
    'health assistant':
      "AI Health Assistant is a multi-agent LLM system for comprehensive medical report analysis, providing multi-specialty diagnostic insights with parallel processing. Built with Python, GPT models, multi-agent systems, and LangChain.",
    'mental health':
      "Mental Health Score Prediction is an ML-powered student wellbeing prediction system that analyzes digital habits, sleep, activity, and stress to estimate a mental health score. Built with Python, Random Forest, FastAPI, and scikit-learn.",
    romal:
      "ROMAL is a multi-agent LLM research system that compares single-agent and multi-agent pipelines through query decomposition, deep analysis, critique, and final synthesis. Built with Python, the Gemini API, Streamlit, and multi-agent AI.",
    hirelens:
      "HireLens AI is an AI-powered resume analysis platform that compares resumes with job descriptions to detect missing keywords, weak bullets, and actionable improvements, using the Gemini API, Python, Streamlit, and Pandas.",
  },

  thanks: "You're welcome! Anything else you'd like to know about Adarsh?",

  fallback:
    "I'm not totally sure about that one — I can help with Adarsh's about, skills, core competencies, projects, experience, education, certifications, or contact info. Try a short query like \"skills\" or \"projects\", or ask a full question.",
};

const SUGGESTIONS = [
  'About',
  'Skills',
  'Core competencies',
  'Projects',
  'Experience',
  'Contact',
];

// Regex-based intent classifier. Every pattern is written to match both the
// short single-word form ("skills") and natural sentences ("what are his
// skills?") via optional plural/suffix groups — no network calls, so this
// can never fail due to an API error.
const INTENTS = [
  {
    name: 'projectsList',
    patterns: [/\bproject(s)?\b/, /\bbuil(d|t|ding)\b/, /\bportfolio\s*piece(s)?\b/, /\bwork(ed)?\s*on\b/, /\bshow\s*(me\s*)?(his\s*)?work\b/],
  },
  {
    name: 'competencies',
    patterns: [/\bcompetenc(y|ies)\b/, /\bcore\s*skills?\b/, /\bexpertise\b/, /\bcapabilit(y|ies)\b/, /\bspecializ(e|ation)s?\b/, /\bstrength(s)?\b/],
  },
  {
    name: 'skills',
    patterns: [/\bskills?\b/, /\btech\s*stack\b/, /\btechnolog(y|ies)\b/, /\blanguages?\b/, /\bframeworks?\b/, /\btools?\b/],
  },
  {
    name: 'certifications',
    patterns: [/\bcertificat(e|es|ion|ions)\b/, /\bcertified\b/, /\bcredential(s)?\b/],
  },
  {
    name: 'experience',
    patterns: [/\bexperience(s)?\b/, /\binternship(s)?\b/, /\bintern(s)?\b/, /\bcareer\b/, /\bworked?\s*at\b/, /\bjob\s*history\b/],
  },
  {
    name: 'education',
    patterns: [/\beducation(al)?\b/, /\bcolleges?\b/, /\bdegree(s)?\b/, /\buniversit(y|ies)\b/, /\bstud(y|ying|ies)\b/, /\bb\.?\s?tech\b/, /\bgraduat(e|ion|ing)\b/, /\bcse\b/],
  },
  {
    name: 'contact',
    patterns: [/\bcontact(s|ed|ing)?\b/, /\bemail(s)?\b/, /\breach(es|ed|ing)?\b/, /\blinkedin\b/, /\bgithub\b/, /\bsocial\b/, /\bconnect\b/, /\bphone\b/, /\bnumber\b/],
  },
  {
    name: 'hire',
    patterns: [/\bhir(e|ing|ed)\b/, /\bavailab(le|ility)\b/, /\bopportunit(y|ies)\b/, /\bfreelance\b/, /\bopen\s*to\s*work\b/, /\brecruit(er|ing)?\b/],
  },
  {
    name: 'about',
    patterns: [/\babout\b/, /\bwho\s*is\s*adarsh\b/, /\bwho\s*are\s*you\b/, /\bintroduce\b/, /\bbio\b/, /\bbackground\b/, /\byourself\b/, /\bhim\b/],
  },
  {
    name: 'greeting',
    patterns: [/\b(hi|hello|hey|yo|sup)\b/, /\bgood\s*(morning|afternoon|evening)\b/],
  },
  {
    name: 'thanks',
    patterns: [/\bthanks?\b/, /\bthx\b/, /\bappreciate(d)?\b/],
  },
];

function getBotResponse(rawInput) {
  const input = rawInput.toLowerCase().trim();
  if (!input) return KNOWLEDGE_BASE.fallback;

  // 1. Specific project name mentioned — most specific match wins outright.
  for (const key of Object.keys(KNOWLEDGE_BASE.projects)) {
    if (input.includes(key)) {
      return KNOWLEDGE_BASE.projects[key];
    }
  }

  // 2. Score every general intent by how many of its patterns match, and
  //    take the highest-scoring one (ties broken by list order above, which
  //    is ordered from most specific to most general).
  let bestIntent = null;
  let bestScore = 0;

  for (const intent of INTENTS) {
    const score = intent.patterns.reduce(
      (count, pattern) => count + (pattern.test(input) ? 1 : 0),
      0
    );
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent.name;
    }
  }

  if (bestIntent) {
    if (bestIntent === 'projectsList') return KNOWLEDGE_BASE.projectsList;
    return KNOWLEDGE_BASE[bestIntent];
  }

  return KNOWLEDGE_BASE.fallback;
}

// Kept outside the component so it isn't treated as an impure call
// happening during render.
function getTypingDelay() {
  return 500 + Math.random() * 400;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: KNOWLEDGE_BASE.greeting },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
    setInputValue('');
    setIsTyping(true);

    // Small simulated delay so replies feel conversational rather than instant.
    window.setTimeout(() => {
      const reply = getBotResponse(trimmed);
      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
      setIsTyping(false);
    }, getTypingDelay());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[9999] flex flex-col items-end cursor-auto">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[90vw] max-w-[360px] h-[70vh] max-h-[520px] bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-[fadeInUp_0.25s_ease-out]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-[#141414] border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
              </span>
              <div>
                <p className="text-sm font-bold text-white leading-tight">Adarsh's Assistant</p>
                <p className="text-[11px] text-white/40 font-mono leading-tight">Ask me anything</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-white/50 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-white/5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#0a0a0a]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-red-600 text-white rounded-br-sm'
                      : 'bg-white/[0.07] text-white/90 border border-white/10 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/[0.07] border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}

            {/* Quick suggestions — only show before the user has said anything */}
            {messages.length === 1 && !isTyping && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => sendMessage(s)}
                    className="text-[11px] font-mono px-3 py-1.5 rounded-full border border-red-600/40 text-white/80 hover:bg-red-600/20 hover:border-red-600/60 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 py-3 bg-[#141414] border-t border-white/10">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about skills, projects..."
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-[13px] text-white placeholder-white/30 outline-none focus:border-red-600/60 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Send message"
              className="flex-shrink-0 w-9 h-9 rounded-full bg-red-600 disabled:bg-white/10 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors hover:bg-red-700"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-600 hover:bg-red-700 shadow-[0_0_30px_rgba(229,9,20,0.5)] flex items-center justify-center text-white transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
