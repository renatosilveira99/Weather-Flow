import { normalizeDate } from '../../utils/normalize-date';

describe('normalizeDate', () => {
  it('should return the date in YYYY-MM-DD format', () => {
    const inputDate = '2024-09-12T12:00:00Z';
    const result = normalizeDate(inputDate);
    expect(result).toBe('2024-09-12');
  });

  it('should correctly handle different date formats', () => {
    const inputDate = '2024-05-01';
    const result = normalizeDate(inputDate);
    expect(result).toBe('2024-05-01');
  });

  it('should correctly parse ISO date with time', () => {
    const inputDate = '2023-01-15T10:30:00.000Z';
    const result = normalizeDate(inputDate);
    expect(result).toBe('2023-01-15');
  });
});
