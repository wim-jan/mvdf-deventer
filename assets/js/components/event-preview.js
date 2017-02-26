var EventPreview = {
    events: [],
    zigzags: [],
    eventColumn: null,
    eventSlider: null,
    sliderContainer: null,
    resizeTimer: null,
    currentEvent: null,

    init: function() {
        this.events = document.querySelectorAll('.event.preview')
        this.zigzags = document.querySelectorAll('.event.preview .zigzag .inner')
        this.eventColumn = document.querySelector('.events.col-md-8')
        this.eventSlider = document.querySelector('.event-slider')
        this.sliderContainer = document.querySelector('.event-slider .slide-container')
        if (!this.zigzags.length) return;

        this.attachListeners()
        setTimeout(() => {
            this.fillOutToRight()
        })
    },

    attachListeners: function() {
        var self = this
        window.addEventListener('resize', (e) => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                self.position()
                self.fillOutToRight()
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

    fillOutToRight: function() {
        var dRect = document.querySelector('.deventer.col-md-4').getBoundingClientRect(),
            width = window.innerWidth

        this.eventColumn.style.width = width - dRect.right + 'px'
    },

    getEventById: function(id) {
        return document.querySelector('div[data-id="' + id + '"]')
    },

    highlight: function(id) {
        if (this.currentEvent == id) return
        this.clearCurrentHighlights()

        if (id === null) return
        var event = this.getEventById(id)
        if (!this.isInView(event)) {
            this.slideToEvent(event)
        }

        event.className += ' highlight'
        this.currentEvent = id
    },

    clearCurrentHighlights: function() {
        document.querySelectorAll('.event.preview.highlight').forEach((ce) => {
            ce.className = ce.className.replace(' highlight', '')
        })
    },

    isInView: function(event) {
        var rect = event.getBoundingClientRect(),
            cRect = this.eventSlider.getBoundingClientRect(),
            minLeft = cRect.left + 30,
            maxRight = window.innerWidth - 30
        return rect.right < maxRight && rect.left > minLeft
    },

    slideToEvent: function(event) {
        var width = this.events[0].scrollWidth,
            rect = event.getBoundingClientRect(),
            cRect = this.eventSlider.getBoundingClientRect(),
            minLeft = cRect.left,
            maxRight = window.innerWidth,
            left = 15,
            arr = Array.prototype.slice.call(this.events)
        
        if (rect.right > maxRight) {
            left -= rect.right - maxRight
        } else if (rect.left < minLeft) {
            left += (0 - (arr.indexOf(event) * width))
        }

        this.sliderContainer.style.left = left + 'px'
    }
}

module.exports = EventPreview