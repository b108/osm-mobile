define(['Backbone', 'Underscore'], function(Backbone, _) {
    return Backbone.Model.extend({
        initialize: function() {
        },
        setProperty: function(property, value) {
            this.set(property, value);
        },
        getProperty: function(property) {
            return this.get(property) || null;
        },
        getOsmType: function() {
            return this.id.split(':')[0];
        },
        getOsmIdInt: function() {
            return this.id.split(':')[1];
        }
    });
});
