import { useState } from 'react'
import MultiSelectDropdown from '../../Input/MultiSelectDropdown ';

function AddNewCourseModal({
  showAddNewCourse,
  setShowAddNewCourse,
  handleCancelCreateNewCourse,
}) {
  const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const isSelected = (item) => selectedItems.includes(item);

  return (
    <div className={`${showAddNewCourse ? '' : 'hidden'} absolute top-0 right-0 left-0 bottom-0 bg-slate-950/50 w-full h-full`}>
      <div onClick={(e) => { e.stopPropagation() }} className="w-4/5 mx-auto mt-10 p-3 border-2 bg-white rounded-2xl lg:w-3/5">
        <div className="flex justify-between mb-4">
          <div className="font-bold text-2xl">New Course</div>
          <button onClick={() => { setShowAddNewCourse(false) }} className="font-bold rounded-full bg-slate-200 py-1 px-2">
            X
          </button>
        </div>
        <div className="mb-4">
          <div className="flex w-full items-center mb-2">
            <label className="w-2/5 font-bold text-xl">Course Title</label>
            <input
              placeholder='Enter course title'
              className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
            />
          </div>
          <div className="flex w-full items-center mb-2">
            <label className="w-2/5 font-bold text-xl">Course Description</label>
            <textarea
              placeholder='Enter course description'
              className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
            />
          </div>
          <div className="flex w-full items-center mb-2">
            <label className="w-2/5 font-bold text-xl">Course Category</label>
            <div className="relative w-3/5 border-2 px-2 py-1 border-black rounded-xl cursor-pointer">
              <MultiSelectDropdown
                items={items}
                selectedItems={selectedItems}
                isSelected={isSelected}
                toggleDropdown={toggleDropdown}
                isOpen={isOpen}
                handleItemClick={handleItemClick}
              />
            </div>
          </div>
          <div className="flex w-full items-center mb-2">
            <label className="w-2/5 font-bold text-xl">Course Price</label>
            <input
              placeholder='Enter the price'
              className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
            />
          </div>
          <div className="flex w-full items-center mb-2">
            <label className="w-2/5 font-bold text-xl">Course Image</label>
            <input className="w-3/5 text-sm cursor-pointer bg-gray-50" type="file" />
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={handleCancelCreateNewCourse} className="mx-5 px-2 py-1 bg-gray-500 font-bold text-white rounded-lg">Cancel</button>
          <button className="mx-5 px-2 py-1 bg-blue-700 font-bold text-white rounded-lg">Add</button>
        </div>
      </div>
    </div>
  )
}

export default AddNewCourseModal