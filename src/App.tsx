import React from 'react';
import { Character } from './types/character';
import SearchBar from './components/SearchBar';
import CharacterList from './components/CharacterList';
import ErrorBoundary from './components/ErrorBoundary';
import { fetchCharacters } from './api';

interface ApplicationContext {
  characters: Character[];
  isLoading: boolean;
}

class App extends React.Component<unknown, ApplicationContext> {
  constructor(props: unknown) {
    super(props);
    this.state = { characters: [], isLoading: false };
  }

  componentDidMount() {
    this.fetchCharacters('');
  }

  fetchCharacters = (query: string) => {
    this.setState({ isLoading: true });
    fetchCharacters(query)
      .then((data) => {
        this.setState({ characters: data, isLoading: false });
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
        this.setState({ isLoading: false });
      });
  };

  handleSearch = (query: string) => {
    this.fetchCharacters(query);
  };

  triggerError = () => {
    throw new Error('Triggered error for testing.');
  };

  render() {
    return (
      <div className="background">
        <div className="content">
          <ErrorBoundary>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
              }}
            >
              <div
                style={{
                  height: '30%',
                  borderBottom: '1px solid black',
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '50px',
                }}
              >
                <SearchBar onSearch={this.handleSearch} />
                <button onClick={this.triggerError}>Trigger Error</button>
              </div>
              <div
                style={{
                  display: 'flex',
                  margin: '0 auto',
                  textAlign: 'center',
                  color: 'black',
                }}
              >
                <CharacterList
                  characters={this.state.characters}
                  isLoading={this.state.isLoading}
                />
              </div>
            </div>
            <div className="dev"></div>
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default App;
