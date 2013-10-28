define(['Leaflet'], function(L) {
    var initialize = function() {
        var map_height = $('#map-page').height() - $('#map-page > .ui-header').height() - 15 * 2 - 2;

        $('#map').css('height', map_height);

        var map = L.map('map', {
            center: [51, 0],
            zoom: 13
        });

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo( map );
    };

    return {
        initialize: initialize
    };
});
