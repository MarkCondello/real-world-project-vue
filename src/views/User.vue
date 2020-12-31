<template>
<div>
  <h1>This is the {{ username }}'s page</h1>
  <BaseMediaBox profile="https://image.shutterstock.com/image-vector/male-default-avatar-profile-gray-260nw-362901362.jpg" >
    <h3 slot="firstname">{{ username }}'s card</h3> 
    <template>
      Lorem ipsum dolor sit amet consectetur...  
      <BaseIcon name="bell"></BaseIcon>
    </template> 
  </BaseMediaBox>
</div>
</template>

<script>
 export default {
   props: {
    username: {
      type: String
    }
  }
}
</script>
    