import {getCurrencyData} from "../api/currency";

export enum Currency {
	RUB,
	USD,
	MXN
}

const ruWords = ["rub", "rur", "р", "рублей", "рубль", "рубля", "рублях", "₽", "оублей", "рубл"];
const enWords = ["usd", "$", "доллар", "долар", "долларах", "долларов", "доллара", "us", "dollar", "баксов"];
const mxWords = ["mxn", "песо", "peso", "мексиканский"];

export const getCurencyType = (text: string): Currency => {
	if (ruWords.some(item => text.includes(item))) {
		return Currency.RUB;
	}
	if (enWords.some(item => text.includes(item))) {
		return Currency.USD;
	}
	if (mxWords.some(item => text.includes(item))) {
		return Currency.MXN;
	}

	return Currency.RUB;
}

export const getCurrency = async (text: string): Promise<string> => {
	const response = await getCurrencyData();

	if (text) {
		const numberArr = text.match(/(\d+)/igm);
		const currency = getCurencyType(text)

		if (numberArr && numberArr[0]) {
			const number = Number(numberArr[0]);
			let first;
			let second;

			if (currency === Currency.MXN) {
				first = number * response.usd / response.mxn;
				second = number * response.rub / response.mxn;

				return `${number} MXN равно\n - ${first.toFixed(2)} USD\n - ${second.toFixed(0)} RUB`
			}

			if (currency === Currency.RUB) {
				first = number * response.usd / response.rub;
				second = number * response.mxn / response.rub;

				return `${number} RUB равно\n - ${first.toFixed(2)} USD\n - ${second.toFixed(0)} MXN`
			}

			if (currency === Currency.USD) {
				first = number * response.rub / response.usd;
				second = number * response.mxn / response.usd;

				return `${number} USD равно\n - ${first.toFixed(2)} RUB\n - ${second.toFixed(0)} MXN`
			}
		}
	}

	return "Ты хуйню написал, должны быть цифры"
}

type TCTX = {
	update: {message: {text: string }};
	reply: (text: string) => void;
}

export const handleText = async (ctx: TCTX ) => {
	const text = ctx.update.message.text;
	const reply = await getCurrency(text);
	ctx.reply(reply);
}