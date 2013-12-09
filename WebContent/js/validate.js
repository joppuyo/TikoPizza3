//kun kŠyttŠjŠ yrittŠŠ lŠhettŠŠ lomakkeen

$( "#order-form" ).submit(function( event ) {
	
	//validoi etunimi
	
	var etunimi = $("input[type='text'][name='etunimi']").val();
	if (/^[a-zA-Z]+(([\'\,\.\-][a-zA-Z])?[a-zA-Z]*)*$/.test(etunimi)) {
		$("#etunimi-validator").hide("slow");
	} else {
		event.preventDefault();
		$("#etunimi-validator").show("slow");
	}
	
	//validoi sukunimi
	
	var sukunimi = $("input[type='text'][name='sukunimi']").val();
	if (/^[a-zA-Z]+(([\'\,\.\-][a-zA-Z])?[a-zA-Z]*)*$/.test(sukunimi)) {
		$("#sukunimi-validator").hide("slow");
	} else {
		event.preventDefault();
		$("#sukunimi-validator").show("slow");
	}
	
	//validoi puhelin
	
	var puhelin = $("input[type='text'][name='puhelinnumero']").val();
	if (/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/.test(puhelin) && puhelin.length > 6 && puhelin.length < 11) {
		$("#puhelinnumero-validator").hide("slow");
	} else {
		event.preventDefault();
		$("#puhelinnumero-validator").show("slow");
	}
	
	//validoi email
	
	var email = $("input[type='text'][name='email']").val();
	if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
		$("#email-validator").hide("slow");
	} else {
		event.preventDefault();
		$("#email-validator").show("slow");
	}
	
	//validoi osoite

	var pitseria_latitude = 60.2012589;
	var pitseria_longitude = 24.9339573;
	
		var katu = $("#osoite").val();
		var postinro = $("#postinumero").val();
		var postitmi = $("#postitoimipaikka").val();

			var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + katu + " " + postinro + " " + postitmi + "&sensor=false";
			$.getJSON(url, function(jsonobj) {
				if (jsonobj.status == "OK") {
				var latitude = jsonobj.results[0].geometry.location.lat;
				var longitude = jsonobj.results[0].geometry.location.lng;
				matka = LaskePituus(pitseria_latitude, pitseria_longitude, latitude, longitude);
				if (matka < 3 && katu.length > 0 && postinro.length > 0 && postitmi.length > 0) {
					$("#osoite-validator").hide("slow");
				} else {
					$("#osoite-validator").html("Osoite ei toimitusalueella. Anna toinen osoite.");
					$("#osoite-validator").show("slow");
					event.preventDefault();
				};
				} else {
					$("#osoite-validator").html("Tarkista osoite.");
					$("#osoite-validator").show("slow");
					event.preventDefault();
				}
			});

	$("#tuotteet-input").val(cart.contents.join(","))

	
});

function LaskePituus(lat1, lon1, lat2, lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1); // deg2rad below
	var dLon = deg2rad(lon2 - lon1);
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI / 180);
}	