<template>
    <div>
        <JTag
            v-for="(tagValue, tagName) in value"
            class="json-editor-tags"
            :key="tagName"
            :type="type"
            :hit="hit"
            :color="color"
            :effect="effect"
            :size="size"
            :closable="editable"
            :disable-transitions="disableTransitions"
            @close="handleClose(tagName)"
            v-bind="bindAttrs" 
            v-on="bindOn">
            {{tagName}}:{{tagValue}}
        </JTag>
        <div v-if="editable && inputVisible">
            <el-form  ref="tagForm" size="mini" :model="tagForm" :rules="rules" label-width="0" inline>
                <el-form-item prop="key">
                    <el-input v-model="tagForm.key" class="input-new-tag" :size="size">
                        <template slot="prepend">键</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="value">
                    <el-input v-model="tagForm.value" class="input-new-tag" :size="size">
                        <template slot="append">值</template>
                    </el-input>
                </el-form-item>
                <el-button class="button-new-tag button-confirm" :size="size" @click="addTag">确定</el-button>
                <el-button class="button-new-tag" :size="size" @click="inputVisible = false">取消</el-button>
            </el-form>
        </div>
        <el-button v-else-if="editable" class="button-new-tag" :size="size" @click="inputVisible = true">+ 添加标签</el-button>
    </div>
</template>

<script>
import { Tag } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'Tags',
    mixins: [elementMixin],
    components: { JTag: Tag },
    props: ['closable', 'disable-transitions', 'type', 'hit', 'color', 'size', 'effect', 'editable'],
    data(){
        return {
            tagForm: {
                key: '',
                value: '',
            },
            rules: {
                key: [{required: true, message: '请输入标签键', trigger: 'click' }],
                value: [{required: true, message: '请输入标签值', trigger: 'click' }]
            },
            inputVisible: false
        }
    },
    methods: {
        handleClose(tagName){
            this.$delete(this.value, tagName)
        },
        addTag(){
            this.$refs.tagForm.validate((valid) => {
                if(valid){
                    this.$set(this.value, this.tagForm.key, this.tagForm.value)
                    this.tagForm = {key: '', value: ''}
                }else{
                    this.$notify.error('请填写标签的键和值!', 3)
                }
            })
        }
    }
}
</script>

<style scoped>
.json-editor-tags.el-tag {
    margin-right: 10px;
    margin-bottom: 5px;
}
.button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 150px;
    vertical-align: middle;
}
.button-confirm {
    margin-left: 10px;
}
</style>