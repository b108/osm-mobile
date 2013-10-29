define(['Backbone', 'jQuery', 'EventBroker', 'models/mapState'], function(Backbone, $, EventBroker, MapState) {
    return Backbone.View.extend({
        model: new MapState(),
        initialize: function() {
            var ths = this;

            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(function(position) {
                    ths.model.set({
                        lon: position.coords.longitude, lat: position.coords.latitude, z: 18
                    });

                    startMapUpdate();
                });

                var startMapUpdate = function() {
                    var setCenter = function() {
                        EventBroker.trigger('map:setCenter', ths.model.toJSON());
                    };

                    setInterval(setCenter, 10000);

                    startMapUpdate = function() {};
                };
            }
        }
    });
});

