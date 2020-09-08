import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface TextQuestion {
  question: string;
  correctAnswer: string;
  handleSelectedAnswer: (event: any) => string;
}

export const TextQuestion: React.FC<TextQuestion> = (props) => {

  const { register, handleSubmit, errors } = useForm();

  const [question, setQuestion] = useState('');

  useEffect(() => {
    setQuestion(props.question);
  }, [props]);

  const onSubmit = (event: any) => {
    props.handleSelectedAnswer(event.answer);
  };

  return (
    <div className="text">
      <div className="question">{question}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input type="text" name="answer" ref={register({required: true})}/>
        </label>
        <div className="error">
          {errors.answer && "ERROR: Blank answers are not valid"}
          </div>
        <button className="button" type="submit"><span className="button-text">Next</span></button>
      </form>
    </div>
  );
};