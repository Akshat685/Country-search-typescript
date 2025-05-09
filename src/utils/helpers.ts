export const filterCountries = (
    countries: Country[],
    searchTerm: string,
    independenceFilter: "all" | "independent" | "dependent"
): Country[] => {
    return countries.filter(country => {
        // Apply search filter
        const matchesSearch = searchTerm === '' ||
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (country.cca2 && country.cca2.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (country.cca3 && country.cca3.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (country.region && country.region.toLowerCase().includes(searchTerm.toLowerCase()));

        // Apply independence filter
        let matchesIndependence = true;
        if (independenceFilter === 'independent') {
            matchesIndependence = country.independent === true;
        } else if (independenceFilter === 'dependent') {
            matchesIndependence = country.independent === false;
        }

        return matchesSearch && matchesIndependence;
    });
};



export const findCountryByName = (countries: Country[], name: string): Country | undefined => {
    const decodedName = decodeFromUrl(name);
    return countries.find(
        country =>
            country.name.common.toLowerCase() === decodedName.toLowerCase() ||
            (country.name.official && country.name.official.toLowerCase() === decodedName.toLowerCase())
    );
};


export const findCountryByCode = (countries: Country[], code: string): Country | undefined => {
    return countries.find(
        country => country.cca3 === code || country.cca2 === code
    );
};


export const filterCountriesByRegion = (countries: Country[], region: string): Country[] => {
    const decodedRegion = decodeFromUrl(region);
    return countries.filter(
        country => country.region &&
            country.region.toLowerCase() === decodedRegion.toLowerCase()
    );
};


export const getPageTitle = (searchTerm: string, independenceFilter: string): string => {
    if (searchTerm || independenceFilter !== 'all') {
        return 'Filtered Countries';
    }
    return 'All Countries';
};


export const getBorderCountriesText = (count: number): string => {
    return `${count} ${count === 1 ? 'country' : 'countries'}`;
};


export const findBorderCountries = (country: Country, allCountries: Country[]): Country[] => {
    if (!country.borders || country.borders.length === 0) {
        return [];
    }

    return country.borders
        .map(borderCode => findCountryByCode(allCountries, borderCode))
        .filter((borderCountry): borderCountry is Country => !!borderCountry);
};
export const getUniqueRegions = (countries: Country[]): string[] => {
    const regions = countries
        .map(country => country.region)
        .filter((region): region is string => !!region);

    return Array.from(new Set<string>(regions));
};

import { Country } from "../types";

export const formatNumber = (num: number): string => {
    return num.toLocaleString();
};    


export const formatArea = (area?: number): string => {
    if (!area && area !== 0) return "N/A";
    return `${formatNumber(area)} km²`;
};    


export const extractCurrencyNames = (currencies?: Record<string, { name: string; symbol: string }>): string => {
    if (!currencies) return "N/A";
    return Object.values(currencies)
        .map((curr) => curr.name)
        .join(", ");
};        


export const extractLanguageNames = (languages?: Record<string, string>): string => {
    if (!languages) return "N/A";
    return Object.values(languages).join(", ");
};    


export const getDisplayValue = (value?: string | string[]): string => {
    if (!value) return "N/A";
    if (Array.isArray(value)) return value.join(", ");
    return value;
};    



export const encodeForUrl = (str: string): string => {
    return encodeURIComponent(str);
};


export const decodeFromUrl = (str: string): string => {
    return decodeURIComponent(str);
};
