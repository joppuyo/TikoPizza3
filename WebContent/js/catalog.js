// Tuotekatalogiobjekti
function Catalog() {
    // lista ostoskorin sisällöstä (tuote id:t)
    this.products = [];
    // minkä mukaan tuotteet järjestetään
    this.sort_key="name";

    this.load = function() {
        // var product_catalog;
        this.products = product_catalog;       
        this.update();
    }

    // Päivitetään tuotelistaus tuote
    this.update = function() {
        
        // Tarkistetaan ollaanko tuotelistauksessa
        if( $('#tuotteet-pizza').length == 0) {
            return false
        }

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
