/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Scrollbar, FreeMode } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

function initSliders() {
	if (document.querySelector('.companies__slider')) {
		new Swiper('.companies__slider', { 
			modules: [Navigation, Scrollbar],
			observer: true,
			observeParents: true,
			slidesPerView: "auto",
			centeredSlides: true,
			spaceBetween: 0,
			grabCursor: true,
			//autoHeight: true,
			speed: 500,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			loopAddBlankSlides: true,
			loopAdditionalSlides: 5,
			//preloadImages: false,
			//lazy: true,
			scrollbar: {
				el: '.companies__slider .swiper-scrollbar',
				draggable: true,
			},

			navigation: {
				prevEl: '.companies__container .swiper-button-prev',
				nextEl: '.companies__container .swiper-button-next',
			},
			/*
			// Брейкпоінти
			breakpoints: {
				640: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// Події
			on: {

			}
		});
	}
	if (document.querySelector('.news-slider__slider')) {
		new Swiper('.news-slider__slider', { 
			modules: [Navigation, Scrollbar],
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			// centeredSlides: true,
			spaceBetween: 18,
			grabCursor: true,
			//autoHeight: true,
			speed: 500,

			//touchRatio: 0,
			//simulateTouch: false,
			// loop: true,
			// loopAddBlankSlides: true,
			// loopAdditionalSlides: 5,
			//preloadImages: false,
			//lazy: true,
			scrollbar: {
				el: '.news-slider__slider .swiper-scrollbar',
				draggable: true,
			},

			navigation: {
				prevEl: '.news-slider__body .swiper-button-prev',
				nextEl: '.news-slider__body .swiper-button-next',
			},
			breakpoints: {
				300: {
					slidesPerView: 1,
					spaceBetween: 0,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 18,
				},
				993: {
					slidesPerView: 3,
					spaceBetween: 18,
				},
			},
			on: {

			}
		});
	}
	if (document.querySelector('.filter__slider')) {
		new Swiper('.filter__slider', {
			modules: [FreeMode],
			observer: true,
			observeParents: true,
			slidesPerView: "auto",
			// centeredSlides: true,
			spaceBetween: 0,
			grabCursor: true,
			//autoHeight: true,
			speed: 300,
			freeMode: {
				enabled: true,
				momentumBounce: false,
			},

			//touchRatio: 0,
			//simulateTouch: false,
			// loop: true,
			// loopAddBlankSlides: true,
			// loopAdditionalSlides: 5,
			//preloadImages: false,
			//lazy: true,
		
			// breakpoints: {
			// 	300: {
			// 		slidesPerView: 1,
			// 		spaceBetween: 0,
			// 	},
			// 	768: {
			// 		slidesPerView: 2,
			// 		spaceBetween: 18,
			// 	},
			// 	993: {
			// 		slidesPerView: 3,
			// 		spaceBetween: 18,
			// 	},
			// },
			on: {

			}
		});
	}
	// if (document.querySelector('.swiper')) { // Вказуємо склас потрібного слайдера
	// 	// Створюємо слайдер
	// 	new Swiper('.swiper', { // Вказуємо склас потрібного слайдера
	// 		// Підключаємо модулі слайдера
	// 		// для конкретного випадку
	// 		modules: [Navigation],
	// 		observer: true,
	// 		observeParents: true,
	// 		slidesPerView: 1,
	// 		spaceBetween: 0,
	// 		//autoHeight: true,
	// 		speed: 800,

	// 		//touchRatio: 0,
	// 		//simulateTouch: false,
	// 		//loop: true,
	// 		//preloadImages: false,
	// 		//lazy: true,

	// 		/*
	// 		// Ефекти
	// 		effect: 'fade',
	// 		autoplay: {
	// 			delay: 3000,
	// 			disableOnInteraction: false,
	// 		},
	// 		*/

	// 		// Пагінація
	// 		/*
	// 		pagination: {
	// 			el: '.swiper-pagination',
	// 			clickable: true,
	// 		},
	// 		*/

	// 		// Скроллбар
	// 		/*
	// 		scrollbar: {
	// 			el: '.swiper-scrollbar',
	// 			draggable: true,
	// 		},
	// 		*/

	// 		// Кнопки "вліво/вправо"
	// 		navigation: {
	// 			prevEl: '.swiper-button-prev',
	// 			nextEl: '.swiper-button-next',
	// 		},
	// 		/*
	// 		// Брейкпоінти
	// 		breakpoints: {
	// 			640: {
	// 				slidesPerView: 1,
	// 				spaceBetween: 0,
	// 				autoHeight: true,
	// 			},
	// 			768: {
	// 				slidesPerView: 2,
	// 				spaceBetween: 20,
	// 			},
	// 			992: {
	// 				slidesPerView: 3,
	// 				spaceBetween: 20,
	// 			},
	// 			1268: {
	// 				slidesPerView: 4,
	// 				spaceBetween: 30,
	// 			},
	// 		},
	// 		*/
	// 		// Події
	// 		on: {

	// 		}
	// 	});
	// }
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
});