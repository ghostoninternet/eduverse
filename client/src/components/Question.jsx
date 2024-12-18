import { useState, useEffect } from "react";
import Choice from "./Choice";
import PropTypes from "prop-types";
const Question = ({ choices, index, question, isAnswer, isSubmitted, onCorrectAnswer}) => {
  const labels = ["A", "B", "C", "D"];
  const [isSelected, setIsSelected] = useState("");
  const handleSelectChoice = (choice) => {
    setIsSelected(choice);
  };
  useEffect(() => {
    if (isSubmitted) {
      const isCorrect = isSelected === isAnswer;
      onCorrectAnswer(isCorrect); 
    }
  }, [isSubmitted]);
  return (
    <div className="flex flex-col gap-y-4 mt-10">
      <h2 className="text-2xl font-semibold italic">
        Question {index}: {question}
      </h2>
      <div className="flex flex-col gap-y-3">
        {choices?.map((choice, index) => (
          <Choice
            isSelected={isSelected === choice}
            key={index}
            label={labels[index]}
            content={choice}
            handleSelectChoice={() => handleSelectChoice(choice)}
            isAnswer={isAnswer === choice}
            isSubmitted={isSubmitted}
          />
        ))}
      </div>
    </div>
  );
};
Question.propTypes = {
  choices: PropTypes.array,
  index: PropTypes.number,
  question: PropTypes.string,
  isAnswer: PropTypes.string,
  isSubmitted: PropTypes.bool,
  onCorrectAnswer: PropTypes.func
};
export default Question;
