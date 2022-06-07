import config from './config'
import createProp from './JsonProp'
import { JsonSchemaSupplier } from './Supplier'
import { getChild, deepClone, isJsonSchema, isJsonProp, isJsonSchemaSupplier, isJsonPropSupplier, isVNode, removeArraySign } from './utils'

export class JsonSchema{

    constructor(childSchema, props, key = '$root', sub = []) {
        if(childSchema && childSchema.hasOwnProperty(config.propsKey)){
            props = childSchema[config.propsKey]
            delete childSchema[config.propsKey]
        }

        this.$key = key
        this.$prop = ''
        this.$childSchema = null
        this.$props = (isJsonPropSupplier(props) ? props : createProp(props)).get(this)

        if(this.$props.$prop){
            if(this.$props.$prop ===  config.rootKey){
                this.$prop = ''
            }else if(this.$props.$prop.startsWith(config.rootKey + ".")){
                this.$prop = this.$props.$prop.substring(6)
            }else if(this.$props.$prop.startsWith('.')){
                let curr
                const level = this.$props.$prop.split('/')
                while(true){
                    curr = level.shift()
                    if(curr === '..'){
                        sub.pop()
                    }else if(curr === '.'){
                        sub.pop()
                        curr = ''
                    }else{
                        break
                    }
                    
                }
                this.$prop = sub.join('.')
                if(curr){
                    this.$prop =  this.$prop + '.' + curr
                }
                if(level.length > 0){
                    this.$prop =  this.$prop + '.' + level.join('.')
                }
            }else{
                this.$prop = this.$props.$prop
            }
            sub = this.$prop ? this.$prop.split('.') : []
            
        }else if(key === config.rootKey){
            this.$prop = ''
            sub = []
        }else if(!this.$prop){
            this.$prop = sub.join('.')
        }
        
        if(typeof childSchema === 'string'){
            this.$key = childSchema
            sub = [...sub, this.$key]
            this.$prop = sub.join('.')
        }else if(childSchema instanceof Array){
            this.$childSchema = childSchema.map(scheam => this.buildChildSchema(scheam, this.$key, sub))
        }else if(childSchema instanceof Object){
            this.$childSchema = Object.keys(childSchema).map(key => this.buildChildSchema(childSchema[key], key, [...sub, key]))
        }

        this.$props.initFormat(this)
    }

    buildChildSchema(schema, key, sub){
        if(isVNode(schema)){
            return new JsonSchema(null, createProp({vNode: schema}) , key, sub)
        }else if(isJsonSchemaSupplier(schema)){
            return schema.get(key, sub) 
        }else if(isJsonSchema(schema)){
            return schema
        }else if(isJsonPropSupplier(schema) || isJsonProp(schema)){
            return new JsonSchema(null, schema , key, sub)
        }else if(schema instanceof Object){
            return new JsonSchema(schema, createProp({}) , key, sub)
        }else{
            return new JsonSchema(null, createProp({default: schema}) , key, sub)
        }
    }
    
    getPropType(){
        return this.$props.$type
    }

    getDefaultValue(){
        return this.$props.$default
    }

    /* getDefaultValueWithChild(isRoot){
        let defaultValue = {}
        if(this.$props.$default !== undefined){
            defaultValue = this.$props.$default
        }else if(this.$childSchema != null){
            let childDefaultValue = {}
            for(const schema of this.$childSchema){
                childDefaultValue[schema.$key] = schema.getDefaultValueWithChild(false)
            }
            if(!isRoot && this.getPropType() === 'array'){
                defaultValue = [childDefaultValue]
            }else{
                defaultValue = childDefaultValue
            }
        }
        return defaultValue
    } */

    getValue(object){
        if(this.$prop){
            return getChild(object, this.$prop.split('.'))
        }
    }

