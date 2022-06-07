<template>
    <div>
        <el-form-item label="配置字典">
            <el-select v-model="form.name" class="volume-select" >
                <el-option v-for="(item, key) in options" :key="key" :label='item.label' :value="item.value" />
            </el-select>
        </el-form-item>

        <el-form-item label="配置映射">
            <json-editor :schema="schema" v-model="$form" ></json-editor>
        </el-form-item>
    </div>
</template>
<script>
import _ from 'lodash'
import elementMixin from '../../../../src/components/elementMixin'
import jsonEditor from '../../../../src/JsonEditor'
import { prop, schema, input} from '../../../../src/JsonSchemaType'

export default{
    name: 'ConfigMap',
    mixins: [elementMixin],
    components: {jsonEditor},
    props: ['data'],
    data(){
        return {
           form: {
               name: '',
               items: []
           },
           schema: schema({
               key: input('Key', {withLabel: false}),
               path: input('Path', {withLabel: false}),
           }, prop({
               format: 'table', 
               type: 'array', 
               prop: this.$schema.$prop + '.configMap.items',
               editable: true
           }))
        }
    },
    computed: {
        options(){
            return [
                {value: 'configMap1', label: '配置1'},
                {value: 'configMap2', label: '配置2'},
                {value: 'configMap3', label: '配置3'},
            ]
        }
    },
    created(){
        this.form = this.data
    }
}
</script>
