<template>
    <div>
        <JCard
            v-for="(count, index) in counter"
            :key="index" 
            :header="labelRender(header, index + 1, headerWidthValue ? {item: value[index]} : {})" 
            :body-style="bodyStyle" 
            :shadow="shadow" 
            v-bind="bindAttrs" 
            v-on="bindOn">
            {{renderProp(handleHeader, 'handle-header')}}
            <template slot="header">
                <slot :name="slotPrefix + (index + 1)"></slot>
                <slot name="handle-header">
                    <el-button v-if="editable" style="float: right; padding: 3px 0" type="text" @click="remove(index)"><i class="el-icon-close"></i></el-button>
                </slot>
            </template>
            <json-cell
                v-for="(childSchema, key) in $schema.$childSchema"
                :key="key"
                :$form="$form" 
                :$schema="rowSchema(childSchema, index)" 
                :$schemaProps="childSchema.$props" 
                :$_config="$_config"
                :$_caller="$_caller"
                :$_context="$_context"
            ></json-cell>
        </JCard>
        <slot name="handle-content">
            {{renderProp(handleContent, 'handle-content')}}
            <el-button v-if="editable" type="primary" style="width:100%;margin-top:20px" @click="add"><i class="el-icon-circle-plus-outline"></i> 添加</el-button>
        </slot>
    </div>
</template>

<script>
import { Card } from '../components'
import elementMixin from '../elementMixin'
import elementArrayMixin from '../elementArrayMixin'

export default{
    name: 'CardTable',
    mixins: [elementMixin, elementArrayMixin],
    components: { JCard: Card},
    props: ['header', 'body-style', 'shadow', 'editable', 'handle-header', 'handle-content', 'max', 'min', 'max-message', 'min-message', 'header-width-value', 'watch'],
    methods: {
        add(){
            let that = this
            if(this.max !== undefined && this.counter >= this.max){
                that.$emit('add-over')
                if(this.maxMessage){
                    this.$notify.info(this.maxMessage)
                }
                return
            }
            this.counter++
            let value = _.defaultsDeep({}, this.defaultValue)
            this.value.push(value)
            this.$forceUpdate()
            that.$emit('add-success', value, this.counter)
        },
        remove(index, row){
            let that = this
            if(this.min !== undefined && this.counter <= this.min){
                that.$emit('remove-over')
                if(this.minMessage){
                    this.$notify.info(this.minMessage)
                }
                return
            }
            this.counter--
            let value = this.value.splice(index, 1)
            this.$forceUpdate()
            that.$emit('remove-success', value[0], this.counter)
        }
    }
}
</script>