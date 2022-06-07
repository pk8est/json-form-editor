<script>
import config from './config'
import JsonCell from './JsonCell'
import { loadFields } from './parser'
import createSchema from './JsonSchema'
import elementMixin from './components/elementMixin'
import Form from './components/element/form'
import { initChild, getChild, setVal, deepClone, notNullValue, isJsonSchema, isJsonSchemaSupplier,getAllRefs,toAllHump } from './utils'

export default {
  name: 'JsonEditor',
  components: {},
  props: {
    schema: { type: Object, required: true },
    value: { type: Object, default: () => ({}) },
    config: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      default: {},
      schemaColumn: {},
      error: null,
      form: {},
      defaultSchema: {},
      scopedSlotFields: {},
      allRefs: undefined
    };
  },
  computed: {
    mergeConfig(){
      return toAllHump(_.defaultsDeep({}, this.config, config))
    },
    notSetDefaultValue(){
      return _.get(this.mergeConfig, 'notSetDefaultValue', undefined)
    }
  },
  watch: {
    value(value) {
      this.default = Object.assign({}, value)
      this.form = value;
    },
    schema(value){
      this.schema = value
      this.schemaColumn = this.initSchema(value) 
    }
  },
  created() {
    this.default = Object.assign({}, this.value)
    this.form = this.value;
    this.schemaColumn = this.initSchema(this.schema)
    console.info(this.schemaColumn)
  },
  setComponent(type, component, option = {}) {
    components[type] = { component, option };
  },
  methods: {
    initSchema(schema, sub = []){
      let schemaColumn;
      if(isJsonSchema(schema)){
        schemaColumn = schema
      }else if(isJsonSchemaSupplier(schema)){
        schemaColumn = schema.get()
      }else{
        schemaColumn = createSchema(schema, {format: 'form'}).get()
      }
      //schema.initDefaultValue(this.form, this.default, (form, key, value) => this.$set(form, key, value))
      schemaColumn.initDefaultValue(this.form, this.default, (form, key, value) => {
        if(form && !form.hasOwnProperty(key)){
          this.$set(form, key, value === undefined ? this.notSetDefaultValue : value)
        }
      })
      return schemaColumn
    },
    getRef(ref){
      if(this.allRefs === undefined){
        this.allRefs = getAllRefs(this)
      }
      if(this.allRefs.hasOwnProperty(ref)){
        return this.allRefs[ref]
      }
    }
  },
  mounted(){
    
  },
  render(h){
    this.schemaColumn.initRender(h, this.$vnode.context, Object.assign({}, this.$scopedSlots, this.$slots))
    return h(JsonCell, {
      attrs: Object.assign({}, this.schemaColumn.$props.$attrs, this.$attrs),
      props: {
        $form: this.form,
        $schema: this.schemaColumn,
        $schemaProps: this.schemaColumn.$props,
        $_config: toAllHump(this.config),
        $_caller: this.$vnode.context,
        isRoot: true
      },
      on: this.$listeners
    })
  } 

};
</script>
