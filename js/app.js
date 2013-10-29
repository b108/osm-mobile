define(['views/mapView', 'views/fullScreenView', 'views/updateLocation', 'views/currentPositionMarkerView'], function(MapView, FullScreenView, UpdateLocationView, CurrentPositionMarker) {
    var initialize = function() {
        new FullScreenView();
        new MapView();
        new UpdateLocationView();
        new CurrentPositionMarker();
    };

    return {
        initialize: initialize
    };
});
