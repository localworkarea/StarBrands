// Підключення функціоналу "Чертоги Фрілансера"
import layoutMode from "isotope-layout/js/layout-mode.js";
import { isMobile, FLS } from "./functions.js";
import { flsModules } from "./modules.js";
import Isotope from 'isotope-layout/js/isotope.js';



document.addEventListener('DOMContentLoaded', function() {

    // ==   VIDEO YOUTUBE ON CLICK BUTTON ==================================================
    const videoYoutubeButtons = document.querySelectorAll('.video-youtube__button');
    videoYoutubeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const youTubeCode = this.getAttribute('data-youtube');
            let autoplay = true; // Автоплей разрешено (true) или нет (false)
    
            let urlVideo = `https://www.youtube.com/embed/${youTubeCode}?rel=0&showinfo=0`;
    
            const iframe = document.createElement('iframe');
            iframe.setAttribute('allowfullscreen', '');
    
            if (autoplay) {
                urlVideo += '&autoplay=1';
                iframe.setAttribute('allow', 'autoplay; encrypted-media');
            }
    
            iframe.setAttribute('src', urlVideo);
    
            const body = this.closest('.video-youtube__body');
            body.innerHTML = '';
            body.appendChild(iframe);
            body.classList.add('video-added');
        });
    });
    // =====================================================================================


     // ==   HERO VIDEO CHANGE ROTATION PC/MOB VIDEO ==================================================
    const video = document.querySelector('.hero__video');
    if (video) {
        // Переменная для хранения предыдущей ширины окна
        let prevWidth = window.innerWidth;
    
        window.addEventListener('resize', () => {
            const newWidth = window.innerWidth;
            if (newWidth !== prevWidth) {
                prevWidth = newWidth;
                checkScreenWidth();
            }
        });
    
        function checkScreenWidth() {
            if (window.innerWidth > 30.061 * parseFloat(getComputedStyle(document.documentElement).fontSize)) {
                const pcSource = video.querySelector('.video-hero-pc').getAttribute('src');
                video.src = pcSource;
            } else {
                const mobSource = video.querySelector('.video-hero-mob').getAttribute('src');
                video.src = mobSource;
            }
        }
        checkScreenWidth();
    }
    // =====================================================================================



     // ==  ANIMATION FINGER ON HERO SECTION ==================================================
    const finger = document.querySelector('.finger');
    if (finger) {
        // Добавляем класс 'visible' через 8 секунд
        setTimeout(() => {
            finger.classList.add('visible');
            // Убираем класс 'visible' еще через 8 секунд
            setTimeout(() => {
                finger.classList.remove('visible');
            }, 12000);
        }, 7000);
    }
    // =====================================================================================

    const items = document.querySelector('[data-iso-items]');
    if (items) {
    	const itemsGrid = new Isotope(items, {
    		itemSelector: '[data-iso-item]',
    		layoutMode: 'vertical',
    		// masonry: {
    		// 	fitWidth: true,
    		// 	gutter: 20
    		// }
    	});
        
        document.addEventListener("click", documentActions);
    	function documentActions(e) {
    		const targetElement = e.target;
    		if (targetElement.closest(".filter__item")) {
    			const filterItem = targetElement.closest(".filter__item");
    			const filterValue = filterItem.dataset.filter;
    			const filterActiveItem = document.querySelector('.filter__item.active');

    			filterValue === "*" ? itemsGrid.arrange({ filter: `` }) :
    				itemsGrid.arrange({ filter: `[data-filter="${filterValue}"]` })

    			filterActiveItem.classList.remove("active");
    			filterItem.classList.add("active");

    			e.preventDefault();
    		}
    	}
    }


});

