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
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
    const savedLang = getCookie('lang')
    if(savedLang) {
        changeLanguage(savedLang);
        if(savedLang === "en") {
            en.classList.add("active");
             ka.classList.remove("active");

        }else {
             ka.classList.add("active");
             en.classList.remove("active");
        }

    }else {
        changeLanguage("ka");
         ka.classList.add("active");
    }

    en.addEventListener("click", () => {
         setCookie('lang', 'en', 30);
        changeLanguage("en");
         en.classList.add("active");
        ka.classList.remove("active");
    });

    ka.addEventListener("click", () => {
         setCookie('lang', 'ka', 30);
         changeLanguage("ka");
        ka.classList.add("active");
        en.classList.remove("active");
    });
});

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    let strength = checkPasswordStrength(password);
   
    switch (strength) {
        case "weak":
           passwordStrengthMessage.textContent = "სუსტი პაროლი";
           passwordStrengthMessage.style.color = "red";
            break;
        case "medium":
           passwordStrengthMessage.textContent = "საშუალო პაროლი";
           passwordStrengthMessage.style.color = "orange";
            break;
        case "strong":
           passwordStrengthMessage.textContent = "ძლიერი პაროლი";
           passwordStrengthMessage.style.color = "green";
            break;
        default:
            passwordStrengthMessage.textContent = "";
    }
});

function checkPasswordStrength(password) {
    if (!password) {
        return "";
    }
    const englishLettersOnly = /^[a-zA-Z]+$/.test(password);
    const englishLettersAndNumbers = /^[a-zA-Z0-9]+$/.test(password);
    const mixedCaseLettersAndNumbers = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/.test(password);

    if (englishLettersOnly) {
        return "weak";
    } else if (englishLettersAndNumbers) {
        return "medium";
    } else if (mixedCaseLettersAndNumbers) {
        return "strong";
    } else {
        return "";
    }
}

form.addEventListener('submit', (event) => {
    const email = emailInput.value.trim();
    const id = idInput.value.trim();
    if (!isValidEmail(email)) {
         event.preventDefault();
        alert('ელ.ფოსტა არ არის ვალიდური. გთხოვთ შეიყვანოთ სწორი ელ.ფოსტა.');
        return;
    }
       if (!id) {
        event.preventDefault();
        alert("მომხმარებლის სახელი სავალდებულოა");
         return
    }

    setCookie('userEmail', email, 7);
    setCookie('userId', id, 7)
    alert("წარმატებით დარეგისტრირდით");
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