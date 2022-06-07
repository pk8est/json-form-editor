<template>
    <JTabPane 
        :label="label($schema)" 
        :name="$schema.name || $schema.$key"
        v-bind="bindAttrs" 
        v-on="bindOn"
    >
        <json-cell 
            :$form="$form" 
            :$schema="$schema" 
            :$schemaProps="schemaProps" 
            :$_config="$_config"
            :$_caller="$_caller"
            :$_context="$_context"
        ></json-cell>
    </JTabPane>
</template>

<script>
import { TabPane } from '../components'
import elementMixin from '../elementMixin'
import { isJsonProp } from '../../utils'

export default{
    name: 'TabPane',
    mixins: [elementMixin],
    components: { JTabPane: TabPane },
    props: ['name'],
    methods: {
        label($schema){
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
                this.$scopedSlots.label = () => [node]
            }else{
                return $schema.$props.$label
            } 
        }
    } 
}
</script>