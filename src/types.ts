export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  part?: string;
  source: 'Anemia' | 'Cytology';
}

export type LearningBox = 'New' | 'Learning' | 'Review' | 'Mastered';

export interface UserProgress {
  cardId: string;
  box: LearningBox;
  lastReviewed: string; // ISO string
  intervalDays: number;
}

export interface CustomFlashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  scenario: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}
