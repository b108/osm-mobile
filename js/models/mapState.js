define(['Backbone'], function(Backbone) {
    return new(Backbone.Model.extend({
            defaults: {
                // Leningrad
                lat: 59.95,
                lon: 30.30,
                z: 10
            },
            initialize: function() {
                this.fetch();
            },
            fetch: function() {
                if (window.localStorage) {
                    var storage = window.localStorage;
                    if (storage.lon && storage.lat && storage.z) {
                        this.set({lon: storage.lon, lat: storage.lat, z: storage.z});
                    }
                }
            },
            save: function() {
                if (window.localStorage) {
                    var storage = window.localStorage;
                    storage.lon = this.get('lon');
                    storage.lat = this.get('lat');
                    storage.z = this.get('z');
                }
            }
    }));
});
