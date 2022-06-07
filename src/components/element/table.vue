<template>
    <el-table 
        :data="Array.from(new Array(counter).keys())"
        :height="height"
        :max-height="maxHeight"
        :stripe="stripe"
        :border="border"
        :size="size"
        :fit="fit"
        :show-header="showHeader"
        :highlight-current-row="highlightCurrentRow"
        :current-row-key="currentRowKey"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :cell-class-name="cellClassName"
        :cell-style="cellStyle"
        :header-row-class-name="headerRowClassName"
        :header-row-style="headerRowStyle"
        :header-cell-class-name="headerCellClassName"
        :header-cell-style="headerCellStyle"
        :row-key="rowKey"
        :empty-text="emptyText"
        :default-expand-all="defaultExpandAll"
        :expand-row-keys="expandRowKeys"
        :default-sort="defaultSort"
        :tooltip-effect="tooltipEffect"
        :show-summary="showSummary"
        :sum-text="sumText"
        :summary-method="summaryMethod"
        :span-method="spanMethod"
        :select-on-indeterminate="selectOnIndeterminate"
        :indent="indent"
        :lazy="lazy"
        :load="load"
        :tree-props="treeProps" 
        v-bind="bindAttrs" 
        v-on="bindOn">
        <el-table-column 
            v-for="(childSchema, key) in $schema.$childSchema" 
            :key="key" 
            :prop="childSchema.$prop" 
            :label="labelRender(childSchema.$props.$label, key + 1)" 
            v-bind="childSchema.$props.getOption('column-attrs', {})"
            v-on="childSchema.$props.getOption('column-on', {})">
                <template slot="header"><slot :name="slotPrefix + (key + 1)"></slot></template>
                <template slot-scope="scope">
                    <slot>
                        <json-cell 
                            :$form="$form" 
                            :$schema="rowSchema(childSchema, scope.$index)" 
                            :$schemaProps="childSchema.$props" 
                            :$index="scope.$index" 
                            :$_config="$_config"
                            :$_caller="$_caller"
                            :$_context="$_context"
                            :is-closed-lable-component="true" 
                        ></json-cell>
                    </slot>
                </template>
                
        </el-table-column>
        <el-table-column v-if="editable" v-bind="handleHeaderAttrs">
            <template slot="header">
                <slot name="handle-header">
                    {{renderProp(handleHeader, 'handle-header')}}
                    <el-button size="mini" type="" @click="add"><i class="el-icon-circle-plus"></i></el-button>
                </slot>
            </template>
            <template slot-scope="scope">
                <slot name="handle-content">
                    {{renderProp(handleContent, 'handle-content', {scope: scope})}}
                    <el-button size="mini" type="danger" @click="remove(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
                </slot>
            </template>
        </el-table-column>
        <template slot="append" v-if="editable">
            <slot name="append-content">
                {{renderProp(appendContent, 'append-content')}}
                <!-- <div style="padding: 5px;text-align:right">
                    <el-button size="mini" type="" @click="add"><i class="el-icon-circle-plus"></i></el-button>
                </div> -->
             </slot>
        </template>
    </el-table>
</template>

<script>
//import { Table, TableColumn } from '../components'
import elementMixin from '../elementMixin'
import elementArrayMixin from '../elementArrayMixin'
import { isJsonProp } from '../../utils'

export default{
    name: 'Table',
    mixins: [elementMixin, elementArrayMixin],
    //components: {  JTable: Table,  JTableColumn: TableColumn },
    props: ['height','max-height','stripe','border','size','fit','show-header','highlight-current-row','current-row-key','row-class-name','row-style','cell-class-name','cell-style','header-row-class-name','header-row-style','header-cell-class-name','header-cell-style','row-key','empty-text','default-expand-all','expand-row-keys','default-sort','tooltip-effect','show-summary','sum-text','summary-method','span-method','select-on-indeterminate','indent','lazy','load','tree-props', 'editable', 'handle-header', 'handle-content', 'handle-header-attrs', 'append-content', 'max-message', 'min-message'],
    computed: {
    
    },
    methods: {
        isJsonProp,
        add(){
            let that = this.$children[0] || this
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
            that.$emit('add-success', value, this.counter)
        },
        remove(index, row){
            let that = this.$children[0] || this
            if(this.min !== undefined && this.counter <= this.min){
                that.$emit('remove-over')
                if(this.minMessage){
                    this.$notify.info(this.minMessage)
                }
                return
            }
            this.counter--
            let value = this.value.splice(index, 1)
            that.$emit('remove-success', value[0], this.counter)
        }
    }
}
</script>