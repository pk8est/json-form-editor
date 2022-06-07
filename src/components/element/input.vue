<template>
    <JInput 
        v-model="value" 
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
    ></JInput>
</template>

<script>
import { Input } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'Input',
    mixins: [elementMixin],
    components: { JInput: Input},
    props: ['type', 'maxlength', 'minlength', 'show-word-limit', 'clearable', 'show-password', 'prefix-icon', 'suffix-icon', 'rows', 'autosize', 'autocomplete', 'readonly', 'resize', 'max', 'min', 'step', 'autofocus', 'tabindex', 'validate-event']
}
</script>