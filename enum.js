let ka = document.getElementById("ka");
let en = document.getElementById("en");

async function fetchJSON(lang) {
    const url = lang === 'ka' ? 'enums/ka.json' : 'enums/en.json';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Could not fetch the JSON file:", error);
        return null;
    }
}

function updateElements(data, selector, attribute = 'textContent') {
    if (!data) return;
    document.querySelectorAll(selector).forEach(el => {
      if (data.hasOwnProperty(el.id)) {
          if(attribute == 'placeholder')
              el.setAttribute(attribute, data[el.id]);
          else
            el[attribute] = data[el.id];
        }
    });
}

async function changeLanguage(lang) {
  const data = await fetchJSON(lang);
  if (data) {
      updateElements(data, "h2, h3, span, button");
      updateElements(data, "input", 'placeholder');

    }
}


en.addEventListener("click", () => {
    changeLanguage("en");
});

ka.addEventListener("click", () => {
    changeLanguage("ka");
});

changeLanguage("ka");