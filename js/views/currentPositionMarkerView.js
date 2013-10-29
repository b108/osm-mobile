define(['Backbone', 'Leaflet', 'models/leafletMapObject', 'models/currentPositionItem'], function(Backbone, L, leafletMapObject, currentPosition) {
    return Backbone.View.extend({
        my_marker: null,
        initialize: function() {
            var map = leafletMapObject.getMap();
            var ths = this;

            currentPosition.on('change', function() {
                if (currentPosition.get('lat')) {
                    var newPosition = [currentPosition.get('lat'), currentPosition.get('lon')]
                    if (ths.my_marker) {
                        ths.my_marker.setLatLng(newPosition).update();
                    } else {
                        ths.my_marker = new L.Marker( newPosition ).addTo(map);
                    }
                }
            });
        }
    });
});

