define(['Backbone', 'Leaflet', 'models/leafletMapObject', 'models/settingsItem'], function(Backbone, L, leafletMapObject, settingsItem) {
    return Backbone.View.extend({
        my_layer: null,
        initialize: function() {
            this.render();

            settingsItem.on('change:base_layer_url', function() {
                var ths = this;

                setTimeout(function() {
                    ths.render();
                }, 0);
            }, this);
        },
        render: function() {
            var map = leafletMapObject.getMap();

            if (this.my_layer) map.removeLayer( this.my_layer );

            var layer = L.tileLayer(settingsItem.get('base_layer_url'), {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo( map );

            this.my_layer = layer;
        }
    });
});
