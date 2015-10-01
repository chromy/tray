import DS from 'ember-data';

export default Ember.Controller.extend({
  actions: {
    addIngredient() {
        this.store.createRecord('ingredient', {
            name: '',
            amount: '',
            unit: '',
            recipe: this.get('model')
        });
    },
    removeIngredient(ingredient) {
      ingredient.destroyRecord();
    }
  }
});
