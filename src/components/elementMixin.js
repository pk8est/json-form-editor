import _ from 'lodash'
import createProp from '../JsonProp';
import config from '../config'
import { getChild, toHump, toKebabCase, isJsonProp, isJsonPropSupplier, removeArraySign } from '../utils'

export default {
    props: ['$schema', '$schemaProps', '$form', '$index', '$_config', '$_options', '$_caller', '$_context'],
    components: { JsonCell: () => import('../JsonCell') },
    computed: {
        bindOn() {
            return Object.assign({}, this.$schemaProps.$on, this.$listeners)
        },
        bindAttrs() {
            return Object.assign({}, this.$schemaProps.$attrs, this.$attrs)
        },
        propSub() {
            //return this.$schema && this.$schema.$prop && this.$schema.$prop.split('.')
            return this.$schema && this.$schema.$prop && this.$schema.$prop.split('.').map(removeArraySign)
        },
        propObj() {
            const path = Object.assign([], this.propSub)
            const name = path.pop()
            const data = path.length == 0 ? this.$form : getChild(this.$form, path)
            return {
                name,
                data
            }
        },
        formRow(){
            if(this.index != undefined){
                return getChild(this.$form, this.propObj.data)
            }
            return undefined
        },
        value: {
            get() {
                if(this.$schemaProps.$domNode === true){
                    return 
                }
                let value = this.getOrInitValue(this.$form, [...this.propSub])
                if(value === undefined){
                    if(this.$schemaProps.$type === 'object'){
                        value = {}
                        this.value = value
                    }else if(this.$schemaProps.$type === 'array'){
                        value = []
                        this.value = value
                    }
                }
                return value
            }, 
            set(value) {
                this.$set(this.propObj.data, this.propObj.name, value)
            }
        },
        mergeConfig(){
            return _.defaultsDeep({}, this.$_config, config)
        }
    },
    methods: {
        getOrInitValue(data, sub, level = 0){
            let value = getChild(data, sub)
            if(value !== undefined || (level === 0 && sub.length < 2)){
                return value
            }else if(sub.length === 0){
                return data
            }
            const key = sub.pop()
            if(level === 0 && getChild(data, sub) !== undefined){
                return value
            }
            
            const subData = this.getOrInitValue(data, sub, ++level)
            const initVlaue = isNaN(parseInt(key)) ? {} : []
            
            if(level === 1){
                return value
            }
            this.$set(subData, key, initVlaue)
            return initVlaue
        },  
        getOrInitValueByProp(data, prop, value){
            this.getOrInitValue(data, prop.split('.'), value)
        },
        getConfig(key, defaultValue){
            return _.get(this.mergeConfig, key, defaultValue)
        },
        getAttrOrConfig(key, type, defaultValue){
            let value = _.get(this.bindAttrs, toKebabCase(key)) || _.get(this.bindAttrs, toHump(key))
            if(value === undefined){
                const settingKey = type ? type + '.' + key : key
                value = _.get(this.mergeConfig, toHump(settingKey))
                if(value === undefined){
                    value = _.get(this.mergeConfig, toKebabCase(settingKey), defaultValue)
                }
            }
            return value
        },
        renderProp(schemaProps, slot, bind = {}){
            if(schemaProps === undefined){
                return
            }else if(typeof schemaProps === 'string'){
                return schemaProps
            }else if(isJsonPropSupplier(schemaProps)){
                schemaProps = schemaProps.get(this.$schema)
            }else if(!isJsonProp(schemaProps)){
                schemaProps = createProp(schemaProps).get(this.$schema)
            }
            const node = this.$createElement('json-cell', {
                props: {
                    $form: this.$form,
                    $schema: this.$schema,
                    $schemaProps: schemaProps,
                    $_config: this.$_config,
                    $_caller: this.$_caller,
                    $_context: this.$_context,
                    withLayout: false,
                },
                attrs: bind
            }) 
            this.$scopedSlots[slot] = () => [node]
        },
    }
}

