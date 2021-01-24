<template>
  <div class="field">
    <label v-if="labelName">{{labelName}}</label>
    <select 
         :value="value" 
        v-bind="$attrs" 
        v-on="listeners"
        :class="{ error: hasErrors}"
        >
        <option 
        v-for="option in options" 
        :key="option"
        :selected="option === value"
        >{{ option }}</option>
    </select>
    <slot name="errorMessage" v-if="hasErrors" />
  </div>
</template>
<script>

import formFieldMixin from '../mixins/formFieldMixin';

export default {
    mixins: [formFieldMixin],
 
    //inheritAttrs: false,
    props:{
        // labelName:{
        //     type: String,
        //     default: '',
        // },
        options:{
            type: Array,
            required: true,
        },
        // value: [String, Number],
        // hasErrors: Boolean
    },
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