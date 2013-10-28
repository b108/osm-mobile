define([], function() {
    return {
        hasFullScreenAPI: function(element) {
            return !!(element.requestFullscreen || element.webkitRequestFullscreen || element.mozRequestFullScreen);
        },
        fullScreen: function(element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullscreen ) {
                element.webkitRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            }
        }
    };
});

