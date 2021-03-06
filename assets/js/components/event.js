window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

window.ga = window['ga'] || new Function

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
                self.toggleEvent(e.srcElement || e.target);
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
                this.scrollToY(obj.getBoundingClientRect().top, 500, 'easeInOutQuint')
            }, 100)
        }
    }

    toggleEvent(el) {

        el = el.nodeName == 'A' ? el : this.findAncestor(el, 'event')

        var id = el.href.match(/\#(.*)$/)[1],
            event = document.querySelector('[data-id="' + id + '"]'),
            row = this.findAncestor(el, 'event-row')

        if (el.classList.contains('open')) {
            row.style.height = 'auto'
        }

        event.classList.toggle('open')
        el.classList.toggle('open')

        var details = event.querySelector('.details'),
            content = event.querySelector('.content'),
            margin = 30,
            add = Math.max(details.getBoundingClientRect().height, content.getBoundingClientRect().height),
            height = row.getBoundingClientRect().height + add + margin

        if (window.innerWidth > 740) row.style.height = height + 'px'

        this.trackEvent()

        setTimeout(() => {
            event.className += " visible"
        }, 500)
    }

    scrollToY(scrollTargetY, speed, easing) {
        // scrollTargetY: the target scrollY property of the window
        // speed: time in pixels per second
        // easing: easing equation to use

        var scrollY = window.scrollY || document.documentElement.scrollTop,
            scrollTargetY = scrollTargetY || 0,
            speed = speed || 2000,
            easing = easing || 'easeOutSine',
            currentTime = 0;

        // min time .1, max time .8 seconds
        var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

        // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
        var easingEquations = {
                easeOutSine: function (pos) {
                    return Math.sin(pos * (Math.PI / 2));
                },
                easeInOutSine: function (pos) {
                    return (-0.5 * (Math.cos(Math.PI * pos) - 1));
                },
                easeInOutQuint: function (pos) {
                    if ((pos /= 0.5) < 1) {
                        return 0.5 * Math.pow(pos, 5);
                    }
                    return 0.5 * (Math.pow((pos - 2), 5) + 2);
                }
            };

        // add animation loop
        function tick() {
            currentTime += 1 / 60;

            var p = currentTime / time;
            var t = easingEquations[easing](p);

            if (p < 1) {
                requestAnimFrame(tick);

                window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
            } else {
                console.log('scroll done');
                window.scrollTo(0, scrollTargetY);
            }
        }

        // call it once to get started
        tick();
    }

    findAncestor (el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }

    trackEvent() {
        var path = location.pathname + location.search  + location.hash

        window.ga('send', 'event', {
            eventCategory: 'Programma link',
            eventAction: 'click',
            eventLabel: path
        })

        window.ga('send', 'pageview', {
            'page': path
        });
    }
}

module.exports = EventView;