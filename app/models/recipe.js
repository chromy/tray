import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    ingredients: DS.hasMany('ingredient'),
    makes: DS.attr(),
    required: DS.attr(),
    traysCalledFor: DS.hasMany('tray'),
    traysDesired: DS.hasMany('tray'),
    multiplier: Ember.computed('makes', 'required', function() {
        return this.get('required') / this.get('makes');
    })
});
