import {MenuTemplate} from 'telegraf-inline-menu';

import {MyContext} from '../my-context';

import {menu as settingsMenu} from './settings';

export const menu = new MenuTemplate<MyContext>(context => context.i18n.t('welcome'));

menu.url('Telegram API Documentation', 'https://core.telegram.org/bots/api');

menu.submenu(context => '⚙️' + context.i18n.t('menu.settings'), 'settings', settingsMenu);

menu.interact('I am excited!', 'a', {
    do: async (action) =>  {
        await action.reply('As am I!');
        return true;
    }
})

type Weather = {
    coord : {
        lon: -86.8466,
        lat: 21.1743
    },
    weather: [{
        id: 802,
        main:"Clouds",
        description:"переменная облачность",
        icon:"03n"
    }],
    base:"stations",
    main: {
            temp:24.12,
            feels_like:26.9,
            temp_min:23.89,
            temp_max:24.44,
            pressure:1013,
            humidity:94
        },
    visibility:10000,
    wind: {
        speed:3.6,
        deg:130
    },
    clouds: {
        all:40
    },
    dt:1613109600,
    sys:{
        type:1,
        id:7177,
        country:"MX",
        sunrise:1613132367,
        sunset:1613173438
    },
    timezone:-18000,
    id:3531673,
    name:"Канкун",
    cod: 200
}

menu.interact('Узнать погоду', 'b', {
    do: async (action) =>  {
        const getWeather = fetch('https://api.openweathermap.org/data/2.5/weather?q=cancun&appid=a08c262cd2646b86861e75255dc4a51e&lang=ru&units=metric')
        console.log(getWeather);



        await action.reply('Хорошая');
        return true;
    }
})
