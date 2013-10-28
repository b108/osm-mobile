require.config({
    baseUrl:'/js',
    paths: {
        tpl: "libs/tpl",
        models: "models",
        views: "views",
        jQuery:"jQuery.from.window",
        Leaflet:"Leaflet.from.window",
        Backbone:'libs/backbone',
        Underscore: "libs/underscore"
    },
    shim: {
        'Underscore':{
            deps: ['jQuery'],
            exports: 'Underscore'
        },
        'Backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['Underscore', 'jQuery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'BackboneEventBroker': {
            deps: ['Backbone'],
            exports: 'BackboneEventBroker'
        }
    }
});

require([
    'app',
    'jQuery'
], function(App, $) {
    $(App.initialize);
});
