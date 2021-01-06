import Vue from "vue";
import Vuex from "vuex";
import user from './modules/user.js';
import event from './modules/event.js';
import notification from './modules/notifications';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
  },
  modules: {
    user,
    event,
    notification,
  },
});
