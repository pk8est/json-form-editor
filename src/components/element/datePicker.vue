<template>
    <JDatePicker 
        v-model="value" 
        :type="type"
        :format="format"
        :readonly="readonly" 
        :editable="editable" 
        :clearable="clearable" 
        :start-placeholder="startPlaceholder" 
        :end-placeholder="endPlaceholder" 
        :align="align" 
        :popper-class="popperClass" 
        :picker-options="pickerOptions" 
        :range-separator="rangeSeparator" 
        :default-value="defaultValue" 
        :default-time="defaultTime" 
        :value-format="valueFormat" 
        :unlink-panels="unlinkPanels" 
        :prefix-icon="prefixIcon" 
        :clear-icon="clearIcon" 
        :validate-event="validateEvent" 
        v-bind="bindAttrs" 
        v-on="bindOn" 
    />
</template>

<script>
import { DatePicker } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'DatePicker',
    mixins: [elementMixin],
    components: { JDatePicker: DatePicker},
    props: ['type', 'format', 'readonly', 'editable', 'clearable', 'start-placeholder', 'end-placeholder', 'align', 'popper-class', 'picker-options', 'range-separator','default-value','default-time', 'value-format', 'unlink-panels', 'prefix-icon', 'clear-icon', 'validate-event']
}
</script>