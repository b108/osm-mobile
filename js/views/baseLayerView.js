define(['Backbone', 'Leaflet', 'models/leafletMapObject'], function(Backbone, L, leafletMapObject) {
    return Backbone.View.extend({
        initialize: function() {
            var map = leafletMapObject.getMap();

            var layer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo( map );
        }
    });
});
