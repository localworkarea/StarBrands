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
        }, 6000);
    }
    // =====================================================================================

    /*
    const items = document.querySelector('[data-iso-items]');
    if (items) {
    	const itemsGrid = new Isotope(items, {
    		itemSelector: '[data-iso-item]',
    		layoutMode: 'vertical',
    	});

        
        document.addEventListener("click", documentActions);
    	function documentActions(e) {
    		const targetElement = e.target;
    		if (targetElement.closest(".filter__item")) {
    			const filterItem = targetElement.closest(".filter__item");
    			const filterValue = filterItem.dataset.filter;
    			const filterActiveItem = document.querySelector('.filter__item.active');

    			// filterValue === "*" ? itemsGrid.arrange({ filter: `` }) :
    			// 	itemsGrid.arrange({ filter: `[data-filter="${filterValue}"]` })

                if (filterValue === "*") {
                    // Если значение фильтра равно "*", то отображаем все элементы
                    itemsGrid.arrange({ filter: `` }); // Пустая строка означает, что отображаются все элементы
                } else {
                    // Иначе применяем фильтрацию по указанному значению
                    itemsGrid.arrange({ filter: `[data-filter="${filterValue}"]` });
                }

    			filterActiveItem.classList.remove("active");
    			filterItem.classList.add("active");

    			e.preventDefault();
    		}
    	}
    }

    */

    // РАБОТА С ФИЛЬТРМИ СТРАНИЦА VACANCY ====================================================
    const itemsContainer = document.querySelector('[data-iso-items]');
    if (itemsContainer) {
        const itemsGrid = new Isotope(itemsContainer, {
            itemSelector: '[data-iso-item]',
            layoutMode: 'vertical',
        });

        // Получаем высоту padding верха и низа элемента itemsContainer
        const containerPaddingTop = parseFloat(window.getComputedStyle(itemsContainer).paddingTop);
        const containerPaddingBottom = parseFloat(window.getComputedStyle(itemsContainer).paddingBottom);

        const filterButtons = document.querySelectorAll('.filter__item');

        filterButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                filterButtons.forEach(function (btn) {
                    btn.classList.remove('active');
                });
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');
                if (filterValue === "*") {
                    itemsGrid.arrange({ filter: '[data-iso-item]:not([data-filter="empty"])' });
                } else {
                    itemsGrid.arrange({ filter: `[data-filter="${filterValue}"]` });
                }

                const filteredItems = itemsGrid.filteredItems;
                if (filteredItems.length === 0) {
                    const emptyItem = document.querySelector('[data-iso-item][data-filter="empty"]');
                    itemsGrid.revealItemElements(emptyItem);

                    const emptyItemHeight = emptyItem.offsetHeight;
                    itemsContainer.style.height = (emptyItemHeight + containerPaddingTop + containerPaddingBottom) + 'px';
                }
            });
        });

        // Изначально скрываем элементы с data-filter="empty"
        itemsGrid.hideItemElements(document.querySelectorAll('[data-iso-item][data-filter="empty"]'));
    }
    // =========================================================================
  

   
    const fileInputBodies = document.querySelectorAll('.file-upload');
    if (fileInputBodies.length > 0) {
        fileInputBodies.forEach(fileInputBody => {
            const fileInput = fileInputBody.querySelector('.file-upload__input');
            let fileErrorSpan = null;
            let previousFile = null; 
    
            if (fileInput) {
                fileInput.addEventListener('change', function(event) {
                    if (this.files && this.files.length > 0) {
                        const fileSizeInMB = this.files[0].size / (1024 * 1024);
                        if (fileSizeInMB > 10) {
                            const errorMessage = this.getAttribute('data-fe');
                            fileInput.classList.add('error');
    
                            if (!fileErrorSpan) {
                                fileErrorSpan = document.createElement('span');
                                fileErrorSpan.classList.add('file-error');
                                fileInputBody.appendChild(fileErrorSpan);
                            }
    
                            fileErrorSpan.textContent = errorMessage;
                            fileErrorSpan.style.display = 'block'; 
                            event.preventDefault();
                        } else {
                            fileInput.classList.remove('error');
                            if (fileErrorSpan) {
                                fileInputBody.removeChild(fileErrorSpan);
                                fileErrorSpan = null;
                            }
                            if (!fileInputBody.classList.contains('_upload')) {
                                fileInputBody.classList.add('_upload');
                            }
                            // Сохраняем предыдущий файл, чтобы позже проверить, нужно ли его удалить
                            previousFile = this.files[0];
                        }
                    } else {
                        fileInput.classList.remove('error');
                        if (fileErrorSpan) {
                            fileInputBody.removeChild(fileErrorSpan);
                            fileErrorSpan = null;
                        }
                        fileInputBody.classList.remove('_upload');
                    }
                });
            }
        });
    }


});



const popupButtons = document.querySelectorAll('[data-popup="#popup-vacancy"]');
if (popupButtons.length > 0) {
    popupButtons.forEach(button => {
      button.addEventListener('click', () => {
        const vacancyItem = button.closest('.vacancy__item');
        const position = vacancyItem.querySelector('.item-vacancy__position').textContent;
        const company = vacancyItem.querySelector('.item-vacancy__company span').textContent;
        const location = vacancyItem.querySelector('.item-vacancy__location span').textContent;
    
        const popupPosition = document.querySelector('.popup-vacancy__item .item-vacancy__position');
        const popupCompany = document.querySelector('.popup-vacancy__item .item-vacancy__company span');
        const popupLocation = document.querySelector('.popup-vacancy__item .item-vacancy__location span');
    
        popupPosition.textContent = position;
        popupCompany.textContent = company;
        popupLocation.textContent = location;
      });
    });
}
