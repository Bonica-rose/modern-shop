// Current exchange rate: 1 USD = 93.10 INR
const USD_TO_INR = 93.10;

function formatINR(amountInUSD) {
    // Convert to INR and round to the nearest whole number
    const amountInINR = Math.round(amountInUSD * USD_TO_INR);

    // Format with zero decimal places
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0, // Removes decimal points
        minimumFractionDigits: 0  // Removes decimal points
    }).format(amountInINR);
}