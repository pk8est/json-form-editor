<script>
import elementMixin from '../elementMixin'

export default{
    name: 'Tag',
    mixins: [elementMixin],
    props: {
        content: null,
        tag: {
            type: String,
            default: 'span'
        }
    },
    render(h){
        return h(this.tag, {attrs: this.bindAttrs, on: this.bindOn}, this.content) 
    }
}
</script>