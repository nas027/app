import React from 'react';
import { CyberButton } from './CyberButton';

interface TutorialScreenProps {
  onPlay: () => void;
  onViewCollection: () => void;
}

export const TutorialScreen: React.FC<TutorialScreenProps> = ({ onPlay, onViewCollection }) => {
  return (
    <div className="flex flex-col min-h-screen bg-cyber-dark p-6 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-neonPink/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <h2 className="text-3xl font-bold text-cyber-neonGreen mb-8 font-mono border-b border-cyber-neonGreen pb-2">
        วิธีเล่น (HOW TO PLAY)
      </h2>

      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-cyber-glass border border-cyber-neonBlue/30 p-4 rounded-lg flex items-center gap-4">
          <div className="text-4xl">👁️</div>
          <div>
            <h3 className="text-cyber-neonBlue font-bold text-xl">LOOK (มองหา)</h3>
            <p className="text-gray-300 text-sm">อ่านโจทย์ภารกิจและมองหาวัตถุรอบตัว</p>
          </div>
        </div>

        <div className="bg-cyber-glass border border-cyber-neonBlue/30 p-4 rounded-lg flex items-center gap-4">
          <div className="text-4xl">📸</div>
          <div>
            <h3 className="text-cyber-neonBlue font-bold text-xl">SNAP (ถ่ายรูป)</h3>
            <p className="text-gray-300 text-sm">ใช้กล้องมือถือถ่ายภาพวัตถุนั้น</p>
          </div>
        </div>

        <div className="bg-cyber-glass border border-cyber-neonBlue/30 p-4 rounded-lg flex items-center gap-4">
          <div className="text-4xl">🤖</div>
          <div>
            <h3 className="text-cyber-neonBlue font-bold text-xl">CHECK (ตรวจสอบ)</h3>
            <p className="text-gray-300 text-sm">ให้ AI ตรวจสอบและสะสมการ์ดคำศัพท์</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-8 mb-4">
        <CyberButton onClick={onPlay} fullWidth>
          เริ่มปฏิบัติการ
        </CyberButton>
        <CyberButton onClick={onViewCollection} variant="secondary" fullWidth>
          ดูสมุดสะสม
        </CyberButton>
      </div>
    </div>
  );
};
