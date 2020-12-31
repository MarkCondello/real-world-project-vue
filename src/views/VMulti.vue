<template>
  <div>
      <multiselect 
        v-model="value" 
        :options="options"
        track-by="name"
        :custom-label="nameWithLang"
        placeholder="Select a language"
       >
        <template slot="singleLabel" slot-scope="{ option }">
            <div class="option-selected">
                <strong>{{ option.name }}</strong>  <span>lang:  {{ option.language }}</span>
            </div>
        </template>

       </multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
export default {
    components: {Multiselect},
    data(){
        return {
            value: null,
            options: [
                { name: 'Vue.js', language: 'JavaScript' },
                { name: 'Rails', language: 'Ruby' },
                { name: 'Sinatra', language: 'Ruby' },
                { name: 'Laravel', language: 'PHP', $isDisabled: true },
                { name: 'Phoenix', language: 'Elixir' }
            ],
        }
    },
  methods: {
    nameWithLang ({ name, language }) {
      return `${name} - ${language}`
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css">

</style>
<style scoped>
.option-selected {
    display: flex;
    justify-content: space-between;
}
</style>