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


    // == страница Вакансии - перенос информации в попап-форму ==================================
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
    // ==========================================================================================


    // == страница Новости - перенос информации из карточки в попап ============================
    const popupButtonsNews = document.querySelectorAll('[data-popup="#popup-news"]');
    const popupContent = document.querySelector('.popup-news__body');

    if (popupButtonsNews.length > 0) {
        popupButtonsNews.forEach(button => {
            button.addEventListener('click', () => {
                const newsBlock = button.querySelector('.news-card__block');
                const newsBlockContent = newsBlock.innerHTML;
                popupContent.innerHTML = newsBlockContent;
            });
        });
    }
    // ==========================================================================================


    function setupChartWheelHandler() {
        var chartdiv = document.getElementById("chartdiv");
        if (chartdiv) {
                chartdiv.addEventListener("wheel", function(event) {
                    event.stopPropagation();
                });
        }
    }
    
    setupChartWheelHandler();

    
});


// Документация по карте AmChart 4 :
// https://www.amcharts.com/docs/v4/chart-types/map/
// ISO стандарты по странам для id: 
// https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements


/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// // Themes begin
// am4core.useTheme(am4themes_animated);
// // Themes end

// // Create map instance
// var chart = am4core.create("chartdiv", am4maps.MapChart);

// // Set map definition
// chart.geodata = am4geodata_worldLow;

// // Set projection
// chart.projection = new am4maps.projections.Miller();

// // Create map polygon series
// var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// // Exclude Antartica
// polygonSeries.exclude = ["AQ"];

// // Make map load polygon (like country names) data from GeoJSON
// polygonSeries.useGeodata = true;

// // Configure series
// var polygonTemplate = polygonSeries.mapPolygons.template;
// polygonTemplate.tooltipText = "{name}";
// polygonTemplate.fill = chart.colors.getIndex(0).lighten(0.3);
// // polygonTemplate.fill = am4core.color("#fff");


// // Create hover state and set alternative fill color
// var hs = polygonTemplate.states.create("hover");
// hs.properties.fill = chart.colors.getIndex(0);
// // hs.properties.fill = am4core.color("#008DC1");

// // Set yellow color for Ukraine
// polygonSeries.data = [{
//     "id": "UA",
//     // "name": "United States",
//     "value": 100,
//     "fill": am4core.color("#FFDA00")
//   }];
//   polygonTemplate.propertyFields.fill = "fill";

// // Add image series
// var imageSeries = chart.series.push(new am4maps.MapImageSeries());
// imageSeries.mapImages.template.propertyFields.longitude = "longitude";
// imageSeries.mapImages.template.propertyFields.latitude = "latitude";
// imageSeries.data = [ {
//   "title": "Brussels",
//   "latitude": 50.8371,
//   "longitude": 4.3676
// }, {
//   "title": "Copenhagen",
//   "latitude": 55.6763,
//   "longitude": 12.5681
// }, {
//   "title": "Paris",
//   "latitude": 48.8567,
//   "longitude": 2.3510
// }, {
//   "title": "Reykjavik",
//   "latitude": 64.1353,
//   "longitude": -21.8952
// }, {
//   "title": "Moscow",
//   "latitude": 55.7558,
//   "longitude": 37.6176
// }, {
//   "title": "Madrid",
//   "latitude": 40.4167,
//   "longitude": -3.7033
// }, {
//   "title": "London",
//   "latitude": 51.5002,
//   "longitude": -0.1262,
//   "url": "http://www.google.co.uk"
// }, {
//   "title": "Peking",
//   "latitude": 39.9056,
//   "longitude": 116.3958
// }, {
//   "title": "New Delhi",
//   "latitude": 28.6353,
//   "longitude": 77.2250
// }, {
//   "title": "Tokyo",
//   "latitude": 35.6785,
//   "longitude": 139.6823,
//   "url": "http://www.google.co.jp"
// }, {
//   "title": "Ankara",
//   "latitude": 39.9439,
//   "longitude": 32.8560
// }, {
//   "title": "Buenos Aires",
//   "latitude": -34.6118,
//   "longitude": -58.4173
// }, {
//   "title": "Brasilia",
//   "latitude": -15.7801,
//   "longitude": -47.9292
// }, {
//   "title": "Ottawa",
//   "latitude": 45.4235,
//   "longitude": -75.6979
// }, {
//   "title": "Washington",
//   "latitude": 38.8921,
//   "longitude": -77.0241
// }, {
//   "title": "Kinshasa",
//   "latitude": -4.3369,
//   "longitude": 15.3271
// }, {
//   "title": "Cairo",
//   "latitude": 30.0571,
//   "longitude": 31.2272
// }, {
//   "title": "Pretoria",
//   "latitude": -25.7463,
//   "longitude": 28.1876
// } ];

// // add events to recalculate map position when the map is moved or zoomed
// chart.events.on( "ready", updateCustomMarkers );
// chart.events.on( "mappositionchanged", updateCustomMarkers );

// // this function will take current images on the map and create HTML elements for them
// function updateCustomMarkers( event ) {
  
//   // go through all of the images
//   imageSeries.mapImages.each(function(image) {
//     // check if it has corresponding HTML element
//     if (!image.dummyData || !image.dummyData.externalElement) {
//       // create onex
//       image.dummyData = {
//         externalElement: createCustomMarker(image)
//       };
//     }

//     // reposition the element accoridng to coordinates
//     var xy = chart.geoPointToSVG( { longitude: image.longitude, latitude: image.latitude } );
//     image.dummyData.externalElement.style.top = xy.y + 'px';
//     image.dummyData.externalElement.style.left = xy.x + 'px';
//   });

// }

// // this function creates and returns a new marker element
// function createCustomMarker( image ) {
  
//   var chart = image.dataItem.component.chart;

//   // create holder
//   var holder = document.createElement( 'div' );
//   holder.className = 'map-marker';
//   holder.title = image.dataItem.dataContext.title;
//   holder.style.position = 'absolute';

//   // maybe add a link to it?
//   if ( undefined != image.url ) {
//     holder.onclick = function() {
//       window.location.href = image.url;
//     };
//     holder.className += ' map-clickable';
//   }

//   // create dot
//   var dot = document.createElement( 'div' );
//   dot.className = 'dot';
//   holder.appendChild( dot );

//   // create pulse
//   var pulse = document.createElement( 'div' );
//   pulse.className = 'pulse';
//   holder.appendChild( pulse );

//   // append the marker to the map container
//   chart.svgContainer.htmlElement.appendChild( holder );

//   return holder;
// }