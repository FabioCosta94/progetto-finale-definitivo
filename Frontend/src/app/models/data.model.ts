export interface CovidData {
    id:             number;
    country:        string;
    population:     number;
    cases:          number;
    deaths:         number;
    recoveries:     number;
    recoveryRate:   number;
    fatalityRate:   number;
    date:           Date;
}

export interface CountriesData{
    name: string,
    population: number,
    confirmed: number,
    deaths: number,
    recovered: number,
    recovery_rate: number,
    death_rate: number,
    updated_at: string
}



export interface UsersData {
    id:             number;
    username:       string;
    password:       string;
    permissions:    number;

}
