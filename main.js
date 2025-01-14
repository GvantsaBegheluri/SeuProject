// Initialize Swiper
const swiper = new Swiper('.categories-slider', {
    slidesPerView: 4, // Display as many slides as fit the container
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop : true ,  
    autoplay: {
        delay: 2000, // Delay between transitions (in milliseconds)
        disableOnInteraction: false, // Autoplay will not be disabled after user interactions
      },

    pagination: {
      el: '.swiper-pagination',
      clickable: true, 
    },
  });