import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";
import EventCreate from "../views/EventCreate.vue";
import User from '../views/User.vue';
import VMulti from '../views/VMulti.vue';
import VImageMarkup from '../views/VImageMarkup';
import NProgress from 'nprogress';
import store from '../store/index';
import NotFound from '../views/NotFound.vue';
import NetworkIssue from '../views/NetworkIssue.vue';
import Example from '../views/Example';

Vue.use(VueRouter);

const routes = [
  {
    path: "/events",
    name: "event-list",
    component: EventList,
    props: true,

    beforeEnter(routeTo, routeFrom, next){
      store.dispatch('event/fetchEvents', routeTo.params.id)
      .then((event)=>{
        routeTo.params.event = event;
        next();
      })
      .catch((error) => {
        if(error.response && error.response === "400")
          next({ name: '404', params: {resource: 'events'}})
        else {
          next({ name: '500', params: {resource: error}})
        }
 
        console.log(error)
    })
    }

  },
  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next){
      store.dispatch('event/fetchEvent', routeTo.params.id)
      .then((event)=>{
        routeTo.params.event = event;
        next();
      })
      .catch((error) => {
        if(error.response && error.response === "400")
          next({ name: '404', params: {resource: 'event'}})
        else {
          next({ name: '500', params: {resource: error}})
        }
        // const notification = {
        //     type: 'error',
        //     message: `There was an error getting the event: ${error.message}`,
        // }
        // dispatch('notification/add', notification, { root: true })
        console.log(error)
    })
    }
  },
  {
    path: "/event-create",
    name: "event-create",
    component: EventCreate  
  },
  {
    path: "/user/:username",
    name: "user-show",
    component: User,
    props: true,
  },
  {
    path: "/vue-image-markup",
    name: "v-markup",
    component: VImageMarkup,
  },
  {
    path: "/vue-multiselect",
    name: 'v-multi',
    component: VMulti,
  },
  {
    path: "/example",
    name: 'example',
    component: Example,
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
    props: true,
  },
  {
    path: "/500",
    name: "500",
    component: NetworkIssue,
    props: true,
  },
    //redirect all non specified urls
    {
      path: "*",
      redirect: {name : "404", "params": { resource: "page"}}
    },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(()=>{
  NProgress.done();
});

export default router;