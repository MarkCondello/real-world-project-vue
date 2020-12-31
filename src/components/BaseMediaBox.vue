<template>
  <div class="media-box">
    <img :src="this.profile" alt="profile image"  style="width: 40px; height: 40px;"/>
    <div class=Meta>
      <slot name="firstname"><h3>Noone</h3></slot>
      <slot>This is noones bio.</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: String,
      required: true 
    },
  },
}
</script>

<style lang="scss" scoped>
.media-box {
  display: flex;

  img {
    border-radius: 50%;
    border: 1px solid grey;
    margin-right: 1rem;
  }

  h3 {
    margin:0;
  }
}


</style>