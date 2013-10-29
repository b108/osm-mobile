define(['Backbone', 'jQuery', 'Leaflet', 'models/mapStateItem', 'EventBroker'], function(Backbone, $, L, mapState, EventBroker) {
    return Backbone.View.extend({
        model: mapState,
        interests: {
            'map:setCenter': 'mapSetCenterSignalHandler'
        },
        initialize: function() {
            //var map_height = $('#map-page').height() - $('#map-page > .ui-header').height() - 2;

            //$('#map').css('height', map_height + 'px');

            var state = this.model;

            var map = L.map('map', {
                center: [state.get('lat'), state.get('lon')], // Leningrad
                zoom: state.get('z')
            });

            map.on('moveend', function() {
                if (state._update_from_change) return;

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
                    state._update_from_change = true;
                    map.setView([state.get('lat'), state.get('lon')], state.get('z'));
                    delete state._update_from_change;
                }
            });

            //map.locate({watch: true, setView: true});

            EventBroker.register(this);

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo( map );

            L.control.scale().addTo(map);
        },
        mapSetCenterSignalHandler: function(position) {
            this.model.set(position);
        }
    });
});

