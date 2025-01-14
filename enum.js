let ka = document.getElementById("ka");
let en = document.getElementById("en");

async function fetchJSON(lang) {
    const url = lang === 'ka' ? 'enums/ka.json' : 'enums/en.json';
    const response = await fetch(url);
    return response.json();
}

async function changeLanguage(lang) {
    const data = await fetchJSON(lang);

    document.querySelectorAll("h3").forEach(el => {
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
}

en.addEventListener("click", () => {
    changeLanguage("en");
});

ka.addEventListener("click", () => {
    changeLanguage("ka");
});
