import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface TextQuestion {
  question: string;
  correctAnswer: string;
  handleSelectedAnswer: (event: any, selectedAnswer: boolean) => void;
}

export const TextQuestion: React.FC<TextQuestion> = (props) => {

  const { register, handleSubmit, errors } = useForm();

  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const [answerIsCorrect, setAnswerisCorrect] = useState(false);
  const [submittedOnce, setSubmittedOnce] = useState(false);

  useEffect(() => {
    const newQuestion = fixUnicode(props.question);
    setQuestion(newQuestion);
    setCorrectAnswer(props.correctAnswer);
  }, [props, question, questionSubmitted]);

  const fixUnicode = (string: any) => {
    if (!string) {
      return null;
    }
    return string.replace(/&quot;/g, '"')
    .replace(/no-scope&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&');
  };


  const onSubmit = (event: any) => {

    if (!submittedOnce) {
      if (correctAnswer.toLowerCase() === event.answer.toLowerCase()) {
        setAnswerisCorrect(true);
      }
      setQuestionSubmitted(true);
      setSubmittedOnce(true);
    }

    props.handleSelectedAnswer(event.answer, submittedOnce);
  };

  return (
    <div className="text">
      <div className="question">{question}</div>
      {questionSubmitted && <div className="correct-indicator">{answerIsCorrect && <span className="correct-message">CORRECT!</span>} {!answerIsCorrect && <span><span className="incorrect-message">WRONG</span><b>Correct Answer: </b> {correctAnswer}</span>}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`answer-list ${errors.answer ? 'answer-error' : null}`}>
        <label className={`option no-hover`}>
          <input type="text" className="text-input" name="answer" ref={register({required: true})}/>
        </label>
        {errors.answer && <div className="error">ERROR: Blank fields not valid</div>}
          </div>
          <button className="button" type="submit"><span className="button-text">Next</span></button>
      </form>
    </div>
  );
};