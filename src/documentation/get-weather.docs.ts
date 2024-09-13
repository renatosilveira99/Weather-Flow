export const getWeatherDocs = {
  description: 'Get weather information for a specific city and date',
  tags: ['Weather'],
  summary: 'Get weather data',
  querystring: {
    type: 'object',
    properties: {
      city: { type: 'string', description: 'Name of the city' },
      date: { type: 'string', format: 'date', description: 'Date to retrieve weather data (YYYY-MM-DD)' },
    },
    required: ['city', 'date'],
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        city: { type: 'string' },
        date: { type: 'string' },
        temperature: { type: 'number' },
        description: { type: 'string' },
      },
    },
    400: {
      description: 'Bad request',
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
    },
  },
};
