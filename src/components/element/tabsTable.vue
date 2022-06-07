<template>
    <JTabs
        :value="activeTab" 
        :type="tabType" 
        :closable="closable" 
        :addable="addable" 
        :editable="editable" 
        :tab-position="tabPosition" 
        :stretch="stretch" 
        :before-leave="beforeLeave" 
        @edit="handleTabsEdit"
        v-bind="bindAttrs" 
        v-on="bindOn">
        <JTabPane
            v-for="(count, index) in counter"
            :key="index"
            :label="labelRender(tabLabel, index + 1, headerWidthValue ? {item: value[index]} : {})"
            :name="activePrefix + (index+1)"
        >
            <template slot="label"><slot :name="slotPrefix + (index + 1)"></slot></template>
            <json-cell 
                v-for="(childSchema, key) in $schema.$childSchema"
                :key="key"
                :$form="$form" 
                :$schema="rowSchema(childSchema, index)" 
                :$schemaProps="childSchema.$props" 
                :$_config="$_config"
                :$_caller="$_caller"
                :$_context="$_context"
            ></json-cell>

        </JTabPane>
    </JTabs>
</template>

<script>
import _ from 'lodash'
import { Tabs, TabPane } from '../components'
import elementMixin from '../elementMixin'
import elementArrayMixin from '../elementArrayMixin'

export default{
    name: 'TabsTable',
    mixins: [elementMixin, elementArrayMixin],
    components: { JTabs: Tabs , JTabPane: TabPane},
    props: ['active', 'type', 'closable', 'addable', 'editable', 'tab-position', 'stretch', 'before-leave', 'tab-label', 'max-message', 'min-message', 'header-width-value'],
    data(){
        return {
            activeIndex: this.active ? this.active : 1,
            activePrefix: 'active_'
        }
    },
    computed: {
        tabType() {
            if(this.type === 'array'){
                return 'card'
            }else{
                return this.type
            }
        },
        activeTab: {
            get(){
                return this.activePrefix + this.activeIndex
            },
            set(value){
                this.activeIndex = this.getActiveIndex(value)
            }
        },
        activePrefixLength(){
            return this.activePrefix.length
        },
    },
    methods: {
        getActiveIndex(active){
            return active.substring(this.activePrefixLength)
        },
        handleTabsEdit(targetName, action){
            if(action == 'remove'){
                this.remove(this.getActiveIndex(targetName) - 1)
            }else{
                this.add(targetName)
            }
        },
        add(){
            let that = this.$children[0] || this
            if(this.max !== undefined && this.counter >= this.max){
                that.$emit('tab-add-over')
                if(this.maxMessage){
                    this.$notify.info(this.maxMessage)
                }
                return
            }
            this.counter++
            let value = _.defaultsDeep({}, this.defaultValue)
            this.value.push(value)
            this.activeIndex = this.counter
            that.$emit('tab-add-success', value, this.counter)
        },
        remove(index){
            let that = this.$children[0] || this
            if(this.min !== undefined && this.counter <= this.min){
                that.$emit('tab-remove-over')
                if(this.minMessage){
                    this.$notify.info(this.minMessage)
                }
                return
            }
            this.counter--
            let value = this.value.splice(index, 1)
            that.$emit('tab-remove-success', value[0], this.counter)
            if(this.activeIndex >= index){
                this.activeIndex = this.activeIndex == 0 ? 0 : this.activeIndex - 1
            }
        }
    }
}
</script>