export interface CovidData {
    id:             number;
    country:        string;
    population:     number;
    cases:          number;
    deaths:         number;
    recoveries:     number;
    recoveryRate:   number;
    fatalityRate:   number;
    continent:      string;
    classification: string;
    date:           Date;
}

export interface UsersData {
    id:             number;
    username:       string;
    password:       string;
    permissions:    number;

}
