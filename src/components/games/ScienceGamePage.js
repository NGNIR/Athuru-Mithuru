import React, { useState, useEffect } from 'react';

const ScienceGamePage = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [responses, setResponses] = useState([]);

  // Game data for each level
  const gameData = {
    1: [
      { letter1: 'a', letter2: 'a', correct: 'Similar', description: 'එකම අකුරු' },
      { letter1: 'm', letter2: 'n', correct: 'Different', description: 'වෙනස් අකුරු' },
      { letter1: 'c', letter2: 'c', correct: 'Similar', description: 'එකම අකුරු' },
      { letter1: 'o', letter2: 'a', correct: 'Different', description: 'වෙනස් අකුරු' },
      { letter1: 'e', letter2: 'e', correct: 'Similar', description: 'එකම අකුරු' },
      { letter1: 'i', letter2: 'l', correct: 'Different', description: 'වෙනස් අකුරු' },
      { letter1: 's', letter2: 's', correct: 'Similar', description: 'එකම අකුරු' },
      { letter1: 'f', letter2: 't', correct: 'Different', description: 'වෙනස් අකුරු' }
    ],
    2: [
      { letter1: 'b', letter2: 'd', correct: 'Different', description: 'ප්‍රතිලෝම අකුරු' },
      { letter1: 'p', letter2: 'q', correct: 'Different', description: 'ප්‍රතිලෝම අකුරු' },
      { letter1: 'n', letter2: 'u', correct: 'Different', description: 'ප්‍රතිලෝම අකුරු' },
      { letter1: 'w', letter2: 'm', correct: 'Different', description: 'ප්‍රතිලෝම අකුරු' },
      { letter1: 'b', letter2: 'b', correct: 'Similar', description: 'එකම අකුරු' },
      { letter1: 'd', letter2: 'd', correct: 'Similar', description: 'එකම අකුරු' },
      { letter1: 'p', letter2: 'p', correct: 'Similar', description: 'එකම අකුරු' },
      { letter1: 'q', letter2: 'q', correct: 'Similar', description: 'එකම අකුරු' }
    ],
    3: [
      { letter1: 'g', letter2: 'q', correct: 'Different', description: 'සමාන පෙනුමක් ඇති වෙනස් අකුරු' },
      { letter1: 'h', letter2: 'n', correct: 'Different', description: 'සමාන පෙනුමක් ඇති වෙනස් අකුරු' },
      { letter1: 'r', letter2: 'n', correct: 'Different', description: 'සමාන පෙනුමක් ඇති වෙනස් අකුරු' },
      { letter1: 'a', letter2: 'o', correct: 'Different', description: 'සමාන පෙනුමක් ඇති වෙනස් අකුරු' },
      { letter1: 'g', letter2: 'g', correct: 'Similar', description: 'එකම අකුරු' },
      { letter1: 'h', letter2: 'h', correct: 'Similar', description: 'එකම අකුරු' },
      { letter1: 'r', letter2: 'r', correct: 'Similar', description: 'එකම අකුරු' },
      { letter1: 'v', letter2: 'w', correct: 'Different', description: 'සමාන පෙනුමක් ඇති වෙනස් අකුරු' }
    ]
  };

  const currentQuestions = gameData[currentLevel];
  const totalQuestions = currentQuestions.length;

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
  }, [timeLeft, gameStarted, gameCompleted, showResult]);

  const handleTimeUp = () => {
    setResponses(prev => [...prev, {
      question: currentQuestion,
      userAnswer: null,
      correct: currentQuestions[currentQuestion].correct,
      timeTaken: 10,
      isCorrect: false
    }]);
    nextQuestion();
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setResponses([]);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(10);
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer || showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === currentQuestions[currentQuestion].correct;
    const timeTaken = 10 - timeLeft;
    
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
      setTimeLeft(10);
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
      setTimeLeft(10);
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
    setTimeLeft(10);
  };

  const getLevelDescription = (level) => {
    const descriptions = {
      1: 'මූලික දෘශ්‍ය වෙනස්කම් හඳුනාගැනීම',
      2: 'සාමාන්‍ය ඩිස්ලෙක්සික් ව්‍යාකූලතා',
      3: 'උසස් දෘශ්‍ය වෙනස්කම් හඳුනාගැනීම'
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
      analysis = 'විශිෂ්ට! දෘශ්‍ය වෙනස්කම් හඳුනාගැනීමේ හැකියාව ඉතා හොඳයි.';
    } else if (accuracy >= 60) {
      analysis = 'හොඳයි! තව ටිකක් අභ්‍යාස කිරීමෙන් වැඩිදියුණු කළ හැක.';
    } else {
      analysis = 'අවධානය අවශ්‍යයි. දෘශ්‍ය වෙනස්කම් හඳුනාගැනීමේ අභ්‍යාස අවශ්‍ය විය හැක.';
    }
    
    return { accuracy, averageTime, analysis };
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-900 via-yellow-700 to-yellow-500 flex items-center justify-center p-4">
        <div className="text-center text-white max-w-2xl">
          <div className="text-8xl mb-8">🧠</div>
          <h1 className="text-5xl font-bold mb-8">දෘශ්‍ය වෙනස්කම් ක්‍රීඩාව</h1>
          <p className="text-2xl mb-8">අකුරු වල සමානකම් සහ වෙනස්කම් හඳුනාගන්න</p>
          
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
                <div className="text-2xl font-bold">10 තත්පර</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-sm opacity-80">මට්ටම</div>
                <div className="text-2xl font-bold">{currentLevel}/3</div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">ක්‍රීඩා නියම</h3>
              <ul className="text-left space-y-2 max-w-md mx-auto">
                <li>• දෙ අකුරු සමාන ද වෙනස් ද යන්න තීරණය කරන්න</li>
                <li>• ප්‍රශ්නයකට තත්පර 10ක් ලැබේ</li>
                <li>• "සමාන" හෝ "වෙනස්" තෝරන්න</li>
                <li>• සියලු ප්‍රශ්න සම්පූර්ණ කර ඊළඟ මට්ටමට යන්න</li>
              </ul>
            </div>
            
            <button
              onClick={startGame}
              className="bg-white text-yellow-600 px-8 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg"
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
      <div className="min-h-screen bg-gradient-to-b from-yellow-900 via-yellow-700 to-yellow-500 flex items-center justify-center p-4">
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
                className="bg-white text-yellow-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors duration-300"
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
    <div className="min-h-screen bg-gradient-to-b from-yellow-900 via-yellow-700 to-yellow-500 flex items-center justify-center p-4">
      <div className="text-center text-white max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-left">
            <div className="text-lg font-bold">මට්ටම {currentLevel}</div>
            <div className="text-sm opacity-80">ප්‍රශ්නය {currentQuestion + 1}/{totalQuestions}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">ලකුණු: {score}</div>
            <div className={`text-2xl font-bold ${timeLeft <= 3 ? 'text-red-300 animate-pulse' : ''}`}>
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
          <h2 className="text-2xl font-bold mb-8">මෙම අකුරු සමාන ද වෙනස් ද?</h2>
          
          {/* Letters Display */}
          <div className="flex justify-center items-center gap-12 mb-8">
            <div className="bg-white rounded-2xl w-32 h-32 flex items-center justify-center shadow-2xl">
              <span className="text-8xl font-bold text-gray-800">{currentQ.letter1}</span>
            </div>
            
            <div className="text-4xl font-bold">VS</div>
            
            <div className="bg-white rounded-2xl w-32 h-32 flex items-center justify-center shadow-2xl">
              <span className="text-8xl font-bold text-gray-800">{currentQ.letter2}</span>
            </div>
          </div>

          {/* Answer Buttons */}
          <div className="flex gap-6 justify-center">
            <button
              onClick={() => handleAnswer('Similar')}
              disabled={selectedAnswer || showResult}
              className={`px-8 py-4 rounded-full font-bold text-xl transition-all duration-300 shadow-lg ${
                showResult && currentQ.correct === 'Similar'
                  ? 'bg-green-500 text-white'
                  : showResult && selectedAnswer === 'Similar' && currentQ.correct !== 'Similar'
                  ? 'bg-red-500 text-white'
                  : selectedAnswer === 'Similar'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-yellow-600 hover:bg-gray-100'
              } ${selectedAnswer || showResult ? 'cursor-not-allowed' : 'hover:scale-105'}`}
            >
              සමාන
            </button>
            
            <button
              onClick={() => handleAnswer('Different')}
              disabled={selectedAnswer || showResult}
              className={`px-8 py-4 rounded-full font-bold text-xl transition-all duration-300 shadow-lg ${
                showResult && currentQ.correct === 'Different'
                  ? 'bg-green-500 text-white'
                  : showResult && selectedAnswer === 'Different' && currentQ.correct !== 'Different'
                  ? 'bg-red-500 text-white'
                  : selectedAnswer === 'Different'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-yellow-600 hover:bg-gray-100'
              } ${selectedAnswer || showResult ? 'cursor-not-allowed' : 'hover:scale-105'}`}
            >
              වෙනස්
            </button>
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
                නිවැරදි පිළිතුර: <span className="font-bold">{currentQ.correct}</span>
              </div>
              <div className="text-sm opacity-80 mt-2">{currentQ.description}</div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="text-sm opacity-80">
          අකුරු දෙක සමාන නම් "සමාන" ද, වෙනස් නම් "වෙනස්" ද තෝරන්න
        </div>
      </div>
    </div>
  );
};

export default ScienceGamePage;