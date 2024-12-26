/* eslint-disable react/prop-types */
import { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import { toast } from 'react-toastify'

function NewExerciseQuiz({
  isOpen,
  setIsOpen,
  handleCancel,
  handleAdd,
}) {
  const [newQuiz, setNewQuiz] = useState({
    question: '',
    choices: [],
    anwser: '',
  })

  const handleDeleteQuiz = (index) => {
    setNewQuiz({
      ...newQuiz,
      choices: [...newQuiz.choices.slice(0, index), ...newQuiz.choices.slice(index + 1)]
    })
  }

  const handleValidateQuiz = () => {
    if (newQuiz.question == '') {
      toast('Please provide the question for this quiz!', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    if (newQuiz.choices.length < 4) {
      toast('Number of quiz choices must be larger than 4', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    if (!newQuiz.choices.includes(newQuiz.anwser)) {
      toast('The answer provided is not available in choices!', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    return true
  }

  const refreshState = () => {
    setNewQuiz({
      question: '',
      choices: [],
      anwser: '',
    })
  }

  return (
    <div
      className={`${isOpen ? '' : 'hidden'} absolute z-[90] top-0 right-0 left-0 bottom-0 bg-slate-950/50 w-full h-full`}>
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className="w-4/5 mx-auto mt-20 p-3 border-2 bg-white rounded-2xl lg:w-3/5 max-h-[70dvh] overflow-auto">
        <div className="flex justify-between mb-4">
          <div className="font-bold text-2xl">New Quiz</div>
          <button onClick={() => { setIsOpen(false) }} className="font-bold rounded-full bg-slate-200 py-1 px-2">
            X
          </button>
        </div>
        <div className="mb-4">
          <div className="flex w-full items-center mb-2">
            <label className="w-2/5 font-bold text-base md:text-xl">Question</label>
            <input
              value={newQuiz.question}
              placeholder='Enter exercise title'
              className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
              onChange={(event) => {
                setNewQuiz({
                  ...newQuiz,
                  question: event.target.value
                })
              }}
            />
          </div>

          <div className="flex w-full mb-2">
            <label className="w-2/5 font-bold text-base md:text-xl">Options</label>
            <div className='w-3/5'>
              {
                newQuiz.choices.map((option, index) => (
                  <>
                    <input
                      key={index}
                      value={option}
                      className="w-3/5 border-2 px-2 py-1 border-black rounded-xl mb-2"
                      onChange={(event) => {
                        newQuiz.choices[index] = event.target.value
                        setNewQuiz({
                          ...newQuiz,
                          choices: [...newQuiz.choices]
                        })
                      }}
                    />
                    <button onClick={() => { handleDeleteQuiz(index) }} className="hidden md:inline-block py-1 px-2 bg-red-500 text-white rounded-xl font-bold ml-2">
                      Delete
                    </button>
                    <button onClick={() => { handleDeleteQuiz(index) }} className="inline-block md:hidden py-1 px-2 bg-red-500 text-white rounded-xl font-bold ml-2">
                      <DeleteIcon />
                    </button>
                  </>
                ))
              }
              {
                newQuiz.choices.length < 4 && (
                  <button onClick={() => setNewQuiz({
                    ...newQuiz,
                    choices: [...newQuiz.choices, '']
                  })} className='border-black border-2 rounded-xl w-3/5'>
                    <AddCircleIcon />
                  </button>
                )
              }
            </div>
          </div>

          <div className="flex w-full items-center mb-2">
            <label className="w-2/5 font-bold text-base md:text-xl">Answer</label>
            <input
              value={newQuiz.anwser}
              placeholder='Enter quiz answer'
              className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
              onChange={(event) => {
                setNewQuiz({
                  ...newQuiz,
                  anwser: event.target.value
                })
              }}
            />
          </div>

        </div>
        <div className="flex justify-center">
          <button onClick={handleCancel} className="mx-5 px-2 py-1 bg-gray-500 font-bold text-white rounded-lg">Cancel</button>
          <button onClick={() => {
            if (handleValidateQuiz()) {
              handleAdd(newQuiz)
              refreshState()
              setIsOpen(false)
            }
          }} className="mx-5 px-2 py-1 bg-blue-700 font-bold text-white rounded-lg">Add</button>
        </div>
      </div>
    </div>
  )
}

export default NewExerciseQuiz