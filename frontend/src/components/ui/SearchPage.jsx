import React from 'react'
import InputText from './InputText'
import { FiSearch } from 'react-icons/fi'

const SearchPage = () => {
  return (
    <div className='relative wi'>
        <InputText className="w-full" />
        <FiSearch className='absolute right-3 top-3'/>
    </div>
  )
}

export default SearchPage