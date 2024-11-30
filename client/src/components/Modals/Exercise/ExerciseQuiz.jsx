import React from 'react'

function ExerciseQuiz({ quiz, index }) {
  return (
    <div className='mb-4 px-2 py-1 bg-slate-200 rounded-xl'>
      <div className='mb-1'>
        <span className='text-sm font-bold sm:text-base'>Question {index + 1}: </span>
        {quiz.question}
      </div>
      <div className='ml-3'>
        {
          quiz.options.map((option) => (
            <div className='mb-1'>
              <span className={`text-sm font-bold sm:text-base ${quiz.answer == option ? 'text-green-600' : ''}`}>A. </span> <span className={`${quiz.answer == option ? 'text-green-600' : ''}`}>{option}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ExerciseQuiz