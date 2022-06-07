import { JsonSchemaSupplier, JsonPropSupplier} from './Supplier'
import { JsonSchema } from './JsonSchema'
import { JsonProp } from './JsonProp'

export function deepClone(obj) {
  return typeof obj != 'object' ? obj : JSON.parse(JSON.stringify(obj));
}

/* export function getExtendibleLeaf(obj, n, initIt) {
  const v = obj[n];
  if (v && typeof v === 'object' && !Array.isArray(v)) {
    return v;
  }
  if (initIt && v === undefined) {
    return (obj[n] = {});
  }
} */

export function getExtendibleLeaf(obj, n, initIt) {
  const v = obj[n];
  if (v !== undefined) {
    return v;
  }else if (initIt) {
    return (obj[n] = {});
  }
}

export function getChild(data, ns) {
  if (ns.length === 1) {
    return data[ns[0]];
  }
  let obj = data[ns[0]];
  if (obj === undefined) return obj;
  let i = 1;
  const end = ns.length - 1;
  for (; i < end; i++) {
    obj = getExtendibleLeaf(obj, ns[i], false);
    if (obj === undefined) return obj;
  }
  return obj[ns[i]];
}

/* export function getChild(data, ns, defaultValue = undefined) {
  if(ns.length > 0){
    let obj = data[ns.shift()]
    if(obj === undefined){
      return defaultValue
    }else if(ns.length == 0){
      return obj
    }else{
      return getChild(obj, ns, defaultValue)
    }
  }
} */

export function initChild(data, ns) {
  if (ns.length === 1) {
    const ret = getExtendibleLeaf(data, ns[0], true);
    if (ret === undefined) {
      throw new TypeError('fail to init because namespace ' + ns[0] + ' = ' + data[ns[0]]);
    }
    return ret;
  }
  let parent = data;
  let obj = data[ns[0]];
  if (obj === undefined) obj = data[ns[0]] = {};
  for (let i = 1; i < ns.length; i++) {
    const n = ns[i];
    const ret = getExtendibleLeaf(obj, n, true);
    if (ret === undefined) {
      throw new TypeError('fail to init because namespace ' + ns.join('.') + ' = ' + obj + '(' + typeof obj + ')');
    }
    parent = obj;
    obj = ret;
    if (parent[n] === undefined) {
      throw new TypeError('fail to init because namespace ' + ns.slice(0, i).join('.') + ' = ' + parent);
    }
  }
  return obj;
}

export function setVal(data, n, v) {
  const ns = Array.isArray(n) ? n : n.split('.');

  // eslint-disable-next-line
  n = ns.pop();
  const ret = ns.length > 0 ? initChild(data, ns) : data;
  console.info(n, v)
  ret[n] = v;
  return v;
}

export function getValueByPath(object, prop) {
  prop = prop || '';
  var paths = prop.split('.');
  var current = object;
  var result = null;
  for (var i = 0, j = paths.length; i < j; i++) {
    var path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};


export function getValueOrInit(object, prop, defaultValue) {
  prop = prop || '';
  var paths = prop.split('.');
  var current = object;
  var result = defaultValue;
  for (var i = 0, j = paths.length; i < j; i++) {
    var path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

export function getPropByPath(obj, path, strict) {
  var tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  var keyArr = path.split('.');
  var i = 0;
  for (var len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    var key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};

export function notNullValue(...values){
  for (var value of values) {
    if(value != undefined || value != null){
      return value
    }
  }
}

export function replaceAll(str, s1, s2){
  return str.replace(new RegExp(s1,"gm"), s2)
}

export function toHump(name) {
  return name.replace(/\-(\w)/g, function(all, letter){
      return letter.toUpperCase();
  });
}

export function toKebabCase(str) {
  var hyphenateRE = /([^-])([A-Z])/g;
  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase()
}

export function toAllHump(data) {
  if (Array.isArray(data)) {
      return data.map(toAllHump)
  }
  if (typeof data !== 'object' || !data) {
      return data
  }
  return Object.keys(data).reduce((state, key) => {
      state[toHump(key)] = toAllHump(data[key])
      return state
  }, {})
}

export function isJsonSchema(object){
  return object && object instanceof JsonSchema 
}

export function isJsonProp(object){
  return object && object instanceof JsonProp
}

export function isJsonSchemaSupplier(object){
  return object && object instanceof JsonSchemaSupplier
}

export function isJsonPropSupplier(object){
  return object && object instanceof JsonPropSupplier
}

export function isVNode(object){
  return object && object.constructor && object.constructor.name === 'VNode' 
}

export function getContextData(context, caller){
  if(typeof context === 'function'){
    const { $data, $options } = context.call(caller);
    return {
      data: () => $data,
      computed: $options.computed,
      components: $options.components,
      methods: $options.methods,
      filters: $options.filters
    }
  }else{
    return context
  }

}

export function getAllRefs(component){
  let refs = component.$refs
  component.$children.map(children => {
    refs = Object.assign({}, refs, getAllRefs(children))
  })
  return refs
}

export function removeArraySign(prop){
  prop = prop || ''
  if(prop.substr(-2) === '[]'){
    return prop.substr(0, prop.length - 2)
  }
  return prop
}

export function splitSpace(str) {
  //先把双引号中的空格替换为特殊字符，等按空格切割完后替换回来
  var temp = (str || '').replace(/"[^"]*"/g,  match => match.replace(/ /g, '{}'))
  return temp.split(' ')
    .filter(value => value !== '')  //去除空值
    .map(value => value.replace(/{}/g, ' ').replace(/\"/g, ""))
}