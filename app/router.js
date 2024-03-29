import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route('recipes');
    this.route('recipe', { path: '/recipe/:recipe_id' });
});

export default Router;
