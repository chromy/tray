import DS from 'ember-data';

export default DS.Model.extend({
    type: DS.attr(),

    diameter: DS.attr(),
    size: DS.attr(),
    width: DS.attr(),
    height: DS.attr(),

    isCircle: Ember.computed('type', function() {
        return this.get('type') === "Circular";
    }),

    isSquare: Ember.computed('type', function() {
        return this.get('type') === "Square";
    }),

    isRectangle: Ember.computed('type', function() {
        return this.get('type') === "Rectanglar";
    }),


    circleArea: Ember.computed('diameter', function() {
        const diameter = this.get('diameter');
        return (diameter/2) * (diameter/2) * 3.14;
    }),

    squareArea: Ember.computed('size', function() {
        const size = this.get('size');
        return size * size;
    }),

    rectangleArea: Ember.computed('width', 'height', function() {
        return this.get('width') * this.get('height');
    }),

    area: Ember.computed('type', 'circleArea', 'squareArea', 'rectangleArea', function() {
        const type = this.get('type');
        if (type === "Rectanglar") {
            return this.get('rectangleArea');
        } else if (type === "Circular") {
            return this.get('circleArea')
        } else if (type === "Square") {
            return this.get('squareArea')
        } else {
            return -1;
        }
    }),
});
