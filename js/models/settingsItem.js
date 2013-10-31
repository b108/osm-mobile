define(['Backbone', 'jQuery'], function(Backbone, $) {
    var settings = new(Backbone.Model.extend({
        defaults: {
            fullScreen: false,
            base_layer_url: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
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
