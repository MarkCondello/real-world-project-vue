<template>
  <div class="field">
    <label v-if="labelName">{{labelName}}</label>
    <input 
        type="text" 
        :value="value" 
        v-bind="$attrs"
        v-on="listeners"
        :class="{ error: hasErrors}"
     >
      <slot name="errorMessage" v-if="hasErrors" />
  </div>
</template>

<script>
import formFieldMixin from '../mixins/formFieldMixin';

export default {
    mixins: [formFieldMixin],
    // inheritAttrs: false,
    // props:{
    //     labelName:{
    //         type: String,
    //         default: '',
    //     },
    //     value: [String, Number],
    //     hasErrors: Boolean,
    // },
    // computed: {
    //     // Resolves the conflict of more than one event
    //     listeners(){
    //         return {
    //             ...this.$listeners,
    //             input: this.updateValue
    //         }
    //     }
    // },
    // methods:{
    //     updateValue(event){
    //         this.$emit('input', event.target.value)
    //     }
    // }
}
</script>