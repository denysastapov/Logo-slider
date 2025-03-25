document.addEventListener("DOMContentLoaded", function () {
  var sliders = document.querySelectorAll(
    ".logo-slider-wrapper .swiper-container"
  );
  sliders.forEach(function (slider) {
    var adminSlides =
      parseInt(slider.getAttribute("data-slides-per-view")) || 4;
    new Swiper(slider, {
      slidesPerView: adminSlides,
      spaceBetween: parseInt(slider.getAttribute("data-gap")) || 20,
      loop: true,
      autoplay:
        slider.getAttribute("data-autoplay") === "true"
          ? {
              delay: parseInt(slider.getAttribute("data-slider-speed")) || 5000,
            }
          : false,
      navigation: {
        nextEl: slider
          .closest(".logo-slider-wrapper")
          .querySelector(".swiper-button-next"),
        prevEl: slider
          .closest(".logo-slider-wrapper")
          .querySelector(".swiper-button-prev"),
      },
      pagination: {
        el: slider
          .closest(".logo-slider-wrapper")
          .querySelector(".swiper-pagination"),
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        426: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: adminSlides,
        },
      },
    });
  });
});
