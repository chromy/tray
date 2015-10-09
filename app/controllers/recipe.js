import DS from 'ember-data';

export default Ember.Controller.extend({
  inAreaMode: true,

  multiplier: Ember.computed('inAreaMode', 'model.trayMultiplier', 'model.makesMultiplier', function() {
      if (this.get('inAreaMode')) {
        return this.get('model.trayMultiplier');
      } else {
        return this.get('model.makesMultiplier');
      }
  }),

  actions: {
    toggleMode() {
      this.toggleProperty('inAreaMode');
    },

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
