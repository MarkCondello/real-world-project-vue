<template>
  <div>
      <h2>Editor JS</h2>

      <Editor ref="editor" :canvasWidth="500" :canvasHeight="500" />

      <button @click="saveCanvas">Save Changes</button>
  </div>
</template>

<script>
import Editor from 'vue-image-markup';

export default {
    components:{
        Editor,
    },
    data(){
        return {
            imageUrl: "http://placekitten.com/500/500",
        }
    },
    mounted(){
        this.$refs.editor.set('text'),
        this.$refs.editor.setBackgroundImage(this.imageUrl);
    },
    methods: {
        saveCanvas(){
            let output = this.$refs.editor.saveImage()
            console.log({output})
        }
    }
}
</script>

<style>
</style>