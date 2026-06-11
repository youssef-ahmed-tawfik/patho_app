import React, { useState } from 'react';
import { CaseStudy, Flashcard } from '../types';
import { Send, Sparkles, MessageCircle, FileText, Bot, User, Bookmark, AlertCircle, PlayCircle, ShieldAlert, BadgeCheck, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AiTutorProps {
  cards: Flashcard[];
  selectedCategory: string;
  isApiKeyConfigured: boolean;
}

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export default function AiTutor({ cards, selectedCategory, isApiKeyConfigured }: AiTutorProps) {
  // Modes: Chat with Pathologist or Diagnostic Case Studies
  const [tutorMode, setTutorMode] = useState<'chat' | 'sandbox'>('chat');
  
  // Chat state
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Hello, future DVM candidate! I am your AI Pathology Tutor. I have ingested both guides in detail. Ask me anything, or tap "Clinical Sandbox" to run an interactive Board diagnostic case study simulation!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // Sandbox state
  const [activeCase, setActiveCase] = useState<CaseStudy | null>(null);
  const [caseLoading, setCaseLoading] = useState(false);
  const [caseError, setCaseError] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isQuestionsSubmitted, setIsQuestionsSubmitted] = useState<Record<number, boolean>>({});

  // Trigger server-side chat response via custom Gemini endpoint
  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    if (chatLoading) return;

    const userText = chatInput.trim();
    setChatInput('');
    
    // Add to local history
    const userMsg: ChatMessage = {
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatHistory(prev => [...prev, userMsg]);
    setChatLoading(true);

    try {
      if (!isApiKeyConfigured) {
        throw new Error('GEMINI_API_KEY is not configured yet. Configure secrets via Settings.');
      }

      const systemMessage = `
You are a board-certified Veterinary Clinical Pathologist & Hematologist tutor.
You help veterinary students master complex concepts: Anemia, Leukemia, Bovine Leukosis, Cytology, Transudates/Exudates, Liver/Kidney tests, Urinalysis, etc.
Adopt a helpful, deeply informative academic and encouraging tone. Draw connections to diagnostics.
Based on the student query, answer comprehensively and reference the matching details from their clinic guides.
`;

      const lastFourChats = chatHistory.slice(-4).map(c => `${c.sender === 'user' ? 'Student' : 'Professor'}: ${c.text}`).join('\n');
      
      const res = await fetch('/api/gemini/explain', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: `${systemMessage}\nPrevious Conversation:\n${lastFourChats}\nStudent's New Query: "${userText}"`,
          answer: 'Please reply in clean academic prose. Keep it highly relevant for a veterinary clinician.'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error generating discussion response');
      
      const aiReplyText = data.explanation?.simplified 
        ? `${data.explanation.simplified}\n\n**Clinical Relevance:** ${data.explanation.clinical}\n\n**Mnemonic Device:** ${data.explanation.mnemonic}`
        : 'I completed processing your inquiry. Could you clarify that pathology factor?';

      setChatHistory(prev => [...prev, {
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err: any) {
      setChatHistory(prev => [...prev, {
        sender: 'ai',
        text: `Error tutoring: ${err.message || 'I faced a temporary connection block. Please retry or verify your API key.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Generate immersive Clinical Case Study via Gemini
  const handleGenerateCase = async () => {
    setCaseLoading(true);
    setCaseError('');
    setActiveCase(null);
    setSelectedAnswers({});
    setIsQuestionsSubmitted({});

    try {
      if (!isApiKeyConfigured) {
        throw new Error('GEMINI_API_KEY not configured yet.');
      }

      const res = await fetch('/api/gemini/case-study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: selectedCategory })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate board study');

      if (data.success && data.caseStudy) {
        setActiveCase(data.caseStudy);
      } else {
        throw new Error('Received invalid case format.');
      }
    } catch (err: any) {
      setCaseError(err.message || 'Board scheduling offline right now. Try selecting another study topic.');
    } finally {
      setCaseLoading(false);
    }
  };

  const handleSelectCaseAnswer = (qIdx: number, val: string) => {
    if (isQuestionsSubmitted[qIdx]) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: val }));
  };

  const handleSubmitQuestionAnswer = (qIdx: number) => {
    if (!selectedAnswers[qIdx]) return;
    setIsQuestionsSubmitted(prev => ({ ...prev, [qIdx]: true }));
  };

  return (
    <div className="flex flex-col flex-1 p-6 space-y-5 justify-between bg-white selection:bg-indigo-100">
      
      {/* Selector tab header */}
      <div className="space-y-4">
        <div className="flex gap-2.5 p-1 bg-slate-50 border-2 border-slate-100 rounded-2xl shadow-sm select-none">
          <button
            onClick={() => setTutorMode('chat')}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition active:scale-95 flex items-center justify-center gap-1.5 ${
              tutorMode === 'chat' ? 'bg-indigo-650 text-white shadow-md' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-105/50 font-bold'
            }`}
          >
            <MessageCircle size={13} /> Chat Pathologist
          </button>
          <button
            onClick={() => setTutorMode('sandbox')}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition active:scale-95 flex items-center justify-center gap-1.5 ${
              tutorMode === 'sandbox' ? 'bg-indigo-650 text-white shadow-md' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-105/50 font-bold'
            }`}
          >
            <Sparkles size={13} /> Clinical Sandbox
          </button>
        </div>

        {!isApiKeyConfigured && (
          <div className="text-[11px] bg-rose-50 border-2 border-rose-100 p-4 rounded-2xl text-rose-700 flex items-start gap-1.5 leading-relaxed font-semibold shadow-sm animate-pulse">
            <AlertCircle size={14} className="flex-shrink-0 mt-0.5 text-rose-550" />
            <span>AI Sandbox functions require your GEMINI_API_KEY. Add it in bottom-left Settings Secrets panel.</span>
          </div>
        )}
      </div>

      {/* RENDER MODE: CHAT PATHOLOGIST */}
      {tutorMode === 'chat' && (
        <div className="flex flex-col flex-grow justify-between space-y-4">
          <div className="flex-1 space-y-3.5 overflow-y-auto max-h-[380px] p-2.5 rounded-2xl border-2 border-slate-100 bg-slate-50/20 scrollbar-none">
            {chatHistory.map((msg, i) => (
              <div 
                key={i}
                className={`flex gap-2.5 max-w-[85%] select-text ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center p-1.5 text-xs ${
                  msg.sender === 'user' ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-200' : 'bg-slate-100 border-2 border-slate-150 text-slate-700'
                }`}>
                  {msg.sender === 'user' ? <User size={13} strokeWidth={2.5} /> : <Bot size={13} strokeWidth={2.5} />}
                </div>

                <div className={`p-4 rounded-2xl text-xs leading-relaxed space-y-1 shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-indigo-600 font-semibold text-white rounded-tr-none' 
                    : 'bg-white border-2 border-slate-100 text-slate-800 rounded-tl-none whitespace-pre-wrap font-medium'
                }`}>
                  <p>{msg.text}</p>
                  <span className="block text-[8px] opacity-40 text-right mt-1 font-mono">{msg.timestamp}</span>
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex gap-2 mr-auto max-w-[80%] items-center animate-pulse">
                <div className="w-7 h-7 rounded-lg bg-slate-50 border-2 border-slate-100 flex items-center justify-center">
                  <Bot size={13} className="text-indigo-600" />
                </div>
                <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-2xl text-[10px] text-slate-500 font-bold italic">
                  Professor is referencing veterinary medicine syllabus files...
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Field */}
          <div className="flex items-center gap-2 select-none">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
              placeholder="Ask: 'Explain postmortem of EIA' or 'Mnemonic...'"
              className="flex-1 text-xs font-semibold bg-slate-50 hover:bg-slate-100 border-2 border-slate-100 hover:border-slate-205 rounded-2xl py-3.5 pl-4 pr-3 text-slate-800 placeholder-slate-450 outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-sm"
            />
            <button 
              onClick={handleSendChat}
              disabled={chatLoading || !chatInput.trim()}
              className="p-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100 transition active:scale-95 disabled:opacity-40 flex items-center justify-center"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      {/* RENDER MODE: CLINICAL SANDBOX */}
      {tutorMode === 'sandbox' && (
        <div className="flex-1 flex flex-col justify-between space-y-5">
          {!activeCase ? (
            /* SANDBOX WELCOME PAGE */
            <div className="flex-grow flex flex-col justify-center items-center text-center p-4 space-y-5">
              <div className="w-14 h-14 bg-indigo-50 border-2 border-indigo-100 rounded-full flex items-center justify-center text-indigo-650 shadow-sm select-none">
                <PlayCircle size={32} className="animate-pulse" />
              </div>

              <div className="space-y-1.5 max-w-xs">
                <h3 className="text-sm font-black text-slate-800">Veterinary Case Simulator</h3>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  Generate hyper-realistic diagnostic reports containing clinical histories, physical examinations, and hematology datasets based on actual syllabus content.
                </p>
              </div>

              {caseError && (
                <div className="p-3 bg-rose-50 border-2 border-rose-100 rounded-2xl text-[10px] text-rose-700 font-semibold shadow-sm">
                  {caseError}
                </div>
              )}

              <button
                disabled={caseLoading || !isApiKeyConfigured}
                onClick={handleGenerateCase}
                className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black shadow-lg shadow-indigo-100 transition active:scale-95 flex items-center gap-1.5 disabled:opacity-50 select-none cursor-pointer"
              >
                {caseLoading ? 'Synthesizing Laboratory Logs...' : 'Initialize Clinical Case Study'}
              </button>
            </div>
          ) : (
            /* SANDBOX CLINIC CASE ACTIVE PLAY */
            <div className="flex-grow flex flex-col space-y-4 overflow-y-auto max-h-[460px] p-0.5 scrollbar-thin">
              
              {/* Case Badge header */}
              <div className="p-5 bg-indigo-50/70 border-2 border-indigo-100 rounded-[2rem] space-y-2 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-150 rounded-full blur-[40px] opacity-20"></div>
                <div className="flex items-center gap-1.5 text-[9px] font-black uppercase text-indigo-600 select-none">
                  <ShieldAlert size={12} strokeWidth={3} /> Active Board Case File
                </div>
                <h3 className="text-sm font-black text-slate-900 tracking-tight leading-relaxed">{activeCase.title}</h3>
                <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium select-text border-t border-indigo-200/40 pt-2.5 whitespace-pre-line">
                  {activeCase.scenario}
                </p>
              </div>

              {/* Case Diagnostic Questions */}
              <div className="space-y-5 pt-1">
                {activeCase.questions.map((q, qIdx) => {
                  const hasSubmitted = isQuestionsSubmitted[qIdx];
                  const chosenValue = selectedAnswers[qIdx];

                  return (
                    <div key={qIdx} className="p-4 bg-slate-50 border-2 border-slate-100 rounded-[2rem] space-y-3.5 shadow-sm">
                      <h4 className="text-xs font-black text-indigo-850 leading-relaxed">Q{qIdx + 1}: {q.question}</h4>
                      
                      {/* Option cards */}
                      <div className="space-y-2">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = chosenValue === opt;
                          
                          let optBg = 'bg-white border-2 border-slate-100 text-slate-705';
                          if (isSelected) {
                            optBg = 'bg-indigo-50 border-2 border-indigo-305 text-indigo-850 font-semibold';
                          }

                          if (hasSubmitted) {
                            const isCorrect = opt === q.correctAnswer;
                            if (isSelected && isCorrect) {
                              optBg = 'bg-teal-50 border-2 border-teal-300 text-teal-850 font-black';
                            } else if (isSelected && !isCorrect) {
                              optBg = 'bg-rose-50 border-2 border-rose-300 text-rose-850 font-black';
                            } else if (isCorrect) {
                              optBg = 'bg-teal-50 border-2 border-teal-200 text-teal-705 font-bold';
                            } else {
                              optBg = 'bg-slate-50/40 border-2 border-slate-100 text-slate-400';
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={hasSubmitted}
                              onClick={() => handleSelectCaseAnswer(qIdx, opt)}
                              className={`w-full p-3.5 rounded-2xl text-left text-xs leading-normal transition-all hover:scale-[1.01] active:scale-[0.99] shadow-sm font-semibold select-all ${optBg}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {/* Question actions / feedback */}
                      {!hasSubmitted ? (
                        <button
                          disabled={!chosenValue}
                          onClick={() => handleSubmitQuestionAnswer(qIdx)}
                          className="px-4 py-2 mt-1 text-[10px] font-black uppercase rounded-xl bg-indigo-600 hover:opacity-95 text-white active:scale-95 transition shadow-lg shadow-indigo-100"
                        >
                          Submit Answer
                        </button>
                      ) : (
                        <div className="p-4 rounded-2xl bg-white border-2 border-slate-150 text-xs leading-relaxed space-y-1 md:space-y-1.5 shadow-sm">
                          <span className="flex items-center gap-1 font-black text-[10px] uppercase tracking-wider text-teal-600">
                            <BadgeCheck size={12} strokeWidth={3} /> Clinical Explanation
                          </span>
                          <p className="text-slate-700 font-sans leading-relaxed font-semibold">
                            {q.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Reset simulator control */}
              <div className="py-2 flex gap-2 select-none">
                <button
                  onClick={handleGenerateCase}
                  className="w-full py-3 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-800 rounded-2xl text-xs font-black flex items-center justify-center gap-1.5 active:scale-95 transition shadow-sm"
                >
                  <RotateCcw size={12} strokeWidth={2.5} /> Next Clinical Case Analysis
                </button>
              </div>

            </div>
          )}
        </div>
      )}

    </div>
  );
}
