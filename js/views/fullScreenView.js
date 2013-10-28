define(['Backbone', 'jQuery', 'detect/fullScreen'], function(Backbone, $, hasFullScreenAPI) {
    return Backbone.View.extend({
        initialize: function() {
            if (hasFullScreenAPI()) {
                $('body').addClass('has-fullscreen');
                alert(1);
            }
        }
    });
});

