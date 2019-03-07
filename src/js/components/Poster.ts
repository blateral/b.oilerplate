import 'picturefill';
import imagesLoaded from 'imagesloaded';

const posters = document.querySelectorAll('.js-poster');

function cutsMustard() {
    return 'addEventListener' in window;
}

function setBgImage(poster: HTMLElement, img: HTMLImageElement) {
    //@ts-ignore
    window.picturefill({
        elements: [img],
    });
    poster.style.backgroundImage = `url(${img.currentSrc || img.src})`;
}

if (cutsMustard()) {
    Array.from(posters).forEach(poster => {
        let img = poster.querySelector('img');
        if (img) {
            imagesLoaded(img, setBgImage.bind(null, poster, img));
            img.addEventListener('load', setBgImage.bind(null, poster, img));
        }
    });
}
