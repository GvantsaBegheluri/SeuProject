const swiper = new Swiper(".categories-slider", {
    slidesPerView: "auto",
    spaceBetween: 30,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints:{
          1400:{slidesPerView: 5,},
          700:{slidesPerView: 4},
          500:{slidesPerView: 3},
          0:{slidesPerView: 1.7}
      },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
  });
  

  async function fetchJSON(lang) {
    const url = `enums/${lang}.json`;
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

function updateElements(data) {
    if (!data) return;
    document.querySelectorAll('[id]').forEach(element => {
        const key = element.id;
        if (data.hasOwnProperty(key)) {
            if (element.tagName === 'INPUT') {
                element.placeholder = data[key];
            } else {
                element.textContent = data[key];
            }
        }
    });
}

async function changeLanguage(lang) {
    const data = await fetchJSON(lang);
    if (data) {
        updateElements(data);
        document.querySelectorAll('.lang-buttons button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(lang).classList.add('active');
        localStorage.setItem('selectedLanguage', lang);
        document.documentElement.lang = lang; 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const storedLanguage = localStorage.getItem('selectedLanguage') || 'ka';
    changeLanguage(storedLanguage);

    document.getElementById('ka').addEventListener('click', () => {
        changeLanguage('ka');
    });

    document.getElementById('en').addEventListener('click', () => {
        changeLanguage('en');
    });
});