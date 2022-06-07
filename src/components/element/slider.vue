<template>
    <JSlider 
        v-model="value" 
        :min="min" 
        :max="max" 
        :step="step" 
        :show-input="showInput" 
        :show-input-controls="showInputControls" 
        :input-size="inputSize" 
        :show-stops="showStops" 
        :show-tooltip="showTooltip" 
        :format-tooltip="formatTooltip" 
        :range="range" 
        :vertical="vertical" 
        :height="height" 
        :label="label" 
        :debounce="debounce" 
        :tooltip-class="tooltipClass" 
        :marks="marks" 
        v-bind="bindAttrs" 
        v-on="bindOn">
    </JSlider>
</template>

<script>
import { Slider } from '../components'
import elementMixin from '../elementMixin'

export default{
    name: 'Slider',
    mixins: [elementMixin],
    components: { JSlider: Slider},
    props: ['min', 'max', 'step', 'show-input', 'show-input-controls', 'input-size', 'show-stops', 'show-tooltip', 'format-tooltip', 'range', 'vertical', 'height', 'label', 'debounce', 'tooltip-class', 'marks']
}
</script>