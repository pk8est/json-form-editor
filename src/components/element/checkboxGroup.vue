<template>
    <JCheckboxGroup  
        v-model="value"
        :min="min" 
        :max="max" 
        :text-color="textColor" 
        :fill="fill" 
        v-bind="bindAttrs" 
        v-on="bindOn">
        <JCheckbox 
            v-for="(option, key) in options" 
            :key="key" 
            :label="option.value || option.label"
            :disabled="option.disabled"
            :border="border"
            :indeterminate="indeterminate"
            v-bind="option.attrs" 
            v-on="option.on">
            {{ option.label }}
        </JCheckbox>
    </JCheckboxGroup>
</template>

<script>
import { CheckboxGroup, Checkbox } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'CheckboxGroup',
    mixins: [elementMixin],
    components: { JCheckboxGroup: CheckboxGroup, JCheckbox: Checkbox},
    props: ['min', 'max', 'text-color', 'fill', 'options', 'border', 'indeterminate']
}
</script>