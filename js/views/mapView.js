define(['Backbone', 'jQuery', 'Leaflet', 'models/mapState'], function(Backbone, $, L, mapState) {
    return Backbone.View.extend({
        model: mapState,
        initialize: function() {
            //var map_height = $('#map-page').height() - $('#map-page > .ui-header').height() - 2;

            //$('#map').css('height', map_height + 'px');

            var state = this.model;

            var map = L.map('map', {
                center: [state.get('lat'), state.get('lon')], // Leningrad
                zoom: state.get('z')
            });

            map.on('moveend', function() {
                var latlon = map.getCenter();

                state._update_from_map = true;

                state.set({
                    lon: latlon.lon,
                    lat: latlon.lat,
                    z: map.getZoom()
                });

                delete state._update_from_map;
            });

            state.on('change', function() {
                if (!state._update_from_map) {
                    map.setView([state.get('lat'), state.get('lon')], state.get('z'));
                }
            });

            map.locate({watch: true, setView: true});

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo( map );

            L.control.scale().addTo(map);
        }
    });
});

