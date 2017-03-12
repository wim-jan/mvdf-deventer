import eventPreview from './event-preview'

var MapBox = {
    
    apiToken: 'pk.eyJ1Ijoid2p2ZGhvZWsiLCJhIjoiY2l6NGg0eGVhMDAxdTJ3cGphYXpqZHduMyJ9.AdCJmSEMsSnYpiBVKTNihA',
    styleUrl: 'mapbox://styles/wjvdhoek/ciz4h5qem00932rmem49zudln',
    map: null,
    coordinates: [],
    
    init: function() {

        if (typeof(L) === 'undefined' || !document.querySelector('#map-container')) return

        L.mapbox.accessToken = this.apiToken
        
        this.map = L.mapbox.map('map-container', 'mapbox.light', {
            scrollWheelZoom: false,
            maxZoom: 18,
            minZoom: 12
        }).setView([52.253641, 6.155691], 15);

        var styleLayer = L.mapbox.styleLayer(this.styleUrl)
            .addTo(this.map);

        this.findCoordinates()
        this.addMarkers()
    },

    findCoordinates: function() {
        var arr = document.querySelectorAll('div[data-coordinates]'),
            el = null
        for (var i = 0, len = arr.length; i < len; i++) {
            el = arr[i]
            if (el.dataset.coordinates && JSON.parse(el.dataset.coordinates).length > 0)
                this.coordinates.push({
                    'id': el.dataset.id,
                    'latlon': JSON.parse(el.dataset.coordinates)
                })
        }
    },

    addMarkers: function() {
        var c = null,
            arr = this.coordinates,
            markers = []

        this.coordinates.map((c) => {
            var icon = L.divIcon({
                className: 'mvdf-deventer-marker',
                html: this.marker('#CC0000', c.id)
            });
            var marker = L.marker(c.latlon, {icon: icon, id: 'marker-' + c.id}).addTo(this.map)
                .on('click', (e) => {
                    this.highlightEvent(c.id)
                })
                .on('mouseover', (e) => {
                    this.highlightEvent(c.id)
                })
                .on('mouseout', (e) => {
                    this.highlightEvent(null)
                })
            markers.push(marker)
        })

        var group = new L.featureGroup(markers);

        // this.map.fitBounds(group.getBounds());
    },

    highlightEvent: function(id) {
        eventPreview.highlight(id)
    },

    highlightIcon: function(id) {
        icon = document.getElementById('svg[data-id="' + id + '"]')
        if (!icon) return
        icon.className = icon.className == 'active' ? '' : 'active'
    },

    marker: function(color, id) {
        var color = color || "#CC0000",
            svg = `
            <svg data-id="${id}" width="30px" height="42px" viewBox="613 458 30 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path d="M627.84535,477.942656 C624.885399,477.942656 622.476173,475.53343 622.476173,472.573479 C622.476173,469.613529 624.885399,467.204303 627.84535,467.204303 C630.8053,467.204303 633.214526,469.613529 633.214526,472.573479 C633.214526,475.53343 630.8053,477.942656 627.84535,477.942656 M638.110448,462.308381 C635.332283,459.530215 631.638289,458 627.709586,458 C623.780116,458 620.086889,459.530215 617.308724,462.308381 C612.167354,467.448984 611.528422,477.121172 615.925011,482.981244 L627.709586,500 L639.47652,483.005022 C643.889983,477.121172 643.251051,467.448984 638.110448,462.308381" id="Fill-1" stroke="none" fill="${color}" fill-rule="evenodd"></path>
            </svg>`
        return svg
    }
};

module.exports = MapBox;
