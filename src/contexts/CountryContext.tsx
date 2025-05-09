import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { fetchAllCountries } from '../services/api';
import { Country, CountryContextType, IndependenceFilterType } from '../types';
import { 
  filterCountries, 
  findCountryByName, 
  findCountryByCode, 
  filterCountriesByRegion, 
  getUniqueRegions 
} from '../utils/helpers';

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const useCountries = (): CountryContextType => {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountries must be used within a CountryProvider');
  }
  return context;
};

interface CountryProviderProps {
  children: ReactNode;
}

export const CountryProvider: React.FC<CountryProviderProps> = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [independenceFilter, setIndependenceFilter] = useState<IndependenceFilterType>('all');

  useEffect(() => {
    const getCountries = async (): Promise<void> => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
        setCountries(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch countries. Please try again later.');
        console.error('Error fetching countries:', err);
      } finally {
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  const getFilteredCountries = (): Country[] => {
    return filterCountries(countries, searchTerm, independenceFilter);
  };

  const getCountryByName = (name: string): Country | undefined => {
    return findCountryByName(countries, name);
  };

  const getCountryByCode = (code: string): Country | undefined => {
    return findCountryByCode(countries, code);
  };

  const getCountriesByRegion = (region: string): Country[] => {
    return filterCountriesByRegion(countries, region);
  };

  const getAllRegions = (): string[] => {
    return getUniqueRegions(countries);
  };
  
  const value: CountryContextType = {
    countries,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    independenceFilter,
    setIndependenceFilter,
    getFilteredCountries,
    getCountryByName,
    getCountryByCode,
    getCountriesByRegion,
    getAllRegions
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
};