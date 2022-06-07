<template>
  <el-row>
    <el-col :span="2">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>

      <el-tree
        class="filter-tree"
        :data="templateData"
        :props="{children: 'children',label: 'label'}"
        default-expand-all
        :filter-node-method="filterNode"
        @node-click="onNodeClick"
        ref="tree">
      </el-tree>

    </el-col>
    <el-col :span="11">
      <el-tabs type="border-card" class="editor">
        <el-tab-pane label="Schema视图">
          <el-button type="success" @click="runCode" style="width:100%;border-radius:0">运行代码</el-button>
          <codemirror 
            v-model="code" 
            class="code-mirror" 
            :options="Object.assign({}, cmOptions, codeOptions)" 
          ></codemirror>
        </el-tab-pane>
        <el-tab-pane label="Form视图">
          <vue-json-editor v-model="formData" mode="code"></vue-json-editor> 
        </el-tab-pane>
      </el-tabs>
        
    </el-col>
    <el-col :span="11">
      <el-card class="box-card" style="height: 889px; overflow-y:auto">
        <div slot="header" class="clearfix">
        </div>
        <json-editor ref="jsonEditor" :schema="schemaData" v-model="formData" :config="config" label-width="180px" class="form">
        </json-editor>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/monokai.css'

import vueJsonEditor from 'vue-json-editor'

import JsonEditor from '../../src/JsonEditor';
import schemaTypes from '../../src/JsonSchemaType';
import config from '../../src/config';

const varTemplate = Object.keys(schemaTypes).map(key => `let ${key} = schemaTypes.${key}`).join("\n")

export default {
  components: { codemirror, vueJsonEditor, JsonEditor },
  props: {
    context: undefined,
    form: {
      type: Object,
      default: () => ({})
    },
    schema: {
      type: String,
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data(){
    return {
      code: this.schema,
      formData: this.form,
      schemaData: {},
      filterText: '',
      templateData: [{
        label: '基础用法',
        children: [{
          label: 'input',
          code: this.getSchemaText(require('../schema/base').input)
        },{
          label: 'select',
          code: this.getSchemaText(require('../schema/base').select)
        },{
          label: 'radio',
          code: this.getSchemaText(require('../schema/base').radio)
        },{
          label: 'checkbox',
          code: this.getSchemaText(require('../schema/base').checkbox)
        }]
      },{
        label: '高级用法',
        children: [{
          label: 'yaml',
          code: this.getSchemaText(require('../schema/base').yaml)
        }]
      }],
      cmOptions: {
        line: true,
        //tabSize: 4,
        lineNumbers: true,     // 显示行号
        //indentUnit: 4,         // 缩进单位为4
        styleActiveLine: true, // 当前行背景高亮
        matchBrackets: true,   // 括号匹配
        mode: 'javascript',     // HMTL混合模式
        lineWrapping: true,    // 自动换行
        theme: 'monokai',      // 编辑器主题
        extraKeys: {'Ctrl': 'autocomplete'},   //自动提示配置
        styleSelectedText: true,
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        lineWrapping: true,
        matchBrackets: true,
        foldGutter: true,
        matchBrackets: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        showCursorWhenSelecting: true, //在选择时是否显示光标，默认为false
        lineWiseCopyCut: true,         //启用时，如果在复制或剪切时没有选择文本，那么就会自动操作光标所在的整行
        undoDepth: 1000,               //最大撤消次数，默认为200（包括选中内容改变事件）
        //historyEventDelay: 500       //在输入或删除时引发历史事件前的毫秒数。
        hintOptions:{
          completeSingle: false
        }
      },
      codeOptions: {
        mode: {name: 'javascript'}   
      },
    }
  },
  computed: {

  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created(){

  },
  mounted(){
    this.onNodeClick(this.templateData[0].children[0])
    this.runCode()
    
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    onNodeClick(data){
      this.code = data.code
    },
    runCode(){
      console.info(schemaTypes)
      try{
        let code = varTemplate + "\n" +  this.code
        console.debug(this.code)
        const fun = new Function('schemaTypes', code)
        this.formData = {}
        this.schemaData = fun(schemaTypes)
        this.$notify.success('生成成功')
      }catch(error){
        this.$notify.error(error.toString(), 10)
        console.error(error)
      }
    },
    getSchemaText(module){
      let content = module.toString()
      return content.substring(content.indexOf('{')+1, content.lastIndexOf('}'))
    }
  }
};
</script>

<style>
.editor>.el-tabs__content {
    padding: 0;
}
.CodeMirror {
 /* Set height, width, borders, and global font properties here */
    height: 808px;
    font-size: 14px;
    font-family: sans-serif;
}
.code-mirror, .code-mirror {
  border-right: 1px solid #fff;
}
.jsoneditor-vue{
  text-align: left;
  height: 820px;
}
</style>
