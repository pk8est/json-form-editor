<!-- 
<template>
    <JFormItem :label="label" v-bind="attrs" v-on="on" :prop="prop">
        <template slot="label"><slot name="label"></slot></template>
        <template><slot></slot></template>
    </JFormItem>
</template>
-->

<script>
import _ from 'lodash'
import { FormItem } from '../components'
import elementMixin from '../elementMixin'
import { replaceAll } from '../../utils'

export default{
    name: 'FormItem',
    mixins: [elementMixin],
    components: { JFormItem: FormItem },
    props: {
        label: {
            type: Object
        }, 
        prop: {
            type: String
        },
        withLabel: {
            type: Boolean,
            default: true
        },
        isShow: {
            type: Boolean,
            default: true
        },
        size: {
            type: String
        },
        formItemConfig: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        _template(){
            const labelTemplate = replaceAll(this.getOptionOrConfig('layout.label'), '#{LABEL}', '<slot name="label"></slot>')
            const contentTemplate = replaceAll(this.getOptionOrConfig('layout.content'), '#{CONTENT}', '<slot></slot>')
            return replaceAll(replaceAll(this.getOptionOrConfig('layout.formItem'), '#{LABEL}', labelTemplate), '#{CONTENT}', contentTemplate)
        }
    },
    methods: {
        getOptionOrConfig(key, defaultValue){
            let value = _.get(this.$_options, key)
            if(value === undefined && this.$schemaProps != null && typeof this.$schemaProps.getOption === 'function'){
                value = this.$schemaProps.getOption(key)
            }
            if(value === undefined){
                value = _.get(this.$_config, key)
            }
            return value !== undefined ? value : _.get(this.formItemConfig, key, defaultValue)
        },
    },
    render(h){
        if(this.withLabel === false){
            this.$attrs.labelWidth = "0"
        }
        
        const { $data, $options } = this
        const base = {
            computed: $options.computed,
            components: $options.components,
            methods: $options.methods,
            filters: $options.filters
        }
        return h(_.defaultsDeep({}, base, {
            template: this._template,
            props: ['label', 'prop', 'with-label', 'is-show', 'size'],
            mixins: [elementMixin],
            components: { JFormItem: FormItem },
            data: () => $data,
            computed: {
                $label(){
                    return this.withLabel  ? (this.label || (this.$schemaProps && this.$schemaProps.$label)) : ''
                },
                $prop(){
                    return this.prop || (this.$schema && this.$schema.$prop)
                },
                $rules(){
                    return this.$schema && this.$schema.$props && this.$schema.$props.$rules
                }
            }
        }), {
            props: {
                label: this.label,
                prop: this.prop,
                isShow: this.isShow,
                $schemaProps: this.$schemaProps,
                $schema: this.$schema,
                withLabel: this.withLabel,
                $_caller: this.$_caller,
                $_context: this.$_context
            },
            attrs: this.$attrs,
            scopedSlots: this.$scopedSlots
        })
    } 
}
</script>