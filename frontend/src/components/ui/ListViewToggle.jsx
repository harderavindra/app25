import React from 'react'
import { FiGrid, FiList } from 'react-icons/fi'

const ListViewToggle = ({}) => {
  
  return (
    <div>
        <div className="flex items-center space-x-4">
            <button className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700">
            <FiGrid className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700">
           <FiList/>
            </button>
        </div>
    </div>
  )
}

export default ListViewToggle