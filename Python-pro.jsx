import { useState, useEffect, useCallback, createContext, useContext } from "react";

// ─── THEMES ────────────────────────────────────────────────────────────────────
const THEMES = {
  midnight: {
    name: "Midnight", nameRu: "Полночь",
    bg: "#060d1a", surface: "#0d1420", border: "#1e2d4a",
    text: "#c8d8f0", textMuted: "#4a6a8a", textBright: "#e0ecff",
    accent: "#3b82f6", accentGlow: "#3b82f640",
    code: "#060d1a", codeBorder: "#1a2840", codeText: "#7dd3fc",
    card: "#0a1020", headerBg: "rgba(6,13,26,0.96)",
    success: "#4ade80", successBg: "#052e16", successBorder: "#166534",
    error: "#f87171", errorBg: "#1c0a0a", errorBorder: "#7f1d1d",
    warn: "#fbbf24", gradAccent: "linear-gradient(135deg,#1a56db,#0e3a96)",
  },
  forest: {
    name: "Forest", nameRu: "Лес",
    bg: "#060f0a", surface: "#0a1a0e", border: "#1a3a20",
    text: "#c0dcc8", textMuted: "#4a7a58", textBright: "#e0f0e8",
    accent: "#22c55e", accentGlow: "#22c55e40",
    code: "#040c06", codeBorder: "#163020", codeText: "#86efac",
    card: "#080f0a", headerBg: "rgba(6,15,10,0.96)",
    success: "#4ade80", successBg: "#052e16", successBorder: "#166534",
    error: "#f87171", errorBg: "#1c0a0a", errorBorder: "#7f1d1d",
    warn: "#fbbf24", gradAccent: "linear-gradient(135deg,#15803d,#166534)",
  },
  ember: {
    name: "Ember", nameRu: "Уголь",
    bg: "#0f0906", surface: "#1a100a", border: "#3a2010",
    text: "#e0c8b0", textMuted: "#7a5040", textBright: "#f0e0d0",
    accent: "#f97316", accentGlow: "#f9731640",
    code: "#0c0704", codeBorder: "#2a1808", codeText: "#fdba74",
    card: "#120b07", headerBg: "rgba(15,9,6,0.96)",
    success: "#4ade80", successBg: "#052e16", successBorder: "#166534",
    error: "#f87171", errorBg: "#1c0a0a", errorBorder: "#7f1d1d",
    warn: "#fbbf24", gradAccent: "linear-gradient(135deg,#c2410c,#9a3412)",
  },
  aurora: {
    name: "Aurora", nameRu: "Аврора",
    bg: "#09060f", surface: "#120a1e", border: "#2a1a3e",
    text: "#d8c8f0", textMuted: "#5a4a7a", textBright: "#f0e8ff",
    accent: "#a78bfa", accentGlow: "#a78bfa40",
    code: "#070410", codeBorder: "#1e1030", codeText: "#c4b5fd",
    card: "#0c0818", headerBg: "rgba(9,6,15,0.96)",
    success: "#4ade80", successBg: "#052e16", successBorder: "#166534",
    error: "#f87171", errorBg: "#1c0a0a", errorBorder: "#7f1d1d",
    warn: "#fbbf24", gradAccent: "linear-gradient(135deg,#7c3aed,#6d28d9)",
  },
  light: {
    name: "Light", nameRu: "Светлая",
    bg: "#f5f7fa", surface: "#ffffff", border: "#e2e8f0",
    text: "#334155", textMuted: "#94a3b8", textBright: "#0f172a",
    accent: "#3b82f6", accentGlow: "#3b82f620",
    code: "#f8fafc", codeBorder: "#e2e8f0", codeText: "#1d4ed8",
    card: "#f0f4f8", headerBg: "rgba(245,247,250,0.96)",
    success: "#16a34a", successBg: "#f0fdf4", successBorder: "#bbf7d0",
    error: "#dc2626", errorBg: "#fef2f2", errorBorder: "#fecaca",
    warn: "#d97706", gradAccent: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
  },
  neon: {
    name: "Neon", nameRu: "Неон",
    bg: "#000000", surface: "#0a0a0a", border: "#1a1a2e",
    text: "#c8ffc8", textMuted: "#2a5a2a", textBright: "#00ff88",
    accent: "#00ff88", accentGlow: "#00ff8840",
    code: "#000000", codeBorder: "#0a2a0a", codeText: "#00ff88",
    card: "#050505", headerBg: "rgba(0,0,0,0.98)",
    success: "#00ff88", successBg: "#001a0a", successBorder: "#00ff8860",
    error: "#ff0066", errorBg: "#1a0008", errorBorder: "#ff006660",
    warn: "#ffff00", gradAccent: "linear-gradient(135deg,#00ff88,#00cc66)",
  },
};

