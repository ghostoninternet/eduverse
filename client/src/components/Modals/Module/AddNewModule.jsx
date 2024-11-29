import SelectDropdown from '../../Input/SelectDropdown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModuleVideo from './ModuleVideo';

function AddNewModuleModal({
  showAddNewModule,
  setShowAddNewModule,
  handleCancelCreateNewModule
}) {

  return (
    <div
      className={`${showAddNewModule ? '' : 'hidden'} absolute top-0 right-0 left-0 bottom-0 bg-slate-950/50 w-full h-full`}>
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className="w-4/5 mx-auto mt-10 p-3 border-2 bg-white rounded-2xl lg:w-3/5 max-h-[70dvh] overflow-auto">
        <div className="flex justify-between mb-4">
          <div className="font-bold text-2xl">New Module</div>
          <button onClick={() => { setShowAddNewModule(false) }} className="font-bold rounded-full bg-slate-200 py-1 px-2">
            X
          </button>
        </div>
        <div className="mb-4">
          <div className="flex w-full items-center mb-2">
            <label className="w-2/5 font-bold text-base md:text-xl">Module Title</label>
            <input
              placeholder='Enter module title'
              className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
            />
          </div>
          <div className="flex w-full mb-2">
            <label className="w-2/5 font-bold text-base md:text-xl">Module Description</label>
            <textarea
              placeholder='Enter course description'
              className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
            />
          </div>
          <div className="flex w-full items-center mb-2">
            <label className="w-2/5 font-bold text-base md:text-xl">Course</label>
            <div className="relative w-3/5 border-2  border-black rounded-xl cursor-pointer">
              <SelectDropdown/>
            </div>
          </div>
          <div className="lg:flex w-full mb-5">
            <div className="text-base lg:w-2/5 font-bold md:text-xl">Videos</div>
            <div className="mt-2 lg:w-3/5">
              <ModuleVideo isEditMode={true} />
              <ModuleVideo />
              <ModuleVideo />
              <ModuleVideo />
              <button className='border-black border-2 rounded-xl w-3/5'>
                <AddCircleIcon />
              </button>
            </div>
          </div>
          <div className="lg:flex w-full mb-5">
            <div className="text-base lg:w-2/5 font-bold md:text-xl">Exercise</div>
            <div className="mt-2 lg:w-3/5">
              <ModuleVideo />
              <ModuleVideo />
              <ModuleVideo />
              <ModuleVideo />
              <button className='border-black border-2 rounded-xl w-3/5'>
                <AddCircleIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={handleCancelCreateNewModule} className="mx-5 px-2 py-1 bg-gray-500 font-bold text-white rounded-lg">Cancel</button>
          <button className="mx-5 px-2 py-1 bg-blue-700 font-bold text-white rounded-lg">Add</button>
        </div>
      </div>
    </div>
  )
}

export default AddNewModuleModal