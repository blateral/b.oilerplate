import { createStore, Store } from './Store';

interface State {
    isCookieSet: boolean;
}

export const readCookie = (name: string) => {
    let equalName = name + '=';
    let cookieArray = document.cookie.split(';');
    let cookieValue = false;

    cookieArray.forEach(cookie => {
        while (cookie.charAt(0) === ' ')
            cookie = cookie.substring(1, cookie.length);

        if (cookie.indexOf(equalName) === 0) {
            cookieValue =
                cookie.substring(equalName.length, cookie.length) === 'true';
        }
    });

    return cookieValue;
};

export const setCookie = (name: string, value: any, days: number) => {
    let expires = '';

    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }

    document.cookie = name + '=' + value + expires + '; path=/';
};

const handleCookieClose = (name: string, store: Store<State>) => () => {
    setCookie(name, true, 360);

    store.setState({
        isCookieSet: true,
    });
};

export const handleCookie = (name: string) => {
    const $cookie = document.getElementById('js-cookie');
    const $cookieClose = document.getElementById('js-cookie-close');

    if ($cookie && $cookieClose) {
        const store = createStore({
            isCookieSet: readCookie(name),
        });

        const _handleCookieClose = (_name: string, _store: Store<State>) =>
            handleCookieClose(_name, _store);

        store.subscribe(() => {
            if (store.getState().isCookieSet) {
                $cookie.style.display = 'none';
            }
        });

        if (!store.getState().isCookieSet) {
            $cookieClose.addEventListener(
                'click',
                _handleCookieClose(name, store)
            );
        } else {
            $cookie.style.display = 'none';
        }
    }
};
