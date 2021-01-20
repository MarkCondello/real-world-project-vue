<template>
  <div class="field">
    <label v-if="labelName">{{labelName}}</label>
    <select @input="updateValue" :value="value" v-bind="$attrs">
        <option v-for="option in options" :key="option">{{ option }}</option>
    </select>
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
        options:{
            type: Array,
            required: true,
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