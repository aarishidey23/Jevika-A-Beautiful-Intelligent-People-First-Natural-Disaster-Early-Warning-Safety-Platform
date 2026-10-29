import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Globe, 
  Headphones,
  Signal,
  CheckCircle2
} from 'lucide-react';
import { BROADCAST_SCRIPTS } from '../data/mockData';
import { SupportedLanguage } from '../types';

interface EmergencyRadioProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const EmergencyRadio: React.FC<EmergencyRadioProps> = ({
  language,
  onLanguageChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [spokenProgress, setSpokenProgress] = useState(0);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const script = BROADCAST_SCRIPTS[language] || BROADCAST_SCRIPTS.en;

  // Cleanup speech synthesis on unmount or lang change
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setSpokenProgress(0);
  }, [language]);

  const handleTogglePlay = () => {
    if (!('speechSynthesis' in window)) {
      // Fallback simulated progress
      setIsPlaying(!isPlaying);
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(script.body);
      utterance.rate = playbackRate;
      
      // Match voice language if available
      if (language === 'hi') utterance.lang = 'hi-IN';
      else if (language === 'bn') utterance.lang = 'bn-IN';
      else utterance.lang = 'en-US';

      utterance.onend = () => {
        setIsPlaying(false);
        setSpokenProgress(100);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (isPlaying && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(script.body);
      utterance.rate = rate;
      if (language === 'hi') utterance.lang = 'hi-IN';
      else if (language === 'bn') utterance.lang = 'bn-IN';
      else utterance.lang = 'en-US';
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setSpokenProgress(0);
  };

  return (
    <div className="space-y-6">
      {/* Radio Player Masthead */}
      <div className="bg-white rounded-3xl border border-[#263746]/10 shadow-md overflow-hidden">
        
        {/* Ivory to Sky Atmospheric Gradient Header */}
        <div className="bg-gradient-to-r from-[#FAFBF7] via-[#ecf4ff] to-[#DCEFFC] p-6 sm:p-8 border-b border-[#263746]/8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-[#167D78] shadow-xs">
                  <Signal className="w-3.5 h-3.5 text-[#3D9368]" />
                  <span>FM 104.2 MHz Simulation · Drill Mode</span>
                </span>
                <span aria-hidden="true" className="text-[#263746]/30">·</span>
                <span className="text-xs font-semibold text-[#263746]/60">
                  Synthesized Speech Exercise
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#263746] tracking-tight">
                Simulated Audio Broadcast
              </h2>
              <p className="text-sm text-[#263746]/80 mt-1 max-w-xl">
                Demonstration speech synthesizer. In an actual natural disaster, please tune a physical battery-powered radio to All India Radio or local FM channels.
              </p>
            </div>

            {/* Language Switcher inside Radio */}
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs p-1.5 rounded-2xl border border-[#263746]/10 shrink-0">
              <Globe className="w-4 h-4 text-[#167D78] ml-2" />
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  language === 'en' ? 'bg-[#167D78] text-white' : 'text-[#263746]/70 hover:text-[#263746]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  language === 'hi' ? 'bg-[#167D78] text-white' : 'text-[#263746]/70 hover:text-[#263746]'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => onLanguageChange('bn')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  language === 'bn' ? 'bg-[#167D78] text-white' : 'text-[#263746]/70 hover:text-[#263746]'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>

          {/* Interactive Player Deck */}
          <div className="mt-6 bg-white rounded-2xl border border-[#263746]/10 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Play/Pause Button (52px ergonomic target) */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={handleTogglePlay}
                className="w-14 h-14 rounded-2xl bg-[#167D78] hover:bg-[#126561] text-white flex items-center justify-center shadow-md active:scale-[0.98] transition-all cursor-pointer shrink-0"
                aria-label={isPlaying ? "Pause broadcast" : "Play broadcast"}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                )}
              </button>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#167D78] block">
                  {isPlaying ? 'Broadcasting Spoken Guidance...' : 'Broadcast Ready'}
                </span>
                <span className="text-sm font-bold text-[#263746]">
                  {script.title}
                </span>
                <span className="text-xs text-[#263746]/60 block">
                  {script.subtitle}
                </span>
              </div>
            </div>

            {/* Audio Waveform / Speed Controls */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <div className="flex items-center gap-1 bg-[#FAFBF7] px-3 py-1.5 rounded-xl border border-[#263746]/10 text-xs font-semibold text-[#263746]">
                <span>Speed:</span>
                <button
                  onClick={() => handleRateChange(0.85)}
                  className={`px-2 py-0.5 rounded-lg cursor-pointer ${playbackRate === 0.85 ? 'bg-[#167D78] text-white font-bold' : 'text-[#263746]/60'}`}
                >
                  0.8x (Clear)
                </button>
                <button
                  onClick={() => handleRateChange(1.0)}
                  className={`px-2 py-0.5 rounded-lg cursor-pointer ${playbackRate === 1.0 ? 'bg-[#167D78] text-white font-bold' : 'text-[#263746]/60'}`}
                >
                  1.0x
                </button>
              </div>

              <button
                onClick={handleStop}
                title="Reset broadcast"
                className="p-2 rounded-xl text-[#263746]/70 hover:bg-[#ecf4ff] transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Live Audio Transcript Display */}
        <div className="p-6 sm:p-8">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#263746]/60 mb-3 flex items-center gap-2">
            <Headphones className="w-4 h-4 text-[#167D78]" />
            <span>Spoken Broadcast Verbatim Transcript</span>
          </h3>

          <div className="bg-[#FAFBF7] border border-[#263746]/8 rounded-2xl p-6 leading-relaxed text-base sm:text-lg text-[#263746] font-medium selection:bg-[#DDF4E9]">
            {script.body}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-[#263746]/60 font-semibold">
            <span>Verified by District Disaster Emergency Operations Center</span>
            <span>Transmission Mode: Continuous Repeating Loop</span>
          </div>
        </div>

      </div>
    </div>
  );
};
