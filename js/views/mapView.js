define(['Backbone', 'jQuery', 'Leaflet', 'models/mapStateItem', 'EventBroker', 'models/leafletMapObject'], function(Backbone, $, L, mapState, EventBroker, leafletMapObject) {
    return Backbone.View.extend({
        model: mapState,
        interests: {
            'map:setCenter': 'mapSetCenterSignalHandler'
        },
        initialize: function() {
            //var map_height = $('#map-page').height() - $('#map-page > .ui-header').height() - 2;

            //$('#map').css('height', map_height + 'px');

            var state = this.model;
            state.fetch();

            state.on('change', state.save, state);

            var map = L.map('map', {
                center: [state.get('lat'), state.get('lon')], // Leningrad
                zoom: state.get('z'),
                maxZoom: 19
            });

            leafletMapObject.setMap(map);

            map.on('moveend', function() {
                if (state._update_from_change) return;

                var latlon = map.getCenter();

                state._update_from_map = true;

                state.set({
                    lon: latlon.lng,
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

            $('#map-page').bind('pageshow', function() {
                setTimeout(function() {
                    map.invalidateSize();
                }, 0);
            });

            //map.locate({watch: true, setView: true});

            EventBroker.register(this);

            /*
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo( map );
            */

            L.control.scale().addTo(map);
        },
        mapSetCenterSignalHandler: function(position) {
            this.model.set(position);
        }
    });
});
