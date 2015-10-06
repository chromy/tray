import d3 from 'd3';

export default Ember.Component.extend({
    tagName: 'svg',

    width: 500,
    height: 150,
    margin: {top: 30, right: 10, bottom: 30, left: 10},
    classNames: ['trayInterface'],

    didInsertElement() {
        Ember.$(window).on(`resize.${this.get('elementId')}`, Ember.run.bind(this, this.measure));
        Ember.run.scheduleOnce('afterRender', this, this.measure);
        Ember.run.scheduleOnce('afterRender', this, this.draw);

        //let margin = this.get('margin');

        //let containter = d3.select('#'+this.get('elementId'));

        //let width = containter.node().getBoundingClientRect().width;
        //width = width - margin.left - margin.right;
        //this.set('width', width);

        //this.draw();
    },

    willDestroyElement() {
        Ember.$(window).off(`resize.${this.get('elementId')}`);
    },

    measure() {
       this.set('width', this.$().width());
       this.set('height', this.$().height());
    },

    update: Ember.observer('width', 'traysCalledFor.@each.x', 'traysDesired.@each.x', function() {
        console.log('update');
        Ember.run.once(this, 'draw');
    }),

    draw() {
        console.log('draw');
        let svg = d3.select('#'+this.get('elementId'));

        let data = this.get('traysCalledFor').toArray();

        let me = this;
        let drag = d3.behavior.drag()
            .origin(function(d) { return {x: d.get('x'), y: d.get('y')}; })
            .on("drag", function(d) {
                d.set('x', Math.max(0, Math.min(me.get('width'), d3.event.dx)));
                d.set('y', Math.max(0, Math.min(me.get('height'), d3.event.dy)));
                let x = d.get('x');
                let y = d.get('y');
                console.log(`drag (${d3.event.dx}, ${d3.event.dy}) => (${x}, ${y})`);
            });

        let dragHandle = d3.behavior.drag()
            .origin(svg)
            .on("drag", function(d) {
                console.log("dragHandle");
                d.set('diameter', d3.event.dx);
            });


        var g = svg.selectAll('g')
            .data(data);
        var gEnter = g.enter()
            .append('g');

        g.attr("transform", function(d) { return "translate("+d.get('x')+","+d.get('y')+")" });

        gEnter.append("circle")
            .attr("class", "tray")
            .attr("r", function(d) { return d.get('diameter')/2; })
            .style("fill", "steelblue")
            .call(drag);
        gEnter.append("circle")
            .attr("class", "trayHandle")
            .attr("r", function(d) { return d.get('diameter')/2; })
            .style("fill", "none")
            .style("stroke", "black")
            .style("stroke-width", "5px");
            //.call(dragHandle);

    },
    //    console.log("draw");

    //    let svg = this.get('svg');

    //    let data = this.get('traysCalledFor').toArray();

    //    let me = this;
    //    let drag = d3.behavior.drag()
    //        .on("drag", function(d) {
    //        d.set('x', Math.max(0, Math.min(me.get('width'), d3.event.x)));
    //        d.set('y', Math.max(0, Math.min(me.get('height'), d3.event.y)));
    //        me.draw();
    //    });

    //    var g = svg.selectAll('g')
    //            .data(data);
    //    var gEnter = g.enter()
    //            .append('g')
    //            .call(drag);

    //    g.attr("transform", function(d) { return "translate("+d.get('x')+","+d.get('y')+")" });

    //    gEnter.append("rect")
    //            .attr("height", 100)
    //            .attr("width", function(d) { return d.get('diameter'); });

    //    data[0].set('diameter', 50);
    //},


        //resize: function resize() {
    //    let margin = this.get('margin');
    //    let containter = d3.select('#'+this.get('elementId'));

    //    let width = containter.node().getBoundingClientRect().width;
    //    width = width - margin.left - margin.right;
    //    this.set('width', width);

    //    console.log("width", this.get('width'))
    //    console.log("height", this.get('height'))

    //    this.get('svg')
    //        .style('height', (this.get('height') + margin.top + margin.bottom) + 'px')
    //        .style('width', (this.get('width') + margin.left + margin.right) + 'px');

    //    this.draw();
    //}
});
