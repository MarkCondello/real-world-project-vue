<template>
<div>
  <h1>Create an Event {{ user.user.name }} {{user.user.id}}</h1>
  <form @submit.prevent="createEvent">

  <base-field 
    labelName="Name of organizer"
    v-model="event.organizer"
    placeholder="Eg John Doe"
    @blur="$v.event.organizer.$touch"
    :hasErrors="$v.event.organizer.$error"
    >
    <template v-slot:errorMessage>
      <p v-if="!$v.event.organizer.$required" class="errorMessage">A organizer is required</p>
    </template>
    </base-field>

    <base-select 
    labelName="Select a Category" 
    v-model="event.category" 
    :options="categories" 
    @blur="$v.event.category.$touch"
    :hasErrors="$v.event.category.$error"
    >
    <template v-slot:errorMessage >
      <p v-if="!$v.event.category.$required" class="errorMessage">A category is required</p>
    </template>
    </base-select>

    <h3>Name & describe your event</h3>
    <base-field 
    labelName="Title" 
    v-model="event.title" 
    placeholder="Add an event title"     
    @blur="$v.event.title.$touch"
    :hasErrors="$v.event.title.$error"
    >
      <template slot:errorMessage >
        <p v-if="!$v.event.title.$required" class="errorMessage">A title is required</p>
      </template>
    </base-field>

    <base-field 
      labelName="Description" 
      v-model="event.description" 
      placeholder="Add a description"
    />
 
    <h3>Where is your event?</h3>
    <base-field 
    labelName="Location" 
    v-model="event.location" 
    placeholder="Add a location"     
    @blur="$v.event.location.$touch"
    :hasErrors="$v.event.location.$error"
    >
      <template slot:errorMessage  >
        <p v-if="!$v.event.location.$required" class="errorMessage">A location is required</p>
      </template>
    </base-field>

    <h3>When is your event?</h3>
    <div class="field">
      <label>Date</label>
      <!-- ToDo: add validation here -->
      <datepicker 
      v-model="event.date" 
      placeholder="Select a date"
      @focusin.native="$v.event.date.$touch()"
       :input-class="{error: $v.event.date.$error}"
      />
      <template v-if="$v.event.date.$error" >
        <p v-if="!$v.event.date.$required" class="errorMessage">A date is required</p>
      </template>
    </div>

    <base-select 
     labelName="Select a time" 
     v-model="event.time" 
     :options="times" 
     @blur="$v.event.time.$touch"
     :hasErrors="$v.event.time.$error"
    >
      <template v-slot:errorMessage  >
        <p v-if="!$v.event.time.$required" class="errorMessage">An event time is required</p>
      </template>
    </base-select>

     <base-button 
     buttonClass="button -fill-gradient"
      :disabled="$v.$anyError"
     >Submitter!</base-button>
     <p v-if="$v.$anyError" class="errorMessage">Please fill out the required fields.</p>  
  </form>
</div>
</template>

<script>
import datepicker from "vuejs-datepicker";
import { mapState, mapGetters } from 'vuex';
import nprogress from 'nprogress';
import { required } from 'vuelidate/lib/validators';
  
export default {
  components: {
    datepicker
    },
  data() {
    const times = [];
    for(let i = 1; i < 24; i++){
      times.push(i + ':00')
    }
    return {
      incrementBy: 2,
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject(),
    }
  },
  validations: {
    event: {
      organizer: { required },
      category: { required },
      title: { required },
      location: { required },
      time: { required },
      date: { required },
    },
  },
  methods: {
 
    createFreshEventObject(){
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 100000);
      return {
        user,
        id,
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: [],
        organizer: this.$store.state.organizer,
      }
    },
    createEvent(){
      this.$v.$touch();
      if(!this.$v.$invalid){
        nprogress.start();
        this.$store.dispatch('event/updateOrganizer', this.organizer);

        this.$store
        .dispatch('event/createEvent', this.event)
        .then(()=>{
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })

          this.event = this.createFreshEventObject();
        })
        .catch(()=> {
          nprogress.end();
        })
      }
    },
  },
  computed: {
    ...mapGetters(['event/getEventById', 'event/catLength']),
    ...mapState(['user',  ])
  },
}
</script>
<style scoped>
  .field {
    margin-bottom: 24px;;
  }
</style>