class Analytics {
    constructor() {
        var anchors = document.querySelectorAll('a[target="_blank"]')

        for (var i = 0; i < anchors.length; i++) {
            var a = anchors[i]
            a.addEventListener('click', (e) => {
                this.track(a.href)
            })
        }
    }
    
    track(href) {
        window.ga('send', 'event', {
            eventCategory: 'Outbound link',
            eventAction: 'click',
            eventLabel: href
        })
    }
}

module.exports = Analytics