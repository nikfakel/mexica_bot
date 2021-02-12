import {MenuTemplate} from 'telegraf-inline-menu';

import {MyContext} from '../my-context';

import {menu as settingsMenu} from './settings';
import {getWeather} from "../../api/weather";

export const menu = new MenuTemplate<MyContext>(context => context.i18n.t('welcome'));

menu.url('Telegram API Documentation', 'https://core.telegram.org/bots/api');

menu.submenu(context => '⚙️' + context.i18n.t('menu.settings'), 'settings', settingsMenu);

menu.interact('Курсы валют', 'a', {
    do: async (action) =>  {
        await action.reply('Ты пидор!');
        return true;
    }
})

menu.interact('Узнать погоду', 'b', {
    do: async (action) =>  {
        const weatherData = await getWeather();
        console.log(weatherData);

        await action.reply(`В Канкуне ${weatherData.temp}. А Эндрю пидор =)`);
        return true;
    }
})


