import _ from 'lodash'
import _prop from './JsonProp';
import _schema from './JsonSchema';

export function simpleForm(schemas, options) {
    return _schema(simpleSchemas(schemas), _.defaultsDeep({}, options, {format: 'form'}))
}

export function simpleSchemas(schemas) {
    return schemas.map(schema => _schema(null, schema))
}

export function prop(options) {
    if(options.label && !options.hasOwnProperty('with-label') && !options.hasOwnProperty('withLabel')){
        options.withLabel = true
    }
    return _prop(options)
}

export function schema(...args) {
    return _schema(...args)
}

export function input(label, type = 'text', options = {}) {
    if(typeof type === 'object'){
        options = type
        type = 'text'
    }
    return prop(_.defaultsDeep({}, options, {label, ':type': type, format:'input'}))
}

export function select(label, option = [], options = {}) {
    return prop(_.defaultsDeep({}, options, {label, ':options': option, format:'select'}))
}


export function radio(label, option = undefined, options = {}) {
    let format = 'radio-group'
    if(option instanceof Array === false){
        options = option
        option = []
        format = 'radio'
    }else{
    }
    return prop(_.defaultsDeep({}, options, {label, ':options': option, format}))
}

export function checkbox(label, option = undefined, options = {}) {
    let type = 'array'
    let format = 'checkbox-group'
    if(option instanceof Array === false){
        options = option
        option = []
        format = 'checkbox'
        type = 'string'
    }else{
    }
    return prop(_.defaultsDeep({}, options, {label, ':options': option, format, type}))
}


export default {
    prop,
    schema,
    input,
    select,
    radio,
    checkbox,
}

