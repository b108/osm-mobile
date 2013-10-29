define(['Backbone', 'Leaflet', 'models/leafletMapObject', 'models/mapStateItem', 'tpl!templates/request.xml', 'functions/osm2geo'], function(Backbone, L, leafletMapObject, mapState, request, osm2geo) {
    return Backbone.View.extend({
        my_layer: null,
        initialize: function() {
            var ths = this;

            mapState.on('change', function() {
                var map = leafletMapObject.getMap();
                var mapBounds = map.getBounds();

                var requestData = request({
                    south: mapBounds.getSouth(),
                    north: mapBounds.getNorth(),
                    east: mapBounds.getEast(),
                    west: mapBounds.getWest()
                });

                $.ajax({
                    type: 'POST',
                    url: 'http://overpass-api.de/api/interpreter',
                    data: requestData,
                    dataType: 'html',
                    success: function(xml) {
                        var data = osm2geo(xml);
                        //console.log(data);

                        ths.render(data);
                    }
                });
            });
        },
        render: function(data) {
            var map = leafletMapObject.getMap();

            if (this.my_layer) map.removeLayer(this.my_layer);

            var layer = L.geoJson(data).addTo( map );

            this.my_layer = layer;
        }
    });
});

