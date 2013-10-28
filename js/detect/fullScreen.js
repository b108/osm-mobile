define([], function() {
    return function() {
        var element = document.createElement('div');

        return (element.requestFullscreen || element.webkitrequestFullscreen || element.mozRequestFullscreen);
    }
});

