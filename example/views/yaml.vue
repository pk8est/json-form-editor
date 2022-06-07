<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-tabs value="form" type="border-card">
          <el-tab-pane label="表单渲染" name="form">


            <json-editor ref="jsonEditor" :schema="schema" v-model="form" :config="config" class="json-form-editor">

            </json-editor>


          </el-tab-pane>
          <el-button @click="submit" style="width: 100%">提交</el-button>
        </el-tabs>
      </el-col>
      <el-col :span="12">
          <vue-json-editor v-model="form" mode="code"></vue-json-editor>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import config from '../../src/config'
import JsonEditor from '../../src/JsonEditor.vue'
import vueJsonEditor from 'vue-json-editor'
import DockerImage from './k8s/dockerImage'
import Probe from './k8s/probe'
import Volume from './k8s/volume'
import Command from './k8s/command'
import { registerComponent, setComponentOptions } from '../../src/components'
import { prop, schema, input, select, radio, checkbox  } from '../../src/JsonSchemaType'


config.propsKey = '---'
registerComponent('dockerImage', DockerImage, {imageStyle: 'width: 380px', tagStyle: 'width: 120px'})
registerComponent('probe', Probe)
registerComponent('volume', Volume)
registerComponent('command', Command)

export default {
  components: { JsonEditor, vueJsonEditor },
  data(){
    return {
      form: {
        metadata: {
          labels: {

          }
        },
        spec: {
          replicas: 2,
          selector: {},
          template: {
            spec: {
              containers: [{}]
            }
          }
        }
      },
      config: {
        'layout.label': '<el-button v-if="typeof $label === \'string\' && $label!=\'\'" style="width: 90%">{{$label}}</el-button><slot v-else name="label"></slot>',
      }
    }
  },
  computed: {
    namespaceOptions() {
      return [{label: 'default', value: 'default'},{label: 'dev',value: 'dev'},{label: 'test',value: 'test'}]
    },
    imagesOptions() {
      return [{label: 'default', value: 'default'},{label: 'dev',value: 'dev'},{label: 'test',value: 'test'}]
    },
    schema() {
      return schema({

        body: schema({

          base: schema({

            metadata: schema({

              namespace: select('命名空间', this.namespaceOptions, {required: true, placeholder: '请选择一个命名空间'}),
              name: prop({label: '名称', required: true, placeholder: '资源的名字，在同一个命名空间中必须唯一'}),
              labels: prop({label: '标签', format: 'tags', type: 'object', editable: true}),

            }, {format: 'card', header: '基本信息'}),

            spec: schema({

              replicas: prop({label: '副本数', format: 'input-number', type:'number', default: 2, min:0, layout: '<el-col :span="12">#{CONTENT}</el-col>'}),

              revisionHistoryLimit: prop({label: '历史版本', format: 'input-number', type:'number', default: 10, min:0, layout: '<el-col :span="12">#{CONTENT}</el-col>'}),

              selector: {
                
                matchLabels: prop({label: '匹配标签', format: 'tags', type: 'object', editable: true})

              }

            }, {format: 'card', header: '资源设置'}), 

          }, {
            'label': '基本设置',
            'prop': '$root',
          }),


          containers: schema({

            name: input('容器名', {required: true}),
            image: prop({label: '镜像', format: 'dockerImage', imageOptions: ['image1/image1', 'image2/image2'], tagOptions: ['tag1', 'tag2']}),
            imagePullPolicy: select('拉取策略', ['Always', 'Never', 'InNotPresent'], {default: 'Always'}),
            restartPolicy: select('重启策略', ['Always', 'Never', 'OnFailure'], {default: 'OnFailure'}),
            command: prop({label: '启动命令', format: 'command', type: 'array'}),
            args: input('启动参数'),
            workingDir: input('工作目录'),

            ports: schema({
              
              protocol: select('协议', ['tcp', 'udp'], {withLabel: false, default: 'tcp'}),
              containerPort: input('容器端口', {withLabel: false, ':type': 'number', rules: [{ required: true, message: '容器端口不能为空'}]}),
              name: input('端口名', {withLabel: false}),

            }, {label: '容器端口', withLabel: true, format: 'table', type: 'array', editable: true}),

            livenessProbe: prop({label: '存活健康检查', format: 'probe'}),
            readinessProbe: prop({label: '准备状态检查', format: 'probe'}),

            resources: schema({

              requests: schema({
                cpu: prop({label: 'CPU', format: 'inputNumber', step: 0.5, default: 1, '#layout.formItem': '<span style="display:inline-block;width:50%"> {{$label}} #{CONTENT}</span>'}),
                memory: prop({label: '内存', format: 'inputNumber', step: 100, default: 500, '#layout.formItem': '<span> {{$label}} #{CONTENT}</span>'}),
              }, prop({label: '初始资源'})),

              limits: schema({
                cpu: prop({label: 'CPU', format: 'inputNumber', step: 0.5, default: 1, '#layout.formItem': '<span style="display:inline-block;width:50%"> {{$label}} #{CONTENT}</span>'}),
                memory: prop({label: '内存', format: 'inputNumber', step: 100, default: 500, '#layout.formItem': '<span> {{$label}} #{CONTENT}</span>'}),
              }, prop({label: '最大资源'}))
              
            }, {'#layout.formItem': '<span> {{$label}} #{CONTENT}</span>'}),
            

            env: schema({
              
              name: input('变量名', {withLabel: false}),
              value: input('变量名值', {withLabel: false}),

            }, {label: '环境变量', withLabel: true, format: 'table', type: 'array', editable: true}),

            volumeMounts: schema({

              name: input('挂载名', {withLabel: false}),
              mountPath: input('挂载目录', {withLabel: false}),
              readOnly: checkbox('只读', {withLabel: false, '#column-attrs': {width: "60px"}})

            }, {label: '存储挂载', withLabel: true, format: 'table', type: 'array', editable: true}),


          }, {
            label: '容器设置', 
            tabLabel: {template: '<span>{{"容器-" +  ($attrs.item.name || $attrs.rowIndex)}}</span>'},
            format: 'tabsTable', 
            //format: 'cardTable', 
            //class: 'card-table', 
            type: 'array', 
            prop: '$root.spec.template.spec.containers', 
            min:1
          }),

          volumes: schema([
            prop({withLabel: false, format: 'volume', default: {name: '', emptyDir: {}}})
          ], {
            header: {template: '<span>{{"存储券-" + $attrs.rowIndex}}</span>'},
            label: '存储挂载', 
            format: 'cardTable', 
            class: 'card-table', 
            type: 'array',
            prop: '$root.spec.template.spec.volumes[]'
          }),  

          strategy: schema({}, {'label': '部署策略', 'prop': '$root.spec'}), 

        }, {
          'format': 'tabs', 
          'prop': '$root',
          'active': 'containers',
          'with-label': false,
          'tab-position': 'right'
        })

      }, {
        'ref': 'form',
        'format': 'form',
        'label-width': '180px',
        config: {
          'with-Label': false
        }
      })
    }
  },
  methods: {
    submit(){
      console.info('form:', this.form)
      let formComponent = this.$refs.jsonEditor.getRef('form')
      formComponent.validate((valid, hints) => {
        if (valid) {
          console.info('submit!');
        } else {
          console.error('error submit!!');
          console.table(hints)
          return false;
        }
      })
    }
  }
  
}
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
  height: 892px;
}

.json-form-editor{
  text-align: left;
  height: 780px;
  overflow-y: auto;
}

.el-table__row .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 0;
}

.card-table{
  margin-bottom: 20px;
}
.is-scrolling-none .el-table__empty-block{
  display: none;
}

.el-table__header th {
    padding: 0 0;
}
.volume-input {
  width: 380px;
}
</style>