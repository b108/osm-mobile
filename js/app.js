define(['views/mapView', 'views/fullScreenView', 'views/updateLocation', 'views/currentPositionMarkerView', 'views/baseLayerView', 'views/dataLayerView', 'views/settingsView', 'views/featureView'/*'views/messageView'*/], function(MapView, FullScreenView, UpdateLocationView, CurrentPositionMarker, BaseLayerView, DataLayerView, SettingsPageView, FeatureView/*, MessagesView*/) {
    var initialize = function() {
        new MapView();
        new BaseLayerView();

        new DataLayerView();

        new FullScreenView();
        new UpdateLocationView();
        new CurrentPositionMarker();

        new SettingsPageView();

        //new MessagesView();
        //

        new FeatureView();
    };

    return {
        initialize: initialize
    };
});
