
<template>
    <JRadioGroup 
        v-model="value" 
        :text-color="textColor" 
        :fill="fill" 
        v-bind="bindAttrs" 
        v-on="bindOn">
        <JRadioButton 
            v-for="(option, key) in options" 
            :key="key" 
            :label="option.value || option.label || option" 
            :disabled="option.disabled"
            v-bind="option.attrs" 
            v-on="option.on"> 
            {{ option.label || option.value || option}}
        </JRadioButton>
    </JRadioGroup>
</template>

<script>
import { RadioButton, RadioGroup } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'RadioButton',
    mixins: [elementMixin],
    components: { JRadioButton: RadioButton, JRadioGroup: RadioGroup},
    props: ['text-color', 'fill', 'options']
}
</script>
