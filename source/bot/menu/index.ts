import {MenuTemplate} from 'telegraf-inline-menu';

import {MyContext} from '../my-context';
import {getWeather} from "../../api/weather";

export const menu = new MenuTemplate<MyContext>(context => context.i18n.t('welcome'));

menu.interact('Курсы валют', 'a', {
    do: async (action) =>  {
        await action.reply('Пиши прямо текстом чо-то типа "100 баксов" или "1000 рублей"');
        return true;
    }
})

menu.interact('Узнать погоду', 'b', {
    do: async (action) =>  {
        const weatherData = await getWeather();
        console.log(weatherData);

        await action.reply(`Погода в Канкуне: ${weatherData.description}. Сейчас ${weatherData.temp}, ощущается как ${weatherData.feels_like}. `);
        return true;
    }
})
