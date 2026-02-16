export const getIconSource = (systemName: string) => {
    switch (systemName) {
        case 'close':
            return require('./svg/close.svg');
        case 'menu':
            return require('./svg/menu.svg');
    }
};