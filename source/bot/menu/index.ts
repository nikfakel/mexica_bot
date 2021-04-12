import {MenuTemplate} from 'telegraf-inline-menu';

import {MyContext} from '../my-context';

// import {menu as settingsMenu} from './settings';
import {getWeather} from "../../api/weather";

export const menu = new MenuTemplate<MyContext>(context => context.i18n.t('welcome'));

// menu.url('Telegram API Documentation', 'https://core.telegram.org/bots/api');
//
// menu.submenu(context => '⚙️' + context.i18n.t('menu.settings'), 'settings', settingsMenu);

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

menu.interact('Riesling', 'c', {
    do: async (action) =>  {
        await action.reply(`Бот желает юзерам из Ижевска поменьше работы и побольше винишка`);
        return true;
    }
})


