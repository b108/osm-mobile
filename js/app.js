define(['views/mapView', 'views/fullScreenView', 'views/updateLocation'], function(MapView, FullScreenView, UpdateLocationView) {
    var initialize = function() {
        new FullScreenView();
        new MapView();
        new UpdateLocationView();
    };

    return {
        initialize: initialize
    };
});
