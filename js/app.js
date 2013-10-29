define(['views/mapView', 'views/fullScreenView', 'views/updateLocation', 'views/currentPositionMarkerView', 'views/baseLayerView', 'views/dataLayerView'], function(MapView, FullScreenView, UpdateLocationView, CurrentPositionMarker, BaseLayerView, DataLayerView) {
    var initialize = function() {
        new MapView();
        new BaseLayerView();

        new DataLayerView();

        new FullScreenView();
        new UpdateLocationView();
        new CurrentPositionMarker();
    };

    return {
        initialize: initialize
    };
});
