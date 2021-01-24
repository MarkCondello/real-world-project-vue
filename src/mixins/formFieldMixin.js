export default {
    inheritAttrs: false,
    props: {
        labelName: {
            type: String,
            default: '',
        },
        value: [String, Number],
        hasErrors: Boolean,
    },
    computed: {
        // Resolves the conflict of more than one event
        listeners(){
            return {
                ...this.$listeners,
                input: this.updateValue
            }
        }
    },
    methods:{
        updateValue(event){
            this.$emit('input', event.target.value)
        }
    }
}