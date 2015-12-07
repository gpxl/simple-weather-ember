import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('index', { path: '/:zipcode' });
  this.route('index', { path: '/:zipcode/:zipcode2' });
});

export default Router;
