var MapBox = {
    
    apiToken: 'pk.eyJ1Ijoid2p2ZGhvZWsiLCJhIjoiY2l6NGg0eGVhMDAxdTJ3cGphYXpqZHduMyJ9.AdCJmSEMsSnYpiBVKTNihA',
    styleUrl: 'mapbox://styles/wjvdhoek/ciz4h5qem00932rmem49zudln',
    map: null,
    coordinates: [],
    
    init: function() {
        L.mapbox.accessToken = this.apiToken
        
        this.map = L.mapbox.map('map-container', 'mapbox.light', {
            scrollWheelZoom: false,
            maxZoom: 18,
            minZoom: 12
        }).setView([52.253641, 6.155691], 16);

        var styleLayer = L.mapbox.styleLayer(this.styleUrl)
            .addTo(this.map);

        this.findCoordinates()
        this.addMarkers()
    },

    findCoordinates: function() {
        var elements = document.querySelectorAll('div[data-coordinates]')
        elements.forEach((el) => {
            console.log()
            if (el.dataset.coordinates && JSON.parse(el.dataset.coordinates).length > 0)
                this.coordinates.push({
                    'id': el.dataset.id,
                    'latlon': JSON.parse(el.dataset.coordinates)
                })
        })
    },

    addMarkers: function() {
        this.coordinates.forEach((c) => {
            L.marker(c.latlon).addTo(this.map)
                .on('click', (e) => {
                    this.highlightEvent(c.id)
                })
        })
    },

    highlightEvent: function(id) {
        document.querySelectorAll('.event.preview.highlight').forEach((ce) => {
            ce.className = ce.className.replace(' highlight', '')
        })
        var event = document.querySelector('div[data-id="' + id + '"]')
        event.className += ' highlight'
    }
};

module.exports = MapBox;
