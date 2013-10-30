define(['Backbone', 'jQuery', 'detect/fullScreen', 'models/settingsItem'], function(Backbone, $, detect, settings) {
    return Backbone.View.extend({
        events: {
            'slidestop #full-screen-switcher': 'fullScreenToggleHandler',
            'click .goFullScreen': 'goFullScreenClickHandler'
        },
        initialize: function() {
            this.setElement( $('body')[0] );

            if (detect.hasFullScreenAPI($('body')[0])) {
                $('body').addClass('has-fullscreen');
            }

            //settings.on('change:fullScreen', this.render, this);

            var ths = this;

            //if (settings.get('fullScreen')) this.goFullScreen();
            //
            alert('init');
        },
        render: function() {
            this.$('#full-screen-switcher').val( settings.get('fullScreen') ? 'on' : 'off' ).slider('refresh');
        },
        fullScreenToggleHandler: function(event) {
            var $select = $('#full-screen-switcher');
            var ths = this;

            setTimeout(function() {
                var value = $select.val();

                switch(value) {
                    case 'on':
                        ths.goFullScreen();
                        break;
                    case 'off':
                        ths.exitFullScreen();
                        break;
                }
                settings.set('fullScreen', value == 'on');
            }, 0)
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
