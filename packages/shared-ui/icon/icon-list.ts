export const getIconSource = (systemName: string) => {
    switch (systemName) {
        case 'close':
            return require('./svg/close.svg');
        case 'menu':
            return require('./svg/menu.svg');
        case 'arrow-triangle':
            return require('./svg/arrow-triangle.svg');
        case 'gallery':
            return require('./svg/gallery.svg');
        case 'trending-down':
            return require('./svg/trending-down.svg');
        case 'trending-up':
            return require('./svg/trending-up.svg');
        case 'home-active':
            return require('./svg/home-active.svg');
    }
};