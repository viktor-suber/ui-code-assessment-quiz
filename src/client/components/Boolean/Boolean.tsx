import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Bool {
  question: string;
  correctAnswer: string;
  handleSelectedAnswer: (event: any) => void;
}

export const Boolean: React.FC<Bool> = (props) => {

  const { register, handleSubmit, errors } = useForm();

  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const [answerIsCorrect, setAnswerisCorrect] = useState(false);

  useEffect(() => {
    setQuestion(props.question);
    setCorrectAnswer(props.correctAnswer);
  }, [props]);

  // const answerClassTrue = classNames('option', )

  const onSubmit = (event: any) => {
    console.log('CORRECT ANSWER', correctAnswer);
    if (correctAnswer.toLowerCase() === event.answer.toLowerCase()) {
      setAnswerisCorrect(true);
    }

    setQuestionSubmitted(true);
    props.handleSelectedAnswer(event.answer);
  };

  return (
    <div className="boolean">
      <div className="question">{question}</div>
  {questionSubmitted && <div className="correct-indicator">{answerIsCorrect && 'CORRECT'} {!answerIsCorrect && 'WRONG'}</div>}
      <form className="question-list" onSubmit={handleSubmit(onSubmit)}>
        <label className={`option ${correctAnswer === 'True' ? 'correct' : 'incorrect'} ${questionSubmitted ? 'submitted' : null}`}>
        <input className="radio" type="radio" value="true" name="answer" ref={register({ required: true })} />
        True
        </label>
        <label className={`option ${correctAnswer === 'False' ? 'correct' : 'incorrect'} ${questionSubmitted ? 'submitted' : null}`}>
        <input className="radio"  type="radio" value="false" name="answer" ref={register({ required: true })}/>
        False</label>
        <div className="error">
          {errors.answer && "ERROR: Selection is required"}
          </div>
        <button className="button" type="submit"><span className="button-text">Next</span></button>
      </form>
    </div>
  );
};