export enum ScreenState {
  HOME = 'HOME',
  TUTORIAL = 'TUTORIAL',
  MISSION = 'MISSION',
  RESULT = 'RESULT',
  COLLECTION = 'COLLECTION',
}

export enum MissionStatus {
  PENDING = 'PENDING',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export interface Mission {
  id: number;
  title: string;
  description: string;
  targetKeywords: string[];
}

export interface AnalysisResult {
  status: 'success' | 'fail';
  object_name: string;
  vocab_en: string;
  vocab_th: string;
  comment: string;
}

export interface CollectedItem {
  id: string;
  vocab_en: string;
  vocab_th: string;
  imageUrl: string;
  timestamp: number;
}
