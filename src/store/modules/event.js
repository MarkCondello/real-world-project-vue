import EventService from '../../services/EventService';

export default {
    namespaced : true,
    state : {
        events: [],
        organizer: 'Everyone',
        eventsTotal: 0,
        event: {},
        perPage: 3,
    },
    mutations: {
        ADD_EVENT(state, event) {
            state.events.push(event);
        },
        SET_ORGANIZER(state, organizerName) {
            state.organizer = organizerName;
        },
        SET_EVENTS(state, events) {
            state.events = events;
        },
        SET_EVENTS_TOTAL(state, eventsTotal) {
            state.eventsTotal = eventsTotal
        },
        SET_EVENT(state, event) {
            state.event = event;
        }
    },
    actions: {
        updateOrganizer({
            state,
            commit
        }, organizerName) {
            if (state.user && state.organizer != organizerName) {
                commit("SET_ORGANIZER", organizerName);
            }
        },
        //an action should always use a mutation and not change state directly; eg below: commit('ADD_EVENT')
        createEvent({
            commit,
            dispatch
        }, event) {
            return EventService.postEvent(event)
                .then(() => {
                    commit('ADD_EVENT', event)
                    const notification = {
                        type: 'success',
                        message: `Your event has been created!`,
                    }
                    dispatch('notification/add', notification, {root: true})
                })
                .catch((error) => {
                    const notification = {
                        type: 'error',
                        message: `There was an error creating your event: ${error.message}`,
                    }

                    dispatch('notification/add', notification, {root: true})
                    console.log("There was an error creating your event")
                    throw(error)
                })
        },
        fetchEvents({
            commit,
            dispatch,
            state,
        }, {
            page
        }) {
            return EventService.getEvents(state.perPage, page)
                .then(resp => {
                    commit('SET_EVENTS', resp.data);
                    commit('SET_EVENTS_TOTAL', parseInt(resp.headers['x-total-count']))
                })
                .catch(error => {
                    const notification = {
                        type: 'error',
                        message: `There was an error getting events: ${error.message}`,
                    }
                    dispatch('notification/add', notification, { root: true })
                    console.log(error)
                })
        },
        fetchEvent({
            commit,
            getters,
            dispatch
        }, id) {
            var event = getters.getEventById(id);
            if (event) {
                commit('SET_EVENT', event);
                return event;
            } else {
            return EventService.getEvent(id)
                    .then(resp => {
                        commit('SET_EVENT', resp.data);
                        return resp.data;
                    })
                    .catch(error => {
                        const notification = {
                            type: 'error',
                            message: `There was an error getting the event: ${error.message}`,
                        }
                        dispatch('notification/add', notification, { root: true })
                        console.log(error)
                    })
            }
        },
    },
    getters : {
        catLength: state => {
            return state.categories.length
        },
    
        getEventById: state => id => {
            return state.events.find(event => event.id === id)
        }
    }
} 
 