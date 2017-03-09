class HamburgerMenu {
    constructor() {
        var clickEvent = ('ontouchstart' in window ? 'touchend' : 'click');
        this.hamburger = document.querySelector('.hamburger')
        this.hamburger.addEventListener(clickEvent, () => {
            this.hamburger.classList.toggle('active')
            this.toggleMenu();
        })
    }

    toggleMenu() {
        var header = document.querySelector('header')
        header.classList.toggle('open')
        if (header.classList.contains('visible')) {
            header.classList.toggle('visible')
        } else {
            setTimeout(() => {
                header.classList.toggle('visible')
            }, 50)
        }
    }
}

module.exports = HamburgerMenu