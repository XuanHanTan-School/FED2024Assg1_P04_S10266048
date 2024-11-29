/**
 * This is a class that represents a currency.
 */
export default class Currency {
    /**
     * @param {string} symbol - The symbol of the currency
     * @param {string} name - The name of the currency
     * @param {string} emoji - The emoji of the currency
     * @param {number} interestRate - The interest rate of the currency
     * @returns {Currency} The currency object
     */
    constructor(symbol, name, emoji, interestRate) {
        this.symbol = symbol;
        this.name = name;
        this.emoji = emoji;
        this.interestRate = interestRate;
    }

    /**
     * This method converts a currency to another currency.
     * 
     * @param {string} otherCurrency - The other currency
     * @param {number} source - The source value
     * @param {boolean} isRecipientAmount - When true, the source value will be of the other currency. When false, the source value will be of this currency.
     * @returns {Promise} A promise that resolves to an object containing the value of the currency that is not the source and the exchange rate.
     */
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

    /**
     * This method validates the input of a currency.
     * 
     * @param {HTMLInputElement} input - The input element to validate.
     * @returns {boolean} True if the input is valid, false otherwise.
     */
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