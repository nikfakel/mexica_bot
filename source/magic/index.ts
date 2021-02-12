import {getCurrencyData} from "../api/currency";

export enum Currency {
	RUB,
	USD,
	MXN
}

export const getCurrency = async (text: string): Promise<string> => {
	const response = await getCurrencyData();
	console.log(response);
	if (text) {
		const numberArr = text.match(/(\d+)/igm);

		if (numberArr && numberArr[0]) {
			const number = Number(numberArr[0])
			const dollar = number * response.usd / response.mxn;
			const rub = number * response.rub / response.mxn;

			return `${number} MXN равно\n - ${dollar.toFixed(2)} USD\n - ${rub.toFixed(0)} рублей`
		}
	}

	return "Ты хуйню написал, должны быть цифры"
}
