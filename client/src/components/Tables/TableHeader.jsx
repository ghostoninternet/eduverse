import React from 'react'

function TableHeader({ tableHeaders }) {
  return (
    <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        {
          tableHeaders.map((tabelHeader) => (
            <th scope="col" className="px-6 py-3">
              {tabelHeader}
            </th>
          ))
        }
      </tr>
    </thead>
  )
}

export default TableHeader