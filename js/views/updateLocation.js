define(['Backbone', 'jQuery', 'EventBroker', 'models/currentPositionItem'], function(Backbone, $, EventBroker, currentPosition) {
    return Backbone.View.extend({
        model: currentPosition,
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
                        var newPosition = ths.model.toJSON();
                        newPosition.z = 18;
                        EventBroker.trigger('map:setCenter', newPosition);
                    };

                    setInterval(setCenter, 10000);

                    startMapUpdate = function() {};
                };
            }
        }
    });
});

