<template>
  <div class="field">
      <label v-if="labelName">{{labelName}}</label>
      <input type="text" @input="updateValue" :value="value" v-bind="$attrs">
  </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props:{
        labelName:{
            type: String,
            default: '',
        },
        value: [String, Number]
    },
    methods:{
        updateValue(event){
            this.$emit('input', event.target.value)
        }
    }
}
</script>