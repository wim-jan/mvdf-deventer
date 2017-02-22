import HideAndSeek from './hide-and-seek'

class EventView {

    constructor() {
        this.events = document.querySelectorAll('.event.poster a');
        this.event = null;
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
        document.querySelectorAll('.container.event-listing.fold-out, .container.event-listing.fold-out a.active').forEach((e) => {
            e.className = e.className
                .replace('fold-out', '')
                .replace('active', '')
        });

        this.overlay.close();
        this.event.close();
    }

    openEvent(el) {
        var anchor = el.closest('a'),
            id = anchor.href.match(/\#(.*)$/)[1],
            event = document.querySelector('[data-id="' + id + '"]'),
            container = el.closest('div.container.event-listing')
        
        this.event = new HideAndSeek(event)

        container.className += ' fold-out';
        anchor.className += 'active';

        setTimeout(() => {
            this.overlay.open();

            setTimeout(() => {
                this.event.open()
            }, 1000)
        }, 500)

        this.slideToEvent(event)
    }

    slideToEvent(event) {
        var rect = event.getBoundingClientRect(),
            top = rect.top
        console.log(top)
    }
}

module.exports = EventView;