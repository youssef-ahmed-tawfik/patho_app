import React, { useState } from 'react';
import { Flashcard, LearningBox } from '../types';
import { ArrowLeft, RefreshCw, Zap, Sparkles, AlertCircle, Quote, Star, ClipboardCheck, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FlashcardViewerProps {
  card: Flashcard;
  onRateConfidence: (cardId: string, rating: LearningBox) => void;
  onBack: () => void;
  isApiKeyConfigured: boolean;
  totalInDeck: number;
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

interface AiExplanation {
  simplified: string;
  clinical: string;
  mnemonic: string;
}

export default function FlashcardViewer({
  card,
  onRateConfidence,
  onBack,
  isApiKeyConfigured,
  totalInDeck,
  currentIndex,
  onNext,
  onPrev
}: FlashcardViewerProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [explanation, setExplanation] = useState<AiExplanation | null>(null);

  // Trigger Gemini Professor Explainer
  const handleAskAi = async () => {
    if (!isApiKeyConfigured) {
      setAiError('Please set your GEMINI_API_KEY secret in the Settings panel first.');
      return;
    }
    setAiLoading(true);
    setAiError('');
    setExplanation(null);

    try {
      const response = await fetch('/api/gemini/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: card.question, answer: card.answer })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Server returned an error');
      }

      if (data.success && data.explanation) {
        setExplanation(data.explanation);
      } else {
        throw new Error('Invalid explanation structure received');
      }
    } catch (err: any) {
      setAiError(err.message || 'Failed to generate explanation. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRating = (rating: LearningBox) => {
    onRateConfidence(card.id, rating);
    setIsFlipped(false);
    setExplanation(null);
    setAiError('');
  };

  return (
    <div className="flex flex-col flex-1 p-6 space-y-5 justify-between bg-white selection:bg-indigo-100">
      
      {/* Top Header Utilities */}
      <div className="flex justify-between items-center bg-slate-50 border-2 border-slate-100 p-3 rounded-2xl shadow-sm">
        <button 
          onClick={onBack}
          className="p-1 px-3 bg-white border-2 border-slate-150 text-slate-705 hover:bg-slate-50 rounded-xl text-xs font-black flex items-center gap-1 active:scale-95 transition shadow-sm"
        >
          <ArrowLeft size={13} /> Return
        </button>
        
        <span className="text-[11px] font-mono font-black text-indigo-700 bg-indigo-50 border-2 border-indigo-100 px-3 py-1 rounded-full shadow-sm select-none">
          CARD {currentIndex + 1} OF {totalInDeck}
        </span>
      </div>

      {/* 3D Filppable Card Block */}
      <div className="relative w-full h-[320px] perspective group select-none">
        <div 
          onClick={handleCardClick}
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          
          {/* FRONT VIEW (Question Side) */}
          <div className="absolute inset-0 w-full h-full rounded-[2rem] bg-indigo-50/70 border-2 border-indigo-100 flex flex-col justify-between p-6 shadow-xl backface-hidden">
            {/* Visual Header */}
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-black font-mono tracking-wider text-rose-700 uppercase bg-rose-50 border-2 border-rose-100 px-2.5 py-1 rounded-full shadow-sm">
                {card.category}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Question</span>
            </div>

            {/* Core Question text */}
            <div className="flex-1 flex items-center justify-center py-4">
              <p className="text-sm font-black text-center text-slate-850 leading-relaxed px-2 font-display">
                {card.question}
              </p>
            </div>

            {/* Hint element */}
            <div className="flex justify-center items-center gap-1.5 text-[10px] text-indigo-550 font-black tracking-tight uppercase">
              <RefreshCw size={11} className="animate-spin-slow text-indigo-500" /> Tap Card to Reveal Answer
            </div>
          </div>

          {/* BACK VIEW (Answer Side) */}
          <div className="absolute inset-0 w-full h-full rounded-[2rem] bg-teal-50 border-2 border-teal-100 flex flex-col justify-between p-6 shadow-xl rotate-y-180 backface-hidden overflow-y-auto">
            {/* Visual Header */}
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-black font-mono tracking-wider text-teal-700 uppercase bg-white border-2 border-teal-100 px-2.5 py-1 rounded-full shadow-sm">
                {card.part || 'Reference Answer'}
              </span>
              <span className="text-[11px] text-teal-600 font-bold uppercase tracking-wider">Syllabus Answer</span>
            </div>

            {/* Core Answer text */}
            <div className="flex-1 py-4 flex flex-col justify-center">
              <div className="text-xs text-slate-800 leading-relaxed font-semibold max-h-[190px] overflow-y-auto whitespace-pre-wrap select-text px-1">
                {card.answer}
              </div>
            </div>

            {/* Tap to return hint */}
            <div className="text-center text-[10px] text-teal-600 tracking-wider font-bold uppercase flex items-center justify-center gap-1.5 select-none">
              <RefreshCw size={10} /> Flip back to Question
            </div>
          </div>

        </div>
      </div>

      {/* Swipe/Navigate Manual Controls */}
      <div className="flex justify-between items-center gap-3 select-none">
        <button 
          onClick={onPrev}
          className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 border-2 border-slate-100 hover:border-slate-200 text-xs font-bold text-slate-700 rounded-2xl active:scale-95 transition shadow-sm flex justify-center items-center"
        >
          Previous Card
        </button>
        <button 
          onClick={onNext}
          className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 border-2 border-slate-100 hover:border-slate-200 text-xs font-bold text-slate-700 rounded-2xl active:scale-95 transition shadow-sm flex justify-center items-center"
        >
          Next Card
        </button>
      </div>

      {/* Spaced repetition scoring rates (Anki model) */}
      <div className="space-y-2 select-none">
        <h3 className="text-[10px] text-slate-400 uppercase tracking-widest font-mono text-center font-bold">
          Rate Confidence (Anki spaced repetition)
        </h3>
        <div className="grid grid-cols-4 gap-2.5">
          <button 
            onClick={() => handleRating('New')}
            className="py-3 px-1.5 bg-rose-50 border-2 border-rose-100 hover:bg-rose-100 hover:border-rose-200 text-rose-700 rounded-2xl text-[10px] font-black flex flex-col items-center gap-0.5 active:scale-95 transition shadow-sm"
          >
            <span>Again</span>
            <span className="text-[9px] font-medium opacity-70">Reset</span>
          </button>
          <button 
            onClick={() => handleRating('Learning')}
            className="py-3 px-1.5 bg-amber-50 border-2 border-amber-100 hover:bg-amber-100 hover:border-amber-200 text-amber-700 rounded-2xl text-[10px] font-black flex flex-col items-center gap-0.5 active:scale-95 transition shadow-sm"
          >
            <span>Hard</span>
            <span className="text-[9px] font-medium opacity-70">Soon</span>
          </button>
          <button 
            onClick={() => handleRating('Review')}
            className="py-3 px-1.5 bg-indigo-50 border-2 border-indigo-100 hover:bg-indigo-100 hover:border-indigo-200 text-indigo-700 rounded-2xl text-[10px] font-black flex flex-col items-center gap-0.5 active:scale-95 transition shadow-sm"
          >
            <span>Good</span>
            <span className="text-[9px] font-medium opacity-70">Later</span>
          </button>
          <button 
            onClick={() => handleRating('Mastered')}
            className="py-3 px-1.5 bg-teal-50 border-2 border-teal-100 hover:bg-teal-100 hover:border-teal-200 text-teal-700 rounded-2xl text-[10px] font-black flex flex-col items-center gap-0.5 active:scale-95 transition shadow-sm"
          >
            <span>Easy</span>
            <span className="text-[9px] font-medium opacity-70">Mastery</span>
          </button>
        </div>
      </div>

      {/* AI Tutor Assistant for this specific card */}
      <div className="p-4 rounded-[2rem] bg-slate-50/70 border-2 border-slate-100 space-y-3.5 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-xs text-slate-800 font-black">
            <Sparkles size={14} className="text-indigo-600" /> AI Pathology Tutor
          </div>
          <button 
            onClick={handleAskAi}
            disabled={aiLoading}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-[10px] font-black text-white rounded-xl flex items-center gap-1 shadow-md shadow-indigo-100 transition active:scale-95 disabled:opacity-55"
          >
            <Zap size={11} className="animate-pulse" /> {aiLoading ? 'Breaking down...' : 'Explain Fact'}
          </button>
        </div>

        {/* Warning if AI key is missing */}
        {!isApiKeyConfigured && (
          <div className="text-[10px] bg-rose-50 border border-rose-100 p-3 rounded-2xl text-rose-700 flex items-start gap-1.5 leading-relaxed font-semibold">
            <AlertCircle size={13} className="flex-shrink-0 mt-0.5 text-rose-500" />
            <span>AI features require your GEMINI_API_KEY. Configure secrets via Settings bottom-left gear panel.</span>
          </div>
        )}

        {aiError && (
          <div className="text-[11px] text-rose-700 bg-rose-50 border-2 border-rose-100 p-3 rounded-2xl flex items-start gap-1.5 leading-normal font-semibold">
            <AlertCircle size={13} className="flex-shrink-0 mt-0.5 text-rose-500" />
            <span>{aiError}</span>
          </div>
        )}

        {/* AI response panel inside card with high-contrast light setup */}
        <AnimatePresence>
          {explanation && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4 pt-3 text-xs border-t-2 border-slate-200/40"
            >
              <div className="space-y-1.5 bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm">
                <div className="flex items-center gap-1.5 text-[9px] tracking-wider text-indigo-600 font-black uppercase">
                  <Lightbulb size={12} /> CLINICAL ANALOGY & BREAKDOWN
                </div>
                <p className="text-slate-700 text-xs leading-relaxed font-sans font-medium select-text">
                  {explanation.simplified}
                </p>
              </div>

              <div className="space-y-1.5 bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm">
                <div className="flex items-center gap-1.5 text-[9px] tracking-wider text-emerald-600 font-black uppercase">
                  <ClipboardCheck size={12} /> CLINICAL IMPLICATION
                </div>
                <p className="text-slate-700 text-xs leading-relaxed font-sans font-medium select-text">
                  {explanation.clinical}
                </p>
              </div>

              <div className="space-y-1.5 bg-indigo-50 border-2 border-indigo-100 p-3 rounded-2xl shadow-sm">
                <div className="flex items-center gap-1.5 text-[9px] tracking-wider text-indigo-700 font-black uppercase">
                  <Star size={11} className="fill-indigo-500 text-indigo-500" /> STUDY MEMORIZATION DEVICE
                </div>
                <p className="text-indigo-900 text-xs font-bold leading-normal font-mono bg-white/70 p-2 text-center rounded border border-indigo-200/50">
                  {explanation.mnemonic}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
