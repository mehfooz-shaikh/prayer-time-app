async function getPrayerTimes() {
    const city = document.getElementById('cityInput').value.trim();
    const errorDiv = document.getElementById('error');
    const resultDiv = document.getElementById('result');

    errorDiv.textContent = '';
    resultDiv.classList.add('hidden');

    if (!city) {
        errorDiv.textContent = 'Please enter a city name.';
        return;
    }

    try {
        const response = await fetch(
            `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=&method=2`
        );
        const data = await response.json();

        if (data.code !== 200) {
            errorDiv.textContent = 'City not found. Please try again.';
            return;
        }

        const timings = data.data.timings;
        const date = data.data.date.readable;

        document.getElementById('cityName').textContent = city.toUpperCase();
        document.getElementById('dateDisplay').textContent = date;
        document.getElementById('fajr').textContent = timings.Fajr;
        document.getElementById('dhuhr').textContent = timings.Dhuhr;
        document.getElementById('asr').textContent = timings.Asr;
        document.getElementById('maghrib').textContent = timings.Maghrib;
        document.getElementById('isha').textContent = timings.Isha;

        resultDiv.classList.remove('hidden');

    } catch (error) {
        errorDiv.textContent = 'Something went wrong. Please check your internet connection.';
    }
}

document.getElementById('cityInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') getPrayerTimes();
});