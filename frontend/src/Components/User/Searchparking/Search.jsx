import React, { useState } from 'react';
import { handleSearch } from '../../../service/Userapi';
import './search.css';
import { useNavigate } from 'react-router-dom';
// import { getTotalReservations } from './SecurityUserList'; // Import the getTotalReservations function

const Search = ({ getTotalReservations }) => {
  console.log(getTotalReservations,"00000");
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate('');

  const onSearch = async (searchQuery) => {
    try {
      if (searchQuery.trim() === ''){
        setSuggestions([]);
        return;
      }
      const response = await handleSearch({ query: searchQuery });
      console.log('Response from handleSearch:', response);
      if (Array.isArray(response)) {
        const filteredSuggestions = response.filter((company) =>
          company.place?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        console.log('Filtered suggestions:', filteredSuggestions);
        setSuggestions(filteredSuggestions);
      } else {
        console.error('handleSearch did not return an array:', response);
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error in onSearch:', error.message);
      setSuggestions([]);
    }
  };

  const onInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  const onSuggestionClick = (company) => {
    // navigate('/Reserve');
    navigate('/Reserve', { state: { companyName: company.companyName } });
  };

  return (
    <div>
      <div className="body-search">
        <div>
          <h1 className="title">LOCATION</h1>
          <div className="search-container">
            <input
              className="search-input"
              type="text"
              value={query}
              onChange={onInputChange}
              placeholder="Search for a place..."
            />
          </div>
          <ul className="suggestion-list">
            {suggestions.map((company, index) => (
              <li key={index} onClick={() => onSuggestionClick(company)}>
                <div className="suggestion-card">
                  <div className="suggestion-details">
                    <h3 className="company-name">{company.companyName}</h3>
                    <p style={{color:'black'}}>Two-Wheeler Free: {company.twoWheeler.free }</p>
                    <p style={{color:'black'}}>Four-Wheeler Free: {company.fourWheeler.free}</p>
                    <div>Total Reservations: {getTotalReservations && getTotalReservations()} </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* <div>Total Reservations: {getTotalReservations && getTotalReservations} </div> */}

        </div>
      </div>
    </div>
  );
};

export default Search;
