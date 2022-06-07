<template>
    <JTabs 
        v-model="activeTab" 
        :type="type" 
        :closable="closable" 
        :addable="addable" 
        :editable="editable" 
        :tab-position="tabPosition" 
        :stretch="stretch" 
        :before-leave="beforeLeave" 
        v-bind="bindAttrs" 
        v-on="bindOn">
        <JTabPane v-for="(childSchema, key) in $schema.$childSchema" :key="key" :label="label(childSchema, key)" :name="childSchema.name || childSchema.$key">
            <template slot="label"><slot :name="labelSlotPrefix + key"></slot></template>
            <json-cell
                :$form="$form" 
                :$schema="childSchema" 
                :$schemaProps="childSchema.$props" 
                :$_config="$_config"
                :$_caller="$_caller"
                :$_context="$_context"
                :is-closed-lable-component="true" 
            ></json-cell>
        </JTabPane>
    </JTabs>
</template>

<script>
import { Tabs, TabPane } from '../components'
import elementMixin from '../elementMixin'
import { isJsonProp } from '../../utils'

export default{
    name: 'Tabs',
    mixins: [elementMixin],
    components: { JTabs: Tabs , JTabPane: TabPane},
    props: ['active', 'type', 'closable', 'addable', 'editable', 'tab-position', 'stretch', 'before-leave'],
    data() {
       return {
           labelSlotPrefix: 'label_',
           activeTab: this.active
       }
    },
    methods: {
        label($schema, index){
            if(isJsonProp($schema.$props.$label)){
                const node = this.$createElement('json-cell', {
                    props: {
                        $form: this.$form,
                        $schema: $schema,
                        $schemaProps: $schema.$props.$label,
                        $_config: this.$_config,
                        $_caller: this.$_caller,
                        $_context: this.$_context,
                        withLayout: false
                    }
                }) 
                this.$scopedSlots[this.labelSlotPrefix + index] = () => [node]
            }else{
                return $schema.$props.$label
            } 
        }
    }
}
</script>