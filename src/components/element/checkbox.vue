<template>
    <JCheckbox 
        v-model="value" 
        :label="value || label"
        :true-label="trueLabel"
        :false-label="falseLabel"
        :border="border"
        :name="name"
        :checked="checked"
        :indeterminate="indeterminate"
        v-bind="bindAttrs" 
        v-on="bindOn">
        {{ label }}
    </JCheckbox>
</template>

<script>
import { Checkbox } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'Checkbox',
    mixins: [elementMixin],
    components: { JCheckbox: Checkbox},
    props: ['true-label', 'false-label', 'border', 'name', 'checked', 'indeterminate', 'label']
}
</script>