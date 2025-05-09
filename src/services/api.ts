import { Country } from "../types/index";

const API_BASE_URL = "https://restcountries.com/v3.1";

export const fetchAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/all`);

    if (!response.ok) {
      throw new Error(`Http error! status: ${response.status}`);
    }

    const data: Country[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchCountryByName = async (name: string): Promise<Country> => {
  try {
    const response = await fetch(`${API_BASE_URL}/name/${name}`);

    if (!response.ok) {
      throw new Error(`Http error! status: ${response.status}`);
    }
    const data: Country[] = await response.json();
    return data[0];
  } catch (error) {
    console.error(`Error fetching country by name (${name}):`, error);
    throw error;
  }
};

export const fetchCountryByCode = async (code: string): Promise<Country> => {
  try {
    const response = await fetch(`${API_BASE_URL}/alpha/${code}`);

    if (!response.ok) {
      throw new Error(`Http error! status: ${response.status}`);
    }

    const data: Country[] = await response.json();
    return data[0];
  } catch (error) {
    console.error(`Error fetching country by code (${code}):`, error);
    throw error;
  }
};

export const fetchCountriesByRegion = async (
  region: string
): Promise<Country[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/region/${region}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Country[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching countries by region (${region}):`, error);
    throw error;
  }
};
