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

        var isMobile = window.innerWidth <= 740

        if (!this.zigzags.length || isMobile) return;

        this.attachListeners()
        setTimeout(() => {
            this.fillOutToRight()
        })
    },

    attachListeners: function() {
        var self = this,
            arr = this.events,
            ev = null

        window.addEventListener('resize', (e) => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                self.position()
                self.fillOutToRight()
            }, 500);
        })
        for (var i = 0, len = arr.length; i < len; i++) {
            ev = arr[i]
            ev.addEventListener('mouseover', (e) => {
                var open = document.querySelectorAll('.event.preview.highlight'),
                    el = null
                for (var x = 0, lenx = open.length; x < lenx; x++) {
                    el = open[x]
                    el.className = el.className.replace(' highlight', '')
                }
            })
        }
    },

    position: function () {
        var arr = this.zigzags,
            z = null
            
        for (var i = 0, len = arr.length; i < len; i++) {
            z = arr[i]
            z.style.left = Math.ceil(0 - (z.getBoundingClientRect().left % 300)) + 'px'
        }
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
        var arr = document.querySelectorAll('.event.preview.highlight'),
            ce = null
            
        for (var i = 0, len = arr.length; i < len; i++) {
            ce = arr[i]
            ce.className = ce.className.replace(' highlight', '')
        }
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