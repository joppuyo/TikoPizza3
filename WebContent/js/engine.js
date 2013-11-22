/*

TikoPizzan tuotelistan ja ostoskorin UI  engine

*/



// onload-funktio (ajetaan kun koko sivu on täysin latautunut selaimeen)
$(function () {
    uiLoad()
});



function uiLoad() {

    catalog.load()
    cart.load()
}


// Lisätään nollia hintoihin tarpeen mukaan (6.5 -> 6.50)
function price_str(price) {
    price = String(price)
    if(price.indexOf(".") != -1) {
        if(price.split(".")[1].length == 1) {
            price = price+"0"
        }
    }
    return price
}

// Tuotekatalogiobjekti
function Catalog() {
    // lista ostoskorin sisällöstä (tuote id:t)
    this.products = product_catalog;

    // minkä mukaan tuotteet järjestetään
    this.sort_key="name";



    this.load = function() {
        // var product_catalog;
        this.products = product_catalog;       
        this.update();
    }

    // Päivitetään tuotelistaus tuote
    this.update = function() {
        prod_list = this.sortByKey(this.products, this.sort_key);
        $("#tuotteet-pizza").html('<div class="kategoria">PIZZAT</div>')
        $("#tuotteet-juoma").html('<div class="kategoria">JUOMAT</div>')

        for (var i = 0; i < prod_list.length; i++) {
            product = prod_list[i]
            s="<div onclick=\"cart.itemAdd("+product["id"]+")\" id=\"tuote-item-"+product["id"]+"\" class=\"tuote "+product["type"]+"\" style=\"background-image: url('images/tuotteet/"+product["id"]+".png')\"> \
             <div class=\"pitsuhintaboksi\">\
                 <div class=\"pitsuhinta\">"+price_str(product["price"])+" &euro;</div>\
             </div>\
             <div class=\"pitsuid\">\
               <div class=\"pitsunimi\">"+product["name"]+"</div>\
               <div class=\"pitsukuvaus\">"+product["desc"]+"</div>\
             </div>\
            </div>";
            $("#tuotteet-"+product["type"]).append(s)
        };
    }

    // järjestetään tuotelista array
    this.sortByKey = function(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    // järjestetään tuotelistaus tietiyn avaimen mukaan (name/price)
    this.sort = function(key) {
        this.sort_key=key
        this.update()
    }

    // haetaan tuote id:n perusteella
    this.getProduct = function(id) {
        product = false;
        for (var i = 0; i < this.products.length; i++) {
            prod = this.products[i]
            if(prod["id"]==id) {
                product = prod
                break
            }
        };
        return product;
    }

}

/*
    OSTOSKORI
*/

// Ostoskoriobjekti
function Cart() {
    // lista ostoskorin sisällöstä (tuote id:t)
    this.contents = [];
    this.cookie_name = "cart_contents";

    // Ostoskorin minimi- ja maksimikoko
    this.size_min = 1;
    this.size_max = 15;


    // Luetaan ostoskorin sisältö keksistä
    this.load = function() {
        value = $.cookie(this.cookie_name);
        if(value) {
            this.contents = value.split(",")
        }
        this.update(false)
    }

    // Tallennetaan ostoskorin sisältö keksiin
    this.store = function() {
        // muutetaan tuotelista pilkulla erotetuksi merkkijonoksi
        value = this.contents.join(",")
        // tallennetaan tuotelista 365pv säilyvään keksiin
        $.cookie(this.cookie_name, value, { expires: 365 });
    }

    // Lisätään ostoskoriin tuote id
    this.itemAdd = function(id) {
        // Tarkistetaan ettei ostoskori ole täynnä
        if(this.contents.length<this.size_max) {
            // Ostoskori ei ole täynnä, lisätään tuote
            this.contents.push(id);

            // Päivitetään ostoskorinäkymä (ja tallennetaan muutokset)
            this.update()
        }
        else {
            // Ostoskori on täynnä, ei lisätä tuotetta
            alert("Tilaukseen ei mahdu enempää tuotteita. Voit tilata enintään "+this.size_max+" tuotetta kerralla.")
            return false
        }
    }

    // Poistetaan tuote ostoskorista sen sijainnin mukaan
    this.itemRemove = function(index) {
        if (index > -1) {
            this.contents.splice(index, 1);
        }
        this.update()
    } 

    // Tyhjennetään koko ostoskori
    this.empty = function() {
        if(this.contents == []) return false; // tyhjälle korille ei tehdä mitään

        if(confirm("Haluatko varmasti tyhjentää ostoskorisi?")) {
            this.contents = [];
            this.update();
        }
    }

    // Päivitetään ostoskorinäkymä (sisältö & kokonaishinta)
    this.update = function(store) {
        this.updateContents()
        this.updatePrice()
        this.updateCount()

        this.store()
    }


    // Luodaan tuotelistan html
    this.updateContents = function() {
        // Tyhjennetään ostoskorielementin sisältö
        if(this.contents.length==0) {
            $("#cart-tuote-list").html("<span>Lisää tuotteet vasemmalta.</span>");
            return false;
        }
        $("#cart-tuote-list").html("");

        // Looppi ostoskorin tuotelistan luomista varten
        for (var i = 0; i < this.contents.length; i++) {
            // haetaan tuote id ostoskorin sisällöstä
            id = this.contents[i];

            // haetaan tuotelistasta haluttu tuote id:n mukaan
            product = catalog.getProduct(id);

            name = product["name"];
            desc = product["desc"];
            price = price_str(product["price"]);

            // elementin id
            eid = "cart-item-"+i+"-"+id;

            // Uuden tuotteen html
            var s = '<div class="cart-tuote" id="'+eid+'" title="'+desc+'">\
                <span class="nimi">'+name+'</span>\
                <span class="hinta">'+price+' &euro;</span>\
                <a title="Poista tuote" href="javascript:cart.itemRemove('+i+')">X</a>\
                </div>';

            // Lisätään tuoptelistaan uusi tuote
            $("#cart-tuote-list").append(s);
        };
    }

    // Lasketaan kokonaishinta
    this.updatePrice = function() {
        total = 0;
        for (var i = 0;i<this.contents.length;i++) {
            product = catalog.getProduct(this.contents[i])
            price = product["price"]
            total=total+price
        }
        
        // Pyöristetään kokonaishinta sentin tarkkuudella
        total = Math.round(total* 100) / 100
        total = price_str(total);
        // Asetetaan elementin sisältöön kokonaishinta
        $("#cart-total-price").html(total+" &euro;")
    }

    // Ilmoitetaan tuotteiden määrä
    this.updateCount =  function() {
        s = " tuotetta";
        count = this.contents.length
        if(count==0) {
            $("#cart-count").html("")
            return
        }
        if(count==1) s=" tuote"
        // Asetetaan elementin sisältöön kokonaishinta
        $("#cart-count").html(count+s)
    }

}


var cart = new Cart();
var catalog = new Catalog();
