define(['views/mapView', 'views/fullScreenView'], function(MapView, FullScreenView) {
    var initialize = function() {
        new MapView();
        new FullScreenView();
    };

    return {
        initialize: initialize
    };
});
