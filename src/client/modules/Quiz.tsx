import React, { useEffect, useState } from 'react';
import { Multiple } from '../common/components/Multiple';
import { Boolean } from '../common/components/Boolean';
import { TextQuestion } from '../common/components/TextQuestion';
import { Summary } from '../common/components/Summary';
import { PropsInterface } from '../common/interfaces';

export const Quiz: React.FC<PropsInterface> = (props) => {

    const [currentQuestionType, setCurrentQuestionType] = useState('');
    const [booleanCount, setBooleanCount] = useState(0);
    const [textCount, setTextCount] = useState(0);
    const [multipleCount, setMultipleCount] = useState(0);
    const [currentQuestionObject, setCurrentQuestionObject] = useState({question: '', correctAnswer: '', answers: []});
    const [lastQuestionType, setLastQuestionType] = useState('');
    const [scoreData, setScoreData] = useState({correct: 0, wrong: 0});
    const [quizEnd, setQuizEnd] = useState(false);

    useEffect(() => {
        // Check to see if limit for each type of question is met
        const types = [];

        if ((booleanCount < 2) && lastQuestionType !== 'boolean') {
            types.push('boolean');
        }
        if ((textCount < 1) && lastQuestionType !== 'text') {
            types.push('text');
        } if ((multipleCount < 9) && lastQuestionType !== 'multiple') {
            types.push('multiple');
        }

        // Randomly determine which type of question to select
        setCurrentQuestionType(types[Math.floor(Math.random() * types.length)]);


        // Set current question
        if (currentQuestionType === 'boolean') {

          const questionObject = {
              question: props.bool[booleanCount] ? props.bool[booleanCount].question : null,
              correctAnswer: props.bool[booleanCount] ? props.bool[booleanCount].correct_answer : null,
              answers: []
          };

          setCurrentQuestionObject(questionObject);

        } if (currentQuestionType === 'text') {

          const questionObject = {
              question: props.text[textCount] ? props.text[textCount].question : null,
              correctAnswer: props.text[textCount] ? props.text[textCount].correct_answer : null,
              answers: []
          };

          setCurrentQuestionObject(questionObject);
        } if (currentQuestionType === 'multiple') {

            const questionObject = {
                question: props.multiple[multipleCount] ? props.multiple[multipleCount].question : null,
                correctAnswer: props.multiple[multipleCount] ? props.multiple[multipleCount].correct_answer : null,
                answers: props.multiple[multipleCount] ? props.multiple[multipleCount].answers : null
            };

            setCurrentQuestionObject(questionObject);


        }

    }, [props, booleanCount, textCount, multipleCount, currentQuestionType, lastQuestionType]);

    const handleSelectedAnswer = (event: any, submittedOnce: boolean) => {
        // Display the score data before moving to next question
        if (!submittedOnce) {
            let newScoreData = scoreData;

            (event.toLowerCase() === currentQuestionObject.correctAnswer.toLowerCase()) ? newScoreData.correct++ : newScoreData.wrong++;
    
            setScoreData(newScoreData);

        } else {
            // Add to count
            
            switch(currentQuestionType) {
              case 'boolean':
              setBooleanCount(booleanCount + 1);
              break;
              case 'text': 
              setTextCount(textCount + 1);
              break;
              case 'multiple':
              setMultipleCount(multipleCount + 1);
            }

            // Save the last question type to obtain a unique question type each time
            setLastQuestionType(currentQuestionType);

            // Check if there are questions left
            if (booleanCount === 2 && textCount === 1) {
              setQuizEnd(true);
            }

        }

    }

    const restartQuiz = () => {
        window.location.reload(true);
    }
    
    return (
    <div className="questions">
        {!quizEnd && 
        <div>
        {currentQuestionType === 'boolean' && 
        <Boolean question={currentQuestionObject.question} handleSelectedAnswer={handleSelectedAnswer} correctAnswer={currentQuestionObject.correctAnswer}/>}
        {currentQuestionType === 'text' && 
        <TextQuestion question={currentQuestionObject.question} correctAnswer={currentQuestionObject.correctAnswer} handleSelectedAnswer={handleSelectedAnswer} />}
        {currentQuestionType === 'multiple' &&
        <Multiple question={currentQuestionObject && currentQuestionObject.question} answers={currentQuestionObject.answers} correctAnswer={currentQuestionObject.correctAnswer} handleSelectedAnswer={handleSelectedAnswer}/>}

        </div>}

        {quizEnd && 
        <div>
          <Summary scoreData={scoreData} />
          <button className="button" onClick={restartQuiz}>Restart Quiz</button>
        </div>        
        }
    </div>
    );

};