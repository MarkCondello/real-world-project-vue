<template>
<div >  
<!-- Create a loader or nProgress??? -->
    <div class="markup-interface" v-if="!isLoading">
        <ul class="menu">
            <li v-for="el in canvasSizes" :key="el">
                <a>
                    <img :src="el.src" /> 
                </a>
            </li>
        </ul>
        <div class="img-canvas-container" >
            <Editor ref="editor" :canvasWidth="canvasSizes[0].width" :canvasHeight="canvasSizes[0].height" />
            <img class="plans-image" :src="canvasSizes[0].src" alt="image" ref="plans" 
            :width="`${canvasSizes[0].width}px`" :height="`${canvasSizes[0].height}px`" 
            />  

        </div>
    <!-- Controls -->
        <button @click="saveCanvas">Save Changes</button>
    </div>
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
            isLoading: true,
            imagesToPreload: [
                {
                    url: "https://placeimg.com/980/800/any",
                 },
                {
                    url: "https://placeimg.com/1280/500/any",
                },
                {
                    url: "https://placeimg.com/1800/800/any",
                },
            ],
            canvasSizes: [],
        }
    },
    computed: {
     
    },
    created(){
         let imageLoaded = 0;
            for (const imageSrc of this.imagesToPreload) {  
                 const img = new Image();
                img.src = imageSrc.url;

                 img.onload = () => {
                    this.canvasSizes.push({width: img.width, height: img.height, src: imageSrc.url});
                    imageLoaded++;

                    if (imageLoaded === this.imagesToPreload.length) {
                        console.log("Done !");
                        this.isLoading = false;

                        this.$nextTick(()=>{
                            this.initEditor();
                        })   
                    }
                    console.log(imageLoaded);
                };
            }
    },
 
    methods: {
        initEditor(){
            this.$refs.editor.set('freeDrawing')
        },
 
        saveCanvas(){
            let output = this.$refs.editor.saveImage()
            console.log({output})
        }
    }
}
</script>

<style>
/* #app {
     width: 100%;
}

.img-canvas-container {
    position: relative;
}
.plans-image {
    position: absolute;
    top:0;
    left: 0;
    width: auto;
} */
</style>