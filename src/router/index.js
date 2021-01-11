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

Vue.use(VueRouter);

const routes = [
  {
    path: "/events",
    name: "event-list",
    component: EventList
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
 
  //redirect option
  {
    path: "/about",
    redirect: {name : "event-list"}
  }
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