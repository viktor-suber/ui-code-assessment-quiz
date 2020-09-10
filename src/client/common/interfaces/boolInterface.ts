export interface Bool {
  question: string;
  correctAnswer: string;
  handleSelectedAnswer: (event: any, selectedAnswer: boolean) => void;
}