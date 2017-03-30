import FontFaceObserver from 'fontfaceobserver';

export const createFontLoader = (fonts = {}) => {
    const fontsToLoad = Object.keys(fonts)
        .map(fontName => {
            const fontVariation = fonts[fontName] || {};
            return new FontFaceObserver(fontName, fontVariation)
        })

    const loadAll = () => {
        return Promise.all(
            fontsToLoad.map(font => font.load())
        )
    }

    return {
        fonts: fontsToLoad,
        loadAll
    }
}
