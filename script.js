var map, geocoder;
function initMap()
{
    var center = new google.maps.LatLng(43.6425662,-79.3870568);
    var mapOptions = {
        zoom: 15,
        center: center,
        // styling from map came from Google's map style generator: https://mapstyle.withgoogle.com/
        styles : [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#242f3e"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#746855"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#242f3e"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#263c3f"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#6b9a76"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#38414e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#212a37"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9ca5b3"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#746855"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#1f2835"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#f3d19c"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2f3948"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#17263c"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#515c6d"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#17263c"
                    }
                ]
            }
        ]
    };
    map = new google.maps.Map(document.querySelector("#map"), mapOptions);
} // end of initMap()

var form = document.querySelector("form");
var formreturn = {
    'address' : this.address
};
form.addEventListener("submit", function(event){
    formreturn.address = form.elements.address.value;
    var address = formreturn.address;
    geocoder = new google.maps.Geocoder();
    geocoder.geocode(
        {'address': address},
        function(results, status)
        {
            if (status === "OK")
            {
                map.setCenter(results[0].geometry.location);
                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();
                jQuery.ajax({
                    url: 'https://lcboapi.com/stores?lat=' + lat + '&lon=' + lng +'&products?q=beer',
                    headers:
                        {
                            Authorization: 'Token MDphOTlkZjgwMC0yYzgyLTExZTctOTQyNi1lZmI3ZDc5NmUzZWY6ZHdYZlJVNlp5SHZiWXFBMUdFdEpBa1VyZjBYSm40TmpHa2tl'
                        }
                }).then(function(data) {
                    var results = data["result"];
                    // // Note(bryanstephens): Open/close times are represented as minutes since midnight; Have to convert time to 12 hour clock and then measure current time against what time it closes
                    //
                    // function min24(m){
                    //     var hour = m / 60;
                    //     var mins = m % 60;
                    //     return [hour, mins];
                    // }
                    // function min12(msn){
                    //     var time = min24(msn);
                    //     var h24 = time[0];
                    //     var h12 = (0 === h24 ? 12 : (h24 > 12 ? (h24 - 10) - 2 : h24));
                    //     var current = (h24 >= 12 ? 'PM' : 'AM');
                    //
                    //     return [h12, time[1], current];
                    // }
                    // var test = results[0]["sunday_closed"];
                    //
                    // var timeTest = min24(test);
                    // //var tested = min12(timeTest);
                    // console.log(timeTest);

                    for (var i = 0; i < results.length; i++){

                        // Note(bryanstephens): positions sets the lng & lat of each returned result
                        var positions = [
                            {lat: results[i]["latitude"], lng: results[i]["longitude"] }
                        ];

                        var markers = positions.map(function(location, k){
                            var marker = new google.maps.Marker({
                                position: location,
                                map: map
                            });
                            var infoWindow = new google.maps.InfoWindow({
                                content: '<div>' +
                                '<h2>' + results[i]["name"]  + '</h2>' +
                                '<p>' + results[i]["address_line_1"] + '</p>' +
                                '<p>' + results[i]["distance_in_meters"] + ' meters away</p>' +
                                '</div>'
                            });
                            google.maps.event.addListener(marker,'click', function(){
                                infoWindow.open(map,marker);
                            })
                        });

                }// end of for loop
                });
            }// check if status is not OK
            else
            {
                console.log(status);
            }
        });// end of google geocode event
    event.preventDefault();
});
