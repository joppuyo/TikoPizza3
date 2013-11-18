$("input[type='text'][name='email']").blur(function () {
	var value = $( this ).val();
	
	
	if ( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ) {
	
		$( "#email-validator" ).hide( "slow" );
		
	}
	
	else {
		$( "#email-validator" ).show( "slow" );
	}
	
});

$("input[type='text'][name='puhelinnumero']").blur(function () {
	var value = $( this ).val();
	
	
	if ( /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/.test(value) ) {
	
		$( "#puhelinnumero-validator" ).hide( "slow" );
		
	}
	
	else {
		$( "#puhelinnumero-validator" ).show( "slow" );
	}
	
});

var pitseria_latitude = 60.2012589;
var pitseria_longitude = 24.9339573;

$("input").blur(function () {
	
	var katu = $( "#osoite" ).val();
	var postinro = $( "#postinumero" ).val();
	var postitmi = $( "#postitoimipaikka" ).val();

	if (katu.length != 0 && postinro.length != 0 && postitmi.length != 0 ) {
	
var url= "http://maps.googleapis.com/maps/api/geocode/json?address="+katu+" "+postinro+" "+postitmi+"&sensor=false";

$.getJSON(url, function (jsonobj) { 
    var latitude = jsonobj.results[0].geometry.location.lat;    
    var longitude = jsonobj.results[0].geometry.location.lng;
    matka = LaskePituus(pitseria_latitude,pitseria_longitude,latitude,longitude);
    if (matka < 3) {
    	$( "#osoite-validator" ).hide( "slow" );
    } else {
    	$( "#osoite-validator" ).show( "slow" );
    };
});

	} });

function LaskePituus(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}