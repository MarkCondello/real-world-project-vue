import Vue from "vue";
import Vuex from "vuex";
import EventService from '../services/EventService';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: '#019283',
      name: 'Adam Bashar'
    },
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    events: [
  
    ],
    organizer: 'Everyone',
    eventsTotal: 0,
    event: null,
    //count: 0,
  },
  mutations: {
    ADD_EVENT(state, event){
      state.events.push(event);
    },
    SET_ORGANIZER(state, organizerName){
      state.organizer = organizerName;
    },
    SET_EVENTS(state, events){
      state.events = events;
    },
    SET_EVENTS_TOTAL(state, eventsTotal){
      state.eventsTotal = eventsTotal
    },
    SET_EVENT(state, event){
      state.event = event;
    }
    // INCREMENT_COUNT(state, value){
    //   state.count += value;
    // },
  },
  actions: {
    updateOrganizer({state, commit}, organizerName){
      if(state.user && state.organizer != organizerName){
        commit("SET_ORGANIZER", organizerName);
      }
    },
    //an action should always use a mutation and not change state directly; eg below: commit('ADD_EVENT')
    createEvent({commit}, event) {
      return EventService.postEvent(event)
      .then(()=>{
        commit('ADD_EVENT', event)
      })
      .catch(()=>{
        console.log("There was an error creating your event")
      })
    },
    fetchEvents({commit}, { perPage, page }){
      EventService.getEvents(perPage, page)
      .then(resp => {
        //console.log(`Total count: ${resp.headers['x-total-count']}`);
        commit('SET_EVENTS', resp.data);
        commit('SET_EVENTS_TOTAL', parseInt(resp.headers['x-total-count']))
      })
      .catch(err => console.log(err))
    },
    fetchEvent({commit, getters}, id){
      var event = getters.getEventById(id);
      if(event){
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent( id )
        .then(resp => commit('SET_EVENT', resp.data))
        .catch(err => console.log(err))
      }
    },
    // updateCount({state, commit}, incrementBy){
    //   if(state.user){
    //     commit("INCREMENT_COUNT", incrementBy);
    //   }
    // },
  },
  getters: {
    catLength: state => {
      return state.categories.length 
    },
 
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  },
  modules: {},
});
