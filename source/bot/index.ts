import {existsSync, readFileSync} from 'fs';

import {I18n as TelegrafI18n} from '@edjopato/telegraf-i18n';
import {MenuMiddleware} from 'telegraf-inline-menu';
import {Telegraf} from 'telegraf';
import * as TelegrafSessionLocal from 'telegraf-session-local';

import {MyContext} from './my-context';
import {menu} from './menu';
import {connectDB} from "../db";
import {getCurrency} from "../controller";

const token = (existsSync('/run/secrets/bot-token.txt') && readFileSync('/run/secrets/bot-token.txt', 'utf8').trim()) ||
	(existsSync('bot-token.txt') && readFileSync('bot-token.txt', 'utf8').trim()) ||
	process.env.BOT_TOKEN;
if (!token) {
	throw new Error('You have to provide the bot-token from @BotFather via file (bot-token.txt) or environment variable (BOT_TOKEN)');
}

const bot = new Telegraf<MyContext>(token);

const localSession = new TelegrafSessionLocal({
	database: 'persist/sessions.json'
});

bot.use(localSession.middleware());

const i18n = new TelegrafI18n({
	directory: 'locales',
	defaultLanguage: 'en',
	defaultLanguageOnMissing: true,
	useSession: true
});

bot.use(i18n.middleware());

const menuMiddleware = new MenuMiddleware('/', menu);
bot.command('start', async context => menuMiddleware.replyToContext(context));
bot.command('settings', async context => menuMiddleware.replyToContext(context, '/settings/'));
bot.use(menuMiddleware.middleware());

bot.catch(error => {
	console.error('telegraf error occured', error);
});

export async function start(): Promise<void> {
	connectDB();
	// The commands you set here will be shown as /commands like /start in your telegram client.
	// await bot.telegram.setMyCommands([
	// 	{command: 'start', description: 'open the menu'},
	// 	{command: 'help', description: 'show the help'},
	// 	{command: 'settings', description: 'open the settings'}
	// ]);

	await bot.launch();

	bot.on('text', async (ctx) => {
		const text = ctx.update.message.text;
		const reply = await getCurrency(text);
		ctx.reply(reply);
	});
	console.log(new Date(), 'Bot started as', bot.botInfo?.username);
}
