<template>
    <JColorPicker 
        v-model="value" 
        :show-alpha="showAlpha" 
        :color-format="colorFormat" 
        :popper-class="popperClass" 
        :predefine="predefine" 
        v-bind="bindAttrs" 
        v-on="bindOn">
    </JColorPicker>
</template>

<script>
import { ColorPicker } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'ColorPicker',
    mixins: [elementMixin],
    components: { JColorPicker: ColorPicker},
    props: ['show-alpha', 'color-format', 'popper-class', 'predefine']
}
</script>