import _ from 'lodash'
import prop from '../JsonProp';
import { isJsonProp, isJsonPropSupplier, removeArraySign } from '../utils'

export default {
    props: ['$schema', 'tab-label', 'min', 'max', 'active'],
    data() {
        return {
            counter: 0,
            slotPrefix: 'slot_'
        }
     },
    computed: {
        defaultValue(){
            return this.getDefaultValueWithChild(this.$schema, true)
        },
    },
    created(){
        if(this.$schemaProps.$domNode === true){
            return 
        }
        this.value = this.value === null ? undefined : this.value
        this.counter = (this.value || []).length
        for(let i=0; i<this.counter; i++){
            this.$set(this.value, i, _.defaultsDeep({}, this.value[i], this.defaultValue))
        } 
    },
    watch: {
        value(value){
            this.counter = value.length
        }
    },
    methods: {
        getDefaultValueWithChild(schema, isRoot){
            let defaultValue = {}
            if(schema.$props.$default !== undefined){
                defaultValue = schema.$props.$default
                if(defaultValue instanceof Array){
                    defaultValue = defaultValue[0]
                }
            }else if(schema.$childSchema != null){
                let childDefaultValue = {}
                for(const childSchema of schema.$childSchema){
                    let key = removeArraySign(childSchema.$prop.substring(schema.$prop.length + 1))
                    if(key){
                        //childDefaultValue[key] = this.getDefaultValueWithChild(childSchema, false)

                        let _defaultValue = this.getDefaultValueWithChild(childSchema, false)
                        if(childSchema.$props.$type === 'array' && _defaultValue != undefined && !(_defaultValue instanceof Array)){
                            _.set(childDefaultValue, key, [_defaultValue])
                        }else{
                            _.set(childDefaultValue, key, _defaultValue)
                        } 
                    }else{
                        childDefaultValue = {...childDefaultValue, ...this.getDefaultValueWithChild(childSchema, false)}
                    }
                }
                if(!isRoot && schema.$props.$type === 'array'){
                    //defaultValue = [childDefaultValue]
                    defaultValue = []
                }else{
                    defaultValue = childDefaultValue
                }
            }else{
                defaultValue = undefined
            }
            return defaultValue
        },
        rowSchema(schema, index){
            let  length = this.$schema.$prop.length
            const rowSchema = Object.assign({}, schema)
            if(rowSchema.$prop && rowSchema.$prop.length >= length){
                let parentPart = rowSchema.$prop.substring(0, length)
                let currPart = rowSchema.$prop.substring(length)
                
                let pos = parentPart.indexOf('[]')
                if(pos !== -1){
                    rowSchema.$prop = parentPart.substring(0, pos) + '.' + index + parentPart.substring(pos + 2) + currPart
                }else{
                    const newParentPart = parentPart + '.'  + index
                    this.replaceProp(rowSchema, parentPart, newParentPart)
                }
            }
            return rowSchema
        },
        replaceProp(schema, oldPart, newPart){
            schema.$prop = schema.$prop.replace(oldPart, newPart)
            if(schema.$childSchema != null){
                schema.$childSchema = schema.$childSchema.map(childSchema =>  this.replaceProp(Object.assign({}, childSchema), oldPart, newPart))
            }
            return schema
        },
        labelRender(schemaProps, index, bind){
            if(schemaProps === undefined){
                return schemaProps
            }else if(typeof schemaProps === 'string'){
                return schemaProps
            }else if(isJsonPropSupplier(schemaProps)){
                schemaProps = schemaProps.get(this.$schema)
            }else if(!isJsonProp(schemaProps)){
                schemaProps = prop(schemaProps).get(this.$schema)
            }
            const node = this.$createElement('json-cell', {
                props: {
                    $form: this.$form,
                    $schema: this.$schema,
                    $schemaProps: schemaProps,
                    $_config: this.$_config,
                    $_caller: this.$_caller,
                    $_context: this.$_context,
                    withLayout: false
                },
                attrs: Object.assign({
                    rowIndex: index,
                    name: schemaProps.$attrs.name !== undefined ? schemaProps.$attrs.name : this.$schemaProps.$attrs.name
                }, bind)
            }) 
            this.$scopedSlots[this.slotPrefix + index] = () => [node]
        }
        
    }
}

