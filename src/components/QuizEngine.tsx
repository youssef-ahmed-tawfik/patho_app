import React, { useState, useEffect } from 'react';
import { QuizQuestion, Flashcard } from '../types';
import { Award, CheckCircle, XCircle, ChevronRight, RotateCcw, AlertTriangle, ArrowLeft, Brain, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuizEngineProps {
  cards: Flashcard[];
  selectedCategory: string;
  isApiKeyConfigured: boolean;
  onBack: () => void;
}

export default function QuizEngine({ cards, selectedCategory, isApiKeyConfigured, onBack }: QuizEngineProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'offline' | 'ai'>('offline');
  const [quizFinished, setQuizFinished] = useState(false);

  // Filter cards for the category
  const filteredCards = cards.filter(
    c => selectedCategory === 'All Materials' || c.category === selectedCategory
  );

  // Core quiz constructor
  const startQuiz = (selectedMode: 'offline' | 'ai') => {
    setMode(selectedMode);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setError('');

    if (selectedMode === 'ai') {
      triggerAiQuiz();
    } else {
      generateOfflineQuiz();
    }
  };

  // Generate randomized offline questions from the flashcard curriculum
  const generateOfflineQuiz = () => {
    if (filteredCards.length < 3) {
      setError('Not enough flashcards in this deck to compose a quiz. Try selecting "All Materials".');
      return;
    }

    // Generate 4 randomized questions based on actual flashcards
    const shuffledCards = [...filteredCards].sort(() => 0.5 - Math.random());
    const sliceCount = Math.min(shuffledCards.length, 5);
    const quizSet: QuizQuestion[] = [];

    for (let i = 0; i < sliceCount; i++) {
      const card = shuffledCards[i];
      // Generate multiple choice options from other card answers
      const otherAnswers = filteredCards
        .filter(c => c.id !== card.id)
        .map(c => c.answer.replace(/[\*#\n-]/g, '').slice(0, 85) + '...')
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const correctAnswerClean = card.answer.replace(/[\*#\n-]/g, '').slice(0, 85) + '...';
      const options = [correctAnswerClean, ...otherAnswers].sort(() => 0.5 - Math.random());

      quizSet.push({
        id: `q_off_${card.id}`,
        question: `Based on your materials: ${card.question}`,
        options: options,
        correctAnswer: correctAnswerClean,
        explanation: `Answer from syllabus: ${card.answer}`
      });
    }

    setQuestions(quizSet);
  };

  // Pull dynamic clinical multi-choice test from Gemini server
  const triggerAiQuiz = async () => {
    if (!isApiKeyConfigured) {
      setError('Please configure your GEMINI_API_KEY secret to use AI Practice Exam.');
      return;
    }
    setIsLoading(true);

    try {
      // Send some cards for context or syllabus reference
      const cardsContext = filteredCards.slice(0, 8).map(c => ({
        question: c.question,
        answer: c.answer
      }));

      const res = await fetch('/api/gemini/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: selectedCategory, cardsContext })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Server error generating board test');
      }

      if (data.success && Array.isArray(data.quiz) && data.quiz.length > 0) {
        setQuestions(data.quiz);
      } else {
        throw new Error('Failed to parse board. No diagnostic questions generated.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to initialize Board simulation. Reverting to Offline Mode...');
      setMode('offline');
      setTimeout(() => generateOfflineQuiz(), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedAnswer(opt);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isAnswered) return;
    
    const isCorrect = selectedAnswer === questions[currentIndex].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  // Start offline mode by default
  useEffect(() => {
    if (filteredCards.length > 0) {
      generateOfflineQuiz();
    }
  }, [selectedCategory, cards]);

  const currentQ = questions[currentIndex];

  return (
    <div className="flex flex-col flex-1 p-6 space-y-6 bg-white selection:bg-indigo-100">
      
      {/* Quiz Top Action Bar */}
      <div className="flex justify-between items-center pb-3 border-b-2 border-slate-100">
        <button 
          onClick={onBack}
          className="p-1.5 px-3 bg-white border-2 border-slate-150 hover:bg-slate-50 text-slate-705 rounded-xl text-xs font-black flex items-center gap-1.5 active:scale-95 transition shadow-sm"
        >
          <ArrowLeft size={13} /> Return
        </button>

        <span className="text-[10px] font-black tracking-wider text-rose-705 bg-rose-50 border-2 border-rose-100 px-3 py-1 rounded-full uppercase shadow-sm">
          {selectedCategory}
        </span>
      </div>

      {/* Mode selectors */}
      <div className="grid grid-cols-2 gap-2.5 p-1 bg-slate-50 rounded-2xl border-2 border-slate-100 shadow-sm select-none">
        <button
          onClick={() => startQuiz('offline')}
          className={`py-2 text-xs font-black rounded-xl transition active:scale-95 flex items-center justify-center gap-1.5 ${
            mode === 'offline' && !quizFinished
              ? 'bg-indigo-650 text-white shadow-md'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
          }`}
        >
          <Brain size={12} /> Syllabus Quiz
        </button>
        <button
          onClick={() => startQuiz('ai')}
          className={`py-2 text-xs font-black rounded-xl transition active:scale-95 flex items-center justify-center gap-1.5 ${
            mode === 'ai' && !quizFinished
              ? 'bg-indigo-650 text-white shadow-md'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
          }`}
          disabled={filteredCards.length === 0}
        >
          <Sparkles size={12} /> AI Board Prep
        </button>
      </div>

      {/* API Key prompt inside quiz */}
      {mode === 'ai' && !isApiKeyConfigured && (
        <div className="text-xs bg-rose-50 border-2 border-rose-100 p-4 rounded-2xl text-rose-700 flex items-start gap-2 leading-relaxed font-semibold shadow-sm">
          <AlertCircle size={14} className="flex-shrink-0 mt-0.5 text-rose-550" />
          <span>Practice Exams require GEMINI_API_KEY. Set secrets via bottom left Settings gear.</span>
        </div>
      )}

      {/* Error reporting */}
      {error && (
        <div className="p-4 bg-rose-50 border-2 border-rose-100 rounded-2xl text-rose-700 text-xs flex items-start gap-2 font-semibold shadow-sm">
          <AlertTriangle size={15} className="flex-shrink-0 mt-0.5 text-rose-550" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading state indicator */}
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-16">
          <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="text-center">
            <h3 className="text-xs font-black text-slate-800">AI Board Simulator Booting...</h3>
            <p className="text-[10px] text-slate-500 max-w-xs mt-1.5 font-medium leading-relaxed">Creating challenging clinical diagnostic multiple-choice questions based on veterinary syllabus guidelines.</p>
          </div>
        </div>
      ) : quizFinished ? (
        /* SCORE BOARD / FINISHED SCREEN */
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 py-4 flex flex-col justify-between"
        >
          <div className="space-y-6 text-center">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-indigo-200 rounded-full blur-2xl opacity-40"></div>
              <div className="w-20 h-20 bg-indigo-50 border-2 border-indigo-100 rounded-full flex items-center justify-center mx-auto text-3xl font-mono shadow-xl relative">
                🏆
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-800">Quiz Completed</h3>
              <p className="text-xs text-slate-500 font-medium">Excellent work! Review your board performance below:</p>
            </div>

            <div className="py-5 bg-slate-50 rounded-[2rem] border-2 border-slate-100 max-w-xs mx-auto shadow-sm">
              <div className="text-3xl font-black font-mono tracking-tight text-slate-800 mb-1">
                {score} <span className="text-slate-400 text-base">/ {questions.length}</span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-indigo-600">
                {score === questions.length ? 'Perfect Pathologist' : score >= questions.length * 0.70 ? 'BOARD CERTIFIED' : 'STUDENT REVIEW NEEDED'}
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-6 select-none">
            <button
              onClick={() => startQuiz(mode)}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:scale-[1.01] text-white rounded-2xl text-xs font-black shadow-lg shadow-indigo-100 active:scale-95 transition cursor-pointer flex justify-center items-center"
            >
              Simulate Retake Quiz
            </button>
            <button
              onClick={onBack}
              className="w-full py-3 bg-white border-2 border-slate-150 text-slate-700 hover:bg-slate-50 text-xs font-black rounded-2xl active:scale-95 transition shadow-sm flex justify-center items-center"
            >
              Explore another Deck
            </button>
          </div>
        </motion.div>
      ) : currentQ ? (
        /* QUIZ PLAYER CORE VIEW */
        <div className="flex-1 flex flex-col justify-between space-y-4">
          
          <div className="space-y-4">
            {/* Index Tracker */}
            <div className="flex justify-between items-center text-[10px] select-none">
              <span className="text-slate-400 font-extrabold uppercase">
                QUESTION {currentIndex + 1} OF {questions.length}
              </span>
              <span className="text-slate-500 font-bold uppercase">
                Score: <strong className="text-emerald-600 font-black font-mono">{score}</strong>
              </span>
            </div>

            {/* Path track bar */}
            <div className="w-full h-2 bg-slate-100 p-0.5 rounded-full overflow-hidden border border-slate-200/40">
              <div 
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Diagnostic Scenario text */}
            <div className="p-5 bg-indigo-50/70 border-2 border-indigo-100 rounded-[2rem] shadow-sm">
              <p className="text-xs font-black text-slate-850 leading-relaxed font-display">
                {currentQ.question}
              </p>
            </div>

            {/* Multiple Choice Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswer === opt;
                
                // Color logic after submitted
                let optBg = 'bg-slate-50 border-2 border-slate-100 hover:bg-slate-100/50 hover:border-slate-200 text-slate-700';
                if (isSelected) {
                  optBg = 'bg-indigo-50 border-2 border-indigo-300 text-indigo-805 font-bold';
                }
                
                if (isAnswered) {
                  const isCorrectAnswer = opt === currentQ.correctAnswer;
                  if (isSelected && isCorrectAnswer) {
                    optBg = 'bg-teal-50 border-2 border-teal-300 text-teal-800 font-black';
                  } else if (isSelected && !isCorrectAnswer) {
                    optBg = 'bg-rose-50 border-2 border-rose-300 text-rose-800 font-black';
                  } else if (isCorrectAnswer) {
                    optBg = 'bg-teal-50 border-2 border-teal-200 text-teal-700 font-bold';
                  } else {
                    optBg = 'bg-slate-50/30 border-2 border-slate-100/40 text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full p-4 text-xs rounded-2xl text-left flex items-start gap-3.5 select-none transition-all hover:scale-[1.01] active:scale-[0.99] shadow-sm ${optBg}`}
                  >
                    <span className="w-5.5 h-5.5 rounded-xl flex-shrink-0 flex items-center justify-center bg-white border-2 border-slate-150 text-[10px] font-black shadow-sm text-slate-800">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-normal font-semibold pr-1">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="space-y-3.5 pt-4">
            
            {/* Educational feedback after rating submitted */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-slate-50 border-2 border-slate-150 rounded-[2rem] leading-relaxed space-y-1.5 shadow-sm text-xs"
                >
                  <div className="flex items-center gap-1.5 font-black uppercase text-[10px]">
                    {selectedAnswer === currentQ.correctAnswer ? (
                      <span className="text-teal-700 flex items-center gap-1"><CheckCircle size={12} strokeWidth={3} /> Correct Diagnostic!</span>
                    ) : (
                      <span className="text-rose-700 flex items-center gap-1"><XCircle size={12} strokeWidth={3} /> Incorrect Diagnosis</span>
                    )}
                  </div>
                  <p className="text-slate-705 font-medium leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {!isAnswered ? (
              <button
                disabled={!selectedAnswer}
                onClick={handleSubmitAnswer}
                className="w-full py-3.5 bg-indigo-600 disabled:bg-slate-100 disabled:opacity-50 disabled:text-slate-400 text-white rounded-2xl text-xs font-bold shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 transition active:scale-95 border border-indigo-500/30"
              >
                Submit Clinical Choice
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:scale-[1.01] text-white rounded-2xl text-xs font-black flex items-center justify-center gap-1.5 shadow-xl shadow-indigo-100 transition active:scale-95"
              >
                {currentIndex < questions.length - 1 ? 'Next Question' : 'Complete Practice'} <ChevronRight size={13} strokeWidth={3} />
              </button>
            )}
          </div>

        </div>
      ) : (
        <div className="py-12 text-center text-slate-500 text-xs font-medium">
          Loading diagnostic simulator...
        </div>
      )}

    </div>
  );
}
