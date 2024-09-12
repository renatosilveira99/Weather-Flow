import axios, { type AxiosError } from 'axios';
import { logger } from '../logger';

interface WeatherAPIResponse {
  celsius?: number;
  fahrenheit?: number;
}

interface ErrorResponse {
  error: string;
}

export async function getWeatherFromAPI(params: { city: string; date: string }): Promise<WeatherAPIResponse> {
  try {
    const response = await axios.post<WeatherAPIResponse>(
      'https://staging.v4.api.wander.com/hiring-test/weather',
      params,
    );

    return response.data;
  } catch (error: unknown) {
    let errorMessage = 'Unknown error occurred while calling External Weather API';

    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<ErrorResponse>;

      if (err.response?.status === 418) {
        logger.error('Server is a teapot, cannot process the request. :)');
      }

      errorMessage = err.response?.data?.error
        ? `Error while calling external Weather API: ${err.response?.data?.error}`
        : errorMessage;
    }

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }
}
