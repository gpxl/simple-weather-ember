import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let zipcode = params.zipcode || '97212';
    return $.getJSON(`http://api.wunderground.com/api/13fcb02d16148708/conditions/forecast/q/${zipcode}.json`);
  },

  afterModel: function(model) {
    model.zipcode = model.current_observation.display_location.zip;
    model.forecast.days = model.forecast.simpleforecast.forecastday.slice(1,4);
  },

  actions: {
    updateZip(model) {
      this.transitionTo('index', model.zipcode);
    }
  }
});
