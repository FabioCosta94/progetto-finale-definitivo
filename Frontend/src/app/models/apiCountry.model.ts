export interface ApiCountry{
    data: ApiCountryData
}

export interface ApiCountryData{
    code: string,
    coordinates: Coords,
    latest_data : LatestData,
    name: string,
    population: number,
    today: TodayData,
    updated_at: string
}

export interface Coords{
    latitude: number,
    longitude: number
}
export interface LatestData{
    calculated: Calculated,
    confirmed: number,
    critical: number,
    deaths: number,
    recovered: number
}
export interface Calculated {
    cases_per_million_population: number,
    death_rate: number,
    recovered_vs_death_ratio: number,
    recovery_rate: number
}
export interface TodayData{
    confirmed: number,
    deaths: number
}