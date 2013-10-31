define(['Backbone', 'Leaflet', 'models/leafletMapObject', 'models/mapStateItem', 'tpl!templates/request.xml', 'functions/osm2geo', 'EventBroker'], function(Backbone, L, leafletMapObject, mapState, request, osm2geo, EventBroker) {
    return Backbone.View.extend({
        my_layer: null,
        my_selected_layer: null,
        my_request_bounds: null,
        initialize: function() {
            mapState.on('change', this.updateLayerIfNeed, this);

            setTimeout(function() {
                EventBroker.trigger('ui:showMessage', '!ggg');
            }, 1110);

            this.updateLayerIfNeed();
        },
        updateLayerIfNeed: function() {
            var ths = this;
            var map = leafletMapObject.getMap();
            var mapBounds = map.getBounds();

            if (this.my_request_bounds && this.my_request_bounds.contains( mapBounds )) {
                return;
            }

            var point = mapBounds.getSouthWest();

            var a_meters = point.distanceTo([mapBounds.getSouth(), mapBounds.getEast()]);
            var b_meters = point.distanceTo([mapBounds.getNorth(), mapBounds.getWest()]);

            if ((a_meters * b_meters) > 500 * 400 * 2) return;

            var requestBounds = mapBounds.pad(0.3);

            var requestData = request({
                south: requestBounds.getSouth(),
                north: requestBounds.getNorth(),
                east: requestBounds.getEast(),
                west: requestBounds.getWest()
            });

            this.my_request_bounds = requestBounds;

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
        },
        render: function(data) {
            var map = leafletMapObject.getMap();
            var ths = this;

            if (this.my_layer) map.removeLayer(this.my_layer);

            var layer = L.geoJson(data, {
                onEachFeature: function(feature, layer) {
                    layer.on('click', function(e) {
                        if (ths.my_selected_layer) {
                            ths.my_selected_layer.setStyle( ths.my_selected_layer.originalStyle );
                        }
                        layer.originalStyle = layer.options;

                        layer.setStyle({color: '#0000ff', weight: 8});

                        ths.my_selected_layer = layer;
                    });
                }
            }).addTo( map );

            this.my_layer = layer;
        }
    });
});

