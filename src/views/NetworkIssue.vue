<template>
  <div>
      <h1>Oops! We're having server issues.</h1>
      <h2>{{ resource }}</h2>
      <router-link :to="{ name: 'event-list'}">Back to home</router-link>
  </div>
</template>

<script>
export default {
    props: {
        resource: {
            type: String,
            required: true, 
        },
    },
}
</script>