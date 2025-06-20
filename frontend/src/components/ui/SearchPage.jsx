import React from 'react'
import InputText from './InputText'
import { FiSearch } from 'react-icons/fi'

const SearchPage = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className='relative wi'>
        <InputText
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full" />
        <FiSearch className='absolute right-3 top-3'/>
    </div>
  )
}

export default SearchPage