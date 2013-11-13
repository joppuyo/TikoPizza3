


function Cart() {
    this.contents = array();



    this.getInfo = function() {
        return this.color + ' ' + this.type + ' apple';
    };
    this.itemAdd = function(id) {
        alert(id);
        return this.color + ' ' + this.type + ' apple';
    };
}