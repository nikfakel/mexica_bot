import {http} from "./index";

type TWeatherData = {
    coord : {
        lon: number;
        lat: number;
    },
    weather: [{
        id: number;
        main: string; // "Clouds",
        description: string; // "переменная облачность",
        icon: string; // "03n"
    }],
    base: string; // "stations",
    main: {
        temp: number; // 24.12,
        feels_like: number; // 26.9,
        temp_min: number; // 23.89,
        temp_max: number; // 24.44,
        pressure: number; // 1013,
        humidity: number; // 94
    },
    visibility: number; // 10000,
    wind: {
        speed: number; // 3.6,
        deg: number; // 130
    },
    clouds: {
        all: number; // 40
    },
    dt: number; // 1613109600,
    sys:{
        type: number; // 1,
        id: number; // 7177,
        country: string; // "MX",
        sunrise: number; // 1613132367,
        sunset: number; // 1613173438
    },
    timezone: number; // -18000,
    id: number; // 3531673,
    name: string; // "Канкун",
    cod: number; // 200
};

type TWeather = {
    temp: number;
    feels_like: number;
    description: string;
}

export const getWeather = async (): Promise<TWeather> => {
    const response = await http<TWeatherData>('https://api.openweathermap.org/data/2.5/weather?q=cancun&appid=a08c262cd2646b86861e75255dc4a51e&lang=ru&units=metric')
    console.log(response);

    return {
        temp: response.main.temp,
        feels_like: response.main.feels_like,
        description: response.weather[0].description,
    }
}