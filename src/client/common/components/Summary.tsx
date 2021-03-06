import React, { useState, useEffect } from "react";
import { SummaryInterface } from "../interfaces";

export const Summary: React.FC<SummaryInterface> = (props: any) => {
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    setCorrect(props.scoreData.correct);
    setWrong(props.scoreData.wrong);
  }, [props]);

  useEffect(() => {
    setQuestionsAnswered(correct + wrong);
    setFinalScore(Math.round((correct / (correct + wrong)) * 100));
  }, [props, correct, wrong]);

  return (
    <div className="summary">
      <div className="summary-header">SUMMARY</div>
      <ul className="summary-list">
        <li>
          Correct: <b>{correct}</b>
        </li>
        <li>
          Wrong: <b>{wrong}</b>
        </li>
        <li>
          Questions Answered: <b>{questionsAnswered}</b>
        </li>
        <li>
          Final Score: <b>{finalScore}%</b>
        </li>
      </ul>
    </div>
  );
};
