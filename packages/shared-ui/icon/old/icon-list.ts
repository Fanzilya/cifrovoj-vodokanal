export const getIconSource = (systemName: string) => {
    switch (systemName) {
        case 'search-gray-dark':
            return require('./svg/search-gray-dark.svg');
        case 'list-clipboard-white':
            return require('./svg/list-clipboard-white.svg');
        case 'list-clipboard':
            return require('./svg/list-clipboard.svg');
        case 'map-white':
            return require('./svg/map-white.svg');
        case 'map':
            return require('./svg/map.svg');
        case 'list':
            return require('./svg/list.svg');
        case 'home-active':
            return require('./svg/home-active.svg');
        case 'bell':
            return require('./svg/bell.svg');
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
    }
};