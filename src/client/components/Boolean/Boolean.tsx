import React from 'react';

export const Boolean = (question: object) => {

  const q = 'Igneous rocks are formed by excessive heat and pressure.';

  // make answer case insensitive

  const correct_answer = false;

  return (
    <div className="boolean">
      <span className="question">{q}</span>
    </div>
  );
};