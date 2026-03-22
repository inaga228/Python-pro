# Python Pro

**Modern, beautiful & gamified Python learning platform with AI-powered infinite practice**

Python Pro is a sleek, single-page React application that makes learning Python feel like using your favorite dark-mode productivity tool or game — not like reading a boring textbook.

### Core Philosophy

Learn by doing + stunning aesthetics + gentle progression + AI assistance

The app combines:

- concise theory lessons with clear explanations, code snippets, tips & notes
- classic multiple-choice quizzes to test understanding
- **infinite AI-powered practice** — fresh coding tasks generated on demand for any module
- full gamification (XP, levels, daily streak, progress percentages, achievement notifications)
- extremely deep customization (6 hand-crafted themes + 5 font pairs + adjustable text/code size + animations toggle)

### Visual & UX Highlights

- 6 beautifully designed themes with perfectly matched palettes, gradients and glow effects:
  - 🌙 Midnight (default deep blue-black)
  - 🌲 Forest
  - 🔥 Ember
  - 🌌 Aurora
  - ☀️ Light
  - 🌃 Neon (high-contrast cyberpunk vibe)
- Full bilingual support: English & Russian (theory, quizzes, UI strings, AI prompts)
- Glassmorphic header with backdrop blur
- macOS-style window controls on the code editor
- Smooth fade-up animations, progress bars, toast notifications
- Mobile-first responsive design (content centered, max-width \~700px)

### Curriculum Structure (as of March 2026)

6 difficulty levels containing modules:

**Level 1** — Fundamentals  
• Variables & Types  
• Numbers & Math  
• Strings  
• Control Flow (if/elif/else, loops, comprehensions)  
• Functions (*args/**kwargs, lambda, map/filter/reduce, decorators)  
• Data Structures (deep dive into lists, dictionaries, sets, Counter, defaultdict)

**Level 2** — Intermediate  
• OOP (classes, properties, magic methods, inheritance, ABCs, dataclasses)  
• Files & Exceptions (pathlib, json/csv handling, try/except/raise, custom exceptions)

(future levels planned: generators & iterators, concurrency, typing, testing, popular libraries, mini-projects, algorithms & data structures, etc.)

Each lesson includes:

- short theory blocks (text + code + tip/note/warning)
- interactive quiz (4 options, instant feedback, progress bar)
- XP reward on successful completion
- “AI Practice” button — launches endless task generation for that module

### AI Practice Mode (the killer feature)

Start infinite AI-driven coding sessions for any module:

1. AI creates a brand-new task: title + detailed description
2. Shows input/output examples when relevant
3. Provides starter code (if helpful)
4. Built-in code editor with line numbers and theme-matched syntax highlighting
5. “Check” button → sends your code + task to AI judge
6. You receive:
   - score (0–100%)
   - praise or constructive criticism
   - detailed feedback explanation
   - list of improvement suggestions
   - reference solution (optional reveal)
7. Correct solution → +25–50 bonus XP → auto-loads next task
8. Incorrect? → detailed analysis → retry or generate completely new task

### Tech Stack (Frontend)

- React 18 (hooks only)
- Pure inline `style` objects (no external CSS-in-JS libraries)
- LocalStorage persistence for settings, progress, XP, streak & completed lessons
- Context API for global theme/font/language/settings management
- No backend (AI features assume connection to external LLM: Grok, OpenAI, Claude, Gemini, local Llama, etc.)

### Who is this project for?

- Developers building their own beautiful educational SPAs
- People learning modern React + CSS-in-JS + Context + local persistence
- Creators of Duolingo / Brilliant / Mimo-style learning interfaces
- Python instructors looking for inspiration for interactive course platforms
- Fans of clean dark themes, neon, aurora & cyberpunk aesthetics

Feel free to fork it, customize themes, add new modules, connect a real LLM backend for the practice mode, or simply use it as a stylish Python trainer.

If you like the design or find it useful as a reference — please drop a ⭐!

Happy coding! 🐍✨
