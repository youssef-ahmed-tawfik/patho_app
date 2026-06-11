import React, { useState, useEffect } from 'react';
import { Smartphone, Battery, Wifi, Signal, Info, Award } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  isApiKeyConfigured: boolean;
}

export default function MobileFrame({ children, isApiKeyConfigured }: MobileFrameProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center p-0 md:p-6 text-slate-800 font-sans antialiased overflow-hidden">
      
      {/* Background ambient visuals */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-200 rounded-full blur-[120px] opacity-40 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-200 rounded-full blur-[140px] opacity-40 pointer-events-none animate-pulse"></div>

      {/* Desktop Container Wrapper with Vibrant outline device styling */}
      <div className="relative w-full max-w-md h-[100vh] md:h-[840px] bg-white md:rounded-[3rem] md:shadow-2xl md:border-[10px] md:border-[#1A1A1A] flex flex-col overflow-hidden transition-all duration-300">
        
        {/* Physical camera notch on top of desktop frame representing the exact design */}
        <div className="hidden md:block h-6 w-32 bg-[#1A1A1A] absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl z-50"></div>

        {/* Custom Mobile Header Status Bar (styled corresponding to light layout) */}
        <div className="bg-slate-50/95 sticky top-0 px-6 pt-5 pb-2 flex justify-between items-center text-[11px] font-bold tracking-wider text-slate-500 border-b border-slate-100 z-40">
          <span className="font-bold tracking-tight text-slate-800">{time}</span>
          
          <div className="flex items-center gap-1.5">
            {!isApiKeyConfigured && (
              <span className="flex items-center gap-1 px-1.5 py-0.5 bg-rose-50 border border-rose-205 text-rose-600 rounded text-[9px] font-bold animate-pulse">
                <Info size={9} /> AI Keys missing
              </span>
            )}
            <Signal size={12} className="text-indigo-500" />
            <Wifi size={12} className="text-indigo-500" />
            <div className="flex items-center gap-0.5">
              <span className="text-[9px] text-slate-600">100%</span>
              <Battery size={13} className="text-teal-600 fill-teal-550" />
            </div>
          </div>
        </div>

        {/* Application Core Content Viewport with high-contrast light setup */}
        <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative bg-white scrollbar-none">
          {children}
        </div>

        {/* Interactive physical home button simulator for desktop frame */}
        <div className="hidden md:flex bg-slate-50 justify-center py-2.5 border-t border-slate-100 sticky bottom-0 z-40">
          <div className="w-32 h-1.5 bg-slate-305 rounded-full"></div>
        </div>

      </div>
    </div>
  );
}
