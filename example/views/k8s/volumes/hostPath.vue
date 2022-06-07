<template>
    <div>
        <el-form-item label="主机路径">
            <el-input v-model="form.path" class="volume-input"></el-input>
        </el-form-item>

        <el-form-item label="类型">
            <el-select v-model="form.type" class="volume-select">
                <el-option v-for="(item, key) in types" :key="key" :label='item.label' :value="item.value"/>
            </el-select>
        </el-form-item>

    </div>
</template>
<script>
import elementMixin from '../../../../src/components/elementMixin'


export default{
    name: 'HostPath',
    mixins: [elementMixin],
    props: ['data'],
    data(){
        return {
            form: {
                path: '',
                type: ''
            },
            types: [
                {label: '默认', value: ''},
                {label: '文件夹', value: 'Directory'},
                {label: '文件夹(不存在时创建)', value: 'DirectoryOrCreate'},
                {label: '文件', value: 'File'},
                {label: '文件(不存在时创建)', value: 'FileOrCreate'},
                {label: 'UNIX 套接字', value: 'Socket'},
                {label: '字符设备', value: 'CharDevice'},
                {label: '块设备', value: 'BlockDevice'},
            ]
        }
    },
    created(){
        this.form = this.data
    }
}
</script>
