<template>
    <JCard 
        :header="header" 
        :body-style="bodyStyle" 
        :shadow="shadow" 
        v-bind="bindAttrs" 
        v-on="bindOn">
        <json-cell
            v-for="(childSchema, key) in $schema.$childSchema"
            :key="key"
            :$form="$form" 
            :$schema="childSchema" 
            :$schemaProps="childSchema.$props" 
            :$_config="$_config"
            :$_caller="$_caller"
            :$_context="$_context"
        ></json-cell>
    </JCard>
</template>

<script>
import { Card } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'Card',
    mixins: [elementMixin],
    components: { JCard: Card},
    props: ['header', 'body-style', 'shadow']
}
</script>