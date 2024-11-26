import Currency from "./classes/currency.js";

const currencies = {
    "GBP": new Currency("GBP", "British Pound", "🇬🇧", 0.0475),
    "EUR": new Currency("EUR", "Euro", "🇪🇺", 0.0328),
    "USD": new Currency("USD", "US Dollar", "🇺🇸", 0.0188),
};

document.addEventListener("DOMContentLoaded", () => {
    let selectedCurrency = currencies["GBP"];
    const principal = document.getElementById("principal");
    const periodSelector = document.getElementById("period-type");
    const period = document.getElementById("period");
    const total = document.getElementById("total");
    const interestRate = document.getElementById("interest-rate");

    function displayInterestAmount() {
        const principalValue = parseInt(principal.value);
        const periodValue = parseInt(period.value);
        const periodType = periodSelector.value;
        
        const periodYears = periodType === "years" ? periodValue : periodValue / 12;
        const amount = principalValue * Math.pow(1 + selectedCurrency.interestRate, periodYears);
        total.textContent = amount.toFixed(2);
        interestRate.textContent = `${(selectedCurrency.interestRate * 100).toFixed(2)}% p.a. interest rate`;
    }

    const currencySelector = document.getElementById("currency");
    Object.values(currencies).forEach(currency => {
        const option = document.createElement("option");
        option.value = currency.symbol;
        option.textContent = `${currency.emoji} ${currency.name}`;
        currencySelector.appendChild(option);
    });
    currencySelector.onchange = () => {
        selectedCurrency = currencies[currencySelector.value];
        displayInterestAmount();
    };
    currencySelector.value = selectedCurrency.symbol;
    
    principal.oninput = () => {
        const principalValue = period.value;
        if (isNaN(parseInt(principalValue))) {
            principal.value = principalValue.slice(0, -1);
        }
        displayInterestAmount();
    }
    principal.value = "10000";

    periodSelector.onchange = () => {
        displayInterestAmount();
    }
    periodSelector.value = "years";

    period.oninput = () => {
        const periodValue = period.value;
        if (isNaN(parseInt(periodValue))) {
            period.value = periodValue.slice(0, -1);
        }
        displayInterestAmount();
    }
    period.value = "3";

    displayInterestAmount();
});