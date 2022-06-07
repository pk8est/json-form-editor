<template>
    <JSwitch 
        v-model="value" 
        :width="width" 
        :active-icon-class="activeIconClass" 
        :inactive-icon-class="inactiveIconClass" 
        :active-text="activeText" 
        :inactive-text="inactiveText" 
        :active-value="activeValue" 
        :inactive-value="inactiveValue" 
        :active-color="activeColor" 
        :inactive-color="inactiveColor" 
        :validate-event="validateEvent" 
        v-bind="bindAttrs" 
        v-on="bindOn"
    ></JSwitch>
</template>

<script>
import { Switch } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'JESwitch',
    mixins: [elementMixin],
    components: { JSwitch: Switch},
    props: ['width', 'active-icon-class', 'inactive-icon-class', 'active-text', 'inactive-text', 'active-value', 'inactive-value', 'active-color', 'inactive-color', 'validate-event']
}
</script>