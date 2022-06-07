<template>
    <div>
        <el-form-item label="存储名" :prop="$schema.$prop + '.name'" required>
            <el-input v-model="value.name" class="volume-input"></el-input>
        </el-form-item>
        <el-form-item label="存储类型">
            <el-radio-group v-model="type" size="mini">
                <el-radio-button v-for="(item, key) in types" :key="key" :label="item.type">{{item.name}}</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <component :is="type" :data="volumeData[type]" :$schema="$schema" :$form="$form"/>
    </div>
</template>
<script>
import _ from 'lodash'
import elementMixin from '../../../src/components/elementMixin'
import EmptyDir from './volumes/emptyDir'
import ConfigMap from './volumes/configMap'
import HostPath from './volumes/hostPath'

export default{
    name: 'Volume',
    mixins: [elementMixin],
    components: {
        emptyDir: EmptyDir,
        configMap: ConfigMap,
        hostPath: HostPath
    },
    props: [],
    data(){
        return {
            volumeData: {
                emptyDir: {
                    medium: undefined,
                    sizeLimit: undefined
                },
                hostPath: {
                    path: undefined,
                    type: undefined
                },
                configMap: {
                    name: undefined,
                    items: []
                },
            },
            type: 'emptyDir',
            types: [
               {type: 'emptyDir', name: '临时目录'},
               {type: 'hostPath', name: '主机目录'},
               {type: 'configMap', name: 'ConfigMap'},
            ]
        }
    },
    watch: {
        type(value, oldValue){
            this.value = {name: this.value.name, [value]: this.volumeData[value]}
        }
    },
    created(){
        if(this.value && typeof this.value  === 'object'){
            for(let item of this.types){
                if(this.value.hasOwnProperty(item.type)){
                    this.volumeData[item.type] = _.defaultsDeep({}, this.value[item.type], this.volumeData[item.type])
                    this.type = item.type
                    continue
                } 
            }

        }    
    }
}
</script>
