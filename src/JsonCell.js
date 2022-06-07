import _ from 'lodash'
import components from './components'
import elementMixin from './components/elementMixin'
import { isJsonProp, replaceAll, getContextData } from './utils'

export default{
  name: 'JsonCell',
  props: {
    $index: {
      type: Number
    },
    $schema: {
      type: Object,
      default: () => {}
    },
    $schemaProps: {
      type: Object,
      default: () => {}
    },
    $form: {
      type: Object,
      default: () => {}
    },
    $_config: {
      type: Object,
      default: () => {}
    },
    $_context: {
      default: () => {}
    },
    $_caller: {
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: false
    },
    withLayout: {
      type: Boolean,
      default: true
    },
    isClosedLableComponent: false
  },
  components: { },
  computed: {
    context(){
      if(this.hasContext){
        let context = _.pick(_.defaultsDeep({}, getContextData(this.$_context, this), getContextData(this.$schemaProps.$context, this)), ['components', 'props', 'data', 'methods', 'filters', 'computed', 'watch'])
        if(context.hasOwnProperty('data') && typeof context.data !== 'function'){
          const values =  context.data
          context.data = () => values
        }
        return context
      }
    },
    hasContext(){
      return this.$_context !== undefined || this.$schemaProps.$context !== undefined
    },
    isShow(){
      return this.$schemaProps.isShow({$schema: this.$schema, $schemaProps: this.$schemaProps, $form: this.$form, $_context: this.context})
    }
  },
  methods: {
    renderFormItem(children, $props, componentConfig){
      let schemaProps = {}
      //let props = this.props
      let options = $props.$schemaProps.$options
      let labelSlots = []
      let withLabel =  $props.$schemaProps.getAttr('with-label') 


      if(withLabel === undefined){
        withLabel = $props.$_config && $props.$_config.withLabel
      }
      if(withLabel === undefined){
        withLabel = !this.isClosedLableComponent
      }

      if(isJsonProp($props.$schemaProps.$label)){
        schemaProps = $props.$schemaProps.$label
        options = Object.assign({}, options, $props.$schemaProps.$label.$options)
        if(withLabel){
          labelSlots = this.createNode($props.$schema, $props.$schemaProps.$label, false)
        }
      }else{
        schemaProps.$label = $props.$schemaProps.$label
      }
      if(withLabel === false && componentConfig && componentConfig.withFormItem === false){
        return this.$createElement('div', children)
      } 

      return [this.createNodeByComponent(components.formItem.component, {
        props: {
          withLabel,
          isShow: this.isShow,
          prop: $props.$schema.$prop,
          formItemConfig: components.formItem.config,
          $form: $props.$form,
          $schema: $props.$schema,
          $schemaProps: schemaProps, 
          //$_config: $props.$_config,
          $_config: _.defaultsDeep({}, $props.$_config, componentConfig),
          $_context: $props.$_context,
          $_options: options,
        },
        attrs: Object.assign({}, components.formItem.options, $props.$schemaProps.getOption('label-attrs', {})),
        on: $props.$schemaProps.getOption('label-on', {}),
        scopedSlots: {
          label: (props) => labelSlots,
          default: typeof children === 'function' ? children : () => children
        } 
      }, true)]
    },
    createNodeByComponent(component, bind, withContext = true, nodes = []){
      if(withContext === true && this.hasContext){
        return this.$createElement(_.defaultsDeep({}, {extends: component}, this.context), bind, nodes)
      }else{
        return this.$createElement(component, bind, nodes)
      }
    },
    buildProps($props){
      return  {
        $index: $props.$index, 
        $key: $props.$schema.$key, 
        $prop: $props.$schema.$prop, 
        $form: $props.$form, 
        $schema: $props.$schema,
        $schemaProps: $props.$schemaProps,
        //attrs: $props.props.$attrs,
        $_caller: this.$_caller,
        $_context: this.$_context
      }
    },
    createNodeByRender(component, $props, attrs){
      return this.createNodeByComponent(component, { props: this.buildProps($props), attrs }, false)
    },
   
    createTemplateComponent(template, context, caller, binds = {}){
      if(context === undefined){
        const { $data, $options, $refs } = caller;
        context = {
          data: () => Object.assign({}, $data),
          mixins: [elementMixin],
          computed: $options.computed,
          components: $options.components,
          methods: $options.methods,
          filters: $options.filters
        }
      }
      //return _.defaultsDeep({}, {template, extends: context === undefined ? caller : context}, binds)
      return _.defaultsDeep({template}, binds, context)
    },
    
    createNode($schema, $schemaProps, withLabel = true){
      let node = []
      let render = $schemaProps.$render
      let format = $schemaProps.$format
      let type = $schemaProps.$type
      let attrs = $schemaProps.$attrs
      let childSchema = $schema.$childSchema
      const props = {
        $index: this.$index, 
        $form: this.$form, 
        $schema: $schema, 
        $schemaProps: $schemaProps, 
        //attrs: attrs, 
        $_config: _.defaultsDeep({}, this.$schemaProps.$config, this.$_config), 
        $_caller: this.$_caller, 
        $_context: this.context != undefined ? _.pick(this.context, 'data') : undefined
      }

      let componentConfig = {};
      if(render.vNode){
        if(typeof render.vNode === 'function'){
          node = () => render.vNode(this.buildProps(props))
        }else{
          node = render.vNode
        }
        //node.push(render.vNode(this.buildProps(props)))
        return node  //return 后label layout无效
      }else if(render.component){
        node.push(this.createNodeByRender(render.component, props))
      }else if(render.template){
        node.push(this.createNodeByRender(this.createTemplateComponent(render.template, this.context, this.$_caller || this.$vnode.context, {
          props: ['$schema', '$form', '$index', '$key', '$schemaProps'/* , 'attrs' */, '$_context'],
        }), props, Object.assign({}, $schemaProps.$attrs, this.$attrs))) 
      }else if(format && components[format]){
        componentConfig = components[format].config
        node.push(this.createNodeByComponent(components[format].component, {
          props: Object.assign({}, props), 
          attrs: Object.assign({}, components[format].options, $schemaProps.$attrs, this.$attrs)
        }))
      }else if(type === 'object' && childSchema){
        node = childSchema
        //.filter(schema => schema.$props.isCreate({$schema: schema, $props: schema.$props, $form: this.form, $context: this.context}))
        .map(schema => {
          return this.createNodeByComponent(this.$options.components.JsonCell, {
            attrs, 
            props: Object.assign({}, props, {
              $schema: schema,
              $schemaProps: schema.$props,
              $_config: this.$_config
            })
          })  
        }) 
      }else{
        node.push(this.$createElement(components.input.component, {props: Object.assign({}, props, components.input.options), attrs}))
      }
      if(this.withLayout && withLabel === true){
        return [this.renderFormItem(node, props, componentConfig)]
      }else{
        return node
      } 
    }
  },
  render(h){
    if(!this.$schemaProps.isApply({$schema: this.$schema, $schemaProps: this.$schemaProps, $form: this.$form, $_context: this.context})){
      this.$schema.initDefaultValue(this.$form, {}, (form, key) => {
        this.$delete(form, key)
      })
      return 
    } 

    const componentConfig = components[this.$schemaProps.$format] ? components[this.$schemaProps.$format].config : {}
    const $config = _.defaultsDeep({}, this.$schemaProps.$config, componentConfig, this.$_config)

    let nodes = this.createNode(this.$schema, this.$schemaProps, !this.isRoot)
    if(typeof nodes === 'function'){
      nodes = [nodes()]
    }

    const layout = this.$schemaProps.$render.layout || $config.layout

    if(nodes.length === 1 && !layout){
      return nodes[0]
    }else if(this.withLayout && layout){
      const context = this.$_caller || this.$vnode.context
      const template = replaceAll(layout, '#{CONTENT}', '<slot/>')
      return this.createNodeByComponent(this.createTemplateComponent(template, this.context, context, {}), {_context: this.context}, false, nodes)
    }else{
      return h('div', {}, nodes)
    }
  }
}
