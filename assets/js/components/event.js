class EventView {

    constructor() {
        this.events = document.querySelectorAll('.event.poster a');

        if (!this.events || this.events.length < 1) return;

        this.event = null;
        this.eventObject = null;
        this.attatchEvents()
        this.checkForCurrentEvent()
    }

    attatchEvents() {
        var self = this,
            arr = this.events,
            event = null

        for (var i = 0, len = arr.length; i < len; i++) {
            event = arr[i]
            event.addEventListener('click', (e) => {
                self.openEvent(e.srcElement || e.target);
            })
        }

        var arr = document.querySelectorAll('.close-button'),
            c = null

        for (var i = 0, len = arr.length; i < len; i++) {
            c = arr[i]
            c.addEventListener('click', (e) => {
                self.collapseEvents()
                e.preventDefault()
                return false
            })
        }
    }

    checkForCurrentEvent() {
        var hash = window.location.href.match(/#(.*)$/),
            currentEvent = hash ? hash[1] : null

        if (currentEvent) this.findEvent(currentEvent)
    }

    collapseEvents() {
        var arr = document.querySelectorAll('.event.open, .event.visible'),
            e = null,
            row = null

        for (var i = 0, len = arr.length; i < len; i++) {
            e = arr[i]
            e.className = e.className
                .replace('open', '')
                .replace('visible', '')

            row = this.findAncestor(e, 'event-row')
            row.style.height = 'auto'
        };
    }

    findEvent(id) {
        var obj = document.querySelector('[data-event-id="' + id + '"]')
        if (obj) {
            setTimeout(() => {
                obj.click()
            }, 1000)
        }
    }

    openEvent(el) {

        this.collapseEvents();

        el = el.nodeName == 'A' ? el : this.findAncestor(el, 'event')

        var id = el.href.match(/\#(.*)$/)[1],
            event = document.querySelector('[data-id="' + id + '"]'),
            row = this.findAncestor(el, 'event-row')

        event.className += " open"

        var details = event.querySelector('.details'),
            content = event.querySelector('.content'),
            margin = 30,
            add = Math.max(details.getBoundingClientRect().height, content.getBoundingClientRect().height),
            height = row.getBoundingClientRect().height + add + margin

        row.style.height = height + 'px'

        setTimeout(() => {
            event.className += " visible"
        }, 500)
    }

    doScrolling(elementY, duration) { 
        var startingY = window.pageYOffset  
        var diff = elementY - startingY  
        var start

        // Bootstrap our animation - it will get called right before next frame shall be rendered.
        window.requestAnimationFrame(function step(timestamp) {
            if (!start) start = timestamp
            // Elapsed miliseconds since start of scrolling.
            var time = timestamp - start
            // Get percent of completion in range [0, 1].
            var percent = Math.min(time / duration, 1)

            window.scrollTo(0, startingY + diff * percent)

            // Proceed with animation as long as we wanted it to.
            if (time < duration) {
                window.requestAnimationFrame(step)
            }
        })
    }

    findAncestor (el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }
}

module.exports = EventView;