export type WeatherServiceProps = {
    locations: WeatherLocation[];
}

export type WeatherLocation = {
    name: string;
    latitude: number;
    longitude: number;
}

export type WeatherLocationResponse = {
    location: WeatherLocation;
    current?: Record<string|number, any>;
    hourly?: Record<string|number, any>;
    daily?: Record<string|number, any>;
}