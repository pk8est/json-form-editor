<template>
    <JCascader 
    v-model="value" 
    :options="options"
    :class="className"
    :props="cascaderProps"
    :clearable="clearable"
    :show-all-levels="showAllLevels"
    :collapse-tags="collapseTags"
    :separator="separator"
    :filterable="filterable"
    :filter-method="filterMethod"
    :debounce="debounce"
    :before-filter="beforeFilter"
    v-bind="bindAttrs" 
    v-on="bindOn" 
    ></JCascader>
</template>

<script>
import { Cascader } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'Cascader',
    mixins: [elementMixin],
    components: { JCascader: Cascader},
    props: ['className', 'options', 'cascader-props', 'clearable', 'show-all-levels', 'collapse-tags', 'separator', 'filterable', 'filter-method', 'debounce', 'before-filter', 'popper-class']
}
</script>