    getRules(form){
        let rules = {}
        let item = this.$props.getRules()
        if(item.length != 0){
            rules[this.$prop] = item
        }
        if(this.$childSchema != null){
            for(const schema of this.$childSchema){
                const schemaRules = schema.getRules(form)
                for(let name in schemaRules){
                    if(this.$props.$type === 'array'){
                        let length = _.get(form, this.$prop, []).length
                        if(length === 0) continue
                        let end = name.substring(schema.$prop.length)
                        for(let index=0; index<length; index++){
                            let sub = schema.$prop.split('.')
                            sub.splice(sub.length -1, 0, index)
                            rules[sub.join(".") + end] = schemaRules[name]
                        } 
                        /* for(let index=0; index<length; index++){
                            let sub = name.split('.')
                            sub.splice(sub.length -1, 0, index)
                            rules[sub.join(".")] = schemaRules[name]
                        }  */
                    }else{
                        rules[name] = schemaRules[name]
                    } 
                }
            }
        }
        return rules
    }

    initDefaultValue(form, defaultObject, callback){
        if(this.$prop){
            const sub = this.$prop.split('.').map(removeArraySign)
            //const sub = this.$prop.split('.')
            let value = getChild(defaultObject, sub)
            if(value === undefined){
                let defaultValue = this.getDefaultValue()
                if(defaultValue != null){
                    if(this.getPropType() === 'array' && !(defaultValue instanceof Array)){
                        value = [deepClone(defaultValue)]
                    }else{
                        value = deepClone(defaultValue)
                    }
                }else if(this.getPropType() === 'array'){
                    value =  []
                }else if(this.getPropType() === 'object'){
                    value = {}
                }
            }
            let key = sub.pop()
            const _form = sub.length == 0 ? form : getChild(form, sub.map(removeArraySign))
            if(this.$props.$domNode !== true){
                callback(_form, key, value)
            }
        }
        
        if(this.getPropType() !== 'array'){
            this.initChildDefaultValue(form, defaultObject, callback)
        }
    }

    /* initDefaultValue(form, defaultObject, callback){
        if(this.$prop){
            const sub = this.$prop.split('.')
            let value = getChild(defaultObject, sub)
            let defaultValue = this.getDefaultValue()
            if(value === undefined){
                if(defaultValue != null){
                    if(this.getPropType() === 'array' && !(defaultValue instanceof Array)){
                        value = [deepClone(defaultValue)]
                    }else{
                        value = deepClone(defaultValue)
                    }
                }else if(this.getPropType() === 'array'){
                    value =  []
                }else if(this.getPropType() === 'object'){
                    value = {}
                }
            }
            const key = sub.pop()
            const _form = sub.length == 0 ? form : getChild(form, sub)
            callback(_form, key, value)
        }
        this.initChildDefaultValue(form, defaultObject, callback)
    } */
    /* setDefaultVale(form, sub, value, callback){
        const key = sub.pop()
        const _form = sub.length == 0 ? form : getChild(form, sub)
        if(_form === undefined){
            this.setDefaultVale(form, sub, {}, () => this.setDefaultVale(form, [...sub, key], value, callback))
        }else{
            callback(_form, key, value)
        }
    } */
    initChildDefaultValue(form, defaultObject, callback){
        if(this.$childSchema != null){
            for(const schema of this.$childSchema){
                schema.initDefaultValue(form, defaultObject, callback)
            }
        }
    }

    initRender(h, context, slots){
        if(this.$props && this.$props.initRender){
            this.$props.initRender(h, context, slots)
        }
        this.initChildRender(h, context, slots)
    }

    initChildRender(h, context, slots){
        if(this.$childSchema != null){
            for(const schema of this.$childSchema){
                schema.initRender(h, context, slots)
            }
        }
    }

}

export default function(...args){
    return new JsonSchemaSupplier((...params) => {
        if(args.length === 0){
            args = [null, null]
        }else if(args.length === 1){
            args = [args[0], null]
        }else{
            args = [args[0], args[1]]
        }
        return new JsonSchema(...args, ...params)
    })
}