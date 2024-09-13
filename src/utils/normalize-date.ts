export const normalizeDate = (date: string): string => {
  const parsedDate = new Date(date);
  return parsedDate.toISOString().split('T')[0];
};
