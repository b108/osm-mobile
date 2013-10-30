define([], function() {
    return {
        hasFullScreenAPI: function(element) {
            return !!(element.requestFullscreen || element.webkitRequestFullScreen || element.mozRequestFullScreen);
        },
        fullScreen: function(element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullScreen ) {
                element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            }
        },
        exitFullScreen: function() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            }
        }
    };
});

