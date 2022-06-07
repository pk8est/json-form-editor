<template>
    <JRadio 
    v-model="value" 
    :label="label"
    :border="border"
    :name="name"
    v-bind="bindAttrs" 
    v-on="bindOn"
    >
        {{ label }}
    </JRadio>
</template>

<script>
import { Radio } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'Radio',
    mixins: [elementMixin],
    components: { JRadio: Radio},
    props: ['border', 'name', 'label']
}
</script>