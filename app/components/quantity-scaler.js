export default Ember.Component.extend({
    required: Ember.computed('quantity', 'multiplier', function() {
        let quantity = this.get('quantity');
        let multiplier = this.get('multiplier');
        let qty;
        try {
            qty = new Qty(quantity);
        } catch (QtyError) {
            return "?"
        }
        let newQty = qty.mul(multiplier);

        return newQty.toString();
    })
});
