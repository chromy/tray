export default Ember.Route.extend({
  model() {
    return this.store.all('recipe');
  }
})
