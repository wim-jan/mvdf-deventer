import HideAndSeek from './hide-and-seek'

class EventView {

    constructor() {
        this.events = document.querySelectorAll('.event.poster a');
        this.event = null;
        this.eventObject = null;
        this.overlay = new HideAndSeek(document.querySelector('.overlay'));
        this.attatchEvents()
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
            }, 500)
        }, 100)

        this.moveToLeft(el)

        // this.doScrolling(container.getBoundingClientRect().top, 500)
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