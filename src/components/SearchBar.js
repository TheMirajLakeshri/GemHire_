import React, { useState } from 'react';


const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log(`Search for ${keyword} in ${location}`);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Job title, keywords, or company" 
          value={keyword} 
          onChange={(e) => setKeyword(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Location" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
