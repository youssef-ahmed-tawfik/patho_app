import React, { useMemo } from 'react';
import { Flashcard, UserProgress, CustomFlashcard } from '../types';
import { BookOpen, Search, SearchSlash, Flame, RotateCcw, ShieldCheck, Heart, Award, FileText } from 'lucide-react';

interface DeckSelectorProps {
  cards: Flashcard[];
  customCards: CustomFlashcard[];
  progress: Record<string, UserProgress>;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onSelectCard: (cardId: string) => void;
  onResetProgress: () => void;
  activeTab: 'study' | 'quiz' | 'tutor' | 'create';
  setActiveTab: (tab: 'study' | 'quiz' | 'tutor' | 'create') => void;
}

export default function DeckSelector({
  cards,
  customCards,
  progress,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  onSelectCard,
  onResetProgress,
  activeTab,
  setActiveTab
}: DeckSelectorProps) {
  // Mapping dynamic colors and borders corresponding to the Vibrant Palette spec
  const categories = [
    { 
      name: 'All Materials', 
      count: cards.length, 
      bg: 'bg-indigo-50 border-2 border-indigo-100', 
      accent: 'bg-indigo-600', 
      textStyle: 'text-indigo-800', 
      desc: 'Complete Hematology & Cytology syllabus' 
    },
    { 
      name: 'General Anemia', 
      count: cards.filter(c => c.category === 'General Anemia').length, 
      bg: 'bg-rose-50 border-2 border-rose-100', 
      accent: 'bg-rose-500 shadow-rose-200', 
      textStyle: 'text-rose-800', 
      desc: 'Pathogenesis, signs, postmortem & RBC changes' 
    },
    { 
      name: 'Deficiency Anemia & Leukemia', 
      count: cards.filter(c => c.category === 'Deficiency Anemia & Leukemia').length, 
      bg: 'bg-amber-50 border-2 border-amber-100', 
      accent: 'bg-amber-500 shadow-amber-200', 
      textStyle: 'text-amber-800', 
      desc: 'Iron/Cu/Co deficiency, acute/chronic Leukemia, Leukosis' 
    },
    { 
      name: 'Hemolytic Anemia', 
      count: cards.filter(c => c.category === 'Hemolytic Anemia').length, 
      bg: 'bg-rose-50 border-2 border-rose-100', 
      accent: 'bg-rose-600 shadow-rose-200', 
      textStyle: 'text-rose-800', 
      desc: 'Intracellular vs Intra, Foals, Leptospirosis, Babesiosis' 
    },
    { 
      name: 'Cytology', 
      count: cards.filter(c => c.category === 'Cytology').length, 
      bg: 'bg-teal-50 border-2 border-teal-100', 
      accent: 'bg-teal-500 shadow-teal-100', 
      textStyle: 'text-teal-800', 
      desc: 'Exfoliation, interventional FNAC, effusions & estrus' 
    },
    { 
      name: 'Liver & Kidney Function Test', 
      count: cards.filter(c => c.category === 'Liver & Kidney Function Test').length, 
      bg: 'bg-sky-50 border-2 border-sky-100', 
      accent: 'bg-sky-500 shadow-sky-200', 
      textStyle: 'text-sky-800', 
      desc: 'Leakage vs cholestasis enzymes, organ markers, urinalysis' 
    },
    { 
      name: 'My Custom cards', 
      count: customCards.length, 
      bg: 'bg-amber-50 border-2 border-amber-100', 
      accent: 'bg-amber-600 shadow-amber-200', 
      textStyle: 'text-amber-800', 
      desc: 'AI-generated and manual flashcards' 
    }
  ];

  // Progressive summary stats
  const stats = useMemo(() => {
    const total = cards.length;
    let mastered = 0;
    let learning = 0;
    let newCards = 0;

    cards.forEach(card => {
      const prog = progress[card.id];
      if (!prog || prog.box === 'New') {
        newCards++;
      } else if (prog.box === 'Mastered') {
        mastered++;
      } else {
        learning++;
      }
    });

    const masteryPercent = total ? Math.round((mastered / total) * 100) : 0;

    return { total, mastered, learning, newCards, masteryPercent };
  }, [cards, progress]);

  // Handle card rendering & search
  const filteredCards = useMemo(() => {
    let base = selectedCategory === 'My Custom cards'
      ? customCards.map(c => ({ ...c, source: 'Cytology' as const, part: 'Custom' }))
      : selectedCategory === 'All Materials'
        ? cards
        : cards.filter(c => c.category === selectedCategory);

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      base = base.filter(c => 
         c.question.toLowerCase().includes(query) || 
         c.answer.toLowerCase().includes(query)
      );
    }

    return base;
  }, [cards, customCards, selectedCategory, searchTerm]);

  return (
    <div className="flex flex-col flex-1 p-6 space-y-6 bg-white selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Dynamic Header exactly mirroring high fidelity Study Smart block */}
      <div className="flex items-center justify-between mt-2">
        <div className="space-y-1">
          <p className="text-indigo-500 text-xs font-bold tracking-wider uppercase font-mono">Veterinary Pathology</p>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">FlashMind</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm shadow-sm">
          VP
        </div>
      </div>

      {/* Hero Banner themed like the New Study Deck preview */}
      <div className="bg-indigo-600 w-full rounded-[2rem] p-5 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold tracking-tight">My Study Index</h2>
            <button 
              onClick={onResetProgress}
              className="text-[10px] uppercase font-bold tracking-wider text-indigo-200 hover:text-white transition flex items-center gap-1 bg-indigo-700/60 p-1.5 px-2.5 rounded-xl border border-indigo-500/30 active:scale-95"
              title="Reset progress"
            >
              <RotateCcw size={10} /> Reset Stats
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 py-1 select-none">
            <div className="p-2 rounded-2xl bg-white/10 border border-white/10 flex flex-col items-center">
              <span className="text-[9px] text-indigo-200 font-bold uppercase tracking-wider">New</span>
              <span className="text-base font-black text-white font-mono">{stats.newCards}</span>
            </div>
            <div className="p-2 rounded-2xl bg-white/10 border border-white/10 flex flex-col items-center">
              <span className="text-[9px] text-indigo-200 font-bold uppercase tracking-wider">Learning</span>
              <span className="text-base font-black text-white font-mono">{stats.learning}</span>
            </div>
            <div className="p-2 rounded-2xl bg-white/10 border border-white/10 flex flex-col items-center">
              <span className="text-[9px] text-indigo-200 font-bold uppercase tracking-wider">Mastered</span>
              <span className="text-base font-black text-emerald-300 font-mono">{stats.mastered}</span>
            </div>
          </div>

          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-[10px] text-indigo-100 font-bold">
              <span>Overall Pathology Mastery</span>
              <span>{stats.masteryPercent}%</span>
            </div>
            <div className="w-full h-2 bg-indigo-950/40 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500" 
                style={{ width: `${stats.masteryPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
        <div className="absolute right-8 top-4 w-12 h-12 bg-white opacity-5 rounded-full"></div>
      </div>

      {/* Chapters Carousel: Styled precisely after Recent Decks cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider font-display">Study Chapters</h3>
          <span className="text-xs text-slate-400 font-bold">{categories.length} Topics</span>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-indigo-100 scrollbar-track-transparent">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex-shrink-0 w-[155px] p-4 rounded-3xl text-left border-2 relative transition-all duration-300 outline-none select-none active:scale-95 ${
                  isSelected 
                    ? 'bg-indigo-50 border-indigo-500 shadow-lg shadow-indigo-100' 
                    : `${cat.bg} border-slate-100 hover:border-slate-300`
                }`}
              >
                <div className="space-y-2 relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-xs font-black leading-snug text-slate-850 line-clamp-2 h-[34px]">{cat.name}</h3>
                    <p className="text-[10px] text-slate-500 leading-tight line-clamp-2 font-medium mt-1">{cat.desc}</p>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200/50 mt-2">
                    <span className="text-[9px] font-extrabold text-slate-700 bg-white/90 border border-slate-205/60 px-2 py-0.5 rounded-full shadow-sm">
                      {cat.count} cards
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search and Card List with high-fidelity structures */}
      <div className="space-y-4 flex-1 flex flex-col min-h-0">
        
        {/* Search Input Box */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${selectedCategory}...`}
            className="w-full text-xs font-medium bg-slate-50 hover:bg-slate-100 border-2 border-slate-100 hover:border-slate-200 rounded-3xl py-3 pl-11 pr-4 text-slate-800 placeholder-slate-450 outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-sm"
          />
          <Search size={14} className="absolute left-4 top-3.5 text-indigo-505" />
        </div>

        {/* Scrollable list of questions */}
        <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-indigo-50">
          {filteredCards.length > 0 ? (
            filteredCards.map((card, i) => {
              const prog = progress[card.id];
              const isMastered = prog?.box === 'Mastered';

              return (
                <button
                  key={card.id || i}
                  onClick={() => onSelectCard(card.id)}
                  className="w-full p-4 rounded-3xl bg-slate-50/60 border-2 border-slate-100 hover:bg-indigo-50/50 hover:border-indigo-200 text-left flex items-center gap-4 transition group active:scale-[0.99] shadow-sm"
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white mr-1 shadow-lg flex-shrink-0 ${
                    isMastered ? 'bg-teal-500 shadow-teal-100' : 'bg-indigo-500 shadow-indigo-100'
                  }`}>
                    <FileText size={18} strokeWidth={3} />
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold tracking-wider uppercase text-slate-400">
                        {card.part || 'Clinical reference'}
                      </span>
                      {prog && (
                        <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isMastered ? 'bg-teal-100 text-teal-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {prog.box}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-black text-slate-800 group-hover:text-indigo-600 transition leading-tight truncate">
                      {card.question}
                    </p>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-12 text-center space-y-3.5 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30">
              <SearchSlash size={28} className="text-slate-400 mx-auto" />
              <div className="space-y-0.5">
                <p className="text-xs text-slate-800 font-bold">No matching flashcards found</p>
                <p className="text-[10px] text-slate-500">Try modifying your query or select another study deck.</p>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
