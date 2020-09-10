export interface Multi {
  question: string;
  answers: string[];
  correctAnswer: string;
  handleSelectedAnswer: (event: any, selectedAnswer: boolean) => void;
}