<template>
  <div>
    <h1>Events for {{user.user.name}}</h1>
     <event-card v-for="(event, key) in event.events" :event="event" :key="key"></event-card>  
     <template >
        <router-link v-if="page != 1" :to="{name: 'event-list', query: {_page: page - 1} }" rel="prev">Prev page | </router-link>
        <router-link v-if="page < totalPages" :to="{name: 'event-list', query: { _page: page + 1}}" rel="next">Next page (total: {{totalPages}})</router-link>
     </template>
  </div>
</template>

<script>
import EventCard from '../components/EventCard';
import { mapState } from 'vuex';
import store from '../store/index';

function getPageEvents(routeTo, next){
  //console.log({routeTo})
  const currentPage = parseInt(routeTo.query._page) || 1; // referencing the router query string
  store.dispatch('event/fetchEvents', {
    page: currentPage, 
  }).then(()=>{
    //send the page value prop to router
    routeTo.params.page = currentPage;
    next();
  })
}
export default {
  props: {
    //page is sent from vue router for pagination settings
    page: {
      type: Number,
      required: true,
    }
  },
  components:  {
    EventCard,
  },
  beforeRouteEnter(routeTo, routeFrom, next){
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next){
    getPageEvents(routeTo, next)
  },
  computed: {
    ...mapState(['event', 'user' ]),
    totalPages(){
      return this.event.eventsTotal / 3;
    }
  },
}
</script>