export default Ember.Route.extend({
  model() {
    this.store.push('ingredient', {
        id: 1,
        name: 'Eggs',
        quantity: '1'
    });
   this.store.push('ingredient', {
        id: 2,
        name: 'Milk',
        quantity: '10ml',
    });
   this.store.push('recipe', {
        id: 1,
        name: 'Pie',
        makes: '1',
        required: '2',
        ingredients: [1, 2]
    });
  }
});
