<template>
  <div>
    <div v-for="(item, index) in examples" :key="index">
      <el-card>
        <el-row>
          <div style="float:right;margin-bottom:5px;">
            <el-checkbox v-model="item.showItems.schema" label="Schema配置" size="mini" border style="margin-right:0"></el-checkbox>
            <el-checkbox v-model="item.showItems.form" label="表单渲染" size="mini" border style="margin-right:0"></el-checkbox>
            <el-checkbox v-model="item.showItems.model" label="表单数据" size="mini" border ></el-checkbox>
          </div>
        </el-row>

        <el-row v-for="(item, index) in examples" :key="index">
          <el-col v-if="item.showItems.schema" :span="computeCol(item.showItems)">
            <el-tabs value="schema" type="card">
              <el-tab-pane label="Schema配置" name="schema">
                <vue-json-editor v-model="item.schema" mode="code"></vue-json-editor>
              </el-tab-pane>
            </el-tabs>
          </el-col>

          <el-col v-if="item.showItems.form" :span="computeCol(item.showItems)">
            <el-tabs value="form" type="card">
              <el-tab-pane label="表单渲染" name="form" style="padding-right: 50px">
                <json-editor ref="form" :schema="item.schema" v-model="form" :config="item.config" label-width="180px" class="form">
                  <template slot="input-slot" slot-scope="{ $form }">
                    <el-form-item label="活动区域" >
                      <el-input v-model="$form.address1"></el-input>
                    </el-form-item>
                  </template>
                  <template slot="input-label"><el-button type="success">提交</el-button></template>
                </json-editor>
              </el-tab-pane>
              <el-button @click="submit" type="success">提交</el-button>
            </el-tabs>
          </el-col>
        
          <el-col v-if="item.showItems.model" :span="computeCol(item.showItems)">
            <el-tabs value="model" type="card">
              <el-tab-pane label="表单数据" name="model">
                <vue-json-editor v-model="form" mode="code"></vue-json-editor>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>

      </el-card>
    </div>
  </div>
</template>

<script>
import JsonEditor from '../../src/JsonEditor.vue';
import prop from '../../src/JsonProp';
import schema from '../../src/JsonSchema';
import { input } from '../../src/JsonSchemaType';
import config from '../../src/config';
import { registerComponent, setComponentOptions } from '../../src/components';
import vueJsonEditor from 'vue-json-editor'


config.propsKey = '---'
registerComponent('customComponent', {template: '<h1>Custom Component</h1>'})

