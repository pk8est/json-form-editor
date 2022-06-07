<template>
    <div>
        <el-radio-group v-model="type" size="mini">
            <el-radio-button v-for="(item, key) in types" :key="key" :label="item.type">{{item.name}}</el-radio-button>
        </el-radio-group>
        <el-card class="box-card" v-if="['exec', 'httpGet', 'tcpSocket'].indexOf(type) !== -1">
            <div v-if="type === 'exec'" class="livenessProbe-box">
                <el-input v-model="execCommand" @blur="onCommandChange" style="width: 380px">
                    <template slot="prepend">Command</template>
                </el-input> 
            </div>
            <div v-if="type === 'httpGet'" class="livenessProbe-box">
                <el-select v-model="form.httpGet.scheme" style="width: 85px">
                    <el-option value="http"></el-option>
                    <el-option value="https"></el-option>
                </el-select>
                <el-input v-model="form.httpGet.host" style="width: 110px"></el-input>
                <el-input v-model="form.httpGet.port" style="width: 60px"></el-input>
                <el-input v-model="form.httpGet.path" style="width: 110px"></el-input> 
            </div>
            <div v-if="type === 'tcpSocket'" class="livenessProbe-box">
                <el-input v-model="form.tcpSocket.port" style="width: 380px">
                    <template slot="prepend">端口</template>
                </el-input>
            </div>
            <el-row>
                <el-col :span="11">
                    响应超时时间 <el-input-number v-model="form.common.timeoutSeconds" style="width: 110px"></el-input-number>
                </el-col>
                <el-col :span="11">
                    探测周期设置 <el-input-number v-model="form.common.periodSeconds" style="width: 110px"></el-input-number>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    探测成功判断 <el-input-number v-model="form.common.successThreshold" style="width: 110px"></el-input-number>
                </el-col>
                <el-col :span="11">
                    探测失败判断 <el-input-number v-model="form.common.failureThreshold" style="width: 110px"></el-input-number>
                </el-col>
            </el-row>
            <el-row >
                <el-col :span="11">
                    首次探测时间 <el-input-number v-model="form.common.initialDelaySeconds" style="width: 110px"></el-input-number>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
import _ from 'lodash'
import elementMixin from '../../../src/components/elementMixin'
import { splitSpace } from '../../../src/utils'

export default{
    name: 'Probe',
    mixins: [elementMixin],
    props: [],
    data(){
        return {
            type: 'none',
            execCommand: '',
            form: {
                none: {},
                exec: {
                    command: []
                },
                httpGet: {
                    path: '',
                    port: 80,
                    host: '',
                    scheme: 'http',
                    HttpHeaders: []
                },
                tcpSocket: {
                    prot: 22
                },
                common: {
                    initialDelaySeconds: 0,
                    timeoutSeconds: 1,
                    periodSeconds: 10,
                    successThreshold: 1,
                    failureThreshold: 3,
                    securityContextc: {
                        privileged: false
                    }
                }
            },
            types: [{
                type: 'none',
                name: '不开启'
            },{
                type: 'exec',
                name: '命令探测'
            },{
                type: 'httpGet',
                name: 'HTTP心跳探测'
            },{
                type: 'tcpSocket',
                name: 'TCP探测'
            }]
        }
    },
    watch: {
        type(value){
            let model = {}
            if(value !== 'none'){
                model = Object.assign({}, {[value] : this.form[value]}, this.form.common)
            }
            this.value = model
        }
    },
    created(){
        if(this.value && typeof this.value  === 'object'){
            for(let item of this.types){
                if(this.value.hasOwnProperty(item.type)){
                    if(item.type === 'exec'){
                        this.execCommand = (this.value.exec.command || '').map(value => value.indexOf(' ') === -1  ? value : '"' + value + '"').join(' ')
                    }
                        
                    this.form = _.defaultsDeep({}, this.value, this.form)
                    this.type = item.type
                    continue
                }
            }

        }
    },
    methods: {
        onCommandChange(e){
            this.form.exec.command = splitSpace(e.target.value)
        }
    }
}
</script>
