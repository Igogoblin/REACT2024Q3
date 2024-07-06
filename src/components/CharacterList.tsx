import React from 'react';
import { Character } from '../types/character';

interface CharacterListProps {
  characters: Character[];
  isLoading: boolean;
}

interface CharacterListState {
  fontSizes: number[];
}

class CharacterList extends React.Component<
  CharacterListProps,
  CharacterListState
> {
  constructor(props: CharacterListProps) {
    super(props);
    this.state = {
      fontSizes: this.initializeFontSizes(props.characters.length),
    };
  }

  componentDidUpdate(prevProps: CharacterListProps) {
    if (prevProps.characters.length !== this.props.characters.length) {
      this.setState({
        fontSizes: this.initializeFontSizes(this.props.characters.length),
      });
    }
  }

  initializeFontSizes(length: number): number[] {
    const fontSizes = [];
    for (let i = 0; i < length; i++) {
      fontSizes.push(16 + i * 2);
    }
    return fontSizes;
  }

  render() {
    const { characters, isLoading } = this.props;
    const { fontSizes } = this.state;

    if (isLoading) {
      return (
        <div
          style={{
            textAlign: 'center',
            color: 'white',
            marginTop: '20px',
            fontSize: '32px',
          }}
        >
          Loading...
        </div>
      );
    }

    return (
      <ul>
        {characters.map((character, index) => (
          <li
            key={character.id}
            style={{
              fontSize: fontSizes[index],
              fontStyle: 'italic',
              transform: 'skew(-15deg)',
            }}
          >
            {character.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default CharacterList;
