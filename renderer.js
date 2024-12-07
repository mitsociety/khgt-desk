import { HijriDateConverter } from './HijriDateConverter.js';

document.addEventListener('DOMContentLoaded', function () {
    const dateConverter = new HijriDateConverter();
    //const format = 7;
    const date = dateConverter.hitung_Tanggal();
    document.getElementById('date').textContent = date.date; // Display in a DOM element
    document.getElementById('output').textContent = date.day; // Display in a DOM element
    document.getElementById('today').textContent = date.today; // Display in a DOM element
});

/*
window.addEventListener('DOMContentLoaded', () => {
    const calendar = new HijriCalendar();
    document.getElementById('output').innerText = calendar.getDate();
}); */
