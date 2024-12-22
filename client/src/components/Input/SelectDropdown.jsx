/* eslint-disable react/prop-types */
function SelectDropdown({
  options,
  setSelectedOptions,
  hasDefault=true
}) {
  return (
      <select onChange={(e) => setSelectedOptions(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
        {
          hasDefault && <option value={null} defaultValue={null}>Choose an option</option>
        }
        {
          options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))
        }
      </select>
  )
}

export default SelectDropdown