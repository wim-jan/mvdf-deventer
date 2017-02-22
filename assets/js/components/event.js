class EventView {

    constructor() {
        this.events = document.querySelectorAll('.event.poster a');
        this.attatchEvents()
    }

    attatchEvents() {
        var self = this;
        this.events.forEach((event) => {
            event.addEventListener('click', (e) => {
                self.openEvent(e.target);
            })
        });
    }

    collapseEvents() {
        document.querySelectorAll('.container.event-listing.fold-out, .event.full.open, .container.event-listing.fold-out a.active').forEach((e) => {
            e.className = e.className
                .replace('fold-out', '')
                .replace('open', '')
                .replace('visible', '')
                .replace('active', '')
        });
    }

    openEvent(el) {
        var anchor = el.closest('a'),
            id = anchor.href.match(/\#(.*)$/)[1],
            event = document.querySelector('[data-id="' + id + '"]'),
            container = el.closest('div.container.event-listing')
        this.collapseEvents();

        event.className += ' open';
        container.className += ' fold-out';
        anchor.className += 'active';

        setTimeout(() => {
            event.className += ' visible';
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