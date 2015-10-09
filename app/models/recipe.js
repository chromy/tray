import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    ingredients: DS.hasMany('ingredient'),
    makes: DS.attr(),
    required: DS.attr(),

    traysCalledFor: DS.hasMany('tray'),
    traysDesired: DS.hasMany('tray'),

    trayMultiplier: Ember.computed('traysCalledForArea', 'traysDesiredArea', function() {
        return this.get('traysDesiredArea') / this.get('traysCalledForArea');
    }),

    makesMultiplier: Ember.computed('makes', 'required', function() {
        return this.get('required') / this.get('makes');
    }),

    traysCalledForArea: Ember.computed('traysCalledFor.@each.area', function() {
        let total = 0;
        this.get('traysCalledFor').forEach(function(tray, index) {
            total += tray.get('area');
        });
        return total;
    }),

    traysDesiredArea: Ember.computed('traysDesired.@each.area', function() {
        let total = 0;
        this.get('traysDesired').forEach(function(tray, index) {
            total += tray.get('area');
        });
        return total;
    }),
});
