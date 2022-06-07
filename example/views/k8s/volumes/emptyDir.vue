<template>
    <div>
        <el-form-item label="媒介">
            <el-select v-model="form.medium" class="volume-select" :clearable="true" :allow-create="true" :default-first-option="true">
                <el-option v-for="(item, key) in mediumTypes" :key="key" :label='item.label' :value="item.value" />
            </el-select>
        </el-form-item>

        <el-form-item label="最大限制">
            <el-input v-model="form.sizeLimit" class="volume-input"></el-input>
        </el-form-item>
    </div>
</template>
<script>
import elementMixin from '../../../../src/components/elementMixin'


export default{
    name: 'EmptyDir',
    mixins: [elementMixin],
    props: ['data'],
    data(){
        return {
            form: {
                medium: '',
                sizeLimit: ''
            },
            mediumTypes: [
                {label: '默认', value: ''},
                {label: '内存', value: 'Memory'},
            ]
        }
    },
    created(){
        this.form = this.data
    }
}
</script>
