var formreturn = {
    'address' : this.address
};

// note(bryanstephens): since data is not kept following a form submission, my workaround is to create a local session item to store the value of the address
var form = document.querySelector("form");
form.addEventListener("submit", function(event){
    formreturn.address = form.elements.address.value;
    localStorage.setItem("address", formreturn.address);
});

function initMap()
{

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14
    });
    var gcoder = new google.maps.Geocoder();

    // note(bryanstephens): since a user is not forced to submit a value in the form field, provide a default address of the school
    var address;
    if (localStorage.getItem("address") === null)
    {
        address = "205 Humber College Blvd";
    }
    else
    {
        address = localStorage.getItem("address");
    }
    gcoder.geocode(
        { 'address': address},
        function (results, status){
            if (status == 'OK'){
                //address geocoded successfully
                //center map on Humber
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map
                });
                localStorage.removeItem("address");
            } // end of statuscode check (AJAX)
        } // end of AJAX call
    );
} // end of initMap()

jQuery.ajax({
    url: 'https://lcboapi.com/stores?lat=43.8612895&lon=-79.3178956&products?q=beer',
    headers:
        {
            Authorization: 'Token MDphOTlkZjgwMC0yYzgyLTExZTctOTQyNi1lZmI3ZDc5NmUzZWY6ZHdYZlJVNlp5SHZiWXFBMUdFdEpBa1VyZjBYSm40TmpHa2tl'
        }
}).then(function(data) {
    var results = data["result"][0]["name"];

    console.log(results);
});

