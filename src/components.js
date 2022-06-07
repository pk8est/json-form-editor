import _ from 'lodash'
import Form from './components/element/form'
import FormItem from './components/element/formItem'
import Select from './components/element/select'
import SelectGroup from './components/element/selectGroup'
import Radio from './components/element/radio'
import RadioGroup from './components/element/radioGroup'
import RadioButton from './components/element/radioButton'
import Input from './components/element/input'
import InputNumber from './components/element/inputNumber'
import Checkbox from './components/element/checkbox'
import CheckboxGroup from './components/element/checkboxGroup'
import CheckboxButton from './components/element/checkboxButton'
import Cascader from './components/element/cascader'
import ColorPicker from './components/element/colorPicker'
import DatePicker from './components/element/datePicker'
import TimePicker from './components/element/timePicker'
import Rate from './components/element/rate'
import Transfer from './components/element/transfer'
import Slider from './components/element/slider'
import Switch from './components/element/switch'
import Table from './components/element/table'
import Tabs from './components/element/tabs'
import TabsTable from './components/element/tabsTable'
import TabPane from './components/element/tabPane'
import Tag from './components/element/tag'
import Tags from './components/element/tags'
import Card from './components/element/card'
import CardTable from './components/element/cardTable'


//公共属性: placeholder,disabled,size,name
let components = {
   form: {
      component: Form, 
      options: { 
         className: 'json-form', 
         size: 'mini', 
         inline: false,  
         labelWidth: '150px', 
         labelPosition: 'right'
      }
   },

   formItem: {
      component: FormItem, 
      //'label', 'prop', 'with-label', 'is-show', 'size' ...
      options: {},
      config: {
         layout: '',
         'layout.label': '#{LABEL}',
         'layout.content': '#{CONTENT}',
         'layout.formItem': `<JFormItem v-show="isShow" :label="$label" v-bind="bindAttrs" v-on="bindOn" :prop="$prop" :rules="$rules">
            <template slot="label">#{LABEL}</template>
            <template>#{CONTENT}</template>
            </JFormItem>`
      }
   },

   input: {
      component: Input, 
      //'type', 'maxlength', 'minlength', 'show-word-limit', 'clearable', 'show-password', 'prefix-icon', 'suffix-icon', 'rows', 'autosize', 'autocomplete', 'readonly', 'resize', 'max', 'min', 'step', 'autofocus', 'tabindex', 'validate-event'
      options: {
         style: 'max-width:380px;'
      },
      config: {}
   },

   inputNumber: {
      component: InputNumber, 
      //'max', 'min', 'step', 'step-strictly', 'precision', 'controls', 'controls-position'
      options: {},
      config: {}
   },

   select: {
      component: Select, 
      //'options', 'multiple', 'value-key', 'clearable', 'collapse-tags', 'multiple-limit', 'autocomplete', 'filterable', 'allow-create', 'filter-method', 'remote', 'remote-method', 'multiple', 'loading', 'loading-text', 'no-match-text', 'no-data-text', 'popper-class', 'reserve-keyword', 'default-first-option', 'popper-append-to-body', 'automatic-dropdown'
      options: {},
      config: {}
   },

   selectGroup: {
      component: SelectGroup, 
      //'options', 'multiple', 'value-key', 'clearable', 'collapse-tags', 'multiple-limit', 'autocomplete', 'filterable', 'allow-create', 'filter-method', 'remote', 'remote-method', 'multiple', 'loading', 'loading-text', 'no-match-text', 'no-data-text', 'popper-class', 'reserve-keyword', 'default-first-option', 'popper-append-to-body', 'automatic-dropdown'
      options: {},
      config: {}
   },

   radio: {
      component: Radio, 
      //'border', 'name', ':label'
      options: {},
      config: {}
   },

   radioButton: {
      component: RadioButton, 
      //'text-color', 'fill', 'options'
      options: {},
      config: {}
   },

   radioGroup: {
      component: RadioGroup, 
      //'text-color', 'fill', 'options'
      options: {},
      config: {}
   },
   
   cascader: {
      component: Cascader,
      //'className', 'options', 'cascader-props', 'clearable', 'show-all-levels', 'collapse-tags', 'separator', 'filterable', 'filter-method', 'debounce', 'before-filter', 'popper-class' ...
      options: {},
      config: {}
   },

   checkbox: {
      component: Checkbox, 
      //'true-label', 'false-label', 'border', 'name', 'checked', 'indeterminate', 'label'
      options: {},
      config: {}
   },

   checkboxButton: {
      component: CheckboxButton, 
      //'min', 'max', 'text-color', 'fill', 'options', 'border', 'indeterminate'
      options: {},
      config: {}
   },

   checkboxGroup: {
      component: CheckboxGroup, 
      //'min', 'max', 'text-color', 'fill', 'options', 'border', 'indeterminate'
      options: {},
      config: {}
   },

   colorPicker: {
      component: ColorPicker,
      //'show-alpha', 'color-format', 'popper-class', 'predefine' 
      options: {},
      config: {}
   },

   datePicker: {
      component: DatePicker, 
      //'type', 'format', 'readonly', 'editable', 'clearable', 'start-placeholder', 'end-placeholder', 'align', 'popper-class', 'picker-options', 'range-separator','default-value','default-time', 'value-format', 'unlink-panels', 'prefix-icon', 'clear-icon', 'validate-event'
      options: {},
      config: {}
   },

   
   timePicker: {
      component: TimePicker, 
      //'readonly', 'editable', 'clearable', 'start-placeholder', 'end-placeholder', 'align', 'is-range', 'arrow-control', 'popper-class', 'picker-options', 'range-separator','default-value','default-time', 'value-format', 'prefix-icon', 'clear-icon'
      options: {},
      config: {}
   },
   
   rate: {
      component: Rate, 
      //'max', 'allow-half', 'low-threshold', 'high-threshold', 'colors', 'void-color', 'disabled-void-color', 'icon-classes', 'void-icon-class', 'disabled-void-icon-class', 'show-text', 'show-score', 'text-color', 'texts', 'score-template'
      options: {},
      config: {}
   },

   slider: {
      component: Slider, 
      //'min', 'max', 'step', 'show-input', 'show-input-controls', 'input-size', 'show-stops', 'show-tooltip', 'format-tooltip', 'range', 'vertical', 'height', 'label', 'debounce', 'tooltip-class', 'marks'
      options: {vertical: false, disabled: true},
      config: {}
   },

   switch: {
      component: Switch, 
      //'width', 'active-icon-class', 'inactive-icon-class', 'active-text', 'inactive-text', 'active-value', 'inactive-value', 'active-color', 'inactive-color', 'validate-event'
      options: {},
      config: {}
   },

   transfer: {
      component: Transfer, 
      //'data', 'filterable', 'filter-placeholder', 'filter-method', 'target-order', 'titles', 'button-texts', 'render-content', 'format', 'transfer-props', 'left-default-checked', 'right-default-checked'
      options: {filterable: true},
      config: {}
   },

   table: {
      component: Table, 
      //'height','max-height','stripe','border','size','fit','show-header','highlight-current-row','current-row-key','row-class-name','row-style','cell-class-name','cell-style','header-row-class-name','header-row-style','header-cell-class-name','header-cell-style','row-key','empty-text','default-expand-all','expand-row-keys','default-sort','tooltip-effect','show-summary','sum-text','summary-method','span-method','select-on-indeterminate','indent','lazy','load','tree-props', 'handle-header, 'handle-content', 'handle-header', 'handle-header-attrs'
      options: {
         border: true,
         stripe: true,
         size: 'mini',
         'min-message': '已经达到最小数量',
         'max-message': '已经达到最大数量',
         handleHeaderAttrs: {
            width: '65px',
            'text-align': 'right',
            'float': 'right'
         },
         handleHeader: '',
         /* handleContent: {
            template: '<el-button size="mini" type="danger" @click="remove($attrs.scope.$index, $attrs.scope.row)"><i class="el-icon-delete"></i></el-button>'
         },  
         appendContent: {
            template: '<el-button size="mini" type="success" @click="add"><i class="el-icon-circle-plus"></i></el-button>'
         },  */
         'header-cell-style': {background:'#f5f7fa'}
      },
      config: {
         withLabel: true,
         withFormItem: false,
         withItemLabel: false,
      }
   },

   tabs: {
      component: Tabs, 
      //'active', 'type', 'closable', 'addable', 'editable', 'tab-position', 'stretch', 'before-leave'
      options: {type: "border-card"},
      config: {
         withLabel: true,
         withFormItem: false
         //'layout.formItem': '<div>#{CONTENT}</div>'
      }
   },

   tabsTable: {
      component: TabsTable, 
      //events: @tab-add, @tab-add-success, @tab-add-over, @tab-remove, @tab-remove-success, @tab-remove-over
      //'active', 'type', 'closable', 'addable', 'editable', 'tab-position', 'stretch', 'before-leave', 'tab-label'
      options: {
         type: 'border-card',
         editable: true,
         active: 1, 
         'header-width-value': true,
         'min-message': '已经达到最小数量',
         'max-message': '已经达到最大数量',
         tabLabel: {name: '选项', template: '<span>{{$attrs.name}}-{{$attrs.rowIndex}}</span>'}
      },
      config: {
         withLabel: false,
         withFormItem: false
      }
   },
   
   tabPane: {
      component: TabPane, 
      options: {},
      config: {
         withLabel: false,
         withFormItem: false
      }
   },

   tag: {
      component: Tag, 
      options: {},
      config: {
         withFormItem: false
      }
   },
   
   tags: {
      component: Tags, 
      options: {},
      config: {
         withFormItem: false
      }
   },
   
   card: {
      component: Card, 
      options: {},
      config: {
         withFormItem: false
      }
   },

   cardTable: {
      component: CardTable, 
      options: {
         editable: true,
         header: {template: '<span>卡片-{{ + $attrs.rowIndex}}</span>'},
         'min-message': '已经达到最小数量',
         'max-message': '已经达到最大数量',
      },
      config: {
         withFormItem: false
      }
   }
}

export default components


export function replaceComponent(name, component){
   components[name].component = component
}

export function registerComponent(name, component, options, config){
   components[name] = {component, options, config}
}

export function setComponentOptions(name, options){
   if(components[name]){
      components[name].options = _.defaultsDeep({}, options, components[name].options)
   }
}

export function setComponentConfig(name, config){
   if(components[name]){
      components[name].config = _.defaultsDeep({}, config, components[name].config)
   }
}