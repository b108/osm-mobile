define(['Backbone', 'jQuery', 'detect/fullScreen', 'models/settingsItem'], function(Backbone, $, detect, settings) {
    return Backbone.View.extend({
        events: {
            'click .goFullScreen': 'goFullScreenClickHandler'
        },
        initialize: function() {
            this.setElement( $('body')[0] );

            if (detect.hasFullScreenAPI($('body')[0])) {
                this.$el.addClass('has-fullscreen');
            }

            var ths = this;
        },
        goFullScreen: function() {
            var ths = this;

            $('body').fullScreen({
                callback: function(isFullScreen) {
                    //console.log(isFullScreen);
                    $('body')[isFullScreen ? 'addClass' : 'removeClass']('fullScreen');
                }
            });
        },
        goFullScreenClickHandler: function(event) {
            this.goFullScreen();

            return false;
        }
    });
});
