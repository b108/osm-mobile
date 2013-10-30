define(['Backbone', 'jQuery'], function(Backbone, $) {
    var settings = new(Backbone.Model.extend({
        defaults: {
            fullScreen: false
        },
        initialize: function() {
        },
        save: function() {
            localStorage.settings = JSON.stringify( this.toJSON() );
        },
        fetch: function() {
            if (localStorage.settings) this.set( JSON.parse( localStorage.settings ) );
        }
    }));

    settings.fetch();

    settings.on('change', settings.save, settings);

    return settings;
});

