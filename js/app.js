define(['views/mapView', 'views/fullScreenView', 'views/updateLocation', 'views/currentPositionMarkerView', 'views/baseLayerView', 'views/dataLayerView', 'views/settingsView'/*'views/messageView'*/], function(MapView, FullScreenView, UpdateLocationView, CurrentPositionMarker, BaseLayerView, DataLayerView, SettingsPageView/*, MessagesView*/) {
    var initialize = function() {
        new MapView();
        new BaseLayerView();

        new DataLayerView();

        new FullScreenView();
        new UpdateLocationView();
        new CurrentPositionMarker();

        new SettingsPageView();

        //new MessagesView();
    };

    return {
        initialize: initialize
    };
});