const FONTS = {
  syne:    { name: "Syne", url: "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap", display: "'Syne',sans-serif", mono: "'JetBrains Mono',monospace" },
  inter:   { name: "Inter", url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fira+Code:wght@300;400;500&display=swap", display: "'Inter',sans-serif", mono: "'Fira Code',monospace" },
  mono:    { name: "All Mono", url: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700;800&display=swap", display: "'JetBrains Mono',monospace", mono: "'JetBrains Mono',monospace" },
  serif:   { name: "Serif", url: "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap", display: "'Lora',serif", mono: "'JetBrains Mono',monospace" },
  rounded: { name: "Rounded", url: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap", display: "'Nunito',sans-serif", mono: "'JetBrains Mono',monospace" },
};

// ─── I18N ──────────────────────────────────────────────────────────────────────
const T = {
  ru: {
    appName:"PyLearn Pro", level:"Уровень", xp:"XP", streak:"Серия",
    modules:"Модули", roadmap:"Карта курса", stats:"Статистика", settings:"Настройки",
    practice:"AI-Практика", theory:"Теория", quiz:"Тест",
    toQuiz:"К тесту →", repeatTheory:"Повторить теорию",
    correct:"из", right:"верно",
    checkCode:"✓ Проверить", checking:"⚙️ Проверяю...", nextTask:"Следующее задание →",
    hint:"Подсказка", newTask:"Новое задание",
    showSolution:"Показать решение", hideSolution:"Скрыть решение",
    generating:"AI генерирует задание...",
    lessonsDone:"уроков", moduleDone:"завершён",
    locked:"Заблокировано", unlockAt:"Пройдите предыдущий модуль",
    themeSettings:"Тема", fontSettings:"Шрифт", langSettings:"Язык",
    fontSize:"Размер текста", codeSize:"Размер кода", animations:"Анимации",
    soundFx:"Звуки", autoNext:"Авто-следующий вопрос",
    resetProgress:"Сбросить прогресс", resetConfirm:"Точно сбросить?",
    cancel:"Отмена", confirm:"Да, сбросить",
    courseProgress:"Прогресс курса", levelProgress:"Прогресс уровней",
    totalXP:"Всего XP", totalLessons:"Уроков", completedMods:"Модулей",
    nextLevel:"До следующего уровня",
    aiTask:"AI-задание", exampleIn:"Пример входа", exampleOut:"Ожидаемый выход",
    improvements:"Как улучшить", excellent:"Отлично!", tryAgain:"Попробуй ещё",
    lessonComplete:"+XP! Урок пройден! 🎯", aiBonus:"XP за AI-задание! 🤖",
    quickPractice:"Быстрая практика",
    back:"← Назад",
    startLesson:"Начать урок",
    aiPractice:"AI-практика по теме",
    note:"Заметка", tip:"Совет", warning:"Важно",
  },
  en: {
    appName:"PyLearn Pro", level:"Level", xp:"XP", streak:"Streak",
    modules:"Modules", roadmap:"Roadmap", stats:"Stats", settings:"Settings",
    practice:"AI Practice", theory:"Theory", quiz:"Quiz",
    toQuiz:"To Quiz →", repeatTheory:"Repeat Theory",
    correct:"of", right:"correct",
    checkCode:"✓ Check", checking:"⚙️ Checking...", nextTask:"Next Task →",
    hint:"Hint", newTask:"New Task",
    showSolution:"Show Solution", hideSolution:"Hide Solution",
    generating:"AI is generating a task...",
    lessonsDone:"lessons", moduleDone:"complete",
    locked:"Locked", unlockAt:"Complete previous module",
    themeSettings:"Theme", fontSettings:"Font", langSettings:"Language",
    fontSize:"Font Size", codeSize:"Code Size", animations:"Animations",
    soundFx:"Sounds", autoNext:"Auto-next question",
    resetProgress:"Reset Progress", resetConfirm:"Are you sure?",
    cancel:"Cancel", confirm:"Yes, reset",
    courseProgress:"Course Progress", levelProgress:"Level Progress",
    totalXP:"Total XP", totalLessons:"Lessons", completedMods:"Modules",
    nextLevel:"Until next level",
    aiTask:"AI Task", exampleIn:"Input example", exampleOut:"Expected output",
    improvements:"Improvements", excellent:"Excellent!", tryAgain:"Try again",
    lessonComplete:"+XP! Lesson done! 🎯", aiBonus:"XP for AI task! 🤖",
    quickPractice:"Quick Practice",
    back:"← Back",
    startLesson:"Start Lesson",
    aiPractice:"AI Practice on this topic",
    note:"Note", tip:"Tip", warning:"Important",
  },
};

// ─── SETTINGS CONTEXT ─────────────────────────────────────────────────────────
const SettingsCtx = createContext(null);
const useSettings = () => useContext(SettingsCtx);

// ─── CURRICULUM ───────────────────────────────────────────────────────────────
const buildCurriculum = (lang) => {
  const isEn = lang === "en";
  return [
  // ══ MODULE 1 ══
  { id:"m_vars", title: isEn?"Variables & Types":"Переменные и типы", icon:"🧱", color:"#4ade80", level:1,
    desc: isEn?"Python fundamentals — variables, types, operators":"Основы Python — переменные, типы данных, операторы",
    lessons:[
      { id:"l_vars1", title: isEn?"Variables & Assignment":"Переменные и присваивание", xp:50,
        sections:[
          { type:"text", content: isEn
              ?"**Variables** are named containers for data. Python uses **dynamic typing** — you don't declare types."
              :"**Переменные** — именованные контейнеры для данных. Python использует **динамическую типизацию** — типы объявлять не нужно." },
          { type:"code", content:`name = "Alice"      # str\nage = 25            # int\nheight = 1.75       # float\nis_ok = True        # bool\nnothing = None      # NoneType` },
          { type:"tip", content: isEn?"Use snake_case for variable names: my_variable, not myVariable":"Используй snake_case: my_variable, не myVariable" },
          { type:"text", content: isEn?"**Type conversion:**":"**Преобразование типов:**" },
          { type:"code", content:`x = int("42")       # "42" → 42\ns = str(3.14)       # 3.14 → "3.14"\nf = float("3.14")   # "3.14" → 3.14\nb = bool(0)         # 0 → False\nb2 = bool(1)        # 1 → True` },
          { type:"note", content: isEn?"type() shows the type of a variable":"Функция type() показывает тип переменной: print(type(42)) → <class 'int'>" },
          { type:"text", content: isEn?"**Multiple assignment:**":"**Множественное присваивание:**" },
          { type:"code", content:`a, b, c = 1, 2, 3\nx = y = z = 0\na, b = b, a  # swap!` },
        ],
        quiz:[
          { q: isEn?"What type is 3.14?":"Какой тип у 3.14?", opts:["int","float","str","double"], ans:1 },
          { q: isEn?"Convert string '5' to integer:":"Преобразовать строку '5' в число:", opts:["str('5')","float('5')","int('5')","num('5')"], ans:2 },
          { q: isEn?"What does a, b = b, a do?":"Что делает a, b = b, a?", opts:[isEn?"Error":"Ошибка",isEn?"Copies b to a":"Копирует b в a",isEn?"Swaps values":"Меняет значения местами",isEn?"Deletes variables":"Удаляет переменные"], ans:2 },
          { q: isEn?"bool(0) returns:":"bool(0) вернёт:", opts:["True","False","0","None"], ans:1 },
        ]
      },
      { id:"l_vars2", title: isEn?"Numbers & Math":"Числа и математика", xp:55,
        sections:[
          { type:"text", content: isEn?"Python has powerful built-in math operations:":"Python имеет мощные встроенные математические операции:" },
          { type:"code", content:`# Арифметика\nprint(10 + 3)   # 13\nprint(10 - 3)   # 7\nprint(10 * 3)   # 30\nprint(10 / 3)   # 3.333...\nprint(10 // 3)  # 3  (целочисленное деление)\nprint(10 % 3)   # 1  (остаток)\nprint(10 ** 3)  # 1000 (степень)` },
          { type:"code", content:`# Встроенные функции\nprint(abs(-5))      # 5\nprint(round(3.7))   # 4\nprint(round(3.14159, 2))  # 3.14\nprint(max(1,5,3))   # 5\nprint(min(1,5,3))   # 1\nprint(sum([1,2,3])) # 6` },
          { type:"code", content:`# Модуль math\nimport math\nprint(math.sqrt(16))     # 4.0\nprint(math.pi)           # 3.14159...\nprint(math.floor(3.9))   # 3\nprint(math.ceil(3.1))    # 4\nprint(math.log(100, 10)) # 2.0` },
          { type:"tip", content: isEn?"Use // for integer division when you need a whole number result":"Используй // когда нужен целочисленный результат деления" },
        ],
        quiz:[
          { q:"10 // 3 = ?", opts:["3","3.33","4","1"], ans:0 },
          { q:"10 % 3 = ?", opts:["3","0","1","10"], ans:2 },
          { q:"2 ** 8 = ?", opts:["16","64","256","512"], ans:2 },
          { q: isEn?"math.ceil(3.2) returns:":"math.ceil(3.2) вернёт:", opts:["3","3.2","4","3.0"], ans:2 },
        ]
      },
      { id:"l_strings", title: isEn?"Strings":"Строки", xp:65,
        sections:[
          { type:"text", content: isEn?"**Strings** are sequences of characters. Python offers many ways to work with them.":"**Строки** — последовательности символов. Python предлагает множество способов работы с ними." },
          { type:"code", content:`s = "Hello, World!"\nprint(len(s))           # 13\nprint(s[0])             # H\nprint(s[-1])            # !\nprint(s[0:5])           # Hello\nprint(s[7:])            # World!\nprint(s[:5])            # Hello\nprint(s[::2])           # Hlo ol!` },
          { type:"code", content:`# Методы строк\nprint("hello".upper())        # HELLO\nprint("WORLD".lower())        # world\nprint("  hi  ".strip())       # hi\nprint("hi".center(10, "-"))   # ----hi----\nprint("a,b,c".split(","))     # ['a','b','c']\nprint(",".join(["a","b","c"])) # a,b,c\nprint("hello".replace("l","r")) # herro\nprint("hello".count("l"))      # 2\nprint("hello".startswith("he")) # True` },
          { type:"text", content: isEn?"**f-strings** — the modern way to format strings (Python 3.6+):":"**f-строки** — современный способ форматирования (Python 3.6+):" },
          { type:"code", content:`name, age = "Alice", 25\nprint(f"Имя: {name}, возраст: {age}")\nprint(f"Через 10 лет: {age + 10}")\nprint(f"Pi = {3.14159:.2f}")    # Pi = 3.14\nprint(f"{name!r}")             # 'Alice'\nprint(f"{100*0.75:.1%}")       # 75.0%` },
          { type:"note", content: isEn?"Strings are immutable — you can't change a character in place. You must create a new string.":"Строки неизменяемы — нельзя изменить символ на месте, нужно создать новую строку." },
        ],
        quiz:[
          { q: isEn?"'python'[1:4] returns:":"'python'[1:4] вернёт:", opts:["pyt","yth","ytho","hon"], ans:1 },
          { q: isEn?"How to uppercase a string s?":"Как сделать строку s заглавной?", opts:["s.uppercase()","s.upper()","upper(s)","s.toUpper()"], ans:1 },
          { q: isEn?"'a,b,c'.split(',') returns:":"'a,b,c'.split(',') вернёт:", opts:["'abc'","('a','b','c')","['a','b','c']","{'a','b','c'}"], ans:2 },
          { q: isEn?"f'x={2+3}' equals:":"f'x={2+3}' равно:", opts:["'x=2+3'","'x=5'","'x={2+3}'","Error"], ans:1 },
        ]
      },
    ]
  },
  // ══ MODULE 2 ══
  { id:"m_control", title: isEn?"Control Flow":"Управление потоком", icon:"🔀", color:"#34d399", level:1,
    desc: isEn?"Conditions, loops, comprehensions":"Условия, циклы, list comprehension",
    lessons:[
      { id:"l_if", title: isEn?"Conditions":"Условия if/elif/else", xp:60,
        sections:[
          { type:"code", content:`age = 20\nif age >= 18:\n    print("Совершеннолетний")\nelif age >= 12:\n    print("Подросток")\nelse:\n    print("Ребёнок")` },
          { type:"text", content: isEn?"**Comparison operators:** `==` `!=` `>` `<` `>=` `<=`\n\n**Logical operators:** `and` `or` `not`":"**Операторы сравнения:** `==` `!=` `>` `<` `>=` `<=`\n\n**Логические:** `and` `or` `not`" },
          { type:"code", content:`x = 5\nif 0 < x < 10:\n    print("от 0 до 10")   # цепочка сравнений!\n\n# Тернарный оператор\nresult = "чётное" if x % 2 == 0 else "нечётное"\n\n# Проверки на None, пустоту\nmy_list = []\nif not my_list:\n    print("список пуст")  # Pythonic!` },
          { type:"code", content:`# match/case (Python 3.10+)\nstatus = 404\nmatch status:\n    case 200:\n        print("OK")\n    case 404:\n        print("Not Found")\n    case 500:\n        print("Server Error")\n    case _:\n        print("Unknown")` },
          { type:"tip", content: isEn?"In Python, empty list [], empty string '', 0, and None are all falsy":"В Python пустой список [], пустая строка '', 0 и None — всё это «ложь» (falsy)" },
        ],
        quiz:[
          { q:"5 > 3 and 2 < 1 →", opts:["True","False","None","Error"], ans:1 },
          { q: isEn?"not (True or False) →":"not (True or False) →", opts:["True","False","None","Error"], ans:1 },
          { q: isEn?"Ternary: x=5, write 'big' if x>3 else 'small'":"Тернарный: x=5, вернёт 'big' если x>3 иначе 'small'", opts:["'small'","'big'","Error","None"], ans:1 },
          { q: isEn?"if [] is evaluated as:":"if [] вычисляется как:", opts:["True","False","Error","None"], ans:1 },
        ]
      },
      { id:"l_loops", title: isEn?"Loops":"Циклы for и while", xp:70,
        sections:[
          { type:"code", content:`# for с range\nfor i in range(5):         # 0,1,2,3,4\n    print(i)\n\nfor i in range(2, 10, 2):  # 2,4,6,8\n    print(i)\n\nfor i in range(9, 0, -1):  # 9,8,...,1\n    print(i)` },
          { type:"code", content:`# enumerate — индекс + значение\nfruits = ["apple", "banana", "cherry"]\nfor i, fruit in enumerate(fruits):\n    print(f"{i}: {fruit}")\n\n# zip — два списка параллельно\nnames = ["Alice", "Bob"]\nscores = [95, 87]\nfor name, score in zip(names, scores):\n    print(f"{name}: {score}")` },
          { type:"code", content:`# while\ncount = 0\nwhile count < 5:\n    count += 1\nprint(count)  # 5\n\n# break, continue, else\nfor i in range(10):\n    if i == 3: continue   # пропустить\n    if i == 7: break      # выйти\nelse:\n    print("закончили без break")` },
          { type:"text", content: isEn?"**List comprehension** — compact and fast:":"**List comprehension** — компактный и быстрый способ:" },
          { type:"code", content:`squares = [x**2 for x in range(10)]\nevens = [x for x in range(20) if x % 2 == 0]\nmatrix = [[i*j for j in range(3)] for i in range(3)]\n\n# dict comprehension\nsq_dict = {x: x**2 for x in range(5)}\n\n# set comprehension\nunique_sq = {x**2 for x in [-2,-1,0,1,2]}` },
          { type:"note", content: isEn?"Prefer for loops over while when iterating over a known sequence":"Используй for когда итерируешься по известной последовательности, while — для неопределённого числа итераций" },
        ],
        quiz:[
          { q:"range(2,8,3) →", opts:["[2,5]","[2,5,8]","[2,3,4,5]","[2,4,6]"], ans:0 },
          { q: isEn?"enumerate(['a','b']) yields:":"enumerate(['a','b']) даёт:", opts:["('a','b')","(0,'a'),(1,'b')","[0,1]","('a',0)"], ans:1 },
          { q: isEn?"When does for...else execute?":"Когда выполняется for...else?", opts:[isEn?"Always":"Всегда",isEn?"Never":"Никогда",isEn?"If no break occurred":"Если не было break",isEn?"On error":"При ошибке"], ans:2 },
          { q:"[x**2 for x in range(4)] →", opts:["[0,1,4,9]","[1,4,9,16]","[0,1,2,3]","[1,2,3,4]"], ans:0 },
        ]
      },
    ]
  },
  // ══ MODULE 3 ══
  { id:"m_functions", title: isEn?"Functions":"Функции", icon:"⚡", color:"#60a5fa", level:1,
    desc: isEn?"Defining functions, args, lambdas, closures, decorators":"Определение, аргументы, лямбды, замыкания, декораторы",
    lessons:[
      { id:"l_func1", title: isEn?"Defining Functions":"Определение функций", xp:70,
        sections:[
          { type:"code", content:`def greet(name, greeting="Привет"):\n    """Докстринг — описание функции.\n    \n    Args:\n        name: имя пользователя\n        greeting: приветствие\n    Returns:\n        строка приветствия\n    """\n    return f"{greeting}, {name}!"\n\nprint(greet("Alice"))              # Привет, Alice!\nprint(greet("Bob", "Здравствуй")) # Здравствуй, Bob!` },
          { type:"code", content:`# *args — произвольное число позиционных аргументов\ndef sum_all(*args):\n    return sum(args)\n\nprint(sum_all(1, 2, 3, 4, 5))  # 15\n\n# **kwargs — произвольные именованные аргументы\ndef show_info(**kwargs):\n    for key, val in kwargs.items():\n        print(f"{key}: {val}")\n\nshow_info(name="Alice", age=25, city="Москва")` },
          { type:"code", content:`# Только именованные аргументы (keyword-only)\ndef create_user(name, *, role="user", active=True):\n    return {"name": name, "role": role, "active": active}\n\ncreate_user("Alice", role="admin")   # OK\n# create_user("Alice", "admin")     # TypeError!\n\n# Возврат нескольких значений\ndef min_max(nums):\n    return min(nums), max(nums)  # кортеж!\n\nlo, hi = min_max([3, 1, 4, 1, 5, 9])` },
          { type:"tip", content: isEn?"Always write docstrings for functions — it's a good habit and helps IDEs":"Всегда пишите докстринги — это хорошая привычка и помогает IDE" },
        ],
        quiz:[
          { q: isEn?"*args gives:":"*args даёт:", opts:[isEn?"Dict of args":"Словарь аргументов",isEn?"Tuple of positional args":"Кортеж позиционных аргументов",isEn?"List of args":"Список аргументов",isEn?"One arg":"Один аргумент"], ans:1 },
          { q: isEn?"def f(a, *, b) — b is:":"def f(a, *, b) — b это:", opts:[isEn?"Positional":"Позиционный",isEn?"Keyword-only":"Только именованный",isEn?"Optional":"Необязательный",isEn?"Default":"По умолчанию"], ans:1 },
          { q: isEn?"def f(): return 1,2 — returns:":"def f(): return 1,2 — возвращает:", opts:["[1,2]","(1,2)","1","Error"], ans:1 },
          { q: isEn?"Default argument value is evaluated:":"Значение аргумента по умолчанию вычисляется:", opts:[isEn?"On every call":"При каждом вызове",isEn?"Never":"Никогда",isEn?"At definition time":"При определении функции",isEn?"At import time":"При импорте"], ans:2 },
        ]
      },
      { id:"l_func2", title: isEn?"Lambda, map, filter":"Лямбды, map, filter", xp:80,
        sections:[
          { type:"text", content: isEn?"**Lambda functions** are anonymous one-liners:":"**Лямбда-функции** — анонимные однострочники:" },
          { type:"code", content:`square = lambda x: x ** 2\nadd = lambda x, y: x + y\nclamp = lambda x, lo, hi: max(lo, min(hi, x))\n\nprint(square(5))       # 25\nprint(add(3, 4))       # 7\nprint(clamp(15, 0, 10)) # 10` },
          { type:"code", content:`nums = [3, 1, 4, 1, 5, 9, 2, 6]\n\n# map — применить функцию к каждому элементу\ndoubled = list(map(lambda x: x * 2, nums))\n\n# filter — отфильтровать по условию\nevens = list(filter(lambda x: x % 2 == 0, nums))\n\n# sorted с key\nwords = ["banana", "apple", "cherry", "date"]\nby_len = sorted(words, key=lambda w: len(w))\nby_last = sorted(words, key=lambda w: w[-1])` },
          { type:"code", content:`# functools\nfrom functools import reduce, partial, lru_cache\n\n# reduce — свёртка\nproduct = reduce(lambda a, b: a * b, [1,2,3,4,5])  # 120\n\n# partial — частичное применение\ndef power(base, exp): return base ** exp\nsquare = partial(power, exp=2)\ncube = partial(power, exp=3)\n\n# lru_cache — мемоизация\n@lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n-1) + fib(n-2)\n\nprint(fib(50))  # мгновенно!` },
          { type:"tip", content: isEn?"Prefer list comprehensions over map/filter for readability":"Предпочитай list comprehension вместо map/filter для читаемости" },
        ],
        quiz:[
          { q: isEn?"lambda x: x**3 applied to 4:":"lambda x: x**3 применить к 4:", opts:["12","16","64","81"], ans:2 },
          { q: isEn?"filter(lambda x: x>3, [1,2,3,4,5]):":"filter(lambda x: x>3, [1,2,3,4,5]):", opts:["[1,2,3]","[4,5]","[3,4,5]","[1,2]"], ans:1 },
          { q: isEn?"reduce(lambda a,b: a+b, [1,2,3,4]):":"reduce(lambda a,b: a+b, [1,2,3,4]):", opts:["[1,2,3,4]","24","10","(1,2,3,4)"], ans:2 },
          { q: isEn?"lru_cache does:":"lru_cache делает:", opts:[isEn?"Clears cache":"Очищает кэш",isEn?"Memoizes results":"Кэширует результаты функции",isEn?"Limits calls":"Ограничивает вызовы",isEn?"Async cache":"Асинхронный кэш"], ans:1 },
        ]
      },
      { id:"l_decorators", title: isEn?"Decorators":"Декораторы", xp:110,
        sections:[
          { type:"text", content: isEn?"**Decorators** wrap functions to add behaviour without modifying them:":"**Декораторы** оборачивают функции, добавляя поведение без изменения исходного кода:" },
          { type:"code", content:`import time\nfrom functools import wraps\n\ndef timer(func):\n    @wraps(func)   # сохраняет __name__, __doc__\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        elapsed = time.perf_counter() - start\n        print(f"{func.__name__}: {elapsed:.4f}s")\n        return result\n    return wrapper\n\n@timer\ndef heavy_work(n):\n    return sum(range(n))\n\nheavy_work(10_000_000)  # prints timing` },
          { type:"code", content:`# Декоратор с аргументами\ndef retry(times=3, delay=0.5):\n    def decorator(func):\n        @wraps(func)\n        def wrapper(*args, **kwargs):\n            for attempt in range(times):\n                try:\n                    return func(*args, **kwargs)\n                except Exception as e:\n                    if attempt == times - 1:\n                        raise\n                    time.sleep(delay)\n        return wrapper\n    return decorator\n\n@retry(times=3, delay=1.0)\ndef fetch_data(url):\n    # может упасть — попробуем 3 раза\n    return requests.get(url).json()` },
          { type:"code", content:`# Несколько декораторов (порядок снизу вверх)\n@timer\n@retry(times=2)\ndef process():\n    pass\n\n# Класс-декоратор\nclass Singleton:\n    _instances = {}\n    def __call__(cls, *args, **kwargs):\n        if cls not in cls._instances:\n            cls._instances[cls] = super().__call__(*args, **kwargs)\n        return cls._instances[cls]` },
          { type:"note", content: isEn?"@wraps(func) is essential — without it, decorated functions lose their __name__ and __doc__":"@wraps(func) обязателен — без него декорированные функции теряют __name__ и __doc__" },
        ],
        quiz:[
          { q: isEn?"@decorator before def func — what happens?":"@decorator перед def func — что происходит?", opts:[isEn?"Imports decorator":"Импортирует decorator",isEn?"func = decorator(func)":"func = decorator(func)",isEn?"Calls func()":"Вызывает func()",isEn?"Copies func":"Копирует func"], ans:1 },
          { q: isEn?"@wraps(func) preserves:":"@wraps(func) сохраняет:", opts:[isEn?"Arguments":"Аргументы",isEn?"Return value":"Возвращаемое значение",isEn?"__name__ and __doc__":"__name__ и __doc__",isEn?"Execution time":"Время выполнения"], ans:2 },
          { q: isEn?"Multiple decorators apply in:":"Несколько декораторов применяются:", opts:[isEn?"Top to bottom":"Сверху вниз",isEn?"Bottom to top":"Снизу вверх",isEn?"Random order":"В случайном порядке",isEn?"Simultaneously":"Одновременно"], ans:1 },
        ]
      },
    ]
  },
  // ══ MODULE 4 ══
  { id:"m_ds", title: isEn?"Data Structures":"Структуры данных", icon:"📦", color:"#fb923c", level:1,
    desc: isEn?"Lists, dicts, tuples, sets — in depth":"Списки, словари, кортежи, множества — углублённо",
    lessons:[
      { id:"l_lists", title: isEn?"Lists — Deep Dive":"Списки — углублённо", xp:80,
        sections:[
          { type:"code", content:`# Создание\na = [1, 2, 3]\nb = list(range(10))\nc = [0] * 5           # [0,0,0,0,0]\nd = [x**2 for x in range(5)]  # [0,1,4,9,16]\n\n# Срезы (slicing)\nnums = [0,1,2,3,4,5,6,7,8,9]\nprint(nums[2:7])       # [2,3,4,5,6]\nprint(nums[::2])       # [0,2,4,6,8]\nprint(nums[::-1])      # [9,8,...,0]\nprint(nums[1:8:2])     # [1,3,5,7]` },
          { type:"code", content:`# Методы\nnums = [3,1,4,1,5,9,2,6]\nnums.append(7)           # добавить в конец\nnums.insert(0, 0)        # вставить по индексу\nnums.extend([8,9,10])    # добавить список\nnums.remove(1)           # удалить первое вхождение\npopped = nums.pop()      # удалить и вернуть последний\npopped2 = nums.pop(0)    # удалить по индексу\nnums.sort(reverse=True)  # сортировать\nnums.reverse()           # перевернуть\nidx = nums.index(5)     # найти индекс\ncnt = nums.count(1)     # подсчитать вхождения` },
          { type:"code", content:`# Вложенные списки\nmatrix = [[1,2,3],[4,5,6],[7,8,9]]\nprint(matrix[1][2])   # 6\n\n# Transpose\ntransposed = [[row[i] for row in matrix] for i in range(3)]\n\n# Flatten\nflat = [x for row in matrix for x in row]\n\n# copy vs deepcopy\nimport copy\na = [[1,2],[3,4]]\nb = a.copy()          # поверхностная копия\nc = copy.deepcopy(a)  # глубокая копия` },
        ],
        quiz:[
          { q:"[1,2,3,4,5][::-1] →", opts:["[5,4,3,2,1]","[1,2,3,4,5]","[5,4,3]","Error"], ans:0 },
          { q: isEn?"Difference between sort() and sorted():":"Разница sort() и sorted():", opts:[isEn?"None":"Нет разницы",isEn?"sort() modifies in-place":"sort() изменяет список, sorted() нет",isEn?"sorted() is faster":"sorted() быстрее",isEn?"sort() returns list":"sort() возвращает новый список"], ans:1 },
          { q:"[0]*3 →", opts:["[0,0,0]","[0]","0","Error"], ans:0 },
          { q: isEn?"list.pop() removes:":"list.pop() удаляет:", opts:[isEn?"First element":"Первый элемент",isEn?"Last element":"Последний элемент",isEn?"Random element":"Случайный элемент",isEn?"By value":"По значению"], ans:1 },
        ]
      },
      { id:"l_dicts", title: isEn?"Dicts & Sets":"Словари и множества", xp:85,
        sections:[
          { type:"code", content:`# Словари\nd = {"name": "Alice", "age": 25}\nd["email"] = "alice@example.com"  # добавить\ndel d["age"]                       # удалить\nprint(d.get("age", 0))             # безопасно\nprint("name" in d)                 # проверка ключа\n\n# Методы\nprint(list(d.keys()))    # ключи\nprint(list(d.values()))  # значения\nprint(list(d.items()))   # пары\nd.update({"age": 26, "city": "MSK"})  # обновить\nd2 = d.copy()            # копия` },
          { type:"code", content:`# setdefault и defaultdict\nd.setdefault("role", "user")  # добавить если нет\n\nfrom collections import defaultdict, Counter, OrderedDict\n\n# defaultdict — значение по умолчанию\ngraph = defaultdict(list)\ngraph["A"].append("B")   # не нужно инициализировать!\n\n# Counter — подсчёт\ntext = "hello world hello"\ncnt = Counter(text.split())\nprint(cnt)               # Counter({'hello':2,'world':1})\nprint(cnt.most_common(1)) # [('hello', 2)]` },
          { type:"code", content:`# Множества (sets)\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(a | b)   # объединение: {1,2,3,4,5,6}\nprint(a & b)   # пересечение: {3,4}\nprint(a - b)   # разность: {1,2}\nprint(a ^ b)   # симм. разность: {1,2,5,6}\nprint(a <= b)  # подмножество?\n\na.add(5)\na.discard(10)  # без ошибки если нет\n\n# frozenset — неизменяемое множество\nfs = frozenset([1,2,3])` },
          { type:"tip", content: isEn?"Use Counter for frequency analysis — much cleaner than manual dicts":"Используй Counter для подсчёта частот — намного чище ручных словарей" },
        ],
        quiz:[
          { q: isEn?"d.get('x', 0) when 'x' not in d:":"d.get('x', 0) когда 'x' нет в d:", opts:["None","KeyError","0","False"], ans:2 },
          { q: isEn?"Counter('aab') gives:":"Counter('aab') даёт:", opts:["{'a':1,'b':1}","{'a':2,'b':1}","['a','a','b']","Error"], ans:1 },
          { q: isEn?"{1,2} & {2,3} →":"{1,2} & {2,3} →", opts:["{1,2,3}","{2}","{1,3}","{}"], ans:1 },
          { q: isEn?"Can a set contain [1,2] (a list)?":"Может ли set содержать [1,2] (список)?", opts:[isEn?"Yes":"Да",isEn?"No, lists are unhashable":"Нет, списки не хэшируемые",isEn?"Only if frozen":"Только если frozen",isEn?"Only with convert":"Только после конвертации"], ans:1 },
        ]
      },
    ]
  },
  // ══ MODULE 5 ══
  { id:"m_oop", title: isEn?"OOP":"ООП — Классы", icon:"🏛️", color:"#818cf8", level:2,
    desc: isEn?"Classes, inheritance, magic methods, dataclasses":"Классы, наследование, магические методы, dataclasses",
    lessons:[
      { id:"l_class1", title: isEn?"Classes & Objects":"Классы и объекты", xp:100,
        sections:[
          { type:"code", content:`class BankAccount:\n    interest_rate = 0.03  # атрибут класса\n\n    def __init__(self, owner, balance=0):\n        self.owner = owner    # атрибут объекта\n        self._balance = balance  # "защищённый"\n\n    @property\n    def balance(self):\n        return self._balance\n\n    @balance.setter\n    def balance(self, value):\n        if value < 0:\n            raise ValueError("Баланс не может быть отрицательным")\n        self._balance = value\n\n    def deposit(self, amount):\n        self._balance += amount\n        return self\n\n    def withdraw(self, amount):\n        if amount > self._balance:\n            raise ValueError("Недостаточно средств")\n        self._balance -= amount\n        return self\n\n    def __str__(self):\n        return f"Счёт {self.owner}: {self._balance:.2f}₽"\n\n    def __repr__(self):\n        return f"BankAccount('{self.owner}', {self._balance})"` },
          { type:"code", content:`# Использование\nacc = BankAccount("Alice", 1000)\nacc.deposit(500).withdraw(200)  # method chaining\nprint(acc)          # Счёт Alice: 1300.00₽\nprint(repr(acc))    # BankAccount('Alice', 1300)\nprint(acc.balance)  # 1300` },
          { type:"code", content:`# Magic methods (dunder)\nclass Vector:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __add__(self, other):\n        return Vector(self.x+other.x, self.y+other.y)\n    def __mul__(self, scalar):\n        return Vector(self.x*scalar, self.y*scalar)\n    def __len__(self):\n        return int((self.x**2 + self.y**2)**0.5)\n    def __repr__(self):\n        return f"Vector({self.x}, {self.y})"\n\nv1 = Vector(1, 2)\nv2 = Vector(3, 4)\nprint(v1 + v2)   # Vector(4, 6)\nprint(v1 * 3)    # Vector(3, 6)` },
        ],
        quiz:[
          { q: isEn?"@property creates:":"@property создаёт:", opts:[isEn?"Static method":"Статический метод",isEn?"Managed attribute":"Управляемый атрибут",isEn?"Class variable":"Переменную класса",isEn?"Abstract method":"Абстрактный метод"], ans:1 },
          { q: isEn?"__str__ vs __repr__:":"__str__ vs __repr__:", opts:[isEn?"Same thing":"Одно и то же",isEn?"str for print, repr for debug":"str для print, repr для дебага",isEn?"repr for print, str for debug":"repr для print, str для дебага",isEn?"Only one needed":"Нужен только один"], ans:1 },
          { q: isEn?"self refers to:":"self ссылается на:", opts:[isEn?"Class itself":"Сам класс",isEn?"Current object instance":"Текущий экземпляр объекта",isEn?"Parent class":"Родительский класс",isEn?"Module":"Модуль"], ans:1 },
          { q: isEn?"__add__ enables:":"__add__ включает:", opts:["obj.add()","obj + other","obj.plus()","add(obj)"], ans:1 },
        ]
      },
      { id:"l_class2", title: isEn?"Inheritance & ABC":"Наследование и ABC", xp:110,
        sections:[
          { type:"code", content:`from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    def __init__(self, color="red"):\n        self.color = color\n\n    @abstractmethod\n    def area(self) -> float: ...\n\n    @abstractmethod\n    def perimeter(self) -> float: ...\n\n    def describe(self):\n        return (f"{self.__class__.__name__}: "\n                f"area={self.area():.2f}, "\n                f"perimeter={self.perimeter():.2f}")\n\nclass Circle(Shape):\n    import math\n    def __init__(self, radius, **kwargs):\n        super().__init__(**kwargs)\n        self.radius = radius\n    def area(self):\n        return math.pi * self.radius**2\n    def perimeter(self):\n        return 2 * math.pi * self.radius\n\nclass Rectangle(Shape):\n    def __init__(self, w, h, **kwargs):\n        super().__init__(**kwargs)\n        self.w, self.h = w, h\n    def area(self): return self.w * self.h\n    def perimeter(self): return 2*(self.w+self.h)\n\nshapes = [Circle(5), Rectangle(4,6,"blue")]\nfor s in shapes:\n    print(s.describe())` },
          { type:"code", content:`# dataclasses (Python 3.7+) — меньше бойлерплейта!\nfrom dataclasses import dataclass, field\nfrom typing import List\n\n@dataclass\nclass Student:\n    name: str\n    grade: float\n    courses: List[str] = field(default_factory=list)\n    _id: int = field(default=0, repr=False)\n\n    def gpa_letter(self):\n        return "A" if self.grade >= 90 else "B" if self.grade >= 80 else "C"\n\n# __init__, __repr__, __eq__ генерируются автоматически!\nalice = Student("Alice", 92.5, ["Python", "Math"])\nbob = Student("Bob", 78.0)\nprint(alice)   # Student(name='Alice', grade=92.5, ...)` },
        ],
        quiz:[
          { q: isEn?"ABC stands for:":"ABC расшифровывается как:", opts:["Abstract Base Class","Array-Based Collection","Automatic Builder Class","Abstract Boolean Check"], ans:0 },
          { q: isEn?"@abstractmethod means:":"@abstractmethod означает:", opts:[isEn?"Private method":"Приватный метод",isEn?"Must be implemented in subclass":"Должен быть реализован в подклассе",isEn?"Cannot be called":"Нельзя вызвать",isEn?"Static method":"Статический метод"], ans:1 },
          { q: isEn?"@dataclass auto-generates:":"@dataclass автоматически генерирует:", opts:["__init__","__init__, __repr__, __eq__","all dunder methods","property accessors"], ans:1 },
        ]
      },
    ]
  },
  // ══ MODULE 6: FILES ══
  { id:"m_files", title: isEn?"Files & Errors":"Файлы и ошибки", icon:"📁", color:"#f472b6", level:2,
    desc: isEn?"File I/O, JSON, CSV, exceptions":"Файлы, JSON, CSV, исключения",
    lessons:[
      { id:"l_files", title: isEn?"File I/O":"Работа с файлами", xp:80,
        sections:[
          { type:"code", content:`# Чтение\nwith open("data.txt", "r", encoding="utf-8") as f:\n    content = f.read()          # всё содержимое\n\nwith open("data.txt") as f:\n    lines = f.readlines()       # список строк\n    f.seek(0)\n    for line in f:              # построчно (эффективно)\n        print(line.strip())\n\n# Запись\nwith open("out.txt", "w", encoding="utf-8") as f:\n    f.write("Hello\\n")\n    f.writelines(["line1\\n", "line2\\n"])\n\n# Добавление\nwith open("log.txt", "a") as f:\n    f.write("new entry\\n")` },
          { type:"code", content:`import json, csv\nfrom pathlib import Path\n\n# JSON\ndata = {"users": [{"name": "Alice", "age": 25}]}\n\nPath("data.json").write_text(\n    json.dumps(data, ensure_ascii=False, indent=2),\n    encoding="utf-8"\n)\nloaded = json.loads(Path("data.json").read_text())\n\n# CSV\nimport io\ncsv_data = "name,age\\nAlice,25\\nBob,30"\nreader = csv.DictReader(io.StringIO(csv_data))\nfor row in reader:\n    print(row["name"], row["age"])` },
          { type:"code", content:`# pathlib — современная работа с путями\nfrom pathlib import Path\n\np = Path("data") / "users" / "alice.json"\np.parent.mkdir(parents=True, exist_ok=True)\np.write_text('{"name":"Alice"}')\n\nprint(p.name)       # alice.json\nprint(p.stem)       # alice\nprint(p.suffix)     # .json\nprint(p.parent)     # data/users\nprint(p.exists())   # True\n\n# Поиск файлов\nfor py_file in Path(".").rglob("*.py"):\n    print(py_file)` },
        ],
        quiz:[
          { q: isEn?"'with open' ensures:":"'with open' гарантирует:", opts:[isEn?"Faster read":"Быстрее чтение",isEn?"File is auto-closed":"Файл автоматически закроется",isEn?"Write permission":"Права на запись",isEn?"Encoding is set":"Кодировка установлена"], ans:1 },
          { q: isEn?"json.dumps converts:":"json.dumps конвертирует:", opts:[isEn?"JSON string to dict":"JSON-строку в словарь",isEn?"dict to JSON string":"Словарь в JSON-строку",isEn?"Reads a JSON file":"Читает JSON файл",isEn?"Writes to file":"Пишет в файл"], ans:1 },
          { q: isEn?"Path.rglob('*.txt') does:":"Path.rglob('*.txt') делает:", opts:[isEn?"Finds only in current dir":"Ищет только в текущей папке",isEn?"Recursively finds files":"Рекурсивно ищет файлы",isEn?"Renames files":"Переименовывает файлы",isEn?"Reads file content":"Читает содержимое"], ans:1 },
        ]
      },
      { id:"l_exceptions", title: isEn?"Exceptions":"Исключения", xp:90,
        sections:[
          { type:"code", content:`# Базовая обработка\ntry:\n    x = int(input("Число: "))\n    result = 100 / x\nexcept ValueError as e:\n    print(f"Не число: {e}")\nexcept ZeroDivisionError:\n    print("Деление на ноль!")\nexcept (TypeError, AttributeError) as e:\n    print(f"Тип: {e}")\nexcept Exception as e:\n    print(f"Неожиданная ошибка: {type(e).__name__}: {e}")\nelse:\n    print(f"Результат: {result}")  # если нет ошибок\nfinally:\n    print("Выполняется ВСЕГДА")` },
          { type:"code", content:`# Создание исключений\nclass AppError(Exception):\n    """Базовый класс ошибок приложения"""\n    def __init__(self, message, code=None):\n        super().__init__(message)\n        self.code = code\n\nclass ValidationError(AppError): pass\nclass NotFoundError(AppError): pass\nclass PermissionError(AppError): pass\n\ndef get_user(user_id: int):\n    if not isinstance(user_id, int):\n        raise ValidationError("ID должен быть числом", code=400)\n    if user_id <= 0:\n        raise ValidationError("ID должен быть положительным", code=400)\n    users = {1: "Alice", 2: "Bob"}\n    if user_id not in users:\n        raise NotFoundError(f"Пользователь {user_id} не найден", code=404)\n    return users[user_id]` },
          { type:"code", content:`# Контекстный менеджер + исключение\nfrom contextlib import contextmanager\n\n@contextmanager\ndef managed_resource(name):\n    print(f"Открываем {name}")\n    try:\n        yield name\n    except Exception as e:\n        print(f"Ошибка в {name}: {e}")\n        raise\n    finally:\n        print(f"Закрываем {name}")\n\nwith managed_resource("database") as db:\n    print(f"Работаем с {db}")` },
        ],
        quiz:[
          { q: isEn?"'else' in try/except runs when:":"'else' в try/except выполняется когда:", opts:[isEn?"Always":"Всегда",isEn?"On exception":"При исключении",isEn?"No exception occurred":"Не было исключений",isEn?"In finally":"В finally"], ans:2 },
          { q: isEn?"'finally' runs when:":"'finally' выполняется когда:", opts:[isEn?"Only on success":"Только при успехе",isEn?"Only on error":"Только при ошибке",isEn?"Always":"Всегда",isEn?"When re-raised":"При повторном raise"], ans:2 },
          { q: isEn?"Custom exceptions inherit from:":"Свои исключения наследуют от:", opts:["object","BaseError","Exception","Error"], ans:2 },
        ]
      },
    ]
  },
  // ══ MODULE 7: WEB ══
  { id:"m_web", title: isEn?"Flask Web":"Flask — Веб", icon:"🌐", color:"#fb7185", level:3,
    desc: isEn?"REST APIs with Flask, blueprints, auth":"REST API с Flask, blueprints, авторизация",
    lessons:[
      { id:"l_flask1", title: isEn?"Flask Basics":"Основы Flask", xp:130,
        sections:[
          { type:"code", content:`from flask import Flask, request, jsonify, abort\nfrom functools import wraps\n\napp = Flask(__name__)\n\n# Простой маршрут\n@app.route("/")\ndef home():\n    return jsonify({"status": "ok", "version": "1.0"})\n\n# Параметры в URL\n@app.route("/users/<int:user_id>", methods=["GET"])\ndef get_user(user_id):\n    user = db.get(user_id)  # условно\n    if not user:\n        abort(404)\n    return jsonify(user)\n\n# Query params: /search?q=python&limit=10\n@app.route("/search")\ndef search():\n    q = request.args.get("q", "")\n    limit = request.args.get("limit", 10, type=int)\n    return jsonify({"query": q, "limit": limit})` },
          { type:"code", content:`# POST / PUT / DELETE\n@app.route("/users", methods=["POST"])\ndef create_user():\n    data = request.get_json()\n    if not data or "name" not in data:\n        return jsonify({"error": "name required"}), 400\n    user = {"id": 1, "name": data["name"]}\n    return jsonify(user), 201\n\n@app.route("/users/<int:uid>", methods=["PUT"])\ndef update_user(uid):\n    data = request.get_json()\n    return jsonify({"id": uid, **data})\n\n@app.route("/users/<int:uid>", methods=["DELETE"])\ndef delete_user(uid):\n    return "", 204\n\n# Обработка ошибок\n@app.errorhandler(404)\ndef not_found(e):\n    return jsonify({"error": "Not found"}), 404` },
          { type:"tip", content: isEn?"Always validate incoming JSON before processing — never trust client data":"Всегда валидируй входящий JSON перед обработкой — никогда не доверяй данным от клиента" },
        ],
        quiz:[
          { q: isEn?"@app.route('/users/<int:id>') — id is:":"@app.route('/users/<int:id>') — id это:", opts:[isEn?"String":"Строка",isEn?"Auto-converted integer":"Автоматически конвертированное число",isEn?"Float":"Float",isEn?"Optional":"Необязательный"], ans:1 },
          { q: isEn?"Correct status for created resource:":"Правильный статус для созданного ресурса:", opts:["200","201","204","400"], ans:1 },
          { q: isEn?"request.args.get() retrieves:":"request.args.get() получает:", opts:[isEn?"POST body":"Тело POST запроса",isEn?"URL query params":"URL параметры запроса",isEn?"Headers":"Заголовки",isEn?"Cookies":"Cookies"], ans:1 },
        ]
      },
    ]
  },
  // ══ MODULE 8: AUTOMATION ══
  { id:"m_auto", title: isEn?"Automation":"Автоматизация", icon:"🤖", color:"#34d399", level:4,
    desc: isEn?"Scripts, file automation, web scraping":"Скрипты, автоматизация файлов, парсинг",
    lessons:[
      { id:"l_auto1", title: isEn?"os, sys, pathlib":"os, sys, pathlib", xp:110,
        sections:[
          { type:"code", content:`import os, sys\nfrom pathlib import Path\n\n# os — взаимодействие с ОС\nprint(os.getcwd())              # текущая директория\nos.chdir("/tmp")                # сменить директорию\nos.makedirs("a/b/c", exist_ok=True)\nprint(os.listdir("."))          # содержимое папки\nos.rename("old.txt", "new.txt") # переименовать\nos.remove("file.txt")           # удалить файл\nos.rmdir("empty_dir")           # удалить пустую папку\n\n# Переменные окружения\ndb_url = os.environ.get("DATABASE_URL", "sqlite:///dev.db")\nos.environ["MY_VAR"] = "value"` },
          { type:"code", content:`# shutil — операции над файлами\nimport shutil\n\nshutil.copy("src.txt", "dst.txt")        # копировать\nshutil.copy2("src.txt", "dst/")          # с метаданными\nshutil.move("src.txt", "dst/")           # переместить\nshutil.copytree("src_dir", "dst_dir")    # папку рекурсивно\nshutil.rmtree("dir_to_delete")           # удалить папку\n\n# Создать ZIP\nshutil.make_archive("backup", "zip", "my_folder")\nshutil.unpack_archive("backup.zip", "extracted")` },
          { type:"code", content:`# subprocess — запуск команд\nimport subprocess\n\n# Простой запуск\nresult = subprocess.run(\n    ["python", "--version"],\n    capture_output=True,\n    text=True\n)\nprint(result.stdout)  # Python 3.11.x\n\n# Shell команда\nresult = subprocess.run(\n    "ls -la | grep .py",\n    shell=True, capture_output=True, text=True\n)\nprint(result.stdout)` },
        ],
        quiz:[
          { q: isEn?"os.environ.get('X', 'default') when X not set:":"os.environ.get('X', 'default') когда X не задан:", opts:["None","KeyError","'default'","''"], ans:2 },
          { q: isEn?"shutil.rmtree() removes:":"shutil.rmtree() удаляет:", opts:[isEn?"Only empty dirs":"Только пустые папки",isEn?"Only files":"Только файлы",isEn?"Directory tree recursively":"Дерево папок рекурсивно",isEn?"Archives only":"Только архивы"], ans:2 },
          { q: isEn?"subprocess.run capture_output=True:":"subprocess.run capture_output=True:", opts:[isEn?"Runs in background":"Запускает в фоне",isEn?"Captures stdout/stderr":"Захватывает stdout/stderr",isEn?"Ignores output":"Игнорирует вывод",isEn?"Async execution":"Асинхронное выполнение"], ans:1 },
        ]
      },
    ]
  },
  // ══ MODULE 9: DATA SCIENCE ══
  { id:"m_ds2", title: isEn?"Data Science":"Data Science", icon:"📊", color:"#fbbf24", level:5,
    desc: isEn?"NumPy, Pandas, Matplotlib":"NumPy, Pandas, Matplotlib для анализа данных",
    lessons:[
      { id:"l_numpy", title:"NumPy", xp:150,
        sections:[
          { type:"code", content:`import numpy as np\n\n# Создание массивов\na = np.array([1, 2, 3, 4, 5])\nb = np.zeros((3, 4))         # нули 3×4\nc = np.ones((2, 2)) * 5      # 5, 5, 5, 5\nd = np.arange(0, 10, 0.5)   # 0.0, 0.5, ..., 9.5\ne = np.linspace(0, 1, 5)    # [0, .25, .5, .75, 1]\nf = np.random.randn(100)    # стандартное норм. распр.\n\nprint(a.shape)  # (5,)\nprint(b.shape)  # (3, 4)\nprint(a.dtype)  # int64` },
          { type:"code", content:`# Операции (векторизованы!)\nnums = np.array([1,2,3,4,5])\nprint(nums * 2)            # [2 4 6 8 10]\nprint(nums ** 2)           # [1 4 9 16 25]\nprint(np.sqrt(nums))       # корни\nprint(np.mean(nums))       # среднее\nprint(np.std(nums))        # стандартное отклонение\nprint(np.percentile(nums, 75))  # 75-й перцентиль\n\n# Булева маска\nprint(nums[nums > 3])      # [4 5]\nprint(nums[(nums > 1) & (nums < 4)])  # [2 3]\n\n# Reshape\nmatrix = np.arange(12).reshape(3, 4)\nprint(matrix.T)   # транспонирование` },
          { type:"code", content:`# Линейная алгебра\nA = np.array([[1,2],[3,4]])\nB = np.array([[5,6],[7,8]])\nprint(A @ B)                    # матричное умножение\nprint(np.linalg.det(A))         # определитель\nprint(np.linalg.inv(A))         # обратная матрица\neigvals, eigvecs = np.linalg.eig(A)  # собственные\n\n# Broadcasting\na = np.array([[1,2,3],[4,5,6]])\nb = np.array([10, 20, 30])\nprint(a + b)  # каждая строка + b` },
        ],
        quiz:[
          { q:"np.arange(0, 10, 3) →", opts:["[0,3,6,9]","[0,3,6,9,12]","[0,3,6]","[3,6,9]"], ans:0 },
          { q: isEn?"nums[nums > 2] with nums=[1,2,3,4]:":"nums[nums > 2] при nums=[1,2,3,4]:", opts:["[1,2]","[3,4]","[2,3,4]","[False,False,True,True]"], ans:1 },
          { q: isEn?"A @ B for numpy:":"A @ B для numpy:", opts:[isEn?"Element-wise mult":"Поэлементное умножение",isEn?"Matrix multiplication":"Матричное умножение",isEn?"Bitwise AND":"Побитовое И",isEn?"Concatenation":"Конкатенация"], ans:1 },
        ]
      },
    ]
  },
  // ══ MODULE 10: ML ══
  { id:"m_ml", title: isEn?"Machine Learning":"Machine Learning", icon:"🧠", color:"#a78bfa", level:6,
    desc: isEn?"scikit-learn, models, evaluation":"scikit-learn, модели, оценка качества",
    lessons:[
      { id:"l_ml1", title: isEn?"ML Pipeline":"ML Pipeline", xp:180,
        sections:[
          { type:"code", content:`from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler, LabelEncoder\nfrom sklearn.model_selection import train_test_split, cross_val_score\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import classification_report, confusion_matrix\nimport numpy as np\n\n# 1. Данные\nfrom sklearn.datasets import load_breast_cancer\ndata = load_breast_cancer()\nX, y = data.data, data.target\n\n# 2. Разделение\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42, stratify=y\n)\n\n# 3. Pipeline = scaler + model\npipe = Pipeline([\n    ("scaler", StandardScaler()),\n    ("clf", RandomForestClassifier(n_estimators=100, random_state=42))\n])\n\n# 4. Обучение\npipe.fit(X_train, y_train)\n\n# 5. Оценка\ny_pred = pipe.predict(X_test)\nprint(classification_report(y_test, y_pred))\n\n# 6. Кросс-валидация\nscores = cross_val_score(pipe, X, y, cv=5)\nprint(f"CV: {scores.mean():.3f} ± {scores.std():.3f}")` },
          { type:"tip", content: isEn?"Always use Pipeline — it prevents data leakage and makes code cleaner":"Всегда используй Pipeline — он предотвращает утечку данных и делает код чище" },
        ],
        quiz:[
          { q: isEn?"stratify=y in train_test_split:":"stratify=y в train_test_split:", opts:[isEn?"Sorts data":"Сортирует данные",isEn?"Preserves class proportions":"Сохраняет пропорции классов",isEn?"Normalises labels":"Нормализует метки",isEn?"Shuffles data":"Перемешивает данные"], ans:1 },
          { q: isEn?"Pipeline prevents:":"Pipeline предотвращает:", opts:[isEn?"Slow training":"Медленное обучение",isEn?"Data leakage":"Утечку данных",isEn?"Overfitting":"Переобучение",isEn?"Memory issues":"Проблемы с памятью"], ans:1 },
        ]
      },
    ]
  },
  // ══ MODULE 11: ASYNC ══
  { id:"m_async", title: isEn?"Async Python":"Асинхронный Python", icon:"⚡", color:"#22d3ee", level:7,
    desc: isEn?"asyncio, aiohttp, async patterns":"asyncio, aiohttp, асинхронные паттерны",
    lessons:[
      { id:"l_async1", title: isEn?"asyncio Fundamentals":"Основы asyncio", xp:160,
        sections:[
          { type:"code", content:`import asyncio\n\n# Корутина\nasync def fetch_user(user_id: int) -> dict:\n    await asyncio.sleep(0.1)  # имитация I/O\n    return {"id": user_id, "name": f"User{user_id}"}\n\n# Параллельный запуск\nasync def main():\n    # Последовательно: ~0.3с\n    u1 = await fetch_user(1)\n    u2 = await fetch_user(2)\n    u3 = await fetch_user(3)\n\n    # Параллельно: ~0.1с!\n    u1, u2, u3 = await asyncio.gather(\n        fetch_user(1),\n        fetch_user(2),\n        fetch_user(3),\n    )\n    print([u1, u2, u3])\n\nasyncio.run(main())` },
          { type:"code", content:`# asyncio.TaskGroup (Python 3.11+)\nasync def process_all(ids):\n    async with asyncio.TaskGroup() as tg:\n        tasks = [tg.create_task(fetch_user(i)) for i in ids]\n    return [t.result() for t in tasks]\n\n# asyncio.Queue — producer/consumer\nasync def producer(queue: asyncio.Queue):\n    for i in range(10):\n        await queue.put(i)\n        await asyncio.sleep(0.01)\n    await queue.put(None)  # sentinel\n\nasync def consumer(queue: asyncio.Queue):\n    while (item := await queue.get()) is not None:\n        print(f"Processing {item}")\n        queue.task_done()` },
          { type:"note", content: isEn?"asyncio is best for I/O-bound tasks (network, disk). Use multiprocessing for CPU-bound work.":"asyncio лучше всего подходит для I/O-bound задач (сеть, диск). Для CPU-bound используй multiprocessing." },
        ],
        quiz:[
          { q: isEn?"await can be used only inside:":"await можно использовать только в:", opts:[isEn?"Any function":"Любой функции",isEn?"async function":"async функции",isEn?"try block":"try блоке",isEn?"class method":"методе класса"], ans:1 },
          { q: isEn?"asyncio.gather() runs tasks:":"asyncio.gather() запускает задачи:", opts:[isEn?"Sequentially":"Последовательно",isEn?"Concurrently":"Конкурентно",isEn?"In threads":"В потоках",isEn?"In processes":"В процессах"], ans:1 },
          { q: isEn?"asyncio is best for:":"asyncio лучше всего для:", opts:["CPU-bound tasks","I/O-bound tasks","GUI apps","Data processing"], ans:1 },
        ]
      },
    ]
  },
  // ══ MODULE 12: TESTING ══
  { id:"m_test", title: isEn?"Testing":"Тестирование", icon:"✅", color:"#4ade80", level:8,
    desc: isEn?"pytest, mocking, TDD, coverage":"pytest, мокирование, TDD, покрытие",
    lessons:[
      { id:"l_test1", title:"pytest", xp:150,
        sections:[
          { type:"code", content:`# test_calculator.py\nimport pytest\n\nclass Calculator:\n    def add(self, a, b): return a + b\n    def divide(self, a, b):\n        if b == 0: raise ValueError("Division by zero")\n        return a / b\n\n@pytest.fixture\ndef calc():\n    return Calculator()\n\ndef test_add(calc):\n    assert calc.add(2, 3) == 5\n    assert calc.add(-1, 1) == 0\n\ndef test_divide(calc):\n    assert calc.divide(10, 2) == 5.0\n\ndef test_divide_by_zero(calc):\n    with pytest.raises(ValueError, match="zero"):\n        calc.divide(10, 0)\n\n@pytest.mark.parametrize("a,b,expected", [\n    (1, 2, 3), (-1, -1, -2), (0, 5, 5), (100, 0, 100)\n])\ndef test_add_parametrized(calc, a, b, expected):\n    assert calc.add(a, b) == expected` },
          { type:"code", content:`# Мокирование\nfrom unittest.mock import Mock, patch, MagicMock\n\n# patch заменяет объект на время теста\n@patch("requests.get")\ndef test_fetch_data(mock_get):\n    mock_get.return_value.json.return_value = {"user": "Alice"}\n    mock_get.return_value.status_code = 200\n\n    result = fetch_user(1)  # вызовет requests.get внутри\n    assert result["user"] == "Alice"\n    mock_get.assert_called_once()\n\n# MagicMock для комплексных объектов\ndb = MagicMock()\ndb.query.return_value.filter.return_value.all.return_value = []\nresult = db.query(User).filter(User.active == True).all()` },
        ],
        quiz:[
          { q: isEn?"@pytest.fixture provides:":"@pytest.fixture предоставляет:", opts:[isEn?"Test data/objects reusably":"Тестовые данные/объекты переиспользуемо",isEn?"Mocked functions":"Замоканные функции",isEn?"Skip conditions":"Условия пропуска",isEn?"Coverage reports":"Отчёты покрытия"], ans:0 },
          { q: isEn?"pytest.raises used to:":"pytest.raises используется чтобы:", opts:[isEn?"Suppress exceptions":"Подавить исключения",isEn?"Assert exception is raised":"Проверить что исключение выброшено",isEn?"Retry on failure":"Повторить при ошибке",isEn?"Log exceptions":"Логировать исключения"], ans:1 },
          { q: isEn?"@patch replaces object:":"@patch заменяет объект:", opts:[isEn?"Permanently":"Навсегда",isEn?"For test duration":"На время теста",isEn?"In production":"В продакшене",isEn?"In imports only":"Только в импортах"], ans:1 },
        ]
      },
    ]
  },
];
};

// ─── LEVEL SYSTEM ─────────────────────────────────────────────────────────────
const LEVELS_DEF = [
  { name:"Новичок", nameEn:"Beginner", min:0, max:400, color:"#4ade80", icon:"🌱" },
  { name:"Ученик", nameEn:"Learner", min:400, max:900, color:"#38bdf8", icon:"📖" },
  { name:"Практик", nameEn:"Practitioner", min:900, max:1600, color:"#fb923c", icon:"⚡" },
  { name:"Мастер", nameEn:"Master", min:1600, max:2600, color:"#a78bfa", icon:"🔥" },
  { name:"Эксперт", nameEn:"Expert", min:2600, max:4000, color:"#f472b6", icon:"🚀" },
  { name:"Гуру", nameEn:"Guru", min:4000, max:99999, color:"#fbbf24", icon:"🏆" },
];
function getLevelInfo(xp, lang) {
  for (const l of LEVELS_DEF) if (xp >= l.min && xp < l.max) return { ...l, displayName: lang==="en"?l.nameEn:l.name, progress: Math.min(100,((xp-l.min)/(l.max-l.min))*100), next:l.max };
  const last = LEVELS_DEF[LEVELS_DEF.length-1];
  return { ...last, displayName: lang==="en"?last.nameEn:last.name, progress:100, next:99999 };
}

// ─── AI FUNCTIONS ─────────────────────────────────────────────────────────────
async function generateAITask(topic, levelName, lang, prevTasks=[]) {
  const diffMap = { "Новичок":"very simple, basic syntax only","Beginner":"very simple, basic syntax only","Ученик":"simple, combining 2-3 concepts","Learner":"simple, combining 2-3 concepts","Практик":"medium, real-world problem","Practitioner":"medium, real-world problem","Мастер":"hard, algorithms and patterns","Master":"hard, algorithms and patterns","Эксперт":"very hard, advanced patterns","Expert":"very hard, advanced patterns","Гуру":"expert, architectural decisions","Guru":"expert, architectural decisions" };
  const prompt = `You are a Python instructor. Create a practical coding task.
Topic: ${topic}
Difficulty for level "${levelName}": ${diffMap[levelName]||"medium"}
Language for descriptions: ${lang==="ru"?"Russian":"English"}
${prevTasks.length>0?`Already done: ${prevTasks.slice(-2).join("; ")}. Make a DIFFERENT task.`:""}
The task should feel realistic — from a working developer's daily life.
Reply ONLY in JSON (no markdown):
{"title":"Short title (5-8 words)","description":"Full task description (3-5 sentences)","starter":"# starter code here\\ndef solution():\\n    pass\\n","hint":"Concrete implementation hint","example_input":"Input example","example_output":"Expected output example","check_keywords":["key","words","in","solution"]}`;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages",{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, messages:[{role:"user",content:prompt}] }) });
    const data = await res.json();
    return JSON.parse((data.content?.[0]?.text||"{}").replace(/```json|```/g,"").trim());
  } catch { return {title:"Task",description:`Write a Python program about: ${topic}`,starter:"# Write here\n",hint:"Use learned concepts",example_output:"—",check_keywords:[]}; }
}
async function checkCode(code, task, levelName, lang) {
  const prompt = `You are a strict but encouraging Python mentor. Check this solution.
Task: ${task.description}
Expected keywords: ${task.check_keywords?.join(", ")}
Student level: ${levelName}
Code:
\`\`\`python
${code}
\`\`\`
Reply ONLY in JSON, all text in ${lang==="ru"?"Russian":"English"}:
{"correct":true/false,"score":0-100,"feedback":"Detailed feedback (3-5 sentences)","improvements":["improvement 1","improvement 2"],"praise":"What was done well (1-2 sentences)","fixed_code":"Improved version if needed, else empty string"}`;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages",{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, messages:[{role:"user",content:prompt}] }) });
    const data = await res.json();
    return JSON.parse((data.content?.[0]?.text||"{}").replace(/```json|```/g,"").trim());
  } catch { return {correct:true,score:80,feedback:"Good attempt!",improvements:[],praise:"Keep it up!",fixed_code:""}; }
}

// ─── STYLED COMPONENTS ────────────────────────────────────────────────────────
function CodeBlock({ code, t: theme, font }) {
  return (
    <pre style={{ background: theme.code, border:`1px solid ${theme.codeBorder}`, borderRadius:8, padding:"14px 16px", overflowX:"auto", margin:"10px 0", fontSize:13, color:theme.codeText, lineHeight:1.65, fontFamily:font.mono }}>
      <code>{code}</code>
    </pre>
  );
}

function SectionBlock({ section, t: theme, font }) {
  const colors = { tip:"#22c55e", note:"#60a5fa", warning:"#f59e0b" };
  if (section.type === "code") return <CodeBlock code={section.content} t={theme} font={font}/>;
  if (["tip","note","warning"].includes(section.type)) return (
    <div style={{ background:`${colors[section.type]}15`, border:`1px solid ${colors[section.type]}40`, borderRadius:8, padding:"10px 14px", margin:"10px 0", fontSize:13.5, color:colors[section.type], lineHeight:1.65, fontFamily:font.mono.includes("Mono")?font.mono:undefined }}>
      <span style={{marginRight:6}}>{section.type==="tip"?"💡":section.type==="warning"?"⚠️":"📌"}</span>{section.content}
    </div>
  );
  return (
    <div style={{ margin:"8px 0", fontSize:15, color:theme.text, lineHeight:1.8 }}
      dangerouslySetInnerHTML={{ __html: section.content
        .replace(/\*\*(.*?)\*\*/g,`<strong style="color:${theme.textBright}">$1</strong>`)
        .replace(/`([^`]+)`/g,`<code style="background:${theme.code};padding:1px 7px;border-radius:4px;color:${theme.codeText};font-size:13px;font-family:${font.mono}">\$1</code>`)
        .replace(/\n/g,"<br/>") }} />
  );
}

function TheoryView({ lesson, onNext }) {
  const { theme: t, font, lang } = useSettings();
  const tr = T[lang];
  return (
    <div style={{ animation:"fadeUp .4s ease" }}>
      <h2 style={{ fontFamily:font.display, fontSize:20, color:t.textBright, marginBottom:18, fontWeight:700 }}>{lesson.title}</h2>
      <div style={{ background:t.surface, border:`1px solid ${t.border}`, borderRadius:12, padding:22, marginBottom:20 }}>
        {lesson.sections.map((s,i) => <SectionBlock key={i} section={s} t={t} font={font}/>)}
      </div>
      <button onClick={onNext} style={{ width:"100%", padding:14, background:t.gradAccent, border:"none", borderRadius:10, color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:font.display }}>
        {tr.toQuiz}
      </button>
    </div>
  );
}

function QuizView({ lesson, onDone }) {
  const { theme: t, font, lang, settings } = useSettings();
  const tr = T[lang];
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const q = lesson.quiz[qi];

  const handleSel = (idx) => {
    if (sel !== null) return;
    setSel(idx);
    const isCorrect = idx === q.ans;
    if (isCorrect) setCorrect(c => c+1);
    const delay = settings.autoNext ? 900 : 1400;
    setTimeout(() => {
      if (qi+1 >= lesson.quiz.length) setDone(true);
      else { setQi(i => i+1); setSel(null); }
    }, delay);
  };

  if (done) {
    const pct = Math.round((correct/lesson.quiz.length)*100);
    const pass = pct >= 67;
    return (
      <div style={{ textAlign:"center", padding:"20px 0", animation:"fadeUp .4s ease" }}>
        <div style={{ fontSize:60, marginBottom:10 }}>{pass?"🎉":"📚"}</div>
        <div style={{ fontFamily:font.display, fontSize:44, fontWeight:800, color:pass?t.success:t.warn }}>{pct}%</div>
        <div style={{ color:t.textMuted, marginBottom:28, fontSize:15 }}>{correct} {tr.correct} {lesson.quiz.length} {tr.right}</div>
        <button onClick={() => onDone(pass)} style={{ padding:"14px 40px", background:pass?t.gradAccent:`linear-gradient(135deg,#92400e,#78350f)`, border:"none", borderRadius:12, color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:font.display }}>
          {pass ? `+${lesson.xp} ${tr.xp} 🎯` : tr.repeatTheory}
        </button>
      </div>
    );
  }

  return (
    <div style={{ animation:"fadeUp .4s ease" }}>
      <div style={{ display:"flex", justifyContent:"space-between", color:t.textMuted, fontSize:13, fontFamily:font.mono, marginBottom:10 }}>
        <span>{qi+1}/{lesson.quiz.length}</span><span>{correct} ✓</span>
      </div>
      <div style={{ height:4, background:t.surface, borderRadius:4, marginBottom:22, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${(qi/lesson.quiz.length)*100}%`, background:t.accent, transition:"width .4s" }} />
      </div>
      <div style={{ background:t.surface, border:`1px solid ${t.border}`, borderRadius:12, padding:18, marginBottom:18, fontSize:16, color:t.textBright, fontWeight:600, lineHeight:1.5 }}>{q.q}</div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {q.opts.map((opt, i) => {
          let bg=t.surface, border=t.border, color=t.textMuted;
          if (sel!==null) {
            if (i===q.ans) { bg=t.successBg; border=t.successBorder; color=t.success; }
            else if (i===sel) { bg=t.errorBg; border=t.errorBorder; color=t.error; }
          }
          return <button key={i} onClick={() => handleSel(i)} style={{ padding:"13px 18px", background:bg, border:`1px solid ${border}`, borderRadius:10, color, fontSize:15, cursor:sel?"default":"pointer", textAlign:"left", transition:"all .2s", fontFamily:font.display }}>
            <span style={{ color:t.textMuted, marginRight:8, fontFamily:font.mono }}>{String.fromCharCode(65+i)}.</span>{opt}
          </button>;
        })}
      </div>
    </div>
  );
}

function PracticeView({ module: mod, onXP }) {
  const { theme: t, font, lang, settings } = useSettings();
  const tr = T[lang];
  const level = getLevelInfo(parseInt(localStorage.getItem("pxp")||"0"), lang);
  const [task, setTask] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showFixed, setShowFixed] = useState(false);
  const [done, setDone] = useState([]);

  const load = useCallback(async () => {
    setLoading(true); setTask(null); setResult(null); setShowHint(false); setShowFixed(false);
    const t2 = await generateAITask(mod.title, level.displayName, lang, done);
    setTask(t2); setCode(t2.starter || "# Write your solution here\n");
    setLoading(false);
  }, [mod.title, level.displayName, lang, done]);

  useEffect(() => { load(); }, []);

  const check = async () => {
    setChecking(true);
    const r = await checkCode(code, task, level.displayName, lang);
    setResult(r); setChecking(false);
  };

  if (loading) return (
    <div style={{ textAlign:"center", padding:50 }}>
      <div style={{ fontSize:48, display:"inline-block", animation:"spin 1.2s linear infinite", marginBottom:14 }}>⚙️</div>
      <div style={{ color:t.textMuted, fontFamily:font.mono, fontSize:13 }}>{tr.generating}</div>
    </div>
  );

  return (
    <div style={{ animation:"fadeUp .4s ease" }}>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
        <span style={{ background:`${t.accent}20`, border:`1px solid ${t.accent}50`, borderRadius:6, padding:"3px 10px", fontSize:11, color:t.accent, fontFamily:font.mono }}>{tr.aiTask} #{done.length+1}</span>
        <span style={{ background:`${mod.color}20`, border:`1px solid ${mod.color}50`, borderRadius:6, padding:"3px 10px", fontSize:11, color:mod.color, fontFamily:font.mono }}>{mod.title}</span>
        <span style={{ background:`${level.color}20`, border:`1px solid ${level.color}50`, borderRadius:6, padding:"3px 10px", fontSize:11, color:level.color, fontFamily:font.mono }}>{level.displayName}</span>
      </div>
      <h3 style={{ fontFamily:font.display, fontSize:18, color:t.textBright, marginBottom:10, fontWeight:700 }}>{task?.title}</h3>
      <div style={{ background:t.surface, border:`1px solid ${t.border}`, borderRadius:10, padding:16, marginBottom:14, color:t.text, fontSize:14, lineHeight:1.75 }}>{task?.description}</div>

      {(task?.example_input || task?.example_output) && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
          {task.example_input && <div style={{ background:t.code, border:`1px solid ${t.codeBorder}`, borderRadius:8, padding:12 }}>
            <div style={{ color:t.textMuted, fontFamily:font.mono, fontSize:10, textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>{tr.exampleIn}</div>
            <code style={{ color:t.text, fontFamily:font.mono, fontSize:12 }}>{task.example_input}</code>
          </div>}
          {task.example_output && <div style={{ background:t.code, border:`1px solid ${t.codeBorder}`, borderRadius:8, padding:12 }}>
            <div style={{ color:t.textMuted, fontFamily:font.mono, fontSize:10, textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>{tr.exampleOut}</div>
            <code style={{ color:t.success, fontFamily:font.mono, fontSize:12 }}>{task.example_output}</code>
          </div>}
        </div>
      )}

      {/* Code editor */}
      <div style={{ background:t.code, border:`1px solid ${t.codeBorder}`, borderRadius:10, overflow:"hidden", marginBottom:12, fontFamily:font.mono }}>
        <div style={{ background:t.surface, padding:"8px 16px", borderBottom:`1px solid ${t.border}`, display:"flex", gap:6, alignItems:"center" }}>
          {["#ff5f57","#febc2e","#28c840"].map((c,i) => <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c }} />)}
          <span style={{ marginLeft:8, fontSize:11, color:t.textMuted }}>solution.py</span>
        </div>
        <div style={{ display:"flex" }}>
          <div style={{ padding:"14px 10px", background:t.code, borderRight:`1px solid ${t.border}`, minWidth:36, textAlign:"right", userSelect:"none" }}>
            {code.split("\n").map((_,i) => <div key={i} style={{ fontSize:parseInt(settings.codeSize)-1, lineHeight:"21px", color:t.textMuted, opacity:0.4 }}>{i+1}</div>)}
          </div>
          <textarea value={code} onChange={e => setCode(e.target.value)} spellCheck={false}
            style={{ flex:1, padding:14, background:"transparent", border:"none", outline:"none", color:t.codeText, fontSize:parseInt(settings.codeSize), lineHeight:"21px", fontFamily:"inherit", resize:"vertical", minHeight:160, width:"100%" }} />
        </div>
      </div>

      <div style={{ display:"flex", gap:8, marginBottom:14 }}>
        <button onClick={check} disabled={checking} style={{ flex:1, padding:12, background:checking?t.surface:t.gradAccent, border:`1px solid ${t.border}`, borderRadius:10, color:checking?t.textMuted:"#fff", fontSize:15, fontWeight:700, cursor:checking?"wait":"pointer", fontFamily:font.display, transition:"all .2s" }}>
          {checking?tr.checking:tr.checkCode}
        </button>
        <button onClick={()=>setShowHint(h=>!h)} style={{ padding:"12px 15px", background:showHint?`${t.accent}20`:t.surface, border:`1px solid ${showHint?t.accent:t.border}`, borderRadius:10, color:showHint?t.accent:t.textMuted, cursor:"pointer", fontSize:16 }}>💡</button>
        <button onClick={load} style={{ padding:"12px 15px", background:t.surface, border:`1px solid ${t.border}`, borderRadius:10, color:t.textMuted, cursor:"pointer", fontSize:16 }}>🔄</button>
      </div>

      {showHint && <div style={{ background:`${t.success}15`, border:`1px solid ${t.success}40`, borderRadius:10, padding:14, marginBottom:12, color:t.success, fontSize:14, lineHeight:1.6 }}>💡 {task?.hint}</div>}

      {result && (
        <div style={{ background:result.correct?t.successBg:t.errorBg, border:`1px solid ${result.correct?t.successBorder:t.errorBorder}`, borderRadius:12, padding:20, animation:"fadeUp .3s ease" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
            <span style={{ fontSize:18, fontWeight:800, color:result.correct?t.success:t.error, fontFamily:font.display }}>{result.correct?tr.excellent:tr.tryAgain}</span>
            <span style={{ fontFamily:font.mono, fontSize:24, fontWeight:800, color:result.score>=80?t.success:result.score>=50?t.warn:t.error }}>{result.score}%</span>
          </div>
          {result.praise && <div style={{ color:t.success, fontSize:14, marginBottom:10, padding:"8px 12px", background:`${t.success}15`, borderRadius:8 }}>👍 {result.praise}</div>}
          <div style={{ color:t.text, fontSize:14, lineHeight:1.75, marginBottom:12 }}>{result.feedback}</div>
          {result.improvements?.length>0 && (
            <div style={{ marginBottom:14 }}>
              <div style={{ color:t.textMuted, fontSize:11, fontFamily:font.mono, textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>{tr.improvements}:</div>
              {result.improvements.map((imp,i) => <div key={i} style={{ color:t.textMuted, fontSize:13, marginBottom:5, paddingLeft:12, borderLeft:`2px solid ${t.border}` }}>→ {imp}</div>)}
            </div>
          )}
          {result.fixed_code && (
            <div style={{ marginBottom:14 }}>
              <button onClick={()=>setShowFixed(s=>!s)} style={{ background:"none", border:`1px solid ${t.border}`, borderRadius:8, padding:"6px 14px", color:t.textMuted, cursor:"pointer", fontSize:12, fontFamily:font.mono }}>
                {showFixed?tr.hideSolution:tr.showSolution}
              </button>
              {showFixed && <CodeBlock code={result.fixed_code} t={t} font={font}/>}
            </div>
          )}
          {result.correct && (
            <button onClick={() => {
              const bonus = 25+Math.floor(Math.random()*25);
              setDone(d=>[...d, task.title]);
              onXP(bonus);
              load();
            }} style={{ width:"100%", padding:12, background:t.gradAccent, border:"none", borderRadius:10, color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:font.display }}>
              {tr.nextTask}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── SETTINGS PANEL ───────────────────────────────────────────────────────────
function SettingsPanel({ onClose }) {
  const { theme: t, font, lang, settings, setTheme, setFont, setLang, updateSetting, resetProgress } = useSettings();
  const tr = T[lang];
  const [confirmReset, setConfirmReset] = useState(false);

  const Row = ({ label, children }) => (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 0", borderBottom:`1px solid ${t.border}` }}>
      <span style={{ color:t.text, fontSize:14 }}>{label}</span>
      <div>{children}</div>
    </div>
  );

  const ThemeBtn = ({ id, theme }) => (
    <button onClick={()=>setTheme(id)} style={{ width:32, height:32, borderRadius:8, background:theme.bg, border:`2px solid ${settings.theme===id?theme.accent:t.border}`, cursor:"pointer", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:12, background:theme.accent, opacity:0.7 }} />
    </button>
  );

  const Select = ({ value, onChange, options }) => (
    <select value={value} onChange={e=>onChange(e.target.value)} style={{ background:t.surface, border:`1px solid ${t.border}`, borderRadius:8, padding:"6px 10px", color:t.text, fontSize:13, outline:"none", fontFamily:font.display }}>
      {options.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );

  const Toggle = ({ value, onChange }) => (
    <button onClick={()=>onChange(!value)} style={{ width:44, height:24, borderRadius:12, background:value?t.accent:t.border, border:"none", cursor:"pointer", position:"relative", transition:"background .2s" }}>
      <div style={{ position:"absolute", top:2, left:value?22:2, width:20, height:20, borderRadius:10, background:"#fff", transition:"left .2s" }} />
    </button>
  );

  return (
    <div style={{ position:"fixed", inset:0, zIndex:500, background:"rgba(0,0,0,0.7)", display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ background:t.bg, border:`1px solid ${t.border}`, borderRadius:"20px 20px 0 0", padding:"0 0 40px", width:"100%", maxWidth:700, maxHeight:"85vh", overflowY:"auto", animation:"slideUp .3s ease" }}>
        <div style={{ position:"sticky", top:0, background:t.bg, padding:"16px 20px", borderBottom:`1px solid ${t.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontWeight:800, fontSize:18, color:t.textBright, fontFamily:font.display }}>⚙️ {tr.settings}</span>
          <button onClick={onClose} style={{ background:t.surface, border:`1px solid ${t.border}`, borderRadius:8, padding:"6px 14px", color:t.textMuted, cursor:"pointer", fontSize:14 }}>✕</button>
        </div>

        <div style={{ padding:"0 20px" }}>
          {/* Language */}
          <div style={{ marginTop:20, marginBottom:6, fontSize:11, color:t.textMuted, fontFamily:font.mono, textTransform:"uppercase", letterSpacing:1 }}>{tr.langSettings}</div>
          <div style={{ display:"flex", gap:8 }}>
            {[["ru","🇷🇺 Русский"],["en","🇬🇧 English"]].map(([l,label]) => (
              <button key={l} onClick={()=>setLang(l)} style={{ flex:1, padding:"10px", background:lang===l?`${t.accent}20`:t.surface, border:`1px solid ${lang===l?t.accent:t.border}`, borderRadius:10, color:lang===l?t.accent:t.textMuted, cursor:"pointer", fontSize:14, fontWeight:lang===l?700:400, fontFamily:font.display }}>{label}</button>
            ))}
          </div>

          {/* Theme */}
          <div style={{ marginTop:20, marginBottom:6, fontSize:11, color:t.textMuted, fontFamily:font.mono, textTransform:"uppercase", letterSpacing:1 }}>{tr.themeSettings}</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
            {Object.entries(THEMES).map(([id, th]) => (
              <button key={id} onClick={()=>setTheme(id)} style={{ padding:"12px 10px", background:th.bg, border:`2px solid ${settings.theme===id?th.accent:t.border}`, borderRadius:12, cursor:"pointer", textAlign:"center" }}>
                <div style={{ fontSize:18, marginBottom:4 }}>{th.bg==="#f5f7fa"?"☀️":id==="neon"?"🌃":id==="aurora"?"🌌":id==="ember"?"🔥":id==="forest"?"🌲":"🌙"}</div>
                <div style={{ fontSize:11, color:th.textBright, fontWeight:600 }}>{lang==="ru"?th.nameRu:th.name}</div>
                <div style={{ display:"flex", gap:3, justifyContent:"center", marginTop:6 }}>
                  {[th.accent,th.success,th.error].map((c,i) => <div key={i} style={{ width:8, height:8, borderRadius:"50%", background:c }} />)}
                </div>
              </button>
            ))}
          </div>

          {/* Font */}
          <div style={{ marginTop:20, marginBottom:6, fontSize:11, color:t.textMuted, fontFamily:font.mono, textTransform:"uppercase", letterSpacing:1 }}>{tr.fontSettings}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {Object.entries(FONTS).map(([id, f]) => (
              <button key={id} onClick={()=>setFont(id)} style={{ padding:"10px 16px", background:settings.font===id?`${t.accent}15`:t.surface, border:`1px solid ${settings.font===id?t.accent:t.border}`, borderRadius:10, cursor:"pointer", textAlign:"left", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontFamily:f.display, color:t.text, fontSize:15 }}>{f.name}</span>
                <span style={{ fontFamily:f.mono, color:t.textMuted, fontSize:12 }}>x = 42</span>
              </button>
            ))}
          </div>

          {/* UI Settings */}
          <div style={{ marginTop:20, marginBottom:6, fontSize:11, color:t.textMuted, fontFamily:font.mono, textTransform:"uppercase", letterSpacing:1 }}>UI</div>
          <div style={{ background:t.surface, border:`1px solid ${t.border}`, borderRadius:12, padding:"0 16px" }}>
            <Row label={`${tr.fontSize}: ${settings.fontSize}px`}>
              <input type="range" min={13} max={20} value={settings.fontSize} onChange={e=>updateSetting("fontSize",e.target.value)} style={{ accentColor:t.accent, width:100 }}/>
            </Row>
            <Row label={`${tr.codeSize}: ${settings.codeSize}px`}>
              <input type="range" min={11} max={18} value={settings.codeSize} onChange={e=>updateSetting("codeSize",e.target.value)} style={{ accentColor:t.accent, width:100 }}/>
            </Row>
            <Row label={tr.animations}><Toggle value={settings.animations} onChange={v=>updateSetting("animations",v)}/></Row>
            <Row label={tr.autoNext}><Toggle value={settings.autoNext} onChange={v=>updateSetting("autoNext",v)}/></Row>
          </div>

          {/* Reset */}
          <div style={{ marginTop:20 }}>
            {!confirmReset
              ? <button onClick={()=>setConfirmReset(true)} style={{ width:"100%", padding:12, background:"none", border:`1px solid ${t.errorBorder}`, borderRadius:10, color:t.error, fontSize:14, cursor:"pointer", fontFamily:font.display }}>
                  {tr.resetProgress}
                </button>
              : <div style={{ background:t.errorBg, border:`1px solid ${t.errorBorder}`, borderRadius:10, padding:16 }}>
                  <div style={{ color:t.error, fontSize:14, marginBottom:12, textAlign:"center" }}>{tr.resetConfirm}</div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={()=>setConfirmReset(false)} style={{ flex:1, padding:10, background:t.surface, border:`1px solid ${t.border}`, borderRadius:8, color:t.text, cursor:"pointer" }}>{tr.cancel}</button>
                    <button onClick={()=>{resetProgress();setConfirmReset(false);onClose();}} style={{ flex:1, padding:10, background:t.error, border:"none", borderRadius:8, color:"#fff", cursor:"pointer", fontWeight:700 }}>{tr.confirm}</button>
                  </div>
                </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [settings, setSettingsState] = useState(() => {
    const saved = localStorage.getItem("pySettings");
    return saved ? JSON.parse(saved) : { theme:"midnight", font:"syne", fontSize:"15", codeSize:"13", animations:true, autoNext:true };
  });
  const [lang, setLangState] = useState(() => localStorage.getItem("pyLang") || "ru");

  const theme = THEMES[settings.theme] || THEMES.midnight;
  const font = FONTS[settings.font] || FONTS.syne;

  const setTheme = (id) => { const s = {...settings, theme:id}; setSettingsState(s); localStorage.setItem("pySettings", JSON.stringify(s)); };
  const setFont = (id) => { const s = {...settings, font:id}; setSettingsState(s); localStorage.setItem("pySettings", JSON.stringify(s)); };
  const setLang = (l) => { setLangState(l); localStorage.setItem("pyLang", l); };
  const updateSetting = (k, v) => { const s = {...settings, [k]:v}; setSettingsState(s); localStorage.setItem("pySettings", JSON.stringify(s)); };

  const [xp, setXp] = useState(() => parseInt(localStorage.getItem("pxp")||"0"));
  const [completed, setCompleted] = useState(() => JSON.parse(localStorage.getItem("pdone")||"[]"));
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem("pstreak")||"0"));

  const saveXP = (v) => { setXp(v); localStorage.setItem("pxp",v); };
  const saveDone = (v) => { setCompleted(v); localStorage.setItem("pdone",JSON.stringify(v)); };
  const saveStreak = (v) => { setStreak(v); localStorage.setItem("pstreak",v); };
  const resetProgress = () => { saveXP(0); saveDone([]); saveStreak(0); };

  const ctxVal = { theme, font, lang, settings, setTheme, setFont, setLang, updateSetting, resetProgress };

  const MODULES = buildCurriculum(lang);
  const totalLessons = MODULES.reduce((s,m) => s+m.lessons.length, 0);
  const level = getLevelInfo(xp, lang);
  const tr = T[lang];

  const [screen, setScreen] = useState("home");
  const [selMod, setSelMod] = useState(null);
  const [selLesson, setSelLesson] = useState(null);
  const [lessonStep, setLessonStep] = useState("theory");
  const [practiceMod, setPracticeMod] = useState(null);
  const [tab, setTab] = useState("modules");
  const [showSettings, setShowSettings] = useState(false);
  const [notif, setNotif] = useState(null);
  const [expandedLevel, setExpandedLevel] = useState(null);

  const notify = (msg, color) => { setNotif({msg, color:color||theme.success}); setTimeout(()=>setNotif(null),3000); };

  const finishLesson = (lessonId, earnXP) => {
    if (!completed.includes(lessonId)) {
      saveXP(xp+earnXP); saveDone([...completed,lessonId]); saveStreak(streak+1);
      notify(`+${earnXP} ${tr.xp}! ${tr.lessonComplete}`);
    }
    setScreen("module");
  };

  const modPct = (mod) => {
    const d = mod.lessons.filter(l => completed.includes(l.id)).length;
    return { done:d, total:mod.lessons.length, pct:Math.round((d/mod.lessons.length)*100) };
  };

  const globalPct = Math.round((completed.length/totalLessons)*100);

  const levelGroups = [...new Set(MODULES.map(m=>m.level))].sort().map(lv => ({
    lv, modules: MODULES.filter(m=>m.level===lv)
  }));
  const levelLabels = {1:"🟢",2:"🔵",3:"🌐",4:"🤖",5:"📊",6:"🧠",7:"⚡",8:"✅",9:"🏗️"};

  const t = theme;

  return (
    <SettingsCtx.Provider value={ctxVal}>
      <link rel="stylesheet" href={font.url} />
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:${t.bg}; font-size:${settings.fontSize}px; }
        button { font-family:inherit; }
        @keyframes fadeUp { from { opacity:0;transform:translateY(${settings.animations?"14px":"0"}) } to { opacity:1;transform:translateY(0) } }
        @keyframes spin { to { transform:rotate(360deg) } }
        @keyframes slideIn { from { opacity:0;transform:translateX(16px) } to { opacity:1;transform:translateX(0) } }
        @keyframes slideUp { from { opacity:0;transform:translateY(30px) } to { opacity:1;transform:translateY(0) } }
        ::-webkit-scrollbar { width:4px } ::-webkit-scrollbar-track { background:${t.bg} } ::-webkit-scrollbar-thumb { background:${t.border};border-radius:4px }
        select option { background: ${t.surface}; color: ${t.text}; }
      `}</style>

      {/* Notification */}
      {notif && <div style={{ position:"fixed", top:18, right:18, zIndex:999, background:t.surface, border:`1px solid ${notif.color}`, borderRadius:12, padding:"11px 18px", color:notif.color, fontWeight:700, fontSize:14, animation:"slideIn .3s ease", boxShadow:`0 0 24px ${notif.color}40`, maxWidth:280, fontFamily:font.display }}>{notif.msg}</div>}

      {/* Settings Panel */}
      {showSettings && <SettingsPanel onClose={()=>setShowSettings(false)} />}

      <div style={{ minHeight:"100vh", background:t.bg, color:t.text, fontFamily:font.display, maxWidth:700, margin:"0 auto", paddingBottom:60 }}>

        {/* Header */}
        <div style={{ position:"sticky", top:0, zIndex:100, background:t.headerBg, backdropFilter:"blur(14px)", borderBottom:`1px solid ${t.border}`, padding:"12px 16px", display:"flex", alignItems:"center", gap:10 }}>
          {screen !== "home" && (
            <button onClick={() => { if(screen==="lesson"||screen==="practice") setScreen("module"); else setScreen("home"); }}
              style={{ background:t.surface, border:`1px solid ${t.border}`, borderRadius:8, padding:"6px 12px", color:t.textMuted, cursor:"pointer", fontSize:14, flexShrink:0 }}>←</button>
          )}
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontWeight:800, fontSize:16, color:t.textBright, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", fontFamily:font.display }}>
              {screen==="home"?"🐍 "+tr.appName:screen==="module"?selMod?.title:screen==="lesson"?selLesson?.title:`⚡ ${tr.practice} · ${practiceMod?.title}`}
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
            <div style={{ background:t.surface, border:`1px solid ${level.color}40`, borderRadius:8, padding:"4px 10px", textAlign:"right" }}>
              <div style={{ fontSize:10, color:t.textMuted, fontFamily:font.mono, textTransform:"uppercase", letterSpacing:1 }}>{level.icon} {level.displayName}</div>
              <div style={{ fontSize:13, fontWeight:800, color:level.color, fontFamily:font.mono }}>{xp} {tr.xp}</div>
            </div>
            <div style={{ background:t.surface, border:`1px solid ${t.border}`, borderRadius:8, padding:"4px 10px", fontSize:13, color:t.warn, fontWeight:700, fontFamily:font.mono }}>🔥{streak}</div>
            <button onClick={()=>setShowSettings(true)} style={{ background:t.surface, border:`1px solid ${t.border}`, borderRadius:8, padding:"8px 10px", color:t.textMuted, cursor:"pointer", fontSize:16 }}>⚙️</button>
          </div>
        </div>

        <div style={{ padding:"16px 16px 0" }}>

          {/* ── HOME ── */}
          {screen==="home" && (
            <div style={{ animation:"fadeUp .4s ease" }}>
              {/* Level card */}
              <div style={{ background:t.surface, border:`1px solid ${level.color}25`, borderRadius:14, padding:18, marginBottom:20 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                  <div>
                    <div style={{ fontSize:11, color:t.textMuted, fontFamily:font.mono, textTransform:"uppercase", letterSpacing:1 }}>{tr.level}</div>
                    <div style={{ fontSize:22, fontWeight:800, color:level.color, fontFamily:font.display }}>{level.icon} {level.displayName}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:11, color:t.textMuted, fontFamily:font.mono, textTransform:"uppercase", letterSpacing:1 }}>{tr.courseProgress}</div>
                    <div style={{ fontSize:22, fontWeight:800, color:t.textBright, fontFamily:font.mono }}>{globalPct}%</div>
                  </div>
                </div>
                <div style={{ height:6, background:t.bg, borderRadius:6, overflow:"hidden", marginBottom:6 }}>
                  <div style={{ height:"100%", width:`${level.progress}%`, background:level.color, borderRadius:6, transition:"width .8s" }} />
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:t.textMuted, fontFamily:font.mono }}>
                  <span>{xp} {tr.xp} · {completed.length}/{totalLessons} {tr.lessonsDone}</span>
                  <span>{tr.nextLevel}: {level.next-xp} {tr.xp}</span>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display:"flex", borderRadius:10, overflow:"hidden", border:`1px solid ${t.border}`, marginBottom:20 }}>
                {[[" modules",tr.modules],["roadmap",tr.roadmap],["stats",tr.stats]].map(([id,label])=>(
                  <button key={id} onClick={()=>setTab(id.trim())} style={{ flex:1, padding:"10px 0", background:tab===id.trim()?t.surface:"none", border:"none", color:tab===id.trim()?t.textBright:t.textMuted, fontWeight:tab===id.trim()?700:400, fontSize:13, cursor:"pointer", borderRight:`1px solid ${t.border}`, transition:"all .2s", fontFamily:font.display }}>{label}</button>
                ))}
              </div>

              {/* MODULES */}
              {tab==="modules" && (
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {MODULES.map((mod,mi) => {
                    const { done, total, pct } = modPct(mod);
                    const isLocked = mi > 0 && modPct(MODULES[mi-1]).pct < 30;
                    return (
                      <div key={mod.id} onClick={()=>{ if(!isLocked){ setSelMod(mod); setScreen("module"); } }}
                        style={{ background:isLocked?t.card:t.surface, border:`1px solid ${pct===100?mod.color+"50":t.border}`, borderRadius:12, padding:"14px 16px", cursor:isLocked?"not-allowed":"pointer", opacity:isLocked?.4:1, transition:"border-color .2s" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                          <div style={{ width:46, height:46, background:`${mod.color}15`, border:`1px solid ${mod.color}30`, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{isLocked?"🔒":mod.icon}</div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                              <div style={{ fontWeight:700, color:t.textBright, fontSize:14, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:"65%", fontFamily:font.display }}>{mod.title}</div>
                              <div style={{ fontSize:11, color:t.textMuted, fontFamily:font.mono }}>Lv.{mod.level}</div>
                            </div>
                            <div style={{ fontSize:12, color:t.textMuted, marginBottom:7 }}>{mod.desc}</div>
                            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                              <div style={{ flex:1, height:3, background:t.bg, borderRadius:3, overflow:"hidden" }}>
                                <div style={{ height:"100%", width:`${pct}%`, background:mod.color, borderRadius:3, transition:"width .5s" }} />
                              </div>
                              <span style={{ fontSize:11, color:pct===100?mod.color:t.textMuted, fontFamily:font.mono, flexShrink:0 }}>{done}/{total}</span>
                            </div>
                          </div>
                          <div style={{ color:t.border, fontSize:18 }}>›</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ROADMAP */}
              {tab==="roadmap" && (
                <div>
                  {levelGroups.map(({lv, modules:mods}) => {
                    const totalDone = mods.reduce((s,m)=>s+modPct(m).done,0);
                    const totalAll = mods.reduce((s,m)=>s+m.lessons.length,0);
                    return (
                      <div key={lv} style={{ marginBottom:10 }}>
                        <button onClick={()=>setExpandedLevel(expandedLevel===lv?null:lv)} style={{ width:"100%", background:t.surface, border:`1px solid ${t.border}`, borderRadius:expandedLevel===lv?"10px 10px 0 0":10, padding:"12px 16px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", fontFamily:font.display }}>
                          <span style={{ fontWeight:700, color:t.textBright, fontSize:14 }}>{levelLabels[lv]} Level {lv}</span>
                          <span style={{ color:t.textMuted, fontSize:13, fontFamily:font.mono }}>{totalDone}/{totalAll} {expandedLevel===lv?"▲":"▼"}</span>
                        </button>
                        {expandedLevel===lv && (
                          <div style={{ background:t.card, border:`1px solid ${t.border}`, borderTop:"none", borderRadius:"0 0 10px 10px", padding:12 }}>
                            {mods.map(mod => (
                              <div key={mod.id} style={{ padding:"8px 0", borderBottom:`1px solid ${t.border}` }}>
                                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                                  <span style={{ fontSize:18 }}>{mod.icon}</span>
                                  <div style={{ flex:1 }}>
                                    <div style={{ fontSize:13, color:t.textBright, fontWeight:600, fontFamily:font.display }}>{mod.title}</div>
                                    <div style={{ fontSize:11, color:t.textMuted, fontFamily:font.mono }}>{mod.lessons.length} {tr.lessonsDone} · {mod.lessons.reduce((a,l)=>a+l.xp,0)} {tr.xp}</div>
                                  </div>
                                  <div style={{ fontSize:11, color:modPct(mod).pct===100?t.success:t.textMuted, fontFamily:font.mono }}>{modPct(mod).pct}%</div>
                                </div>
                                {mod.lessons.map(l => (
                                  <div key={l.id} style={{ display:"flex", alignItems:"center", gap:8, padding:"4px 0 4px 28px" }}>
                                    <span style={{ fontSize:12 }}>{completed.includes(l.id)?"✅":"○"}</span>
                                    <span style={{ fontSize:12, color:completed.includes(l.id)?t.success:t.textMuted, fontFamily:font.display }}>{l.title}</span>
                                    <span style={{ fontSize:10, color:t.textMuted, fontFamily:font.mono, marginLeft:"auto" }}>+{l.xp}</span>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* STATS */}
              {tab==="stats" && (
                <div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:16 }}>
                    {[["🎯",`${globalPct}%`,tr.courseProgress],["⚡",completed.length,tr.totalLessons],["🔥",streak,tr.streak],[level.icon,level.displayName,tr.level],["📦",MODULES.filter(m=>modPct(m).pct===100).length,tr.completedMods],["🏆",xp,tr.totalXP]].map(([icon,val,label])=>(
                      <div key={label} style={{ background:t.surface, border:`1px solid ${t.border}`, borderRadius:12, padding:14, textAlign:"center" }}>
                        <div style={{ fontSize:22, marginBottom:4 }}>{icon}</div>
                        <div style={{ fontWeight:800, color:t.textBright, fontSize:17, fontFamily:font.display }}>{val}</div>
                        <div style={{ fontSize:11, color:t.textMuted, marginTop:2 }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background:t.surface, border:`1px solid ${t.border}`, borderRadius:12, padding:16, marginBottom:14 }}>
                    <div style={{ fontSize:12, color:t.textMuted, fontFamily:font.mono, textTransform:"uppercase", letterSpacing:1, marginBottom:12 }}>{tr.levelProgress}</div>
                    {LEVELS_DEF.map(lv => (
                      <div key={lv.name} style={{ marginBottom:10 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                          <span style={{ fontSize:12, color:xp>=lv.min?lv.color:t.textMuted, fontFamily:font.display }}>{lv.icon} {lang==="ru"?lv.name:lv.nameEn}</span>
                          <span style={{ fontSize:11, color:t.textMuted, fontFamily:font.mono }}>{lv.min}–{lv.max===99999?"∞":lv.max}</span>
                        </div>
                        <div style={{ height:4, background:t.bg, borderRadius:4, overflow:"hidden" }}>
                          <div style={{ height:"100%", width:`${xp>=lv.max?100:xp>lv.min?((xp-lv.min)/(lv.max-lv.min))*100:0}%`, background:lv.color, borderRadius:4, transition:"width .6s" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Practice */}
              <div style={{ marginTop:20 }}>
                <div style={{ fontSize:11, color:t.textMuted, fontFamily:font.mono, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>⚡ {tr.quickPractice}</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  {MODULES.slice(0,6).map(mod => (
                    <button key={mod.id} onClick={()=>{ setPracticeMod(mod); setScreen("practice"); }}
                      style={{ background:t.surface, border:`1px solid ${t.border}`, borderRadius:10, padding:"12px 14px", cursor:"pointer", textAlign:"left", transition:"border-color .2s", fontFamily:font.display }}
                      onMouseEnter={e=>e.currentTarget.style.borderColor=mod.color}
                      onMouseLeave={e=>e.currentTarget.style.borderColor=t.border}>
                      <span style={{ fontSize:18 }}>{mod.icon}</span>
                      <div style={{ fontSize:12, fontWeight:600, color:t.textBright, marginTop:6 }}>{mod.title}</div>
                      <div style={{ fontSize:10, color:mod.color, fontFamily:font.mono, marginTop:3 }}>AI</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── MODULE ── */}
          {screen==="module" && selMod && (
            <div style={{ animation:"fadeUp .4s ease" }}>
              <div style={{ background:t.surface, border:`1px solid ${selMod.color}30`, borderRadius:14, padding:18, marginBottom:18 }}>
                <div style={{ display:"flex", gap:14, alignItems:"center" }}>
                  <div style={{ width:54, height:54, background:`${selMod.color}15`, border:`1px solid ${selMod.color}40`, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{selMod.icon}</div>
                  <div>
                    <div style={{ fontWeight:800, color:t.textBright, fontSize:17, fontFamily:font.display }}>{selMod.title}</div>
                    <div style={{ fontSize:13, color:t.textMuted }}>{selMod.desc}</div>
                    <div style={{ fontSize:12, color:selMod.color, fontFamily:font.mono, marginTop:4 }}>{modPct(selMod).done}/{modPct(selMod).total} · {modPct(selMod).pct}%</div>
                  </div>
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
                {selMod.lessons.map((lesson,li) => {
                  const isDone = completed.includes(lesson.id);
                  return (
                    <div key={lesson.id} onClick={()=>{ setSelLesson(lesson); setLessonStep("theory"); setScreen("lesson"); }}
                      style={{ background:isDone?t.successBg:t.surface, border:`1px solid ${isDone?t.successBorder:t.border}`, borderRadius:12, padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:38, height:38, borderRadius:"50%", background:isDone?t.successBorder:t.card, border:`2px solid ${isDone?t.success:t.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:isDone?16:14, fontWeight:800, color:isDone?t.success:t.textMuted, flexShrink:0, fontFamily:font.mono }}>{isDone?"✓":li+1}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:700, color:isDone?t.success:t.textBright, fontSize:14, fontFamily:font.display }}>{lesson.title}</div>
                        <div style={{ fontSize:11, color:t.textMuted, fontFamily:font.mono, marginTop:2 }}>+{lesson.xp} {tr.xp} · {lesson.quiz.length}Q</div>
                      </div>
                      <span style={{ color:t.border, fontSize:18 }}>›</span>
                    </div>
                  );
                })}
              </div>
              <button onClick={()=>{ setPracticeMod(selMod); setScreen("practice"); }} style={{ width:"100%", padding:14, background:t.surface, border:`1px solid ${selMod.color}50`, borderRadius:12, color:selMod.color, fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:font.display }}>
                {selMod.icon} {tr.aiPractice}
              </button>
            </div>
          )}

          {/* ── LESSON ── */}
          {screen==="lesson" && selLesson && (
            <div style={{ animation:"fadeUp .4s ease" }}>
              <div style={{ display:"flex", gap:6, marginBottom:20 }}>
                {["theory","quiz"].map(s => (
                  <div key={s} style={{ flex:1, height:4, borderRadius:4, background:s===lessonStep?t.accent:lessonStep==="quiz"&&s==="theory"?t.success:t.surface, transition:"background .3s" }} />
                ))}
              </div>
              {lessonStep==="theory" && <TheoryView lesson={selLesson} onNext={()=>setLessonStep("quiz")} />}
              {lessonStep==="quiz" && <QuizView lesson={selLesson} onDone={pass=>{ if(pass) finishLesson(selLesson.id, selLesson.xp); else setLessonStep("theory"); }} />}
            </div>
          )}

          {/* ── PRACTICE ── */}
          {screen==="practice" && practiceMod && (
            <PracticeView module={practiceMod} onXP={bonus=>{ saveXP(xp+bonus); saveStreak(streak+1); notify(`+${bonus} ${tr.xp} ${tr.aiBonus}`); }} />
          )}
        </div>
      </div>
    </SettingsCtx.Provider>
  );
}
