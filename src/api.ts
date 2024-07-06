import { Character } from './types/character';

interface SwapiCharacter {
  url: string;
  name: string;
  species: string[];
}

export const fetchCharacters = async (search: string): Promise<Character[]> => {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${search}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  const data = await response.json();

  return data.results.map((item: SwapiCharacter) => ({
    id: item.url.split('/').filter(Boolean).pop() || '',
    name: item.name,
    species: item.species.join(', ') || 'Unknown',
  }));
};
