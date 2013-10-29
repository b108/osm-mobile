define(['Backbone', 'jQuery', 'EventBroker'], function(Backbone, $, EventBroker) {
    return Backbone.View.extend({
        initialize: function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    EventBroker.trigger('map:setCenter', {lon: position.coords.latitude, lat: position.coords.longitude});
                });
            }
        }
    });
});

