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
        // We have to wait till after the element is actually inserted 
        // to put the focus on it, we can't use autofocus because it's a 
        // ContentEditable not a form element and don't want to subclass 
        Ember.run.scheduleOnce('afterRender', this, function(){
            $('.ingredientName').last().focus();
        });
    },
    removeIngredient(ingredient) {
      ingredient.destroyRecord();
    }
  }
});
