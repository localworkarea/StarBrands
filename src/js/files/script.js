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
    
});

