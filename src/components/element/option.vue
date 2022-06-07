<template>
    <JOption 
        :label="attrs.label || attrs.value" 
        :value="attrs.value || attrs.label"
        v-bind="bindAttrs" 
        v-on="bindOn"
    ></JOption>
</template>

<script>
import { Option } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'Option',
    mixins: [elementMixin],
    components: { JOption: Option}
}
</script>