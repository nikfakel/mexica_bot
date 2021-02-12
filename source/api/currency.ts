import {http} from "./index";

type TCurrencyData = {
    rates: {
        RUB: number; // 89.3792,
        USD: number; // 1.2147,
        MXN: number; // 24.2037,
    },
    base: string; // "EUR",
    date: string; // "2021-02-11"
}

type TCurrency = {
    rub: number;
    usd: number;
    mxn: number;
}

export const getCurrencyData = async (): Promise<TCurrency> => {
    const response = await http<TCurrencyData>('https://api.exchangeratesapi.io/latest');

    const {
        rates: {
            RUB,
            USD,
            MXN,
        }
    } = response;

    return {
        rub: RUB,
        usd: USD,
        mxn: MXN,
    }
}