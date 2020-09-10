import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { fixUnicode } from "../methods";
import { BooleanInterface } from "../interfaces";

export const Boolean: React.FC<BooleanInterface> = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const [answerIsCorrect, setAnswerisCorrect] = useState(false);
  const [submittedOnce, setSubmittedOnce] = useState(false);

  useEffect(() => {
    setQuestion(fixUnicode(props.question));
    setCorrectAnswer(fixUnicode(props.correctAnswer));
  }, [props]);

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
    <div className="boolean">
      <div className="question">{question}</div>
      {questionSubmitted && (
        <div className="correct-indicator">
          {answerIsCorrect && <span className="correct-message">CORRECT!</span>}{" "}
          {!answerIsCorrect && (
            <span>
              <span className="incorrect-message">WRONG</span>
              <b>Correct Answer: </b> {correctAnswer}
            </span>
          )}
        </div>
      )}
      <form className="question-list" onSubmit={handleSubmit(onSubmit)}>
        <div className={`answer-list ${errors.answer ? "answer-error" : null}`}>
          <label
            className={`option ${
              correctAnswer === "True" ? "correct" : "incorrect"
            } ${questionSubmitted ? "submitted" : null}`}
          >
            <input
              className="radio"
              type="radio"
              value="true"
              name="answer"
              ref={register({ required: true })}
            />
            True
          </label>
          <label
            className={`option ${
              correctAnswer === "False" ? "correct" : "incorrect"
            } ${questionSubmitted ? "submitted" : null}`}
          >
            <input
              className="radio"
              type="radio"
              value="false"
              name="answer"
              ref={register({ required: true })}
            />
            False
          </label>
          {errors.answer && (
            <div className="error">ERROR: Selection is required</div>
          )}
        </div>
        <button className="button" type="submit">
          <span className="button-text">Next</span>
        </button>
      </form>
    </div>
  );
};
