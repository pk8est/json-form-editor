<template>
    <JTimePicker 
        v-model="value" 
        :readonly="readonly" 
        :editable="editable" 
        :clearable="clearable" 
        :start-placeholder="startPlaceholder" 
        :end-placeholder="endPlaceholder" 
        :align="align" 
        :is-range="isRange" 
        :arrow-control="arrowControl" 
        :popper-class="popperClass" 
        :picker-options="pickerOptions" 
        :range-separator="rangeSeparator" 
        :default-value="defaultValue" 
        :default-time="defaultTime" 
        :value-format="valueFormat" 
        :prefix-icon="prefixIcon" 
        :clear-icon="clearIcon" 
        v-bind="bindAttrs" 
        v-on="bindOn"
    ></JTimePicker>
</template>

<script>
import { TimeSelect } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'TimePicker',
    mixins: [elementMixin],
    components: { JTimePicker: TimeSelect},
    props: ['readonly', 'editable', 'clearable', 'start-placeholder', 'end-placeholder', 'align', 'is-range', 'arrow-control', 'popper-class', 'picker-options', 'range-separator','default-value','default-time', 'value-format', 'prefix-icon', 'clear-icon'],
}
</script>