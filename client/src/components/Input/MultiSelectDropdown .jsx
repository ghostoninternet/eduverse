import React from 'react'

function MultiSelectDropdown({
  toggleDropdown,
  selectedItems,
  isOpen,
  items,
  isSelected,
  handleItemClick,
}) {
  return (
    <>
      <div
        onClick={toggleDropdown}
      >
        {selectedItems.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selectedItems.map((item, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-400">Select items...</span>
        )}
      </div>

      {isOpen && (
        <ul className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-md w-full max-h-48 overflow-auto">
          {items.map((item, idx) => (
            <li
              key={idx}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${isSelected(item) ? "bg-blue-100 text-blue-600" : "bg-white"
                }`}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default MultiSelectDropdown 