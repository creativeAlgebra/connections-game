# Complete Project Files

Create these files in your GitHub repo in this exact structure:

---

## **File 1: `package.json`**
(Create new file in repo root)

```json
{
  "name": "connections-game",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1"
  },
  "scripts": {
    "dev": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "react-scripts": "5.0.1"
  }
}
```

---

## **File 2: `public/index.html`**
(Create folder `public` first, then create `index.html` inside)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Structure Your Thinking - Connections game for cognitive systems design"
    />
    <title>Connections Game</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

---

## **File 3: `src/index.js`**
(Create folder `src` first, then create `index.js` inside)

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## **File 4: `src/App.jsx`**
(This is your React component - paste the entire game code here)

```jsx
import React, { useState, useEffect } from 'react';
import { Shuffle, RotateCcw } from 'lucide-react';

const ConnectionsGame = () => {
  const puzzles = [
    {
      id: 1,
      categories: [
        {
          name: "STRUCTURES FOR THINKING",
          description: "Ways to organize thought so it becomes transferable and learnable",
          terms: ["TAXONOMY", "FRAMEWORK", "SCHEMA", "SYSTEM"],
        },
        {
          name: "PROBLEM RECOGNITION",
          description: "Identifying what's actually being asked beneath surface requests",
          terms: ["CONSTRAINT", "PATTERN", "TENSION", "ASSUMPTION"],
        },
        {
          name: "CREATIVE CONSTRAINT",
          description: "Limitations that force innovation and clarity",
          terms: ["SCOPE", "VOICE", "BRAND", "BRIEF"],
        },
        {
          name: "KNOWLEDGE ARTIFACTS",
          description: "What emerges when thinking is structured well",
          terms: ["NARRATIVE", "BLUEPRINT", "PROMPT", "DATASET"],
        }
      ]
    },
    {
      id: 2,
      categories: [
        {
          name: "AI COLLABORATION INPUTS",
          description: "What you need to give AI for it to think like you",
          terms: ["EXAMPLE", "PRINCIPLE", "CONTEXT", "VOICE"],
        },
        {
          name: "POSITIONING TOOLS",
          description: "Methods for clarifying what makes something distinct",
          terms: ["CONTRAST", "ATTRIBUTE", "ARCHETYPE", "STORY"],
        },
        {
          name: "WORKFLOW FRICTION POINTS",
          description: "Where human time gets wasted before AI can help",
          terms: ["REVIEW", "VARIATION", "CONSISTENCY", "TRANSLATION"],
        },
        {
          name: "THINKING OUTPUTS",
          description: "Deliverables that prove clarity has been achieved",
          terms: ["GUIDELINES", "RUBRIC", "TEMPLATE", "SYSTEM"],
        }
      ]
    },
    {
      id: 3,
      categories: [
        {
          name: "INFORMATION LAYERS",
          description: "How to structure complex knowledge hierarchically",
          terms: ["CATEGORY", "RELATIONSHIP", "METADATA", "HIERARCHY"],
        },
        {
          name: "STRATEGIC QUESTIONS",
          description: "The meta-cognitive prompts that unlock better thinking",
          terms: ["WHO", "CONSTRAINT", "DIFFERENCE", "OUTCOME"],
        },
        {
          name: "EXECUTION DISCIPLINES",
          description: "Practices that translate thinking into reliable systems",
          terms: ["ITERATION", "FEEDBACK", "DOCUMENTATION", "TESTING"],
        },
        {
          name: "MIRROR BUILDING",
          description: "Components needed for AI to reflect your actual thinking",
          terms: ["PREFERENCE", "PATTERN", "EXCEPTION", "EVOLUTION"],
        }
      ]
    }
  ];

  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [shuffledTerms, setShuffledTerms] = useState([]);
  const [selected, setSelected] = useState([]);
  const [solved, setSolved] = useState([]);
  const [message, setMessage] = useState("");
  const [gameWon, setGameWon] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [currentPuzzle]);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&family=Source+Sans+Pro:wght@400;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const initializeGame = () => {
    const puzzle = puzzles[currentPuzzle];
    const allTerms = puzzle.categories.flatMap((cat, catIdx) => 
      cat.terms.map(term => ({ term, categoryIdx: catIdx }))
    );
    
    const shuffled = [...allTerms].sort(() => Math.random() - 0.5);
    setShuffledTerms(shuffled);
    setSelected([]);
    setSolved([]);
    setMessage("");
    setGameWon(false);
    setMistakes(0);
    setHintUsed(false);
  };

  const toggleSelect = (index) => {
    if (solved.some(s => shuffledTerms[index].categoryIdx === s)) return;
    
    if (selected.includes(index)) {
      setSelected(selected.filter(i => i !== index));
    } else if (selected.length < 4) {
      setSelected([...selected, index]);
    }
  };

  const checkSubmission = () => {
    if (selected.length !== 4) return;

    const categoryIndices = new Set(selected.map(i => shuffledTerms[i].categoryIdx));
    
    if (categoryIndices.size === 1) {
      const categoryIdx = Array.from(categoryIndices)[0];
      const newSolved = [...solved, categoryIdx];
      setSolved(newSolved);
      setSelected([]);
      setMessage("✓");
      
      if (newSolved.length === 4) {
        setGameWon(true);
      }
    } else if (categoryIndices.size === 2) {
      if (mistakes >= 3) {
        // At 0 mistakes remaining, reveal a hint (one unsolved category)
        const unsolvedCategories = puzzle.categories
          .map((_, idx) => idx)
          .filter(idx => !solved.includes(idx));
        
        if (unsolvedCategories.length > 0) {
          const randomHintIdx = unsolvedCategories[Math.floor(Math.random() * unsolvedCategories.length)];
          const newSolved = [...solved, randomHintIdx];
          setSolved(newSolved);
          setSelected([]);
          setMessage("💡 Hint revealed!");
        }
      } else {
        setMessage("One away");
        setMistakes(mistakes + 1);
      }
    } else {
      if (mistakes >= 3) {
        // At 0 mistakes remaining, reveal a hint (one unsolved category)
        const unsolvedCategories = puzzle.categories
          .map((_, idx) => idx)
          .filter(idx => !solved.includes(idx));
        
        if (unsolvedCategories.length > 0) {
          const randomHintIdx = unsolvedCategories[Math.floor(Math.random() * unsolvedCategories.length)];
          const newSolved = [...solved, randomHintIdx];
          setSolved(newSolved);
          setSelected([]);
          setMessage("💡 Hint revealed!");
        }
      } else {
        setMessage("Not quite");
        setMistakes(mistakes + 1);
      }
    }

    setTimeout(() => setMessage(""), 2000);
  };

  const handleShuffle = () => {
    const shuffled = [...shuffledTerms].sort(() => Math.random() - 0.5);
    setShuffledTerms(shuffled);
  };

  const puzzle = puzzles[currentPuzzle];
  const categoryColors = ["bg-blue-600", "bg-green-600", "bg-yellow-600", "bg-purple-600"];

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 flex items-center justify-center" style={{ fontFamily: '"Source Sans Pro", sans-serif' }}>
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>Structure Your Thinking</h1>
          <p className="text-slate-600 text-xs md:text-sm">Find the four groups. Refine your methodology.</p>
        </div>

        {/* Game Grid */}
        <div className="mb-6">
          {/* Unsolved Terms Grid */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {shuffledTerms.map((item, idx) => {
              const isSolved = solved.includes(item.categoryIdx);
              const isSelected = selected.includes(idx);

              if (isSolved) return <div key={idx} className="hidden" />;

              return (
                <button
                  key={idx}
                  onClick={() => toggleSelect(idx)}
                  disabled={isSolved}
                  className={`p-2 md:p-4 rounded-lg font-bold text-xs sm:text-sm md:text-base transition-all leading-tight ${
                    isSelected
                      ? 'bg-slate-900 text-white scale-95 shadow-lg border-2 border-slate-900'
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200 border-2 border-slate-200'
                  }`}
                >
                  {item.term}
                </button>
              );
            })}
          </div>

          {/* Solved Categories (stacked) */}
          <div className="space-y-2 mb-4 md:mb-6">
            {puzzle.categories.map((cat, idx) => {
              if (!solved.includes(idx)) return null;
              const color = categoryColors[idx];
              return (
                <div key={idx} className={`${color} p-4 md:p-5 rounded-lg text-white`}>
                  <h3 className="font-bold text-xs md:text-sm">{cat.name}</h3>
                  <p className="text-xs opacity-90 mt-2">{cat.description}</p>
                  <div className="text-xs opacity-90 mt-3 flex flex-wrap gap-2">
                    {cat.terms.map(term => (
                      <span key={term} className="bg-white bg-opacity-20 px-3 py-1 rounded text-xs">
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center mb-4">
          <div className="flex gap-2">
            <button
              onClick={handleShuffle}
              className="flex items-center justify-center gap-2 px-4 py-3 md:py-2 bg-slate-700 text-white text-xs md:text-sm rounded-lg hover:bg-slate-800 transition flex-1 md:flex-none font-semibold"
            >
              <Shuffle size={16} /> Shuffle
            </button>
            <button
              onClick={() => setSelected([])}
              className="px-4 py-3 md:py-2 bg-slate-700 text-white text-xs md:text-sm rounded-lg hover:bg-slate-800 transition flex-1 md:flex-none font-semibold"
            >
              Reset
            </button>
          </div>
          <button
            onClick={checkSubmission}
            disabled={selected.length !== 4}
            className="px-8 py-3 md:py-2 bg-green-600 text-white font-bold text-sm md:text-base rounded-lg hover:bg-green-700 disabled:bg-slate-400 disabled:text-slate-200 disabled:cursor-not-allowed transition"
          >
            SUBMIT
          </button>
        </div>

        {/* Message & Mistakes */}
        <div className="flex justify-between items-center mb-6">
          {message && (
            <div className={`font-bold text-sm ${
              message === "✓" ? 'text-green-600' : 'text-slate-600'
            }`}>
              {message}
            </div>
          )}
          <div className="text-slate-600 text-sm">
            Mistakes remaining: <span className="font-bold">{4 - mistakes}</span>
          </div>
        </div>

        {/* Win State */}
        {gameWon && (
          <div className="bg-slate-100 border-2 border-slate-300 p-6 rounded-lg text-center mb-4">
            <h2 className="text-xl font-bold text-slate-900 mb-2">You've mapped the structure.</h2>
            <p className="text-slate-700 text-sm mb-4">These four dimensions work together: How you organize thinking determines what AI can learn from you. Better structure = better thought partnership.</p>
            <div className="flex gap-2 justify-center flex-col md:flex-row">
              <button
                onClick={() => initializeGame()}
                className="px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition text-sm font-bold"
              >
                Play Again
              </button>
              <button
                onClick={() => setCurrentPuzzle((currentPuzzle + 1) % puzzles.length)}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-bold"
              >
                Next Puzzle
              </button>
            </div>
          </div>
        )}

        {/* Puzzle Indicator */}
        <div className="text-center text-slate-500 text-xs">
          Puzzle {currentPuzzle + 1} of {puzzles.length}
        </div>
      </div>
    </div>
  );
};

export default ConnectionsGame;
```

