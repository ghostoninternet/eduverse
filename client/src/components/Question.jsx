import React, {useState} from 'react'
import Choice from './Choice'
import PropTypes from "prop-types";
const Question = ({choices, index, question}) => {
  const labels = ["A", "B", "C", "D"]
  const [isSelected, setIsSelected] = useState(null)
  const handleSelectChoice = (index) => {
    setIsSelected(index)
  }
  return (
    <div className='flex flex-col gap-y-4 mt-10'>
      <h2 className='text-2xl font-semibold italic'>Question {index}: {question}</h2>
      <div className='flex flex-col gap-y-3'>
        {choices?.map((choice, index) =>(
          <Choice isSelected={isSelected == index} key={index} label={labels[index]} content={choice} handleSelectChoice={() => handleSelectChoice(index)}/>
        ) )}
      </div>
    </div>
  )
}
Question.propTypes = {
  choices: PropTypes.array,
  index: PropTypes.number,
  question: PropTypes.string
};
export default Question
