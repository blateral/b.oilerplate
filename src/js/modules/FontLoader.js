import FontFaceObserver from 'fontfaceobserver';

const sourceSans400 = new FontFaceObserver('Source Sans Pro', {
    weight: 400
});

const sourceSans400Italic = new FontFaceObserver('Source Sans Pro', {
    weight: 400,
    style: 'italic'
});

const sourceSans700 = new FontFaceObserver('Source Sans Pro', {
    weight: 700
});

const sourceSans600 = new FontFaceObserver('Source Sans Pro', {
    weight: 600
});

Promise.all([
    sourceSans400.check(),
    sourceSans400Italic.check(),
    sourceSans700.check(),
    sourceSans600.check()
]).then(() => {
    document.documentElement.className += ' fl';
}, () => {
    console.log('Fonts not loaded');
})
