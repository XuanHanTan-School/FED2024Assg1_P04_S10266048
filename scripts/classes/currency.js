export default class Currency {
    constructor(symbol, name, emoji, interestRate) {
        this.symbol = symbol;
        this.name = name;
        this.emoji = emoji;
        this.interestRate = interestRate;
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