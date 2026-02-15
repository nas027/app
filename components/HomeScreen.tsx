import React from 'react';
import { CyberButton } from './CyberButton';

interface HomeScreenProps {
  onStart: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-[url('https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=2676&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat relative">
      <div className="absolute inset-0 bg-cyber-black/80 z-0"></div>
      
      <div className="z-10 flex flex-col items-center gap-8 w-full max-w-md">
        <div className="relative group cursor-default">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyber-neonPink to-cyber-neonBlue rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-fast"></div>
            <div className="relative p-6 bg-cyber-black ring-1 ring-gray-900/5 leading-none flex items-top justify-start space-x-6">
                <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyber-neonGreen via-cyber-neonBlue to-cyber-neonPink cyber-glitch">
                    LINGUA<br/>HUNTER<br/>AI
                </h1>
            </div>
        </div>

        <p className="text-cyber-neonBlue font-mono text-lg tracking-wide border-l-4 border-cyber-neonPink pl-4 text-left w-full bg-cyber-black/50 p-2">
          > ระบบ: ออนไลน์<br/>
          > ภารกิจ: รวบรวมข้อมูล<br/>
          > เป้าหมาย: วัตถุบนโลกมนุษย์
        </p>

        <CyberButton onClick={onStart} fullWidth className="text-xl">
          เริ่มภารกิจ
        </CyberButton>
      </div>

      <footer className="absolute bottom-4 text-gray-500 text-xs font-mono z-10">
        Created by Senior Frontend Hunter Corp.
      </footer>
    </div>
  );
};
