// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


document.addEventListener('DOMContentLoaded', function() {




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
    

});

// Получаем ссылку на видео и его контейнер
const video = document.querySelector('.hero__video');
if (video) {
    // Обработчик изменения размера окна
    window.addEventListener('resize', () => {
      // При изменении размера окна пересчитываем видео
      checkScreenSize();
    });
    
    // Функция для проверки размера экрана и выбора соответствующего видео
    function checkScreenSize() {
      if (window.matchMedia('(min-width: 30.06125em)').matches) {
        const pcSource = video.querySelector('.video-hero-pc').getAttribute('src');
        video.src = pcSource;
      } else {
        const mobSource = video.querySelector('.video-hero-mob').getAttribute('src');
        video.src = mobSource;
      }
    }
    
    // Вызываем функцию при загрузке страницы
    checkScreenSize();
}
