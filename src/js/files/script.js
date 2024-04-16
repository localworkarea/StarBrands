// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


document.addEventListener('DOMContentLoaded', function() {
  const videoButtons = document.querySelectorAll('.video-youtube__button');

  videoButtons.forEach(button => {
      button.addEventListener('click', function() {
          const youTubeCode = this.getAttribute('data-youtube');
          const urlVideo = `https://www.youtube.com/embed/${youTubeCode}?rel=0&showinfo=0&autoplay=1`;

          const iframe = document.createElement('iframe');
          iframe.setAttribute('src', urlVideo);
          iframe.setAttribute('allowfullscreen', '');

          const autoplay = true; // включаем автовоспроизведение

          if (autoplay) {
              iframe.setAttribute('allow', 'autoplay; encrypted-media');
          }

          const body = this.closest('.video-youtube__body'); // получаем обертку видео
          body.innerHTML = ''; // очищаем содержимое обертки
          body.appendChild(iframe); // добавляем iframe в обертку
          body.classList.add('video-added');
      });
  });
});
