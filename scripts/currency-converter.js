import Currency from "./classes/currency.js";

const currencies = {
    "GBP": new Currency("GBP", "British Pound", "🇬🇧"),
    "EUR": new Currency("EUR", "Euro", "🇪🇺"),
    "USD": new Currency("USD", "US Dollar", "🇺🇸"),
    "PLN": new Currency("PLN", "Polish Zloty", "🇵🇱"),
    "AED": new Currency("AED", "UAE Dirham", "🇦🇪"),
    "AUD": new Currency("AUD", "Australian Dollar", "🇦🇺"),
    "BGN": new Currency("BGN", "Bulgarian Lev", "🇧🇬"),
    "CAD": new Currency("CAD", "Canadian Dollar", "🇨🇦"),
    "CHF": new Currency("CHF", "Swiss Franc", "🇨🇭"),
    "CLP": new Currency("CLP", "Chilean Peso", "🇨🇱"),
    "COP": new Currency("COP", "Colombian Peso", "🇨🇴"),
    "CZK": new Currency("CZK", "Czech Koruna", "🇨🇿"),
    "DKK": new Currency("DKK", "Danish Krone", "🇩🇰"),
    "EGP": new Currency("EGP", "Egyptian Pound", "🇪🇬"),
    "HKD": new Currency("HKD", "Hong Kong Dollar", "🇭🇰"),
    "HUF": new Currency("HUF", "Hungarian Forint", "🇭🇺"),
    "IDR": new Currency("IDR", "Indonesian Rupiah", "🇮🇩"),
    "ILS": new Currency("ILS", "Israeli New Shekel", "🇮🇱"),
    "INR": new Currency("INR", "Indian Rupee", "🇮🇳"),
    "ISK": new Currency("ISK", "Icelandic Króna", "🇮🇸"),
    "JPY": new Currency("JPY", "Japanese Yen", "🇯🇵"),
    "KRW": new Currency("KRW", "South Korean Won", "🇰🇷"),
    "KZT": new Currency("KZT", "Kazakhstani Tenge", "🇰🇿"),
    "MAD": new Currency("MAD", "Moroccan Dirham", "🇲🇦"),
    "MXN": new Currency("MXN", "Mexican Peso", "🇲🇽"),
    "NOK": new Currency("NOK", "Norwegian Krone", "🇳🇴"),
    "NZD": new Currency("NZD", "New Zealand Dollar", "🇳🇿"),
    "PHP": new Currency("PHP", "Philippine Peso", "🇵🇭"),
    "QAR": new Currency("QAR", "Qatari Riyal", "🇶🇦"),
    "RON": new Currency("RON", "Romanian Leu", "🇷🇴"),
    "RSD": new Currency("RSD", "Serbian Dinar", "🇷🇸"),
    "SAR": new Currency("SAR", "Saudi Riyal", "🇸🇦"),
    "SEK": new Currency("SEK", "Swedish Krona", "🇸🇪"),
    "SGD": new Currency("SGD", "Singapore Dollar", "🇸🇬"),
    "THB": new Currency("THB", "Thai Baht", "🇹🇭"),
    "TRY": new Currency("TRY", "Turkish Lira", "🇹🇷"),
    "ZAR": new Currency("ZAR", "South African Rand", "🇿🇦")
};

document.addEventListener("DOMContentLoaded", () => {
    function parseCurrencyResponse(response, target) {
        exchangeRateText.textContent = `${selectedCurrencies[0].symbol} 1 = ${selectedCurrencies[1].symbol} ${response.exchangeRate.toFixed(4)}`;
        target.value = response.newTargetValue.toFixed(2);
    }

    let selectedCurrencies = [currencies["USD"], currencies["SGD"]];

    const currencySelectors = document.getElementsByClassName("currency-dropdown");
    for (let i = 0; i < currencySelectors.length; i++) {
        const currencySelector = currencySelectors[i];

        Object.values(currencies).forEach(currency => {
            const option = document.createElement("option");
            option.value = currency.symbol;
            option.textContent = `${currency.emoji} ${currency.name}`;
            currencySelector.appendChild(option);
        });

        currencySelector.onchange = async () => {
            selectedCurrencies[i] = currencies[currencySelector.value];
            const response = await selectedCurrencies[0].convertCurrency(selectedCurrencies[1], parseFloat(value1.value), false);
            parseCurrencyResponse(response, value2);
        };

        currencySelector.value = selectedCurrencies[i].symbol;
    }

    const exchangeRateText = document.getElementById("exchange-rate");
    const value1 = document.getElementById("value1");
    value1.value = "1000.00";
    const value2 = document.getElementById("value2");

    value1.oninput = async () => {
        if (!Currency.validateCurrencyInput(value1)) return;
        const response = await selectedCurrencies[0].convertCurrency(selectedCurrencies[1], parseFloat(value1.value), false);
        parseCurrencyResponse(response, value2);
    };
    value2.oninput = async () => {
        if (!Currency.validateCurrencyInput(value2)) return;
        const response = await selectedCurrencies[0].convertCurrency(selectedCurrencies[1], parseFloat(value2.value), true);
        parseCurrencyResponse(response, value1);
    };

    value1.oninput();
});