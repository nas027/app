import React, { useEffect, useState, useRef } from 'react';
import { CyberButton } from './CyberButton';
import { Mission, MissionStatus } from '../types';
import { MAX_TIME_SECONDS } from '../constants';

interface MissionScreenProps {
  mission: Mission;
  onCapture: (file: File) => void;
  status: MissionStatus;
  onBack: () => void;
}

export const MissionScreen: React.FC<MissionScreenProps> = ({ mission, onCapture, status, onBack }) => {
  const [timeLeft, setTimeLeft] = useState(MAX_TIME_SECONDS);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === MissionStatus.ANALYZING) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onCapture(e.target.files[0]);
    }
  };

  const triggerCamera = () => {
    fileInputRef.current?.click();
  };

  const isAnalyzing = status === MissionStatus.ANALYZING;

  return (
    <div className="flex flex-col h-screen bg-cyber-black relative overflow-hidden">
      {/* HUD Overlay */}
      <div className="absolute top-0 left-0 w-full p-4 z-20 bg-gradient-to-b from-cyber-black/90 to-transparent">
        <div className="flex justify-between items-center mb-2">
            <button onClick={onBack} className="text-cyber-neonBlue text-sm font-mono">&lt; ยกเลิก</button>
            <div className={`font-mono text-2xl font-bold ${timeLeft < 10 ? 'text-cyber-neonPink animate-pulse' : 'text-cyber-neonGreen'}`}>
            T-{timeLeft.toString().padStart(2, '0')}s
            </div>
        </div>
        <h2 className="text-white font-bold text-lg border-l-4 border-cyber-neonBlue pl-3">
          {mission.title}
        </h2>
        <p className="text-cyber-neonBlue mt-1 text-sm bg-cyber-black/50 p-2 rounded">
          {mission.description}
        </p>
      </div>

      {/* Viewfinder Area (Mock) */}
      <div className="flex-1 relative bg-gray-900 flex items-center justify-center overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#39ff14 1px, transparent 1px), linear-gradient(90deg, #39ff14 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Crosshair */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
            <div className="w-64 h-64 border-2 border-cyber-neonGreen/50 relative">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-cyber-neonGreen"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-cyber-neonGreen"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-cyber-neonGreen"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-cyber-neonGreen"></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyber-neonPink rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            </div>
        </div>

        {isAnalyzing && (
            <div className="absolute inset-0 bg-cyber-black/80 z-50 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-cyber-neonGreen border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-cyber-neonGreen font-mono animate-pulse">กำลังวิเคราะห์...</p>
            </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-cyber-black p-6 z-20 flex justify-center pb-10">
        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          disabled={isAnalyzing}
        />
        
        <button 
            onClick={triggerCamera}
            disabled={isAnalyzing}
            className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center relative group active:scale-95 transition-transform"
        >
            <div className="w-16 h-16 bg-white rounded-full group-hover:bg-cyber-neonPink transition-colors"></div>
            {/* Outer Glow */}
            <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] group-hover:shadow-[0_0_30px_rgba(255,0,255,0.8)] transition-shadow"></div>
        </button>
      </div>
    </div>
  );
};
