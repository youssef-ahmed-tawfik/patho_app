import React, { useState, useEffect, useMemo } from 'react';
import { PRELOAD_FLASHCARDS } from './data/flashcards';
import { Flashcard, UserProgress, CustomFlashcard, LearningBox } from './types';
import MobileFrame from './components/MobileFrame';
import DeckSelector from './components/DeckSelector';
import FlashcardViewer from './components/FlashcardViewer';
import QuizEngine from './components/QuizEngine';
import AiTutor from './components/AiTutor';
import CardCreator from './components/CardCreator';
import { BookOpen, Award, Bot, PlusCircle, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation Tabs: 'study' | 'quiz' | 'tutor' | 'create'
  const [activeTab, setActiveTab] = useState<'study' | 'quiz' | 'tutor' | 'create'>('study');
  
  // Selected decks category
  const [selectedCategory, setSelectedCategory] = useState<string>('All Materials');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  // Spaced repetition progress scores
  const [progress, setProgress] = useState<Record<string, UserProgress>>({});
  // Dynamic list of user-created/AI-compiled cards
  const [customCards, setCustomCards] = useState<CustomFlashcard[]>([]);

  // Healthcheck for Gemini configuration on server
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState(false);

  // Load user data on startup
  useEffect(() => {
    try {
      const savedProg = localStorage.getItem('vet_pathology_progress_v2');
      if (savedProg) {
        setProgress(JSON.parse(savedProg));
      }

      const savedCustom = localStorage.getItem('vet_pathology_custom_cards');
      if (savedCustom) {
        setCustomCards(JSON.parse(savedCustom));
      }
    } catch (e) {
      console.error('LocalStorage load failure:', e);
    }

    // Check backend API details
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setIsApiKeyConfigured(!!data.apiKeyConfigured);
      })
      .catch(err => {
        console.warn('API health check offline, defaulting to lazy keys:', err);
      });
  }, []);

  // Merge preload + custom cards for comprehensive study catalog is
  const allCards = useMemo(() => {
    const formattedCustom: Flashcard[] = customCards.map(c => ({
      id: c.id,
      question: c.question,
      answer: c.answer,
      category: c.category,
      part: 'Custom Deck Card',
      source: 'Cytology' // default source marker
    }));
    return [...PRELOAD_FLASHCARDS, ...formattedCustom];
  }, [customCards]);

  // Current deck of cards selected by category context
  const filteredDeck = useMemo(() => {
    if (selectedCategory === 'My Custom cards') {
      return allCards.filter(c => c.part === 'Custom Deck Card');
    }
    if (selectedCategory === 'All Materials') {
      return allCards;
    }
    return allCards.filter(c => c.category === selectedCategory);
  }, [allCards, selectedCategory]);

  // Handle single card index calculations
  const currentCardIndex = useMemo(() => {
    if (!selectedCardId) return -1;
    return filteredDeck.findIndex(c => c.id === selectedCardId);
  }, [filteredDeck, selectedCardId]);

  // Confidence Rating / Anki Interval scoring updating
  const handleRateConfidence = (cardId: string, rating: LearningBox) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        [cardId]: {
          cardId,
          box: rating,
          lastReviewed: new Date().toISOString(),
          intervalDays: rating === 'Mastered' ? 7 : rating === 'Review' ? 3 : 1
        }
      };
      localStorage.setItem('vet_pathology_progress_v2', JSON.stringify(updated));
      return updated;
    });

    // Auto-advance card
    navigateToNextCard();
  };

  const navigateToNextCard = () => {
    if (filteredDeck.length <= 1) return;
    const nextIdx = (currentCardIndex + 1) % filteredDeck.length;
    setSelectedCardId(filteredDeck[nextIdx].id);
  };

  const navigateToPrevCard = () => {
    if (filteredDeck.length <= 1) return;
    const prevIdx = (currentCardIndex - 1 + filteredDeck.length) % filteredDeck.length;
    setSelectedCardId(filteredDeck[prevIdx].id);
  };

  // Reset entire learning profile scores
  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to clear your learning pathology stats? This cannot be undone.')) {
      setProgress({});
      localStorage.removeItem('vet_pathology_progress_v2');
    }
  };

  // Handlers for Custom Builder
  const handleAddCustomCard = (question: string, answer: string, category: string) => {
    const newCard: CustomFlashcard = {
      id: `custom_${Date.now()}`,
      question,
      answer,
      category,
      createdAt: new Date().toISOString()
    };
    setCustomCards(prev => {
      const updated = [newCard, ...prev];
      localStorage.setItem('vet_pathology_custom_cards', JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddMultipleCustomCards = (cards: { question: string; answer: string; category: string }[]) => {
    const newCards: CustomFlashcard[] = cards.map((c, i) => ({
      id: `custom_ai_${Date.now()}_${i}`,
      question: c.question,
      answer: c.answer,
      category: c.category,
      createdAt: new Date().toISOString()
    }));
    setCustomCards(prev => {
      const updated = [...newCards, ...prev];
      localStorage.setItem('vet_pathology_custom_cards', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteCustomCard = (cardId: string) => {
    setCustomCards(prev => {
      const updated = prev.filter(c => c.id !== cardId);
      localStorage.setItem('vet_pathology_custom_cards', JSON.stringify(updated));
      return updated;
    });
  };

  const exitStudySession = () => {
    setSelectedCardId(null);
  };

  return (
    <MobileFrame isApiKeyConfigured={isApiKeyConfigured}>
      
      {/* CORE VIEWPORT CONTENT SWITCHER */}
      <div className="flex-1 flex flex-col justify-between">
        
        {/* Render Flashcard Viewer directly if focused on study cards */}
        {selectedCardId && activeTab === 'study' ? (
          <FlashcardViewer
            card={allCards.find(c => c.id === selectedCardId)!}
            onRateConfidence={handleRateConfidence}
            onBack={exitStudySession}
            isApiKeyConfigured={isApiKeyConfigured}
            totalInDeck={filteredDeck.length}
            currentIndex={currentCardIndex}
            onNext={navigateToNextCard}
            onPrev={navigateToPrevCard}
          />
        ) : (
          /* Normal Tab routing */
          <>
            {activeTab === 'study' && (
              <DeckSelector
                cards={PRELOAD_FLASHCARDS}
                customCards={customCards}
                progress={progress}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onSelectCard={(cardId) => {
                  setSelectedCardId(cardId);
                }}
                onResetProgress={handleResetProgress}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'quiz' && (
              <QuizEngine
                cards={allCards}
                selectedCategory={selectedCategory}
                isApiKeyConfigured={isApiKeyConfigured}
                onBack={() => setActiveTab('study')}
              />
            )}

            {activeTab === 'tutor' && (
              <AiTutor
                cards={allCards}
                selectedCategory={selectedCategory}
                isApiKeyConfigured={isApiKeyConfigured}
              />
            )}

            {activeTab === 'create' && (
              <CardCreator
                customCards={customCards}
                onAddCard={handleAddCustomCard}
                onAddMultiple={handleAddMultipleCustomCards}
                onDeleteCard={handleDeleteCustomCard}
                isApiKeyConfigured={isApiKeyConfigured}
              />
            )}
          </>
        )}
      </div>

      {/* MOBILE BOTTOM NAVIGATION RAILS */}
      <div className="bg-white border-t-2 border-slate-100 sticky bottom-0 left-0 right-0 py-3 px-6 flex justify-between items-center z-40 shadow-lg shadow-indigo-100/30">
        
        <button
          onClick={() => {
            setActiveTab('study');
            exitStudySession();
          }}
          className={`flex flex-col items-center gap-1 transition select-none active:scale-95 ${
            activeTab === 'study' ? 'text-indigo-650 font-black' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <BookOpen size={16} strokeWidth={2.5} />
          <span className="text-[9px] uppercase tracking-wider font-bold">Study Decks</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('quiz');
            exitStudySession();
          }}
          className={`flex flex-col items-center gap-1 transition select-none active:scale-95 ${
            activeTab === 'quiz' ? 'text-indigo-650 font-black' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Award size={16} strokeWidth={2.5} />
          <span className="text-[9px] uppercase tracking-wider font-bold">Exam Practice</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('tutor');
            exitStudySession();
          }}
          className={`flex flex-col items-center gap-1 transition select-none active:scale-95 ${
            activeTab === 'tutor' ? 'text-indigo-650 font-black' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Bot size={16} strokeWidth={2.5} />
          <span className="text-[9px] uppercase tracking-wider font-bold">AI Tutor</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('create');
            exitStudySession();
          }}
          className={`flex flex-col items-center gap-1 transition select-none active:scale-95 ${
            activeTab === 'create' ? 'text-indigo-650 font-black' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <PlusCircle size={16} strokeWidth={2.5} />
          <span className="text-[9px] uppercase tracking-wider font-bold">Builder</span>
        </button>

      </div>

    </MobileFrame>
  );
}
