define(['Leaflet'], function(L) {
    return function(latlon1, latlon2) {
        var latlon = new L.LatLng(latlon1.lat, latlon1.lon);

        return latlon.distanceTo([latlon2.lat, latlon2.lon]);
    }
});

