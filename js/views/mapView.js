define(['Backbone', 'jQuery', 'Leaflet'], function(Backbone, $, L) {
    return Backbone.View.extend({
        initialize: function() {
            var map_height = $('#map-page').height() - $('#map-page > .ui-header').height() - 2;

            $('#map').css('height', map_height + 'px');

            var map = L.map('map', {
                center: [59.95, 30.30], // Leningrad
                zoom: 12
            });

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo( map );
        }
    });
});

