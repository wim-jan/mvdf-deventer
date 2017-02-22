class HideAndSeek {

    constructor(element) {
        this.element = element
    }

    toggle() {
        if (this.element.className.match(/open|visible/)) {
            this.close()
        } else {
            this.open()
        }
    }

    open() {
        this.element.className += ' open'
        setTimeout(() => {
            this.element.className += ' visible'
        })
    }

    close() {
        this.element.className = this.element.className
            .replace('visible', '')
            .replace('open', '')
            .trim()
    }

    
}

module.exports = HideAndSeek