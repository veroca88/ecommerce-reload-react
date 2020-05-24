
import React from 'react'

export default function Search({handleSearchItems}) {
  return (
      <div className='search'>
        <input
          onChange={handleSearchItems}
          id="search"
          name="search"
          placeholder="Search Products"
          style={{ width: "50%" }}
        />
      </div>
  )
}

