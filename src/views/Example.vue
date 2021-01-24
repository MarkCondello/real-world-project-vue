<template>
<form @submit.prevent="submit">
    <label>EMail address</label>
    <input type="email" 
    v-model="emailValue" 
    placeholder="Add an email address" 
    @blur="$v.emailValue.$touch"
    :class="{error : $v.emailValue.$error}"
    >
    <!-- $v.MODEL_VALUE.touch() means user has interacted with field -->
    <div v-if="$v.emailValue.$error">
        <p v-if="!$v.emailValue.email" class="errorMessage">The field requires an email</p>
        <p v-if="!$v.emailValue.required" class="errorMessage">An email is required</p>
    </div>

    <button 
        type="submit"
        :disabled="$v.$anyError"
    >Add email</button>
    <p 
    v-if="$v.$anyError" 
    class="errorMessage"
    >There are errors on the form.</p>
</form>

</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
    data(){
        return {
            emailValue: null,
        }
    },
    validations: {
        emailValue: {
            required,
            email,
        }
    },
    methods:{
        submit(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                console.log("Form is invalid", this.emailValue)
            }
        }
    }
}
</script>

<style>

</style>