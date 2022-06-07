<template>
    <JForm
        :model="$form" 
        :class="className"
        :size="size" 
        :inline="inline" 
        :labelPosition="labelPosition" 
        :labelWidth="labelWidth" 
        v-bind="bindAttrs" 
        v-on="bindOn"
        >
            <json-cell v-for="(schema, key) in ($schema.$childSchema || [])" 
                :key="key"
                :$form="$form"
                :$schema="schema"
                :$schemaProps="schema.$props"
                :$_config="$_config"
                :$_caller="$_caller"
                :$_context="$_context"
            >   
        </json-cell>
    </JForm>
</template>

<script>
import _ from 'lodash'
import { Form } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'Form',
    mixins: [elementMixin],
    components: { JForm: Form },
    props: ['className', 'size', 'inline', 'labelPosition', 'labelWidth']
}
</script>