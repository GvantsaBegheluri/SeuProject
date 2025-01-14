let ka = document.getElementById("ka");
let en = document.getElementById("en");
const form = document.querySelector('.registration-form');
const emailInput = document.getElementById('email');

async function fetchJSON(lang) {
    const url = lang === 'ka' ? 'enums/ka.json' : 'enums/en.json';
    const response = await fetch(url);
    return response.json();
}

async function changeLanguage(lang) {
    const data = await fetchJSON(lang);

    document.querySelectorAll("h2, h3").forEach(el => {
        if (data[el.id]) {
            el.textContent = data[el.id];
        }
    });

    document.querySelectorAll("span").forEach(el => {
        if (data[el.id]) {
            el.textContent = data[el.id];
        }
    });

    document.querySelectorAll("button").forEach(el => {
        if (data[el.id]) {
            el.textContent = data[el.id];
        }
    });

    document.querySelectorAll("input").forEach(el => {
        if (data[el.id]) {
            el.placeholder = data[el.id];
        }
    });
    document.querySelectorAll("label").forEach(el => {
        if (data[el.id.replace("Label","")]) {
            el.textContent = data[el.id.replace("Label","")];
        }
    });

}
document.addEventListener("DOMContentLoaded", () => {
  en.addEventListener("click", () => {
    changeLanguage("en");
});

ka.addEventListener("click", () => {
    changeLanguage("ka");
});
});

form.addEventListener('submit', (event) => {
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
        event.preventDefault();
        alert('ელ.ფოსტა არ არის ვალიდური. გთხოვთ შეიყვანოთ სწორი ელ.ფოსტა.');
    }
});

function isValidEmail(email) {
    const atIndex = email.indexOf('@');

    if (atIndex < 1) {
        return false;
    }

    const dotIndex = email.indexOf('.', atIndex);

    if (dotIndex <= atIndex + 1 || dotIndex >= email.length - 2) {
        return false;
    }

    return true;
}
