<template>
    <JSelect 
        v-model="value" 
        :multiple="multiple" 
        :value-key="valueKey" 
        :clearable="clearable" 
        :collapse-tags="collapseTags" 
        :multiple-limit="multipleLimit" 
        :autocomplete="autocomplete" 
        :filterable="filterable" 
        :allow-create="allowCreate" 
        :filter-method="filterMethod" 
        :remote="remote" 
        :remote-method="remoteMethod" 
        :loading="loading" 
        :loading-text="loadingText" 
        :no-match-text="noMatchText" 
        :no-data-text="noDataText" 
        :popper-class="popperClass" 
        :reserve-keyword="reserveKeyword" 
        :default-first-option="defaultFirstOption" 
        :popper-append-to-body="popperAppendToBody" 
        :automatic-dropdown="automaticDropdown" 
        v-bind="bindAttrs" 
        v-on="bindOn">
            <template>
                <slot>
                    <JOptionGroup 
                        v-for="(group, key) in options" 
                        :label="group.label" 
                        :disabled="group.disabled" 
                        :key="key">
                        <JOption 
                            v-for="(option, key) in group.options" 
                            :key="key" 
                            :label="option.label || option.value" 
                            :value="option.value || option.label"
                            :disabled="option.disabled"
                            v-bind="option.attrs" 
                            v-on="option.on"
                        ></JOption>
                    </JOptionGroup>
                </slot>
            </template>
            <template slot="prefix"><slot name="prefix"></slot></template>
            <template slot="empty"><slot name="empty"></slot></template>
    </JSelect>
</template>

<script>
import { Select, OptionGroup, Option } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'SelectGroup',
    mixins: [elementMixin],
    components: { JOptionGroup: OptionGroup, JSelect: Select, JOption: Option },
    props: ['options', 'multiple', 'value-key', 'clearable', 'collapse-tags', 'multiple-limit', 'autocomplete', 'filterable', 'allow-create', 'filter-method', 'remote', 'remote-method', 'loading', 'loading-text', 'no-match-text', 'no-data-text', 'popper-class', 'reserve-keyword', 'default-first-option', 'popper-append-to-body', 'automatic-dropdown'],
    created(){
        console.info(this.groups)
    }
}
</script>