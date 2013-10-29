define(['Backbone', 'jQuery', 'EventBroker', 'models/currentPositionItem', 'functions/distanceMeters', 'models/mapStateItem'], function(Backbone, $, EventBroker, currentPosition, distanceMeters, mapState) {
    var i = 0;

    return Backbone.View.extend({
        model: currentPosition,
        initialize: function() {
            var ths = this;

            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(function(position) {
                    setTimeout(function() {
                        ths.model.set({
                            lon: position.coords.longitude, lat: position.coords.latitude
                        });
                    }, 0);
                });
            }

            this.model.on('change', function() {
                var distance = distanceMeters(ths.model.toJSON(), mapState.toJSON());
                $('h3').html(distance + '#s' + (i++));
                if (distance > 20) {
                    var newPosition = ths.model.toJSON();
                    newPosition.z = 18;
                    EventBroker.trigger('map:setCenter', newPosition);
                }
            });
        }
    });
});

