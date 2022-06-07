import { format } from 'core-js/fn/date'
import _ from 'lodash'
import config from './config'
import { JsonPropSupplier } from './Supplier'
import { toHump, replaceAll, isJsonProp, isJsonPropSupplier, isVNode, toAllHump } from './utils'

export class JsonProp{

    constructor(inputOptions, schema) {
        const defaultOption = {
            prop: '',
            type: '',
            format: '',
            label: undefined,
            default: undefined,
            context: undefined,
            attrs: {},
            on: {},
            show: true,
            apply: true,
            domNode: false,
            config: {},
            template: undefined,
            render: undefined,
            component: undefined,
            slot: undefined,
            required: false,
            layout: undefined,
            vNode: undefined,
            rules: []
        }

        //let options = _.defaultsDeep({}, inputOptions, defaultOption)
        let options = _.defaultsDeep({}, inputOptions, defaultOption)
        this.$type = toHump(options.type)
        this.$format = toHump(options.format)
        this.$context = options.context
        this.$default = options.default
        this.$prop = options.prop
        this.$domNode = options.domNode
        this.$label = this.getOrDefault(options.label, schema.$key.toUpperCase())
        this.$attrs = _.defaultsDeep({}, options.attrs, this.getAttrs(inputOptions, Object.keys(defaultOption)))
        this.$on = _.defaultsDeep({}, options.on, this.getEvent(inputOptions))
        this.$options = this.getOptions(inputOptions)
        this.$rules = options.rules
        this.$config = toAllHump(options.config)

        this.$status = {
            show: options.show,
            apply: options.apply
        }

        if(isJsonPropSupplier(this.$label)){
            this.$label = this.$label.get(schema)
        }else if(isVNode(this.$label)){
            options.vNode = this.$label
            this.$label = ''
        }

        if(options.required == true){
            this.$rules.push({required: true, message: replaceAll(config.requiredMessage, '{{label}}', this.getLabelName())})
        }
        this.$render = {
            template: options.template,
            layout: options.layout,
            render: options.render,
            component: options.component,
            slot: options.slot,
            vNode: options.vNode
        }
    }

    initFormat(schema, isLabel = false){
        const {type, format} = this.getFormat(schema, isLabel)
        if(!this.$type){
            this.$type = type
        }
        if(!this.$format){
            this.$format = format
        }
        if(isJsonProp(this.$label)){
            this.$label.initFormat(schema, true)
        }
    }

    getLabelName(){
        if(isJsonProp(this.$label)){
            return this.$label.getLabelName()
        }
        return this.$label
    }

    getFormat(schema, isLabel = false){
        let type = 'object'
        if(isLabel){
            return { type: 'object', format: 'formItem' }
        }else if(this.$type){
            type = this.$type
        }else if(this.$default != undefined){
            type = typeof this.$default
            if(type === 'object' && this.$default instanceof Array){
                type = 'array'
            }
        }else if(this.$format === 'select' && !this.getAttr('multiple')){
            type = 'string'
        }else if(this.$attrs.hasOwnProperty('options')){
            type = 'array'
        }else if(schema.$childSchema === null){
            type = 'string'
        }
        switch (type) {
            case 'string':
                return { type: 'string', format: 'input' }
            case 'boolean':
                return { type: 'boolean', format: 'checkbox' }
            case 'integer':
            case 'number':
                return { type: 'number', format: 'numberInput'}
            case 'array':
                return { type: 'array', format: 'checkboxGroup' }
            default: 
                return { type: 'object', format: 'jsonCell' }
        }
    }

    getRules(){
        return this.$rules
    }

    initRender(h, context, slots){
        const { render, slot, vNode } = this.$render
        if(vNode){
            return
        }else if(render){
            this.$render.vNode = (props) => render(h, props)
        }else if(slot && slots[slot]){
            this.$render.vNode = slots[slot]
        }
        if(isJsonProp(this.$label)){
            this.$label.initRender(h, context, slots)
        }
    }

    getOrDefault(object, defaultValue){
        return object !== undefined && object !== null ? object : defaultValue
    }

    getAttr(key, defaultValue = undefined){
        return _.get(this.$attrs, toHump(key), defaultValue)
    }

    getAttrs(options, omit = []){
        let attrs = {}
        if(options && typeof options === 'object'){
            for(let key of Object.keys(options)){
                if(key && omit.indexOf(key) === -1 && !key.startsWith('@') && !key.startsWith('#')){
                    if(key.startsWith(':')){
                        attrs[toHump(key.substring(1))] = options[key]
                    }else{
                        attrs[toHump(key)] = options[key]
                    }
                }
            }
        }
        return attrs
    }
    
    getOption(key, defaultValue = undefined){
        return _.get(this.$options, toHump(key), defaultValue)
    }

    getOptions(options){
        let data = {}
        if(options && typeof options === 'object'){
            for(let key of Object.keys(options)){
                if(key && key.startsWith('#')){
                    data[toHump(key.substring(1))] = options[key]
                }
            }
        }
        return data
    }
    
    getEvent(options){
        let events = {}
        if(options && typeof options === 'object'){
            for(let key of Object.keys(options)){
                if(key && key.startsWith('@')){
                    events[key.substring(1)] = options[key]
                }
            }
        }
        return events
    }

    isApply(args){
        if(typeof this.$status.apply === 'function'){
            return this.$status.apply(Object.assign({}, args)) !== false
        }else{
            return this.$status.apply !== false
        }
    }

    isShow(args){
        if(typeof this.$status.show === 'function'){
            return this.$status.show(Object.assign({}, args)) !== false
        }else{
            return this.$status.show !== false
        }
    }

}

export default function(...args){
    return new JsonPropSupplier((...params) => {
        args = args.length === 0 ? [null] : [args[0]]
        return new JsonProp(...args, ...params)
    })
}