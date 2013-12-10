/*

TikoPizzan tilauslistan engine

*/


function prodListHTML(contents) {
    // alert(contents)
    contents = contents.split(",");
    s = "";
    prods = {};
    for (var i =0; i < contents.length; i++) {
        if(!contents[i]) {continue;}
        id = contents[i];
        if(prods[id]==undefined) {
            prods[id]=1
        }
        else {
            prods[id]+=1
        }
    }
    for (var id in prods) {
        product = catalog.getProduct(id);
        name = product["name"];
        title = product["desc"];
        count = prods[id];

        s+="<span class=\"order-tuote\" title=\""+title+"\">"+count+" x <strong>"+name+"</strong></span>"
    }
    return s;
}

function add_zero(x) {
    if(x<10) return "0"+x;
    return ""+x;
}
function orderItemHTML(order) {
    s="<li id=\"order-link-id_"+order.id+"\" class=\"order status-"+order.status+"\">\
    <a class=\"status-"+order.status+"\" href=\"#order-anchor-"+order.id+"\">Tilaus #"+order.id+"</a></li>";
    // <a class=\"status-"+order.status+"\" href=\"javascript:orders.select("+order.id+")\">Tilaus #"+order.id+"</a></li>";
    return s;
}


function orderHTML(order) {
    maplink="https://www.google.com/maps/preview#!q="+order.addr+", "+order.area

    var date = new Date(order.time*1000);
    var hours = add_zero(date.getHours());
    var minutes = add_zero(date.getMinutes());
    var day = add_zero(date.getDay());
    var month = add_zero(date.getMonth());
    var year = date.getFullYear();
    var formattedTime = hours+':'+minutes+" "+day+"."+month+"."+year;

    s="<div id=\"order-"+order["id"]+"\" class=\"tilaus status-"+order.status+"\"> \
    <h1> Tilaus #"+order["id"]+"</h1>\
    <table>\
        <tr>\
          <th>Vastaanotettu</th>\
          <th>Asiakas</th>\
          <th>Tilausosoite</th>\
          <th>Email</th>\
          <th>Puhelinnumero</th>\
        </tr>\
        <tr>\
          <td>"+formattedTime+"</td>\
          <td>"+order["name"]+"</td>\
          <td><a href=\""+maplink+"\">"+order["addr"]+", "+order["pcode"]+" "+order["area"]+"</a></td>\
          <td>"+order["email"]+"</td>\
          <td>"+order["phone"]+"</td>\
        </tr>\
    </table>\
          <div class=\"products\">\
              <h2>Tuotteet:</h2>"+prodListHTML(order["contents"])+"\
          </div>\
          <div class=\"buttons\">\
              <a class=\"poista\" href=\"javascript:orders.delete("+order.id+")\">Poista</a>\
              <a class=\"sta1\"   href=\"javascript:orders.status("+order.id+","+1+")\">Käsittelyssä</a>\
              <a class=\"sta2\" href=\"javascript:orders.status("+order.id+","+2+")\">Toimitettu</a>\
          </div>\
    </div>";
    return s;
}
function timeDiff(utime) {
    // utime = utime*1000
    var current_time = new Date().getTime()/1000;
    // diff=current_time-utime
    diff = Math.round(current_time-utime);

    if(diff < 60) {
       return "juuri nyt";
    }
    if(diff<60*60) {
        return Math.round(diff/60)+" min"
    }
    h = Math.round(diff/(60*60))
    if(h*60*60 > diff) h-=1
    m = Math.round((diff-(h*60*60))/60)
    if(m==60) {m=59}
    return h+" h  "+m+" min"
    return diff

}
function orderInfoHTML(order) {
    maplink="https://www.google.com/maps/preview#!q="+order.addr+", "+order.area


    var date = new Date(order.time*1000);
    var hours = add_zero(date.getHours());
    var minutes = add_zero(date.getMinutes());
    var day = add_zero(date.getDay());
    var month = add_zero(date.getMonth());
    var year = date.getFullYear();
    var formattedTime = hours+':'+minutes+" "+day+"."+month+"."+year;

    style = ""
    if(orders.is_new(order)) {
        style = "display:none;"
    }



    s="<div id=\"order-"+order.id+"\" class=\"tilaus status-"+order.status+"\" style=\""+style+"\"> \
        <h1><a name=\"order-anchor-"+order.id+"\">Tilaus #"+order.id+"</a><span id=\"order-time-"+order.id+"\">"+timeDiff(order.time)+"</span></h1>\
        <div class=\"info\">\
          <div><span>Vastaanotettu</span>"+formattedTime+"</div>\
          <div><span>Asiakas</span>"+order["name"]+"</div>\
          <div><span>Tilausosoite</span><a href=\""+maplink+"\">"+order["addr"]+", "+order["pcode"]+" "+order["area"]+"</a></div>\
          <div><span>Email</span>"+order["email"]+"</div>\
          <div><span>Puhelinnumero</span>"+order["phone"]+"</div>\
        </div>\
        <div class=\"products\">\
            "+prodListHTML(order["contents"])+"\
        </div>\
        <div class=\"buttons\">\
            <a class=\"poista\" href=\"javascript:orders.delete("+order.id+")\">Poista</a>\
            <a class=\"sta1\"   href=\"javascript:orders.status("+order.id+","+1+")\">Käsittelyssä</a>\
            <a class=\"sta2\" href=\"javascript:orders.status("+order.id+","+2+")\">Toimitettu</a>\
        </div>\
    </div>";
    return s;
}

