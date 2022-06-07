<template>
    <JTransfer 
        v-model="value" 
        :data="data"
        :filterable="filterable"
        :filter-placeholder="filterPlaceholder"
        :filter-method="filterMethod"
        :target-order="targetOrder"
        :titles="titles"
        :button-texts="buttonTexts"
        :render-content="renderContent"
        :format="format"
        :props="transferProps"
        :left-default-checked="leftDefaultChecked"
        :right-default-checked="rightDefaultChecked"
        v-bind="bindAttrs" 
        v-on="bindOn"
    ></JTransfer>
</template>

<script>
import { Transfer } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'Transfer',
    mixins: [elementMixin],
    components: { JTransfer: Transfer},
    props: ['data', 'filterable', 'filter-placeholder', 'filter-method', 'target-order', 'titles', 'button-texts', 'render-content', 'format', 'transfer-props', 'left-default-checked', 'right-default-checked']
}
</script>