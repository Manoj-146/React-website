import React, { useState } from 'react';

const SearchForm = ({handleSearch}) => {
  const [query,setquery]=useState('');

  const handlesubmit=(e)=>{
    e.preventDefault();
    handleSearch(query);
  }
  return (
    <div className='search-container'>
      <input type='text' value={query} placeholder='Search...' onChange={(e)=>setquery(e.target.value)}/>
      <button type='submit' onClick={handlesubmit}>Search</button>
    </div>
  )
}

export default SearchForm