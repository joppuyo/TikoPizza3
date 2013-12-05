/*

TikoPizzan tilauslistan engine

*/


function prodListHTML(contents) {
    contents = contents.split(",");
    s = "";
    for (var i =0; i < contents.length; i++) {
        if(!contents[i]) {continue;}
        parts = contents[i].split("x");
        id = parts[0];
        count = parts[1];

        product = catalog.getProduct(id);
        name = product["name"];
        title = product["desc"];

        s+="<span class=\"tuote\" title=\""+title+"\">"+count+" x <strong>"+name+"</strong></span>"
    };
    return s;
}

function orderHTML(order) {
    maplink="https://www.google.com/maps/preview#!q="+order.addr+", "+order.area

    var date = new Date(order.time*1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var formattedTime = hours+':'+minutes;

    s="<div id=\"order-"+order["id"]+"\" class=\"tilaus "+order.status+"\"> \
     <h1> Tilaus #"+order["id"]+"</h1>\
      <table>\
        <tr>\
          <th>Vastaanotettu</th>\
          <th>Asiakas</th>\
          <th>Tilausosoite</th>\
          <th>Puhelinnumero</th>\
        </tr>\
        <tr>\
          <td>"+formattedTime+"</td>\
          <td>"+order["name"]+"</td>\
          <td><a href=\""+maplink+"\">"+order["addr"]+", "+order["pcode"]+" "+order["area"]+"</a></td>\
          <td>"+order["phone"]+"</td>\
        </tr>\
      </table>\
      <div>\
          <h2>Tuotteet:</h2>"+prodListHTML(order["contents"])+"\
      </div>\
    </div>";
    return s;
}

function Orders() {
    // lista ostoskorin sisällöstä (tuote id:t)
    this.orders = [];
    // minkä mukaan tuotteet järjestetään


    this.load = function() {
        this.getData()
        setInterval("orders.getData()",10000)   // Haetaan tilauslista 10sec välein
    }


    this.getData = function() {
        $.getJSON("orders",
        function(result){
            orders.orders = result;
            orders.gotData();
        })
        .error(function() { alert("error"); });
    }
    // Päivitetään tuotelistaus tuote
    this.gotData = function() {
        this.update()
    }

    // Päivitetään tilauslista
    this.update = function() {
        $("#tilaukset").html("")
        for (var i = 0; i < this.orders.length; i++) {
            order = this.orders[i];
            if(order.status=="tilattu") {
                $("#tilaukset").append(orderHTML(order))
            }
        };
        for (var i = 0; i < this.orders.length; i++) {
            order = this.orders[i];
            if(order.status=="kasittelyssa") {
                $("#tilaukset").append(orderHTML(order))
            }
        };
        for (var i = 0; i < this.orders.length; i++) {
            order = this.orders[i];
            if(order.status=="toimitettu") {
                $("#tilaukset").append(orderHTML(order))
            }
        };
    }

}
var catalog = new Catalog()
var orders = new Orders()

$(function () {
    catalog.load();
    orders.load();
})

