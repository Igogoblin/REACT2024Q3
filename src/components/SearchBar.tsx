import React, { ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

interface SearchBarState {
  searchQuery: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    const savedSearchQuery = localStorage.getItem('searchQuery') || '';
    this.state = { searchQuery: savedSearchQuery };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearch = () => {
    const trimmedQuery = this.state.searchQuery.trim();
    localStorage.setItem('searchQuery', trimmedQuery);
    this.props.onSearch(trimmedQuery);
  };

  render() {
    return (
      <div
        style={{
          width: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <input
          type="text"
          value={this.state.searchQuery}
          onChange={this.handleChange}
          placeholder="Search..."
          style={{
            width: '100px',
            margin: '10px',
          }}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
