define(['Backbone', 'jQuery'], function(Backbone, $) {
    return new(Backbone.Model.extend({
        my_map: null,
        initialize: function() {
        },
        setMap: function(map) {
            this.my_map = map;
        },
        getMap: function() {
            return this.my_map;
        }
    }));
});

