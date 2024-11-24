class Currency {
    constructor(symbol, name, region) {
        this.symbol = symbol;
        this.name = name;
        this.region = region;
    }
}

const currencies = {
    "GBP": new Currency("GBP", "British Pound", "gb"),
    "EUR": new Currency("EUR", "Euro", "eu"),
    "USD": new Currency("USD", "US Dollar", "us"),
    "PLN": new Currency("PLN", "Polish Zloty", "pl"),
    "AED": new Currency("AED", "United Arab Emirates Dirham", "ae"),
    "AUD": new Currency("AUD", "Australian Dollar", "au"),
    "BGN": new Currency("BGN", "Bulgarian Lev", "bg"),
    "CAD": new Currency("CAD", "Canadian Dollar", "ca"),
    "CHF": new Currency("CHF", "Swiss Franc", "ch"),
    "CLP": new Currency("CLP", "Chilean Peso", "cl"),
    "COP": new Currency("COP", "Colombian Peso", "co"),
    "CZK": new Currency("CZK", "Czech Koruna", "cz"),
    "DKK": new Currency("DKK", "Danish Krone", "dk"),
    "EGP": new Currency("EGP", "Egyptian Pound", "eg"),
    "HKD": new Currency("HKD", "Hong Kong Dollar", "hk"),
    "HUF": new Currency("HUF", "Hungarian Forint", "hu"),
    "IDR": new Currency("IDR", "Indonesian Rupiah", "id"),
    "ILS": new Currency("ILS", "Israeli New Shekel", "il"),
    "INR": new Currency("INR", "Indian Rupee", "in"),
    "ISK": new Currency("ISK", "Icelandic Króna", "is"),
    "JPY": new Currency("JPY", "Japanese Yen", "jp"),
    "KRW": new Currency("KRW", "South Korean Won", "kr"),
    "KZT": new Currency("KZT", "Kazakhstani Tenge", "kz"),
    "MAD": new Currency("MAD", "Moroccan Dirham", "ma"),
    "MXN": new Currency("MXN", "Mexican Peso", "mx"),
    "NOK": new Currency("NOK", "Norwegian Krone", "no"),
    "NZD": new Currency("NZD", "New Zealand Dollar", "nz"),
    "PHP": new Currency("PHP", "Philippine Peso", "ph"),
    "QAR": new Currency("QAR", "Qatari Riyal", "qa"),
    "RON": new Currency("RON", "Romanian Leu", "ro"),
    "RSD": new Currency("RSD", "Serbian Dinar", "rs"),
    "SAR": new Currency("SAR", "Saudi Riyal", "sa"),
    "SEK": new Currency("SEK", "Swedish Krona", "se"),
    "SGD": new Currency("SGD", "Singapore Dollar", "sg"),
    "THB": new Currency("THB", "Thai Baht", "th"),
    "TRY": new Currency("TRY", "Turkish Lira", "tr"),
    "ZAR": new Currency("ZAR", "South African Rand", "za")
};

document.addEventListener("DOMContentLoaded", () => {
    let selectedCurrencies = [currencies["USD"], currencies["SGD"]];

    const currencySelectors = document.getElementsByClassName("currency-dropdown");
    for (let i = 0; i < currencySelectors.length; i++) {
        const currencySelector = currencySelectors[i];

        Object.values(currencies).forEach(currency => {
            const option = document.createElement("option");
            option.value = currency.symbol;
            option.textContent = currency.name;
            currencySelector.appendChild(option);
        });

        currencySelector.onchange = () => {
            selectedCurrencies[i] = currencies[currencySelector.value];
        };

        currencySelector.value = selectedCurrencies[i].symbol;
    }
});