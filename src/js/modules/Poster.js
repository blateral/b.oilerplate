import imagesLoaded from 'imagesloaded';

const posters = document.querySelectorAll('.js-poster');

function cutsMustard() {
    return 'addEventListener' in window;
}

function setBgImage(poster, img) {
    picturefill({
        elements: [img]
    });
    poster.style.backgroundImage = `url(${img.currentSrc || img.src})`;
}

if(cutsMustard()) {
    [...posters].forEach(poster => {
        let img = poster.querySelector('img');
        imagesLoaded(img, setBgImage.bind(null, poster, img));
        img.addEventListener('load', setBgImage.bind(null, poster, img));
    })
}
