<script>
import { loadFields } from './parser'
import { initChild, getChild, setVal, deepClone, notNullValue } from './utils'
import elementMixin from './components/elementMixin'
import createSchema from './JsonSchema'
import JsonCell from './JsonCell'
import Form from './components/element/form'

export default {
  name: 'JsonEditor',
  components: { JsonCell },
  props: {
    schema: { type: Object, required: true },
    value: { type: Object, default: () => ({}) },
    config: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      default: {},
      fields: {},
      error: null,
      form: {},
      defaultSchema: {},
      scopedSlotFields: {}
    };
  },
  watch: {
    value(value) {
      this.default = Object.assign({}, value)
      this.form = value;
    }, 
    schema(value){
      this.schema = value
      //this.fields = this.initSchema(value) 
    } 
  },
  computed: {
    schemaData(){
      let schema
      let supplier
      if(this.schema.constructor && this.schema.constructor.name === 'Supplier'){
        supplier = this.schema
      }else{
        supplier = createSchema(this.schema, {format: 'form'}) 
      }
      schema = supplier.get()
      //schema.initDefaultValue(this.value, this.default, (form, key, value) => (this.$set(form, key, value)))
      console.info(schema)
      return schema
    }
  },
  created() {
    //console.info('schema', this.schema)
    this.default = Object.assign({}, this.value)
    this.form = this.value;
    //console.info(this.value)
    //this.fields = this.initSchema(this.schema)

    //console.info("fields:", this.fields)  
    //console.info("value:", this.value)  

  },
  setComponent(type, component, option = {}) {
    components[type] = { component, option };
  },
  methods: {
    initSchema(inputSchema, sub = []){
      let schema;
      let supplier
      if(inputSchema.constructor && inputSchema.constructor.name === 'Supplier'){
        supplier = inputSchema
      }else{
        supplier = createSchema(inputSchema, {format: 'form'}) 
      }
      schema = supplier.get()
      //schema.initDefaultValue(this.form, this.default, (form, key, value) => this.$set(form, key, value))
      console.info(schema)
      return schema
    } 
  },
  render(h){
    console.info(this.value)
    const schemaData = this.schemaData
    //schemaData.initDefaultValue(this.value, this.default, (form, key, value) => this.$set(form, key, value))
    schemaData.initDefaultValue(this.form, this.default, (form, key, value) => {
      console.info(form, key, value)
      this.$set(form, key, value)
    })
    if(!schemaData.$props.isCreate({$schema: schemaData, $props:schemaData.$props, $form: this.form, $context: undefined })){
      return 
    }
    schemaData.initRender(h, this.$vnode.context, Object.assign({}, this.$slots, this.$scopedSlots))
    return h(Form, {
      attrs: Object.assign({}, this.$attrs, schemaData.$props.$attrs),
      props: {
        form: this.form,
        schema: schemaData,
        props: schemaData.$props,
        config: this.config,
        _caller: this.$vnode.context
      },
      on: this.$listeners
    })
  } 
};
</script>
