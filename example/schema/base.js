export function yaml() {
    return schema({
        input: '',
        input2: '',
        input4: '',
        input5: '',
        input6: '',
        input3: ''
    }, {
        format: 'form'
    })
}


export function input() {
    // input options: [':type', 'maxlength', 'minlength', 'show-word-limit', 'clearable', 'show-password', 'prefix-icon', 'suffix-icon', 'rows', 'autosize', 'autocomplete', 'readonly', 'resize', 'max', 'min', 'step', 'autofocus', 'tabindex', 'validate-event']

    return schema({

        //value为非prop时，为默认值
        input1: '王二',

        input2: input('名字1', 'text'),

        //通过input方法可以简化input表单的配置
        input3: input('名字2', {default: '张三', placeholder: '请输入文字', required: true, style: 'width:250px'}),

        //prop里面的的属性可以绑定到表单上
        password: prop({label: '密码', default: '123456', ':type': 'password', 'show-password': true}),

        //文件上传例子
        file: prop({label: '文件', ':type': 'file'}),

        //可以给lable设置成一个prop, 然后通过prop来设置高级的label渲染
        label: prop({
            label: prop({template: '<el-button>按钮</el-button>'}),
            template: `<el-input v-model="$form[$key]"><template slot="prepend">Http://</template></el-input>`
        }),

        //通过设置withLabel: false来去掉label渲染
        noLable: prop({withLabel: false, ':type': 'textarea', placeholder: '通过设置withLabel: false来去掉label渲染'})

    }, {format: 'form'})
}


export function select() {
    // select options: ['options', 'multiple', 'value-key', 'clearable', 'collapse-tags', 'multiple-limit', 'autocomplete', 'filterable', 'allow-create', 'filter-method', 'remote', 'remote-method', 'multiple', 'loading', 'loading-text', 'no-match-text', 'no-data-text', 'popper-class', 'reserve-keyword', 'default-first-option', 'popper-append-to-body', 'automatic-dropdown']

    return schema({

        select1: select('部门1', [{label: '技术部', value: 'js'},{label: '行政部', value: 'sz'}]),

        //多选
        select2: select('部门2', [{label: '技术部', value: 'js'},{label: '行政部', value: 'sz'}], {multiple: true, size: 'medium'}),

        //可以清除，可以搜索, 可以创建
        select3: select('部门3', [{label: '技术部', value: 'js'},{label: '行政部', value: 'sz'}], {multiple: true, clearable: true, filterable: true, 'allow-create': true}),

        //分组
        select4: select('部门4', [{label: '分组1', options: [{label: '技术部', value: 'js'},{label: '行政部', value: 'sz'}]},{label: '分组2', options: [{label: '技术部', value: 'js'},{label: '行政部', value: 'sz'}]}], {format: 'select-group'}),


    }, {format: 'form'})
}

export function radio() {
    // radio options: ['border', 'name', ':label']

    return schema({

        radio1: radio('radio1'),

        radio2: prop({label: 'radio2', ':label': true, format: 'radio', default: true}),

        radio3: radio('radioGroup', [{"value": "radio1", "label": "radio1", "disabled": true},{"value": "radio2","label": "radio2"}]),

        radio4: radio('radioButton', [{"value": "radio1", "label": "radio1"},{"value": "radio2","label": "radio2"}], {format: 'radio-button', default: 'radio2'}),


    }, {format: 'form'})
}

export function checkbox() {
    // radio options: ['border', 'name', ':label']

    return schema({

        checkbox1: checkbox('checkbox1'),

        checkbox2: prop({label: 'checkbox2', format: 'checkbox'}),

        checkbox3: checkbox('checkboxGroup', [{"value": "checkbox1", "label": "checkbox1"},{"value": "checkbox2","label": "checkbox2"}]),

        checkbox4: checkbox('checkboxButton', [{"value": "checkbox1", "label": "checkbox1", "disabled": true},{"value": "checkbox2","label": "checkbox2"}], {format: 'checkbox-button', default: 'checkbox2'}),


    }, {format: 'form'})
}

