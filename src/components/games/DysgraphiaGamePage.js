import React, { useState, useEffect } from 'react';

const DysgraphiaGamePage = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [responses, setResponses] = useState([]);

  // Game data for each level - Handwriting and letter formation exercises
  const gameData = {
    1: [
      { 
        instruction: 'නිවැරදි අකුර තෝරන්න', 
        target: 'අ', 
        options: ['අ', 'ආ', 'ඇ', 'ඈ'], 
        correct: 'අ',
        description: 'මූලික සිංහල ස්වර අකුරු හඳුනාගැනීම'
      },
      { 
        instruction: 'නිවැරදි අකුර තෝරන්න', 
        target: 'ක', 
        options: ['ක', 'ඛ', 'ග', 'ඝ'], 
        correct: 'ක',
        description: 'මූලික සිංහල ව්‍යාංජන අකුරු හඳුනාගැනීම'
      },
      { 
        instruction: 'නිවැරදි අකුර තෝරන්න', 
        target: 'ම', 
        options: ['ම', 'ය', 'ර', 'ල'], 
        correct: 'ම',
        description: 'සමාන පෙනුමක් ඇති අකුරු වෙන්කර හඳුනාගැනීම'
      },
      { 
        instruction: 'නිවැරදි අකුර තෝරන්න', 
        target: 'ස', 
        options: ['ස', 'හ', 'ළ', 'ෆ'], 
        correct: 'ස',
        description: 'සංකීර්ණ හැඩයක් ඇති අකුරු හඳුනාගැනීම'
      },
      { 
        instruction: 'නිවැරදි අකුර තෝරන්න', 
        target: 'ට', 
        options: ['ට', 'ඨ', 'ඩ', 'ඪ'], 
        correct: 'ට',
        description: 'ටකාර වර්ගයේ අකුරු හඳුනාගැනීම'
      },
      { 
        instruction: 'නිවැරදි අකුර තෝරන්න', 
        target: 'න', 
        options: ['න', 'ණ', 'ඳ', 'ධ'], 
        correct: 'න',
        description: 'නකාර වර්ගයේ අකුරු හඳුනාගැනීම'
      }
    ],
    2: [
      { 
        instruction: 'නිවැරදි පිල්ලම් සහිත අකුර තෝරන්න', 
        target: 'කා', 
        options: ['කා', 'කැ', 'කෑ', 'කි'], 
        correct: 'කා',
        description: 'ආකාර පිල්ලම සහිත අකුරු'
      },
      { 
        instruction: 'නිවැරදි පිල්ලම් සහිත අකුර තෝරන්න', 
        target: 'මේ', 
        options: ['මේ', 'මො', 'මෝ', 'මු'], 
        correct: 'මේ',
        description: 'ඒකාර පිල්ලම සහිත අකුරු'
      },
      { 
        instruction: 'නිවැරදි පිල්ලම් සහිත අකුර තෝරන්න', 
        target: 'සි', 
        options: ['සි', 'සී', 'සු', 'සූ'], 
        correct: 'සි',
        description: 'ඉකාර පිල්ලම සහිත අකුරු'
      },
      { 
        instruction: 'නිවැරදි පිල්ලම් සහිත අකුර තෝරන්න', 
        target: 'තු', 
        options: ['තු', 'තූ', 'තෙ', 'තො'], 
        correct: 'තු',
        description: 'උකාර පිල්ලම සහිත අකුරු'
      },
      { 
        instruction: 'නිවැරදි පිල්ලම් සහිත අකුර තෝරන්න', 
        target: 'රෙ', 
        options: ['රෙ', 'රේ', 'රො', 'රෝ'], 
        correct: 'රෙ',
        description: 'එකාර පිල්ලම සහිත අකුරු'
      },
      { 
        instruction: 'නිවැරදි පිල්ලම් සහිත අකුර තෝරන්න', 
        target: 'ලෝ', 
        options: ['ලෝ', 'ලො', 'ලූ', 'ලු'], 
        correct: 'ලෝ',
        description: 'ඕකාර පිල්ලම සහිත අකුරු'
      }
    ],
    3: [
      { 
        instruction: 'නිවැරදි සංයුක්ත අකුර තෝරන්න', 
        target: 'ක්‍ර', 
        options: ['ක්‍ර', 'ක්‍ල', 'ග්‍ර', 'ත්‍ර'], 
        correct: 'ක්‍ර',
        description: 'රේඵ සහිත සංයුක්ත අකුරු'
      },
      { 
        instruction: 'නිවැරදි සංයුක්ත අකුර තෝරන්න', 
        target: 'ප්‍ර', 
        options: ['ප්‍ර', 'බ්‍ර', 'ප්‍ල', 'ම්‍ර'], 
        correct: 'ප්‍ර',
        description: 'පකාර රේඵ සහිත අකුරු'
      },
      { 
        instruction: 'නිවැරදි සංයුක්ත අකුර තෝරන්න', 
        target: 'ස්‍ථ', 
        options: ['ස්‍ථ', 'ස්‍ත', 'ශ්‍ථ', 'ෂ්‍ඨ'], 
        correct: 'ස්‍ථ',
        description: 'සකාර සංයුක්ත අකුරු'
      },
      { 
        instruction: 'නිවැරදි සංයුක්ත අකුර තෝරන්න', 
        target: 'න්‍ද', 
        options: ['න්‍ද', 'ඳ්‍ද', 'ද්‍ද', 'ත්‍ද'], 
        correct: 'න්‍ද',
        description: 'නකාර සංයුක්ත අකුරු'
      },
      { 
        instruction: 'නිවැරදි සංයුක්ත අකුර තෝරන්න', 
        target: 'ක්‍ෂ', 
        options: ['ක්‍ෂ', 'ඛ්‍ෂ', 'ග්‍ෂ', 'ච්‍ෂ'], 
        correct: 'ක්‍ෂ',
        description: 'ක්ෂකාර සංයුක්ත අකුරු'
      },
      { 
        instruction: 'නිවැරදි සංයුක්ත අකුර තෝරන්න', 
        target: 'ශ්‍ර', 
        options: ['ශ්‍ර', 'ෂ්‍ර', 'ස්‍ර', 'හ්‍ර'], 
        correct: 'ශ්‍ර',
        description: 'ශකාර රේඵ සහිත අකුරු'
      }
    ]
  };

  const currentQuestions = gameData[currentLevel];
  const totalQuestions = currentQuestions.length;

  // Define handleTimeUp function before useEffect
  const handleTimeUp = () => {
    setResponses(prev => [...prev, {
      question: currentQuestion,
      userAnswer: null,
      correct: currentQuestions[currentQuestion].correct,
      timeTaken: 15,
      isCorrect: false
    }]);
    nextQuestion();
  };

  // Timer effect
  useEffect(() => {
    if (gameStarted && !gameCompleted && !showResult && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, gameStarted, gameCompleted, showResult, handleTimeUp]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setResponses([]);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(15);
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer || showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === currentQuestions[currentQuestion].correct;
    const timeTaken = 15 - timeLeft;
    
    setResponses(prev => [...prev, {
      question: currentQuestion,
      userAnswer: answer,
      correct: currentQuestions[currentQuestion].correct,
      timeTaken: timeTaken,
      isCorrect: isCorrect
    }]);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(15);
    } else {
      completeLevel();
    }
  };

  const completeLevel = () => {
    setGameCompleted(true);
  };

  const nextLevel = () => {
    if (currentLevel < 3) {
      setCurrentLevel(currentLevel + 1);
      setGameStarted(false);
      setGameCompleted(false);
      setCurrentQuestion(0);
      setScore(0);
      setResponses([]);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(15);
    }
  };

  const restartGame = () => {
    setCurrentLevel(1);
    setGameStarted(false);
    setGameCompleted(false);
    setCurrentQuestion(0);
    setScore(0);
    setResponses([]);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(15);
  };

  const getLevelDescription = (level) => {
    const descriptions = {
      1: 'මූලික සිංහල අකුරු හඳුනාගැනීම',
      2: 'පිල්ලම් සහිත අකුරු හඳුනාගැනීම',
      3: 'සංයුක්ත අකුරු හඳුනාගැනීම'
    };
    return descriptions[level];
  };

  const getPerformanceAnalysis = () => {
    const totalResponses = responses.length;
    const correctResponses = responses.filter(r => r.isCorrect).length;
    const averageTime = responses.reduce((sum, r) => sum + r.timeTaken, 0) / totalResponses;
    const accuracy = (correctResponses / totalResponses) * 100;
    
    let analysis = '';
    if (accuracy >= 80) {
      analysis = 'විශිෂ්ට! අකුරු හඳුනාගැනීමේ හැකියාව ඉතා හොඳයි.';
    } else if (accuracy >= 60) {
      analysis = 'හොඳයි! තව ටිකක් අභ්‍යාස කිරීමෙන් වැඩිදියුණු කළ හැක.';
    } else {
      analysis = 'අවධානය අවශ්‍යයි. අකුරු හඳුනාගැනීමේ අභ්‍යාස අවශ්‍ය විය හැක.';
    }
    
    return { accuracy, averageTime, analysis };
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-700 to-purple-500 flex items-center justify-center p-4">
        <div className="text-center text-white max-w-2xl">
          <div className="text-8xl mb-8">✍️</div>
          <h1 className="text-5xl font-bold mb-8">අකුරු ලේඛන ක්‍රීඩාව</h1>
          <p className="text-2xl mb-8">සිංහල අකුරු නිවැරදිව හඳුනාගන්න</p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">මට්ටම {currentLevel}</h2>
            <p className="text-xl mb-6">{getLevelDescription(currentLevel)}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-sm opacity-80">ප්‍රශ්න ගණන</div>
                <div className="text-2xl font-bold">{totalQuestions}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-sm opacity-80">කාලය (ප්‍රශ්නයකට)</div>
                <div className="text-2xl font-bold">15 තත්පර</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-sm opacity-80">මට්ටම</div>
                <div className="text-2xl font-bold">{currentLevel}/3</div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">ක්‍රීඩා නියම</h3>
              <ul className="text-left space-y-2 max-w-md mx-auto">
                <li>• ලබා දී ඇති අකුරට සමාන අකුර තෝරන්න</li>
                <li>• ප්‍රශ්නයකට තත්පර 15ක් ලැබේ</li>
                <li>• නිවැරදි අකුර ක්ලික් කරන්න</li>
                <li>• සියලු ප්‍රශ්න සම්පූර්ණ කර ඊළඟ මට්ටමට යන්න</li>
              </ul>
            </div>
            
            <button
              onClick={startGame}
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              ක්‍රීඩාව ආරම්භ කරන්න
            </button>
          </div>
          
          <button
            onClick={onBack}
            className="bg-white/20 text-white px-6 py-3 rounded-full font-bold hover:bg-white/30 transition-colors duration-300"
          >
            ← ආපසු යන්න
          </button>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    const analysis = getPerformanceAnalysis();
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-700 to-purple-500 flex items-center justify-center p-4">
        {/* Stars Background Container */}
        <div className="absolute inset-4 border-2 border-white/20 rounded-lg overflow-hidden pointer-events-none">
          <div className="absolute inset-0">
            {[...Array(150)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-pulse cursor-pointer pointer-events-auto hover:scale-150 transition-transform duration-200"
                style={{
                  width: Math.random() * 4 + 2 + 'px',
                  height: Math.random() * 4 + 2 + 'px',
                  top: Math.random() * 90 + 5 + '%',
                  left: Math.random() * 90 + 5 + '%',
                  animationDelay: Math.random() * 3 + 's',
                  animationDuration: Math.random() * 2 + 2 + 's',
                  opacity: Math.random() * 0.8 + 0.3
                }}
                onClick={() => {
                  // Star click effect
                  const star = document.createElement('div');
                  star.innerHTML = '✨';
                  star.style.position = 'absolute';
                  star.style.fontSize = '20px';
                  star.style.pointerEvents = 'none';
                  star.style.zIndex = '1000';
                  star.style.animation = 'starPop 1s ease-out forwards';
                  document.body.appendChild(star);
                  
                  const rect = e.currentTarget.getBoundingClientRect();
                  star.style.left = rect.left + 'px';
                  star.style.top = rect.top + 'px';
                  
                  setTimeout(() => {
                    document.body.removeChild(star);
                  }, 1000);
                }}
              />
            ))}
          </div>
        </div>

        <div className="text-center text-white max-w-2xl">
          <div className="text-8xl mb-8">🎉</div>
          <h1 className="text-5xl font-bold mb-8">මට්ටම {currentLevel} සම්පූර්ණයි!</h1>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-sm opacity-80">ලකුණු</div>
                <div className="text-3xl font-bold">{score}/{totalQuestions}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-sm opacity-80">නිරවද්‍යතාව</div>
                <div className="text-3xl font-bold">{analysis.accuracy.toFixed(1)}%</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-sm opacity-80">සාමාන්‍ය කාලය</div>
                <div className="text-3xl font-bold">{analysis.averageTime.toFixed(1)}s</div>
              </div>
            </div>
            
            <div className="mb-6 p-4 bg-white/10 rounded-lg">
              <h3 className="text-xl font-bold mb-3">විශ්ලේෂණය</h3>
              <p className="text-lg">{analysis.analysis}</p>
            </div>
            
            <div className="flex gap-4 justify-center flex-wrap">
              {currentLevel < 3 && score >= totalQuestions * 0.6 && (
                <button
                  onClick={nextLevel}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold transition-colors duration-300"
                >
                  ඊළඟ මට්ටම →
                </button>
              )}
              
              <button
                onClick={restartGame}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition-colors duration-300"
              >
                නැවත ආරම්භ කරන්න
              </button>
              
              <button
                onClick={onBack}
                className="bg-white text-purple-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors duration-300"
              >
                ← ආපසු යන්න
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = currentQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-700 to-purple-500 flex items-center justify-center p-4">
      {/* Stars Background Container */}
      <div className="absolute inset-4 border-2 border-white/20 rounded-lg overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          {[...Array(150)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse cursor-pointer pointer-events-auto hover:scale-150 transition-transform duration-200"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                top: Math.random() * 90 + 5 + '%',
                left: Math.random() * 90 + 5 + '%',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: Math.random() * 2 + 2 + 's',
                opacity: Math.random() * 0.8 + 0.3
              }}
              onClick={(event) => {
                // Star click effect
                const star = document.createElement('div');
                star.innerHTML = '✨';
                star.style.position = 'absolute';
                star.style.fontSize = '20px';
                star.style.pointerEvents = 'none';
                star.style.zIndex = '1000';
                star.style.animation = 'starPop 1s ease-out forwards';
                document.body.appendChild(star);
                
                const rect = e.currentTarget.getBoundingClientRect();
                star.style.left = rect.left + 'px';
                star.style.top = rect.top + 'px';
                
                setTimeout(() => {
                  document.body.removeChild(star);
                }, 1000);
              }}
            />
          ))}
        </div>
      </div>


      <div className="text-center text-white max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-left">
            <div className="text-lg font-bold">මට්ටම {currentLevel}</div>
            <div className="text-sm opacity-80">ප්‍රශ්නය {currentQuestion + 1}/{totalQuestions}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">ලකුණු: {score}</div>
            <div className={`text-2xl font-bold ${timeLeft <= 5 ? 'text-red-300 animate-pulse' : ''}`}>
              ⏰ {timeLeft}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-3 mb-8">
          <div 
            className="bg-white h-3 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">{currentQ.instruction}</h2>
          
          {/* Target Letter Display */}
          <div className="mb-8">
            <div className="text-lg mb-4 opacity-80">මෙම අකුරට සමාන අකුර තෝරන්න:</div>
            <div className="bg-white rounded-2xl w-32 h-32 flex items-center justify-center shadow-2xl mx-auto">
              <span className="text-6xl font-bold text-gray-800">{currentQ.target}</span>
            </div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer || showResult}
                className={`w-24 h-24 rounded-xl font-bold text-3xl transition-all duration-300 shadow-lg ${
                  showResult && currentQ.correct === option
                    ? 'bg-green-500 text-white'
                    : showResult && selectedAnswer === option && currentQ.correct !== option
                    ? 'bg-red-500 text-white'
                    : selectedAnswer === option
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                } ${selectedAnswer || showResult ? 'cursor-not-allowed' : 'hover:scale-105'}`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Result Display */}
          {showResult && (
            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <div className={`text-xl font-bold mb-2 ${
                selectedAnswer === currentQ.correct ? 'text-green-300' : 'text-red-300'
              }`}>
                {selectedAnswer === currentQ.correct ? '✅ නිවැරදියි!' : '❌ වැරදියි!'}
              </div>
              <div className="text-lg">
                නිවැරදි පිළිතුර: <span className="font-bold text-2xl">{currentQ.correct}</span>
              </div>
              <div className="text-sm opacity-80 mt-2">{currentQ.description}</div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="text-sm opacity-80">
          ඉහත දක්වා ඇති අකුරට සමාන අකුර තෝරන්න
        </div>
      </div>
    </div>
  );
};

export default DysgraphiaGamePage;