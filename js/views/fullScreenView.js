define(['Backbone', 'jQuery', 'detect/fullScreen'], function(Backbone, $, detect) {
    return Backbone.View.extend({
        events: {
            'click .goFullScreen': 'goFullScreenClickHandler'
        },
        initialize: function() {
            this.setElement( $('body')[0] );

            if (detect.hasFullScreenAPI(this.el)) {
                this.$el.addClass('has-fullscreen');
            }
        },
        goFullScreenClickHandler: function(event) {
            detect.fullScreen( $(event.target).closest('.ui-page')[0] );
            return false;
        }
    });
});

