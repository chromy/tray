export default Ember.Component.extend({
    required: Ember.computed('quantity', 'multiplier', function() {
        let quantity = this.get('quantity');
        let multiplier = this.get('multiplier');
        let regex = /([^A-Za-z]*)(.*)/;
        let result = regex.exec(quantity);
        let amount = result[1];
        let unit = result[2];
        //let qty;
        //try {
        //    qty = new Qty(quantity);
        //} catch (QtyError) {
        //    return "?"
        //}
        //let newQty = qty.mul(multiplier);
        //return newQty.toString();
        if (amount === "" || isNaN(amount)) {
            return "?";
        }
        return multiplier * amount + " " + unit;
    })
});