export default {
  data: () => ({
    status: {flag: true},
    dialogVisible: false,
    form: {
      input: 'default name',
      tabsTable1: [{addressInfo: {home: 'sxxsx', phone: '', info: [{in_1: '', in_2: ''}]}},{addressInfo: {home: 'name2', phone: '', info: [{in_1: '', in_2: ''}]}}]
    }
    
  }),
  computed: {
    examples() {
      return [
      {
        showItems:{
          schema: false,
          model: true,
          form: true
        },
        config: {
          notSetDefaultValue: undefined,
          'layout.label': '<el-button v-if="typeof $label === \'string\' && $label!=\'\'" style="width: 90%">{{$label}}</el-button><slot v-else name="label"></slot>',
        },
         schema: schema({

          table2: schema({
            selection: prop({
              '#column-attrs': {
                type: 'selection'
              }
            }),
            name: '',
            phone: '137********',
            address: prop({ required: true, default: '', label: prop({template: '<el-button>地址</el-button>'})})
          }, {
            label: '基本信息',
            withLabel: true,
            format: 'table', 
            type: 'array',
            editable: true,
            min: 1,
            max: 3,
            ref: 'table2',
            //handleHeader: prop({template: '<el-button>操作</el-button>'}),
            //  handleContent: {
            //     //context: () => {return this},
            //     // context: () => {
            //     //   console.info(this.$refs.form[0].getRef('table2'))
            //     //   return this.$refs.form[0].getRef('table2').$parent
            //     // },
            //     // context: function() {
            //     //   return this.$parent.$parent.$parent
            //     // }, 
            //     // context: {
            //     //   methods: {
            //     //     remove(index, row){
            //     //       console.info('remove index: ', index, ', row: ', row)
            //     //     }
            //     //   }
            //     // },  
            //     template: '<el-button size="mini" type="danger" @click="remove($attrs.scope.$index, $attrs.scope.row)">删除</el-button>'
            // },   
            default: {name: 'xxxxxx', phone: '', address: ''},
            "@add-success": (data, index) => {
                console.info("table-add", data, index)
            },
            "@remove-success": (data, index) => {
                console.info("table-remove", data, index)
            },
            '@add-over': () => {
              this.$message('已经达到最大数量!')
            },
            '@remove-over': () => {
              this.$message('已经达到最小数量')
            }
          }),    

          tabsTable1: schema({
            addressInfo: schema({
              home: '地址',
              phone: prop({default: '', required: true}), 
              info: schema({
                in_1 : '',
                in_2 : prop({default: '', required: true}), 
              }, {
                type: 'array', 
                format: "tabsTable", 
              }, {withLabel: false}),  
             }, {withLabel: false})
          }, {
            type: 'array', 
            format: "tabsTable",
            withLabel: false,
            editable: true,
            active: 2,
            min: 1,
            max: 3,
            tabLabel: {template: '<span>{{$attrs.item.addressInfo.home || ("选项-" + $attrs.rowIndex)}}</span>'},
            default: {addressInfo: {home: 'name1', phone: '', info: [{in_1: '', in_2: ''}]}}, 
            "@tab-add-success": (data, index) => {
                console.info("tab-add", data, index)
            },
            "@tab-remove-success": (data, index) => {
                console.info("tab-remove", data, index)
            },
            '@tab-add-over': () => {
              this.$message('已经达到最大数量!')
            },
            '@tab-remove-over': () => {
              this.$message('已经达到最小数量')
            },
          }),   

          tabsTable2: schema({
            //name: '',
            //phone: '137********',
            address: prop({label: '地址', required: true, default: 'xxxxxxxxxxx'})
          }, {
            format: "tabsTable", 
            type: 'array', 
            editable: true,
            label: prop({content: '基本信息', format: 'tag', tag: 'el-button'}),
            //tabLabel: prop({content: '基本信息', format: 'tag', tag: 'el-button'}),
            //default: [{name: 'name1', phone: 'phone1', address: 'address1'}], 
            ':type': "border-card",
            "@tab-add": (e) => {
                console.info("tab-add", e)
            },
            "on": {
              "tab-remove": (e) => {
                console.info("tab-remove", e)
              }
            },
          }),  
          
          //base form
          
          input: input('名字', {default: 'name', required: true, showLabel: true, placeholder: '请输入名字!', '#label-attrs': {style: ''}, '#label-on': {click: ()=> console.info(1)}}),
          textarea: input('简介', 'textarea'),
          radio: prop({format: 'radio', default: false}),
          radioGroup: prop({format: 'radio-group', options:[{"value": "radio1", "label": "radio1"},{"value": "radio2","label": "radio2"}]}),
          checkbox: prop({format: 'checkbox'}),
          checkboxGroup: prop({format: 'checkboxGroup', options:[{"value": "radio1", "label": "radio1"},{"value": "radio2","label": "radio2"}]}),
          checkboxButton: prop({format: 'checkboxButton', options:[{"value": "radio1", "label": "radio1"},{"value": "radio2","label": "radio2"}]}),
          inputNumber: prop({format: 'inputNumber', default:0, min:-1, max:100, step: 10}),
          select: prop({format: 'select', options:[{"value": "select1", "label": "select1"},{"value": "select2","label": "select2"}], "attrs": {
            "multiple": true,
            "filterable": true,
            "allow-create": true,
            "default-first-option": true,
            "placeholder": "Select your list subscription",
            "title": "Please select your list subscription"
          }, "@change": ()=> console.info('cha')}),
          cascader: prop({
            "type": "array",
            "format": "cascader",
            "attrs": {
              //"expandTrigger": "hover"
            },
            "options": [{
              value: 'zhinan',
              label: '指南',
              children: [{
                value: 'shejiyuanze',
                label: '设计原则',
                children: [{
                  value: 'yizhi',
                  label: '一致'
                }]
              }, {
                value: 'daohang',
                label: '导航',
                children: [{
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                }, {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }]
              }]
            }]
          }),
          switch: prop({format: 'switch', default: true}),
          slider: prop({format: 'slider', default: 50, max:100, min:0, disabled: false}),
          timePicker: prop({format: 'timePicker'}),
          datePicker: prop({format: 'datePicker', ':type': 'datetime', ':format': 'yyyy-MM-dd hh'}),
          rate: prop({format: 'rate'}),
          colorPicker : prop({format: 'colorPicker', default: '#BF1B1B'}),
          transfer: prop({format: 'transfer', type: 'array', data: [{key: 1, label: `备选项1`},{key: 2,label: `备选项2`,disabled: true},{key: 3,label: `备选项3`}]}),   
          //base form


          object: schema({
            key: 123,
            cname: prop({required: true, rules: [{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }]})
          }),

          //advanced form
          tabs: schema({
            baseInfo: schema({
              name: prop({required: false, default: '', disabled: true}),
              phone: '137********',
              address: ''
            }, {label: prop({template: '<el-button @click="buttonClick">基本信息</el-button>'}), prop: '$root'}),
            advancedInfo: schema({
              advancedInfo1: '',
              advancedInfo2: ''
            }, {label: '其他信息', prop: '$root'})
          }, {format: "tabs", active: "baseInfo", ':type': "border-card"}), 


          tabsTable: schema({
            name: '',
            phone: '137********',
            address: prop({label: '地址', required: true, default: 'xxxxxxxxxxx'})
          }, {
            format: "tabsTable", 
            type: 'array', 
            editable: true,
            label: prop({content: '基本信息', format: 'tag', tag: 'el-button'}),
            labelFormat: "$row.column1 ? $row.column1 : '选项卡-' + ($index + 1)",
            default: {name: 'name1', phone: 'phone1', address: 'address1'}, 
            ':type': "border-card",
            "@tab-add": (e) => {
                console.info("tab-add", e)
            },
            "on": {
              "tab-remove": (e) => {
                console.info("tab-remove", e)
              }
            },
          }),   

          table: schema({
            name: '',
            phone: '137********',
            address: prop({ required: true, default: '', withLabel: false})
          }, {
            label: '基本信息',
            withLabel: true,
            format: 'table', 
            type: 'array',
            border: true
          }), 
          //advanced form
 
          // label slot
          address: schema({
            address1: prop({slot: 'input-slot', default: 'label too is prop1111!'}), 
            address2: prop({label: prop({template: '<el-button @click="buttonClick">{{$key}}</el-button>'}), default: 'label too is prop2222!'}),
            address3: prop({label: prop({label: '地址2'}), default: 'label too is prop333!'}),
            address4: prop({default: 'label too is prop444!' , template: '<el-input v-model="$form[$key]"></el-input>'}),
            address5: prop({label: prop({slot: 'input-label'}), default: 'label too is prop555!'}),
            address6: prop({label: 'render', default: 'default value', render: (h, {$key, $value}) => h('el-button', {}, 'render')}),  
            address7: prop({label: prop({render: (h, {$key}) => h('el-button', {props: {type: 'success'}}, '提交')})}), 
          }, {withLabel: false, prop: "$root", layout: '<el-card class="box-card">#{CONTENT}</el-card>'}),
  
          inlineForm: schema({
            name1: prop({
              required: true, 
              '#layout.label': '#{LABEL}'
            }),
            name2: '',
            inlineForm2:  schema({
              name3: '',
              name4: '',
              'inline-Form3':  schema({
                name5: prop({required: false, default: '', style: 'width:60px'}),
                number: prop({format: 'input-number'}),
              }, {format: 'form', size: 'mini', 'label-width': '100px', label: '', inline: true})
            }, {format: 'form', size: 'mini', 'label-width': '80px', label: ''})
          }, {format: 'form', size: 'mini', 'label-width': '80px', label: '', ref: 'inlineForm'}),    

          //layout
          layout: schema({
            name: prop({
              withLabel: true,
              label: prop({template: '<el-button @click="buttonClick">label-template</el-button>'}),
              //layout: '<div>content-template</div>',
              '#layout.label':  '<el-button>#{LABEL}</el-button>',
              '#layout.content':  '<el-button>#{CONTENT}</el-button>'
            }),
            url: prop({
              withLabel: false,
              default: '',
              template: '<el-input placeholder="请输入内容" size="mini" v-model="$form.layout.url"><template slot="prepend">Http://</template></el-input>'
            })
          }, {withLabel: false}), 

          //vnode
          tree: prop({
            withLabel: false,
            layout: '<el-card class="box-card">#{CONTENT}</el-card>',
            render: (h) => {
              return h('el-tree', {
                props: {
                  data: [{"label":"一级 1","children":[{"label":"二级 1-1","children":[{"label":"三级 1-1-1"}]}]},{"label":"一级 2","children":[{"label":"二级 2-1","children":[{"label":"三级 2-1-1"}]},{"label":"二级 2-2","children":[{"label":"三级 2-2-1"}]}]},{"label":"一级 3","children":[{"label":"二级 3-1","children":[{"label":"三级 3-1-1"}]},{"label":"二级 3-2","children":[{"label":"三级 3-2-1"}]}]}]
                }
              })
            }
          }),   


          dialog: schema({
            more1: '更多设置1',
            more2: '更多设置2',
            more3: '更多设置3',
          }, {
            withLabel: false,
            layout: '<div class="el-form-item el-form-item--mini"><el-button type="primary" size="mini" @click="dialogVisible = true">更多设置1</el-button><el-dialog :visible.sync="dialogVisible">#{CONTENT}</el-dialog></div>'
          }),  

          dialog2: schema({
            more1: prop({template: '<el-switch v-model="disabled" active-text="关闭" inactive-text="开启"></el-switch>'}),
            more2: prop({template: '<el-input v-model="$form.dialog2.more2" :disabled="disabled"></el-input>'}),
            more3: prop({template: '<el-button type="success" @click="closeSetting">关闭设置</el-button>'}),
          }, {
            context: {
              data: {
                dialog: false,
                disabled: false,
              },
              methods: {
                openSetting(){
                  this.dialog = true
                },
                closeSetting(){
                  this.dialog = false
                }
              }
            }, 
            '#layout.label': '<el-button type="primary" style="float: left" @click="openSetting">更多设置2</el-button>',
            '#layout.content': '<el-dialog :visible.sync="dialog">#{CONTENT}</el-dialog>', 
          }),    
 
          // v-create

          status: schema({
            apply: prop({apply: this.status.flag, default: 'v-apply'}),
            show: prop({show: this.status.flag, default: 'v-show'}),
          }, {
            label: prop({
              //template: '<el-switch v-model="status.flag" active-text="关闭" @change="changeSwitch" inactive-text="开启"></el-switch>',
              template: '<el-checkbox v-model="status.flag" @change="changeSwitch">开关</el-checkbox>',
              '#layout.label': '#{LABEL}'
            }) 
          }),

          customComponent1: prop({format: 'customComponent', '#layout.label': '#{LABEL}', label: prop({component: {template: '<h2>Custom</h2>'}})}),
          customComponent2: prop({component: {template: '<h2>Custom Component2</h2>'}, '#layout.label': '#{LABEL}', label: prop({format: 'customComponent'})}),     
           
  
        }, {format: 'form', ref: 'form', disabled: false})
      }
    ]

    }


  },
  methods: {
    buttonClick(){
      console.info('buttonClick')
    },
    computeCol(items){
      return 24 / Object.values(items).filter(e => e).length
    },
    changeSwitch(value){
      //console.info(this.form)
    },
    submit(){
      let formComponent = this.$refs.form[0].getRef('form')
      let inlineFormComponent = this.$refs.form[0].getRef('inlineForm')
      console.info('form:', this.form)
      console.info('from component:', formComponent)
      console.info('inlineForm component:', inlineFormComponent)
      formComponent.validate((valid, hints) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          console.table(hints)
          return false;
        }
      })

      inlineFormComponent.validate((valid, hints) => {
        if (!valid) {
          console.log('error submit!!');
          console.table(hints)
          return false;
        }
      })
    }

      
  },
  components: { JsonEditor, vueJsonEditor },
};
</script>

<style>
.form {
  text-align: left;
  width: 90%;
  margin: auto;
}

.json {
  text-align: left;
}

.jsoneditor-vue{
  text-align: left;
  width: 98%;
  height: 835px;
}
.el-table__row .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 0;
}
</style>
