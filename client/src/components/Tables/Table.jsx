/* eslint-disable react/prop-types */
import TableHeader from './TableHeader'

function Table({
  tableHeaders,
  tableData,
  totalCourses,
  totalPages,
  currentPage,
  setCurrentPage,
  limitPerPage,
}) {
  
  const calculateCurrentDisplayRange = () => {
    const start = (currentPage - 1) * limitPerPage + 1
    const end = currentPage * limitPerPage < totalCourses ? currentPage * limitPerPage : totalCourses
    return (
      <span className="font-semibold text-gray-900">{start} - {end}</span>
    )
  }

  const previousPage = () => {
    if (currentPage == 1) return
    setCurrentPage(currentPage - 1)
  }

  const nextPage = () => {
    if (currentPage == totalPages) return
    setCurrentPage(currentPage + 1)
  }

  return (
    <>
      <div className="relative max-h-[65lvh] overflow-auto overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-700">
          <TableHeader tableHeaders={tableHeaders} />
          <tbody className="h-70lvh overflow-y-auto">
            {
              tableData.map(item => item)
            }
          </tbody>
        </table>
      </div>
      <div>
        <nav className="flex items-center md:flex-row justify-between py-2">
          <span className="text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing {calculateCurrentDisplayRange()} of <span className="font-semibold text-gray-900">{totalCourses}</span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button onClick={previousPage} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">Previous</button>
            </li>
            <li>
              <button className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">{currentPage}</button>
            </li>
            <li>
              <button onClick={nextPage} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Table