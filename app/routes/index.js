import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return $.getJSON(`http://api.wunderground.com/api/13fcb02d16148708/conditions/forecast/q/CA/San_Francisco.json`);
  },

  afterModel: function(model, transition) {
    model.forecast.days = model.forecast.simpleforecast.forecastday.slice(1,4)
  },

  actions: {
    updateZip() {
      console.log('Just Do it!');
    }
  }
});
