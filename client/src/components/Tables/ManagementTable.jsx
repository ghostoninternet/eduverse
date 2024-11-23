import React from 'react'
import TableHeader from './TableHeader'

function ManagementTable({
  tableHeaders,
  tableData,
}) {
  return (
    <>
      <div class="relative max-h-[65lvh] overflow-auto overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-700">
          <TableHeader tableHeaders={tableHeaders} />
          <tbody className="h-70lvh overflow-y-auto">
            {
              tableData.map(item => item)
            }
          </tbody>
        </table>
      </div>
      <div>
        <nav class="flex items-center md:flex-row justify-between py-2">
          <span class="text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing <span class="font-semibold text-gray-900">1-10</span> of <span class="font-semibold text-gray-900">1000</span>
          </span>
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
    </>
  )
}

export default ManagementTable