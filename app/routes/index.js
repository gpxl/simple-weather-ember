import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let zipcode = params.zipcode || '97212';
    let zipcode2 = params.zipcode2 || '98074';
    return Ember.RSVP.hash({
      first_location: $.getJSON(`https://api.wunderground.com/api/13fcb02d16148708/conditions/forecast/q/${zipcode}.json`).then(function(data) {
        data.forecast.days = data.forecast.simpleforecast.forecastday.slice(1,4);
        return data;
      }),
      second_location: $.getJSON(`https://api.wunderground.com/api/13fcb02d16148708/conditions/forecast/q/${zipcode2}.json`).then(function(data) {
        data.forecast.days = data.forecast.simpleforecast.forecastday.slice(1,4);
        return data;
      })
    });
  },

  afterModel: function(model) {
    model.temperature_difference = Math.abs(parseFloat(model.second_location.current_observation.temp_f - model.first_location.current_observation.temp_f).toFixed(2));
  },

  actions: {
    updateZip(model) {
      this.transitionTo('index', model.first_location.current_observation.display_location.zip, model.second_location.current_observation.display_location.zip);
    }
  }
});
