import FontFaceObserver from 'fontfaceobserver';

let sourceSans400 = new FontFaceObserver('Source Sans Pro', {
    weight: 400
});

let sourceSans400Italic = new FontFaceObserver('Source Sans Pro', {
    weight: 400,
    style: 'italic'
});

let sourceSans700 = new FontFaceObserver('Source Sans Pro', {
    weight: 700
});

let sourceSans600 = new FontFaceObserver('Source Sans Pro', {
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
