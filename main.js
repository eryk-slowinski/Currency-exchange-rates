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
const selectedBaseCurrency = document.querySelector('div.from');
const selectedOutputCurrency = document.querySelector('div.to');
const calculated = document.querySelector('div.calculated');
const submitBtn = document.querySelector('.submit');
const fromTo = document.querySelector('.from-to');
const toFrom = document.querySelector('.to-from');


// Converting object with all currencies to list of options and adding it as a html to a select fields
const generateOptions = (options) => {
    return Object.entries(options).map(([currencyCode, currencyName]) =>
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
    return await convert(input.value, selectFirstCurrency.value, selectSecondCurrency.value);
}

async function render(e) {
    e.preventDefault();
    if (input.value) {
        const calcFromTo = await (await convert(1, selectFirstCurrency.value, selectSecondCurrency.value)).toFixed(3);
        const calcToFrom = await (await convert(1, selectSecondCurrency.value, selectFirstCurrency.value)).toFixed(3);
        const result = await calculate();
        selectedBaseCurrency.textContent = `${input.value} ${selectFirstCurrency.value} =`;
        selectedOutputCurrency.textContent = `${selectSecondCurrency.value}`;
        calculated.textContent = `${result.toFixed(3)}`;
        fromTo.textContent = `1 ${selectFirstCurrency.value} is ${calcFromTo} ${selectSecondCurrency.value}`;
        toFrom.textContent = `1 ${selectSecondCurrency.value} is ${calcToFrom} ${selectFirstCurrency.value}`;
    } else selectedBaseCurrency.textContent = 'Insert amount';
}


submitBtn.addEventListener('click', render);