define(['Backbone', 'jQuery', 'detect/fullScreen', 'models/settingsItem'], function(Backbone, $, detect, settings) {
    return Backbone.View.extend({
        events: {
            'change #full-screen-switcher': 'fullScreenToggleHandler',
            'click .goFullScreen': 'goFullScreenClickHandler'
        },
        initialize: function() {
            this.setElement( $('body')[0] );

            if (detect.hasFullScreenAPI($('body')[0])) {
                $('body').addClass('has-fullscreen');
            }

            //settings.on('change:fullScreen', this.render, this);

            var ths = this;

            this.$('#full-screen-switcher').bind(
                'create', function() {
                    ths.render();
                }
            );

            //if (settings.get('fullScreen')) this.goFullScreen();
        },
        render: function() {
            this.$('#full-screen-switcher').val( settings.get('fullScreen') ? 'on' : 'off' ).slider('refresh');
        },
        fullScreenToggleHandler: function(event) {
            var $select = $('#full-screen-switcher');
            var value = $select.val();

            switch(value) {
                case 'on':
                    this.goFullScreen();
                    break;
                case 'off':
                    this.exitFullScreen();
                    break;
            }

            settings.set('fullScreen', value == 'on');

            return true;
        },
        goFullScreen: function() {
            detect.fullScreen( $('body')[0] );
        },
        exitFullScreen: function() {
            detect.exitFullScreen()
            $('body').removeClass('fullScreen');
        },
        goFullScreenClickHandler: function(event) {
            detect.fullScreen( $('html')[0] );

            return false;
        }
    });
});
