define(['views/mapView', 'views/fullScreenView', 'views/updateLocation', 'views/currentPositionMarkerView', 'views/baseLayerView'], function(MapView, FullScreenView, UpdateLocationView, CurrentPositionMarker, BaseLayerView) {
    var initialize = function() {
        new MapView();
        new BaseLayerView();

        new FullScreenView();
        new UpdateLocationView();
        new CurrentPositionMarker();
    };

    return {
        initialize: initialize
    };
});
