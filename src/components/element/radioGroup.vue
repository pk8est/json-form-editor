
<template>
    <JRadioGroup 
        v-model="value"
        :text-color="textColor" 
        :fill="fill" 
        v-bind="bindAttrs" 
        v-on="bindOn">
        <JRadio 
            v-for="(option, key) in options" 
            :key="key" 
            :label="option.value || option.label || option" 
            :disabled="option.disabled"
            v-bind="option.attrs" 
            v-on="option.on"> 
            {{ option.label || option.value || option}}
        </JRadio>
    </JRadioGroup>
</template>

<script>
import { Radio, RadioGroup } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'RadioGroup',
    mixins: [elementMixin],
    components: { JRadio: Radio, JRadioGroup: RadioGroup},
    props: ['text-color', 'fill', 'options']
}
</script>
