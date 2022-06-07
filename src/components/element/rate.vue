<template>
    <JRate 
        v-model="value" 
        :max="max" 
        :allow-half="allowHalf" 
        :low-threshold="lowThreshold" 
        :high-threshold="highThreshold" 
        :colors="colors" 
        :void-color="voidColor" 
        :disabled-void-color="disabledVoidColor" 
        :icon-classes="iconClasses" 
        :void-icon-class="voidIconClass" 
        :disabled-void-icon-class="disabledVoidIconClass" 
        :show-text="showText" 
        :show-score="showScore" 
        :text-color="textColor" 
        :texts="texts" 
        :score-template="scoreTemplate" 
        v-bind="bindAttrs" 
        v-on="bindOn">
    </JRate>
</template>

<script>
import { Rate } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'Rate',
    mixins: [elementMixin],
    components: { JRate: Rate},
    props: ['max', 'allow-half', 'low-threshold', 'high-threshold', 'colors', 'void-color', 'disabled-void-color', 'icon-classes', 'void-icon-class', 'disabled-void-icon-class', 'show-text', 'show-score', 'text-color', 'texts', 'score-template']
}
</script>