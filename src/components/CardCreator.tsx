import React, { useState } from 'react';
import { CustomFlashcard } from '../types';
import { Sparkles, Plus, Trash2, ClipboardPaste, BookOpen, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

interface CardCreatorProps {
  customCards: CustomFlashcard[];
  onAddCard: (q: string, a: string, c: string) => void;
  onAddMultiple: (cards: { question: string; answer: string; category: string }[]) => void;
  onDeleteCard: (id: string) => void;
  isApiKeyConfigured: boolean;
}

export default function CardCreator({
  customCards,
  onAddCard,
  onAddMultiple,
  onDeleteCard,
  isApiKeyConfigured
}: CardCreatorProps) {
  // Method: Manual vs AI Magic
  const [method, setMethod] = useState<'manual' | 'ai'>('manual');

  // Manual states
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('My Custom cards');
  const [manualSuccess, setManualSuccess] = useState(false);

  // AI Generator states
  const [rawText, setRawText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [generatedCount, setGeneratedCount] = useState(0);

  const categories = [
    'My Custom cards',
    'General Anemia',
    'Deficiency Anemia & Leukemia',
    'Hemolytic Anemia',
    'Cytology',
    'Liver & Kidney Function Test'
  ];

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    onAddCard(question.trim(), answer.trim(), category);
    setQuestion('');
    setAnswer('');
    setManualSuccess(true);
    setTimeout(() => setManualSuccess(false), 2500);
  };

  // Triggers Gemini to automatically generate cards based on notes
  const handleAiGenerate = async () => {
    if (!rawText.trim()) return;
    setAiLoading(true);
    setAiError('');
    setGeneratedCount(0);

    try {
      if (!isApiKeyConfigured) {
        throw new Error('GEMINI_API_KEY is not configured yet. Configure secrets via Settings.');
      }

      const res = await fetch('/api/gemini/generate-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: rawText, category: 'My Custom cards' })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Server error generating card study boards');
      }

      if (data.success && Array.isArray(data.cards) && data.cards.length > 0) {
        onAddMultiple(data.cards);
        setGeneratedCount(data.cards.length);
        setRawText('');
      } else {
        throw new Error('Found no key clinical facts to compile into flashcards. Try pasting richer text.');
      }
    } catch (err: any) {
      setAiError(err.message || 'Failure connecting to Pathology compiler. Please check your API key.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 p-6 space-y-5 justify-between bg-white selection:bg-indigo-100">
      
      {/* Title block */}
      <div className="space-y-1">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-800 flex items-center gap-1.5 font-display select-none">
          <BookOpen size={12} className="text-indigo-650" strokeWidth={3} /> Deck Builder
        </h2>
        <p className="text-[11px] text-slate-500 font-medium">
          Synthesize custom exam prep modules manually or with our automatic compiler.
        </p>
      </div>

      {/* Sub tabs selector */}
      <div className="grid grid-cols-2 gap-2.5 p-1 bg-slate-50 border-2 border-slate-100 rounded-2xl shadow-sm select-none">
        <button
          onClick={() => setMethod('manual')}
          className={`py-2 text-[11px] font-black rounded-xl transition active:scale-95 flex items-center justify-center gap-1.5 ${
            method === 'manual' ? 'bg-indigo-650 text-white shadow-md' : 'text-slate-550 hover:text-slate-800 hover:bg-slate-105/50 font-semibold'
          }`}
        >
          <Plus size={11} strokeWidth={2.5} /> Manual Input
        </button>
        <button
          onClick={() => setMethod('ai')}
          className={`py-2 text-[11px] font-black rounded-xl transition active:scale-95 flex items-center justify-center gap-1.5 ${
            method === 'ai' ? 'bg-indigo-650 text-white shadow-md' : 'text-slate-550 hover:text-slate-800 hover:bg-slate-105/50 font-semibold'
          }`}
        >
          <Sparkles size={11} strokeWidth={2.5} /> AI Magic Builder
        </button>
      </div>

      {/* RENDER MANUAL FORM */}
      {method === 'manual' && (
        <form onSubmit={handleManualSubmit} className="flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-705 font-mono">Question / Flashcard Front</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What is the gross postmortem picture of Leptospirosis?"
                className="w-full text-xs font-semibold bg-slate-50 hover:bg-slate-100 border-2 border-slate-100 hover:border-slate-205 rounded-2xl p-3.5 text-slate-800 placeholder-slate-450 outline-none focus:border-indigo-400 focus:bg-white transition-all h-20 resize-none shadow-sm"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-705 font-mono">Answer / Clinical back</label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="White spotted kidney (focal nephritis), pale lungs, enlarged friable liver."
                className="w-full text-xs font-semibold bg-slate-50 hover:bg-slate-100 border-2 border-slate-100 hover:border-slate-205 rounded-2xl p-3.5 text-slate-800 placeholder-slate-450 outline-none focus:border-indigo-400 focus:bg-white transition-all h-24 resize-none shadow-sm"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-705 font-mono">Study Deck Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs font-bold bg-slate-55 border-2 border-slate-100 rounded-2xl p-3 text-slate-850 outline-none focus:border-indigo-400 focus:bg-white transition shadow-sm"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {manualSuccess && (
              <div className="p-3 bg-teal-50 border-2 border-teal-100 text-[10px] text-teal-700 rounded-2xl flex items-center gap-1.5 font-bold shadow-sm animate-bounce">
                <CheckCircle2 size={13} /> Custom study card successfully appended!
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black shadow-lg shadow-indigo-100 transition active:scale-95 flex items-center justify-center gap-1.5"
          >
            Append study card
          </button>
        </form>
      )}

      {/* RENDER AI AUTOMATIC COMPILER */}
      {method === 'ai' && (
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-3.5 flex-1 flex flex-col">
            
            <div className="text-[10px] bg-indigo-50 border-2 border-indigo-100 p-4 rounded-2xl text-indigo-750 flex items-start gap-2 leading-relaxed font-bold shadow-sm">
              <Sparkles size={15} className="flex-shrink-0 mt-0.5 text-indigo-650 font-black" strokeWidth={3} />
              <span>Paste raw veterinary veterinary lecture transcripts, slide extracts, or book references. Gemini will dissect and output high-yielding cards.</span>
            </div>

            <div className="space-y-1 flex-1 flex flex-col">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-705 font-mono flex justify-between">
                <span>Lecture Notes / Slide Text</span>
                <span className="text-slate-400 font-light font-mono">{rawText.length} chars</span>
              </label>
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste notes here... e.g. 'In horses, Ehrlichiosis causes morulae within neutrophils, leukopenia, and thrombocytopenia...'"
                className="w-full text-xs font-semibold bg-slate-50 hover:bg-slate-100 border-2 border-slate-100 hover:border-slate-205 rounded-2xl p-3.5 text-slate-800 placeholder-slate-450 outline-none focus:border-indigo-400 focus:bg-white transition-all h-32 resize-none shadow-sm"
              />
            </div>

            {aiError && (
              <div className="p-3.5 bg-rose-50 border-2 border-rose-100 rounded-2xl text-rose-700 text-[10px] flex gap-1.5 items-start font-semibold shadow-sm animate-pulse">
                <AlertTriangle size={13} className="text-rose-550 flex-shrink-0 mt-0.5" />
                <span>{aiError}</span>
              </div>
            )}

            {generatedCount > 0 && (
              <div className="p-3 bg-teal-50 border-2 border-teal-100 text-[10px] text-teal-700 rounded-2xl flex items-center gap-1.5 font-bold shadow-sm">
                <CheckCircle2 size={13} /> Compiled {generatedCount} premium custom Q&A study cards!
              </div>
            )}
          </div>

          <button
            disabled={aiLoading || !rawText.trim()}
            onClick={handleAiGenerate}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl text-xs font-black shadow-lg shadow-indigo-150 transition active:scale-95 disabled:opacity-45"
          >
            {aiLoading ? 'Deconstructing lectures...' : 'Trigger AI Compilation'}
          </button>
        </div>
      )}

      {/* PREVIEW CUSTOM LIST */}
      <div className="border-t-2 border-slate-100 pt-4 space-y-3">
        <h4 className="text-[10px] uppercase tracking-widest font-black text-slate-705 font-mono flex justify-between items-center select-none">
          <span>Active custom deck</span>
          <span className="font-mono text-slate-400">{customCards.length} cards</span>
        </h4>
        
        <div className="space-y-2 max-h-[140px] overflow-y-auto scrollbar-thin">
          {customCards.length > 0 ? (
            customCards.map(card => (
              <div 
                key={card.id}
                className="p-3 bg-slate-50 rounded-2xl border border-slate-150/70 flex justify-between items-center gap-3.5 shadow-sm"
              >
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-[10px] font-black text-slate-800 line-clamp-1">{card.question}</p>
                  <p className="text-[9px] font-medium text-slate-400 line-clamp-1">{card.answer}</p>
                </div>
                <button 
                  onClick={() => onDeleteCard(card.id)}
                  className="p-1.5 bg-white border border-slate-100 hover:bg-rose-50 text-slate-405 hover:text-rose-600 rounded-xl transition active:scale-90 shadow-sm"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-[10px] text-slate-400 text-center py-4 font-semibold italic select-none">No custom flashcards yet. Try AI compiling notes.</p>
          )}
        </div>
      </div>

    </div>
  );
}
