import SelectDropdown from '../../Input/SelectDropdown';
import ExerciseQuiz from './ExerciseQuiz';

function ExerciseDetailModal({
  isOpen,
  setIsOpen,
  isEditMode,
}) {
  return (
    <div
      className={`${isOpen ? '' : 'hidden'} absolute z-10 top-0 right-0 left-0 bottom-0 bg-slate-950/50 w-full h-full`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className="w-4/5 mx-auto mt-20 p-3 border-2 bg-white rounded-2xl lg:w-3/5 max-h-[70dvh] overflow-auto"
      >
        <div className="flex justify-end mb-4">
          <button onClick={() => { setIsOpen(false) }} className="font-bold rounded-full bg-slate-200 py-1 px-2">
            X
          </button>
        </div>
        <div className="mb-4">
          <div className="flex w-full mb-2">
            <label className="w-2/5 font-bold text-base">Exercise Title</label>
            {
              isEditMode ? (
                <input
                  placeholder='Enter exercise title'
                  className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                />
              ) : (
                <p className="w-3/5 text-base">Introduction to Web Development</p>
              )
            }
          </div>
          <div className="flex w-full mb-2">
            <label className="w-2/5 font-bold text-base">Module</label>
            <div className="w-3/5">
              {
                isEditMode ? (
                  <SelectDropdown

                  />
                ) : (
                  <p className="w-3/5 text-base">Introduction to Web Development</p>
                )
              }
            </div>
          </div>
          <div className="flex w-full mb-2">
            <label className="w-2/5 font-bold text-base">Exercise Duration</label>
            {
              isEditMode ? (
                <input
                  value={"135"}
                  disabled
                  className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                />
              ) : (
                <p className="w-3/5 text-base">135 minutes</p>
              )
            }
          </div>
          <div className="flex w-full mb-2">
            <label className="w-2/5 font-bold text-base">Pass Score</label>
            {
              isEditMode ? (
                <input
                  placeholder='Enter exercise pass score'
                  className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                />
              ) : (
                <p className="w-3/5 text-base">80%</p>
              )
            }
          </div>
          <div className="w-full mb-5">
            <div className="text-base font-bold md:text-xl">Quizes</div>
            <div className="mt-2">
              {/* <ExerciseQuiz />
              <ExerciseQuiz />
              <ExerciseQuiz />
              <ExerciseQuiz /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExerciseDetailModal