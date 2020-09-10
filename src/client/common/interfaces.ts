export interface PropsInterface {
  bool: Array<any>;
  multiple: Array<any>;
  text: Array<any>;
}

export interface BooleanInterface {
  question: string;
  correctAnswer: string;
  handleSelectedAnswer: (event: any, selectedAnswer: boolean) => void;
}

export interface TextInterface {
  question: string;
  correctAnswer: string;
  handleSelectedAnswer: (event: any, selectedAnswer: boolean) => void;
}

export interface MultipleInterface {
  question: string;
  answers: string[];
  correctAnswer: string;
  handleSelectedAnswer: (event: any, selectedAnswer: boolean) => void;
}

export interface SummaryInterface {
  scoreData: {
    correct: number;
    wrong: number;
  }
}

