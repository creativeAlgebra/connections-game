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
      setMessage("One away");
      setMistakes(mistakes + 1);
    } else {
      setMessage("Not quite");
      setMistakes(mistakes + 1);
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
    <div className="min-h-screen bg-slate-950 p-4 md:p-6 flex items-center justify-center" style={{ fontFamily: '"Source Sans Pro", sans-serif' }}>
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900 }}>Structure Your Thinking</h1>
          <p className="text-slate-400 text-xs md:text-sm">Find the four groups of four. Refine your methodology.</p>
        </div>

        {/* Game Grid */}
        <div className="mb-6">
          {/* Unsolved Terms Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-2 mb-4">
            {shuffledTerms.map((item, idx) => {
              const isSolved = solved.includes(item.categoryIdx);
              const isSelected = selected.includes(idx);

              if (isSolved) return <div key={idx} className="hidden" />;

              return (
                <button
                  key={idx}
                  onClick={() => toggleSelect(idx)}
                  disabled={isSolved}
                  className={`p-3 md:p-4 rounded font-bold text-xs md:text-sm transition-all ${
                    isSelected
                      ? 'bg-slate-300 text-slate-900 scale-95 shadow-lg'
                      : 'bg-slate-700 text-slate-100 hover:bg-slate-600'
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
                <div key={idx} className={`${color} p-3 md:p-4 rounded text-white`}>
                  <h3 className="font-bold text-xs md:text-sm">{cat.name}</h3>
                  <p className="text-xs opacity-90 mt-1">{cat.description}</p>
                  <div className="text-xs opacity-75 mt-2 flex flex-wrap gap-1">
                    {cat.terms.map(term => (
                      <span key={term} className="bg-black bg-opacity-30 px-2 py-1 rounded text-xs">
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
        <div className="flex flex-col md:flex-row gap-2 justify-between items-stretch md:items-center mb-4">
          <div className="flex gap-2">
            <button
              onClick={handleShuffle}
              className="flex items-center justify-center gap-2 px-3 py-2 md:py-2 bg-slate-700 text-white text-xs md:text-sm rounded hover:bg-slate-600 transition flex-1 md:flex-none"
            >
              <Shuffle size={16} /> Shuffle
            </button>
            <button
              onClick={() => setSelected([])}
              className="px-3 py-2 md:py-2 bg-slate-700 text-white text-xs md:text-sm rounded hover:bg-slate-600 transition flex-1 md:flex-none"
            >
              Clear
            </button>
          </div>
          <button
            onClick={checkSubmission}
            disabled={selected.length !== 4}
            className="px-6 py-2 md:py-2 bg-slate-200 text-slate-900 font-bold text-sm md:text-base rounded hover:bg-white disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed transition"
          >
            Submit
          </button>
        </div>

        {/* Message & Mistakes */}
        <div className="flex justify-between items-center mb-6">
          {message && (
            <div className={`font-bold ${
              message === "✓" ? 'text-green-400' : 'text-slate-400'
            }`}>
              {message}
            </div>
          )}
          <div className="text-slate-500 text-sm">
            Mistakes remaining: <span className="font-bold">{4 - mistakes}</span>
          </div>
        </div>

        {/* Win State */}
        {gameWon && (
          <div className="bg-slate-800 border border-slate-700 p-6 rounded text-center mb-4">
            <h2 className="text-xl font-bold text-white mb-2">You've mapped the structure.</h2>
            <p className="text-slate-300 text-sm mb-4">These four dimensions work together: How you organize thinking determines what AI can learn from you. Better structure = better thought partnership.</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => initializeGame()}
                className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition text-sm font-bold"
              >
                Play Again
              </button>
              <button
                onClick={() => setCurrentPuzzle((currentPuzzle + 1) % puzzles.length)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-bold"
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
