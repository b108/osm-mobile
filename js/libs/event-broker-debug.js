define(['Backbone', 'BackboneEventBroker'], function(Backbone, _BE) {
    var BE = Backbone.EventBroker;

    return {
        register: function() {
            return BE.register.apply(BE, arguments)
        },
        trigger: function() {
            var params = [];
            for(var i=1; i<arguments.length; i++) {
                params.push(arguments[i]);
            }

            if (window.console) console.log('sendSignal: ' + arguments[0], params);
            return BE.trigger.apply(BE, arguments)
        }
    }
});
