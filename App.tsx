import React, { useState, useCallback } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { TutorialScreen } from './components/TutorialScreen';
import { MissionScreen } from './components/MissionScreen';
import { ResultScreen } from './components/ResultScreen';
import { CollectionScreen } from './components/CollectionScreen';
import { ScreenState, MissionStatus, Mission, AnalysisResult, CollectedItem } from './types';
import { MISSIONS } from './constants';
import { analyzeMissionImage } from './services/geminiService';

const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>(ScreenState.HOME);
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const [missionStatus, setMissionStatus] = useState<MissionStatus>(MissionStatus.PENDING);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [collection, setCollection] = useState<CollectedItem[]>([]);

  // Navigation Handlers
  const goHome = () => setScreen(ScreenState.HOME);
  const startTutorial = () => setScreen(ScreenState.TUTORIAL);
  const startMission = () => {
    setMissionStatus(MissionStatus.PENDING);
    setCapturedImage(null);
    setAnalysisResult(null);
    setScreen(ScreenState.MISSION);
  };
  const showCollection = () => setScreen(ScreenState.COLLECTION);

  const handleCapture = useCallback(async (file: File) => {
    if (!file) return;

    // Convert to Base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      setCapturedImage(base64String);
      setMissionStatus(MissionStatus.ANALYZING);

      // Strip prefix for API
      const base64Data = base64String.split(',')[1];
      const currentMission = MISSIONS[currentMissionIndex];

      // Call Gemini API
      const result = await analyzeMissionImage(base64Data, currentMission.description);
      
      setAnalysisResult(result);
      setMissionStatus(result.status === 'success' ? MissionStatus.SUCCESS : MissionStatus.FAIL);
      setScreen(ScreenState.RESULT);

      if (result.status === 'success') {
        addToCollection(result, base64String);
      }
    };
    reader.readAsDataURL(file);
  }, [currentMissionIndex]);

  const addToCollection = (result: AnalysisResult, imageUrl: string) => {
    setCollection(prev => {
        // Avoid duplicates by vocab name
        if (prev.some(item => item.vocab_en.toLowerCase() === result.vocab_en.toLowerCase())) {
            return prev;
        }
        return [{
            id: Date.now().toString(),
            vocab_en: result.vocab_en,
            vocab_th: result.vocab_th,
            imageUrl: imageUrl,
            timestamp: Date.now()
        }, ...prev];
    });
  };

  const handleNext = () => {
    if (missionStatus === MissionStatus.SUCCESS) {
      // Move to next mission or loop back
      setCurrentMissionIndex(prev => (prev + 1) % MISSIONS.length);
      startMission();
    } else {
      // Retry same mission
      startMission();
    }
  };

  // Render Logic
  const renderScreen = () => {
    switch (screen) {
      case ScreenState.HOME:
        return <HomeScreen onStart={startTutorial} />;
      case ScreenState.TUTORIAL:
        return <TutorialScreen onPlay={startMission} onViewCollection={showCollection} />;
      case ScreenState.MISSION:
        return (
          <MissionScreen 
            mission={MISSIONS[currentMissionIndex]} 
            onCapture={handleCapture}
            status={missionStatus}
            onBack={startTutorial}
          />
        );
      case ScreenState.RESULT:
        return (
          analysisResult && capturedImage ? (
            <ResultScreen 
              result={analysisResult} 
              imageSrc={capturedImage}
              mission={MISSIONS[currentMissionIndex]}
              onNext={handleNext}
            />
          ) : <div>Error: Missing Data</div>
        );
      case ScreenState.COLLECTION:
        return <CollectionScreen collection={collection} onBack={startTutorial} />;
      default:
        return <HomeScreen onStart={startTutorial} />;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-cyber-black min-h-screen shadow-2xl overflow-hidden relative">
       {/* Global Scanline Effect */}
       <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] pointer-events-none" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}></div>
      {renderScreen()}
    </div>
  );
};

export default App;
