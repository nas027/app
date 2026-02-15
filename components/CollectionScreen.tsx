import React from 'react';
import { CyberButton } from './CyberButton';
import { CollectedItem } from '../types';

interface CollectionScreenProps {
  collection: CollectedItem[];
  onBack: () => void;
}

export const CollectionScreen: React.FC<CollectionScreenProps> = ({ collection, onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-cyber-black p-4 text-white">
      <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
        <h2 className="text-2xl font-bold text-cyber-neonBlue font-mono">ฐานข้อมูล (DATABASE)</h2>
        <button onClick={onBack} className="text-sm text-gray-400 hover:text-white">ปิด [X]</button>
      </div>

      {collection.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-500 font-mono gap-4">
          <div className="text-6xl opacity-20">📂</div>
          <p>ยังไม่มีข้อมูลสะสม</p>
          <p className="text-xs">เริ่มภารกิจเพื่อเติมเต็มฐานข้อมูล</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 auto-rows-max">
          {collection.map((item) => (
            <div key={item.id} className="bg-cyber-dark rounded-lg overflow-hidden border border-gray-800 group hover:border-cyber-neonBlue transition-colors">
              <div className="aspect-square bg-gray-900 relative">
                <img src={item.imageUrl} alt={item.vocab_en} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-3">
                <h3 className="text-cyber-neonGreen font-bold text-lg">{item.vocab_en}</h3>
                <p className="text-gray-400 text-sm">{item.vocab_th}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6">
          <CyberButton onClick={onBack} variant="secondary" fullWidth>
              กลับสู่เมนูหลัก
          </CyberButton>
      </div>
    </div>
  );
};
