import { capitalizeWords } from '../../utils/capitalize-words';

describe('capitalizeWords', () => {
  it('should capitalize the first letter of each word', () => {
    const inputString = 'são paulo';
    const result = capitalizeWords(inputString);
    expect(result).toBe('São Paulo');
  });

  it('should handle multiple spaces between words', () => {
    const inputString = 'new    york   city';
    const result = capitalizeWords(inputString);
    expect(result).toBe('New York City');
  });

  it('should handle already capitalized strings', () => {
    const inputString = 'San Francisco';
    const result = capitalizeWords(inputString);
    expect(result).toBe('San Francisco');
  });

  it('should convert all letters after the first to lowercase', () => {
    const inputString = 'NEw YoRk';
    const result = capitalizeWords(inputString);
    expect(result).toBe('New York');
  });
});
