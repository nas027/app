import React, { useEffect } from 'react';
import { CyberButton } from './CyberButton';
import { AnalysisResult, Mission } from '../types';

interface ResultScreenProps {
  result: AnalysisResult;
  imageSrc: string;
  mission: Mission;
  onNext: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ result, imageSrc, mission, onNext }) => {
  const isSuccess = result.status === 'success';

  useEffect(() => {
    if (isSuccess) {
      // Simple Sound Effect
      const synth = window.speechSynthesis;
      if (synth) {
        const utter = new SpeechSynthesisUtterance("Mission Complete");
        synth.speak(utter);
      }
    }
  }, [isSuccess]);

  const speakWord = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      const utter = new SpeechSynthesisUtterance(result.vocab_en);
      utter.lang = 'en-US';
      synth.speak(utter);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cyber-black p-4 text-white overflow-y-auto">
      {/* Header Status */}
      <div className={`text-center py-4 border-b-2 ${isSuccess ? 'border-cyber-neonGreen' : 'border-cyber-neonPink'} mb-4`}>
        <h1 className={`text-4xl font-black italic ${isSuccess ? 'text-cyber-neonGreen' : 'text-cyber-neonPink'} animate-pulse`}>
          {isSuccess ? 'ภารกิจสำเร็จ!' : 'ลองใหม่อีกครั้ง'}
        </h1>
      </div>

      {/* Image Result */}
      <div className="relative rounded-lg overflow-hidden border-2 border-gray-700 mb-6 aspect-square max-h-[40vh] mx-auto w-full max-w-sm">
        <img src={imageSrc} alt="Captured" className="w-full h-full object-cover" />
        <div className={`absolute inset-0 border-4 ${isSuccess ? 'border-cyber-neonGreen' : 'border-cyber-neonPink'} opacity-50`}></div>
        {/* Scan line overlay */}
        <div className="scan-line"></div>
      </div>

      {/* AI Analysis */}
      <div className="flex-1 flex flex-col gap-4 max-w-md mx-auto w-full">
        <div className="bg-cyber-dark p-4 rounded-lg border border-gray-700">
            <h3 className="text-gray-400 text-xs font-mono mb-1">> วัตถุที่พบ (OBJECT DETECTED)</h3>
            <p className="text-xl font-bold text-white capitalize">{result.object_name}</p>
        </div>

        {isSuccess && (
            <div className="bg-gradient-to-r from-cyber-neonGreen/20 to-transparent p-4 rounded-lg border-l-4 border-cyber-neonGreen">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-cyber-neonGreen text-xs font-mono mb-1">> คำศัพท์ที่ได้รับ</h3>
                        <p className="text-3xl font-bold text-white">{result.vocab_en}</p>
                        <p className="text-xl text-gray-300">{result.vocab_th}</p>
                    </div>
                    <button 
                        onClick={speakWord}
                        className="p-3 bg-cyber-neonGreen/20 rounded-full hover:bg-cyber-neonGreen/40 active:scale-95 transition-colors"
                        aria-label="Speak word"
                    >
                        🔊
                    </button>
                </div>
            </div>
        )}

        <div className={`p-4 rounded-lg border ${isSuccess ? 'border-cyber-neonGreen/30 bg-cyber-neonGreen/5' : 'border-cyber-neonPink/30 bg-cyber-neonPink/5'}`}>
            <h3 className={`text-xs font-mono mb-2 ${isSuccess ? 'text-cyber-neonGreen' : 'text-cyber-neonPink'}`}>
                > ความเห็นจาก AI
            </h3>
            <p className="text-sm font-mono leading-relaxed">
                "{result.comment}"
            </p>
        </div>

        <div className="mt-auto pt-6">
            <CyberButton onClick={onNext} fullWidth variant={isSuccess ? 'primary' : 'danger'}>
                {isSuccess ? 'ด่านถัดไป' : 'ลองใหม่อีกครั้ง'}
            </CyberButton>
        </div>
      </div>
    </div>
  );
};
