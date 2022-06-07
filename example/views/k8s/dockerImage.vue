<template>
    <div>
        <el-select 
            v-model="image" 
            :clearable="true" 
            :filterable="true" 
            :allow-create="true"
            :style="imageStyle"
            :default-first-option="true"
            placeholder="image">
            <el-option 
                v-for="(value, key) in imageOptions" 
                :key="key" 
                :label="value" 
                :value="value"
            ></el-option>
        </el-select>
        <el-select 
            v-model="tag" 
            :clearable="true" 
            :filterable="true" 
            :allow-create="true"
            :style="tagStyle"
            placeholder="tag">
            <el-option 
                v-for="(value, key) in tagOptions" 
                :key="key" 
                :label="value" 
                :value="value"
            ></el-option>
        </el-select>
    </div>
</template>
<script>
import elementMixin from '../../../src/components/elementMixin'

export default{
    name: 'DockerImage',
    mixins: [elementMixin],
    props: {
        imageOptions: {
            type: Array,
            default: () => []
        },
        tagOptions: {
            type: Array,
            default: () => []
        },
        imageStyle: '',
        tagStyle: ''
    },
    computed: {
        valueSplit(){
            return this.splitImage(this.value)
        },
        image: {
            get(){
                return this.valueSplit[0] || ''
            },
            set(value){
                if(value.indexOf(':') !== -1){
                    const split = this.splitImage(value)
                    this.image = split[0]
                    this.tag = split[1]
                    this.value = split.join(':')
                }else{
                    this.value = this.tag ? (value + ':' + this.tag) : value
                }
            }
        },
        tag: {
            get(){
                return this.valueSplit[1] || ''
            },
            set(value){
                this.value = value ? (this.image + ':' + value) : this.image 
            }
        }
    },
    methods: {
        splitImage(image){
            image = image || ''
            let path = image.split('/')
            if(path.length < 2){
                return [image, '']
            }
            let last = path.pop()
            let split = (last || '').split(':')
            if(split.length > 1){
                let tag = split.pop()
                return [path.join('/') + '/' + split.join(':'), tag]
            }else{
                return [path.join('/') + '/' + split[0], '']
            }
        }
    }
}
</script>