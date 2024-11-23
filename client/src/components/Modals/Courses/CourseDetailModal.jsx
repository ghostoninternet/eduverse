import { useState } from 'react'
import ModuleContent from '../../Accordion/ModuleContent'
import CourseReview from '../../CourseReview'
import MultiSelectDropdown from '../../Input/MultiSelectDropdown '

function CourseDetailModal({
  isOpen,
  setOpen,
  isEditMode,
}) {

  const courseCategory = [
    'Web',
    'Frontend',
    'Backend',
    'HTML',
    'CSS',
    'JavaScript',
  ]
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const toggleDropdown = () => setIsOpenCategory(!isOpenCategory);

  const handleItemClick = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  const isSelected = (item) => selectedItems.includes(item);

  return (
    <div className={`${isOpen ? '' : 'hidden'} absolute top-0 right-0 left-0 bottom-0 bg-slate-950/50 w-full h-full`}>
      <div onClick={(e) => { e.stopPropagation() }} className="w-4/5 max-h-[90dvh] overflow-auto mx-auto mt-10 p-3 border-2 bg-white rounded-2xl lg:px-8">
        <div className='flex justify-end'>
          <button onClick={() => { setOpen(false) }} className="font-bold rounded-full bg-slate-200 py-1 px-2">
            X
          </button>
        </div>
        <div className='my-5 lg:mb-10'>
          <img
            className='w-[60%] h-[60%] mx-auto lg:w-[40%] lg:h-[40%]'
            alt='Course Image'
            src={"https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/83/e258e0532611e5a5072321239ff4d4/jhep-coursera-course4.png?auto=format%2Ccompress&dpr=1&w=330&h=330&fit=fill&q=25"}
          />
        </div>
        <div className='mb-10'>
          <div className="flex w-full mb-2">
            <p className="w-2/5 font-bold text-base">Course Title</p>
            {
              isEditMode ? (
                <input
                  placeholder='Enter course title'
                  className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                />
              ) : (
                <p className="w-3/5 text-base">HTML, CSS, and JavaScript for Web Developers</p>
              )
            }
          </div>
          <div className="flex w-full mb-2">
            <p className="w-2/5 font-bold text-base">Course Description</p>
            {
              isEditMode ? (
                <textarea
                  placeholder='Enter course description'
                  className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                />
              ) : (
                <p className="w-3/5 text-base">HTML, CSS, and JavaScript for Web Developers HTML, CSS, and JavaScript for Web Developers HTML, CSS, and JavaScript for Web Developers HTML, CSS, and JavaScript for Web Developers HTML, CSS, and JavaScript for Web Developers HTML, CSS, and JavaScript for Web Developers HTML, CSS, and JavaScript for Web Developers HTML, CSS, and JavaScript for Web Developers HTML, CSS, and JavaScript for Web Developers</p>
              )
            }

          </div>
          <div className="flex w-full mb-2">
            <p className="w-2/5 font-bold text-base">Course Category</p>
            {
              isEditMode ? (
                <div className="relative w-3/5 border-2 px-2 py-1 border-black rounded-xl cursor-pointer">
                  <MultiSelectDropdown
                    items={courseCategory}
                    selectedItems={selectedItems}
                    isSelected={isSelected}
                    toggleDropdown={toggleDropdown}
                    isOpen={isOpenCategory}
                    handleItemClick={handleItemClick}
                  />
                </div>
              ) : (
                <div className="w-3/5 font-bold text-base flex flex-wrap gap-1">
                  {
                    courseCategory.map((item) => (
                      <span
                        key={item}
                        className="bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded"
                      >{item}</span>
                    ))
                  }
                </div>
              )
            }

          </div>
          <div className="flex w-full items-center mb-2">
            <p className="w-2/5 font-bold text-base">Course Price</p>

            {
              isEditMode ? (
                <input
                  placeholder='Enter the price'
                  className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                />
              ) : (
                <p className="w-3/5 text-base">99.99$</p>
              )
            }

          </div>
          {
            isEditMode ? (
              <div className="flex w-full items-center mb-2">
                <label className="w-2/5 font-bold text-xl">Course Image</label>
                <input className="w-3/5 text-sm cursor-pointer bg-gray-50" type="file" />
              </div>
            ) : (
              null
            )
          }
          <div className="flex w-full items-center mb-2">
            <p className="w-2/5 font-bold text-base">Rating</p>
            <p className="w-3/5 text-base">5</p>
          </div>
          <div className="flex w-full items-center mb-2">
            <p className="w-2/5 font-bold text-base">Number Of Learner</p>
            <p className="w-3/5 text-base">1000000</p>
          </div>
        </div>

        <div className='mb-2'>
          <div className='text-xl font-bold mb-2'>Course Module</div>
          <ModuleContent />
          <ModuleContent />
          <ModuleContent />
          <ModuleContent />
          <ModuleContent />
        </div>

        <div className='mb-2'>
          <div className='text-xl font-bold mb-2'>Course Review</div>
          <div className='flex flex-col md:flex-row md:justify-between'>
            <div className='flex items-center justify-between mb-2 md:gap-3'>
              <p>Filter by rating: </p>
              <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2">
                <option selected>All</option>
                <option value="US">5</option>
                <option value="CA">4</option>
                <option value="FR">3</option>
                <option value="DE">2</option>
                <option value="DE">1</option>
              </select>
            </div>
            <div className='flex items-center justify-between mb-2 md:gap-3'>
              <p>Number of comment: </p>
              <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2">
                <option selected>5</option>
                <option value="US">10</option>
                <option value="CA">15</option>
              </select>
            </div>
          </div>
          <CourseReview isEditMode={isEditMode} />
          <CourseReview isEditMode={isEditMode} />
          <CourseReview isEditMode={isEditMode} />
          <CourseReview isEditMode={isEditMode} />
          <CourseReview isEditMode={isEditMode} />
          <div>
            <nav class="flex flex-col justify-center items-center sm:flex-row sm:justify-between py-2">
              <div>
                <span class="text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                  Showing <span class="font-semibold text-gray-900">1-10</span> of <span class="font-semibold text-gray-900">1000</span>
                </span>
              </div>
              <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                  <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">Previous</a>
                </li>
                <li>
                  <a href="#" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">3</a>
                </li>
                <li>
                  <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div >
  )
}

export default CourseDetailModal