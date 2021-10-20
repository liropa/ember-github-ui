import Ember from "ember";
import config from './../config/environment';

export default Ember.Route.extend({
  actions: {
    error(jqxhr) {
      if (jqxhr.status === 404) {
        this.intermediateTransitionTo("org.notfound");
      } else {
        return true; // bubble up
      }
    }
  },

  model(params) {
    return $.get(
      `https://api.github.com/orgs/${params.id}`,
      {
        Headers: {
          "Authorization": `token ${config.EMBER_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
        }
      }
    ).then((rawOrg) => {
      // backing up github's numeric ID
      rawOrg.oldId = rawOrg.id;
      // use the name of the repo as our ID
      rawOrg.id = rawOrg.name;
      return rawOrg;
    });
  }
});
