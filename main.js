const currencies = {
    USD: 'United States Dollar',
    AUD: 'Australian Dollar',
    BGN: 'Bulgarian Lev',
    BRL: 'Brazilian Real',
    CAD: 'Canadian Dollar',
    CHF: 'Swiss Franc',
    CNY: 'Chinese Yuan',
    CZK: 'Czech Republic Koruna',
    DKK: 'Danish Krone',
    GBP: 'British Pound Sterling',
    HKD: 'Hong Kong Dollar',
    HRK: 'Croatian Kuna',
    HUF: 'Hungarian Forint',
    IDR: 'Indonesian Rupiah',
    ILS: 'Israeli New Sheqel',
    INR: 'Indian Rupee',
    JPY: 'Japanese Yen',
    KRW: 'South Korean Won',
    MXN: 'Mexican Peso',
    MYR: 'Malaysian Ringgit',
    NOK: 'Norwegian Krone',
    NZD: 'New Zealand Dollar',
    PHP: 'Philippine Peso',
    PLN: 'Polish Zloty',
    RON: 'Romanian Leu',
    RUB: 'Russian Ruble',
    SEK: 'Swedish Krona',
    SGD: 'Singapore Dollar',
    THB: 'Thai Baht',
    TRY: 'Turkish Lira',
    ZAR: 'South African Rand',
    EUR: 'Euro',
};
const courses = {};
const input = document.querySelector('input');
const selectFirstCurrency = document.querySelector('#currency-one');
const selectSecondCurrency = document.querySelector('#currency-two');
const divOutput = document.querySelector('.calculated');

// Converting object with all currencies to list of options and adding it as a html to a select fields
const generateOptions = (options) => {
    return Object.entries(options).map(([currencyCode, currencyName, xx]) =>
        `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`)
}
const options = generateOptions(currencies);
selectFirstCurrency.innerHTML = options;
selectSecondCurrency.innerHTML = options;

async function getCourse(base) {
    const response = await fetch(`https://api.exchangeratesapi.io/latest?base=${base}`);
    const data = await response.json();
    return data;
}

async function convert(amount, base, output) {
    // Using an additional object to store course of certain currency, so function doesn't need to fetch data everytime amount is changing
    if (!courses[base]) {
        const course = await getCourse(base);
        courses[base] = course;
    }
    return amount * courses[base].rates[output];
}

async function calculate() {
    const calculated = await convert(input.value, selectFirstCurrency.value, selectSecondCurrency.value);
    divOutput.textContent = calculated;
}

input.addEventListener('input', calculate);