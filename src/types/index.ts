export interface Country {
    name : {
        common : string ;
        official : string ; 
        nativeName : {
            [key: string] : {
                official : string ; 
                common : string ;
            };
        };
    };

    cca2: string;
    cca3: string;

    independent : boolean ;
    status : string ;
    umMember?: boolean;
    currencies?: {
        [code : string] : {
            name : string ; 
            symbol: string ;
        };
    };


    capital?: string[];
    altSpellings?: string[];
    region: string; 
    subregion?: string ; 
    languages?: {
        [code : string] :string ;
    };
    translations?: {
        [languageCode : string]: {
            official : string;
            common: string;
        };
    };
    latlng : number[];
    landlocked?: boolean;
    borders?: string[];
    area: number;
    flag?: string;
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
    population: number;
    continents?: string[];
}


// context related types
export interface CountryContextType {
    countries : Country[];
    loading: boolean;
    error : string|null;
    searchTerm : string ;
    setSearchTerm : (term :string) => void;
    independenceFilter : IndependenceFilterType;
    setIndependenceFilter : (filter : IndependenceFilterType) => void;
    getFilteredCountries : () => Country[];
    getCountryByName : (name : string) => Country|undefined;
    getCountryByCode : (name : string ) => Country|undefined;
    getCountriesByRegion: (region : string) => Country[];
    getAllRegions : () => string[];
}


export type IndependenceFilterType = 'all' | 'independent' | 'dependent' ;


//region backgrounds map
export interface RegionBackgroundsType {
    [key : string ] : string;
}