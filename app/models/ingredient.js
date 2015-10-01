import DS from 'ember-data';

export default DS.Model.extend({
    recipe: DS.belongsTo('recipe'),
    name: DS.attr('string'),
    quantity: DS.attr('string')
});
