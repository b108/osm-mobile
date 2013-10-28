define(['views/mapView', 'views/fullScreenView'], function(MapView, FullScreenView) {
    var initialize = function() {
        new FullScreenView();
        new MapView();
    };

    return {
        initialize: initialize
    };
});