---

## **File 5: `.gitignore`**
(Create in repo root)

```
node_modules/
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
build/
dist/
.DS_Store
```

---

## **File 6: `README.md`**
(Update the existing one)

```markdown
# Connections Game

An interactive puzzle game for understanding cognitive systems design and AI collaboration frameworks.

## How to Play

Find the four groups of connected terms. Each group represents a thinking framework or methodology.

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to vercel.com
3. Click "New Project"
4. Select this repository
5. Click "Deploy"

That's it. Vercel handles the rest.

## Local Development

```bash
npm install
npm start
```

Your app will run on `http://localhost:3000`
```

---

## **How to Add These Files to GitHub**

1. Go to your `connections-game` repo on GitHub
2. Click "Add file" → "Create new file"
3. For each file above:
   - Copy the file path (e.g., `package.json`)
   - Paste the code
   - Click "Commit changes"

**Order matters:**
- `package.json` (root level)
- `public/index.html` (in public folder)
- `src/index.js` (in src folder)
- `src/App.jsx` (in src folder)
- `.gitignore` (root level)
- `README.md` (root level)

---

## **Then Deploy to Vercel**

1. Go to vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Select `connections-game`
5. Click "Deploy"

Vercel will automatically detect it's a React app, install dependencies, build it, and deploy it.

Done.
