export function formatGBP(amount, locale = 'en-GB') {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'GBP',
    });
    return formatter.format(amount);
}