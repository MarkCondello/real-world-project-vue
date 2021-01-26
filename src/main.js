import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import BaseIcon from './components/BaseIcon';
//Vue.component('BaseIcon', BaseIcon);
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import 'nprogress/nprogress.css';
import Vuelidate from 'vuelidate';
import DateFilter from './filters/date';

// import User, { createUrl, gravatar } from "./mixins/user";
// const profile =   new User("Mark", "markcondello.com.au", "markcondello.com.au" ),
// email = createUrl("condellomark@gmail.com"),
// image = gravatar('condellomark@gmail.com');
// console.log(profile, email, image);

import breath, {NativePromise} from "./mixins/asyncAwait.js"
NativePromise   

// breath(2000)
//   .then(resp=> {console.log(resp);
//     return breath(500)
//   })
//   .then(resp=> {console.log(resp);
//     return breath(800)
//   })
//   .then(resp=> {console.log(resp);
//     return breath(400)
//   })
//   .catch(err=>{
//     console.error("You messed up fool!")
//     console.error(err)})

async function breaths(){
  try{
    let resp1 = await breath(1000) ;
    console.log(resp1);
    let resp2 = await breath(5000) ;
   console.log(resp2);
    let resp3 = await breath(500) ;
    console.log(resp3);
    let resp4 = await breath(400) ;
    console.log(resp4);
  } catch(err){
    console.error("Caught error!")
    console.error(err)
  }
}

breaths();

Vue.use(Vuelidate);
Vue.filter('formatDate', DateFilter);

const requireComponent = require.context(
  // The relative path of the components folder
  './components',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )
  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
