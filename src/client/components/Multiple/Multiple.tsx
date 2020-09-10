import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Multiple {
  question: string,
  answers: string[],
  correctAnswer: string,
  handleSelectedAnswer: (event: any, selectedAnswer: boolean) => void;
}

export const Multiple: React.FC<Multiple> = (props) => {

  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [answers, setAnswers] = useState(['']);
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const [answerIsCorrect, setAnswerisCorrect] = useState(false);
  const [submittedOnce, setSubmittedOnce] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const tempQuestion = 'Which company did Valve cooperate with in the creation of the Vive?';

  const tempAnswers = ["HTC",  "Oculus", "Google", "Razer"];

  const tempCorrectAnswer = "HTC";


  useEffect(() => {
    console.log('PROPS', props);
    // setQuestion(props.question);
    // setCorrectAnswer(props.correctAnswer);
    // setAnswers(props.answers);

    setQuestion(tempQuestion);
    setCorrectAnswer(tempCorrectAnswer);
    setAnswers(tempAnswers);

  }, []);

  const onSubmit = (event: any) => {
    if (correctAnswer.toLowerCase() === event.answer.toLowerCase()) {
      setAnswerisCorrect(true);
    }
    setQuestionSubmitted(true);
    props.handleSelectedAnswer(event.answer, submittedOnce);
  };

  return (
    <div className="multiple">
      <div className="question">{question}</div>
      {questionSubmitted && <div className="correct-indicator">{answerIsCorrect && <span className="correct-message">CORRECT!</span>} {!answerIsCorrect && <span><span className="incorrect-message">WRONG</span><b>Correct Answer: </b> {correctAnswer}</span>}</div>}
      <form className="question-list" onSubmit={handleSubmit(onSubmit)}>
        {
          answers.map((answer, index) => {
          return (
            <label className={`option ${correctAnswer === answer ? 'correct' : 'incorrect'} ${questionSubmitted ? 'submitted' : null}`} key={index}><input className="radio" type="radio" value={answer} name="answer" ref={register({ required: true })}/>{answer}</label>
          );
          })
        }
        <div className="error">
          {errors.answer && "ERROR: Selection is required"}
          </div>
        <button className="button" type="submit"><span className="button-text">Next</span></button>
      </form>
    </div>
  );
};