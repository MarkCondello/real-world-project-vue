<template>
  <div>
    <h1>Event list</h1>
     <event-card v-for="(event, key) in events" :event="event" :key="key"></event-card>  
     <template >
        <router-link v-if="page != 1" :to="{name: 'event-list', query: {_page: page - 1} }" rel="prev">Prev page | </router-link>
        <router-link v-if="page < totalPages" :to="{name: 'event-list', query: { _page: page + 1}}" rel="next">Next page (total: {{totalPages}})</router-link>
     </template>
  </div>
</template>

<script>
 import EventCard from '../components/EventCard';
import { mapState } from 'vuex';

export default {
  components:  {
    EventCard 
  },
 
  created(){
    // console.log('page', this.page, 'query', this.$route.query._page)
    this.$store.dispatch('fetchEvents', {
      perPage: 3,
      page: this.page, //computed prop referencing the router query string
    }) 
  },
  computed: {
    page(){
      return parseInt(this.$route.query._page) || 1;
    },
    ...mapState(['events']),
    totalPages(){
      return this.$store.state.eventsTotal / 3;
    }
  },
 
}
</script>