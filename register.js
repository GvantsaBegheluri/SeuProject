let ka = document.getElementById("ka");
let en = document.getElementById("en");
const passwordInput = document.getElementById('password');
const passwordStrengthMessage = document.getElementById('passwordStrength');
const form = document.querySelector('.registration-form');
const emailInput = document.getElementById('email');
const idInput = document.getElementById('id');
async function fetchJSON(lang) {
    const url = lang === 'ka' ? 'enums/ka.json' : 'enums/en.json';
    const response = await fetch(url);
    return response.json();
}
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}
function setCookie(name, value, days) {
    let expires