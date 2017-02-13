var EventPreview = {
    events: [],
    zigzags: [],
    resizeTimer: null,

    init: function() {
        this.events = document.querySelectorAll('.event.preview')
        this.zigzags = document.querySelectorAll('.event.preview .zigzag .inner')
        if (!this.zigzags) return;

        this.attachListeners()
    },

    attachListeners: function() {
        window.addEventListener('resize', (e) => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(function () {
                this.position()
            }, 500);
        })
        this.events.forEach((ev) => {
            ev.addEventListener('mouseover', (e) => {
                document.querySelectorAll('.event.preview.highlight').forEach((x) => {
                    x.className = x.className.replace(' highlight', '')
                })
            })
        })
    },

    position: function () {
        this.zigzags.forEach((z) => {
            z.style.left = Math.ceil(0 - (z.getBoundingClientRect().left % 300)) + 'px'
        })
    },
}

module.exports = EventPreview