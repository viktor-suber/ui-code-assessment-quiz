import React, { useEffect, useState } from 'react';
import { Multiple } from '../../components/Multiple/Multiple';
import { Boolean } from '../../components/Boolean/Boolean';
import { TextQuestion } from '../../components/TextQuestion/TextQuestion';
import { Summary } from '../../components/Summary/Summary';

interface Props {
    bool: Array<any>,
    multiple: Array<any>,
    text: Array<any>
}

export const Quiz: React.FC<Props> = (props) => {

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

        console.log('LAST QUESTION TYPE', lastQuestionType);

        if ((booleanCount < 200) && lastQuestionType !== 'boolean') {
            console.log('PASSED BOOLEAN', lastQuestionType);
            types.push('boolean');
        }
        if ((textCount < 100) && lastQuestionType !== 'text') {
            types.push('text');
            console.log('PASSED TEXT', lastQuestionType);
        } if ((multipleCount < 900) && lastQuestionType !== 'multiple') {
            types.push('multiple');
            console.log('PASSED multiple', lastQuestionType);
        }

        // Randomly determine which type of question to select
        setCurrentQuestionType(types[Math.floor(Math.random() * types.length)]);

        // setCurrentQuestionType('multiple');

        // Set current question
        if (currentQuestionType === 'boolean') {

          const questionObject = {
              question: props.bool[booleanCount] ? props.bool[booleanCount].question : null,
              correctAnswer: props.bool[booleanCount] ? props.bool[booleanCount].correct_answer : null,
              answers: []
          };

          setCurrentQuestionObject(questionObject);

          // remove that question from object

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
        if (!submittedOnce) {
            let newScoreData = scoreData;

            (event.toLowerCase() === currentQuestionObject.correctAnswer.toLowerCase()) ? newScoreData.correct++ : newScoreData.wrong++;
    
            setScoreData(newScoreData);
    
            // const correct = (event === currentQuestionObject.correctAnswer.toLowerCase()) ? true : false;
            // console.log('ANSWER IS CORRECT', correct);
    
            // console.log('SCORE DATA', scoreData);
        } else {
            // add to count
            
            switch(currentQuestionType) {
              case 'boolean':
              setBooleanCount(booleanCount + 1);
              console.log('BOOL COUNT', booleanCount);
              break;
              case 'text': 
              setTextCount(textCount + 1);
              console.log('TEXT COUNT', textCount);
              break;
              case 'multiple':
              setMultipleCount(multipleCount + 1);
              console.log('MULTIPLE COUNT', multipleCount);
            }

            console.log('CURRENT QUESTION TYPE 114', currentQuestionType);
            setLastQuestionType(currentQuestionType);
            console.log('LAST QUESTION TYPE 117', lastQuestionType);

            //check if there are questions left
            if (booleanCount === 2 && textCount === 1 && multipleCount === 9) {
              setQuizEnd(true);
            }
            //change to next question if questions are left

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