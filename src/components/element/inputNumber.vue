<template>
    <JInputNumber 
        v-model="value" 
        :max="max" 
        :min="min" 
        :step="step" 
        :step-strictly="stepStrictly" 
        :precision="precision" 
        :controls="controls" 
        :controls-position="controlsPosition" 
        v-bind="bindAttrs" 
        v-on="bindOn"
    ></JInputNumber>
</template>

<script>
import { InputNumber } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'InputNumber',
    mixins: [elementMixin],
    components: { JInputNumber: InputNumber},
    props: ['max', 'min', 'step', 'step-strictly', 'precision', 'controls', 'controls-position']
}
</script>