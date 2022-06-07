<template>
    <JCheckboxGroup 
        v-model="value" 
        :min="min" 
        :max="max" 
        :text-color="textColor" 
        :fill="fill" 
        v-bind="bindAttrs" 
        v-on="bindOn">
        <JCheckboxButton 
            v-for="(option, key) in options" 
            :key="key" 
            :label="option.value || option.label"
            :disabled="option.disabled"
            :border="border"
            :indeterminate="indeterminate"
            v-bind="option.attrs" 
            v-on="option.on"> 
            {{ option.label }}
        </JCheckboxButton>
    </JCheckboxGroup>
</template>

<script>
import { CheckboxGroup, CheckboxButton } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'CheckboxGroup',
    mixins: [elementMixin],
    components: { JCheckboxGroup: CheckboxGroup, JCheckboxButton: CheckboxButton},
    props: ['min', 'max', 'text-color', 'fill', 'options', 'border', 'indeterminate']
}
</script>