class Currency {
    constructor(symbol, name, emoji) {
        this.symbol = symbol;
        this.name = name;
        this.emoji = emoji;
    }

    async convertCurrency(otherCurrency, source, isRecipientAmount) {
        const response = await fetch(`https://hexarate.paikama.co/api/rates/latest/${this.symbol}?target=${otherCurrency.symbol}`)
        const data = await response.json();
        const exchangeRate = parseFloat(data.data.mid);

        let newTargetValue;
        if (isRecipientAmount) {
            newTargetValue = source / exchangeRate;
        } else {
            newTargetValue = source * exchangeRate;
        }

        return {
            newTargetValue: newTargetValue,
            exchangeRate: exchangeRate
        };
    }

    static validateCurrencyInput(input) {
        // Get the current value of the input
        const inputValue = input.value;

        // Regular expression to match valid numerical input with up to 2 decimal places
        const validInputPattern = /^\d+\.?\d{0,2}$/;

        // Check if the input value matches the valid pattern
        if (!validInputPattern.test(inputValue)) {
            // If not, remove the last character
            input.value = inputValue.slice(0, -1);
            return false;
        }

        return true;
    }
}

const currencies = {
    "GBP": new Currency("GBP", "British Pound", "🇬🇧"),
    "EUR": new Currency("EUR", "Euro", "🇪🇺"),
    "USD": new Currency("USD", "US Dollar", "🇺🇸"),
    "PLN": new Currency("PLN", "Polish Zloty", "🇵🇱"),
    "AED": new Currency("AED", "United Arab Emirates Dirham", "🇦🇪"),
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

        currencySelector.onchange = () => {
            selectedCurrencies[i] = currencies[currencySelector.value];
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