function Orders() {
    // lista ostoskorin sisällöstä (tuote id:t)
    this.old_orders = -1;
    this.orders = -1;
    this.current_order=-1;
    this.notif_sound = new Audio('notif.wav');
    this.chart = null;
    // minkä mukaan tuotteet järjestetään


    this.load = function() {
        this.getData()
        setInterval("orders.refresh()",8000)   // Haetaan tilauslista 8sec välein
    }

    this.refresh = function() {
        this.getData();
    }

    this.getData = function() {
        $.getJSON("orders",
        function(result){
            orders.old_orders = orders.orders
            orders.orders = result;

            if(JSON.stringify(orders.old_orders)!=JSON.stringify(result)) {
                orders.gotData();
                if(orders.old_orders != -1) {
                    if(orders.old_orders.length<orders.orders.length) {
                        orders.notif_sound.play();
                    }
                }
            }
            else {
                orders.updateTimes();
            }
        })
        //.error(function() { alert("error"); });
    }
    // Päivitetään tuotelistaus tuote
    this.gotData = function() {
        if(orders.current_order==-1) {
            if(orders.orders == []){
                orders.current_order=orders.orders[0].id
            };
        }
        this.update()
    }

    this.get = function(id) {
        for (var i = this.orders.length - 1; i >= 0; i--) {
            order = this.orders[i];
            if(order.id==id) {return order;}
        };
    }

    this.is_new = function(order) {
        num = 0
        for (var i = this.old_orders.length - 1; i >= 0; i--) {
            o = this.old_orders[i];
            if(num<o.time) {
                num = o.time;
            }
        };
        if(num==0) { return false;}
        return order.time>num;

    }

    this.delete = function(id) {
        if(!confirm("Haluatko poistaa tilauksen pysyvästi?")) {
            return false;
        }

        $("#order-"+id).slideUp(1000)
        $("#order-link-id_"+id).slideUp(1000)


        setTimeout()
        setTimeout(function(){
            $.getJSON("orders?action=delete&id="+id,
            function(result){
                orders.current_order = -1;
                orders.orders = result;
                orders.gotData();
            })        //.error(function() { alert("error"); });
            },1000);
        }
    this.status = function(id,status) {
        if(status==this.get(id).status) {return false;}
        $.getJSON("orders?action=status&id="+id+"&status="+status,
        function(result){
            orders.orders = result;
            orders.gotData();
        })
        //.error(function() { alert("error"); });
    }

    this.select = function(id) {
        this.current_order=id
        this.update()
    }

    this.updateStats = function(stats) {
        total = stats[0]+stats[1]+stats[2];

        w1 = 100*(1.0*stats[0]/total)
        w2 = 100*(1.0*stats[1]/total)
        w3 = 100*(1.0*stats[2]/total)

        $("#order-stats-bar").html("<div class=\"status-2\" style=\"width:"+w3+"%\"></div><div class=\"status-1\" style=\"width:"+w2+"%\"></div><div class=\"status-0\" style=\"width:"+w1+"%\"></div>")




    Highcharts.setOptions({colors: ['#ed0b0b', '#fae20a', '#8bbc21']});
    if(this.chart==null) {
        container=$("#order-stats-chart")
        this.chart = new Highcharts.Chart({
            chart: {
                renderTo:container[0],
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                width: 0,
            },
            exporting: {
                enabled:false
            },
            title: {
                text: '',
                align: 'center',
                verticalAlign: 'middle',
                y: 50
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b><br><b>{point.value}</b>'
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: false,
                        distance: 10,
                        style: {
                            fontWeight: 'bold',
                            color: 'white',
                            textShadow: '0px 1px 2px black'
                        }
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', 115],
                    size:250,
                    animation:true
                    // center: ['50%', '50%']
                }
            },
            series: [{
                type: 'pie',
                // name: 'Browser share',
                innerSize: '130%',
                animation: true,
                data: [
                    ['Uusi',   w1],
                    ['Käsittelyssä',       w2],
                    ['Toimitettu', w3],
                ]
            }]
        });
        }else{
            this.chart.series[0].data[0].update(['Uusi',   w1]);
            this.chart.series[0].data[1].update(['Käsittelyssä',   w2]);
            this.chart.series[0].data[2].update(['Toimitettu',   w3]);
        }
    }

    this.updateTimes = function() {
        for (var i = 0; i < this.orders.length; i++) {
            order = this.orders[i];
            $("#order-time-"+order.id).text(timeDiff(order.time))
        }
    }

    // Päivitetään tilauslista
    this.update = function() {
        elemid="#orders-status-"
        $(elemid+"0").html("")
        $(elemid+"1").html("")
        $(elemid+"2").html("")
        $("#order-info").html("")


        stats = Array(0,0,0);

        newelems = [];
        for (var i = 0; i < this.orders.length; i++) {
            order = this.orders[i];

        

            $(elemid+order.status).append(orderItemHTML(order))

            stats[order.status]+=1

            $("#order-info").append(orderInfoHTML(order))
            if(this.is_new(order)) {
                $("#order-link-id_"+order.id).hide()
                newelems.push( $("#order-"+order.id) )
                newelems.push( $("#order-link-id_"+order.id) )
            }
        }

        for (var i = newelems.length - 1; i >= 0; i--) {
            newelems[i].slideDown(1000)
        };



        $( "#orders-status-0,#orders-status-1" ).sortable({
              connectWith: ".orders-dnd1",
              revert: true,
              placeholder: "order-placeholder",
            }).disableSelection();


        $( "#orders-status-1" ).droppable({ accept: ".status-0" });
        $( "#orders-status-1" ).on( "drop", function( event, ui ) {
            id = parseInt($(ui.draggable).attr("id").split("_")[1]);
            orders.status(id,1);

        } );


        $( "#orders-status-1,#orders-status-2" ).sortable({
              connectWith: "#orders-status-2",
              // connectWith: ".orders-dnd2",
              revert: true,
              placeholder: "order-placeholder",
            }).disableSelection();


        $( "#orders-status-2" ).droppable({ accept: ".status-1" });
        $( "#orders-status-2" ).on( "drop", function( event, ui ) {
            id = parseInt($(ui.draggable).attr("id").split("_")[1]);
            orders.status(id,2);

        } );

        this.updateStats(stats);

    }

}
var catalog = new Catalog()
var orders = new Orders()

$(function () {
    catalog.load();
    orders.load();
})

