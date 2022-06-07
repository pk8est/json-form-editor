<template>
    <el-input 
        v-model="command" 
        :type="type" 
        :maxlength="maxlength" 
        :minlength="minlength" 
        :show-word-limit="showWordLimit" 
        :clearable="clearable" 
        :show-password="showPassword" 
        :prefix-icon="prefixIcon" 
        :suffix-icon="suffixIcon" 
        :rows="rows" 
        :autosize="autosize" 
        :autocomplete="autocomplete" 
        :readonly="readonly" 
        :resize="resize" 
        :max="max" 
        :min="min" 
        :step="step" 
        :autofocus="autofocus" 
        :tabindex="tabindex" 
        :validate-event="validateEvent" 
        v-bind="bindAttrs" 
        v-on="bindOn" 
        @blur="onCommandChange"
    />
</template>
<script>
import { splitSpace } from '../../../src/utils'
import elementMixin from '../../../src/components/elementMixin'

export default{
    name: 'Probe',
    mixins: [elementMixin],
    props: ['type', 'maxlength', 'minlength', 'show-word-limit', 'clearable', 'show-password', 'prefix-icon', 'suffix-icon', 'rows', 'autosize', 'autocomplete', 'readonly', 'resize', 'max', 'min', 'step', 'autofocus', 'tabindex', 'validate-event'],
    data(){
        return {
            command: ''
        }
    },
    created(){
        this.command = this.value && this.value instanceof Array ? this.value.map(value => value.indexOf(' ') === -1  ? value : '"' + value + '"').join(' ') : this.value 
    },
    methods: {
        onCommandChange(e){
            this.value = splitSpace(e.target.value)
        }
    }
    
}
</script>
