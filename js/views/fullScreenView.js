define(['Backbone', 'jQuery', 'detect/fullScreen', 'models/settingsItem'], function(Backbone, $, detect, settings) {
    return Backbone.View.extend({
        events: {
            'change #full-screen-switcher': 'fullScreenToggleHandler'
        },
        initialize: function() {
            this.setElement( $('#full-screen-switcher').parent()[0] );

            if (detect.hasFullScreenAPI($('body')[0])) {
                $('body').addClass('has-fullscreen');
            }

            //settings.on('change:fullScreen', this.render, this);

            this.render();

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
            detect.fullScreen( $('html').addClass('fullScreen')[0] );
        },
        exitFullScreen: function() {
            detect.exitFullScreen()
            $('html').removeClass('fullScreen');
        }
    });
});
