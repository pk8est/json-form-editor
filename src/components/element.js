import _ from 'lodash'


export default class Element{

    constructor(tag, options = {}) {
        this.$tag = tag 
        this.$options = options
    }

    options(options){
        return _.pick(_.defaultsDeep({}, this.$options, options), ['class', 'style', 'attrs', 'domProps', 'props', 'data', 'on', 'nativeOn', 'directives', 'scopedSlots'])
    }
   
}