import HideAndSeek from './hide-and-seek'

class EventView {

    constructor() {
        this.events = document.querySelectorAll('.event.poster a');

        if (!this.events || this.events.length < 1) return;

        this.event = null;
        this.eventObject = null;
        this.overlay = new HideAndSeek(document.querySelector('.overlay'));
        this.attatchEvents()
        this.checkForCurrentEvent()
    }

    attatchEvents() {
        var self = this;
        this.events.forEach((event) => {
            event.addEventListener('click', (e) => {
                self.openEvent(e.target);
            })
        });
        document.querySelector('.overlay').addEventListener('click', () => {
            self.collapseEvents();
        })
        document.querySelectorAll('.close-button').forEach((c) => {
            c.addEventListener('click', (e) => {
                self.collapseEvents()
                e.preventDefault()
                return false
            })
        })
    }

    checkForCurrentEvent() {
        var hash = window.location.href.match(/#(.*)$/),
            currentEvent = hash ? hash[1] : null

        if (currentEvent) this.findEvent(currentEvent)
    }

    collapseEvents() {
        document.querySelectorAll('.container.event-listing.fold-out, .container.event-listing a.active').forEach((e) => {
            e.className = e.className
                .replace('fold-out', '')
                .replace('active', '')
        });

        this.overlay.close();
        this.event.close();
        this.eventObject.style.left = 0;
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
        var anchor = el.closest('a'),
            id = anchor.href.match(/\#(.*)$/)[1],
            event = document.querySelector('[data-id="' + id + '"]'),
            container = el.closest('div.container.event-listing')

        this.event = new HideAndSeek(event)

        anchor.className += 'active';

        setTimeout(() => {
            this.overlay.open();

            setTimeout(() => {
                this.event.open()
            })
        })

        this.moveToLeft(el)
    }

    moveToLeft(el) {
        var obj = el.closest('.event.poster'),
            container = obj.closest('.bounding-box'),
            crect = container.getBoundingClientRect(),
            orect = obj.getBoundingClientRect()

        this.eventObject = obj;

        obj.style.left = 0 - (orect.left - crect.left) + "px"
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
}

module.exports = EventView;